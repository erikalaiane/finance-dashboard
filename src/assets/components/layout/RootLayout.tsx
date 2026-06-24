import { Outlet } from "react-router-dom";
import { StarBackground } from "../ui/StarBackground";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function RootLayout() {
  return (
    <div style={{ background: "#15121F", minHeight: "100vh", position: "relative" }}>
      <StarBackground />

      {/* Wrapper central 80% */}
      <div style={{
        width: "80%",
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        padding: "16px 0",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
      }}>
      <Sidebar />
      <main style={{ 
        flex: 1, 
        padding: "16px 0 0 16px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",  // impede o main de crescer
      }}>
        <Navbar />
        <div style={{ 
          flex: 1, 
          overflowY: "auto",  // só essa área rola
          paddingRight: "4px",
        }}>
      <Outlet />
    </div>
  </main>
</div>
    </div>
  );
}