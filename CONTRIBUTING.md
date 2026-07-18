# Contributing to Synapse OS

Welcome! We are thrilled that you are interested in contributing to Synapse OS. Following these guidelines helps preserve codebase health and streamlines our release processes.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Development Lifecycle

### 1. Requirements & Stack
* **Node.js:** Active LTS (v20 or v22)
* **Framework:** React 19 (Vite), Tailwind CSS v4, Express server.
* **Typing:** Strict TypeScript typing.

### 2. Local Setup
1. Fork the repository and clone your fork.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment configurations:
   ```bash
   cp .env.example .env
   ```
4. Run in dev mode:
   ```bash
   npm run dev
   ```

## Commit and Code Standards

### Conventional Commits
We use the Conventional Commits specification. Your commit messages must match the following format:
* `feat:` for new user-facing features (e.g., `feat(finder): add dynamic screenshot audits`)
* `fix:` for software bug fixes (e.g., `fix(linter): resolve type-cast warning`)
* `docs:` for documentation updates (e.g., `docs(readme): update setup guidelines`)
* `refactor:` for internal code reorganization (e.g., `refactor(server): clean up Express routes`)
* `chore:` for tooling, dependencies, or configuration changes (e.g., `chore(deps): upgrade esbuild`)

### Coding Guidelines
* Always place imports at the top. Use named imports instead of object destructuring.
* Ensure all React components are functional and utilize hooks.
* Style using standard Tailwind CSS utility classes. Avoid separate CSS files or inline `style` objects.
* Keep server-side keys (like the Gemini API key) strictly server-side.
* Verify TypeScript compilation with `npm run lint` and complete successfully before pushing.
