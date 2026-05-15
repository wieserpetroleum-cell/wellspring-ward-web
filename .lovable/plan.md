# HMS — Module 4: OPD Consultation

Frontend-only. Builds on Modules 1–3. Wires the OPD workflow from appointment booking through queue management to the consultation note + prescription.

Critical screen: **Screen 13 — Consultation Workspace** (doctor's primary tool). Booking and queue screens feed into it.

## Scope

Four screens covering the OPD lifecycle:

1. **Screen 11 — Appointment Booking** (`/appointments/new`) — Reception books a slot for an existing patient.
2. **Screen 12 — OPD Queue / Today's Schedule** (`/appointments`) — Live list with status pipeline (Scheduled → Checked-in → In Consultation → Completed). Reception checks-in; doctor picks next.
3. **Screen 13 — Consultation Workspace** (`/consultations/$appointmentId`) — Primary screen. Patient summary rail + tabs (Vitals, Complaints/HPI, Examination, Diagnosis, Prescription, Plan). Submit completes the visit and generates the prescription.
4. **Screen 14 — Prescription Preview / Print** (`/consultations/$appointmentId/prescription`) — Read-only printable Rx generated from Screen 13.

All data is in-memory. Submitting a consultation appends a Visit + Prescription record to the patient and flips the appointment status to `completed`.

## What will be built

### Data layer (extend existing)
- Extend `src/lib/types.ts`:
  - `Appointment` gains: `date`, `complaint?`, `notes?` (existing `status` already covers pipeline).
  - New `Vitals` interface: bp, pulse, temp, spo2, weight, height, bmi (auto), respRate.
  - New `RxItem`: drug, strength, form, dose, frequency, duration, route, instructions.
  - New `Consultation`: id, appointmentId, patientUid, doctor, date, vitals, complaints, hpi, examination, diagnoses[] (ICD-style code+text), rx[], advice, followUpDays, status (`completed`).
- New `src/lib/appointments-store.tsx` — context with `appointments`, `addAppointment`, `updateStatus`, `getById`. Seeds from `mockAppointments` (extended with today's date).
- New `src/lib/consultations-store.tsx` — context with `consultations`, `addConsultation`, `getByAppointment`.
- Both providers mounted in `_authenticated.tsx` next to `PatientsProvider`.
- New mock: `src/lib/mock/drugs.ts` (~30 common drugs for autocomplete) and `src/lib/mock/diagnoses.ts` (~20 ICD-10 entries).

### Shared primitives
- `src/components/forms/Combobox.tsx` — searchable single-select (drug, diagnosis) built on shadcn Command + Popover.
- `src/components/consultation/PatientSummaryRail.tsx` — sticky right rail with photo, name, UID, sex/age, allergy/chronic chips, last visit. Reused on Screen 13.
- `src/components/consultation/RxRowEditor.tsx` — single prescription row editor with frequency presets (BD/TDS/QID/SOS/HS) and duration shortcuts.

### Screen 11 — Appointment Booking (`/appointments/new`)
- Patient picker (Combobox over `usePatients()` — search by name/UID/mobile).
- Doctor + Department + Room (mock list; selecting doctor filters rooms).
- Date picker (defaults today; next 14 days only).
- Time slot grid (15-min slots 09:00–17:00; greys out slots already taken for that doctor that day).
- Type (OPD / Follow-up / Walk-in), Chief complaint (optional textarea).
- Submit → `addAppointment` (status `scheduled`), toast, navigate to `/appointments`.
- Edge: no patients → empty state with CTA `+ Register Patient`.

### Screen 12 — OPD Queue (`/appointments`)
- Top bar: date selector (today by default), filters (doctor, status, department), search.
- Two view modes: **Pipeline** (default — 4 columns Scheduled / Checked-in / In Consultation / Completed) and **Table** (dense list).
- Each card: token #, time, patient name+UID, doctor, type, chief complaint preview, action button per status:
  - `scheduled` → `Check In` (flips to `checked-in`).
  - `checked-in` → `Start Consultation` (flips to `in-consultation`, navigates to Screen 13).
  - `in-consultation` → `Resume`.
  - `completed` → `View Rx`.
- Primary CTA: `+ New Appointment` → Screen 11.
- KPI row at top: Today total, Waiting, In progress, Completed, Avg wait time (mock).

### Screen 13 — Consultation Workspace (`/consultations/$appointmentId`) — CRITICAL
- Layout: 3-column on wide (≥1280px), collapses to single column with sticky header on narrow.
  - Left rail: tab nav (Vitals → Complaints → Examination → Diagnosis → Prescription → Plan) with completion checkmarks.
  - Centre: active section form.
  - Right rail: `PatientSummaryRail` + live "Visit Summary" preview (diagnoses chips, Rx count, follow-up).
- Sections:
  1. **Vitals** — numeric inputs with sensible step/min/max; BMI auto-calculated; abnormal values highlighted (e.g. SpO₂ <94 amber, BP >140/90 amber).
  2. **Complaints / HPI** — chief complaint chips + HPI textarea + duration field.
  3. **Examination** — General + system-wise textareas (CVS, RS, Abdomen, CNS) with quick-fill defaults ("NAD").
  4. **Diagnosis** — Combobox over mock ICD list, multi-select chips, primary diagnosis flag.
  5. **Prescription** — repeater of `RxRowEditor` rows (drug Combobox + dose/freq/duration/route/instructions). Live "potential allergy conflict" warning if drug name matches any patient allergy substring.
  6. **Plan** — advice (textarea), follow-up in N days (chips: 3/7/14/30 + custom), order labs (placeholder note).
- Sticky bottom action bar:
  - `Save Draft` (toast only — no draft store; placeholder).
  - `Complete Visit` (primary) — validates Diagnosis (≥1) + Plan, calls `addConsultation`, flips appointment to `completed`, navigates to Screen 14.
- Hotkeys: `Cmd/Ctrl+1..6` to jump between sections, `Cmd/Ctrl+Enter` to complete.
- Visual: clinical-precision style consistent with Screen 08. Section numbering, hairline rules, dense grids.

### Screen 14 — Prescription Preview (`/consultations/$appointmentId/prescription`)
- Print-optimised single page (A4 ratio container).
- Header: hospital name (mock), doctor name + reg no, date, patient block (name, UID, age/sex, allergies prominent in red).
- Body: diagnoses, Rx table (Drug | Dose | Freq | Duration | Instructions), advice, follow-up.
- Footer: signature line + "Generated by HMS" stamp.
- Actions: `Print` (`window.print()`), `Back to Queue`.
- Not-found state for unknown appointmentId or non-completed appointment.

### Navigation wiring
- AppSidebar: ensure `Appointments` item routes to `/appointments`. Add `New Appointment` quick action on Reception + Doctor dashboards (already in QuickActions; just point to `/appointments/new`).
- Doctor dashboard "Next Patient" CTA → start consultation for the next `checked-in` appointment assigned to current user.
- Patient profile (Screen 10) "New Appointment" button → `/appointments/new?patientUid={uid}` (prefills patient).

## Out of scope
- Persistence/backend.
- Real ICD-10/SNOMED catalogue (mock subset only).
- Lab orders flow (text placeholder under Plan).
- Drug interaction checks beyond simple allergy substring match.
- Editing a completed consultation.
- Follow-up auto-booking.

## Routes added

| Route | File |
|-------|------|
| `/appointments` | `src/routes/_authenticated/appointments.index.tsx` |
| `/appointments/new` | `src/routes/_authenticated/appointments.new.tsx` |
| (layout) | `src/routes/_authenticated/appointments.tsx` (`<Outlet />`) |
| `/consultations/$appointmentId` | `src/routes/_authenticated/consultations.$appointmentId.index.tsx` |
| `/consultations/$appointmentId/prescription` | `src/routes/_authenticated/consultations.$appointmentId.prescription.tsx` |
| (layout) | `src/routes/_authenticated/consultations.$appointmentId.tsx` (`<Outlet />`) |

## Tech notes
- Validation via Zod schemas in `src/lib/validation/consultation.ts`.
- Print styles: scoped `@media print` block in `src/styles.css` to hide chrome on Screen 14.
- BMI helper in `src/lib/vitals.ts`. Token number derived from sorted scheduled time per doctor per day.
- `useSearch` on `/appointments/new` to read `patientUid` for prefill.

## Working rhythm
After Module 4 ships, next turn implements **Module 5 — IPD / Ward Management** (admission, bed allocation, nursing notes).
