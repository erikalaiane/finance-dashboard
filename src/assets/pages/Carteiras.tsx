import { useState, useMemo } from "react";
import { carteiras } from "../data/mock";
import type { Carteira, TipoCarteira } from "../types/index";
import { Modal } from "../components/ui/Modal";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  BarChart2,
  CreditCard,
  ArrowUpDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatarValor(valor: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function gerarHistorico(saldoAtual: number) {
  return Array.from({ length: 6 }, (_, i) => ({
    mes: ["Ago", "Set", "Out", "Nov", "Dez", "Jan"][i],
    valor: Math.round(saldoAtual * (0.75 + Math.random() * 0.35)),
  })).concat([{ mes: "Jan", valor: saldoAtual }]).slice(0, 6);
}

const iconesPorTipo: Record<TipoCarteira, React.ReactNode> = {
  corrente: <Wallet size={18} color="white" />,
  poupanca: <PiggyBank size={18} color="white" />,
  investimento: <BarChart2 size={18} color="white" />,
  cartao: <CreditCard size={18} color="white" />,
};

const labelsPorTipo: Record<TipoCarteira, string> = {
  corrente: "Conta Corrente",
  poupanca: "Poupança",
  investimento: "Investimento",
  cartao: "Cartão de Crédito",
};

// ─── Sparkline tooltip ───────────────────────────────────────────────────────

function SparkTooltip({ active, payload }: { active?: boolean; payload?: { value: number }[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(30,26,43,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "6px 10px", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#F5F3F7" }}>
      R${formatarValor(payload[0].value)}
    </div>
  );
}

// ─── Modal Detalhes Carteira ─────────────────────────────────────────────────

function ModalCarteira({ carteira, onFechar }: { carteira: Carteira; onFechar: () => void }) {
  const historico = useMemo(() => gerarHistorico(carteira.saldo), [carteira.saldo]);
  const isNegativo = carteira.saldo < 0;
  const corSaldo = isNegativo ? "#F87171" : carteira.cor ?? "#C084FC";

  return (
    <Modal aberto titulo={carteira.nome} onFechar={onFechar} largura="460px">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Saldo destaque */}
        <div style={{ textAlign: "center", padding: "24px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "8px" }}>
            Saldo atual
          </p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", color: corSaldo, lineHeight: 1 }}>
            {isNegativo ? "-" : ""}R${formatarValor(Math.abs(carteira.saldo))}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "10px" }}>
            {carteira.variacao > 0 ? <TrendingUp size={13} color="#34D399" /> : <TrendingDown size={13} color="#F87171" />}
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: carteira.variacao > 0 ? "#34D399" : "#F87171" }}>
              {carteira.variacao > 0 ? "+" : ""}{carteira.variacao}% vs mês anterior
            </span>
          </div>
        </div>

        {/* Gráfico histórico */}
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "12px" }}>
            Evolução dos últimos 6 meses
          </p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={historico} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradModal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={corSaldo} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={corSaldo} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="valor" stroke={corSaldo} strokeWidth={2} fill="url(#gradModal)" />
              <Tooltip content={<SparkTooltip />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Infos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            { label: "Tipo", valor: labelsPorTipo[carteira.tipo] },
            { label: "Variação mensal", valor: `${carteira.variacao > 0 ? "+" : ""}${carteira.variacao}%` },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>{item.label}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#F5F3F7" }}>{item.valor}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

// ─── Card de Carteira ─────────────────────────────────────────────────────────

function CarteiraCard({ carteira, onClick }: { carteira: Carteira; onClick: () => void }) {
  const historico = useMemo(() => gerarHistorico(carteira.saldo), [carteira.saldo]);
  const isNegativo = carteira.saldo < 0;
  const cor = carteira.cor ?? "#C084FC";

  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(30, 26, 43, 0.6)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${cor}22`,
        borderRadius: "16px",
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = `1px solid ${cor}55`;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 32px ${cor}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = `1px solid ${cor}22`;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Glow de fundo */}
      <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: `${cor}18`, filter: "blur(20px)", pointerEvents: "none" }} />

      {/* Topo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `linear-gradient(135deg, ${cor}, ${cor}99)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {iconesPorTipo[carteira.tipo]}
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, color: cor, background: `${cor}18`, border: `1px solid ${cor}33`, borderRadius: "6px", padding: "2px 8px" }}>
          {labelsPorTipo[carteira.tipo]}
        </span>
      </div>

      {/* Nome */}
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#9D94B0", marginBottom: "6px" }}>
        {carteira.nome}
      </p>

      {/* Saldo */}
      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", color: isNegativo ? "#F87171" : "#F5F3F7", lineHeight: 1, marginBottom: "12px" }}>
        {isNegativo ? "-" : ""}R${formatarValor(Math.abs(carteira.saldo))}
      </p>

      {/* Sparkline */}
      <div style={{ height: "48px", marginBottom: "12px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historico} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${carteira.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={cor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={cor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="valor" stroke={cor} strokeWidth={1.5} fill={`url(#grad-${carteira.id})`} dot={false} />
            <Tooltip content={<SparkTooltip />} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Variação */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {carteira.variacao > 0 ? <TrendingUp size={12} color="#34D399" /> : <TrendingDown size={12} color="#F87171" />}
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: carteira.variacao > 0 ? "#34D399" : "#F87171" }}>
          {carteira.variacao > 0 ? "+" : ""}{carteira.variacao}%
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>vs mês anterior</span>
      </div>
    </div>
  );
}

// ─── Página ──────────────────────────────────────────────────────────────────

type Ordenacao = "maior" | "menor";
type FiltroTipo = TipoCarteira | "todas";

export function Carteiras() {
  const [filtro, setFiltro] = useState<FiltroTipo>("todas");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("maior");
  const [selecionada, setSelecionada] = useState<Carteira | null>(null);

  const filtradas = useMemo(() => {
    return carteiras
      .filter((c) => filtro === "todas" || c.tipo === filtro)
      .sort((a, b) => ordenacao === "maior" ? b.saldo - a.saldo : a.saldo - b.saldo);
  }, [filtro, ordenacao]);

  const totalGeral = carteiras.reduce((acc, c) => acc + c.saldo, 0);

  const pills: { label: string; valor: FiltroTipo }[] = [
    { label: "Todas", valor: "todas" },
    { label: "Corrente", valor: "corrente" },
    { label: "Poupança", valor: "poupanca" },
    { label: "Investimento", valor: "investimento" },
    { label: "Cartão", valor: "cartao" },
  ];

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
          <p style={labelStyle}>Gestão de contas</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", display: "inline-block", background: "linear-gradient(135deg, #F5F3F7 30%, #C084FC 70%, #EC4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
            Carteiras
          </h1>
        </div>

        {/* Ordenação */}
        <button
          onClick={() => setOrdenacao((o) => o === "maior" ? "menor" : "maior")}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "10px", background: "rgba(30, 26, 43, 0.6)", border: "1px solid rgba(255,255,255,0.07)", color: "#9D94B0", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
        >
          <ArrowUpDown size={14} />
          {ordenacao === "maior" ? "Maior saldo" : "Menor saldo"}
        </button>
      </div>

      {/* Total geral */}
      <div style={{ background: "rgba(30, 26, 43, 0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={labelStyle}>Patrimônio total</p>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", display: "inline-block", background: "linear-gradient(135deg, #C084FC, #EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
            R${formatarValor(totalGeral)}
          </p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          <div style={{ textAlign: "right" }}>
            <p style={labelStyle}>Contas</p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", color: "#F5F3F7" }}>{carteiras.length}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={labelStyle}>Positivas</p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", color: "#34D399" }}>{carteiras.filter((c) => c.saldo > 0).length}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={labelStyle}>Negativas</p>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", color: "#F87171" }}>{carteiras.filter((c) => c.saldo < 0).length}</p>
          </div>
        </div>
      </div>

      {/* Pills de filtro */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {pills.map((pill) => (
          <button
            key={pill.valor}
            onClick={() => setFiltro(pill.valor)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
              background: filtro === pill.valor ? "linear-gradient(135deg, #9333EA, #EC4899)" : "rgba(30, 26, 43, 0.6)",
              border: filtro === pill.valor ? "none" : "1px solid rgba(255,255,255,0.07)",
              color: filtro === pill.valor ? "white" : "#9D94B0",
            }}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Grid de cards */}
      {filtradas.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px", background: "rgba(30,26,43,0.6)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", color: "#6B6480", marginBottom: "8px" }}>Nenhuma carteira encontrada</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B6480" }}>Tente outro filtro.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {filtradas.map((c) => (
            <CarteiraCard key={c.id} carteira={c} onClick={() => setSelecionada(c)} />
          ))}
        </div>
      )}

      {/* Modal */}
      {selecionada && <ModalCarteira carteira={selecionada} onFechar={() => setSelecionada(null)} />}
    </div>
  );
}