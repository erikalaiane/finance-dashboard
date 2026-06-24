import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { dadosGrafico, dadosDonut } from "../data/mock";
import { Download, TrendingUp, TrendingDown, FileText, Sheet, File } from "lucide-react";
import { Modal } from "../components/ui/Modal";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatarValor(valor: number): string {
  if (valor >= 1000) return `R$${(valor / 1000).toFixed(0)}k`;
  return `R$${valor}`;
}

function formatarValorCompleto(valor: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

interface TooltipProps {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(30, 26, 43, 0.95)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", borderRadius: "12px", padding: "12px 16px", fontFamily: "'Inter', sans-serif" }}>
      <p style={{ color: "#6B6480", fontSize: "11px", marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: entry.color }} />
          <span style={{ color: "#9D94B0", fontSize: "12px" }}>{entry.name === "receita" ? "Receita" : "Despesa"}:</span>
          <span style={{ color: "#F5F3F7", fontSize: "12px", fontWeight: 600 }}>{formatarValor(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Dados ───────────────────────────────────────────────────────────────────

function filtrarPorPeriodo(periodo: string) {
  if (periodo === "3M") return dadosGrafico.slice(-3);
  if (periodo === "6M") return dadosGrafico.slice(-6);
  return dadosGrafico;
}

interface ResumoItem {
  categoria: string;
  total: number;
  tipo: string;
  variacao: number;
}

const resumoCategoria: ResumoItem[] = [
  { categoria: "Software", total: 2189, tipo: "despesa", variacao: 5.2 },
  { categoria: "Infraestrutura", total: 1250, tipo: "despesa", variacao: -2.1 },
  { categoria: "Pessoal", total: 1800, tipo: "despesa", variacao: 0 },
  { categoria: "Escritório", total: 3200, tipo: "despesa", variacao: 3.8 },
  { categoria: "Consultoria", total: 8000, tipo: "receita", variacao: 12.5 },
  { categoria: "Produto digital", total: 4200, tipo: "receita", variacao: 8.1 },
  { categoria: "Projeto cliente", total: 12500, tipo: "receita", variacao: 20.0 },
];

// ─── Modal Exportar ──────────────────────────────────────────────────────────

function ModalExportar({ onFechar }: { onFechar: () => void }) {
  const [exportando, setExportando] = useState<string | null>(null);

  const handleExportar = (tipo: string) => {
    setExportando(tipo);
    setTimeout(() => {
      setExportando(null);
      onFechar();
    }, 1500);
  };

  const opcoes = [
    { tipo: "PDF", icone: <File size={20} color="#F87171" />, desc: "Relatório formatado para impressão", cor: "#F87171" },
    { tipo: "CSV", icone: <Sheet size={20} color="#34D399" />, desc: "Dados brutos para planilhas", cor: "#34D399" },
    { tipo: "Excel", icone: <FileText size={20} color="#C084FC" />, desc: "Relatório completo com gráficos", cor: "#C084FC" },
  ];

  return (
    <Modal aberto titulo="Exportar Relatório" onFechar={onFechar} largura="420px">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9D94B0", marginBottom: "8px" }}>
          Escolha o formato de exportação:
        </p>
        {opcoes.map((op) => (
          <button
            key={op.tipo}
            onClick={() => handleExportar(op.tipo)}
            disabled={!!exportando}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              borderRadius: "12px",
              background: exportando === op.tipo ? `rgba(${op.cor === "#F87171" ? "248,113,113" : op.cor === "#34D399" ? "52,211,153" : "192,132,252"},0.15)` : "rgba(255,255,255,0.04)",
              border: `1px solid ${exportando === op.tipo ? op.cor + "44" : "rgba(255,255,255,0.07)"}`,
              cursor: exportando ? "not-allowed" : "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => { if (!exportando) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
            onMouseLeave={(e) => { if (!exportando) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          >
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `rgba(${op.cor === "#F87171" ? "248,113,113" : op.cor === "#34D399" ? "52,211,153" : "192,132,252"},0.1)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {op.icone}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#F5F3F7", marginBottom: "2px" }}>
                {exportando === op.tipo ? "Exportando..." : op.tipo}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>{op.desc}</p>
            </div>
            {exportando === op.tipo && (
              <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: `2px solid ${op.cor}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
}

// ─── Modal Detalhes Categoria ────────────────────────────────────────────────

function ModalCategoria({ item, onFechar }: { item: ResumoItem; onFechar: () => void }) {
  const isReceita = item.tipo === "receita";
  const cor = isReceita ? "#34D399" : "#F87171";

  const historico = dadosGrafico.map((d) => ({
    mes: d.mes,
    valor: isReceita ? Math.round(d.receita * (item.total / 24700)) : Math.round(d.despesa * (item.total / 8239)),
  }));

  return (
    <Modal aberto titulo={item.categoria} onFechar={onFechar} largura="480px">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Destaque */}
        <div style={{ textAlign: "center", padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "6px" }}>
            Total no período
          </p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "42px", color: cor, lineHeight: 1 }}>
            R${formatarValorCompleto(item.total)}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "8px" }}>
            {item.variacao > 0 ? <TrendingUp size={13} color="#34D399" /> : item.variacao < 0 ? <TrendingDown size={13} color="#F87171" /> : null}
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: item.variacao > 0 ? "#34D399" : item.variacao < 0 ? "#F87171" : "#6B6480" }}>
              {item.variacao > 0 ? "+" : ""}{item.variacao}% vs período anterior
            </span>
          </div>
        </div>

        {/* Mini gráfico */}
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "12px" }}>
            Histórico
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={historico} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradCat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={cor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={cor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="mes" tick={{ fill: "#6B6480", fontSize: 10, fontFamily: "'Inter', sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatarValor} tick={{ fill: "#6B6480", fontSize: 10, fontFamily: "'Inter', sans-serif" }} axisLine={false} tickLine={false} />
              <Area type="monotone" dataKey="valor" stroke={cor} strokeWidth={2} fill="url(#gradCat)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Info */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>Tipo</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: cor }}>{isReceita ? "Receita" : "Despesa"}</span>
        </div>
      </div>
    </Modal>
  );
}

// ─── Página ──────────────────────────────────────────────────────────────────

export function Relatorios() {
  const [periodo, setPeriodo] = useState("1A");
  const [exportarAberto, setExportarAberto] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<ResumoItem | null>(null);

  const dados = filtrarPorPeriodo(periodo);
  const totalReceita = resumoCategoria.filter((r) => r.tipo === "receita").reduce((acc, r) => acc + r.total, 0);
  const totalDespesa = resumoCategoria.filter((r) => r.tipo === "despesa").reduce((acc, r) => acc + r.total, 0);

  const cardStyle = {
    background: "rgba(30, 26, 43, 0.6)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "24px",
  };

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
          <p style={labelStyle}>Análise financeira</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", display: "inline-block", background: "linear-gradient(135deg, #F5F3F7 30%, #C084FC 70%, #EC4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
            Relatórios
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} style={{ background: "rgba(30, 26, 43, 0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "10px 16px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#F5F3F7", outline: "none", cursor: "pointer" }}>
            <option value="3M">Últimos 3 meses</option>
            <option value="6M">Últimos 6 meses</option>
            <option value="1A">Último ano</option>
          </select>
          <button onClick={() => setExportarAberto(true)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "10px", background: "rgba(30, 26, 43, 0.6)", border: "1px solid rgba(255,255,255,0.07)", color: "#C084FC", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
            <Download size={14} />
            Exportar
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
        {[
          { titulo: "Total Recebido", valor: totalReceita, cor: "#34D399", variacao: 12.5, positivo: true },
          { titulo: "Total Gasto", valor: totalDespesa, cor: "#F87171", variacao: 3.2, positivo: false },
          { titulo: "Lucro Líquido", valor: totalReceita - totalDespesa, cor: "#C084FC", variacao: 8.1, positivo: true },
        ].map((item) => (
          <div key={item.titulo} style={cardStyle}>
            <p style={labelStyle}>{item.titulo}</p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "32px", color: item.cor, lineHeight: 1, marginBottom: "8px" }}>
              R${formatarValorCompleto(item.valor)}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {item.positivo ? <TrendingUp size={12} color="#34D399" /> : <TrendingDown size={12} color="#F87171" />}
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: item.positivo ? "#34D399" : "#F87171" }}>
                {item.positivo ? "+" : ""}{item.variacao}%
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>vs período anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
        <div style={cardStyle}>
          <p style={labelStyle}>Evolução</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#F5F3F7", letterSpacing: "1px", marginBottom: "16px" }}>Receita x Despesa</h2>
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            {[{ cor: "#C084FC", label: "Receita" }, { cor: "#F87171", label: "Despesa" }].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.cor }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9D94B0" }}>{l.label}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={dados} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C084FC" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C084FC" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradD" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F87171" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F87171" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="mes" tick={{ fill: "#6B6480", fontSize: 11, fontFamily: "'Inter', sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatarValor} tick={{ fill: "#6B6480", fontSize: 11, fontFamily: "'Inter', sans-serif" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="receita" stroke="#C084FC" strokeWidth={2} fill="url(#gradR)" />
              <Area type="monotone" dataKey="despesa" stroke="#F87171" strokeWidth={2} fill="url(#gradD)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <p style={labelStyle}>Distribuição</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#F5F3F7", letterSpacing: "1px", marginBottom: "12px" }}>Por Categoria</h2>
          <div style={{ position: "relative", flex: 1, minHeight: "140px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dadosDonut} cx="50%" cy="50%" innerRadius="50%" outerRadius="75%" dataKey="valor" strokeWidth={0}>
                  {dadosDonut.map((entry, i) => <Cell key={i} fill={entry.cor} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", background: "linear-gradient(135deg, #C084FC, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
                R${(dadosDonut.reduce((a, d) => a + d.valor, 0) / 1000).toFixed(1)}k
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "12px" }}>
            {dadosDonut.map((item) => (
              <div key={item.nome} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.cor }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9D94B0" }}>{item.nome}</span>
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#F5F3F7" }}>R${item.valor.toLocaleString("pt-BR")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barras */}
      <div style={cardStyle}>
        <p style={labelStyle}>Comparativo</p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#F5F3F7", letterSpacing: "1px", marginBottom: "20px" }}>Receita x Despesa por Mês</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={dados} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="mes" tick={{ fill: "#6B6480", fontSize: 11, fontFamily: "'Inter', sans-serif" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatarValor} tick={{ fill: "#6B6480", fontSize: 11, fontFamily: "'Inter', sans-serif" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="receita" fill="#C084FC" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="despesa" fill="#F87171" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela resumo — clicável */}
      <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={labelStyle}>Detalhamento</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: "#F5F3F7", letterSpacing: "1px" }}>Resumo por Categoria</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480", marginTop: "4px" }}>Clique em uma linha para ver detalhes</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "12px", padding: "10px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {["Categoria", "Tipo", "Variação", "Total"].map((col) => (
            <span key={col} style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B6480" }}>{col}</span>
          ))}
        </div>
        {resumoCategoria.map((item, i) => (
          <div
            key={item.categoria}
            onClick={() => setCategoriaSelecionada(item)}
            style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", alignItems: "center", gap: "12px", padding: "12px 24px", borderBottom: i < resumoCategoria.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", transition: "background 0.15s", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#F5F3F7" }}>{item.categoria}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, color: item.tipo === "receita" ? "#34D399" : "#F87171", background: item.tipo === "receita" ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)", border: `1px solid ${item.tipo === "receita" ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`, borderRadius: "6px", padding: "2px 8px" }}>
              {item.tipo === "receita" ? "Receita" : "Despesa"}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {item.variacao > 0 ? <TrendingUp size={12} color="#34D399" /> : item.variacao < 0 ? <TrendingDown size={12} color="#F87171" /> : null}
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: item.variacao > 0 ? "#34D399" : item.variacao < 0 ? "#F87171" : "#6B6480" }}>
                {item.variacao > 0 ? "+" : ""}{item.variacao}%
              </span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: item.tipo === "receita" ? "#34D399" : "#F87171" }}>
              R${formatarValorCompleto(item.total)}
            </span>
          </div>
        ))}
      </div>

      {/* Modais */}
      {exportarAberto && <ModalExportar onFechar={() => setExportarAberto(false)} />}
      {categoriaSelecionada && <ModalCategoria item={categoriaSelecionada} onFechar={() => setCategoriaSelecionada(null)} />}
    </div>
  );
}
