import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { dadosDonut } from "../../data/mock";

interface TooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: { cor: string } }[];
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "rgba(30, 26, 43, 0.95)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        borderRadius: "12px",
        padding: "10px 14px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: payload[0].payload.cor }} />
        <span style={{ color: "#9D94B0", fontSize: "12px" }}>{payload[0].name}:</span>
        <span style={{ color: "#F5F3F7", fontSize: "12px", fontWeight: 600 }}>
          R${payload[0].value.toLocaleString("pt-BR")}
        </span>
      </div>
    </div>
  );
}

export function DonutChart() {
  const total = dadosDonut.reduce((acc, item) => acc + item.valor, 0);

  return (
    <div
      style={{
        background: "rgba(30, 26, 43, 0.6)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "4px" }}>
          Distribuição
        </p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#F5F3F7", letterSpacing: "1px" }}>
          Por Categoria
        </h2>
      </div>

      {/* Gráfico */}
      <div style={{ position: "relative", flex: 1, minHeight: "160px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dadosDonut}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              dataKey="valor"
              nameKey="nome"
              strokeWidth={0}
            >
              {dadosDonut.map((entry, index) => (
                <Cell key={index} fill={entry.cor} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Total no centro */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", background: "linear-gradient(135deg, #C084FC, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
            R${(total / 1000).toFixed(1)}k
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#6B6480", marginTop: "2px" }}>
            total
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
        {dadosDonut.map((item) => (
          <div key={item.nome} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.cor, flexShrink: 0 }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9D94B0" }}>{item.nome}</span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#F5F3F7" }}>
              R${item.valor.toLocaleString("pt-BR")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}