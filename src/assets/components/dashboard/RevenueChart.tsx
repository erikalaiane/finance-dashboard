import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dadosGrafico } from "../../data/mock";

function formatarValor(valor: number): string {
  if (valor >= 1000) return `R$${(valor / 1000).toFixed(0)}k`;
  return `R$${valor}`;
}

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "rgba(30, 26, 43, 0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        borderRadius: "12px",
        padding: "12px 16px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <p style={{ color: "#6B6480", fontSize: "11px", marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: entry.color }} />
          <span style={{ color: "#9D94B0", fontSize: "12px" }}>
            {entry.name === "receita" ? "Receita" : "Despesa"}:
          </span>
          <span style={{ color: "#F5F3F7", fontSize: "12px", fontWeight: 600 }}>
            {formatarValor(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function RevenueChart() {
  return (
    <div
      style={{
        background: "rgba(30, 26, 43, 0.6)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "24px",
        height: "100%",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "4px" }}>
          Visão Geral
        </p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#F5F3F7", letterSpacing: "1px" }}>
          Receita x Despesa
        </h2>
      </div>

      {/* Legenda */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#C084FC" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9D94B0" }}>Receita</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#F87171" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9D94B0" }}>Despesa</span>
        </div>
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={dadosGrafico} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C084FC" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#C084FC" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradDespesa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F87171" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F87171" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="mes"
            tick={{ fill: "#6B6480", fontSize: 11, fontFamily: "'Inter', sans-serif" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatarValor}
            tick={{ fill: "#6B6480", fontSize: 11, fontFamily: "'Inter', sans-serif" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="receita" stroke="#C084FC" strokeWidth={2} fill="url(#gradReceita)" />
          <Area type="monotone" dataKey="despesa" stroke="#F87171" strokeWidth={2} fill="url(#gradDespesa)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}