---
title: "SEC450.1.5.2 — OpenCTI (THM Room)"
date: "05-08-2026"
tags: ['gsoc', 'sec450', 'opencti', 'cti', 'tryhackme', 'threat-intelligence']
summary: "Practical guide and solution for OpenCTI TryHackMe room, exploring STIX2 structures, entities, and threat actor mapping."
readTime: "9 min"
---

![SEC450.1.5.2 — OpenCTI (THM Room) Cover](/images/gsoc/covers/450.1.5.2.jpg)


> **Platform:** TryHackMe<br/>
> **Room:** [OpenCTI](https://tryhackme.com/room/opencti)<br/>
> **Difficulty:** Medium<br/>
> **Category:** Cyber Threat Intelligence · Security Operations

---

## Overview

Managing Cyber Threat Intelligence (CTI) at scale is one of the persistent challenges security teams face. OpenCTI is an open-source platform — developed in collaboration with France's national cybersecurity agency (ANSSI) — that tackles this problem head-on. It allows teams to store, analyse, and visualise complex threat landscapes by tracking the relationships between campaigns, malware families, threat actors, and indicators of compromise, all structured using the STIX 2.1 standard and mapped against MITRE ATT&CK.

This room takes you from understanding what OpenCTI is and how data flows into it, through a full exploration of its user interface, and finishes with a realistic threat intelligence investigation involving the WhisperGate malware and Saint Bear intrusion set.

---

## Room Information

| Detail | Value |
|---|---|
| Tasks | 7 |
| Total Questions | 11 |
| Estimated Time | ~60 minutes |
| Key Tools | OpenCTI, MISP, STIX 2.1, MITRE ATT&CK |
| Credentials | `admin@opencti.thm` / `TryHackMe!` |

---

## Task 1 — Introduction

The room opens with a summary of what you will learn:

- What OpenCTI is and how it is used operationally
- How threat intelligence is sourced and ingested into the platform
- Navigating the UI and leveraging its features
- Analysing threats through the platform's relationship model
- Applying your knowledge in a practical investigation challenge

> *No questions in this task.*

---

## Task 2 — What is OpenCTI?

OpenCTI is designed to give organisations a unified knowledge graph that pulls together everything from low-level artifacts (IP addresses, hashes) to high-level strategic intelligence (campaign motivations, geopolitical context). Instead of letting threat data sit disconnected across spreadsheets and ticketing systems, it maps relationships between all entities in a single, queryable graph.

### Who Uses It?

| Use Case | How OpenCTI Helps |
|---|---|
| **Government / National Security** | Automate IOC sharing, link incidents across agencies, prioritise threats, coordinate responses |
| **Enterprise / Private Sector** | Build internal threat intelligence capability, automate detection and hunting, reduce response times |
| **Cybersecurity Service Providers** | Centralise knowledge bases, deliver CTI services to clients, feed SIEM/EDR systems |
| **Blue Teams / Incident Response** | Threat hunting, correlating observables with campaigns and TTPs, incident management |

### OpenCTI vs. MISP — Complementary, Not Competing

A common question is how OpenCTI compares to MISP. Modern security teams typically treat them as complementary parts of a pipeline rather than alternatives:

| Dimension | MISP (Event-Focused) | OpenCTI (Knowledge-Focused) |
|---|---|---|
| **Core Question** | What indicators should I block and share? | Who is attacking us, why, what tools are they using, and how does it map to our organisation? |
| **Data Focus** | Technical, flat lists of IOCs | Strategic context connecting threats, campaigns, vulnerabilities, and TTPs |
| **Core Structure** | Lightweight, event-driven indicator correlation | Interconnected knowledge graph built on the STIX standard |

Threat data frequently flows from MISP into OpenCTI via a one-way connector to enrich the broader threat profile.

> *No questions in this task.*

---

## Task 3 — Data Sources & Ingestion

OpenCTI does not ship with data pre-installed. It is a collaborative platform designed to ingest from a range of intelligence feeds:

- **Structured Frameworks & Repositories** — MITRE ATT&CK and the National Vulnerability Database (NVD) provide standardised behaviour and exploit data
- **Threat Intelligence Platforms** — Community platforms like MISP and AlienVault OTX feed indicators directly in
- **Internal Threat Teams** — Your own researchers, IR teams, and SOC analysts can manually upload incident files
- **Commercial Feeds** — Premium subscriptions from providers like CrowdStrike deliver curated intelligence
- **Infrastructure & OSINT Trackers** — Shodan, VirusTotal, and similar projects are monitored by platform connectors

### Connectors

Data ingestion is handled by **Connectors** — background processes that fetch, normalise, and import data:

| Connector Type | Function |
|---|---|
| **External Input** | Automatically pull live threat feeds and community data |
| **Internal Import** | Parse manually uploaded local documents (PDF reports, CSV indicator lists) |

You can explore the active connectors in your instance by navigating to **Data → Connectors** in the sidebar:

![Data tab showing connectors and ingestion methods](/images/gsoc/opencti/opencti-22.png)

### STIX 2.1 — The Data Language

Once data passes through a connector, OpenCTI structures it using **STIX 2.1** (Structured Threat Information Expression) — an industry-standard format that enables different tools and teams to exchange intelligence without translation issues:

| STIX Object | Purpose |
|---|---|
| **SDO** (Domain Object) | Represents threat objects: attack patterns, threat actors, malware families |
| **SCO** (Cyber Observable) | Technical indicators: IP addresses, domain names, file hashes |
| **SRO** (Relationship Object) | Maps the precise relationship between SDOs and SCOs |

> *No questions in this task.*

---

## Task 4 — Navigating the UI: Hot Knowledge

When you first log into OpenCTI, the dashboard presents a high-level overview of all stored intelligence data — statistics, timelines, and geolocation data. This landing page is fully customisable.

![OpenCTI main dashboard](/images/gsoc/opencti/opencti-01.png)

The platform's menu is divided into two major sections: **Hot Knowledge** (items requiring active analysis) and **Cold Knowledge** (the structural encyclopedia). This task covers Hot Knowledge.

### Analyses

The **Analyses** section holds reports, groupings, malware analysis notes, and external documentation. Selecting any report opens several investigation tabs:

- **Overview** — High-level summary of the object or report
- **Knowledge** — The analytical core, visualising linked intelligence data in a graph format
- **Entities** — Structured breakdown of all associated entities (tools, groups, malware, tactics)

![Analyses section — reports listing](/images/gsoc/opencti/opencti-06.png)

![APT1 report — overview, knowledge graph, and entities composite](/images/gsoc/opencti/opencti-03.png)

### Cases

The **Cases** section is a case management system for organising responses to cybersecurity events. Unlike static threat reports, a case acts as a living container for tracking ongoing investigations, assigning tasks, and consolidating evidence.

![Cases section — Incident responses](/images/gsoc/opencti/opencti-08.png)

Clicking into a specific case reveals its full details:

![Exfiltration Alert — WebServer-01 case overview](/images/gsoc/opencti/opencti-09.png)

### Events

The **Events** section logs security telemetry, confirmed incidents, raw system detections, and incoming alerts from SIEMs, EDRs, or SOARs. Analysts can track indicators and map activity onto existing threat intelligence profiles.

### Observations

The **Observations** section is the primary location for technical data and forensic artifacts. It splits into:

- **Observables** — IP addresses, domain names, and similar indicators
- **Artifacts** — Raw physical files such as malware samples
- **Indicators** — Detection patterns expressed as YARA, Sigma, or STIX rules
- **Infrastructure** — Resources used by adversaries

### Questions & Answers

To answer the Task 4 questions, we need to explore specific reports and cases within the Analyses section.

**Q1: Check out the Poison Ivy threat report. Which campaign relied on the use of the Strategic Web Compromise attack pattern?**

Navigating to the Poison Ivy report and opening the **Entities** tab, we filter by **Attack Pattern**. The "Strategic Web Compromise Attack Pattern" entry shows it was used by the **th3bug** campaign:

![Poison Ivy report — Entities tab filtered to Attack Patterns](/images/gsoc/opencti/opencti-05.png)

**Q2: When viewing the threat intelligence report for APT37, how many distinct malware entities are listed?**

Opening the APT37 report and filtering the Entities tab by **Malware** reveals **8** distinct malware families:

![APT37 report — 8 malware entities](/images/gsoc/opencti/opencti-07.png)

**Q3: Which directory path was targeted in the Exfiltration Alert case?**

Navigating to **Cases → Incident Responses** and opening the "Exfiltration Alert - WebServer-01" case, the description states evidence of web shell persistence was found in `/var/www/html/uploads/`:

![Exfiltration Alert case — directory path in description](/images/gsoc/opencti/opencti-09.png)

| # | Question | Answer |
|---|---|---|
| 1 | Which campaign relied on the use of the Strategic Web Compromise attack pattern? | `th3bug` |
| 2 | How many distinct malware entities are listed for APT37? | `8` |
| 3 | Which directory path was targeted in the Exfiltration Alert case? | `/var/www/html/uploads/` |

---

## Task 5 — Navigating the UI: Cold Knowledge

Cold Knowledge serves as the platform's structural encyclopedia — the permanent background data about the threat landscape.

### Threats

The **Threats** section provides an overview of:

- **Threat Actors (Groups)** — Structured malicious organisations, nation-state agencies, cybercriminal groups
- **Threat Actors (Individuals)** — Specific human operators known or suspected of malicious activity
- **Intrusion Sets** — Tracked baselines of recurring technical behaviours, infrastructure patterns, and adversarial toolkits
- **Campaigns** — Attacks occurring over a specific timeframe or targeting a specific sector

![Threats — Intrusion Sets listing](/images/gsoc/opencti/opencti-18.png)

Clicking into any entity exposes its full knowledge graph, timeline, and global kill chain mapping.

### Arsenal

The **Arsenal** section catalogues the software, tools, and vulnerabilities that attackers rely on. Within each entity, you can find detailed technical documentation on malware families, commonly abused legitimate tools, and critical CVEs mapped from vulnerability databases.

![Arsenal — DCRAT tool search](/images/gsoc/opencti/opencti-12.png)

![DCRAT — latest relationships showing USES connections](/images/gsoc/opencti/opencti-13.png)

### Techniques

The **Techniques** section maps attack patterns to MITRE ATT&CK, including operational narratives and courses of action with mitigation strategies.

### Entities & Locations

These final two Cold Knowledge sections provide real-world context: **Entities** maps targeted identities and organisational structures; **Locations** catalogues geographic tracking data by region, country, and city.

### Questions & Answers

**Q1: What command has Andariel used during the Discovery phase to display TCP connections on target servers?**

Searching for "Andariel" and navigating to the Knowledge timeline, we find technique **T1049 — System Network Connections Discovery**, which shows the command used:

![Andariel — Global search result](/images/gsoc/opencti/opencti-10.png)

![Andariel timeline — T1049 showing the netstat command](/images/gsoc/opencti/opencti-11.png)

**Q2: Using the Arsenal section, which threat group is noted as using the DCRAT tool?**

Navigating to **Arsenal → Tools** and searching for "DCRAT", then examining its relationships, we see the USES relationship pointing to the intrusion set **APT-C-36**:

![DCRAT relationships — APT-C-36 listed](/images/gsoc/opencti/opencti-13.png)

| # | Question | Answer |
|---|---|---|
| 1 | What command has Andariel used during the Discovery phase to display TCP connections? | `netstat -naop tcp` |
| 2 | Which threat group is noted as using the DCRAT tool? | `APT-C-36` |

---

## Task 6 — Investigation: WhisperGate & Saint Bear

### Scenario

> You are a threat intelligence analyst at a global MSSP supporting critical infrastructure clients. A wave of destructive attacks has hit your client's related sectors. Your team must profile two emerging threats in OpenCTI: the **WhisperGate** malware family and the **Saint Bear** intrusion set.

This task is a realistic CTI investigation exercise. Let's work through each question.

### WhisperGate Investigation

**Q1: How many attack pattern relations are linked to the WhisperGate malware?**

Navigating to **Arsenal → Malware** and searching for "WhisperGate", we open its **Knowledge** tab. The attack patterns are listed across multiple tactic categories (discovery, stealth, etc.). Counting all attack pattern relations gives us **28**:

![WhisperGate overview — correlated with Saint Bear](/images/gsoc/opencti/opencti-14.png)

![WhisperGate Knowledge — attack patterns (discovery, stealth categories)](/images/gsoc/opencti/opencti-15.png)

**Q2: Which Windows utility does WhisperGate use to disable Windows Defender?**

Scrolling through the attack patterns, technique **T1218.004 — InstallUtil** reveals that WhisperGate uses `InstallUtil.exe` to disable Windows Defender:

![T1218.004 — InstallUtil.exe used to disable Windows Defender](/images/gsoc/opencti/opencti-16.png)

**Q3: Which flag does WhisperGate use with the ExitWindowsEx function to shut down a target host?**

Technique **T1529 — System Shutdown/Reboot** shows WhisperGate uses the `EXW_SHUTDOWN` flag with the `ExitWindowsEx` function:

![T1529 — EXW_SHUTDOWN flag with ExitWindowsEx](/images/gsoc/opencti/opencti-17.png)

### Saint Bear Investigation

**Q4: What is the name of the downloader malware commonly paired with OutSteel in Saint Bear campaigns?**

Navigating to **Threats → Intrusion Sets** and searching for "Saint Bear", the overview reveals it is notable for using the remote access tool Saint Bot alongside OutSteel. The downloader malware is **Saint Bot**:

![Saint Bear intrusion set — overview with description mentioning Saint Bot](/images/gsoc/opencti/opencti-19.png)

**Q5: Which tool has Saint Bear used to exfiltrate data to cloud storage services?**

Examining the knowledge graph for Saint Bear (also tracked as Ember Bear), technique **T1567.002 — Exfiltration to Cloud Storage** shows the group has used **Rclone** to exfiltrate data to services like mega.nz:

![T1567.002 — Rclone used for exfiltration to cloud storage](/images/gsoc/opencti/opencti-20.png)

**Q6: Which Microsoft Exchange vulnerability has Saint Bear been witnessed exploiting?**

Checking the Arsenal → Vulnerabilities section for CVEs linked to Saint Bear, we find **CVE-2022-41040** (dubbed "ProxyNotShell"), a server-side request forgery vulnerability in Microsoft Exchange:

![CVE-2022-41040 — ProxyNotShell vulnerability detail](/images/gsoc/opencti/opencti-21.png)

| # | Question | Answer |
|---|---|---|
| 1 | How many attack pattern relations are linked to WhisperGate? | `28` |
| 2 | Which Windows utility does WhisperGate use to disable Windows Defender? | `InstallUtil.exe` |
| 3 | Which flag does WhisperGate use with ExitWindowsEx to shut down a target host? | `EXW_SHUTDOWN` |
| 4 | What downloader malware is commonly paired with OutSteel in Saint Bear campaigns? | `Saint Bot` |
| 5 | Which tool has Saint Bear used to exfiltrate data to cloud storage? | `Rclone` |
| 6 | Which Microsoft Exchange vulnerability has Saint Bear exploited? | `CVE-2022-41040` |

---

## Task 7 — Conclusion

OpenCTI's power lies in its entity-relationship model. Starting from a single artifact, you can pivot through the knowledge graph to build a complete picture of an adversary's campaign — their tools, techniques, infrastructure, and targets.

---

## References

- [OpenCTI — Official Site](https://www.opencti.io/)
- [STIX 2.1 Specification](https://oasis-open.github.io/cti-documentation/stix/intro.html)
- [MITRE ATT&CK Framework](https://attack.mitre.org/)
- [ANSSI — French National Cybersecurity Agency](https://www.ssi.gouv.fr/en/)
- [MISP — Threat Intelligence Platform](https://www.misp-project.org/)
- [TryHackMe — OpenCTI Room](https://tryhackme.com/room/opencti)
