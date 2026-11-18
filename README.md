# VolleyRecruit PR

A React frontend prototype exploring volleyball recruiting workflows for athletes, coaches and administrators. The repository is named `raulpapaleorecruit`; the app package is `volleyrecruit-pr`.

This is a **demonstration project**, not a production recruiting platform. It uses sample data and browser-local state. This README does not claim real users, paying clients or a verified public deployment.

## Source overview

| Area | Screens and interactions present in source |
|---|---|
| Public | Landing page, athlete directory and college directory |
| Athletes | Demo login/register, dashboard, profiles, college discovery, saved colleges and messaging screens |
| Coaches | Demo login/register, dashboard, athlete discovery, saved athletes and messaging screens |
| Admin | Athlete, coach and university management, conversations, analytics and settings |
| Shared UI | Navigation, cards, maps, modals, toasts and loading states |

The presence of a screen does not establish a complete backend or verified end-to-end behavior. Messaging and analytics are demonstration workflows.

## Run locally

Use a Node version supported by the installed Vite package and npm.

```bash
git clone https://github.com/eduardoquinones/raulpapaleorecruit.git
cd raulpapaleorecruit
npm ci
npm run dev
```

Open the local URL printed by Vite. Start with the public directories, then explore the demo login flows using fictional information only. Seed account definitions are in `src/context/AuthContext.jsx` and `src/context/AdminAuthContext.jsx`.

```bash
npm run build
npm run preview
npm run lint
```

## Verification status

During this documentation update, the production build succeeded locally. ESLint reported **five existing Fast Refresh export errors** in `Toast.jsx` and the four provider files in `src/context/`. The dependency install also reported audit findings. These are recorded limitations, not resolved by this README update. There is no configured automated application test script.

A successful build does not prove every workflow has been tested in a browser. Before using this project in a formal demonstration, review lint/audit results and test the intended screens.

## Configuration

`.env.example` lists optional Supabase client variables:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

The Supabase helper returns `null` when either value is absent. Adding these values does **not** replace the demo authentication implementation. Vite variables are included in client code: never use a service-role key, private token or server secret.

## Architecture

- `src/App.jsx`: routes and shared layout.
- `src/pages/`: public, athlete, coach and admin screens.
- `src/components/`: reusable UI and feature components.
- `src/context/`: authentication and demo state.
- `src/data/`: sample profiles, colleges and messages.
- `src/hooks/useLocalStorage.js`: browser-local persistence.
- `src/lib/supabase.js`: optional client construction.

## Limitations

- Authentication is simulated on the client. Demo passwords and account records use browser storage; Base64 encoding does not secure admin credentials.
- Client route guards control UI access, not server authorization.
- Local storage is browser/device specific, not a shared multi-user database.
- Do not enter real passwords, student records or sensitive recruiting information.
- A real service needs backend authentication, authorization, consent/data handling and independent testing before real users are invited.

## Development context

This repository is part of EJ's exploration of AI-assisted app development. It is a prototype, without claims of production adoption or independent authorship of every line. Codex prepared this documentation after reviewing the current source.

## Next improvements

1. Record a walkthrough with fictional data and identify the exact parts personally developed or revised.
2. Add tests for filtering and saved-item behavior.
3. Resolve existing lint errors and review dependency audit findings.
4. Replace demo authentication/storage before considering production use.

No license was added in this update. Check permissions for third-party assets and content before reuse.
