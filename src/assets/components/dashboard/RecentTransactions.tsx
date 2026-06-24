import { transacoes } from "../../data/mock";
import type { Transacao } from "../../types/index";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

function Badge({ status }: { status: Transacao["status"] }) {
  const config = {
    concluida: { label: "Concluída", color: "#34D399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)" },
    pendente: { label: "Pendente", color: "#C084FC", bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.2)" },
    cancelada: { label: "Cancelada", color: "#F87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" },
  }[status];

  return (
    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, color: config.color, background: config.bg, border: `1px solid ${config.border}`, borderRadius: "6px", padding: "2px 8px", whiteSpace: "nowrap" }}>
      {config.label}
    </span>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, color: "#6B6480", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "4px", padding: "1px 6px" }}>
      {label}
    </span>
  );
}

function formatarValor(valor: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatarData(data: string): string {
  return new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function RecentTransactions() {
  const recentes = transacoes.slice(0, 5);

  const totalReceita = transacoes
    .filter((t) => t.categoria === "receita" && t.status === "concluida")
    .reduce((acc, t) => acc + t.valor, 0);

  const totalDespesa = transacoes
    .filter((t) => t.categoria === "despesa" && t.status === "concluida")
    .reduce((acc, t) => acc + t.valor, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Tabela principal */}
      <div
        style={{
          background: "rgba(30, 26, 43, 0.6)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "4px" }}>
              Últimas movimentações
            </p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#F5F3F7", letterSpacing: "1px" }}>
              Transações Recentes
            </h2>
          </div>
          <a href="/transacoes" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, color: "#C084FC", textDecoration: "none", marginBottom: "4px" }}>
            Ver todas →
          </a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {recentes.map((t, i) => (
            <div
              key={t.id}
              style={{
                display: "grid",
                gridTemplateColumns: "32px 1fr auto auto",
                alignItems: "center",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "background 0.15s ease",
                borderBottom: i < recentes.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: t.categoria === "receita" ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)", flexShrink: 0 }}>
                {t.categoria === "receita" ? <ArrowUpRight size={14} color="#34D399" /> : <ArrowDownLeft size={14} color="#F87171" />}
              </div>

              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#F5F3F7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {t.descricao}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480" }}>
                    {formatarData(t.data)}
                  </span>
                  {t.tags?.map((tag) => <Tag key={tag} label={tag} />)}
                </div>
              </div>

              <Badge status={t.status} />

              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: t.categoria === "receita" ? "#34D399" : "#F87171", whiteSpace: "nowrap" }}>
                {t.categoria === "receita" ? "+" : "-"}R${formatarValor(t.valor)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini card de resumo */}
      <div
        style={{
          background: "rgba(30, 26, 43, 0.6)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "16px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B6480", marginBottom: "4px" }}>
            Recebido
          </p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#34D399", letterSpacing: "0.5px" }}>
            R${formatarValor(totalReceita)}
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B6480", marginBottom: "4px" }}>
            Gasto
          </p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#F87171", letterSpacing: "0.5px" }}>
            R${formatarValor(totalDespesa)}
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B6480", marginBottom: "4px" }}>
            Saldo
          </p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "0.5px", background: "linear-gradient(135deg, #C084FC, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            R${formatarValor(totalReceita - totalDespesa)}
          </p>
        </div>
      </div>
    </div>
  );
}