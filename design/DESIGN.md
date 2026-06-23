# Design System — Vexra Denaro · Soluzioni Finanziarie

> Tokens definitivos de cor, tipografia, glassmorphism e animação para o dashboard.

---

## Fontes

Adicione no `src/index.css` (já feito se você seguiu o setup):

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap');
```

| Papel | Família | Peso | Uso |
|---|---|---|---|
| Display / KPI | Bebas Neue | 400 | Valores dos KPIs, headings de seção |
| Corpo | Inter | 400 | Texto geral, descrições |
| Label / UI | Inter | 500 | Labels de campo, badges, nav |
| Dado numérico | Inter | 600 | Números em tabela (legibilidade) |

---

## Paleta de Cores

### Fundos

| Token | Hex | Uso |
|---|---|---|
| `--vx-bg` | `#15121F` | Fundo global da aplicação |
| `--vx-card` | `#1E1A2B` | Cards, sidebar |
| `--vx-surface` | `#2D2640` | Inputs, hover states, separadores |

### Roxos / Rosa (identidade)

| Token | Hex | Uso |
|---|---|---|
| `--vx-violet` | `#9333EA` | Cor primária — botões, links ativos |
| `--vx-lilac` | `#C084FC` | Acento leve — ícones, borders de destaque |
| `--vx-pink` | `#EC4899` | Acento secundário — CTAs, gradientes |

### Semânticas

| Token | Hex | Uso |
|---|---|---|
| `--vx-receita` | `#34D399` | Receita, positivo, sucesso |
| `--vx-despesa` | `#F87171` | Despesa, negativo, erro |

### Texto

| Token | Hex | Uso |
|---|---|---|
| `--vx-text-primary` | `#F5F3F7` | Texto principal |
| `--vx-text-secondary` | `#9D94B0` | Labels, descrições |
| `--vx-text-muted` | `#6B6480` | Placeholders, separadores |

---

## Gradientes

```css
/* Gradiente primário — KPI values, logo */
background: linear-gradient(135deg, #C084FC, #EC4899);

/* Gradiente suave — cards em destaque */
background: linear-gradient(135deg, #9333EA, #C084FC);

/* Gradiente acento — badges, pequenos elementos */
background: linear-gradient(135deg, #EC4899, #F87171);
```

Para texto com gradiente (KPI values):
```css
background: linear-gradient(135deg, #C084FC, #EC4899);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## Glassmorphism

Três variantes, cada uma com um caso de uso claro:

### Sutil — cards secundários, painéis laterais
```css
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(12px);
border-radius: 16px;
```

### Padrão ✦ — KPI cards, modais, tabelas
```css
background: rgba(255, 255, 255, 0.07);
border: 1px solid rgba(255, 255, 255, 0.10);
backdrop-filter: blur(12px);
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### Acento — CTAs, cards de destaque, sidebar item ativo
```css
background: rgba(147, 51, 234, 0.15);
border: 1px solid rgba(192, 132, 252, 0.25);
backdrop-filter: blur(12px);
border-radius: 16px;
```

Classe utilitária Tailwind (adicionar no `index.css`):
```css
.glass { @apply bg-white/7 border border-white/10 backdrop-blur-md rounded-2xl; }
.glass-subtle { @apply bg-white/4 border border-white/8 backdrop-blur-md rounded-2xl; }
.glass-accent { @apply bg-violet-600/15 border border-purple-400/25 backdrop-blur-md rounded-2xl; }
```

---

## StarBackground — Estrelinhas de 4 pontas

Componente animado que fica atrás de todo o conteúdo no `RootLayout`.

**Arquivo:** `src/components/layout/StarBackground.tsx`

**Comportamento:**
- 28 estrelinhas de 4 pontas espalhadas pelo fundo
- Cada estrela tem: pulso de opacidade, rotação suave, glow colorido
- Cores: `#C084FC`, `#EC4899`, `#9333EA`, `rgba(255,255,255,0.6)`
- Orbs de glow estáticos no canto superior direito (roxo) e inferior esquerdo (rosa)
- `position: fixed` no container, `z-index: 0` — conteúdo fica em `z-index: 1`+
- Respeita `prefers-reduced-motion`: para as animações, mantém estrelas estáticas

**No RootLayout:**
```tsx
import StarBackground from './StarBackground'

export default function RootLayout() {
  return (
    <div style={{ background: '#15121F', minHeight: '100vh', position: 'relative' }}>
      <StarBackground />
      <Sidebar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Outlet />
      </main>
    </div>
  )
}
```

---

## Tokens Tailwind (CSS Variables)

Adicione no `src/index.css` após o import das fontes:

```css
:root {
  --vx-bg: #15121F;
  --vx-card: #1E1A2B;
  --vx-surface: #2D2640;
  --vx-violet: #9333EA;
  --vx-lilac: #C084FC;
  --vx-pink: #EC4899;
  --vx-receita: #34D399;
  --vx-despesa: #F87171;
  --vx-text-primary: #F5F3F7;
  --vx-text-secondary: #9D94B0;
  --vx-text-muted: #6B6480;
}
```

---

## Escala tipográfica

| Elemento | Família | Tamanho | Peso | Cor |
|---|---|---|---|---|
| KPI value | Bebas Neue | 40–48px | 400 | gradiente primário |
| Heading de seção | Bebas Neue | 20–24px | 400 | `--vx-text-primary` |
| Label de seção | Inter | 11px / ls: 2px | 500 | `--vx-text-muted` (uppercase) |
| Corpo | Inter | 14px | 400 | `--vx-text-secondary` |
| Número em tabela | Inter | 13–14px | 600 | `--vx-text-primary` |
| Badge | Inter | 12px | 500 | cor semântica |

---

## Referências visuais usadas

| Ref | O que pegamos |
|---|---|
| Helios Investments (2.jpg) | Paleta dark + glow rosa, estrutura de cards |
| lumify/Nexus (7.jpg) | Tipografia de label uppercase, densidade de info |
| Dashboard verde (5.jpg) | Padrão "vs mês anterior", estrutura KPI row |
| Purple dark (6.jpg) | Uso de gradiente roxo/rosa nos gráficos |