<div align="center">

# 🧠 Synapse OS
### Unified AI Multi-Agent Executive Dashboard & Operations Hub

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=for-the-badge)](https://github.com/bommanaboinasravankumar2/synapse-os/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.1.0-cyan.svg?style=for-the-badge)](CHANGELOG.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg?style=for-the-badge)](CONTRIBUTING.md)

<p align="center">
  A premium, full-stack enterprise cockpit hosting 13 specialized autonomous Gemini AI agent personas alongside a robust CRM suite. Synthesizes business pipelines, generates conversion proposals, logs transaction audits, and inspects target client sites with live interactive screenshot overlays.
</p>

[✨ Live Application Demo](https://ais-dev-cfgectgff7dc34fcd3nsv6-192727712500.asia-southeast1.run.app) • [📖 Read User Guide](USER_GUIDE.md) • [🐳 Dockerize Hub](Dockerfile)

</div>

---

## 🚀 Key Architectural Modules

* **🤖 13-Agent Co-Pilot Workspace**: Command 13 distinct corporate personas (CFO, Legal Counsel, Software Architect, Talent Director, etc.) driven by **Gemini 3.5 Flash** with persistent conversational memory stacks.
* **📷 Interactive Website Auditor**: Perform live-crawled screenshot checks of target companies. Interactive screenshot screens expose performance deficits, missing features, or conversational gaps via clickable glowing hotspots, including complete functional chat simulation modes!
* **💼 Custom CRM Suite**: Track enterprise leads, log dynamic pipeline metrics, compute LTV/CAC variables, manage ongoing client calendar synchronizations, and review immutable log watch records.
* **⚡ Full-Stack Express-Vite Middleware**: Ultra-secure server architecture proxying LLM requests, hiding API tokens, serving static production bundles, and enabling standalone, production-ready container hosting.

---

## 📷 Screenshots Workspace

<div align="center">
  <p><b>Visual Interface Layout:</b> Multi-Agent Dashboard & Interactive Auditor</p>
  <sub>Explore the newly implemented visual detail screens of Synapse OS, loaded with dynamic charts, active logs, and audit screenshots.</sub>
</div>

### 1. Executive Operations Hub
A modern, dark-themed bento-grid dashboard aggregating active subscribers, real-time metrics, MRR counters, and live database log streams.

### 2. Live Screenshot Auditor & Simulation View
* **Audit State (Default)**: Visualizes the client's home website with clickable red hotspot alert icons tracing technical deficits and annual business impact.
* **Upgraded State (Simulated)**: Optimizes loading speed to 98/100, clears errors, and deploys a floating active **AURA AI conversational widget** to capture real-time client tracking inquiries.

---

## 🛠️ Stack & Dependencies

* **Front-end UI**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations & Transitions**: [motion](https://motion.dev/)
* **Back-end Server**: [Express](https://expressjs.com/), [NodeJS v20](https://nodejs.org/)
* **AI Core Integration**: [@google/genai TypeScript SDK](https://github.com/google/generative-ai-js)
* **Visual Graph Engine**: [Recharts](https://recharts.org/), [Lucide React](https://lucide.dev/)
* **Transpilation / Bundler**: [esbuild](https://esbuild.github.io/), [tsx](https://github.com/privatenumber/tsx)

---

## 📦 Directory Structure

```
/
├── .github/                       # GitHub workflow, templates & issue definitions
│   ├── ISSUE_TEMPLATE/            # Structured forms for Bug & Feature submissions
│   ├── PULL_REQUEST_TEMPLATE.md   # Guidelines & checkboxes for merging changes
│   ├── CODEOWNERS                 # Default reviewer assignment rules
│   └── FUNDING.yml                # Project funding channels
├── docker/                        # Multi-stage container instructions
├── docs/                          # Auxiliary guides and system FAQ logs
├── public/                        # Static workspace icons and assets
├── src/                           # Codebase source tree
│   ├── components/                # Modular React sub-components & screenshot frame
│   ├── App.tsx                    # Main client-side router and layouts
│   ├── devBoilerplate.ts          # Default definitions and system types
│   ├── index.css                  # Tailwinds v4 global styles & typography pairs
│   └── main.tsx                   # React client container initialization
├── .env.example                   # Documentation for required environment variables
├── .gitignore                     # Untracked files list
├── Dockerfile                     # Multi-stage production Docker image
├── docker-compose.yml             # Orchestration settings
├── vercel.json                    # Serverless routing and hosting configuration
├── API.md                         # Detailed developer endpoint structures
├── USER_GUIDE.md                  # Comprehensive manual for operations managers
├── ADMIN_GUIDE.md                 # Guides for system administrators & DevOps
├── INSTALL.md                     # Raw OS-level local installation commands
├── LICENSE                        # Open-source MIT terms
└── README.md                      # Primary developer documentation
```

---

## ⚙️ Quick Install

```bash
# Clone
git clone https://github.com/bommanaboinasravankumar2/synapse-os.git
cd synapse-os

# Install
npm install

# Setup Key Environment Variables
cp .env.example .env
# Edit .env and enter your actual GEMINI_API_KEY

# Run in Development mode
npm run dev
```
Open **http://localhost:3000** on your browser.

---

## 🐳 Docker Deployment

Compile and host Synapse OS inside an isolated container:

```bash
# Build
docker build -t synapse-os .

# Run
docker run -d -p 3000:3000 -e GEMINI_API_KEY="your-key" --name synapse_hub synapse-os
```

Using Docker Compose:
```bash
docker-compose up -d
```

---

## 🗺️ Product Roadmap

* [x] **Interactive Domain Screenshots**: Overlays tracing performance deficits, SEO bottlenecks, and conversational gaps.
* [x] **Conversational Simulation**: Interactive floating chatbot with real-time feedback.
* [ ] **Google Sheets & Calendar Integrations**: Direct lead capture synchronizations.
* [ ] **PostgreSQL (Cloud SQL) Schema Migrations**: Relational DB connector support.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👥 Contact & Support

For issues, feature requests, or business inquiries, reach out to the lead maintainer:
* **Email:** bommanaboinasravankumar2@gmail.com
* **Project URL:** [https://github.com/bommanaboinasravankumar2/synapse-os](https://github.com/bommanaboinasravankumar2/synapse-os)
