function getSaudacao(): string {
  const hora = new Date().getHours();
  if (hora < 12) return "Buongiorno";
  if (hora < 18) return "Buon pomeriggio";
  return "Buonasera";
}

function getDataAtual(): string {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function WelcomeHeader() {
  const saudacao = getSaudacao();
  const data = getDataAtual();

return (
  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px" }}>
    
    {/* Card nome */}
    <div style={{
      background: "rgba(30, 26, 43, 0.6)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px",
      padding: "16px 24px",
    }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "4px" }}>
        {saudacao}
      </p>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", display: "inline-block", fontSize: "36px", letterSpacing: "2px", lineHeight: 1, background: "linear-gradient(135deg, #F5F3F7 30%, #C084FC 70%, #EC4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        Giulia Rossi ✦
      </h1>
    </div>

    {/* Card data */}
    <div style={{
      background: "rgba(30, 26, 43, 0.6)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px",
      padding: "16px 24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-end",
    }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6480", marginBottom: "4px" }}>
        Hoje
      </p>
      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", letterSpacing: "1px", color: "#F5F3F7" }}>
        {data}
      </p>
    </div>

  </div>
);
}