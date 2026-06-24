import type { KPIData } from "../../types/index";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps extends KPIData {
  icone: LucideIcon;
}

function formatarValor(valor: number, prefixo?: string, sufixo?: string): string {
  const formatado = valor.toLocaleString("pt-BR", {
    minimumFractionDigits: sufixo ? 0 : 2,
    maximumFractionDigits: sufixo ? 0 : 2,
  });
  return `${prefixo ?? ""}${formatado}${sufixo ?? ""}`;
}

export function KPICard({ titulo, valor, variacao, positivo, prefixo, sufixo, icone: Icone }: KPICardProps) {
  const corVariacao = positivo ? "#34D399" : "#F87171";

  return (
    <div
      style={{
        background: "rgba(30, 26, 43, 0.6)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow de fundo decorativo */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: positivo
            ? "rgba(147, 51, 234, 0.12)"
            : "rgba(248, 113, 113, 0.10)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Topo: título + ícone */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#6B6480",
          }}
        >
          {titulo}
        </span>

        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(147, 51, 234, 0.15)",
            border: "1px solid rgba(192, 132, 252, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icone size={16} color="#C084FC" />
        </div>
      </div>

      {/* Valor principal */}
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "36px",
          lineHeight: 1,
          background: "linear-gradient(135deg, #C084FC, #EC4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {formatarValor(valor, prefixo, sufixo)}
      </div>

      {/* Variação */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {positivo ? (
          <TrendingUp size={14} color={corVariacao} />
        ) : (
          <TrendingDown size={14} color={corVariacao} />
        )}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            color: corVariacao,
          }}
        >
          {positivo ? "+" : ""}{variacao}%
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            color: "#6B6480",
          }}
        >
          vs mês anterior
        </span>
      </div>
    </div>
  );
}