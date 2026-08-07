---
title: "SEC450.1.4.1 — Incident Management Systems"
date: "04-08-2026"
tags: ['gsoc', 'sec450', 'incident-management', 'thehive', 'playbooks']
summary: "Ticketing and case management systems, security playbooks, metrics tracking, and investigation lifecycle."
readTime: "8 min"
---

![SEC450.1.4.1 — Incident Management Systems Cover](/images/gsoc/covers/450.1.4.1.jpg)


> **SEC 450.1 — Blue Team Tools and Operations**

---

## 1. SOC Data Organization

A common security operations group requires solutions for [1]:

1. Alert queueing and active incident tracking and management
2. Collecting, organizing, and updating threat intelligence
3. Log data management, visualization, correlation, search, and alerting
4. Automation of investigative actions
5. Code repositories
6. Unstructured data storage

---

## 2. Tools for SOC Data Organization and Search

Key tool categories [2]:

- **Incident Management System (IMS/SIRP):** Tracking alerts, incident status, and associated indicators
- **Threat Intelligence Platform (TIP):** Collecting indicators and higher-level intelligence
- **SIEM:** Log collection, indexing, search, correlation, and alerting
- **Security Orchestration, Automation and Response (SOAR):** Automating common tasks and orchestrating workflow
- **Knowledge Database/Source Code Repository:** All SOC documents, code, playbooks, and use cases

---

## 3. Incident Management Systems (IMS)

Options for incident management software [3]:

- **Traditional ticketing solutions**
- **SIEM built-in solutions**
- **Security-tailored incident management software** (commercial or open-source)

Commercial solutions offer many options but require choosing carefully based on workflow, integrations, and requirements. Open-source options are fewer but can suit low-budget teams. This is a very important choice requiring extensive testing — management should not be swayed by vendors promising to do everything.

---

## 4. Incident Management Systems — Systems View

The IMS workflow [4]:

1. Alerts/incidents received → case created in ticket queue
2. Cases assigned to analysts (by full case or by sub-task/playbook step)
3. Analyst works all tasks in a playbook to completion
4. Case closed; observables associated with cases across time

The IMS exchanges IOCs with a TIP and automated actions/context with a SOAR platform.

![IMS systems view: alerts triaged in SIEM/IMS, cases created with analyst assignment, playbook tasks worked, IOCs exchanged with TIP, automated actions via SOAR, outputting closed cases and metrics](/images/gsoc/sec450-1-4-slide05-incident-management-systems-systems.png)

---

## 5. Incident Management System Features

Since the IMS will be one of an analyst's main tools, it must be enjoyable to use. Non-obvious but important features [5]:

- Built-in knowledge database/wiki
- Workflow customization
- Mass close/open/edit actions
- Playbook-oriented workflow
- Automation integration
- Rich text notes with inline pictures/tables
- Indicator database integration
- Quick keyboard navigation

---

## 6. Playbooks

In this class, a playbook is defined as a set of expected actions for alert response [6]:

- Implemented through an IMS or SOAR platform
- Contain required and optional steps for analysis and closure
- Guide analysts toward standardized analysis and completeness
- Unique for each type of case (e.g., phishing vs. malware playbooks)

**Example phishing playbook:** Malicious email wave received → Block all URLs → Delete from inboxes → Check proxy log for clicks → Reset password for victims

![Example phishing playbook flow: malicious email wave received, block URLs, delete from inboxes, check proxy for clicks, reset passwords for victims](/images/gsoc/sec450-1-4-slide07-playbooks.png)

---

## 7. Creating Successful Playbooks

Guide for playbook creation [7]:

1. **Careful planning** — consider what you're trying to achieve and which actions will get you there in the best/fastest way
2. **Select the best steps and their order** — without over-defining actions or the playbook becomes unmanageable
3. **Consider which steps are mandatory versus optional**
4. **Enumerate those steps** into a workflow in your IMS
5. **Continuously revise and update** the playbook based on the success of alerts or investigations run with it

---

## 8. Incident Categorization Frameworks

Two examples [8]:

- **VERIS** (Vocabulary for Event Recording and Incident Sharing) — captures the 4 A's: Actor, Action, Asset, and Attributes; used to collect yearly DBIR report data
- **US-CERT Incident Reporting System Categories** — medium-level detail designating "what," "how," and impact

---

## 9. Classification Options: VERIS

VERIS breaks an incident into four branches [9]:

- **Actor:** Whose actions affected the asset — External, Internal, Partner
- **Action:** What actions affected the asset — Malware, Hacking, Social, Physical
- **Asset:** Which assets were affected — Hosting, Variety, Ownership, Management
- **Attribute:** How the asset was affected — Confidentiality/Possession, Integrity/Authenticity, Availability/Utility

![VERIS framework classification tree: Actor (External/Internal/Partner), Action (Malware/Hacking/Social/Physical), Asset (Hosting/Variety/Ownership), Attribute (Confidentiality/Integrity/Availability)](/images/gsoc/sec450-1-4-slide10-classification-options-veris.png)

---

## 10. US-CERT Incident Categorization

US-CERT categorization uses NCISS-based scores (0–100) based on weighted categories [10]:

- **Functional Impact:** No impact → DoS/Loss of Control
- **Information Impact:** No impact → Destruction of critical system
- **Recoverability:** Regular → Not recoverable
- **Attack Vectors:** Web, Phishing, External Media, Impersonation, Improper Usage, Theft, etc.
- **Incident Attributes:** Location of Observed Activity (Perimeter → Safety Systems), Actor characterization

---

## 11. TheHive: Incident Management System

TheHive is the open-source IMS used for this class [11]:

- Incidents organized and assigned by **case**
- Cases follow steps in a pre-made **case template** (playbooks)
- Cases have **tasks** to be completed (playbook steps)
- Tasks have associated **worklogs** (notes on working that task)
- Cases can have **observables** assigned (IOCs)
- Observables can be enriched by **analyzers** enabled in the Cortex engine

---

## 12. TheHive's Workflow Illustrated

TheHive workflow [12]:

SIEM Alerts → **Alert Queue** → Accepted alerts become a **Case** → **Case Template** (Playbook) provides pre-set tasks → Individual **Tasks** generate **Task Logs** (notes) → Cases produce **Observables** (IOCs) → Enriched via **Cortex** engine

![TheHive workflow diagram: SIEM alerts flow into Alert Queue, accepted alerts become Cases with Case Templates (Playbooks), Tasks generate Task Logs, Observables enriched via Cortex engine](/images/gsoc/sec450-1-4-slide13-thehives-workflow-illustrated.png)

---

## 13. TheHive: Case and Task Assignment

Both cases and tasks can be assigned to an analyst [13] — not all IMSs support this granular level of assignment:

- Enables easier collaborative/tierless SOC operations
- A newer analyst can take easier tasks while a senior analyst takes complex tasks
- The newer analyst can read the senior analyst's work logs and learn over time
- Better load balancing and easier shift changeover

![TheHive case and task assignment screenshot showing how both cases and individual tasks can be assigned to specific analysts for collaborative work](/images/gsoc/sec450-1-4-slide14-thehive-case-and-task-assignment.png)

---

## 14. TheHive: Example Case Template

Example phishing case template ("Phishing Wave — attachments") [14]:

- Tasks organized by group: **Recon, Delivery, Exploit, Install, C2, Response**
- Each with a specific question or action (e.g., "What exploit does the file use?", "Block email address of sender")
- Assigned to a specific analyst

Analysts can create new observables by specifying type (domain, hash, IP, file, URL), value, TLP marking, IOC/sighting flags, tags, and description.

![TheHive phishing case template screenshot: tasks organized by kill chain phase (Recon, Delivery, Exploit, Install, C2, Response) with analyst assignments and observable creation form](/images/gsoc/sec450-1-4-slide15-thehive-example-case-template.jpg)

![TheHive case template detail view showing task groups and individual task descriptions with analyst assignments for a phishing investigation playbook](/images/gsoc/sec450-1-4-slide16-thehive-example-case-template.png)

---

## 15. TheHive: Case Closure

Once all tasks are completed, cases can be classified and closed [15]:

- **Status:** True Positive, False Positive, Indeterminate, Other
- **Impact:** Yes/No (did something alter availability, integrity, or confidentiality?)
- **Summary:** Free-text description
- Additional structured info: VERIS Delivery Category, Incident Detection method, System Impact, Type of System Affected

![TheHive case closure form: Status dropdown (True Positive/False Positive/Indeterminate), Impact toggle, Summary text, and VERIS-based categorization fields](/images/gsoc/sec450-1-4-slide17-thehive-case-closure.jpg)

---

## 16. Incident Management Systems Summary

Key takeaways [16]:

- The IMS is one of the most important pieces of software an analyst will use — **test the interface thoroughly**, or you will be miserable
- Cases should be created from validated alerts, with context parsed into fields
- Playbooks guide analysts through tasks; tasks assigned based on pre-made playbooks
- Observables should be entered as discovered, ideally automatically
- Cases should be closed with categorizations for metrics
- Metrics should drive improvement of the team

---

## References

[1] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 87 — SOC data organization: required solutions

[2] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, pp. 88–89 — SOC tool categories: IMS, TIP, SIEM, SOAR, knowledge base

[3] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, pp. 90–91 — Incident management system options and systems view

[4] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 91 — IMS systems view: workflow from alerts to closed cases

[5] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 92 — IMS features: non-obvious but important capabilities

[6] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 93 — Playbooks: definition and example phishing flow

[7] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 94 — Creating successful playbooks: planning and revision

[8] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 95 — Incident categorization frameworks: VERIS and US-CERT

[9] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 96 — VERIS classification: Actor, Action, Asset, Attribute

[10] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 97 — US-CERT incident categorization: NCISS-based scoring

[11] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 99 — TheHive: open-source IMS used in class

[12] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 100 — TheHive workflow: alerts to cases to tasks

[13] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 101 — TheHive case and task assignment for collaborative SOC

[14] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, pp. 102–103 — TheHive example case template: phishing playbook with observables

[15] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 104 — TheHive case closure: status, impact, categorization

[16] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 105 — Incident management systems summary
