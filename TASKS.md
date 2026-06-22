# 📋 Tarefas de Desenvolvimento - Finance Dashboard

> Projeto pessoal de portfólio — React + TypeScript + Tailwind + Recharts
> Objetivo: aprender TypeScript na prática enquanto constrói um dashboard financeiro completo

---

## ⚙️ Setup & Configuração

- [ ] Criar projeto com Vite (`npm create vite@latest finance-dashboard -- --template react-ts`)
- [ ] Instalar e configurar Tailwind CSS
- [ ] Instalar Recharts
- [ ] Criar estrutura de pastas
  - [ ] `components/`
  - [ ] `types/`
  - [ ] `hooks/`
  - [ ] `data/`
  - [ ] `utils/`
- [ ] Subir repositório no GitHub
- [ ] Configurar deploy contínuo (Vercel)

---

## 🧩 Tipagem & Modelagem de Dados (TS)

- [ ] **T01:** Criar `interface Transacao` (id, data, categoria, valor, descrição)
- [ ] **T02:** Criar union type `categoria: 'receita' | 'despesa'`
- [ ] **T03:** Criar `interface KPIData` (título, valor, variação)
- [ ] **T04:** Criar tipo do contexto de tema (`ThemeContextType`)
- [ ] **T05:** Tipar dados mockados em `data/transacoes.ts`

---

## 🔌 Camada de Dados (Hooks)

- [ ] **D01:** Criar `useTransactions()` → retorna `Transacao[]`
- [ ] **D02:** Criar `useKPIs()` → calcula totais e variação "vs mês anterior"
- [ ] **D03:** Criar `useTheme()` → consome o contexto de tema

---

## 🎨 Componentes

### KPICard
- [ ] **C01:** Props tipadas com `interface KPICardProps`
- [ ] **C02:** Indicador de variação (alta/baixa) com cor condicional
- [ ] **C03:** Ícone de seta (alta ↑ / baixa ↓)
- [ ] **C04:** Animação de entrada (Framer Motion — opcional)

### Gráficos (Recharts)
- [ ] **G01:** Gráfico de receita x despesa por período (Line ou BarChart)
- [ ] **G02:** Tooltip customizado
- [ ] **G03:** Cores do gráfico reagindo ao tema dark/light
- [ ] **G04:** Tipar o retorno de dados que alimenta o gráfico

### Tabela de Transações
- [ ] **TB01:** Renderizar lista de transações
- [ ] **TB02:** Campo de filtro por texto (evento tipado: `React.ChangeEvent<HTMLInputElement>`)
- [ ] **TB03:** Filtro por categoria (receita/despesa)
- [ ] **TB04:** Paginação
- [ ] **TB05:** Empty state (quando filtro não retorna nada)

### Toggle de Tema
- [ ] **TH01:** `createContext<ThemeContextType | undefined>`
- [ ] **TH02:** Botão de alternância claro/escuro
- [ ] **TH03:** Persistência da escolha (localStorage)

---

## 🖼️ Layout & Responsividade

- [ ] **L01:** Grid de KPIs responsivo (4 colunas → 2 → 1)
- [ ] **L02:** Adaptar tabela para mobile (cards em vez de linhas, se necessário)
- [ ] **L03:** Header com saudação/título do dashboard
- [ ] **L04:** Espaçamento e tipografia editorial consistentes com seu estilo visual

---

## ✨ Polish & Finalização

- [ ] **P01:** Loading states (skeleton ou spinner)
- [ ] **P02:** Transição suave entre tema claro/escuro
- [ ] **P03:** Revisão geral de responsividade (mobile/tablet/desktop)
- [ ] **P04:** README do projeto (stack, prints, link do deploy)
- [ ] **P05:** Deploy final na Vercel

---

## 🚀 Status Geral

| Módulo                  | Status        |
| ------------------------ | :------------: |
| Setup & Configuração     | ⬜ |
| Tipagem & Dados (TS)      | ⬜ |
| Hooks                     | ⬜ |
| KPICard                   | ⬜ |
| Gráficos                  | ⬜ |
| Tabela de Transações      | ⬜ |
| Toggle de Tema            | ⬜ |
| Layout & Responsividade   | ⬜ |
| Polish & Deploy           | ⬜ |

---

**Legenda:**
- ⬜ = Não iniciado
- 🟨 = Em progresso
- ✅ = Concluído