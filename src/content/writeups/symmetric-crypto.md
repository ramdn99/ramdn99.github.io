---
title: "“Symmetric” — Cryptography Challenge in CyCTF Qualifications by Cyshield"
date: "09-11-2025"
tags: ['writeup', 'ctf', 'cryptography', 'math', 'ctf-crypto']
summary: "Reversing custom XOR and modular arithmetic encryption algorithms."
readTime: "6 min"
mediumUrl: "https://medium.com/@zeroXmoRamadan/symmetric-cryptography-challenge-in-cyctf-qualifications-by-cyshield-e854721c8c77"
---


![Challenge Screenshot 1](/images/writeups/symmetric-crypto/step_1.jpg)

I participated in the CyCTF 2025 competition, which featured various challenges. This write-up covers one of the challenges I successfully solved. I’ll explain my approach, the steps I took, and how I ultimately captured the flag.

![Challenge Screenshot 2](/images/writeups/symmetric-crypto/step_2.jpg)

**Category:** Cryptography

**Author:** Bebo

## Provided Information

- server remote connection
- `player.py` (source)

```python
# player.py
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto.Util.Padding import pad,unpad
import os
key = os.urandom(16)
iv = os.urandom(16)
FLAG=b'CyCTF{dummy_flag}'
def encrypt(pt):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ct = cipher.encrypt(pad(pt, 16))
    
    return ct.hex()
def decrypt(ct):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ct = unpad(cipher.decrypt(ct),16)
    return ct
options='''1.encrypt
2.decrypt'''
FLAGG=pad(FLAG,16)
enc=encrypt(FLAG)
fb=[]
for i in range(0,len(FLAGG),16):
 fb.append(FLAG[i:i+16])
print(f'{enc = }')
while True:
  print(options)
 
  option=int(input('> '))
  if option==1:
   pt=input('msg > ').encode()
   ct=encrypt(pt)
   print(f'{ct = }')
  if  option==2:
   ct=input('enter ciphertext in hex> ')
   if len(ct)>64:
    print("can't handle")
    exit()
   try:
    pt=decrypt(bytes.fromhex(ct))
   
    for b in fb:
     if b in pt :
      print('cheating')
      exit()
    print(f'{pt = }')
   except:
    print('something wrong')
```

The core logic:

- AES in CBC mode with a random key and IV.
- Encrypt/decrypt functions as expected.
- Anti-cheating detection if any decrypted block matches a flag block.
- You can’t send ciphertexts longer than 2 blocks.

Classic oracle setup, but they try to stop us from using the decrypted flag directly.

## Server output

```python
enc = '<hex of ciphertext (3 blocks)>'
1. encrypt
2. decrypt
>
```

So, two options:

- **Encrypt:** encrypts any plaintext you provide with a fixed AES-CBC key and IV.
- **Decrypt:** decrypts a ciphertext (max 2 blocks, i.e., 32 bytes).

If padding is wrong, it says “something wrong.”

If padding is right, it prints `pt = b'...'`.

If your plaintext matches any 16-byte block of the flag, it screams `cheating` and kills the process.

A simple encryption/decryption pair, but with that “cheating” check that makes oracle exploitation more delicate.

## Vulnerability Analysis

The decryptor leaks padding validity information:

- Invalid padding → “something wrong”
- Valid padding → prints the plaintext (`pt = b'...'`)

This creates a **padding oracle** — a powerful primitive in AES-CBC.

CBC decryption works as:

```python
P_i = D(C_i) XOR C_{i-1}
```

So, if we can vary `C_{i-1}`, we can infer `D(C_i)` byte-by-byte using padding rules.

The extra twist is the “cheating” exit condition.

If our forged plaintext ever equals part of the flag, the server shuts down.

But we can still safely run padding oracle trials by never sending ciphertexts that directly decrypt to those forbidden blocks.

## Attack Strategy

1. **Get ciphertext blocks:** When you connect, you see `enc = ...`. Split it into 16-byte chunks: `C0`, `C1`, `C2`.
2. **Recover intermediate values:** For each block `C_i`, use the padding oracle to recover `D(C_i)`. That’s 16 bytes per block, guessed from last to first using padding patterns.
3. **Compute plaintext:** Once we know `D(C_i)`, we get:

- `P_i = D(C_i) XOR C_{i-1}` for `i >= 1`
- `P_0 = D(C_0) XOR IV`

4. **Recover IV:** Since we don’t know IV, we can encrypt a known plaintext (like `"A"*16`) to get its first block `C0'`. Padding-oracle `C0'` to recover `D(C0')`, then `IV = D(C0') XOR known_plain`.
5. **Assemble flag:** Combine all `P_i` and unpad.

## Exploit script

I used the following Python script using **pwntools**. It automates the whole padding-oracle process and even recovers the IV dynamically.

```python
# Requires: pip install pwntools
from pwn import remote, Timeout
import sys
import binascii
from itertools import repeat

HOST = "HOST"
PORT = "PORT"
BLOCK_LEN = 16

def connect():
    r = remote(HOST, PORT)
    r.recvuntil(b"enc = '")
    enc_line = r.recvline().strip().decode()
    enc = enc_line.split("'")[0]
    blocks = [enc[i:i+32] for i in range(0, len(enc), 32)]
    print("[*] Connected. Flag ciphertext:", enc)
    print("[*] Blocks:", blocks)
    return r, enc, blocks

def ask_encrypt(r, pt_bytes):
    r.recvuntil(b'> ')
    r.sendline(b'1')
    r.recvuntil(b'msg > ')
    r.sendline(pt_bytes)
    out = r.recvline(timeout=2).decode(errors='ignore').strip()
    if '=' in out:
        return out.split('=')[-1].strip().strip("'").strip()
    return ''

def ask_decrypt_and_read(r, cthex):
    r.recvuntil(b'> ')
    r.sendline(b'2')
    r.recvuntil(b'hex> ')
    r.sendline(cthex.encode())
    try:
        resp = r.recvline(timeout=2).decode(errors='ignore').strip()
    except EOFError:
        return None
    return resp

def padding_oracle(r, two_block_hex):
    resp = ask_decrypt_and_read(r, two_block_hex)
    if resp is None:
        return None
    if 'cheating' in resp:
        return 'cheat'
    if 'something wrong' in resp:
        return False
    return True

def decrypt_block_with_oracle(r, C_target_hex):
    C_target = bytes.fromhex(C_target_hex)
    recovered_intermediate = bytearray(BLOCK_LEN)
    C_prev = bytearray(repeat(0, BLOCK_LEN))
    for position in range(1, BLOCK_LEN+1):
        pad_byte = position
        for j in range(1, position):
            idx = BLOCK_LEN - j
            C_prev[idx] = (recovered_intermediate[idx] ^ pad_byte)
        found = False
        idx = BLOCK_LEN - position
        for guess in range(256):
            trial = bytearray(C_prev)
            trial[idx] = guess
            trial_hex = trial.hex() + C_target_hex
            res = padding_oracle(r, trial_hex)
            if res is None:
                print("[!] Connection closed unexpectedly. Abort.")
                return None
            if res == 'cheat':
                print("[!] Server printed 'cheating'. Aborting.")
                return 'CHEAT'
            if res:
                intermediate_byte = guess ^ pad_byte
                recovered_intermediate[idx] = intermediate_byte
                found = True
                sys.stdout.write(f"\r[+] Recovered {position}/16 bytes")
                sys.stdout.flush()
                break
        if not found:
            print("\n[!] Failed to find a valid guess for position", position)
            return None
    print()
    return bytes(recovered_intermediate)

def recover_iv_via_known_plain(r, known_plain_16):
    ct = ask_encrypt(r, known_plain_16)
    if not ct:
        print("[!] encrypt didn't return ciphertext")
        return None
    C0_prime_hex = ct[:32]
    print("[*] Got ciphertext for known plaintext. C0' =", C0_prime_hex)
    inter = decrypt_block_with_oracle(r, C0_prime_hex)
    if inter is None or inter == 'CHEAT':
        return inter
    iv = bytes(x ^ y for x, y in zip(inter, known_plain_16))
    return iv

def main():
    r, enc, blocks = connect()
    nblocks = len(blocks)
    Dblocks = [None] * nblocks
    for i in range(nblocks):
        print(f"[*] Recovering D(C_{i}) via padding oracle...")
        D = decrypt_block_with_oracle(r, blocks[i])
        if D is None or D == 'CHEAT':
            r.close()
            return
        Dblocks[i] = D
        print(f"[+] D(C_{i}) = {D.hex()}")
    plaintext_blocks = [b''] * nblocks
    for i in range(1, nblocks):
        prev_block = bytes.fromhex(blocks[i-1])
        P_i = bytes(x ^ y for x, y in zip(Dblocks[i], prev_block))
        plaintext_blocks[i] = P_i
        print(f"[+] Recovered P_{i}: {P_i}")
    print("[*] Recovering IV by encrypting a known block...")
    known = b'A' * 16
    iv = recover_iv_via_known_plain(r, known)
    if iv is None or iv == 'CHEAT':
        r.close()
        return
    print("[+] Recovered IV:", iv.hex())
    P0 = bytes(x ^ y for x, y in zip(Dblocks[0], iv))
    plaintext_blocks[0] = P0
    print("[+] Recovered P_0:", P0)
    full = b''.join(plaintext_blocks)
    print("\n=== RECOVERED PLAINTEXT ===")
    print(full)
    r.close()

if __name__ == "__main__":
    main()
```

## Flag reveal

After waiting for the script (about 1 hour), the output was this:

![Challenge Screenshot 3](/images/writeups/symmetric-crypto/step_3.jpg)

and **voila**, here is the flag🥳✅:

```python
CyCTF{8817602d859c72ea815d3e34a44292afb5a3e3ae}
```

THANK YOU FOR READING!🫶

<div style="margin-top: 32px;">
  <a class="btn" href="https://medium.com/@zeroXmoRamadan/symmetric-cryptography-challenge-in-cyctf-qualifications-by-cyshield-e854721c8c77" target="_blank" rel="noopener noreferrer">
    Medium writeup.
  </a>
</div>
