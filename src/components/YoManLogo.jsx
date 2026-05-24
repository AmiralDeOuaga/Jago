export const YoManLogo = ({ variant = "white", height = 48 }) => {
  const subText = variant === "white" ? "rgba(255,255,255,0.65)" : "#6B80A8";
  const w = Math.round(height * 3.0);
  return (
    <svg width={w} height={height} viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "100%" }}>
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A2463"/>
          <stop offset="100%" stopColor="#1756C8"/>
        </linearGradient>
      </defs>
      {/* Carré arrondi fond bleu */}
      <rect x="0" y="0" width="60" height="60" rx="14" fill="url(#logoGrad)"/>
      {/* Lettre J dans la box */}
      <text x="32" y="44" fontFamily="'Montserrat','Arial Black',sans-serif" fontWeight="900" fontSize="40" fill="#FFD93D" textAnchor="middle">J</text>
      {/* Nom Jago */}
      <text x="75" y="34" fontFamily="'Montserrat','Arial Black',sans-serif" fontWeight="900" fontSize="28" fill="white" letterSpacing="-0.5">
        <tspan fill="white">Ja</tspan><tspan fill="#FFD93D">go</tspan>
      </text>
      {/* Tagline */}
      <text x="75" y="50" fontFamily="'Montserrat',sans-serif" fontWeight="500" fontSize="9" fill={subText} letterSpacing="0.8">· entre particuliers ·</text>
    </svg>
  );
};
