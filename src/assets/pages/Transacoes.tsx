import { useState, useMemo } from "react";
import { transacoes } from "../data/mock";
import type { Transacao, Categoria, StatusTransacao } from "../types/index";
import { Modal } from "../components/ui/Modal";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Badge ───────────────────────────────────────────────────────────────────

function Badge({ status }: { status: Transacao["status"] }) {
  const config = {
    concluida: { label: "Concluída", color: "#34D399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)" },
    pendente: { label: "Pendente", color: "#C084FC", bg: "rgba(192,132,252,0.1)", border: "rgba(192,132,252,0.2)" },
    cancelada: { label: "Cancelada", color: "#F87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" },
  }[status];

  return (
    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, color: config.color, background: config.bg, border: `1px solid ${config.border}`, borderRadius: "6px", padding: "3px 10px", whiteSpace: "nowrap" }}>
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
  return new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── Modal Detalhes ──────────────────────────────────────────────────────────

function ModalDetalhes({ transacao, onFechar }: { transacao: Transacao; onFechar: () => void }) {
  const isReceita = transacao.categoria === "receita";

  return (
    <Modal aberto titulo="Detalhes da Transação" onFechar={onFechar}>
      {/* Valor destaque */}
      <div style={{ textAlign: "center", marginBottom: "24px", padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "8px" }}>
          {isReceita ? "Valor Recebido" : "Valor Pago"}
        </p>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "48px", color: isReceita ? "#34D399" : "#F87171", lineHeight: 1 }}>
          {isReceita ? "+" : "-"}R${formatarValor(transacao.valor)}
        </p>
      </div>

      {/* Infos */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {[
          { label: "Descrição", valor: transacao.descricao },
          { label: "Data", valor: formatarData(transacao.data) },
          { label: "Categoria", valor: isReceita ? "Receita" : "Despesa" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>{item.label}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#F5F3F7" }}>{item.valor}</span>
          </div>
        ))}

        {/* Status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>Status</span>
          <Badge status={transacao.status} />
        </div>

        {/* Tags */}
        {transacao.tags && transacao.tags.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>Tags</span>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
              {transacao.tags.map((tag) => <Tag key={tag} label={tag} />)}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ─── Modal Nova Transação ────────────────────────────────────────────────────

function ModalNovaTransacao({ onFechar }: { onFechar: () => void }) {
  const [form, setForm] = useState({
    descricao: "",
    categoria: "receita" as Categoria,
    valor: "",
    data: new Date().toISOString().split("T")[0],
    status: "pendente" as StatusTransacao,
    tags: "",
  });

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

  return (
    <Modal aberto titulo="Nova Transação" onFechar={onFechar}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        <div>
          <label style={labelStyle}>Descrição</label>
          <input style={inputStyle} placeholder="Ex: Pagamento de cliente" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Categoria</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value as Categoria })}>
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as StatusTransacao })}>
              <option value="pendente">Pendente</option>
              <option value="concluida">Concluída</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Valor (R$)</label>
            <input style={inputStyle} type="number" placeholder="0,00" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} />
          </div>
          <div>
            <label style={labelStyle}>Data</label>
            <input style={inputStyle} type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Tags (separadas por vírgula)</label>
          <input style={inputStyle} placeholder="Ex: cliente, projeto, mensal" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        </div>

        {/* Botões */}
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <button
            onClick={onFechar}
            style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9D94B0", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
          >
            Cancelar
          </button>
          <button
            onClick={onFechar}
            style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "linear-gradient(135deg, #9333EA, #EC4899)", border: "none", color: "white", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
          >
            Salvar transação
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Página principal ────────────────────────────────────────────────────────

const POR_PAGINA = 7;

export function Transacoes() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "todas">("todas");
  const [status, setStatus] = useState<StatusTransacao | "todos">("todos");
  const [pagina, setPagina] = useState(1);
  const [selecionada, setSelecionada] = useState<Transacao | null>(null);
  const [novaAberta, setNovaAberta] = useState(false);

  const filtradas = useMemo(() => {
    return transacoes.filter((t) => {
      const buscaOk = t.descricao.toLowerCase().includes(busca.toLowerCase()) || t.tags?.some((tag) => tag.toLowerCase().includes(busca.toLowerCase()));
      const categoriaOk = categoria === "todas" || t.categoria === categoria;
      const statusOk = status === "todos" || t.status === status;
      return buscaOk && categoriaOk && statusOk;
    });
  }, [busca, categoria, status]);

  const totalPaginas = Math.ceil(filtradas.length / POR_PAGINA);
  const paginadas = filtradas.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const selectStyle = {
    background: "rgba(30, 26, 43, 0.6)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "10px",
    padding: "10px 14px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    color: "#F5F3F7",
    outline: "none",
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "8px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "4px" }}>
            Histórico completo
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", letterSpacing: "1px", display: "inline-block", background: "linear-gradient(135deg, #F5F3F7 30%, #C084FC 70%, #EC4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
            Transações
          </h1>
        </div>
        <button
          onClick={() => setNovaAberta(true)}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "12px", background: "linear-gradient(135deg, #9333EA, #EC4899)", border: "none", color: "white", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
        >
          <Plus size={16} />
          Nova transação
        </button>
      </div>

      {/* Filtros */}
      <div
        style={{
          background: "rgba(30, 26, 43, 0.6)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Filter size={14} color="#6B6480" />

        {/* Busca */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "8px 14px" }}>
          <Search size={14} color="#6B6480" />
          <input
            type="text"
            placeholder="Buscar por descrição ou tag..."
            value={busca}
            onChange={(e) => { setBusca(e.target.value); setPagina(1); }}
            style={{ background: "transparent", border: "none", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#F5F3F7", width: "100%" }}
          />
        </div>

        {/* Categoria */}
        <select style={selectStyle} value={categoria} onChange={(e) => { setCategoria(e.target.value as Categoria | "todas"); setPagina(1); }}>
          <option value="todas">Todas categorias</option>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>

        {/* Status */}
        <select style={selectStyle} value={status} onChange={(e) => { setStatus(e.target.value as StatusTransacao | "todos"); setPagina(1); }}>
          <option value="todos">Todos status</option>
          <option value="concluida">Concluída</option>
          <option value="pendente">Pendente</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      {/* Tabela */}
      <div
        style={{
          background: "rgba(30, 26, 43, 0.6)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {/* Cabeçalho tabela */}
        <div style={{ display: "grid", gridTemplateColumns: "32px 1fr auto auto auto", gap: "12px", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {["", "Descrição", "Data", "Status", "Valor"].map((col) => (
            <span key={col} style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B6480" }}>
              {col}
            </span>
          ))}
        </div>

        {/* Linhas */}
        {paginadas.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", color: "#6B6480", marginBottom: "8px" }}>Nenhuma transação encontrada</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B6480" }}>Tente ajustar os filtros.</p>
          </div>
        ) : (
          paginadas.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setSelecionada(t)}
              style={{
                display: "grid",
                gridTemplateColumns: "32px 1fr auto auto auto",
                alignItems: "center",
                gap: "12px",
                padding: "14px 20px",
                cursor: "pointer",
                transition: "background 0.15s ease",
                borderBottom: i < paginadas.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
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
                <div style={{ display: "flex", gap: "6px", marginTop: "3px", flexWrap: "wrap" }}>
                  {t.tags?.map((tag) => <Tag key={tag} label={tag} />)}
                </div>
              </div>

              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9D94B0", whiteSpace: "nowrap" }}>
                {formatarData(t.data)}
              </span>

              <Badge status={t.status} />

              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: t.categoria === "receita" ? "#34D399" : "#F87171", whiteSpace: "nowrap" }}>
                {t.categoria === "receita" ? "+" : "-"}R${formatarValor(t.valor)}
              </span>
            </div>
          ))
        )}

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B6480" }}>
              {filtradas.length} transações · página {pagina} de {totalPaginas}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                disabled={pagina === 1}
                style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: pagina === 1 ? "not-allowed" : "pointer", opacity: pagina === 1 ? 0.4 : 1 }}
              >
                <ChevronLeft size={14} color="#9D94B0" />
              </button>
              <button
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
                style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: pagina === totalPaginas ? "not-allowed" : "pointer", opacity: pagina === totalPaginas ? 0.4 : 1 }}
              >
                <ChevronRight size={14} color="#9D94B0" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modais */}
      {selecionada && <ModalDetalhes transacao={selecionada} onFechar={() => setSelecionada(null)} />}
      {novaAberta && <ModalNovaTransacao onFechar={() => setNovaAberta(false)} />}
    </div>
  );
}