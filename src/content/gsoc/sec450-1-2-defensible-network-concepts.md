---
title: "SEC450.1.2 — Defensible Network Concepts"
date: "05-08-2026"
tags: ['gsoc', 'sec450', 'network-security', 'monitoring', 'nsm']
summary: "Understanding defensible networks, network vs host monitoring, data collection, and log centralization."
readTime: "9 min"
---

![SEC450.1.2 — Defensible Network Concepts Cover](/images/gsoc/covers/450.1.2.jpg)


> **SEC 450.1 — Blue Team Tools and Operations**

---

## 1. Module Goals

This module covers [1]:

- What makes a network "defensible"
- The types of data monitoring required for security
- Network-based security monitoring
- Endpoint and application monitoring and cloud monitoring
- Monitored data centralization concepts
- Formatting different data types for centralization

---

## 2. Defensible Networks

According to Richard Bejtlich, a defensible network is [2]:

- **Monitored:** Network and host data is captured and centralized
- **Inventoried:** Knowing your network
- **Controlled:** Traffic ingress/egress, network connection access
- **Claimed:** Owners of services known, operation of assets planned
- **Minimized:** System attack surface is reduced
- **Assessed:** Weaknesses identified, defenses tested
- **Current:** Patched and known vulnerabilities addressed
- **Measured:** SOC and IT measure progress against previous steps

Together these give the organization a chance to resist intrusion — including knowing who owns an asset and how to contain and recover it.

---

## 3. Two Sides of Monitoring

Monitoring can be thought of in two main categories [3]:

- **Network Monitoring** — Analyzing data in transit
- **Endpoint/Application Monitoring** — Analyzing data at rest on hosts

Not a perfect division of data types, but helpful for discussion.

![Split view showing the two sides of monitoring: Network Monitoring on the left and Endpoint/Application Monitoring on the right](/images/gsoc/sec450-1-2-slide04-two-sides-of-monitoring.png)

---

## 4. What Can You See on Your Network?

Consider your network data collection [4]:

- Can you see high-level bandwidth statistics and traffic flow?
- Do you know which ports are actually in use?
- Which protocols are actually being used on those ports?
- What applications are being accessed with those services?
- Do you know which domains are being visited and by whom?
- Can you retrieve the full packet data from the transaction?
- Can you detect suspicious encrypted traffic?

---

## 5. Network Security Monitoring

Network Security Monitoring (NSM) analyzes network traffic — "data in motion" [5]:

- **Network Services:** DNS, HTTP(S), SMB, RDP, FTP, SSH, etc.
- May be logged by an endpoint or a network sensor
- Using network data to identify suspicious behavior:
  - Exploit delivery
  - Suspicious file transfers
  - Internal network recon and pivoting
  - Command and control traffic / data exfiltration
  - Suspicious usage of network protocols

---

## 6. Where Are We Monitoring?

Monitoring points span the environment [6]:

- Internet-facing traffic
- Cloud traffic
- Perimeter subnets
- Internal server subnets
- User subnets
- Remote workers

![Network environment diagram showing monitoring points: internet-facing traffic, cloud, perimeter subnets, internal servers, user subnets, and remote workers](/images/gsoc/sec450-1-2-slide07-where-are-we-monitoring.png)

---

## 7. What Can You See on Your Endpoints?

Consider your endpoints [7]:

- What's running, what command line arguments were used?
- Has anyone installed unauthorized programs?
- Which scripts have been running?
- What exploits is the system vulnerable to?
- Have any critical system files or configurations changed?
- Do any systems have suspicious startup items?
- Who has been logging in to the system and how?

---

## 8. Endpoint and Application Monitoring

Also known as Continuous Security Monitoring (CSM) [8]:

- Typical endpoint data — "data at rest":
  - Configuration and baseline monitoring
  - Vulnerability scanning
  - File/registry integrity monitoring
  - Running processes, services
  - Autorun items
- Application Logs:
  - Access and authentication logs
  - Activity audit logs
  - Other security-relevant activity

---

## 9. Endpoint Event Collection Illustrated

Endpoint collection sources [9]:

- **Security suite logging:** EDR/XDR, endpoint protection suites, antivirus, HIDS/HIPS, vulnerability scanners, FIM, application control
- **OS & Application Logs:** Authentication logs, service and process logging, autorun items, application access and audit logs

All feeding into the SIEM.

![Endpoint event collection architecture: security suite logging (EDR/XDR, AV, HIDS/HIPS, vulnerability scanners, FIM, app control) and OS/application logs all feeding into the SIEM](/images/gsoc/sec450-1-2-slide10-endpoint-event-collection-illustrated.png)

---

## 10. What About the Cloud?

Cloud services introduce logging at multiple levels of abstraction [10]:

- **Execution logs** (FaaS)
- **Application logs** (SaaS)
- **Platform logs** (PaaS)
- **Host logs** (IaaS)
- **Cloud Service/Management Plane logs** (AWS, Azure, GCP account/service usage)

![Cloud service abstraction layers: Execution (FaaS), Application (SaaS), Platform (PaaS), Host (IaaS), and Cloud Service/Management Plane logs showing what each level generates](/images/gsoc/sec450-1-2-slide11-what-about-the-cloud.png)

The **shared-responsibility model** determines which layers you manage versus the provider. Unauthorized access at the underlying OS layer could let attackers log in and act freely.

![Cloud shared responsibility model showing the sliding scale of customer vs. provider responsibility across On-Site, IaaS, PaaS, and SaaS deployment models](/images/gsoc/sec450-1-2-slide12-what-about-the-cloud.png)

---

## 11. Do We Need High Quality X If We Have Y?

Two common questions [11]:

1. "If I have really good endpoint logs, do I need network data?"
2. "I have really good network data but don't have good endpoint visibility — is that ok?"

The right answer depends on your expected threats, network, team expertise, and available budget.

---

## 12. When Network and Endpoint Data Isn't Enough

Two illustrative scenarios [12]:

**Malware File:**
- Suspicious acting machine with traffic to a new IP/unknown domain
- Downloads "calc.exe" — the system is acting funny after the request
- We need FAST answers — where do we get them?

**The Failed EDR:**
- New endpoint protection suite (EDR) installed
- Attackers phish an employee using a method the EDR doesn't initially catch
- Attackers use their access to disable logging and EDR
- Attack continues unabated — how do we know if someone has turned off security software?

---

## 13. Endpoint Data Gives More Detail

In general, endpoint data is the more detailed data source [13]:

- Nearly all security-relevant activity from the system
- Network activity attributed to the specific files that generated it

![Process tree screenshot from endpoint data showing calc.exe spawning suspicious child processes, demonstrating how endpoint data attributes network activity to specific files](/images/gsoc/sec450-1-2-slide15-endpoint-data-gives-more-detail.png)

---

## 14. Monitoring Data Sources Overview

Complete data source listing [14]:

| NSM Data | Endpoint and App Data |
|----------|----------------------|
| Network extraction | Authentication logs |
| Routers and switches | Antivirus, HIDS/HIPS, EDR |
| Network firewalls | Process command line |
| IDS/IPS/NDR | Executables |
| Proxy | Vulnerability scanners |
| Web application firewalls | DLP |
| Service logs (DHCP, DNS, HTTP(S), SMTP, SMB, FTP, SSH, Kerberos) | Application access/audit logs |

---

## 15. Without Centralized Searching

Investigating across disparate, non-centralized tools is slow and painful [15].

![Scattered-tool pain diagram showing 16+ disparate security tools (Auth, DLP, Proxy, EDR, App Control, Host IPS, AV, PCAP, NetFlow, DNS, Firewall, UEBA, TI, NIPS, Cloud) that analysts must individually search without centralization](/images/gsoc/sec450-1-2-slide17-without-centralized-searching.png)

---

## 16. What We Want

The goal: centralize endpoint, network, and cloud data (as logs) into a SIEM so analysts can perform one search instead of checking all those disparate sources [16].

![Desired-state diagram: all endpoint, network, and cloud data centralized as logs into a single SIEM for unified search and correlation](/images/gsoc/sec450-1-2-slide18-what-we-want.png)

---

## 17. How Data Gets to the SIEM

Data flows to the SIEM via multiple paths [17]:

- **Network traffic** → traffic capture device → extraction/conversion to logs
- **NetFlow** → NetFlow receiver → converted to logs
- **Endpoint logs** from user systems/servers → log collection agent
- **Cloud services** → direct log ingestion

![Data-to-SIEM flow architecture: network traffic through capture devices, NetFlow through receivers, endpoint logs via collection agents, and cloud service logs — all converging into the SIEM](/images/gsoc/sec450-1-2-slide19-how-data-gets-to-the.png)

---

## 18. Defensible Network Concepts Summary

A defensible network requires [18]:

**Network data monitoring:**
- Traffic to/from the internet AND within the internal network
- Traffic to and from and within cloud services (e.g., AWS VPC logs)
- Layer 7 transaction data at least for critical traffic

**Endpoint and application data monitoring:**
- Critical log collection from desktops, servers, and appliances
- Configuration and baseline monitoring, vulnerability information
- Access/audit logs from applications and cloud services

---

## 19. Data Centralization Summary

Centralization of data is crucial [19]:

- Not every tool natively creates logs or centralizes them
- If we don't centralize all data, we must use multiple systems
- Using multiple tools is painful, fault-prone, and inefficient
- Log agents help us pick up files and convert binary formats
- SIEMs take logs as input — get non-text data converted first!

---

## References

[1] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 47 — Module goals for Defensible Network Concepts

[2] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, pp. 48–49 — Defensible networks per Richard Bejtlich: eight properties

[3] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 50 — Two sides of monitoring: network vs. endpoint/application

[4] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 51 — Network data collection questions

[5] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 52 — Network Security Monitoring (NSM) and suspicious behavior detection

[6] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 53 — Monitoring points across the enterprise environment

[7] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 54 — Endpoint data collection questions

[8] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 55 — Endpoint and Application Monitoring (Continuous Security Monitoring)

[9] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 56 — Endpoint event collection sources illustrated

[10] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, pp. 57–58 — Cloud monitoring across service abstraction levels and shared responsibility

[11] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 59 — Trade-offs: endpoint vs. network monitoring sufficiency

[12] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 60 — When network and endpoint data isn't enough: two illustrative scenarios

[13] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 61 — Endpoint data gives more detail: process creation tree example

[14] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, pp. 62–63 — Monitoring data sources: NSM and endpoint/app data

[15] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 64 — Without centralized searching: pain of disparate tools

[16] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 65 — Centralized data into a SIEM for unified search

[17] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 66 — How data flows to the SIEM: architecture

[18] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 67 — Defensible network concepts summary

[19] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 68 — Data centralization summary
