---
title: "SEC450.1.6 — SIEM & Automation"
date: "06-08-2026"
tags: ['gsoc', 'sec450', 'siem', 'soar', 'automation', 'elastic-kibana']
summary: "SIEM capabilities, log aggregation, Kibana searching, rule creation, and SOAR automation integration."
readTime: "8 min"
---

![SEC450.1.6 — SIEM & Automation Cover](/images/gsoc/covers/450.1.6.jpg)


> **SEC 450.1 — Blue Team Tools and Operations**

---

## 1. Module Goals

This module covers [1]:

- The role of SIEM in detection
- Data flow into the SIEM
- What is a use case?
- The role of SOAR in response
- How SOAR improves the Blue Team

---

## 2. A SIEM's Job

The SIEM is one of the most important SOC tools [2]. Its duties include:

- Receive all log data
- Parse it correctly
- Filter unwanted events
- Enrich useful events with additional data
- Index logs into a searchable database
- Fast searching
- Visualization and dashboard creation
- Analytics and correlation for alerting

![SIEM duties diagram showing the core functions of a SIEM: log ingestion, parsing, filtering, enrichment, indexing, search, visualization, and alerting](/images/gsoc/sec450-1-6-slide03-a-siems-job.png)

---

## 3. SIEM Features

Key features to look for when evaluating a SIEM [3]:

- Fast search capability
- Easy & expressive query language
- Multiple visualization types
- A well-designed user interface
- Flexible alerting options
- Should make data parsing easy, no matter the log format
- Multiple types of log enrichment and correlation capability
- API for third-party tool integration
- Good documentation and vendor support
- High-performance logging agent for data collection
- Multi-format log compatibility
- High performance ingestion and indexing
- Frequent updates and modular "app" system

---

## 4. SIEM Products

Popular SIEM products in the industry [4]:

![SIEM product landscape showing major commercial and open-source SIEM platforms available to security operations teams](/images/gsoc/sec450-1-6-slide05-siem-products.png)

---

## 5. SIEM Use Cases

What is a SIEM use case? [5]

- Answers "What is the SIEM doing for us?"
- Some type of output — report, alert, dashboard, etc.
- A documented actionable item produced by the SIEM

**Examples:**
- Brute force login attempted
- Suspicious volume of upload traffic from user
- Potentially malicious download
- User added to administrator group
- Credentials submitted to phishing site

---

## 6. Crafting and Testing a New Use Case

Steps for creating a new use case [6]:

1. Clearly define the condition to identify
2. Define the data sources that can identify that condition
3. Test for correct matching on true positives
4. Test it will not match on false positives (using historical data)
5. Document details in use case database

Periodic re-testing should be performed via:
- Manual verification
- Purple Team testing
- Continuous "security validation" tools

---

## 7. Use Case Development

Use case documentation fields [7]:

| Field | Description |
|-------|-------------|
| **Name** | Descriptive title for the use case |
| **Description** | What the use case detects |
| **Problem Statement** | Why this detection matters |
| **Goals** | Expected outcomes |
| **Requirements** | Data sources and prerequisites |
| **Primary Data Source** | Main log source |
| **Secondary Data Sources** | Supporting log sources |
| **Analytic Logic** | The detection query/rule |
| **References** | External resources |
| **Suggested Analysis Steps** | How to investigate an alert |
| **False Positive Reduction Steps** | How to tune out noise |
| **Categories and Framework** | MITRE ATT&CK / Kill Chain, VERIS, compliance/audit support, threat group/attribution |

---

## 8. Use Case Databases

All use case information should be tracked closely [8]:

- **Options:** Ticketing systems, Excel, wikis, text files
- **Track alignment:**
  - To business requirements and compliance
  - To MITRE ATT&CK or other frameworks
  - Changes to analytics over time

Helps analysts understand:
- How each detection works and the theory behind it
- How to interpret data and respond
- Data sources involved

![Use case database screenshot showing a structured tracking system for SIEM use cases with columns for name, category, data source, MITRE ATT&CK mapping, and status](/images/gsoc/sec450-1-6-slide09-use-case-databases.jpg)

---

## 9. Lab SIEM: The Elastic Stack

The class lab uses the Elastic Stack [9]:

- **Logstash** — Logs ingested through Logstash
- **Elasticsearch** — Stored in Elasticsearch database
- **Kibana** — Searched and visualized in Kibana

![Elastic Stack logo and architecture showing the three components: Logstash for ingestion, Elasticsearch for storage, and Kibana for search and visualization](/images/gsoc/sec450-1-6-slide10-lab-siem-fig1.png)

![Elastic Stack component diagram showing the Logstash-Elasticsearch-Kibana pipeline with data flowing from log sources through ingestion into indexed storage and out to the analyst UI](/images/gsoc/sec450-1-6-slide10-lab-siem-fig2.png)

---

## 10. Searching with Kibana: The Discover Tab

The Discover tab in Kibana is the primary search interface for analysts [10]:

![Kibana Discover tab screenshot showing the search bar, time range selector, field list sidebar, and search results with expandable log entries](/images/gsoc/sec450-1-6-slide11-searching-with-kibana-the-discover.png)

---

## 11. Kibana Query Language Examples

KQL syntax for common search patterns [11]:

| Goal | KQL Query |
|------|-----------|
| Open search for "string" | `string` |
| `response` field containing "string" | `response:string` |
| `destination_port` field above 1024 | `destination_port > 1024` |
| Searching for multiple matches | `response:string and destination_port:80` |
| Searching for one of two things | `response:string or destination_port:80` |
| Multiple values for one field | `response:(200 or 404)` |

---

## 12. Automation and Orchestration Definition

Key definitions [12]:

- **Automation** accomplishes a specific task
- **Orchestration** chains together automated tasks into a workflow
- Think "running your playbook for you!"

**Benefits:**
- Standardization of response tasks (implements playbooks)
- Immediate response time
- Higher capacity to address alerts — reduces fatigue
- Faster onboarding for new employees
- Focused effort on things that matter
- Happier analysts that don't have to do repetitive work

---

## 13. SOAR Platforms

Security Orchestration, Automation and Response platforms [13]:

**Commercial security-oriented products:**
- Swimlane
- FortiSOAR
- NetWitness Orchestrator
- D3 XGEN SOAR
- Rapid7 Komand
- Siemplify (acquired by Google)
- Splunk SOAR
- Palo Alto Cortex XSOAR

**Free workflow automation tools** (not security-specific):
- IBM Node-RED (nodered.org)
- Huginn
- StackStorm
- n8n.io
- Airflow

---

## 14. SOAR Value-Adds

Automation of initial investigation tasks [14]:

- **Spam:** Check logs for extent of email wave
- **Web-Exploit:** Automated domain blocking
- **Command and Control:** Enrichment of domain with data from VirusTotal
- **Virus detection:** Isolate from network
- **Phishing:** Force user password expiration
- **Enrichment:** Look up passive DNS, IP address, Whois, or GeoIP info
- **Remediation:** Craft and send rebuild request to help desk

![SOAR value-adds diagram showing automated investigation and response actions mapped to common alert types: spam, web-exploit, C2, virus, phishing, enrichment, and remediation](/images/gsoc/sec450-1-6-slide15-soar-value-adds.png)

---

## 15. Putting All the SOC Tools Together

The complete SOC tool ecosystem: Events flow from collection through enrichment in the SIEM, alerts triaged in the IMS, indicators managed in the TIP, and automated responses orchestrated by the SOAR platform [15].

![Complete SOC tool ecosystem diagram showing SIEM, IMS/SIRP, TIP, and SOAR platform interconnections with event enrichment, alert triage, indicator management, and automated response workflow](/images/gsoc/sec450-1-6-slide16-putting-all-the-soc-tools.png)

---

## 16. Other Info: Unstructured Data Storage and Code Database

For everything else — need general purpose document storage [16]:

- **Unstructured or Semi-Structured Data:** OneNote, SharePoint, Wikis, Confluence, etc.
- **Code:** Git/GitHub (version-controlled storage)

**Keys to Success:**
- Real-time collaborative editing
- Easy search
- Version control and comments
- Automatic syncing
- Easy learning curve
- Rich text and picture support
- Alerting for document changes

---

## 17. SIEM and Automation Summary

Key takeaways [17]:

- **SIEM:** Logging info searched, visualized, and alerted on in the SIEM — must understand what data is available and how to read it
- **TIP:** Threat Intelligence Platform holds threat info — SIEM and IMS query/add information to indicator lists
- **IMS:** Alerts become incidents tracked in cases — cases assigned to analysts, follow playbooks for analysis
- **SOAR:** Facilitates automation, decreasing response time — immediate context gathering and data enrichment

---

## References

[1] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 135 — Module goals for SIEM and Automation

[2] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 136 — A SIEM's job: core duties and importance

[3] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 137 — SIEM features to evaluate

[4] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 138 — SIEM products overview

[5] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 139 — SIEM use cases: definition and examples

[6] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 140 — Crafting and testing a new use case

[7] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 141 — Use case development documentation fields

[8] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 142 — Use case databases and tracking

[9] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 143 — Lab SIEM: The Elastic Stack

[10] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 144 — Searching with Kibana: The Discover Tab

[11] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 145 — Kibana Query Language examples

[12] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 146 — Automation and orchestration definition

[13] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 147 — SOAR platforms: commercial and free options

[14] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 148 — SOAR value-adds: automated investigation tasks

[15] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 149 — Putting all the SOC tools together

[16] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 150 — Unstructured data storage and code database

[17] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 151 — SIEM and automation summary
