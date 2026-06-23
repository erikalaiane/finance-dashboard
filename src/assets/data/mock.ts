import type {
  Transacao,
  KPIData,
  Meta,
  Carteira,
  Evento,
  Membro,
  Notificacao,
  DadoGrafico,
  DadoDonut,
} from "../types/index";

// ─── KPIs ────────────────────────────────────────────────────────────────────

export const kpis: KPIData[] = [
  {
    titulo: "Receita Total",
    valor: 48750.0,
    variacao: 12.5,
    positivo: true,
    prefixo: "R$",
  },
  {
    titulo: "Despesas",
    valor: 21340.5,
    variacao: 3.2,
    positivo: false,
    prefixo: "R$",
  },
  {
    titulo: "Saldo Líquido",
    valor: 27409.5,
    variacao: 8.1,
    positivo: true,
    prefixo: "R$",
  },
  {
    titulo: "Meta do Mês",
    valor: 91,
    variacao: 4.0,
    positivo: true,
    sufixo: "%",
  },
];

// ─── Transações ──────────────────────────────────────────────────────────────

export const transacoes: Transacao[] = [
  {
    id: "t001",
    descricao: "Pagamento de cliente — Projeto Nexus",
    categoria: "receita",
    valor: 12500.0,
    data: "2025-01-20",
    status: "concluida",
    tags: ["cliente", "projeto"],
  },
  {
    id: "t002",
    descricao: "Assinatura Adobe Creative Cloud",
    categoria: "despesa",
    valor: 349.9,
    data: "2025-01-18",
    status: "concluida",
    tags: ["software", "assinatura"],
  },
  {
    id: "t003",
    descricao: "Consultoria mensal — Vexra Partners",
    categoria: "receita",
    valor: 8000.0,
    data: "2025-01-15",
    status: "concluida",
    tags: ["consultoria"],
  },
  {
    id: "t004",
    descricao: "Aluguel do escritório",
    categoria: "despesa",
    valor: 3200.0,
    data: "2025-01-10",
    status: "concluida",
    tags: ["fixo", "escritório"],
  },
  {
    id: "t005",
    descricao: "Pagamento freelancer — Design UI",
    categoria: "despesa",
    valor: 1800.0,
    data: "2025-01-08",
    status: "concluida",
    tags: ["freelancer", "design"],
  },
  {
    id: "t006",
    descricao: "Licença anual — Figma",
    categoria: "despesa",
    valor: 840.0,
    data: "2025-01-05",
    status: "pendente",
    tags: ["software", "design"],
  },
  {
    id: "t007",
    descricao: "Venda de curso online",
    categoria: "receita",
    valor: 4200.0,
    data: "2025-01-03",
    status: "concluida",
    tags: ["produto", "digital"],
  },
  {
    id: "t008",
    descricao: "Reembolso de despesa de viagem",
    categoria: "receita",
    valor: 620.5,
    data: "2024-12-28",
    status: "pendente",
    tags: ["viagem", "reembolso"],
  },
  {
    id: "t009",
    descricao: "Servidor cloud — AWS",
    categoria: "despesa",
    valor: 1250.0,
    data: "2024-12-25",
    status: "concluida",
    tags: ["infra", "cloud"],
  },
  {
    id: "t010",
    descricao: "Contrato rescindido — cliente antigo",
    categoria: "despesa",
    valor: 500.0,
    data: "2024-12-20",
    status: "cancelada",
    tags: ["contrato"],
  },
];

// ─── Gráfico receita x despesa ───────────────────────────────────────────────

export const dadosGrafico: DadoGrafico[] = [
  { mes: "Ago", receita: 32000, despesa: 18000 },
  { mes: "Set", receita: 38000, despesa: 21000 },
  { mes: "Out", receita: 35000, despesa: 19500 },
  { mes: "Nov", receita: 42000, despesa: 22000 },
  { mes: "Dez", receita: 39000, despesa: 20000 },
  { mes: "Jan", receita: 48750, despesa: 21340 },
];

// ─── Donut — distribuição por categoria ──────────────────────────────────────

export const dadosDonut: DadoDonut[] = [
  { nome: "Software", valor: 2189, cor: "#9333EA" },
  { nome: "Infraestrutura", valor: 1250, cor: "#C084FC" },
  { nome: "Pessoal", valor: 1800, cor: "#EC4899" },
  { nome: "Escritório", valor: 3200, cor: "#F87171" },
  { nome: "Outros", valor: 900, cor: "#6B6480" },
];

// ─── Metas ───────────────────────────────────────────────────────────────────

export const metas: Meta[] = [
  {
    id: "m001",
    titulo: "Reserva de emergência",
    valorAtual: 18000,
    valorAlvo: 30000,
    prazo: "2025-06-30",
    categoria: "poupança",
    cor: "#9333EA",
  },
  {
    id: "m002",
    titulo: "Novo equipamento",
    valorAtual: 4200,
    valorAlvo: 8000,
    prazo: "2025-03-31",
    categoria: "equipamento",
    cor: "#EC4899",
  },
  {
    id: "m003",
    titulo: "Viagem para a Europa",
    valorAtual: 9500,
    valorAlvo: 15000,
    prazo: "2025-12-01",
    categoria: "viagem",
    cor: "#C084FC",
  },
];

// ─── Carteiras ───────────────────────────────────────────────────────────────

export const carteiras: Carteira[] = [
  {
    id: "c001",
    nome: "Conta Principal",
    saldo: 27409.5,
    tipo: "corrente",
    variacao: 8.1,
    cor: "#9333EA",
  },
  {
    id: "c002",
    nome: "Poupança",
    saldo: 18000.0,
    tipo: "poupanca",
    variacao: 2.3,
    cor: "#34D399",
  },
  {
    id: "c003",
    nome: "Investimentos",
    saldo: 52300.0,
    tipo: "investimento",
    variacao: 5.7,
    cor: "#C084FC",
  },
  {
    id: "c004",
    nome: "Cartão Corporativo",
    saldo: -4320.0,
    tipo: "cartao",
    variacao: -12.4,
    cor: "#F87171",
  },
];

// ─── Eventos ─────────────────────────────────────────────────────────────────

export const eventos: Evento[] = [
  {
    id: "e001",
    titulo: "Vencimento fatura cartão",
    data: "2025-01-25",
    tipo: "vencimento",
    valor: 4320.0,
    descricao: "Fatura do cartão corporativo Vexra.",
  },
  {
    id: "e002",
    titulo: "Recebimento — cliente Nexus",
    data: "2025-01-28",
    tipo: "recebimento",
    valor: 12500.0,
  },
  {
    id: "e003",
    titulo: "Pagamento AWS",
    data: "2025-02-01",
    tipo: "pagamento",
    valor: 1250.0,
  },
  {
    id: "e004",
    titulo: "Reunião de revisão financeira",
    data: "2025-02-05",
    tipo: "lembrete",
    descricao: "Revisão trimestral com a equipe.",
  },
];

// ─── Equipe ──────────────────────────────────────────────────────────────────

export const membros: Membro[] = [
  {
    id: "mb001",
    nome: "Giulia Rossi",
    cargo: "Administradora",
    permissao: "admin",
    email: "giulia@vexradenaro.it",
  },
  {
    id: "mb002",
    nome: "Marco Ferretti",
    cargo: "Analista Financeiro",
    permissao: "editor",
    email: "marco@vexradenaro.it",
  },
  {
    id: "mb003",
    nome: "Sofia Esposito",
    cargo: "Contadora",
    permissao: "editor",
    email: "sofia@vexradenaro.it",
  },
  {
    id: "mb004",
    nome: "Luca Bianchi",
    cargo: "Visualizador",
    permissao: "visualizador",
    email: "luca@vexradenaro.it",
  },
];

// ─── Notificações ────────────────────────────────────────────────────────────

export const notificacoes: Notificacao[] = [
  {
    id: "n001",
    titulo: "Fatura próxima do vencimento",
    mensagem: "A fatura do cartão corporativo vence em 5 dias.",
    tipo: "alerta",
    lida: false,
    data: "2025-01-20",
  },
  {
    id: "n002",
    titulo: "Meta atingida!",
    mensagem: "Você atingiu 91% da meta do mês. Parabéns!",
    tipo: "sucesso",
    lida: false,
    data: "2025-01-19",
  },
  {
    id: "n003",
    titulo: "Nova transação registrada",
    mensagem: "Recebimento de R$ 12.500,00 — Projeto Nexus.",
    tipo: "info",
    lida: true,
    data: "2025-01-18",
  },
];