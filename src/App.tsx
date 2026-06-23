import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./assets/components/layout/RootLayout";

// Core
import { Dashboard } from "./assets/pages/Dashboard";
import { Transacoes } from "./assets/pages/Transacoes";
import { Relatorios } from "./assets/pages/Relatorios";
import { Carteiras } from "./assets/pages/Carteiras";

// Extras
import { Metas } from "./assets/pages/Metas";
import { Eventos } from "./assets/pages/Eventos";
import { Notificacoes } from "./assets/pages/Notificacoes";
import { Equipe } from "./assets/pages/Equipe";

// Institucional
import { Sobre } from "./assets/pages/Sobre";
import { Planos } from "./assets/pages/Planos";
import { Contato } from "./assets/pages/Contato";

// Sistema
import { Configuracoes } from "./assets/pages/Configuracoes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transacoes" element={<Transacoes />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/carteiras" element={<Carteiras />} />
          <Route path="/metas" element={<Metas />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;