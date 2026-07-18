# Security Policy

We take the security of **Synapse OS** seriously. This policy governs standard reporting guidelines and instructions on how to secure your local/container deployment.

## Supported Versions

The following versions receive security patches:

| Version | Supported | Notes |
|---------|-----------|-------|
| v1.x    | ✅ Yes     | Active production support |
| < v1.0  | ❌ No      | Migrate to v1.x immediately |

## Reporting a Vulnerability

**DO NOT open a public GitHub Issue for security bugs.**

If you discover a security vulnerability (such as exposed credentials, cross-site scripting, or privilege escalations), please report it responsibly by contacting the lead maintainer directly:

- **Email:** bommanaboinasravankumar2@gmail.com
- **Response SLA:** Within 48 hours for triage and initial confirmation.

Please include:
1. A descriptive title and type of vulnerability (e.g. XSS, Denial of Service).
2. Step-by-step instructions (with proof-of-concept payload if available) to reproduce.
3. Recommended mitigation actions.

## Deployment Security Best Practices

To safeguard your Synapse OS instance, follow these guidelines:

### 1. Hide Your API Secrets
* **Gemini API Key:** Keep `GEMINI_API_KEY` hidden server-side. Never prefix it with `VITE_` or expose it directly inside front-end bundles.
* **Database Credentials:** Store database configs strictly inside cloud-encrypted runtime parameters (e.g., Google Cloud Secrets, Railway variables, Docker environment config).

### 2. Environment Controls
* Always use HTTPS on production endpoints.
* Enable secure HTTP header protection (e.g., using Helmet middleware in Express).
* Bind server processes to isolated docker networks where possible.
