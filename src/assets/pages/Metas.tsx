import { useState } from "react";
import { metas as metasIniciais } from "../data/mock";
import type { Meta } from "../types/index";
import { Modal } from "../components/ui/Modal";
import { Plus, Target, Edit2, TrendingUp } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatarValor(valor: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatarData(data: string): string {
  return new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

function calcularDiasRestantes(prazo: string): number {
  const hoje = new Date();
  const dataPrazo = new Date(prazo);
  const diff = dataPrazo.getTime() - hoje.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ progresso, cor }: { progresso: number; cor: string }) {
  return (
    <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
      <div
        style={{
          width: `${Math.min(progresso, 100)}%`,
          height: "100%",
          borderRadius: "3px",
          background: `linear-gradient(90deg, ${cor}, #EC4899)`,
          transition: "width 0.8s ease",
        }}
      />
    </div>
  );
}

// ─── Modal Nova Meta ──────────────────────────────────────────────────────────

function ModalNovaMeta({ onFechar, onSalvar }: { onFechar: () => void; onSalvar: (meta: Meta) => void }) {
  const [form, setForm] = useState({
    titulo: "",
    categoria: "",
    valorAtual: "",
    valorAlvo: "",
    prazo: "",
    cor: "#9333EA",
  });

  const cores = ["#9333EA", "#EC4899", "#C084FC", "#34D399", "#F87171", "#F59E0B"];

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: "#F5F3F7",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    color: "#6B6480",
    marginBottom: "6px",
    display: "block",
  };

  const handleSalvar = () => {
    if (!form.titulo || !form.valorAlvo) return;
    onSalvar({
      id: `m${Date.now()}`,
      titulo: form.titulo,
      categoria: form.categoria || "geral",
      valorAtual: Number(form.valorAtual) || 0,
      valorAlvo: Number(form.valorAlvo),
      prazo: form.prazo || new Date().toISOString().split("T")[0],
      cor: form.cor,
    });
    onFechar();
  };

  return (
    <Modal aberto titulo="Nova Meta" onFechar={onFechar} largura="480px">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Título</label>
          <input style={inputStyle} placeholder="Ex: Reserva de emergência" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
        </div>

        <div>
          <label style={labelStyle}>Categoria</label>
          <input style={inputStyle} placeholder="Ex: poupança, viagem, equipamento" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Valor atual (R$)</label>
            <input style={inputStyle} type="number" placeholder="0" value={form.valorAtual} onChange={(e) => setForm({ ...form, valorAtual: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Valor alvo (R$)</label>
            <input style={inputStyle} type="number" placeholder="0" value={form.valorAlvo} onChange={(e) => setForm({ ...form, valorAlvo: e.target.value })} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Prazo</label>
          <input style={inputStyle} type="date" value={form.prazo} onChange={(e) => setForm({ ...form, prazo: e.target.value })} />
        </div>

        <div>
          <label style={labelStyle}>Cor</label>
          <div style={{ display: "flex", gap: "10px" }}>
            {cores.map((cor) => (
              <button
                key={cor}
                onClick={() => setForm({ ...form, cor })}
                style={{ width: "28px", height: "28px", borderRadius: "50%", background: cor, border: form.cor === cor ? "3px solid white" : "2px solid transparent", cursor: "pointer", transition: "all 0.15s" }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <button onClick={onFechar} style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9D94B0", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={handleSalvar} style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "linear-gradient(135deg, #9333EA, #EC4899)", border: "none", color: "white", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            Salvar meta
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Modal Editar Meta ────────────────────────────────────────────────────────

function ModalEditarMeta({ meta, onFechar, onSalvar }: { meta: Meta; onFechar: () => void; onSalvar: (meta: Meta) => void }) {
  const [form, setForm] = useState({
    titulo: meta.titulo,
    categoria: meta.categoria,
    valorAtual: String(meta.valorAtual),
    valorAlvo: String(meta.valorAlvo),
    prazo: meta.prazo,
    cor: meta.cor ?? "#9333EA",
  });

  const cores = ["#9333EA", "#EC4899", "#C084FC", "#34D399", "#F87171", "#F59E0B"];

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: "#F5F3F7",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    color: "#6B6480",
    marginBottom: "6px",
    display: "block",
  };

  const handleSalvar = () => {
    onSalvar({
      ...meta,
      titulo: form.titulo,
      categoria: form.categoria,
      valorAtual: Number(form.valorAtual),
      valorAlvo: Number(form.valorAlvo),
      prazo: form.prazo,
      cor: form.cor,
    });
    onFechar();
  };

  return (
    <Modal aberto titulo="Editar Meta" onFechar={onFechar} largura="480px">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Título</label>
          <input style={inputStyle} value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
        </div>

        <div>
          <label style={labelStyle}>Categoria</label>
          <input style={inputStyle} value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Valor atual (R$)</label>
            <input style={inputStyle} type="number" value={form.valorAtual} onChange={(e) => setForm({ ...form, valorAtual: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Valor alvo (R$)</label>
            <input style={inputStyle} type="number" value={form.valorAlvo} onChange={(e) => setForm({ ...form, valorAlvo: e.target.value })} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Prazo</label>
          <input style={inputStyle} type="date" value={form.prazo} onChange={(e) => setForm({ ...form, prazo: e.target.value })} />
        </div>

        <div>
          <label style={labelStyle}>Cor</label>
          <div style={{ display: "flex", gap: "10px" }}>
            {cores.map((cor) => (
              <button key={cor} onClick={() => setForm({ ...form, cor })} style={{ width: "28px", height: "28px", borderRadius: "50%", background: cor, border: form.cor === cor ? "3px solid white" : "2px solid transparent", cursor: "pointer", transition: "all 0.15s" }} />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <button onClick={onFechar} style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9D94B0", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={handleSalvar} style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "linear-gradient(135deg, #9333EA, #EC4899)", border: "none", color: "white", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            Salvar alterações
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Card Grande ──────────────────────────────────────────────────────────────

function MetaCardGrande({ meta, onEditar }: { meta: Meta; onEditar: () => void }) {
  const progresso = Math.round((meta.valorAtual / meta.valorAlvo) * 100);
  const diasRestantes = calcularDiasRestantes(meta.prazo);
  const cor = meta.cor ?? "#9333EA";

  return (
    <div style={{ background: "rgba(30, 26, 43, 0.6)", backdropFilter: "blur(16px)", border: `1px solid ${cor}22`, borderRadius: "16px", padding: "24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: `${cor}15`, filter: "blur(30px)", pointerEvents: "none" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `linear-gradient(135deg, ${cor}, #EC4899)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Target size={18} color="white" />
          </div>
          <div>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#F5F3F7", letterSpacing: "0.5px", lineHeight: 1 }}>{meta.titulo}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480", marginTop: "2px", textTransform: "uppercase", letterSpacing: "1px" }}>{meta.categoria}</p>
          </div>
        </div>
        <button onClick={onEditar} style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${cor}22`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        >
          <Edit2 size={13} color="#9D94B0" />
        </button>
      </div>

      {/* Valores */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "12px" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480", marginBottom: "2px" }}>Acumulado</p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", color: cor, lineHeight: 1 }}>R${formatarValor(meta.valorAtual)}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480", marginBottom: "2px" }}>Meta</p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#9D94B0", lineHeight: 1 }}>R${formatarValor(meta.valorAlvo)}</p>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar progresso={progresso} cor={cor} />

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <TrendingUp size={12} color={cor} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 700, color: cor }}>{progresso}%</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>concluído</span>
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: diasRestantes < 30 ? "#F87171" : "#6B6480" }}>
          {diasRestantes > 0 ? `${diasRestantes} dias restantes` : "Prazo encerrado"}
        </span>
      </div>

      <div style={{ marginTop: "12px", padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480" }}>
          Prazo: <span style={{ color: "#9D94B0", fontWeight: 500 }}>{formatarData(meta.prazo)}</span>
          {" · "}
          Faltam: <span style={{ color: "#9D94B0", fontWeight: 500 }}>R${formatarValor(meta.valorAlvo - meta.valorAtual)}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Mini Card ────────────────────────────────────────────────────────────────

function MetaMiniCard({ meta, onEditar }: { meta: Meta; onEditar: () => void }) {
  const progresso = Math.round((meta.valorAtual / meta.valorAlvo) * 100);
  const cor = meta.cor ?? "#9333EA";

  return (
    <div style={{ background: "rgba(30, 26, 43, 0.6)", backdropFilter: "blur(16px)", border: `1px solid ${cor}22`, borderRadius: "16px", padding: "16px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#F5F3F7" }}>{meta.titulo}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 700, color: cor }}>{progresso}%</span>
          <button onClick={onEditar} style={{ width: "24px", height: "24px", borderRadius: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Edit2 size={11} color="#9D94B0" />
          </button>
        </div>
      </div>
      <ProgressBar progresso={progresso} cor={cor} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480" }}>R${formatarValor(meta.valorAtual)}</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480" }}>R${formatarValor(meta.valorAlvo)}</span>
      </div>
    </div>
  );
}

// ─── Página ──────────────────────────────────────────────────────────────────

export function Metas() {
  const [listaMetas, setListaMetas] = useState<Meta[]>(metasIniciais);
  const [novaAberta, setNovaAberta] = useState(false);
  const [editando, setEditando] = useState<Meta | null>(null);

  const totalAcumulado = listaMetas.reduce((acc, m) => acc + m.valorAtual, 0);
  const totalAlvo = listaMetas.reduce((acc, m) => acc + m.valorAlvo, 0);
  const progressoGeral = Math.round((totalAcumulado / totalAlvo) * 100);

  const metasGrandes = listaMetas.slice(0, 2);
  const metasMini = listaMetas.slice(2);

  const handleSalvarNova = (meta: Meta) => setListaMetas((prev) => [...prev, meta]);
  const handleSalvarEdicao = (metaEditada: Meta) => setListaMetas((prev) => prev.map((m) => m.id === metaEditada.id ? metaEditada : m));

  const labelStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "#6B6480",
    marginBottom: "4px",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "8px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={labelStyle}>Objetivos financeiros</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", display: "inline-block", background: "linear-gradient(135deg, #F5F3F7 30%, #C084FC 70%, #EC4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
            Metas
          </h1>
        </div>
        <button onClick={() => setNovaAberta(true)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "12px", background: "linear-gradient(135deg, #9333EA, #EC4899)", border: "none", color: "white", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          <Plus size={16} />
          Nova meta
        </button>
      </div>

      {/* Resumo geral */}
      <div style={{ background: "rgba(30, 26, 43, 0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div>
            <p style={labelStyle}>Progresso geral</p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "32px", display: "inline-block", background: "linear-gradient(135deg, #C084FC, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
              {progressoGeral}% concluído
            </p>
          </div>
          <div style={{ display: "flex", gap: "32px" }}>
            <div style={{ textAlign: "right" }}>
              <p style={labelStyle}>Acumulado</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#34D399" }}>R${formatarValor(totalAcumulado)}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={labelStyle}>Total alvo</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#F5F3F7" }}>R${formatarValor(totalAlvo)}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={labelStyle}>Metas ativas</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#C084FC" }}>{listaMetas.length}</p>
            </div>
          </div>
        </div>
        <ProgressBar progresso={progressoGeral} cor="#9333EA" />
      </div>

      {/* Cards grandes */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {metasGrandes.map((meta) => (
          <MetaCardGrande key={meta.id} meta={meta} onEditar={() => setEditando(meta)} />
        ))}
      </div>

      {/* Mini cards */}
      {metasMini.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {metasMini.map((meta) => (
            <MetaMiniCard key={meta.id} meta={meta} onEditar={() => setEditando(meta)} />
          ))}
        </div>
      )}

      {/* Modais */}
      {novaAberta && <ModalNovaMeta onFechar={() => setNovaAberta(false)} onSalvar={handleSalvarNova} />}
      {editando && <ModalEditarMeta meta={editando} onFechar={() => setEditando(null)} onSalvar={handleSalvarEdicao} />}
    </div>
  );
}