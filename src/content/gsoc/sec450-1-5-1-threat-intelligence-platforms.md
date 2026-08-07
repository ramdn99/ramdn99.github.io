---
title: "SEC450.1.5.1 — Threat Intelligence Platforms"
date: "05-08-2026"
tags: ['gsoc', 'sec450', 'cti', 'threat-intel', 'tip', 'misp', 'opencti']
summary: "Fundamentals of Cyber Threat Intelligence (CTI), threat intel platforms, IOC feeds, and platform workflows."
readTime: "10 min"
---

![SEC450.1.5.1 — Threat Intelligence Platforms Cover](/images/gsoc/covers/450.1.5.1.jpg)


> **SEC 450.1 — Blue Team Tools and Operations**

---

## 1. What Is Cyber Threat Intelligence?

Cyber threat intelligence (CTI) is not simply a list of bad domains and IP addresses [1]. It is summarized, analyzed cyber threat data that gives a strategic and tactical advantage over the adversary, helping prioritize defensive resources and driving the "offense informs defense" philosophy.

![Nested concept diagram showing raw Data feeding into Information, which feeds into Intelligence, and then specifically Cyber Threat Intelligence](/images/gsoc/sec450-1-5-slide02-what-is-cyber-threat-intelligence.png)

---

## 2. Intelligence Definition

Intelligence is taking in external information from a variety of sources and analyzing it against existing requirements to provide an assessment that will affect decision making [2]. Everyday examples:

- A **weather report** — deciding whether to bring a coat
- A **traffic report** — deciding how much time is needed to get to work

![Intelligence concept illustration: external information from varied sources analyzed against requirements to produce assessments that affect decision making](/images/gsoc/sec450-1-5-slide03-intelligence-definition.png)

---

## 3. Threat Definition

A threat is defined (per Rob M. Lee) as a combination of [3]:

- **Intent:** A malicious actor's desire to target an organization
- **Capability:** Their means to do so (e.g., specific types of malware)
- **Opportunity:** The opening the actor needs — in software, hardware, or personnel

![Threat definition Venn diagram: the intersection of Intent (desire to target), Capability (means such as malware), and Opportunity (opening in software, hardware, or personnel)](/images/gsoc/sec450-1-5-slide04-threat-definition.png)

---

## 4. Cyber Threat Intelligence Definition

Threat intelligence is the analysis of adversaries — their capabilities, motivations, and goals [4]. Cyber threat intelligence specifically is the analysis of how adversaries use the cyber domain to accomplish those goals. Key themes:

- Need for **human analysis**
- Identifying attacker **TTPs and goals**
- Producing output that **drives decision making**

![Cyber threat intelligence definition graphic emphasizing human analysis, identifying attacker TTPs and goals, and producing decision-driving output](/images/gsoc/sec450-1-5-slide05-cyber-threat-intelligence-definition.png)

---

## 5. Good vs. Bad Cyber Threat Intelligence

Quality comparison [5]:

- **Poor CTI:** An indicator with little to no context (e.g., an IOC tied to a malware family and a rough timeframe)
- **Excellent CTI:** Full context including dates, spoofed sender addresses, email themes, malicious URLs, file hashes, associated MITRE ATT&CK technique IDs, detected malware family, and follow-on behavior (scheduled task creation, C2 activity)

![Side-by-side comparison of poor CTI (bare IOC with minimal context) versus excellent CTI (full context: dates, spoofed senders, email themes, URLs, hashes, MITRE ATT&CK IDs, follow-on behavior)](/images/gsoc/sec450-1-5-slide06-good-vs-bad-cyber-threat.png)

---

## 6. Threat Intelligence Platforms and You

Threat intelligence has producers and consumers [6]:

- Many SOCs have a dedicated threat intel group that **produces** intelligence for analysts to **consume**
- Analyst work requires using threat data, information, and intelligence to identify and protect against compromise
- TIPs serve as a knowledgebase and automate exchange/querying with other security tools
- **Important:** TIPs do not produce intelligence themselves

---

## 7. Threat Intelligence Platform Features

A TIP needs to [7]:

- Store analysis and threat information for known indicators
- Perform automated and fast lookups via API
- Record **context** about stored items (not just a plain list)
- Find **associations** across multiple events
- Support **sharing** of indicators with other organizations

---

## 8. Threat Intelligence Platform Requirements

When evaluating a TIP [8]:

- Does it need to handle indicators or lower-level configuration details?
- Most TIPs handle standard IOCs (IPs, filenames, domains, hashes, URLs) with ease
- Easy bulk entry/integration is important
- Additional capabilities: malware config storage, non-standard fields, correlation, sharing, expected volume

---

## 9. Storing and Sharing Threat Intelligence Safely: De-fanged Indicators

Analysts must be cautious with IOCs — IP addresses and links can become "live" (clickable/resolvable) when entered into documents or tools [9]. Many articles and tools "de-fang" indicators:

- `http` → `hxxp`
- `example.com` → `example[.]com`

This prevents auto-loading in reports, Excel, Slack, and similar platforms.

![De-fanged indicator examples showing how URLs and IPs are made safe for sharing: 'http' becomes 'hxxp', dots replaced with '[.]' to prevent auto-loading in documents and chat tools](/images/gsoc/sec450-1-5-slide10-storing-and-sharing-threat-intelligence.png)

---

## 10. TIP Workflow

The TIP sits at the center [10], exchanging automated indicator lookups and submissions with the SIEM, IMS, and SOAR platform. It also pulls data from external sources and receives detailed analysis from analysts.

![TIP workflow diagram: Threat Intelligence Platform at center exchanging automated lookups with SIEM, IMS, and SOAR; pulling from external feeds; receiving analyst analysis](/images/gsoc/sec450-1-5-slide11-tip-workflow.png)

---

## 11. Threat Intelligence Platform Products

Self-hosted, free options [11]:

- **MISP** (Malware Information Sharing Platform) — used in this class's labs
- **OpenCTI** — newer but promising

Commercial products: Palo Alto XSOAR TIM, LogRhythm TLM, ThreatConnect, CrowdStrike Falcon X, Recorded Future, IBM X-Force Exchange, Anomali ThreatStream.

![Threat intelligence platform product landscape: self-hosted free options (MISP, OpenCTI) and commercial products (Palo Alto XSOAR TIM, ThreatConnect, CrowdStrike Falcon X, Recorded Future, etc.)](/images/gsoc/sec450-1-5-slide12-threat-intelligence-platform-products.png)

---

## 12. Threat Intel Feeds

Goal: automated, relevant, and up-to-date information [12]:

- Draw on both closed and open-source feeds, categorized by content
- Philosophy: **share** rather than only consume
- Measure feed effectiveness: How often is a feed-based alert a true positive? How quickly does data hit the feed?
- Join relevant **ISACs and ISAOs** (e.g., H-ISAC, MS-ISAC, FS-ISAC, IT-ISAC)

![Threat intel feed ecosystem diagram showing open-source and closed-source feeds, ISAC/ISAO partnerships (H-ISAC, MS-ISAC, FS-ISAC, IT-ISAC), and feed effectiveness measurement criteria](/images/gsoc/sec450-1-5-slide13-threat-intel-feeds.png)

---

## 13. MISP

This class uses MISP as its TIP [13]. Key features:

- Free, open-source, popular among analysts
- Capable of high-volume indicator storage
- Strong web UI and REST API interface
- Classification and sharing functionality
- Flexible indicator storage, easy import/export
- Integration with TheHive for automated storage and analysis

---

## 14. MISP Terminology

Key MISP concepts [14]:

- **Events:** Main entity type; encapsulate contextually linked information
- **Attributes:** Child items of events holding indicators (URL, hash, IP), links, or text — each with category, type, and comment
- **Sightings:** Counting true/false positives for an attribute
- **Tags:** Added context for events
- **Taxonomies:** Families of pre-made tags
- **Galaxies:** Clusters of threat actors, tools, or intelligence

---

## 15. MISP Workflow Overview

Two usage modes [15]:

**Analyst usage:**
1. Create a new event
2. Add all indicators/links/files/notes as attributes
3. Apply tags and classifications (galaxies)
4. Review and publish to other organizations if desired

**Automated usage (SOC tools):**
- SIEM, SOAR, and IMS use the API to look up or push attributes
- Subscribed feeds automatically download external event data
- Any time an indicator is seen in live traffic, an alert is generated

---

## 16. MISP Events Illustrated

MISP events can share and correlate attributes across each other [16]. For example, two separate events with different source IPs, domains, and filenames can be linked through a shared file hash, with classification tags and galaxies (such as threat actor identification) attached.

![MISP event correlation visualization: two events with different source IPs and domains linked through a shared file hash attribute, with galaxy cluster identifying associated threat actor](/images/gsoc/sec450-1-5-slide17-misp-events-illustrated.png)

---

## 17. MISP Sharing Illustrated

MISP instances at different organizations can selectively share events [17]. A subset of events marked as shared are pushed to partner organizations' MISP instances.

![MISP inter-organization sharing diagram: one organization's MISP instance pushes a subset of events marked as shared to partner MISP instances](/images/gsoc/sec450-1-5-slide18-misp-sharing-illustrated.png)

---

## 18. Creating an Event in MISP

Creating an event involves [18]:

- Setting **date**, **distribution level** (e.g., "All communities")
- Setting **threat level** (e.g., "High") and **analysis status** (e.g., "Completed")
- Adding **event info/description**
- Applying **tags** from taxonomy libraries (e.g., TLP classifications: `tlp:white`, `tlp:red`)

![MISP event creation form: fields for date, distribution level (All communities), threat level (High), analysis status (Completed), event info, and taxonomy tag selection (TLP classifications)](/images/gsoc/sec450-1-5-slide19-creating-an-event-in-misp.png)

---

## 19. Adding Event Attributes

MISP's freetext import tool allows analysts to paste a list of IOCs (hashes, URLs) for automatic detection [19]. The tool identifies similar attributes already present and proposes a category and type for each new attribute:

- Categories: "Payload installation," "External analysis"
- Types: `sha256`, `url`

![MISP freetext import tool: analysts paste IOCs (hashes, URLs) for automatic detection, with proposed category (Payload installation, External analysis) and type (sha256, url) classification](/images/gsoc/sec450-1-5-slide20-adding-event-attributes.png)

---

## 20. Attribute Correlation Example

MISP visually illustrates correlations between events that share common attributes [20]. In this example, a "Petya" event correlates with several OSINT events through shared file hash attributes, each tagged with related event IDs and a correlate toggle.

![MISP attribute correlation view: a Petya event correlating with multiple OSINT events through shared file hash attributes, each with correlate toggles and related event IDs](/images/gsoc/sec450-1-5-slide21-attribute-correlation-example.png)

---

## 21. Events List

The MISP events list view displays [21]:

- Publication status, organization, owner org, event ID
- Associated clusters (galaxies: threat actor, tool names)
- Tags (including TLP and classification tags)
- Attribute count, submitting email, date, event info/description

![MISP events list view showing columns for publication status, organization, event ID, galaxy clusters, tags (TLP), attribute count, submitting email, date, and event description](/images/gsoc/sec450-1-5-slide22-events-list.jpg)

---

## 22. Threat Intelligence Platforms Summary

Key takeaways [22]:

- **Indicators and intelligence** should be managed in the TIP: automatically pulled or added through API integration, manually created as events based on analyst analysis
- **Incidents** are managed in the IMS/SIRP: all high-fidelity or triaged alerts become cases, queued and assigned to analysts
- The IMS should be chosen carefully and ideally integrate well with automation frameworks and the TIP

---

## References

[1] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 109 — What is cyber threat intelligence: beyond IOC lists

[2] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 110 — Intelligence definition: information analyzed for decision making

[3] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 111 — Threat definition: intent, capability, and opportunity

[4] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 112 — Cyber threat intelligence definition: analysis of adversaries

[5] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 113 — Good vs. bad CTI: comparison of context quality

[6] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 114 — TIPs and you: producers and consumers of threat intelligence

[7] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 115 — TIP features: storage, API, context, associations, sharing

[8] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 116 — TIP evaluation criteria and requirements

[9] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 117 — De-fanged indicators for safe sharing

[10] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 118 — TIP workflow: central platform with tool integration

[11] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 119 — TIP products: MISP, OpenCTI, and commercial options

[12] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 120 — Threat intel feeds: automated, relevant information

[13] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, pp. 121–122 — MISP: free, open-source TIP used in class

[14] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 123 — MISP terminology: events, attributes, sightings, tags, galaxies

[15] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 124 — MISP workflow: analyst and automated usage

[16] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 125 — MISP event correlation through shared attributes

[17] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 126 — MISP inter-organization sharing

[18] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 127 — Creating an event in MISP: form fields and tags

[19] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 128 — Adding event attributes via freetext import

[20] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 129 — Attribute correlation: Petya event example

[21] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 130 — MISP events list view

[22] SANS Institute. *SEC450: Blue Team Fundamentals — Security Operations and Analysis (Book 1)*, 2022, p. 131 — TIP summary: indicators in TIP, incidents in IMS
