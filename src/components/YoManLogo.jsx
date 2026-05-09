export const YoManLogo = ({ variant = "white", height = 48 }) => {
  const isWhite = variant === "white";
  const bgColor = isWhite ? "url(#logoGrad)" : "url(#logoGrad)";
  const bgBorder = isWhite ? "#0A2463" : "#0A2463";
  const subText = isWhite ? "rgba(255,255,255,0.65)" : "#6B80A8";
  const textMan = isWhite ? "#FFD93D" : "#1756C8";
  const textExcl = "#FFD93D";
  const w = height * 3.4;
  return (
    <svg width={w} height={height} viewBox="0 0 204 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "100%" }}>
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A2463"/>
          <stop offset="100%" stopColor="#1756C8"/>
        </linearGradient>
      </defs>
      {/* Carré arrondi */}
      <rect x="0" y="0" width="58" height="60" rx="14" fill={bgColor} stroke={bgBorder} strokeWidth="1.5"/>
      {/* Yo et ! sur la même ligne */}
      <text x="24" y="37" fontFamily="'Montserrat','Arial Black',sans-serif" fontWeight="900" fontSize="26" fill="white" textAnchor="middle">Yo</text>
      <text x="46" y="37" fontFamily="'Montserrat','Arial Black',sans-serif" fontWeight="900" fontSize="26" fill={textExcl}>!</text>
      {/* Texte YoMan! aligné verticalement au centre */}
      <text x="70" y="25" fontFamily="'Montserrat','Arial Black',sans-serif" fontWeight="900" fontSize="20" fill="white" stroke="#1756C8" strokeWidth="2" paintOrder="stroke" letterSpacing="-0.5">Yo</text>
      <text x="95" y="25" fontFamily="'Montserrat','Arial Black',sans-serif" fontWeight="900" fontSize="20" fill={textMan} letterSpacing="-0.5">Man</text>
      <text x="145" y="25" fontFamily="'Montserrat','Arial Black',sans-serif" fontWeight="900" fontSize="20" fill={textExcl} letterSpacing="-0.5">!</text>
      {/* Tagline */}
      <text x="70" y="42" fontFamily="'Montserrat',sans-serif" fontWeight="500" fontSize="9" fill={subText} letterSpacing="0.8">· entre particuliers ·</text>
    </svg>
  );
};
