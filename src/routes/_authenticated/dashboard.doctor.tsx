import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Stethoscope, BedDouble, NotebookPen, Activity } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentList, type RecentRow } from "@/components/dashboard/RecentList";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useAppointments } from "@/lib/appointments-store";

export const Route = createFileRoute("/_authenticated/dashboard/doctor")({
  component: DoctorDashboard,
});

function DoctorDashboard() {
  const navigate = useNavigate();
  const { appointments } = useAppointments();
  const today = new Date().toISOString().slice(0, 10);
  const todays = appointments.filter((a) => a.date === today);
  const seen = todays.filter((a) => a.status === "completed").length;
  const pending = todays.filter((a) =>
    ["scheduled", "checked-in", "in-consultation"].includes(a.status),
  ).length;
  const nextUp = todays
    .filter((a) => a.status === "checked-in")
    .sort((a, b) => a.time.localeCompare(b.time))[0];

  const schedule: RecentRow[] = todays.map((a) => ({
    id: a.id,
    primary: a.patientName,
    secondary: `${a.type} · ${a.department}`,
    meta: a.time,
    badge: {
      label: a.status,
      tone:
        a.status === "completed"
          ? "ok"
          : a.status === "in-consultation"
            ? "info"
            : a.status === "checked-in"
              ? "warn"
              : "default",
    },
  }));

  return (
    <div className="space-y-6 p-8">
      <PageHeader
        eyebrow="Clinician"
        title="Today's clinical workload"
        description="OPD schedule, ward rounds and pending consultations."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiCard label="OPD Patients Seen" value={seen} tone="ok" />
        <KpiCard label="Pending Consultations" value={pending} tone="warn" />
        <KpiCard label="Ward Rounds" value={3} tone="info" />
        <KpiCard label="Surgeries Scheduled" value={1} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentList title="Today's Schedule" rows={schedule} />
        </div>
        <QuickActions
          actions={[
            {
              label: nextUp ? `Next: ${nextUp.patientName}` : "Open OPD Queue",
              icon: Stethoscope,
              onClick: () =>
                nextUp
                  ? navigate({ to: "/consultations/$appointmentId", params: { appointmentId: nextUp.id } })
                  : navigate({ to: "/appointments" }),
            },
            { label: "View Ward", icon: BedDouble, onClick: () => navigate({ to: "/dashboard/nurse" }) },
            { label: "Write Notes", icon: NotebookPen, onClick: () => navigate({ to: "/appointments" }) },
            { label: "Review Vitals", icon: Activity, onClick: () => navigate({ to: "/appointments" }) },
          ]}
        />
      </div>
    </div>
  );
}