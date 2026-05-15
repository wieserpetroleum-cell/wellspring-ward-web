# HMS — Module 2: Dashboards

Frontend-only. Builds on Foundation + Module 1 (Auth).

## Scope

Implement the 5 role-based dashboards from the spec. Each dashboard uses shared widget components and is populated with expanded mock data.

## What will be built

### Mock data expansion
- `src/lib/mock/appointments.ts` — OPD/IPD appointments with status, doctor, room
- `src/lib/mock/wards.ts` — Ward/bed inventory with occupancy status
- `src/lib/mock/bills.ts` — Invoices with payment status, amount, TPA flag
- `src/lib/mock/staff.ts` — Doctors, nurses on shift
- Update `src/lib/types.ts` with `Appointment`, `WardBed`, `Bill`, `StaffMember` interfaces

### Shared dashboard widgets
- `src/components/dashboard/KpiCard.tsx` — stat card with label, value, trend indicator
- `src/components/dashboard/QuickActions.tsx` — button grid for common tasks
- `src/components/dashboard/RecentList.tsx` — scrollable recent items (appointments, admissions, bills)
- `src/components/dashboard/BedOccupancyBar.tsx` — visual ward occupancy indicator

### Dashboards (5 screens)

1. **Admin Dashboard** (`/dashboard`)
   - KPIs: Total Patients, Staff on Duty, Revenue Today, Pending Bills, Bed Occupancy %
   - Recent registrations + admissions
   - System alerts / notifications
   - Quick actions: Register Patient, New Appointment, Add User, View Reports

2. **Reception Dashboard** (`/dashboard/reception`)
   - KPIs: Appointments Today, Walk-ins, Bed Availability, Pending Registrations
   - Live queue: checked-in patients waiting
   - Quick actions: Check-in, Register, Book Appointment, Bed Allocation

3. **Doctor Dashboard** (`/dashboard/doctor`)
   - KPIs: OPD Patients Seen, Pending Consultations, Ward Rounds, Surgeries Scheduled
   - Today's schedule with patient list
   - Quick actions: Start Consultation, View Ward, Write Notes

4. **Nurse Dashboard** (`/dashboard/nurse`)
   - KPIs: Beds Under Care, Vitals Due, Medication Rounds, Alerts
   - Ward occupancy grid with patient names + vitals status
   - Quick actions: Record Vitals, Administer Meds, Raise Alert

5. **Billing Dashboard** (`/dashboard/billing`)
   - KPIs: Invoices Generated, Pending Amount, TPA Claims, Collections Today
   - Ageing table: unpaid bills by bucket (0-30, 31-60, 60+)
   - Quick actions: Generate Invoice, Process TPA, Record Payment

### Dev-only role switcher
- Add a small role switcher in `AppSidebar.tsx` user footer (dropdown) so you can preview any dashboard without re-logging.

## Out of scope for this module
- Real charts/graphs libraries — use CSS bar/progress visuals only
- Real-time data / websockets
- Backend APIs

## Routes

| Route | Content |
|-------|---------|
| `/dashboard` | Admin Dashboard (default for admin role) |
| `/dashboard/reception` | Reception Dashboard |
| `/dashboard/doctor` | Doctor Dashboard |
| `/dashboard/nurse` | Nurse Dashboard |
| `/dashboard/billing` | Billing Dashboard |

## Tech notes

- All dashboards are static client-side renders with mock data
- Shared widgets live in `src/components/dashboard/`
- KPI values are hardcoded in mocks; trend indicators are static
- Quick action buttons route to module routes that will be built later (e.g., `/patients/register`, `/opd/appointments`)

## Working rhythm

After this is built, the next turn implements **Module 3 — Patient Registration & Records** (Screens 08, 09, 10).
