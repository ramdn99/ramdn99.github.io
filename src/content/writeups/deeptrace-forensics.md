---
title: "“DeepTrace” — 1st Forensics Challenge in Connectors CTF Qualifications by Connectors Team"
date: "17-09-2025"
tags: ['writeup', 'ctf', 'forensics', 'digital-forensics', 'dfir']
summary: "Analysis of PDF metadata and embedded images to recover hidden flag fragments."
readTime: "3 min"
mediumUrl: "https://medium.com/@ramdn99/deeptrace-forensics-challenge-in-connectors-ctf-qualifications-by-connectors-team-284304950704"
---


![Challenge Screenshot 1](/images/writeups/deeptrace-forensics/step_1.jpg)

**Category:** Digital Forensics and Incident Response (DFIR).

**Author:** Connectors Team (wh1pl4sh).

![Challenge Screenshot 2](/images/writeups/deeptrace-forensics/step_2.png)

## 📖 Description

```python
Someone left subtle traces behind. Can you piece them together to reveal the flag?
```

**Flag format:** `CONCTF{...}`.

## 🎯 Goal

Recover the flag hidden inside a provided file.

## 📂 Provided Files

- `DeepTrace.pdf` — portable document format.

## 🕵️‍♂️ TL;DR (Summary)

I started by analyzing the PDF’s metadata with `exiftool`, which revealed the first part of the hidden flag in a metadata field. Next I extracted the embedded images from the PDF using `pdfimages` and inspected the resulting files; one of the images contained the second part of the hidden flag. Finally, I combined the two recovered pieces to reconstruct the full flag.

## 🔎 Step-by-step Walkthrough

## Step 1 — Inspect PDF file metadata

Read the PDF metadata using `exiftool` command:

```python
exiftool DeepTrace.pdf
```

Result:

![PDF metadata](/images/writeups/deeptrace-forensics/step_3.png)

As we can see the `Creator` field contains:

```python
SW4gdGhpcyBxdWVzdGlvbiwgdGhlIGZsYWcgaGFzIGJlZW4gZGl2aWRlZCBpbnRvIDMgcGFydHMuIFlvdSBoYXZlIGZvdW5kIHRoZSBmaXJzdCBwYXJ0IG9mIHRoZSBmbGFnISEgQ09OQ1RGe0QwMW45X0YwMjNuNTFDNQ
```

which is encoded in `Base64`

## Step 2 — Decoding the Base64 creator field content

By going to `CyberChef` Website to decode:

![decoding on CyberChef website](/images/writeups/deeptrace-forensics/step_4.png)

Result:

```python
In this question, the flag has been divided into 3 parts. You have found the first part of the flag!! CONCTF{D01n9_F023n51C5
```

So there is 3 parts of this hidden flag.

We now have the first part of the hidden flag:

```python
CONCTF{D01n9_F023n51C5
```

## Step 3 — Extracting images from the PDF file

Extract Images hidden in the PDF file using `pdfimages` command:

```python
mkdir extracted_images
pdfimages -all DeepTrace.pdf extracted_images/img
```

As you can see we got 5 images:

![extracted images](/images/writeups/deeptrace-forensics/step_5.png)

If we look closely there is one image of them has the second part of the hidden flag:

![the image that has the second part of the hidden flag](/images/writeups/deeptrace-forensics/step_6.png)

We now have the second part of the hidden flag:

```python
_ON_pdf_f1l35_15_345y
```

## Step 4 — Recovering the third part of the hidden flag

I tried to dig deeper but with nothing promising, apparently there was a problem in the challenge and there is no 3rd part of the flag. It consists only of 2 parts.😔

![not my problem XD](/images/writeups/deeptrace-forensics/step_7.jpg)

## Step 5 — Assemble the final flag

Since there is no 3rd part so we have the final flag right here🥳✅:

```python
CONCTF{D01n9_F023n51C5_ON_pdf_f1l35_15_345y}
```

## 🛠️ Tools Used

- exiftool
- pdfimages

THANK YOU FOR READING!🫶

<div style="margin-top: 32px;">
  <a class="btn" href="https://medium.com/@ramdn99/deeptrace-forensics-challenge-in-connectors-ctf-qualifications-by-connectors-team-284304950704" target="_blank" rel="noopener noreferrer">
    Medium writeup.
  </a>
</div>
