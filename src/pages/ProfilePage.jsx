import { CardImage } from "../components/CardImage";
import { getPays } from "../constants";

export function ProfilePage({
  user,
  userPays,
  myAds,
  setSelected,
  startEdit,
  deleteAd,
  setPage,
  Header,
  Footer,
  OfflineBanner,
  Toast,
}) {
  const paysInfo = getPays(userPays);
  return (<>
    <OfflineBanner/><Toast/>
    <div className="app"><Header/>
      <div className="profscreen">
        <button className="pback" onClick={() => setPage("home")}>← Retour</button>
        <div className="profhead">
          <div className="avatar">{user.displayName?.[0] || "?"}</div>
          <div className="pinfo">
            <h2>{user.displayName}</h2>
            <p>📧 {user.email}</p>
            <p style={{display:"flex",alignItems:"center",gap:6,marginTop:4,fontSize:13,color:"var(--gray4)"}}>
              <img src={`https://flagcdn.com/w20/${userPays}.png`} alt={paysInfo.label} style={{width:18,height:13,objectFit:"cover",borderRadius:2}}/>
              {paysInfo.label}
            </p>
            <div className="pstats">
              <div><div className="psn">{myAds.length}</div><div className="psl">Annonces</div></div>
              <div><div className="psn">{myAds.reduce((s,a)=>s+(a.vues||0),0)}</div><div className="psl">Vues totales</div></div>
              <div><div className="psn">{myAds.filter(a=>a.urgent).length}</div><div className="psl">Urgentes</div></div>
            </div>
          </div>
        </div>

        {/* Stats détaillées */}
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-card-n">{myAds.length}</div><div className="stat-card-l">📋 Annonces</div></div>
          <div className="stat-card"><div className="stat-card-n">{myAds.reduce((s,a)=>s+(a.vues||0),0)}</div><div className="stat-card-l">👁️ Vues</div></div>
          <div className="stat-card"><div className="stat-card-n">{myAds.filter(a=>a.categorie==="immobilier").length}</div><div className="stat-card-l">🏠 Immo</div></div>
          <div className="stat-card"><div className="stat-card-n">{myAds.filter(a=>a.categorie==="vehicules").length}</div><div className="stat-card-l">🚗 Véhicules</div></div>
          <div className="stat-card"><div className="stat-card-n">{myAds.filter(a=>a.categorie==="electronique").length}</div><div className="stat-card-l">📱 Électro</div></div>
          <div className="stat-card"><div className="stat-card-n">{myAds.filter(a=>a.urgent).length}</div><div className="stat-card-l">⚡ Urgentes</div></div>
        </div>
        <div className="stitle">Mes annonces</div>
        {myAds.length === 0
          ? <div className="empty">
              <div className="eico">📭</div>
              <div className="emsg">Aucune annonce publiée</div>
              <div className="esub">Publiez votre première annonce !</div>
            </div>
          : <div className="grid">{myAds.map(a => (
              <div key={a.id} className="card" onClick={() => setSelected(a)}>
                <div style={{position:"relative"}}>
                  <CardImage annonce={a}/>
                </div>
                <div className="cbody">
                  <div className="ctitle">{a.titre}</div>
                  <div className="cprix">{a.prix}</div>
                  <div className="clieu">📍 {a.quartier}, {a.ville}</div>
                  <div className="cdesc">{a.description}</div>
                  <div style={{display:"flex",gap:8,marginTop:"auto",paddingTop:10,borderTop:"1px solid var(--border)"}}>
                    <button className="del-btn" style={{background:"rgba(23,86,200,.1)",color:"#7ab3ff",border:"1px solid rgba(23,86,200,.3)"}} onClick={e=>{e.stopPropagation();startEdit(a);}}>✏️ Modifier</button>
                    <button className="del-btn" onClick={e=>{e.stopPropagation();deleteAd(a.id);}}>🗑️ Suppr.</button>
                  </div>
                </div>
              </div>
            ))}</div>
        }
      </div><Footer/>
    </div>
  </>);
}
