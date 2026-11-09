# Project Instructions

## Architecture

- The frontend is a React/Vite application under `frontend/src`.
- Keep UI organized by feature in `features/`, route-level screens in `pages/`, API calls in `services/`, shared data/query logic in `hooks/`, and reusable components/utilities in `shared/`.
- Use the existing Axios client (`src/api/axiousClient.js`) for API requests and the established TanStack Query patterns for server data.
- The backend is an Express/Mongoose application under `backend/`, organized into routes, controllers, services, and models.

## Frontend Design

- Preserve the existing frontend design, layout, styling, and interaction patterns. Do not redesign or make unrelated visual changes.
- When implementing a feature, make the smallest UI changes needed and follow patterns already used in that feature and the rest of the dashboard.
- If a requested behavior cannot be implemented without a significant design change, ask the user before proceeding.

## Backend Changes

- Do not modify backend files, API behavior, or business logic unless the user explicitly asks for backend work.
- If a frontend request appears to require a backend change, explain the blocker and ask the user for permission before changing any backend code.
- A direct user request to implement a specific backend change authorizes that requested scope only; ask before making additional backend changes.

## Implementation

- Read relevant existing files and follow the repository's patterns before editing.
- Keep changes within the requested scope, preserve unrelated worktree changes, and report any relevant pre-existing changes rather than overwriting them.
- Handle loading, empty, and error states consistently with existing components. Prefer existing shared components and utilities.
- Validate frontend changes with commands run from `frontend/`: `npm run lint` and `npm run build`, or the smallest relevant configured check.
