import { eventos, metas } from "../../data/mock";
import { CalendarDays, Target } from "lucide-react";

function formatarData(data: string): string {
  return new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function formatarValor(valor: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const corTipoEvento: Record<string, string> = {
  vencimento: "#F87171",
  pagamento: "#C084FC",
  recebimento: "#34D399",
  lembrete: "#9D94B0",
};

export function SidePanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}>

      {/* Eventos */}
      <div
        style={{
          background: "rgba(30, 26, 43, 0.6)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "20px",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <CalendarDays size={14} color="#6B6480" />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480" }}>
            Próximos Eventos
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {eventos.slice(0, 3).map((evento) => (
            <div
              key={evento.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "32px",
                  borderRadius: "2px",
                  background: corTipoEvento[evento.tipo],
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, color: "#F5F3F7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {evento.titulo}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480", marginTop: "1px" }}>
                  {formatarData(evento.data)}
                </p>
              </div>
              {evento.valor && (
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: corTipoEvento[evento.tipo], whiteSpace: "nowrap" }}>
                  R${formatarValor(evento.valor)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Metas */}
      <div
        style={{
          background: "rgba(30, 26, 43, 0.6)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "20px",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Target size={14} color="#6B6480" />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480" }}>
            Metas
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {metas.map((meta) => {
            const progresso = Math.round((meta.valorAtual / meta.valorAlvo) * 100);
            return (
              <div key={meta.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, color: "#F5F3F7" }}>
                    {meta.titulo}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: meta.cor ?? "#C084FC" }}>
                    {progresso}%
                  </span>
                </div>
                {/* Progress bar */}
                <div
                  style={{
                    width: "100%",
                    height: "4px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progresso}%`,
                      height: "100%",
                      borderRadius: "2px",
                      background: meta.cor
                        ? `linear-gradient(90deg, ${meta.cor}, #EC4899)`
                        : "linear-gradient(90deg, #C084FC, #EC4899)",
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#6B6480" }}>
                    R${formatarValor(meta.valorAtual)}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "#6B6480" }}>
                    R${formatarValor(meta.valorAlvo)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}