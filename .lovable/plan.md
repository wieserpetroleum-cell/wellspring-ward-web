# HMS — Frontend Build Plan

Frontend-only Hospital Management System (HMS) using the "Clinical Precision" design direction. Mock data only; typed interfaces so backend can be wired later.

## Scope (this approval covers the foundation + Module 1)

To keep scope manageable, this plan covers the foundation (design system, layout, mock data, routing) and Module 1 (Auth). Subsequent modules will be planned and built in follow-up turns, one module per turn.

## Foundation

- **Design tokens** in `src/styles.css` (oklch equivalents of the prototype palette):
  - `--background` (clinical gray), `--foreground`, `--sidebar` (deep slate), `--primary` (clinical blue)
  - Status tokens: `--allergy` (red), `--condition` (amber), `--status-ok` (green), `--status-info` (blue)
  - Inter font from Google Fonts via `<link>` in `__root.tsx` head.
- **App shell** (`src/components/layout/`):
  - `AppSidebar.tsx` — dark sidebar with grouped nav (Clinical / Administrative / Admin), MEDICORE.OS logo, user footer, role switcher (dev-only).
  - `AppTopbar.tsx` — search trigger (Cmd+K placeholder), shift indicator, location selector.
  - `AppLayout.tsx` — composes sidebar + topbar + `<Outlet />`.
- **Mock data** in `src/lib/mock/`:
  - `patients.ts`, `appointments.ts`, `wards.ts`, `bills.ts`, `reports.ts`, `users.ts`, `tpa.ts`.
  - Typed via `src/lib/types.ts` matching planned future DB tables.
- **Auth context** (`src/lib/auth-context.tsx`): in-memory current user + role, persisted to localStorage. No real auth; lets protected routes work.

## Module 1 — Auth (Screens 01, 02)

Screen 01 — Login
- Route: `/login`
- Fields: email/username, password, remember me, "Forgot password?" link.
- States: idle, submitting, error (bad creds), locked (after N attempts — UI only).
- Mock: any of the seeded users logs in; sets auth context; redirects to role-appropriate dashboard.

Screen 02 — Forgot Password
- Route: `/forgot-password`
- Fields: email; success state with "check your inbox" confirmation.

Routing:
- `/` redirects to `/login` if unauthenticated, else to `/dashboard`.
- `_authenticated` layout route guards module routes (placeholder dashboard route stubs out for now: `/dashboard`).

## Tech notes

- TanStack Router file-based routes under `src/routes/`.
- Use shadcn primitives (Button, Input, Card, Badge, Table, Sidebar, Sonner toaster) styled via tokens — no hardcoded colors in components.
- Login uses react-hook-form + zod for validation.
- Shadcn `Sidebar` component for the app shell so it's collapsible (icon-mode) on smaller screens.

## File map

```text
src/
  styles.css                              (extend tokens)
  routes/
    __root.tsx                            (Inter font, Toaster)
    index.tsx                             (redirect)
    login.tsx
    forgot-password.tsx
    _authenticated.tsx                    (guard + AppLayout)
    _authenticated/dashboard.tsx          (placeholder stub)
  components/
    layout/AppSidebar.tsx
    layout/AppTopbar.tsx
    layout/AppLayout.tsx
  lib/
    types.ts
    auth-context.tsx
    mock/users.ts
    mock/patients.ts
    (other mock files seeded as modules arrive)
```

## Working rhythm going forward

After this is approved and built, the next turn implements **Module 2 — Dashboards** (5 role dashboards starting with Reception/Admin), then Module 3 — Patient Registration & Records, and so on. One module per turn so you can review and iterate before the next.
