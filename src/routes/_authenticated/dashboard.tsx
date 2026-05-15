import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPlaceholder,
});

function DashboardPlaceholder() {
  const { user } = useAuth();
  return (
    <div className="space-y-6 p-8">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Module 2 — coming next
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(" ").slice(-1)[0] ?? "Doctor"}.
        </h1>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          Module 1 (Authentication) is live. The role-based dashboards, patient registry, OPD
          consultation, IPD wards, billing and radiology modules will land in subsequent turns.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "Today's Appointments", value: "—" },
          { label: "Admitted Patients", value: "—" },
          { label: "Pending Billing", value: "—" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {kpi.label}
            </div>
            <div className="mt-2 text-3xl font-bold tracking-tight">{kpi.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
