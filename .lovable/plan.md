# HMS — Module 3: Patient Registration & Records

Frontend-only. Builds on Foundation + Module 1 (Auth) + Module 2 (Dashboards).

Screen 08 (New Patient Registration) is the critical screen and gets the deepest treatment. Screens 09 and 10 are supporting views built on the same data layer.

## Scope

Three screens covering the patient lifecycle entry points:

1. **Screen 08 — New Patient Registration** (primary, deepest)
2. **Screen 09 — Patient Search & Registry**
3. **Screen 10 — Patient Profile / Record View**

All data is mock and lives in memory. Submitting the registration form appends to the in-memory list so newly registered patients appear in search and profile views during the same session.

## What will be built

### Mock data + types
- Expand `src/lib/types.ts` `Patient` interface with full demographics, contact, identity, insurance/TPA, emergency contact, registration metadata.
- Expand `src/lib/mock/patients.ts` to ~12 realistic patients (mixed sex/age/conditions).
- New `src/lib/patients-store.tsx` — React context with `patients`, `addPatient`, `getPatient(uid)`. Seeds from mock; in-memory only (no persistence).

### Shared form primitives (reusable across modules)
- `src/components/forms/FormSection.tsx` — section header + grid of fields with the clinical-precision visual (numbered step, thin rule, supporting hint).
- `src/components/forms/Field.tsx` — label + control + helper/error text wrapper.
- Existing `Input`, `Select`, `RadioGroup`, `Checkbox`, `Textarea`, `Button` from shadcn/ui used directly.
- Zod schema in `src/lib/validation/patient.ts` for client-side validation.

### Screen 08 — New Patient Registration (`/patients/register`)

Multi-section single-page form (no wizard — clinical staff prefer one scrollable form). Sticky right-side summary rail showing live preview of UID, name, age, key flags.

Sections:
1. **Identity** — Title, First/Middle/Last name, Sex, DOB (auto-derives age), Blood group, Marital status, Photo placeholder.
2. **Contact** — Mobile (primary), Alt mobile, Email, Address line 1/2, City, State, Pincode, Country.
3. **Identification** — ID type (Aadhaar/Passport/PAN/Other), ID number, Nationality.
4. **Emergency Contact** — Name, Relationship, Phone.
5. **Clinical Flags** — Known allergies (chip input), Chronic conditions (chip input), Notes.
6. **Insurance / TPA** — Has insurance (toggle); when on: Provider, Policy #, TPA name, Validity.
7. **Registration Meta** — Registration type (OPD/IPD/Emergency), Referred by, Consent checkbox (required).

Behavior:
- Live UID generation preview: `MR-YYYY-NNNNN` shown in the summary rail and locked once the form is submitted.
- Required-field validation via Zod with inline errors.
- Sticky bottom action bar: `Cancel`, `Save & New`, `Save & Open Profile` (primary).
- On submit: `addPatient`, toast confirmation, navigate to `/patients/$uid`.
- Allergy / condition chip inputs: type + Enter to add, click chip × to remove.
- Keyboard-first: every field has tabindex order; primary action is `Cmd/Ctrl+Enter`.

Visual:
- Dense two-column grid inside each section, single column on narrow viewports.
- Section numbering (01, 02 …) in the clinical-precision style with hairline divider.
- Summary rail uses the same KPI/status tone language as the dashboards.

### Screen 09 — Patient Registry (`/patients`)

- Top bar: search input (name / UID / mobile), filters (sex, registration type, has allergies).
- Dense table: UID, Name, Sex/Age, Mobile, Last Visit, Flags (allergy/chronic chips), row click → profile.
- Empty state when no matches.
- Primary CTA: `+ Register Patient` → `/patients/register`.

### Screen 10 — Patient Profile (`/patients/$uid`)

- Header: photo placeholder, name, UID, sex/age, contact, allergy/chronic flag chips, primary actions (`New Appointment`, `Admit`, `Edit`).
- Tabs: Overview (demographics, contact, ID, insurance, emergency), Visits (placeholder list), Allergies & Conditions, Documents (placeholder).
- Not-found state for unknown UIDs.

### Navigation wiring
- `AppSidebar` "Patient Registry" item already points at `/patients` — no change needed.
- Quick action "Register Patient" on Admin + Reception dashboards now routes to `/patients/register` (already wired).

## Out of scope
- Persistence / backend (Cloud not enabled this module).
- Photo upload (placeholder only).
- Editing flow on Screen 10 (button present, opens a toast "coming next module").
- Visit history data (placeholder list).

## Routes added

| Route | File |
|-------|------|
| `/patients` | `src/routes/_authenticated/patients.index.tsx` |
| `/patients/register` | `src/routes/_authenticated/patients.register.tsx` |
| `/patients/$uid` | `src/routes/_authenticated/patients.$uid.tsx` |
| (layout) | `src/routes/_authenticated/patients.tsx` → `<Outlet />` |

## Tech notes

- `PatientsProvider` mounted inside `_authenticated.tsx` so the store survives navigation.
- Validation: single Zod schema; `react-hook-form` + `@hookform/resolvers/zod` (already in shadcn stack).
- UID generator: `MR-${year}-${(seedCount + index).toString().padStart(5,'0')}` — deterministic for the session.
- Age helper in `src/lib/age.ts` (`"45y 4m"`-style string used by Module 2).

## Working rhythm

After Module 3 ships, next turn implements **Module 4 — OPD Consultation** (appointment booking, queue, consultation note, prescription).
