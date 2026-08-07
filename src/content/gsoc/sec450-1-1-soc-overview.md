---
title: "SEC450.1.1 — SOC Overview"
date: "05-08-2026"
tags: ['gsoc', 'sec450', 'soc-operations', 'blue-team']
summary: "Core components of security operations, SOC mission, risk appetite, org structures, and governance."
readTime: "10 min"
---

![SEC450.1.1 — SOC Overview Cover](/images/gsoc/covers/450.1.1.jpg)


> **SEC 450.1 — Blue Team Tools and Operations**

---

## 1. Module Goals

This module covers [1]:

1. The core components of security operations
2. Defining and understanding the SOC mission
3. Ensuring SOC alignment with organization objectives and risk appetite
4. Org charts for security operations
5. Security operations core functions
6. Useful reference documents for practitioners
7. Measuring and communicating SOC effectiveness

---

## 2. The Components of Security Operations

The SOC rests on three foundational pillars [2]:

- **People** — Performing analysis and investigation, designing and running processes
- **Process** — The defined sequence of events performed to achieve an end goal
- **Technology** — Hardware and software used to accomplish the mission

![Venn diagram showing the three overlapping components of security operations: People, Process, and Technology](/images/gsoc/sec450-1-1-slide03-the-components-of-security-operations.png)

---

## 3. Understanding Your Mission — Four Core Questions

Cyber defense is difficult — where do we even start? These questions help clarify your mission and what success looks like [3]:

1. What are we trying to protect?
2. What are the threats?
3. How do you detect them?
4. How will you respond?

---

## 4. Finding the Organizational Risk Appetite

Remember to consider the big picture [4]:

- Organizations don't exist to be secure — where is security on the priority list?
  - **Government/Military:** Highest importance
  - **New startup company:** Low importance
- Ask if your org has a "risk appetite statement"
- A mature security team understands the appetite and works within it
  - This doesn't mean you can't try to influence it
  - It will change as management, company, and priorities change

![Spectrum showing organizational risk appetite: Government/Military at highest security priority versus startups at lowest](/images/gsoc/sec450-1-1-slide05-finding-the-organizational-risk.png)

---

## 5. Meeting the Risk Appetite

"What's the worst that could happen?" [5]

- What type of work does your organization do?
- How critical is the success of the security team?
  - **Highly critical:** Application control, EDR/XDR, zero trust network design, strict email policies, etc.
  - **Less critical:** Basic tools and data monitoring capabilities
- **Goal:** Find ways to crank security as high as you can without hindering business process
  - Applying all appropriate "invisible security" options
  - Making smart choices when it comes to inconvenient/"visible" security

---

## 6. Risk Appetite Meets Reality

Pretend you work for a vaccines company [6]:

- A vendor-built PC runs a critical production line
- A locked-down, qualified build — no extra security software allowed
- Requires:
  - Outbound FTP data transfer
  - Inbound web status page
- Operating System is **Windows XP**
- How do you secure this machine?
  - *Hint: The answer is not "don't allow it to be used" — you'll quickly be shown the door with this approach*

---

## 7. Accepting the Risk

The concept of risk acceptance gets joked about a lot in information security [7]. However, remember that as badly as something may fail, sometimes the risk *must* be accepted — the important part is how you detect and respond to compromise when it occurs.

![Humorous meme illustrating the concept of risk acceptance in information security (illustrative, not tested content)](/images/gsoc/sec450-1-1-slide08-accepting-the-risk.jpg)

> *This image is illustrative/humor — not tested content.*

---

## 8. Blue Team Truth #1 — Compromise Will Happen

The question is… how it will affect you? [8]

- **Outcome 1:** Adversary succeeds in initial steps of the attack, but is quickly detected and fails to complete their mission
- **Outcome 2:** Adversary is not detected, runs free, causes a huge impact!
- Not all adversaries will be blocked from the get-go
- The acknowledgement of this fact and preparation for what occurs after is what separates a good from bad security operations team
- **Goal:** Detect and minimize damage from compromise

---

## 9. Blue Team Truth #2 — The Company Doesn't Exist Solely to Be Secure

The team provides a "loss prevention" function [9]:

- We reduce cybersecurity risk to an acceptable level
- Must strike balance between security and productivity
- No one can or wants to buy "perfect security" — it's prohibitively expensive
- Balance is defined by your organization/management
  - Can be frustrating, but doesn't mean we can't try to influence decisions
- Blue team must inform those who make the risk decisions
- Good information requires a deep understanding of your craft…

---

## 10. How Are We Organized?

Typical SOC org chart [10]:

![SOC organizational chart: SOC Lead at top, Incident Lead overseeing Analysts (Tier 1, Tier 2/3 SMEs), Detection Engineering, Incident Response, Engineering and Infrastructure, with adjacent functions (Threat Intel, Forensics, Vulnerability Management, Pen Testing)](/images/gsoc/sec450-1-1-slide11-how-are-we-organized.png)

SOC Lead → Incident Lead → Analysts (Tier 1, Tier 2/3-SMEs), Detection Engineering, Incident Response, Engineering & Infrastructure, Sys. Admin; plus SOC-adjacent functions (Threat Intel, Forensics, Vuln. Mgmt., Pen Testing/Red Team). Org structures vary and should be reconsidered as needs change.

---

## 11. Tiered SOCs

Many SOCs have tiered analyst roles [11]:

- **Tier 1:** Learning the ropes
- **Tier 2:** Increasing capability
- **Tier 3:** Highly complex tasks

![Tiered SOC label graphic showing the three analyst tiers and their progression](/images/gsoc/sec450-1-1-slide12-tiered-socs-fig1.png)

![Tiered SOC pyramid diagram illustrating Tier 1 (triage, learning), Tier 2 (scoping, tactical support), and Tier 3 (deep analysis, hunting) roles](/images/gsoc/sec450-1-1-slide12-tiered-socs-fig2.png)

---

## 12. Tierless SOCs

Tierless vs. Tiered comparison [12]:

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

## 13. The SOC at a High Level

The SOC process flow [13]:

1. **Collection**
2. **Detection**
3. **Triage**
4. **Investigation**
5. **Incident Response**

Many analysts' daily life is here — wrapped in a **continuous improvement** feedback loop driven by the outcome of investigations.

![SOC high-level process flow: Collection to Detection to Triage to Investigation to Incident Response, wrapped in a continuous improvement loop](/images/gsoc/sec450-1-1-slide14-the-soc-at-a-high.png)

---

## 14. Deconstructing the SOC Process and Technology

To understand SOC functions, we simplify them [14]:

- Abstract tools/functions into a simple "box" with inputs and outputs
- Deconstruction into inputs, outputs, and internal process shows how each item relates to each other

![Systems abstraction box diagram showing generic Input, Process, and Output used to model each SOC function](/images/gsoc/sec450-1-1-slide15-deconstructing-the-soc-process-and.png)

---

## 15. The SOC Abstracted

The SOC as a system [15]:

- **Inputs:** What attacks look like (threat intel) and what happened (network traffic, endpoint events)
- **Outputs:** Identified, minimized, and remediated incidents

![SOC abstracted diagram: inputs (what attacks look like via threat intel, what happened via network traffic and endpoint events) flowing through the SOC to produce outputs (identified, minimized, and remediated incidents)](/images/gsoc/sec450-1-1-slide16-the-soc-abstracted.png)

---

## 16. SOC Process and Technology Functions

Organizing security team duties [16]:

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

## 17. Inside the SOC System

Detailed SOC component flow [17]:

Signatures + Events → **Detection** → **Triage/Investigation** → **Incident Response** → Remediated Issues

Supported by Threat Intel, Forensics, and Red Team/Pen Testing inputs.

![Detailed SOC system flow: Signatures and Events feed Detection, then Triage/Investigation, then Incident Response, supported by Forensics, Red Team/Pen Testing, and Threat Intelligence](/images/gsoc/sec450-1-1-slide18-inside-the-soc-system.png)

---

## 18. Critical SOC Information

Analysts should have access to [18]:

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

## 19. Documents Analysts Must Be Familiar With

Governance hierarchy from broadest/mandatory to most specific [19]:

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

![Governance document hierarchy pyramid (top to bottom): Policies, Standards, Procedures, Guidelines, Baselines, and Use Case/Playbook](/images/gsoc/sec450-1-1-slide20-documents-analysts-must-be-familiar.png)

---

## 20. Measuring and Communicating SOC Effectiveness

You will be judged based on the metrics you produce [20]:

- **Good metrics:** Measurable, actionable, and tied to business outcomes
- Metrics drive improvement and communicate the SOC's value to leadership
- Track: mean time to detect (MTTD), mean time to respond (MTTR), alert volume, false positive rates, and incident categorization trends

---

## 21. SOC Overview Summary

Summary [21]:

- **Your mission:** Identify and reduce breaches
- The charter gives you the power to do so
- The steering committee guides you and helps drive which controls are deployed
- The SOC is a complex set of systems: People, Technology, Processes with inputs and outputs
  - Collection, Detection, Triage, Investigation, IR, Threat Intel, Self-Assessment, and Forensics
- Org charts vary for SOCs — there is no "best" setup
- Critical info must be gathered, monitored, and understood

---

## References

[1] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 21 — Module goals and learning objectives for SOC Overview

[2] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 22 — Components of security operations: People, Process, Technology

[3] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 23 — Four core questions to clarify SOC mission and success criteria

[4] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 25 — Organizational risk appetite and security priority spectrum

[5] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 26 — Meeting the risk appetite with appropriate controls

[6] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 27 — Risk appetite meets reality: constrained vendor PC scenario

[7] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 28 — Accepting the risk concept in information security

[8] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 29 — Blue Team Truth #1: Compromise will happen

[9] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 30 — Blue Team Truth #2: The company doesn't exist solely to be secure

[10] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 31 — SOC organizational chart and reporting structure

[11] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 32 — Tiered SOC structure: Tier 1, 2, and 3 analyst roles

[12] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 33 — Tierless SOC model versus tiered model comparison

[13] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, pp. 34–35 — SOC high-level process: Collection through Incident Response

[14] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 36 — Deconstructing SOC functions into input-process-output boxes

[15] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 37 — The SOC abstracted: inputs and outputs of the SOC system

[16] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, pp. 38–39 — SOC process and technology functions: core and specialty activities

[17] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 40 — Inside the SOC system: detailed component flow

[18] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 41 — Critical SOC information analysts must have access to

[19] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, pp. 42–43 — Document hierarchy: Policies through Use Case/Playbook

[20] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 44 — Measuring and communicating SOC effectiveness with metrics

[21] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 45 — SOC Overview summary and key takeaways
