import { Search, Bell, Plus } from "lucide-react";

export function Navbar() {
  return (
    <header className="flex items-center justify-between gap-4 mb-6">

      {/* Busca */}
      <div
        className="flex items-center gap-3 flex-1"
        style={{
          background: "rgba(30, 26, 43, 0.6)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          padding: "14px 20px",
        }}
      >
        <Search size={16} color="#6B6480" />
        <input
          type="text"
          placeholder="Buscar transações, categorias..."
          className="bg-transparent outline-none w-full"
          style={{
            color: "#F5F3F7",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
          }}
        />
      </div>

      {/* Direita */}
      <div className="flex items-center gap-3">

        {/* Botão Novo Lançamento */}
        <button
          className="flex items-center gap-2 transition-all"
          style={{
            background: "linear-gradient(135deg, #9333EA, #EC4899)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            color: "white",
            border: "none",
            borderRadius: "16px",
            padding: "14px 24px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          <Plus size={16} />
          Novo Lançamento 
        </button>

        {/* Sino */}
        <button
          className="relative flex items-center justify-center transition-all"
          style={{
            background: "rgba(30, 26, 43, 0.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "14px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(147,51,234,0.15)";
            e.currentTarget.style.border = "1px solid rgba(192,132,252,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(30, 26, 43, 0.6)";
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
          }}
        >
          <Bell size={18} color="#9D94B0" />
          <span
            className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full text-white"
            style={{
              fontSize: "10px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              background: "linear-gradient(135deg, #9333EA, #EC4899)",
            }}
          >
            3
          </span>
        </button>

        {/* Avatar + nome */}
        <div
          className="flex items-center gap-3"
          style={{
            background: "rgba(30, 26, 43, 0.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "10px 16px",
          }}
        >
          <div
            className="flex items-center justify-center rounded-full shrink-0"
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #9333EA, #EC4899)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              color: "white",
            }}
          >
            GR
          </div>
          <div className="flex flex-col">
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "13px", color: "#F5F3F7", lineHeight: 1.3 }}>
              Giulia Rossi
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B6480", lineHeight: 1.3 }}>
              Administradora
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}