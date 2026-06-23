import { Outlet } from "react-router-dom";
import { StarBackground } from "../ui/StarBackground";
// import { Sidebar } from "./Sidebar";
// import { Navbar } from "./Navbar";

export function RootLayout() {
  return (
    <div style={{ background: "#15121F", minHeight: "100vh", position: "relative" }}>
      <StarBackground />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}