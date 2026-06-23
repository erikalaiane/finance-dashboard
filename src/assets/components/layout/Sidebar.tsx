import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart2,
  Wallet,
  Target,
  CalendarDays,
  Bell,
  Users,
  Info,
  CreditCard,
  Mail,
  Settings,
  LogOut,
  Gem,
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const sections: NavSection[] = [
  {
    title: "Core",
    items: [
      { label: "Dashboard", path: "/", icon: <LayoutDashboard size={16} /> },
      { label: "Transações", path: "/transacoes", icon: <ArrowLeftRight size={16} /> },
      { label: "Relatórios", path: "/relatorios", icon: <BarChart2 size={16} /> },
      { label: "Carteiras", path: "/carteiras", icon: <Wallet size={16} /> },
    ],
  },
  {
    title: "Extras",
    items: [
      { label: "Metas", path: "/metas", icon: <Target size={16} /> },
      { label: "Eventos", path: "/eventos", icon: <CalendarDays size={16} /> },
      { label: "Notificações", path: "/notificacoes", icon: <Bell size={16} /> },
      { label: "Equipe", path: "/equipe", icon: <Users size={16} /> },
    ],
  },
  {
    title: "Institucional",
    items: [
      { label: "Sobre", path: "/sobre", icon: <Info size={16} /> },
      { label: "Planos", path: "/planos", icon: <CreditCard size={16} /> },
      { label: "Contato", path: "/contato", icon: <Mail size={16} /> },
    ],
  },
  {
    title: "Sistema",
    items: [
      { label: "Configurações", path: "/configuracoes", icon: <Settings size={16} /> },
    ],
  },
];

export function Sidebar() {
  return (
    <aside
      style={{
        position: "relative",
        height: "100%",
        width: "240px",
        overflowY: "hidden",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        background: "rgba(30, 26, 43, 0.7)",
        backdropFilter: "blur(16px)",
        borderRadius: "16px",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "36px",
          paddingLeft: "8px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #9333EA, #EC4899)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Gem size={20} color="white" />
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "18px",
              letterSpacing: "1px",
              background: "linear-gradient(135deg, #C084FC, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
            }}
          >
            Vexra Denaro
          </div>
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "1.5px",
              color: "#6B6480",
              textTransform: "uppercase",
              marginTop: "6px",
            }}
          >
            Soluzioni Finanziarie
          </div>
        </div>
      </div>

      {/* Nav sections */}
      <nav style={{ flex: 1, overflowY: "hidden", display: "flex", flexDirection: "column", gap: "16px" }}>
        {sections.map((section, i) => (
          <div key={section.title}>
            {i > 0 && (
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                  marginBottom: "16px",
                }}
              />
            )}
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#6B6480",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                paddingLeft: "8px",
                marginBottom: "6px",
              }}
            >
              {section.title}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
              {section.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    style={({ isActive }) => ({
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                      color: isActive ? "#F5F3F7" : "#9D94B0",
                      background: isActive
                        ? "rgba(147, 51, 234, 0.15)"
                        : "transparent",
                      border: isActive
                        ? "1px solid rgba(192, 132, 252, 0.25)"
                        : "1px solid transparent",
                    })}
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sair */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 12px",
            borderRadius: "10px",
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: "#F87171",
            background: "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            width: "100%",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(248, 113, 113, 0.08)";
            e.currentTarget.style.border = "1px solid rgba(248, 113, 113, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.border = "1px solid transparent";
          }}
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </aside>
  );
}