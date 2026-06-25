import { useState } from "react";
import { eventos as eventosIniciais } from "../data/mock";
import type { Evento, TipoEvento } from "../types/index";
import { Modal } from "../components/ui/Modal";
import { Plus, CalendarDays, ChevronLeft, ChevronRight, AlertCircle, ArrowDownCircle, ArrowUpCircle, Bell } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatarValor(valor: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatarDataCompleta(data: string): string {
  return new Date(data).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

function formatarDataCurta(data: string): string {
  return new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

const corPorTipo: Record<TipoEvento, string> = {
  vencimento: "#F87171",
  pagamento: "#C084FC",
  recebimento: "#34D399",
  lembrete: "#9D94B0",
};

const iconePorTipo: Record<TipoEvento, React.ReactNode> = {
  vencimento: <AlertCircle size={16} />,
  pagamento: <ArrowDownCircle size={16} />,
  recebimento: <ArrowUpCircle size={16} />,
  lembrete: <Bell size={16} />,
};

const labelPorTipo: Record<TipoEvento, string> = {
  vencimento: "Vencimento",
  pagamento: "Pagamento",
  recebimento: "Recebimento",
  lembrete: "Lembrete",
};

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

// ─── Calendário ───────────────────────────────────────────────────────────────

function Calendario({ eventos, onDiaSelecionado, diaSelecionado }: {
  eventos: Evento[];
  onDiaSelecionado: (data: string) => void;
  diaSelecionado: string | null;
}) {
  const hoje = new Date();
  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  const diasComEvento = new Set(
    eventos
      .filter((e) => {
        const d = new Date(e.data);
        return d.getMonth() === mes && d.getFullYear() === ano;
      })
      .map((e) => new Date(e.data).getDate())
  );

  const navMes = (dir: number) => {
    const novoMes = mes + dir;
    if (novoMes < 0) { setMes(11); setAno(ano - 1); }
    else if (novoMes > 11) { setMes(0); setAno(ano + 1); }
    else setMes(novoMes);
  };

  return (
    <div style={{ background: "rgba(30, 26, 43, 0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "20px" }}>
      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <button onClick={() => navMes(-1)} style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ChevronLeft size={14} color="#9D94B0" />
        </button>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", color: "#F5F3F7", letterSpacing: "1px" }}>
          {MESES[mes]} {ano}
        </p>
        <button onClick={() => navMes(1)} style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ChevronRight size={14} color="#9D94B0" />
        </button>
      </div>

      {/* Dias da semana */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
        {DIAS_SEMANA.map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, color: "#6B6480", padding: "4px 0" }}>{d}</div>
        ))}
      </div>

      {/* Dias */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {Array.from({ length: primeiroDia }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: diasNoMes }, (_, i) => i + 1).map((dia) => {
          const dataStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
          const temEvento = diasComEvento.has(dia);
          const isHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();
          const isSelecionado = diaSelecionado === dataStr;

          return (
            <button
              key={dia}
              onClick={() => onDiaSelecionado(isSelecionado ? "" : dataStr)}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                borderRadius: "8px",
                border: isSelecionado ? "1px solid rgba(192,132,252,0.5)" : isHoje ? "1px solid rgba(147,51,234,0.4)" : "1px solid transparent",
                background: isSelecionado ? "rgba(147,51,234,0.2)" : isHoje ? "rgba(147,51,234,0.1)" : "transparent",
                color: isHoje || isSelecionado ? "#F5F3F7" : "#9D94B0",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: isHoje ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => { if (!isSelecionado && !isHoje) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={(e) => { if (!isSelecionado && !isHoje) e.currentTarget.style.background = "transparent"; }}
            >
              {dia}
              {temEvento && (
                <div style={{ position: "absolute", bottom: "3px", left: "50%", transform: "translateX(-50%)", width: "4px", height: "4px", borderRadius: "50%", background: "linear-gradient(135deg, #C084FC, #EC4899)" }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Modal Detalhes ───────────────────────────────────────────────────────────

function ModalDetalhes({ evento, onFechar }: { evento: Evento; onFechar: () => void }) {
  const cor = corPorTipo[evento.tipo];
  return (
    <Modal aberto titulo="Detalhes do Evento" onFechar={onFechar} largura="420px">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${cor}22`, display: "flex", alignItems: "center", justifyContent: "center", color: cor, flexShrink: 0 }}>
            {iconePorTipo[evento.tipo]}
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 600, color: "#F5F3F7" }}>{evento.titulo}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: cor, marginTop: "2px" }}>{labelPorTipo[evento.tipo]}</p>
          </div>
        </div>

        {[
          { label: "Data", valor: formatarDataCompleta(evento.data) },
          ...(evento.valor ? [{ label: "Valor", valor: `R$${formatarValor(evento.valor)}` }] : []),
          ...(evento.descricao ? [{ label: "Descrição", valor: evento.descricao }] : []),
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>{item.label}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#F5F3F7", textAlign: "right", maxWidth: "60%" }}>{item.valor}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// ─── Modal Novo Evento ────────────────────────────────────────────────────────

function ModalNovoEvento({ onFechar, onSalvar }: { onFechar: () => void; onSalvar: (e: Evento) => void }) {
  const [form, setForm] = useState({ titulo: "", tipo: "lembrete" as TipoEvento, data: "", valor: "", descricao: "" });

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 14px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#F5F3F7", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#6B6480", marginBottom: "6px", display: "block" };

  const handleSalvar = () => {
    if (!form.titulo || !form.data) return;
    onSalvar({ id: `e${Date.now()}`, titulo: form.titulo, tipo: form.tipo, data: form.data, valor: form.valor ? Number(form.valor) : undefined, descricao: form.descricao || undefined });
    onFechar();
  };

  return (
    <Modal aberto titulo="Novo Evento" onFechar={onFechar} largura="460px">
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div><label style={labelStyle}>Título</label><input style={inputStyle} placeholder="Ex: Reunião de revisão" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Tipo</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoEvento })}>
              <option value="lembrete">Lembrete</option>
              <option value="vencimento">Vencimento</option>
              <option value="pagamento">Pagamento</option>
              <option value="recebimento">Recebimento</option>
            </select>
          </div>
          <div><label style={labelStyle}>Data</label><input style={inputStyle} type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} /></div>
        </div>
        <div><label style={labelStyle}>Valor (R$) — opcional</label><input style={inputStyle} type="number" placeholder="0" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} /></div>
        <div><label style={labelStyle}>Descrição — opcional</label><input style={inputStyle} placeholder="Detalhes do evento..." value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} /></div>
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <button onClick={onFechar} style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9D94B0", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>Cancelar</button>
          <button onClick={handleSalvar} style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "linear-gradient(135deg, #9333EA, #EC4899)", border: "none", color: "white", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Salvar evento</button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Página ──────────────────────────────────────────────────────────────────

export function Eventos() {
  const [listaEventos, setListaEventos] = useState<Evento[]>(eventosIniciais);
  const [novoAberto, setNovoAberto] = useState(false);
  const [selecionado, setSelecionado] = useState<Evento | null>(null);
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);

  const eventosFiltrados = diaSelecionado
    ? listaEventos.filter((e) => e.data === diaSelecionado)
    : listaEventos;

  const eventosPorTipo = (tipo: TipoEvento) => listaEventos.filter((e) => e.tipo === tipo);

  const labelStyle = { fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase" as const, color: "#6B6480", marginBottom: "4px" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "8px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={labelStyle}>Calendário e vencimentos</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", display: "inline-block", background: "linear-gradient(135deg, #F5F3F7 30%, #C084FC 70%, #EC4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
            Eventos
          </h1>
        </div>
        <button onClick={() => setNovoAberto(true)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "12px", background: "linear-gradient(135deg, #9333EA, #EC4899)", border: "none", color: "white", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          <Plus size={16} />
          Novo evento
        </button>
      </div>

      {/* Grid de cards por tipo */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
        {(["vencimento", "pagamento", "recebimento", "lembrete"] as TipoEvento[]).map((tipo) => {
          const cor = corPorTipo[tipo];
          const count = eventosPorTipo(tipo).length;
          return (
            <div key={tipo} style={{ background: "rgba(30, 26, 43, 0.6)", backdropFilter: "blur(16px)", border: `1px solid ${cor}22`, borderRadius: "14px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${cor}18`, display: "flex", alignItems: "center", justifyContent: "center", color: cor, flexShrink: 0 }}>
                {iconePorTipo[tipo]}
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480", letterSpacing: "1px", textTransform: "uppercase" }}>{labelPorTipo[tipo]}</p>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", color: cor, lineHeight: 1 }}>{count}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendário + Lista */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "16px" }}>
        <Calendario eventos={listaEventos} onDiaSelecionado={setDiaSelecionado} diaSelecionado={diaSelecionado} />

        {/* Lista */}
        <div style={{ background: "rgba(30, 26, 43, 0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <CalendarDays size={14} color="#6B6480" />
            <p style={labelStyle}>
              {diaSelecionado ? `Eventos em ${formatarDataCurta(diaSelecionado)}` : "Todos os eventos"}
            </p>
            {diaSelecionado && (
              <button onClick={() => setDiaSelecionado(null)} style={{ marginLeft: "auto", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#C084FC", background: "none", border: "none", cursor: "pointer" }}>
                Limpar filtro
              </button>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" }}>
            {eventosFiltrados.length === 0 ? (
              <div style={{ textAlign: "center", padding: "32px", color: "#6B6480", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>
                Nenhum evento neste dia.
              </div>
            ) : (
              eventosFiltrados.map((evento) => {
                const cor = corPorTipo[evento.tipo];
                return (
                  <div
                    key={evento.id}
                    onClick={() => setSelecionado(evento)}
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", border: `1px solid ${cor}18`, background: `${cor}08`, cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${cor}15`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${cor}08`; }}
                  >
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: `${cor}22`, display: "flex", alignItems: "center", justifyContent: "center", color: cor, flexShrink: 0 }}>
                      {iconePorTipo[evento.tipo]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#F5F3F7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{evento.titulo}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480", marginTop: "2px" }}>{formatarDataCurta(evento.data)} · {labelPorTipo[evento.tipo]}</p>
                    </div>
                    {evento.valor && (
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: cor, whiteSpace: "nowrap" }}>
                        R${formatarValor(evento.valor)}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modais */}
      {novoAberto && <ModalNovoEvento onFechar={() => setNovoAberto(false)} onSalvar={(e) => setListaEventos((prev) => [...prev, e])} />}
      {selecionado && <ModalDetalhes evento={selecionado} onFechar={() => setSelecionado(null)} />}
    </div>
  );
}