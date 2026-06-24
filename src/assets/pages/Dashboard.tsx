import { KPICard } from "../components/dashboard/KPICard";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { DonutChart } from "../components/dashboard/DonutChart";
import { RecentTransactions } from "../components/dashboard/RecentTransactions";
import { SidePanel } from "../components/dashboard/SidePanel";
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

      {/* Linha 3: Transações + placeholder */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
        <RecentTransactions />
        <div style={{
          background: "rgba(30, 26, 43, 0.6)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6B6480",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
        }}>
          <SidePanel />
        </div>
      </div>

    </div>
  );
}