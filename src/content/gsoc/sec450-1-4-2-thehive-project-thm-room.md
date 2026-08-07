---
title: "SEC450.1.4.2 — TheHive Project (THM Room)"
date: "04-08-2026"
tags: ['gsoc', 'sec450', 'thehive', 'cortex', 'tryhackme', 'case-management']
summary: "Hands-on walkthrough of TheHive Project room on TryHackMe, setting up cases, observables, and Cortex analyzers."
readTime: "7 min"
---

![SEC450.1.4.2 — TheHive Project (THM Room) Cover](/images/gsoc/covers/450.1.4.2.jpg)


> **Platform:** TryHackMe<br/>
> **Room:** [TheHive Project](https://tryhackme.com/room/thehiveproject)<br/>
> **Difficulty:** Easy<br/>
> **Category:** Security Operations · Incident Response

---

## Overview

TheHive is an open-source, scalable Security Incident Response Platform built for SOCs, CSIRTs, and CERTs. It gives analysts a single pane of glass for tracking, investigating, and acting on security incidents — from initial alert triage all the way through containment and documentation.

This room walks through the platform's core philosophy, its feature set and integrations, the built-in role-based access model, and culminates in a hands-on exercise where you create a real case from captured network traffic. By the end, you should be comfortable navigating TheHive's interface and building a fully documented investigation case from scratch.

---

## Room Information

| Detail          | Value                               |
| --------------- | ----------------------------------- |
| Tasks           | 6                                   |
| Total Questions | 6                                   |
| Estimated Time  | ~45 minutes                         |
| Key Tools       | TheHive, Cortex, MISP, MITRE ATT&CK |

---

## Task 1 — Introduction

The opening task sets the stage for what the room will cover:

- What TheHive is and why it matters in a SOC environment
- A walkthrough of its major features and third-party integrations
- How to navigate the web UI
- A practical exercise creating a full investigation case

There are no questions here — just orientation. The room also prompts you to download an attached **PCAP file** that will be needed in Task 5, so grab that before moving on.

---

## Task 2 — What is TheHive Project?

TheHive is designed around three core pillars that define how security teams interact with it:

| Pillar | Purpose |
|---|---|
| **Collaborate** | Multiple analysts can work the same case simultaneously with real-time live-stream updates on new observables, tasks, and IOCs |
| **Elaborate** | Investigations are broken into granular tasks with attached evidence, progress notes, and reusable templates |
| **Act** | Rapid triage through observable management, IOC flagging, tagging, and automated threat intelligence enrichment |

Think of TheHive as the central nervous system of an incident response workflow. Every artifact, every analyst note, every decision point lives in one place — accessible to the whole team in real time.

> *No questions in this task.*

---

## Task 3 — TheHive Features & Integrations

This task dives into the specific capabilities that make TheHive a practical tool for day-to-day analyst work:

- **Case & Task Management** — Every investigation maps to a case that can be decomposed into individual tasks. Analysts attach evidence, add tags, write notes, and leverage reusable templates for common incident types.

- **Alert Triage** — External sources (SIEM alerts, email reports, threat feeds) push alerts into TheHive. Analysts review and decide whether to escalate each alert into a full investigation.

- **Observable Enrichment via Cortex** — Cortex is an analysis and active response engine that integrates directly with TheHive. When threat indicators are added to a case, Cortex performs automated correlation analysis and pattern development to extract additional context.

- **Active Response** — Responders allow analysts to take direct action from within a case — sending notifications, isolating hosts, or sharing intelligence with partner organizations.

- **Custom Dashboards** — Configurable views across cases, tasks, and observables, useful for generating KPIs around the team's security posture.

- **MISP Integration** — Connects TheHive to the MISP threat intelligence platform, enabling bidirectional IOC sharing: import indicators from MISP events into cases, or push newly discovered indicators back out to the community.

- **Third-Party Alert Feeders** — Tools like **DigitalShadows2TH** and **ZeroFox2TH** pull threat data from their respective platforms and transform it into TheHive cases or merge it with existing ones using predefined IR templates.

### Question & Answer

| # | Question | Answer |
|---|---|---|
| 1 | Which open-source platform supports the analysis of observables within TheHive? | `Cortex` |

---

## Task 4 — User Profiles & Permissions

TheHive ships with a built-in user management system. Administrators can create organizations, add analysts, and assign roles using four default profiles:

| Profile | Capabilities |
|---|---|
| `admin` | Full platform administration — **cannot** manage cases or investigation data |
| `org-admin` | Manages users and org-level config; can create/edit cases, tasks, observables; can run analysers |
| `analyst` | Creates and edits cases, tasks, observables; runs analysers and responders |
| `read-only` | View-only access across cases, tasks, and observables |

The intentional restriction on the `admin` profile is a deliberate separation-of-duties design: platform administration and investigative work are kept cleanly apart.

Each profile is backed by specific permissions. The key ones include:

| Permission | Function |
|---|---|
| `manageOrganisation` | Create & update organisations |
| `manageCase` | Create, update & delete cases |
| `manageObservable` | Create, update & delete observables |
| `manageAction` | Execute actions *(Cortex required)* |
| `manageUser` | Create, update & delete users |
| `manageShare` | Share cases, tasks & observables across organisations |
| `manageAnalyse` | Execute analysis *(Cortex required)* |

Administrators can further extend the platform with custom case fields, custom observable types, custom analyser templates, and direct imports from the **MITRE ATT&CK** framework.

### Questions & Answers

| # | Question | Answer |
|---|---|---|
| 1 | Which pre-configured account cannot manage any cases? | `admin` |
| 2 | Which permission allows a user to create, update or delete observables? | `manageObservable` |
| 3 | Which permission allows a user to execute actions? | `manageAction` |

---

## Task 5 — Hands-On: Creating a Case

### Scenario

> You have captured network traffic on your network after suspicion of data exfiltration. The traffic corresponds to FTP connections that were established. Your task is to analyse the traffic and create a case on TheHive to facilitate the progress of an investigation.

This is the practical exercise where everything comes together. We log into TheHive using the provided analyst credentials.

### Step 1 — Creating the Case

After logging in, we're greeted by the main dashboard. Clicking **New Case** opens the case creation form where we configure the key metadata:

![TheHive login page](/images/gsoc/thehive/thehive-01.png)

![Creating a new case with severity, TLP, and PAP settings](/images/gsoc/thehive/thehive-02.png)

- **Severity** — Reflects impact level (Low → Critical). Given confirmed exfiltration behaviour, this is set high.
- **TLP (Traffic Light Protocol)** — Governs information sharing restrictions. The colour scale runs from White (full disclosure) to Red (no disclosure/restricted).
- **PAP (Permissible Actions Protocol)** — Indicates what actions are permitted without risking detection by the adversary. Uses a colour scheme drawn from MISP taxonomies.

We also define several investigation tasks within the case to structure the workflow from start to finish.

### Step 2 — Mapping TTPs

With the case created, we navigate to the **TTP** section and map the relevant tactics and techniques from the MITRE ATT&CK framework:

- **Tactic:** Exfiltration
- **Technique:** T1048.003 — *Exfiltration Over Unencrypted/Obfuscated Non-C2 Protocol*

This maps directly to the FTP-based exfiltration observed in the PCAP. Importing from MITRE ATT&CK provides immediate context for any analyst who picks up the case later.

![Case overview showing tasks and investigation details](/images/gsoc/thehive/thehive-03.png)

![MITRE ATT&CK TTP mapping within TheHive](/images/gsoc/thehive/thehive-04.png)

### Step 3 — Adding Observables

Next, we head to the **Observables** tab to register the threat indicators tied to this case. The key fields when adding an observable:

| Field | Description |
|---|---|
| **Type** | The data type (e.g. IP address, Hash, Domain) |
| **Value** | The actual observable value |
| **TLP** | How the information should be shared |
| **Is IOC** | Flag if this is a confirmed Indicator of Compromise |
| **Has been sighted** | Mark if it's appeared in a previous investigation |
| **Tags** | Context labels (e.g. MITRE Tactic, Malware type) |

We add the **source IP address** from the FTP connections as our first observable and flag it as an IOC. We then upload the **PCAP file** itself as an observable — demonstrating that files are first-class evidence artifacts in TheHive, not just IPs or hashes.

![Adding observables — IP address and PCAP file](/images/gsoc/thehive/thehive-05.png)

After the PCAP is successfully uploaded, navigating to the flag page confirms everything is registered correctly:

![Flag confirmation page](/images/gsoc/thehive/thehive-06.png)

### Questions & Answers

| #   | Question                                                                                                      | Answer                       |
| --- | ------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 1   | Where are the TTPs imported from?                                                                             | `MITRE ATT&CK`               |
| 2   | According to the framework, what type of detection "Data source" would our investigation be classified under? | `Network Traffic`            |
| 3   | Flag                                                                                                          | `THM{FILES_ARE_OBSERVABLES}` |

---

## Task 6 — Conclusion

The room wraps up by encouraging further exploration of TheHive's integrations — particularly **Cortex** for automated observable analysis and **MISP** for threat intelligence sharing.

---

## References

- [TheHive Project — Official Site](https://thehive-project.org/)
- [Cortex — Observable Analysis Engine](https://github.com/TheHive-Project/Cortex)
- [MISP — Threat Intelligence Platform](https://www.misp-project.org/)
- [MITRE ATT&CK Framework](https://attack.mitre.org/)
- [TryHackMe — TheHive Project Room](https://tryhackme.com/room/thehiveproject)
