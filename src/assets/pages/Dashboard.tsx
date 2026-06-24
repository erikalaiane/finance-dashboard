import { KPICard } from "../components/dashboard/KPICard";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { DonutChart } from "../components/dashboard/DonutChart";
import { kpis } from "../data/mock";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icones: LucideIcon[] = [TrendingUp, TrendingDown, Wallet, Target];

export function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "8px" }}>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {kpis.map((kpi, i) => (
          <KPICard key={kpi.titulo} {...kpi} icone={icones[i]} />
        ))}
      </div>

      {/* Linha 2: Gráfico + Donut */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
        <RevenueChart />
       <DonutChart />
      </div>

    </div>
  );
}