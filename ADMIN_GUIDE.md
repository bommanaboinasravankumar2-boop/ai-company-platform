# Synapse OS Administration & DevOps Guide

This guide describes internal configurations, storage backends, logging pipelines, and container parameters of **Synapse OS** for administrators and system engineers.

---

## 💾 File Database Architecture

Synapse OS uses a structured file-based database schema located at `/database.json`. 
* On system boot, if `database.json` is missing, the server writes a detailed `DEFAULT_DB` payload with sample clients, transactions, logs, and billing packages.
* **Format:** Raw JSON with standard array collections (`leads`, `deals`, `tasks`, `meetings`, `proposals`, `auditLogs`).
* **Backup Strategy:** For production instances, mount the `/app/database.json` file as a persistent volume (as set in `docker-compose.yml`) or back up periodically using standard cron backup jobs.

---

## 🛠️ Modifying Agent Personas

The system instructions, roles, and names of the 13 built-in agents are declared in `/server.ts` inside the `AGENT_PERSONAS` record.

To add or modify a persona:
1. Open `/server.ts`.
2. Locate the `AGENT_PERSONAS` object.
3. Edit the `instructions`, `name`, or `role` fields.
4. Recompile the bundle:
   ```bash
   npm run build
   ```
5. Restart the server process.

---

## 🔒 Production Hardening & SSL

### Express Security Middleware
For high-traffic public instances, it is highly recommended to include `helmet` and `express-rate-limit` to prevent brute force or frame hijack attempts.

### Nginx SSL Reverse Proxy
We recommend running Synapse OS behind a secure Nginx reverse proxy block:
```nginx
server {
    listen 445 ssl;
    server_name synapse.yourcompany.com;

    ssl_certificate /etc/letsencrypt/live/synapse.yourcompany.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/synapse.yourcompany.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔍 Troubleshooting & Logs

### Gemini Token Failures
If you see errors indicating `429 Resource Exhausted`, it means you have exceeded your free tier rate limits. 
* **Mitigation:** Switch to a paid billing account in Google AI Studio or lower the `temperature` parameters in `/server.ts`.

### Container Unavailability
If the container crashes on launch:
* Verify that the port `3000` is not bound by other active processes.
* Double-check that `GEMINI_API_KEY` is not empty. If running in a public VPC, verify internet connectivity to Google's API endpoints.
