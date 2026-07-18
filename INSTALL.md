# Installation & Local Setup Guide

This guide describes how to install, configure, and boot **Synapse OS** locally.

---

## 📋 Prerequisites

Before starting, ensure your local development system has:
1. **Node.js:** v18.x, v20.x, or v22.x (Recommended: active LTS v20)
2. **Package Manager:** `npm` (v10 or higher) or `bun`
3. **API Access:** A valid Google Gemini API Key (obtainable via [Google AI Studio](https://aistudio.google.com/)).

---

## 🛠️ Step-by-Step Installation

### 1. Clone the Repository
Clone the repository using HTTPS or SSH, then enter the workspace:
```bash
git clone https://github.com/bommanaboinasravankumar2/synapse-os.git
cd synapse-os
```

### 2. Install Dependencies
Run npm install to pull in the pre-configured package ecosystem:
```bash
npm install
```

### 3. Setup Your Environment Variables
Copy the pre-structured `.env.example` file to create your active configuration:
```bash
cp .env.example .env
```

Open `.env` in your preferred text editor and replace the placeholder with your credentials:
```env
GEMINI_API_KEY="AIzaSyYourActualKeyFromAIStudioHere"
APP_URL="http://localhost:3000"
```

---

## 🚀 Running the Application

### Development Server (with hot reloading)
To spin up the development container process, execute:
```bash
npm run dev
```
The server will boot and run on **http://localhost:3000**. Open this link in your web browser to explore Synapse OS!

### Production Build & Launch
To test production builds locally, bundle and run the standalone server:
1. Compile the build:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run start
   ```

---

## 🧪 Verification & Checks

### Running Linter & TypeScript Check
To verify that code conforms to strict type structures:
```bash
npm run lint
```

### Clean Artifacts
If you encounter caching conflicts or want to reset build states, wipe the local build cache:
```bash
npm run clean
```
