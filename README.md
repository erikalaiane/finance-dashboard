# Vexra Denaro · Soluzioni Finanziarie

> Dashboard financeiro fictício construído como projeto de portfólio e estudo de TypeScript aplicado ao React.

**Vexra Denaro** é uma fintech imaginária com estética dark, glassmorphism e tipografia editorial — o pretexto perfeito pra aprender TypeScript na prática enquanto constrói algo que parece real.

> 🚧 Em desenvolvimento

---

## ✨ Funcionalidades (planejadas)

- KPIs com variação vs. mês anterior
- Gráfico de receita/despesa por período (LineChart + AreaChart)
- Gráfico de distribuição por categoria (Donut)
- Tabela de transações com filtro, paginação e modal de detalhes
- Carteiras e metas financeiras com progress bars animadas
- Calendário de eventos e vencimentos
- Tema claro/escuro com persistência
- Animações de entrada com Framer Motion

---

## 🛠️ Stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- Recharts
- Framer Motion
- React Router DOM

---

## 🚀 Como rodar localmente

```bash
git clone https://github.com/seu-usuario/finance-dashboard.git
cd finance-dashboard
npm install
npm run dev
```

---

## 📁 Estrutura

```
src/
├── components/
│   ├── layout/       # Sidebar, Navbar, RootLayout
│   ├── ui/           # Badge, Avatar, ProgressBar, Skeleton, EmptyState
│   └── dashboard/    # KPICard, RevenueChart
├── pages/            # Uma página por rota
├── types/            # Todas as interfaces TypeScript
├── data/             # Dados mockados
└── context/          # ThemeContext, ModalContext
```

---

## 📋 Tarefas

Acompanhamento do progresso em [TASKS.md](./TASKS.md).

---

## 📄 Licença

Projeto pessoal, livre para fins de estudo.