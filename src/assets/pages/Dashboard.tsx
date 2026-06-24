import { KPICard } from "../components/dashboard/KPICard";
import { kpis } from "../data/mock";
import { TrendingUp, TrendingDown, Target, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icones: LucideIcon[] = [TrendingUp, TrendingDown, Wallet, Target];

export function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "8px" }}>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {kpis.map((kpi, i) => (
          <KPICard key={kpi.titulo} {...kpi} icone={icones[i]} />
        ))}
      </div>
    </div>
  );
}