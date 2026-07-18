# Synapse OS REST API Reference

This document serves as the technical API reference for **Synapse OS**. All server-side requests are proxied via the built-in Express server to maintain absolute key security and bypass CORS issues.

---

## 🔒 Authentication & Headers

Currently, all client-to-server requests are performed on the same host and do not require separate CORS authorization headers.
* **Content-Type:** `application/json`
* **Secret Management:** Server-side operations read `GEMINI_API_KEY` from process environment blocks.

---

## 🛰️ API Endpoints

### 1. Multi-Agent Conversation
Facilitates dialog exchanges with any of the 13 specialized agent personas, utilizing dynamic historical content structures.

* **URL:** `/api/agents/chat`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "agentId": "support", 
    "message": "Write a support SLA proposal for our logistics app",
    "history": [
      { "role": "user", "text": "Hi Aura" },
      { "role": "model", "text": "Hello, I am Aura..." }
    ]
  }
  ```
* **Supported `agentId` values:**
  * `support` (Aura - Customer Support Director)
  * `sales` (Zane - Chief Revenue & Sales Engineer)
  * `marketing` (Clara - Chief Growth & Marketing Strategist)
  * `hr` (Marcus - VP of Talent & HR operations)
  * `finance` (Sophia - CFO & Financial Modeler)
  * `legal` (Leo - Chief Legal Counsel & Advisor)
  * `coding` (Devon - Lead Software Architect)
  * `research` (Evelyn - Lead Market Researcher & Analyst)
  * `content` (Tristan - Principal Content Architect)
  * `social` (Vera - Social Media Strategist)
  * `data` (Dexter - Chief Data Officer)
  * `email` (Paige - Lifecycle Email Specialist)
  * `productivity` (Ashton - Productivity & Workflow Architect)

* **Response (Success - 200 OK):**
  ```json
  {
    "success": true,
    "text": "Based on your logistics profile, we recommend a 3-tier response matrix...",
    "agentId": "support"
  }
  ```

---

### 2. Business Artifact Generator
Triggers specialized long-form prompt structures on Gemini 3.5 to compile production-ready markdown assets or templates.

* **URL:** `/api/business/generate`
* **Method:** `POST`
* **Request Body:**
  ```json
  {
    "type": "pitch",
    "companyName": "Veloce Logistics",
    "description": "Unified freight dispatch hub",
    "targetAudience": "European freight forwarders"
  }
  ```
* **Supported `type` values:**
  * `pitch` (5-slide seed pitch deck structure)
  * `landing-page` (Optimized Tailwind CSS HTML section markup)
  * `cold-email` (3-sequence sequential sales email drip)
  * `sales-script` (Diagnostic discovery interview guide)
  * `roadmap` (4-quarter granular technical engineering path)
  * `privacy-policy` (GDPR and CCPA legal compliance draft)
  * `refund-policy` (SaaS refund guidelines and credit rules)

* **Response (200 OK):**
  ```json
  {
    "success": true,
    "text": "## 🚀 EXECUTIVE FUNDING PITCH & INVESTOR DECK..."
  }
  ```

---

## ⚙️ Fallback Mechanism (Simulation Mode)

If the server-side environment is run without a verified `GEMINI_API_KEY`, the endpoints capture the missing key exception, issue a logged system warning, and dynamically assemble realistic Mock strategy models matching your company data. This guarantees that UI operations, demo previews, and client pipelines never freeze.
