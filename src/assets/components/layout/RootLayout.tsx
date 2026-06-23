import { Outlet } from "react-router-dom";
import { StarBackground } from "../ui/StarBackground";
import { Sidebar } from "./Sidebar";
// import { Navbar } from "./Navbar";

export function RootLayout() {
  return (
    <div style={{ background: "#15121F", minHeight: "100vh", position: "relative", padding: "16px", display: "flex", gap: "16px" }}>
  <StarBackground />
  
  {/* Sidebar flutuante */}
  <div style={{ position: "relative", zIndex: 10, flexShrink: 0 }}>
    <Sidebar />
  </div>

  {/* Painel principal */}
  <main style={{ 
    position: "relative", 
    zIndex: 1, 
    flex: 1,
    display: "flex",
    flexDirection: "column",
  }}>
    <div style={{
      flex: 1,
      background: "rgba(30, 26, 43, 0.6)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px",
      overflow: "auto",
      padding: "24px",
      minHeight: "calc(100vh - 32px)",
    }}>
      <Outlet />
    </div>
  </main>
</div>
  );
}