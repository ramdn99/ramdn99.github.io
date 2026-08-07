---
title: "SEC450.1.5.3 — MISP (THM Room)"
date: "05-08-2026"
tags: ['gsoc', 'sec450', 'misp', 'cti', 'tryhackme', 'threat-sharing']
summary: "Complete walkthrough of MISP room on TryHackMe, event creation, attribute correlation, and threat intelligence sharing."
readTime: "8 min"
---

![SEC450.1.5.3 — MISP (THM Room) Cover](/images/gsoc/covers/450.1.5.3.jpg)


> **Platform:** TryHackMe<br/>
> **Room:** [MISP](https://tryhackme.com/room/misp)<br/>
> **Difficulty:** Medium<br/>
> **Category:** Cyber Threat Intelligence · Malware Information Sharing

---

## Overview

MISP (Malware Information Sharing Platform) is an open-source threat intelligence platform built to facilitate the collection, storage, and distribution of threat intelligence within communities of trusted members. Unlike reputation-lookup services such as VirusTotal, MISP is designed for mature security teams, MSSPs, and government CERTs that need to track adversaries targeting their organisations, cross-link campaigns, and share structured intelligence with partners.

This room walks through MISP's core concepts — events, attributes, objects, tags, galaxies, taxonomies, and feeds — and finishes with a practical investigation into an APT28 campaign targeting European organisations.

---

## Room Information

| Detail | Value |
|---|---|
| Tasks | 6 |
| Total Questions | 7 |
| Estimated Time | ~45 minutes |
| Key Tools | MISP, STIX, MITRE ATT&CK, TLP |
| Credentials | `admin@tryhackme.thm` / `nTt21qO8\C.JDrZZ` |

---

## Task 1 — Introduction

The opening task frames what the room will cover:

- The purpose of MISP for both small and large security teams
- Extracting attributes, objects, tags, and galaxies from MISP events
- Investigating a threat based on a high-severity MISP event

The room uses a **live MISP instance** with pre-ingested events. After starting the machine and waiting a few minutes, you can access the platform through your browser.

![MISP login page](/images/gsoc/misp/misp-01.png)

> *No questions in this task.*

---

## Task 2 — What is MISP?

MISP is an open-source platform that enables security teams to share structured threat information. It does not give you IP or hash reputation out of the box — instead, it serves very specific needs around campaign tracking, incident correlation, and community-driven intelligence sharing.

### MISP for Small SOCs

Smaller teams dealing with only a handful of incidents per year can still use MISP as a **proxy between threat intelligence producers and their detection stack**:

1. Collect events from CERTs and threat feeds (e.g., CIRCL)
2. Push collected indicators (hashes, domains, IPs) from MISP to SOC tools (SIEM, EDR, IDS)
3. Create detection rules that look for those indicators in logs and network traffic

### MISP for Mature Teams

MISP delivers its full value for larger, more mature teams and government CERTs handling hundreds of incidents. It answers questions that no single-source reputation tool can:

- Have we seen this indicator before, and in which incident?
- Which threat actor or campaign is this activity associated with?
- Are multiple organisations being targeted by the same adversary right now?
- Has a partner CERT already investigated this artifact? What did they conclude?
- What were we dealing with over the past few months? What has changed?

> *No questions in this task.*

---

## Task 3 — MISP Step by Step

MISP is built around **events** — collections of linked information describing a single threat, intrusion, or campaign. An event acts as a container that groups everything analysts have observed about one incident.

### Tags and TLP

Before filling in an event, you set its sharing rules using **TLP classification** and event tags:

- `tlp:clear` — The event can be publicly shared
- `tlp:amber` — Internal use and trusted partners only

### Galaxies

MISP **Galaxies** are libraries of structured knowledge — countries, tools, malware families, and more. Adding galaxies to an event makes it easier to group, link, and search across your entire event database. For example, you might tag an event with a country of origin and the malware family observed.

### Attributes

**Attributes** are the atomic indicators within an event: IP addresses, domains, file hashes, URLs, and free-text comments. A well-documented event should have as many relevant attributes as possible, along with text comments, external references, and even raw evidence files.

### Objects

**Objects** group related attributes together. For instance, instead of adding a filename, its hash, and its file path as three separate attributes, you package them into a single **file object**. This is the preferred approach over standalone attributes because it preserves the relationship between related data points:

| Object Field | Example Value |
|---|---|
| `filename` | `akgpxj.exe` |
| `fullpath` | `%WINDIR%\Temp\akgpxj.exe` |
| `md5` | `57fec42f6df975bee68e874f55ef0fd7` |
| `sha256` | `8507a4c68a6a3e8bb35a85783a606240901f812b970d3780ea67fb5e66fe2` |

### Publishing and Searching

Once an event is created, a user with publish permission reviews and publishes it. Publishing makes the event visible according to its distribution level and pushes it to sync partners. Analysts can then:

- Search prior events by attribute (hash, IP, domain) or free text
- Attribute activity to a known threat actor via galaxies or correlated tags
- Accelerate response using linked TTPs, infrastructure details, and analyst notes

### Questions & Answers

**Q1: How do you call an atomic indicator in MISP, such as an IP address?**

The fundamental unit of intelligence in MISP is an **Attribute** — an atomic, typed indicator like an IP address, hash, or domain.

**Q2: What malware name is related to the following attribute? MD5 Hash: `661842995f7fdd2e61667dbc2f019ff3`**

Navigating to **List Attributes** and searching for the hash, we find it belongs to event 208 — **Prynt Stealer**:

![Attributes list — Prynt Stealer event with hash indicators](/images/gsoc/misp/misp-02.png)

![Attribute search — MD5 hash match pointing to Prynt Stealer](/images/gsoc/misp/misp-03.png)

Opening event 208 confirms the full event title: *"Prynt Stealer Spotted In the Wild - A New Info Stealer Performing Clipper And Keylogger"*:

![Event 208 — Prynt Stealer event detail page](/images/gsoc/misp/misp-04.png)

| # | Question | Answer |
|---|---|---|
| 1 | How do you call an atomic indicator in MISP, such as an IP address? | `Attribute` |
| 2 | What malware name is related to MD5 `661842995f7fdd2e61667dbc2f019ff3`? | `Prynt Stealer` |

---

## Task 4 — Taxonomies & Feeds

### Taxonomies

A **taxonomy** in MISP is a classification system expressed through event tags. Each tag has three components:

| Component | Purpose | Example |
|---|---|---|
| **Namespace** | Defines the tag's property domain | `tlp`, `admiralty-scale` |
| **Predicate** | Specifies the property being described | `source-reliability` |
| **Value** | The actual classification value | `"a"` (completely reliable) |

Common taxonomy examples:

- `tlp:red` — Do not share outside the meeting
- `type:OSINT` — The event is open-source intelligence
- `retention:30d` — The event should expire after 30 days
- `admiralty-scale:source-reliability="a"` — Completely reliable source

You can browse all available taxonomies via **Event Actions → List Taxonomies**.

### MISP Feeds

Feeds are how you import events from external organisations. The default MISP instance includes two public feeds:

- **CIRCL** — Computer Incident Response Center Luxembourg
- **botvrij.eu** — Community-driven threat feed

When enabling a feed, you choose between two ingestion modes:

| Mode | Behaviour |
|---|---|
| **Fetch** | Imports full events into your instance — useful for sync between trusted partners |
| **Cache** | Saves indicators in a local cache for correlation only — avoids polluting your instance with noisy public feed data |

### MISP Communities

MISP reaches its full potential when used within an active sharing community. Most communities are private and membership-gated, but qualifying organisations (regulated sectors, critical infrastructure, government) can access high-quality, sector-specific intelligence. Notable communities include:

- NATO Cyber Security Centre
- Forum of Incident Response and Security Teams (FIRST)
- National CERTs (CERT-EU, CERT-UA, and others)

> *No questions in this task.*

---

## Task 5 — Investigation: APT28 Campaign

### Scenario

> CIRCL republished a CERT-UA event associated with an **APT28** attack on European organisations. The adversary exploited a critical Microsoft Office CVE to target major European entities. Your company is concerned it may be next. Investigate this campaign in MISP and correlate the details with your SIEM.

This is the practical investigation exercise. Let's work through each question.

**Q1: What event ID has been assigned to the APT28 event?**

Filtering the events list by "APT28" in the Event Info field reveals the event. The assigned ID is **211**:

![Events list — APT28 event filtered (Event 211)](/images/gsoc/misp/misp-05.png)

**Q2: How does Microsoft refer to APT28 group?**

Examining the event galaxies (the coloured tags on the event), we can see the `misp-galaxy:mitre-mobile-attack-intrusion-set="APT28"` tag alongside the galaxy entry showing Microsoft's designation: **STRONTIUM**:

![APT28 event — STRONTIUM galaxy tag visible](/images/gsoc/misp/misp-06.png)

**Q3: What CVE, targeting MS Office, was used in the attack?**

Looking at the event info description and attributes, the event references **CVE-2026-21509** as the exploited vulnerability:

![APT28 event details](/images/gsoc/misp/misp-07.png)

**Q4: What is the MD5 hash of the dropped Covenant C2 DLL?**

Navigating into the event attributes and expanding the file objects, we find the **covenant.dll** file object. Expanding it reveals its associated hashes, with the MD5 being **6f528ad405bffa4a8c2f61b1fa2172fd**:

![Event attributes — covenant.dll and EhSutterShell.dll objects](/images/gsoc/misp/misp-08.png)

![covenant.dll expanded — MD5 and SHA256 hashes](/images/gsoc/misp/misp-09.png)

**Q5: What is the URL of the CERT-UA report referenced in the event attributes?**

Scrolling through the attributes, we find a **report** object containing the CERT-UA reference link along with both the Ukrainian and English language titles. The URL is **https://cert.gov.ua/article/6287250**:

![CERT-UA report link and title attributes](/images/gsoc/misp/misp-10.png)

| # | Question | Answer |
|---|---|---|
| 1 | What event ID has been assigned to the APT28 event? | `211` |
| 2 | How does Microsoft refer to APT28 group? | `STRONTIUM` |
| 3 | What CVE, targeting MS Office, was used in the attack? | `CVE-2026-21509` |
| 4 | What is the MD5 hash of the dropped Covenant C2 DLL? | `6f528ad405bffa4a8c2f61b1fa2172fd` |
| 5 | What is the URL of the CERT-UA report? | `https://cert.gov.ua/article/6287250` |

---

## Task 6 — Conclusion

The room wraps up by pointing to additional MISP resources for continued learning. The platform has far more capabilities than what was covered here — custom workflows, advanced correlation, API automation, and deep community integration.

### Additional Resources

- [MISP Book](https://www.circl.lu/doc/misp/)
- [MISP GitHub](https://github.com/MISP/MISP)
- [CIRCL MISP Training Materials](https://www.circl.lu/services/misp-training-materials/)

---

## References

- [MISP — Official Site](https://www.misp-project.org/)
- [MISP GitHub Repository](https://github.com/MISP/MISP)
- [CIRCL — Computer Incident Response Center Luxembourg](https://www.circl.lu/)
- [CERT-UA — Ukrainian CERT](https://cert.gov.ua/)
- [STIX 2.1 Standard](https://oasis-open.github.io/cti-documentation/stix/intro.html)
- [TLP — Traffic Light Protocol](https://www.first.org/tlp/)
- [TryHackMe — MISP Room](https://tryhackme.com/room/misp)
