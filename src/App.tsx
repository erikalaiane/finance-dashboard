import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./assets/components/layout/RootLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;