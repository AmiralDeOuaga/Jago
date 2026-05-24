/*
  JagoLogo — cauri shell mark + Montserrat wordmark
  variant="white"  → logo sur fond sombre (header nav)
  variant="color"  → logo sur fond clair (auth screen)
  variant="mark"   → icône seule (favicon, app icon)
*/

const CauriSVG = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={{ display: 'block' }}>
    {/* Corps du cauri — amande arrondie */}
    <ellipse cx="30" cy="30" rx="18" ry="24" fill="#fff"/>
    {/* Slit central */}
    <path d="M 30 9 L 30 51" stroke="rgba(10,36,99,0.35)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    {/* Dents (notches) */}
    <line x1="26" y1="15" x2="34" y2="15" stroke="rgba(10,36,99,0.35)" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="26" y1="22" x2="34" y2="22" stroke="rgba(10,36,99,0.35)" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="26" y1="30" x2="34" y2="30" stroke="rgba(10,36,99,0.35)" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="26" y1="38" x2="34" y2="38" stroke="rgba(10,36,99,0.35)" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="26" y1="45" x2="34" y2="45" stroke="rgba(10,36,99,0.35)" strokeWidth="1.4" strokeLinecap="round"/>
    {/* Reflet 3D subtil */}
    <ellipse cx="24" cy="22" rx="3" ry="6" fill="rgba(255,255,255,0.45)" opacity="0.6"/>
  </svg>
);

export const JagoLogo = ({ variant = "white", height = 48 }) => {
  const isWhite = variant === "white";
  const sq        = height;
  const radius    = Math.round(height * 0.22);
  const gap       = Math.round(height * 0.30);
  const fontSize  = Math.round(height * 0.58);
  const tagSz     = Math.max(7, Math.round(height * 0.155));
  const dotSz     = Math.max(4, Math.round(sq * 0.10));
  const dotPos    = Math.round(sq * 0.17);

  const wordColor    = isWhite ? '#FFFFFF' : '#1756C8';
  const taglineColor = isWhite ? 'rgba(255,255,255,0.45)' : '#6B80A8';

  const Mark = () => (
    <div style={{
      width: sq, height: sq, borderRadius: radius, flexShrink: 0,
      background: 'linear-gradient(135deg, #0A2463 0%, #1756C8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      border: isWhite ? '1px solid rgba(255,255,255,0.12)' : 'none',
    }}>
      {/* Halo or en haut à droite */}
      <div style={{
        position: 'absolute', top: '-30%', right: '-30%',
        width: '80%', height: '80%',
        background: 'radial-gradient(circle, rgba(255,217,61,0.22) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>
      <CauriSVG size={sq * 0.55}/>
      {/* Point or */}
      <div style={{
        position: 'absolute', top: dotPos, right: dotPos,
        width: dotSz, height: dotSz, borderRadius: '50%',
        background: '#FFD93D', boxShadow: '0 0 6px rgba(255,217,61,0.7)',
      }}/>
    </div>
  );

  if (variant === 'mark') return <Mark/>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, flexShrink: 0 }}>
      <Mark/>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontFamily: "'Montserrat','Arial Black',sans-serif",
          fontWeight: 900, fontSize, lineHeight: 1,
          letterSpacing: '-0.5px', color: wordColor,
        }}>Jago</div>
        <div style={{
          fontSize: tagSz, color: taglineColor,
          letterSpacing: '1.3px', textTransform: 'uppercase',
          marginTop: Math.round(height * 0.08), fontWeight: 500,
          fontFamily: "'Montserrat',sans-serif", whiteSpace: 'nowrap',
        }}>· Trouvez tout ce que vous cherchez ·</div>
      </div>
    </div>
  );
};

// Alias pour rétrocompatibilité avec les imports existants
export const YoManLogo = JagoLogo;
