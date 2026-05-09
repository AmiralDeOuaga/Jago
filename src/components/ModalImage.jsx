import { useState } from "react";
import { categories } from "../constants";

export function ModalImage({ annonce, onFullscreen }) {
  const [idx, setIdx] = useState(0);
  const photos = annonce.photos || [];
  if (!photos.length) return <div className="mimg-emoji">{annonce.emoji}</div>;
  return (
    <div className="mimg-wrap">
      {/* Image cliquable pour agrandir */}
      <img src={photos[idx]} alt="" className="mimg-real" onClick={() => onFullscreen(photos, idx)}/>
      <div className="mbadges">
        <span className="bcat">{categories.find(c => c.id === annonce.categorie)?.label}</span>
        {annonce.urgent && <span className="burg">⚡ Urgent</span>}
      </div>
      {/* Badge agrandir */}
      <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.55)", color: "white", fontSize: 11, padding: "4px 9px", borderRadius: 6, pointerEvents: "none", zIndex: 3 }}>🔍 Agrandir</div>
      {/* Boutons navigation — positionnés séparément */}
      {photos.length > 1 && <>
        <button className="mnav-btn mnav-left" onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + photos.length) % photos.length); }}>‹</button>
        <button className="mnav-btn mnav-right" onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % photos.length); }}>›</button>
        <div className="mimg-dots">{photos.map((_, i) => <div key={i} className={`mdot${i === idx ? " on" : ""}`}/>)}</div>
      </>}
    </div>
  );
}
