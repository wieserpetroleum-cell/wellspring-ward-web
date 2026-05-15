import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { AppLayout } from "@/components/layout/AppLayout";
import { PatientsProvider } from "@/lib/patients-store";
import { AppointmentsProvider } from "@/lib/appointments-store";
import { ConsultationsProvider } from "@/lib/consultations-store";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated && !isAuthenticated) {
      navigate({ to: "/login", replace: true });
    }
  }, [hydrated, isAuthenticated, navigate]);

  if (!hydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <PatientsProvider>
      <AppointmentsProvider>
        <ConsultationsProvider>
          <AppLayout />
        </ConsultationsProvider>
      </AppointmentsProvider>
    </PatientsProvider>
  );
}
