export const JagoLogo = ({ variant = "white", height = 48 }) => {
  const isWhite = variant === "white";
  const textColor = isWhite ? "#FFFFFF" : "#1756C8";
  const subColor = isWhite ? "rgba(255,255,255,0.65)" : "#6B7B9E";
  const w = height * 3.6;
  const iconSize = height;
  const rx = iconSize * 0.18;

  return (
    <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "100%" }}>
      <defs>
        <linearGradient id="jagoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A2463"/>
          <stop offset="100%" stopColor="#1756C8"/>
        </linearGradient>
        <radialGradient id="jagoGlow" cx="75%" cy="25%" r="50%">
          <stop offset="0%" stopColor="#FFD93D" stopOpacity="0.22"/>
          <stop offset="70%" stopColor="#FFD93D" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* Icône */}
      <rect x="0" y="0" width={iconSize} height={iconSize} rx={rx} fill="url(#jagoGrad)"/>
      <rect x="0" y="0" width={iconSize} height={iconSize} rx={rx} fill="url(#jagoGlow)"/>
      <ellipse cx={iconSize*0.45} cy={iconSize*0.52} rx={iconSize*0.216} ry={iconSize*0.288} fill="#FFFFFF"/>
      <path d={`M ${iconSize*0.45} ${iconSize*0.25} L ${iconSize*0.45} ${iconSize*0.79}`} stroke="rgba(10,36,99,0.4)" strokeWidth={iconSize*0.024} strokeLinecap="round"/>
      {[0.34, 0.42, 0.52, 0.62, 0.70].map((y, i) => (
        <line key={i} x1={iconSize*0.40} y1={iconSize*y} x2={iconSize*0.50} y2={iconSize*y} stroke="rgba(10,36,99,0.4)" strokeWidth={iconSize*0.018} strokeLinecap="round"/>
      ))}
      <ellipse cx={iconSize*0.39} cy={iconSize*0.42} rx={iconSize*0.03} ry={iconSize*0.06} fill="rgba(255,255,255,0.45)"/>
      <circle cx={iconSize*0.825} cy={iconSize*0.175} r={iconSize*0.045} fill="#FFD93D"/>
      <circle cx={iconSize*0.825} cy={iconSize*0.175} r={iconSize*0.07} fill="#FFD93D" fillOpacity="0.3"/>
      {/* Texte Jago */}
      <text
        x={iconSize + height * 0.22}
        y={height * 0.62}
        fontFamily="'Montserrat','Arial Black',sans-serif"
        fontWeight="900"
        fontSize={height * 0.58}
        fill={textColor}
        letterSpacing="-0.5"
      >Jago</text>
      {/* Tagline */}
      <text
        x={iconSize + height * 0.22}
        y={height * 0.88}
        fontFamily="'Montserrat',sans-serif"
        fontWeight="500"
        fontSize={height * 0.16}
        fill={subColor}
        letterSpacing="0.8"
      >· commerce entre particuliers ·</text>
    </svg>
  );
};
