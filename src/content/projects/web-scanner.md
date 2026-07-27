---
title: "3asfoor — Web Recon & Vulnerability Scanner"
date: "19-07-2026"
tags: ["python", "recon", "web-security", "cli-tool", "scanner", "cve", "wappalyzer"]
summary: "A fast CLI tool for automated web recon, technology identification, port scanning, directory brute-forcing, passive secret discovery, and local CVE matching."
---

# 3asfoor — Web Recon & Vulnerability Scanner

A CLI tool that, given only a domain, performs comprehensive web reconnaissance:

- **Technology fingerprinting** — powered by [wappalyzer-next](https://pypi.org/project/wappalyzer/) (1400+ technology signatures): CMS, frameworks, servers, JS libraries, and their versions. Default mode is HTTP-only (no browser needed); optional `--deep-fingerprint` adds JS-aware detection via headless Chromium.
- **Known CVEs** for detected technologies — scan-time queries hit a **local SQLite database** only (no live API calls during scans). Populate/update with `3asfoor cve-sync`.
- **Open ports & services** (via nmap, with a fallback TCP connect scan)
- **Directory & sensitive file discovery** — active wordlist brute-force with soft-404 detection (config backups, `.env`, `.git`, exposed keys, etc.)
- **Subdomain enumeration** — DNS resolution + HTTP probing
- **API endpoint & route discovery** — brute-force with soft-404 detection
- **Passive link, path & secret discovery** — a **FindSomething-style** pass over the homepage HTML and linked JS/CSS/JSON that classifies everything it finds into the same category buckets that tool reports.

---

## Install

```bash
git clone https://github.com/zeroXmoRamadan/Web-Scanner.git
cd Web-Scanner
python3 -m venv venv
source venv/bin/activate        # Linux/macOS
# venv\Scripts\activate          # Windows PowerShell
pip install -r requirements.txt
pip install -e .
```

**Requirements:** Python 3.11+ (tested on 3.13 and 3.14).

**nmap** is required for full port-scan results (service/version detection). Without it, the tool falls back to a basic open/closed TCP connect scan.

- macOS: `brew install nmap`
- Debian/Ubuntu: `sudo apt install nmap`
- Windows: install from [nmap.org](https://nmap.org/download.html)

---

## (Optional) How to set up NVD_API_KEY

**Linux/macOS (temporary, current shell session):**

```bash
export NVD_API_KEY="your-key-here"
3asfoor scan example.com --i-have-permission
```

**Linux/macOS (permanent):** add that `export` line to `~/.bashrc` / `~/.zshrc`, then `source` it.

**Windows PowerShell:**

```powershell
$env:NVD_API_KEY="your-key-here"
```

---

## CVE Database Sync

CVE matching during scans uses a **local SQLite database** — no live NVD API calls are made during `scan` runs. You must populate the database before CVE matching will work:

```bash
# Full historical backfill (first time — takes several hours without an API key)
3asfoor cve-sync --full

# Incremental update (run regularly — covers the last 24 days by default)
3asfoor cve-sync
```

**Recommended cron job** (daily at 3 AM):

```bash
0 3 * * * cd /path/to/3asfoor && 3asfoor cve-sync
```

Options:
- `--full` — full historical backfill (from 2002 to now). Automatically partitions queries by publication date (`pubStartDate` / `pubEndDate`) to ensure all historical records are retrieved. If interrupted, re-running `cve-sync --full` resumes from the last completed date chunk.
- Without `--full` (Incremental) — incremental sync covering the last N days (default 24). Automatically partitions queries by modification date (`lastModStartDate` / `lastModEndDate`) to catch all new publications and recent revisions.
- `--cve-db-path <path>` — custom path for the CVE database file (default: `data/cve_cache.sqlite3`)
- `--verbose` / `--quiet` — control output verbosity

---

## Usage

```bash
3asfoor scan example.com --i-have-permission
```

You will be prompted for confirmation if `--i-have-permission` is omitted — the tool will not run active scans (ports/directories) without explicit authorization.

On start, the tool prints an ASCII-art banner, then live phase progress as it works. Once the scan finishes, the **full report is always printed to the console** as readable, color-coded tables.

### Exporting report files

Writing JSON/HTML/`_findings.txt` files to disk is **optional** and separate from viewing the report:

```bash
3asfoor scan example.com --i-have-permission --export      # always write the files
3asfoor scan example.com --i-have-permission --no-export   # never write the files
3asfoor scan example.com --i-have-permission                # you'll be asked after the scan
3asfoor scan example.com --i-have-permission --quiet         # quiet implies --no-export unless --export is also passed
```

---

## CLI Options & Flags

Below is the complete list of CLI arguments, options, and flags available when running `3asfoor scan`:

### Target Argument

- **`DOMAIN`** (Required)  
  The target domain to scan (e.g., `example.com`).

### Authorizations & Safety

- **`--i-have-permission`** (Flag)  
  Confirm authorization to scan the target.

### Scope & Target Ports

- **`--full-ports`** (Flag) — Scans all 65535 TCP ports.
- **`--ports <spec>`** (Option) — Custom TCP port ranges (e.g., `--ports "80,443,8080-8090"`).

### Wordlists & Performance Tuning

- **`--wordlist-size <size>`** (Option) — Select bundled SecLists wordlist size: `small` (default), `medium`, or `large`.
- **`--concurrency <num>`** (Option) — Override HTTP request concurrency.
- **`--rate-limit <seconds>`** (Option) — Delay in seconds between HTTP requests.

### Module Exclusion Flags

- **`--skip-ports`** — Skip port scanning.
- **`--skip-dirs`** — Skip directory brute-forcing.
- **`--skip-subdomains`** — Skip subdomain enumeration.
- **`--skip-api`** — Skip API endpoint discovery.
- **`--skip-links`** — Skip passive link and secret extraction.
- **`--skip-cve`** — Skip NVD CVE database check.

---

## Scan Modules

### 1. Technology Fingerprinting (`fingerprint.py`)
Powered by [wappalyzer-next](https://pypi.org/project/wappalyzer/) with 1400+ signatures. Supports HTTP-only fast analysis and full JS-aware browser analysis via Playwright.

### 2. Subdomain Enumeration (`subdomain_scan.py`)
DNS-resolves subdomains and probes HTTP headers, status codes, and page titles.

### 3. API Endpoint Discovery (`api_scan.py`)
Brute-forces common API paths with soft-404 detection.

### 4. Web Crawler & Sitemap Builder (`crawler.py`)
JS-aware browser crawling with HTTPX fallback and runtime API request interception.

### 5. Directory & Sensitive File Discovery (`dir_scan.py`)
Brute-forces paths for exposed `.env`, `.git/config`, backup archives, and secret keys.

### 6. Passive Link, Path & Secret Discovery (`link_finder.py`)
FindSomething-style passive analysis extracting endpoints, AWS keys, JWTs, emails, IPs, and DOM XSS sinks from homepage HTML and JS bundles.

---

## Wordlists & Project Layout

The tool uses curated SecLists wordlists organized by size under `seclists/`:

```
3asfoor/
├── asfoor/
│   ├── main.py               # CLI (Typer)
│   ├── core/                  # models, orchestrator, config loader
│   ├── modules/               # fingerprint, cve_lookup, port_scan, dir_scan,
│   │                          #   subdomain_scan, api_scan, link_finder, report
│   └── utils/                 # http client, rate limiter, logger, banner
├── config/                    # YAML config (defaults.yaml)
├── data/                      # runtime cache (cve_cache.sqlite3)
├── seclists/                  # bundled wordlists
└── output/                    # scan reports (JSON, HTML, findings.txt, scan.log)
```

---

<div style="margin-top: 32px;">
  <a class="btn" href="https://github.com/zeroXmoRamadan/Web-Scanner" target="_blank" rel="noopener noreferrer">
    GitHub repo.
  </a>
</div>
