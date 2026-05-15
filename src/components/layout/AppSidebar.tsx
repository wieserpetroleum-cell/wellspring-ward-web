import { Link, useRouterState } from "@tanstack/react-router";
import {
  Stethoscope,
  BedDouble,
  Users,
  Receipt,
  ScanLine,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

const clinicalNav: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/opd", label: "OPD Consultation", icon: Stethoscope },
  { to: "/ipd", label: "IPD Ward Management", icon: BedDouble },
  { to: "/patients", label: "Patient Registry", icon: Users },
];

const adminNav: NavItem[] = [
  { to: "/billing", label: "Billing & TPA", icon: Receipt },
  { to: "/radiology", label: "Radiology Reports", icon: ScanLine },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-slate-400 hover:bg-white/5 hover:text-white",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + "/");

  const initials = user
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
    : "—";

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="border-b border-white/10 p-6">
        <div className="text-xl font-bold tracking-tight text-white">
          MEDICORE<span className="text-primary">.OS</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Clinical
        </div>
        {clinicalNav.map((item) => (
          <NavLink key={item.to} item={item} active={isActive(item.to)} />
        ))}

        <div className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Administrative
        </div>
        {adminNav.map((item) => (
          <NavLink key={item.to} item={item} active={isActive(item.to)} />
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="grid size-8 place-items-center rounded-full bg-slate-700 text-xs font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-white">
              {user?.name ?? "Guest"}
            </div>
            <div className="truncate text-[10px] capitalize text-slate-400">
              {user?.title ?? user?.role ?? ""}
            </div>
          </div>
          <button
            onClick={logout}
            aria-label="Sign out"
            className="rounded p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
