import { Search } from "lucide-react";

export function AppTopbar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-2 rounded border border-border bg-muted px-3 py-1.5 text-xs">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">Search Patient:</span>
        <span className="font-medium">Cmd + K</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded border border-condition/30 bg-condition/10 px-2 py-1 text-[11px] font-bold text-condition">
          SHIFT: 08:00 — 16:00
        </div>
        <div className="h-4 w-px bg-border" />
        <select className="border-none bg-transparent text-xs font-medium focus:outline-none focus:ring-0">
          <option>Radiology Wing A</option>
          <option>Emergency Unit</option>
        </select>
      </div>
    </header>
  );
}
