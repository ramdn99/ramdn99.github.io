---
title: "“RSA-Textbook” — Cryptography Challenge in CyCTF Qualifications by Cyshield"
date: "10-11-2025"
tags: ['writeup', 'ctf', 'cryptography', 'math', 'ctf-crypto']
summary: "Attacking textbook RSA encryption using small exponent and broadcast attacks."
readTime: "3 min"
mediumUrl: "https://medium.com/@zeroXmoRamadan/rsa-textbook-cryptography-challenge-in-cyctf-qualifications-by-cyshield-590edb105f01"
---


![Challenge Screenshot 1](/images/writeups/rsa-textbook-crypto/step_1.jpg)

I participated in the CyCTF 2025 competition, which featured various challenges. This write-up covers one of the challenges I successfully solved. I’ll explain my approach, the steps I took, and how I ultimately captured the flag.

![Challenge Screenshot 2](/images/writeups/rsa-textbook-crypto/step_2.jpg)

**Category:** Cryptography

**Author:** Bebo

## Provided Information

- server remote connection
- `"player.py"` (source)

```python
# player.py
from Crypto.Util.number import *
def genkey(bits):
  e=0x100001
  p=getPrime(bits)
  q=getPrime(bits)
  n=p*q
  phi=(p-1)*(q-1)
  d=pow(e,-1,phi)
  return (n,e),(p,q,d)
#flag must be bigger than 512 bit at least
flag=bytes_to_long(b'CYCTF{test_dummy}')
pub,priv=genkey(256)
n,e=pub
print(flag.bit_length())
print(pow(flag,e,n))
print(pub)
print(priv[-1]%(priv[1]-1))
```

Pretty straightforward RSA key generation, except for one suspicious line:

```python
print(priv[-1] % (priv[1] - 1))
```

This **prints** `**d mod (q-1)**` — and that’s all the info I needed to factor the modulus.

## Server output

the server prints the encrypted flag and a small menu:

```python
375
5444611832356613062376602094688849531995550481755386491698662666918004320372976242169200823346079981613940372584223468323699051883150333869019693645730659
(9555649878924561187791342872323911928342747324219852887068863922860608935379931428803892571462298607616590900032525527545271001633499501017292137794013951, 1048577)
61205136010498910026121562252890199738318883824907719425131454866540459789713
```

That corresponds to:

- `bitlen_flag = 375`
- `c = 5444...5730659` → ciphertext
- `(n, e)` → RSA public key
- `dq = 6120...589713` → leaked value

## What’s Happening

In normal RSA, the private exponent `d` satisfies:

![Challenge Screenshot 3](/images/writeups/rsa-textbook-crypto/step_3.png)

But here, we only know:

![Challenge Screenshot 4](/images/writeups/rsa-textbook-crypto/step_4.png)

Substitute that into the original congruence mod (q−1):

![Challenge Screenshot 5](/images/writeups/rsa-textbook-crypto/step_5.png)

![Challenge Screenshot 6](/images/writeups/rsa-textbook-crypto/step_6.png)

By brute-forcing small `h` values (or divisors of `T`), we can find the correct `q`.

Once `q` divides `n`, we have both primes and can decrypt the ciphertext.

## Exploit plan

1. Parse values from the server: `n, e, c, dq`.
2. Compute `T = e * dq - 1`.
3. Loop through small `h` values:

```python
for h in range(1, 1 << 26):
    if T % h == 0:
        q = T // h + 1
        if n % q == 0:
            # found the correct q
```

4. Once found:

- `p = n // q`
- `phi = (p-1)*(q-1)`
- `d = inverse(e, phi)`
- `m = pow(c, d, n)`

5. Convert `m` to bytes → **flag**.

## Exploit script

```python
from Crypto.Util.number import long_to_bytes
import math
# server-provided values
n = 9555649878924561187791342872323911928342747324219852887068863922860608935379931428803892571462298607616590900032525527545271001633499501017292137794013951
e = 1048577
dq = 61205136010498910026121562252890199738318883824907719425131454866540459789713
c = 5444611832356613062376602094688849531995550481755386491698662666918004320372976242169200823346079981613940372584223468323699051883150333869019693645730659
T = e * dq - 1
# brute-force small divisors h of T (h < e; in practice h is small)
q = None
for h in range(1, 1<<22):         # search range used; adjust upward if needed
    if T % h == 0:
        cand = T // h + 1
        if n % cand == 0:
            q = cand
            found_h = h
            break
p = n // q
# compute private exponent and decrypt
phi = (p-1)*(q-1)
d = pow(e, -1, phi)
m = pow(c, d, n)
print(long_to_bytes(m))
```

## Flag reveal

After running the script, this is the output:

![Challenge Screenshot 7](/images/writeups/rsa-textbook-crypto/step_7.png)

and voila, here is the flag🥳✅:

```python
CYCTF{4c95930d2ce17f72cc4feba2bc34d9ee51bc3968}
```

THANK YOU FOR READING!🫶

<div style="margin-top: 32px;">
  <a class="btn" href="https://medium.com/@zeroXmoRamadan/rsa-textbook-cryptography-challenge-in-cyctf-qualifications-by-cyshield-590edb105f01" target="_blank" rel="noopener noreferrer">
    Medium writeup.
  </a>
</div>
