// ─── Union Types ────────────────────────────────────────────────────────────

export type Categoria = "receita" | "despesa";

export type StatusTransacao = "pendente" | "concluida" | "cancelada";

export type TipoCarteira = "corrente" | "poupanca" | "investimento" | "cartao";

export type TipoEvento = "vencimento" | "pagamento" | "recebimento" | "lembrete";

export type PermissaoMembro = "admin" | "editor" | "visualizador";

export type TipoNotificacao = "alerta" | "info" | "sucesso" | "erro";

// ─── Transação ───────────────────────────────────────────────────────────────

export interface Transacao {
  id: string;
  descricao: string;
  categoria: Categoria;
  valor: number;
  data: string; // ISO 8601: "2025-01-15"
  status: StatusTransacao;
  tags?: string[];
}

// ─── KPI ─────────────────────────────────────────────────────────────────────

export interface KPIData {
  titulo: string;
  valor: number;
  variacao: number; // percentual, ex: 12.5 = +12,5%
  positivo: boolean; // true = variação boa (verde), false = ruim (vermelho)
  prefixo?: string; // ex: "R$"
  sufixo?: string; // ex: "%"
}

// ─── Meta ────────────────────────────────────────────────────────────────────

export interface Meta {
  id: string;
  titulo: string;
  valorAtual: number;
  valorAlvo: number;
  prazo: string; // ISO 8601
  categoria: string;
  cor?: string; // hex, ex: "#9333EA"
}

// ─── Carteira ────────────────────────────────────────────────────────────────

export interface Carteira {
  id: string;
  nome: string;
  saldo: number;
  tipo: TipoCarteira;
  variacao: number; // percentual vs mês anterior
  cor?: string;
}

// ─── Evento ──────────────────────────────────────────────────────────────────

export interface Evento {
  id: string;
  titulo: string;
  data: string; // ISO 8601
  tipo: TipoEvento;
  valor?: number;
  descricao?: string;
}

// ─── Membro ──────────────────────────────────────────────────────────────────

export interface Membro {
  id: string;
  nome: string;
  cargo: string;
  avatar?: string; // URL ou undefined (usa iniciais)
  permissao: PermissaoMembro;
  email: string;
}

// ─── Notificação ─────────────────────────────────────────────────────────────

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: TipoNotificacao;
  lida: boolean;
  data: string; // ISO 8601
}

// ─── Gráfico ─────────────────────────────────────────────────────────────────

export interface DadoGrafico {
  mes: string; // ex: "Jan", "Fev"
  receita: number;
  despesa: number;
}

export interface DadoDonut {
  nome: string;
  valor: number;
  cor: string;
}

// ─── Tema ────────────────────────────────────────────────────────────────────

export type Tema = "dark" | "light";

export interface ThemeContextType {
  tema: Tema;
  toggleTema: () => void;
}