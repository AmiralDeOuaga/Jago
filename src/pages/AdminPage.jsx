import { styles } from "../styles";
import { categories } from "../constants";

export function AdminPage({
  annonces,
  allUsers,
  signalements,
  adminTab, setAdminTab,
  adminDeleteAd,
  adminDeleteSignalement,
  setPage,
  Header,
  Footer,
}) {
  return (<><style>{styles}</style>
    <div className="app"><Header/>
      <div className="admin-screen">
        <div className="admin-header">
          <div>
            <div className="admin-title">🛡️ Panel Admin — Jago</div>
            <div className="admin-subtitle">Gestion de la marketplace</div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <a href="/facebook-posts.html" target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",borderRadius:10,padding:"8px 16px",color:"#fff",fontWeight:700,fontSize:13,textDecoration:"none",fontFamily:"Montserrat,sans-serif",cursor:"pointer",transition:"all .2s"}}>
              📘 Visuels FB
            </a>
            <button className="btn-o" onClick={()=>setPage("home")}>← Retour</button>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat"><div className="admin-stat-n">{annonces.length}</div><div className="admin-stat-l">Annonces</div></div>
          <div className="admin-stat"><div className="admin-stat-n">{allUsers.length}</div><div className="admin-stat-l">Membres</div></div>
          <div className="admin-stat"><div className="admin-stat-n">{signalements.length}</div><div className="admin-stat-l" style={{color:"#DC2626"}}>Signalements</div></div>
          <div className="admin-stat"><div className="admin-stat-n">{annonces.filter(a=>a.urgent).length}</div><div className="admin-stat-l">Urgentes</div></div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button className={`admin-tab${adminTab==="annonces"?" on":""}`} onClick={()=>setAdminTab("annonces")}>📋 Annonces ({annonces.length})</button>
          <button className={`admin-tab${adminTab==="signalements"?" on":""}`} onClick={()=>setAdminTab("signalements")}>🚩 Signalements ({signalements.length})</button>
          <button className={`admin-tab${adminTab==="users"?" on":""}`} onClick={()=>setAdminTab("users")}>👥 Membres ({allUsers.length})</button>
          <button className={`admin-tab${adminTab==="marketing"?" on":""}`} onClick={()=>setAdminTab("marketing")}>📘 Marketing</button>
        </div>

        {/* Annonces */}
        {adminTab==="annonces" && (
          <div className="admin-section">
            <div className="admin-section-title">📋 Toutes les annonces</div>
            {annonces.length===0
              ? <div className="empty"><div className="eico">📭</div><div className="emsg">Aucune annonce</div></div>
              : annonces.map(a=>(
                <div key={a.id} className="admin-row">
                  <div className="admin-row-info">
                    <div className="admin-row-title">{a.urgent && "⚡ "}{a.titre}</div>
                    <div className="admin-row-sub">{categories.find(c=>c.id===a.categorie)?.icon} {categories.find(c=>c.id===a.categorie)?.label} · 📍 {a.ville} · 👤 {a.vendeur} · 👁️ {a.vues||0} vues</div>
                    <div className="admin-row-sub" style={{color:"var(--blue)",fontWeight:700}}>{a.prix}</div>
                  </div>
                  <div className="admin-row-actions">
                    <button className="btn-danger" onClick={()=>adminDeleteAd(a.id)}>🗑️ Supprimer</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* Signalements */}
        {adminTab==="signalements" && (
          <div className="admin-section">
            <div className="admin-section-title">🚩 Signalements à traiter</div>
            {signalements.length===0
              ? <div className="empty"><div className="eico">✅</div><div className="emsg">Aucun signalement !</div></div>
              : signalements.map(s=>(
                <div key={s.id} className="admin-row">
                  <div className="admin-row-info">
                    <div className="admin-row-title">🚩 {s.titre}</div>
                    <div className="admin-row-sub">Raison : {s.raison}</div>
                    <div className="admin-row-sub">ID annonce : {s.annonceId}</div>
                  </div>
                  <div className="admin-row-actions">
                    <button className="btn-danger" onClick={()=>adminDeleteAd(s.annonceId)}>🗑️ Supprimer l'annonce</button>
                    <button className="btn-warn" onClick={()=>adminDeleteSignalement(s.id)}>✓ Ignorer</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* Membres */}
        {adminTab==="users" && (
          <div className="admin-section">
            <div className="admin-section-title">👥 Membres inscrits</div>
            {allUsers.length===0
              ? <div className="empty"><div className="eico">👥</div><div className="emsg">Aucun membre</div></div>
              : allUsers.map(u=>(
                <div key={u.id} className="admin-row">
                  <div className="admin-row-info">
                    <div className="admin-row-title">{u.nom || "Sans nom"}</div>
                    <div className="admin-row-sub">📧 {u.email} · 📞 {u.tel||"—"} · 💬 {u.whatsapp||"—"}</div>
                    <div className="admin-row-sub">Annonces : {annonces.filter(a=>a.userId===u.uid).length}</div>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* Marketing */}
        {adminTab==="marketing" && (
          <div className="admin-section">
            <div className="admin-section-title">📘 Outils Marketing</div>
            <div style={{padding:"28px 24px",display:"flex",flexDirection:"column",gap:20}}>
              <div style={{background:"rgba(23,86,200,.08)",border:"1px solid rgba(23,86,200,.25)",borderRadius:16,padding:"24px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
                <div>
                  <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:16,color:"var(--text)",marginBottom:6}}>📘 Visuels Facebook</div>
                  <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>6 posts 1080×1080 prêts à publier — une fonctionnalité par visuel.<br/>Clic droit sur chaque image → Enregistrer.</div>
                </div>
                <a href="/facebook-posts.html" target="_blank" rel="noopener noreferrer" style={{flexShrink:0,display:"inline-flex",alignItems:"center",gap:8,background:"#1756C8",color:"#fff",fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:14,padding:"12px 24px",borderRadius:12,textDecoration:"none",whiteSpace:"nowrap"}}>
                  Ouvrir →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  </>);
}
