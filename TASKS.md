# 📋 Tarefas de Desenvolvimento — Vexra Denaro

> Projeto pessoal de portfólio — React + TypeScript + Tailwind + Recharts

> **Identidade:** Vexra Denaro · *Soluzioni Finanziarie* — fintech fictício com estética dark, glassmorphism e tipografia editorial

> Objetivo: aprender TypeScript na prática enquanto constrói um dashboard financeiro completo

---

## ⚙️ Setup & Configuração

- [✅] Criar projeto com Vite (`npm create vite@latest finance-dashboard -- --template react-ts`)
- [✅] Instalar e configurar Tailwind CSS v4 (`@tailwindcss/vite` + `@import "tailwindcss"`)
- [✅] Remover boilerplate padrão do Vite/React (App.tsx, App.css, assets)
- [✅] Estrutura de pastas (components, pages, types, data, context)
- [✅] Instalar Recharts
- [ ] Instalar Framer Motion
- [✅] Instalar React Router DOM
- [✅] Subir repositório no GitHub
- [ ] Configurar deploy contínuo (Vercel)

---

## 🗺️ Arquitetura de Páginas & Modais

### Rotas principais
- [✅] **A01:** Instalar `react-router-dom`
- [✅] **A02:** Criar rotas completas (ver lista abaixo)
- [🟨] **A03:** Criar layout compartilhado (`RootLayout`) com Sidebar + Navbar + área de conteúdo
- [✅] **A04:** Criar componente `Sidebar` com seções: Core, Extras, Institucional, Sistema
- [✅] **A05:** Criar componente `Navbar` (topbar com busca, notificações, avatar)

### Páginas — Core (dados mockados, completas)
- [✅] **P-C01:** `/` — Dashboard (home do app: KPIs, gráfico, tabela resumo, painel lateral)
- [ ] **P-C02:** `/transacoes` — Tabela completa com filtros, paginação e modais
- [ ] **P-C03:** `/relatorios` — Gráficos por período, comparativo, exportação mockada
- [ ] **P-C04:** `/carteiras` — Cards de contas/ativos separados com saldos

### Páginas — Extras (interativas, podem evoluir)
- [ ] **P-E01:** `/metas` — Progress bars animadas, cards de objetivo financeiro
- [ ] **P-E02:** `/eventos` — Calendário de vencimentos e pagamentos futuros
- [ ] **P-E03:** `/notificacoes` — Central de alertas e avisos
- [ ] **P-E04:** `/equipe` — Membros com acesso e permissões (estático mas visual)

### Páginas — Institucional (estáticas, identidade da marca)
- [ ] **P-I01:** `/sobre` — Missão, história fictícia, valores do Vexra Denaro
- [ ] **P-I02:** `/planos` — Pricing page com tiers (Free, Pro, Enterprise)
- [ ] **P-I03:** `/contato` — Formulário de contato com campos tipados

### Páginas — Sistema
- [ ] **P-S01:** `/configuracoes` — Perfil, tema claro/escuro, preferências

### Modais
- [ ] **M01:** Criar componente `Modal` reutilizável (overlay, fecha com ESC/clique fora)
- [ ] **M02:** Criar `ModalContext` (controla qual modal está aberto globalmente)
- [ ] **M03:** Modal "Detalhes da transação"
- [ ] **M04:** Modal "Nova transação" com formulário tipado
- [ ] **M05:** Modal "Nova meta"

---

## 🧩 Tipagem & Modelagem de Dados (TS)

- [✅] **T01:** Criar `interface Transacao` (id, data, categoria, valor, descricao, status)
- [✅] **T02:** Criar union types: `categoria: 'receita' | 'despesa'`, `status: 'pendente' | 'concluida' | 'cancelada'`
- [✅] **T03:** Criar `interface KPIData` (titulo, valor, variacao, icone)
- [✅] **T04:** Criar `interface Meta` (id, titulo, valorAtual, valorAlvo, prazo, categoria)
- [✅] **T05:** Criar `interface Carteira` (id, nome, saldo, tipo, variacao)
- [✅] **T06:** Criar `interface Evento` (id, titulo, data, tipo, valor)
- [✅] **T07:** Criar `interface Membro` (id, nome, cargo, avatar, permissao)
- [✅] **T08:** Criar `interface Notificacao` (id, titulo, mensagem, tipo, lida, data)
- [✅] **T09:** Criar tipo do contexto de tema (`ThemeContextType`)
- [✅] **T10:** Tipar dados mockados em `data/mock.ts`

---

## 🎨 Componentes Compartilhados

### KPICard
- [✅] **C01:** Props tipadas com `interface KPICardProps`
- [✅] **C02:** Indicador de variação (alta/baixa) com cor condicional
- [✅] **C03:** Ícone de seta (alta ↑ / baixa ↓)
- [ ] **C04:** Animação de entrada com Framer Motion

### Gráficos (Recharts)
- [✅] **G01:** Gráfico de receita x despesa por período (LineChart + AreaChart)
- [✅] **G02:** Tooltip customizado com glassmorphism
- [ ] **G03:** Cores do gráfico reagindo ao tema dark/light
- [✅] **G04:** Tipar o retorno de dados que alimenta os gráficos
- [✅] **G05:** Gráfico de pizza/donut para distribuição por categoria

### Tabela de Transações
- [✅] **TB01:** Renderizar lista de transações com tipagem
- [ ] **TB02:** Campo de filtro por texto
- [ ] **TB03:** Filtro por categoria (receita/despesa) e status
- [ ] **TB04:** Paginação
- [ ] **TB05:** Empty state (quando filtro não retorna nada)
- [ ] **TB06:** Linha clicável → abre modal de detalhes

### Toggle de Tema
- [ ] **TH01:** `createContext<ThemeContextType | undefined>`
- [ ] **TH02:** Botão de alternância claro/escuro na Navbar
- [ ] **TH03:** Persistência da escolha (localStorage)

### Outros componentes reutilizáveis
- [✅] **CR01:** `Badge` (status de transação com cores)
- [✅] **CR02:** `ProgressBar` animada (para Metas)
- [ ] **CR03:** `Avatar` com iniciais fallback
- [ ] **CR04:** `EmptyState` genérico reutilizável
- [ ] **CR05:** `Skeleton` loading para cards e tabela

---

## 🖼️ Layout & Responsividade

- [ ] **L01:** Grid de KPIs responsivo (4 colunas → 2 → 1)
- [ ] **L02:** Sidebar recolhível no mobile (drawer/overlay)
- [ ] **L03:** Adaptar tabela para mobile (scroll horizontal ou card view)
- [ ] **L04:** Navbar responsiva
- [ ] **L05:** Espaçamento e tipografia editorial consistentes (Vexra brand)

---

## 🎭 Identidade Visual (Vexra Denaro)

- [🟨] **V01:** Definir tokens de cor no Tailwind (roxo, navy, glassmorphism)
- [ ] **V02:** Configurar fontes (tipografia editorial — ex: Bebas Neue + Inter)
- [✅] **V03:** Criar classes utilitárias para glassmorphism (`glass-card`)
- [✅] **V04:** Logo/wordmark do Vexra na Sidebar
- [ ] **V05:** Favicon personalizado

---

## ✨ Polish & Finalização

- [ ] **PL01:** Loading states com Skeleton
- [ ] **PL02:** Transição suave entre tema claro/escuro
- [ ] **PL03:** Animações de entrada nas páginas (Framer Motion)
- [ ] **PL04:** Revisão geral de responsividade
- [ ] **PL05:** README do projeto com screenshots e GIF demo
- [ ] **PL06:** Deploy final na Vercel
- [ ] **PL07:** Lighthouse score (Performance, Acessibilidade, SEO) — print pra README

---

## 🚀 Status Geral

| Módulo                        | Status |
| ----------------------------- | :----: |
| Setup & Configuração          |   🟨   |
| Arquitetura (Rotas/Layout)    |   🟨   |
| Páginas Core                  |   ⬜   |
| Páginas Extras                |   ⬜   |
| Páginas Institucionais        |   ⬜   |
| Tipagem & Dados (TS)          |   ✅   |
| Componentes Compartilhados    |   🟨   |
| Identidade Visual             |   ⬜   |
| Layout & Responsividade       |   ⬜   |
| Polish & Deploy               |   ⬜   |

---

**Legenda:**
- ⬜ = Não iniciado
- 🟨 = Em progresso
- ✅ = Concluído

---

> **Ordem sugerida de desenvolvimento:**
> 1. Setup restante → Identidade Visual (tokens, fontes) → RootLayout (Sidebar + Navbar)
> 2. Dashboard (página `/`) completo → Transações → Relatórios
> 3. Carteiras → Metas → Eventos
> 4. Páginas institucionais (Sobre, Planos, Contato)
> 5. Polish, responsividade, README e deploy