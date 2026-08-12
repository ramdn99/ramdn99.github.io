---
title: "“Polys” — Cryptography Challenge in CyCTF Qualifications by Cyshield"
date: "13-11-2025"
tags: ['writeup', 'ctf', 'cryptography', 'math', 'ctf-crypto']
summary: "Polynomial-based cryptography challenge analysis and algebraic flag recovery."
readTime: "3 min"
mediumUrl: "https://medium.com/@ramdn99/polys-cryptography-challenge-in-cyCTF-qualifications-by-cyshield-6414258f78b8"
---


![Challenge Screenshot 1](/images/writeups/polys-crypto/step_1.jpg)

I participated in the CyCTF 2025 competition, which featured various challenges. This write-up covers one of the challenges I successfully solved. I’ll explain my approach, the steps I took, and how I ultimately captured the flag.

![Challenge Screenshot 2](/images/writeups/polys-crypto/step_2.jpg)

**Category:** Cryptography

**Author:** Bebo

## Provided Information

- server remote connection
- `"player.sage"` (source)

```python
# player.sage
from Crypto.Util.number import getPrime, bytes_to_long
import random
p = getPrime(128)
flag = bytes_to_long(b'nothing_just_some_random_polys')
rr = flag.bit_length()
ff = []
for i in range(0, rr, rr//5):
    ff.append(flag % 2**(rr//5))
    flag >>= rr//5
print(p)
print(ff)
F = GF(p)
R.<x> = PolynomialRing(F)
poly1 = prod(x + r for r in ff)
for i in range(400):
    f = R.random_element(random.randint(1,8))
    poly1 *= f
print(poly1.degree())
while True:
    coff1 = input('enter list of coff of the modular equation:').split(',')
    coff1 = list(map(int, coff1))
    poly = R(coff1)
    print(poly)
    print(poly1 % poly)
```

## Server output

And when connecting to the server we got this output:

```python
239258953283630358806550621305969019917
[6537308465486925816189, 21366863478306246108806, 26074820876388456040641, 5168596814191753081521, 19914716372836213281555]
1742
enter list of coff of the modular equation:
```

## Understanding the code

The code builds a **polynomial over a finite field** `GF(p)` as:

![Challenge Screenshot 3](/images/writeups/polys-crypto/step_3.png)

Then multiplies it by 400 random low-degree polynomials, just to bloat the degree and hide the real roots.

Those five numbers in the list `ff` are actually **chunks of the flag encoded as integers**.

Each chunk is a fixed bit-size slice of the long integer version of the flag.

## What the prime (p) does

The prime `p` defines the **finite field** where all coefficients and operations happen.

Every polynomial coefficient and arithmetic operation is done **modulo p**.

This guarantees:

- arithmetic is well-defined (no zero divisors)
- factorization and GCD algorithms work cleanly
- and every number except 0 has a multiplicative inverse

So (p) basically tells Sage to work inside:

![Challenge Screenshot 4](/images/writeups/polys-crypto/step_4.png)

instead of the integers.

## Exploitation

The challenge was supposed to let you interact and query remainders (`poly1 % poly`) to guess roots.

But in our case the server **printed `ff` directly** — the five integers that encode the flag.

That leak makes it trivial: we can simply reconstruct the original flag locally.

Each chunk represents a continuous bit range of the flag integer.

To rebuild, we concatenate those chunks back by shifting them by the correct number of bits.

```python
from Crypto.Util.number import long_to_bytes
ff = [6537308465486925816189, 21366863478306246108806,
      26074820876388456040641, 5168596814191753081521,
      19914716372836213281555]
# determine bits per chunk
chunk_bits = max(f.bit_length() for f in ff)
flag_int = sum(ff[i] << (i * chunk_bits) for i in range(len(ff)))
print(long_to_bytes(flag_int))
```

## Flag reveal

After running the script, this is the output:

![Challenge Screenshot 5](/images/writeups/polys-crypto/step_5.png)

and voila, here is the flag🥳✅:

```python
CyCTF{b5120aa4765ecaa5308eb0d2fa839141bca5762a}
```

Now that we solved this challenge, `Polys` , it lead us to this:

![Challenge Screenshot 6](/images/writeups/polys-crypto/step_6.jpg)

But that’s a story for another time.

THANK YOU FOR READING!🫶

<div style="margin-top: 32px;">
  <a class="btn" href="https://medium.com/@ramdn99/polys-cryptography-challenge-in-cyCTF-qualifications-by-cyshield-6414258f78b8" target="_blank" rel="noopener noreferrer">
    Medium writeup.
  </a>
</div>
