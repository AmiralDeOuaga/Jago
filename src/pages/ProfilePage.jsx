import { useState } from "react";
import { CardImage } from "../components/CardImage";
import { getPays } from "../constants";



export function ProfilePage({
  user,
  userPays,
  paysList,
  changePays,
  pendingRequest,
  cancelChangeRequest,
  myAds,
  setSelected,
  startEdit,
  deleteAd,
  setPage,
  Header,
  Footer,
  OfflineBanner,
  Toast,
  userDoc,
  myRatings,
  avgRating,
  phoneStep, setPhoneStep,
  phoneInput, setPhoneInput,
  phoneCode, setPhoneCode,
  phoneError,
  startPhoneAuth,
  confirmPhoneCode,
}) {
  const paysInfo = getPays(userPays);
  const [showPays, setShowPays] = useState(false);

  return (<>
    <OfflineBanner/><Toast/>
    <div className="app"><Header/>
      <div className="profscreen">
        <button className="pback" onClick={() => setPage("home")}>← Retour</button>
        <div className="profhead">
          <div className="avatar">{user.displayName?.[0] || "?"}</div>
          <div className="pinfo">
            <h2>{user.displayName}</h2>
            <p>{user.email}</p>
            <p style={{display:"flex",alignItems:"center",gap:6,marginTop:4,fontSize:13,color:"#fff",fontWeight:600}}>
              <img src={`https://flagcdn.com/w20/${userPays}.png`} alt={paysInfo.label} style={{width:18,height:13,objectFit:"cover",borderRadius:2}}/>
              {paysInfo.label}
              {!pendingRequest && (
                <button
                  onClick={() => setShowPays(v => !v)}
                  style={{marginLeft:6,fontSize:11,color:"#fff",background:"var(--blue)",border:"none",cursor:"pointer",fontWeight:700,padding:"3px 10px",borderRadius:20}}>
                  {showPays ? "Annuler" : "Changer"}
                </button>
              )}
            </p>
            {pendingRequest && pendingRequest.status === "en_attente" && (
              <div style={{marginTop:6,fontSize:12,color:"#FFD93D",fontWeight:700,display:"flex",alignItems:"center",flexWrap:"wrap",gap:6}}>
                <span>Demande de changement de pays en cours</span>
                <img src={`https://flagcdn.com/w20/${pendingRequest.requestedPays}.png`} alt="" style={{width:16,height:11,objectFit:"cover",borderRadius:2}}/>
                <span>{getPays(pendingRequest.requestedPays).label}</span>
                <span style={{opacity:.7,fontWeight:400}}>— en attente de validation</span>
                <button onClick={cancelChangeRequest} style={{marginLeft:4,fontSize:11,color:"#fff",background:"rgba(239,68,68,.7)",border:"none",cursor:"pointer",fontWeight:700,padding:"3px 10px",borderRadius:20}}>
                  Annuler
                </button>
              </div>
            )}
            {showPays && !pendingRequest && (
              <div style={{marginTop:10, overflow:"hidden", borderRadius:12}}>
                <div className="pays-grid">
                  {paysList.filter(p => p.id !== userPays).map(p => (
                    <div key={p.id} className="pays-card"
                      onClick={() => { changePays(p.id); setShowPays(false); }}>
                      <img className="pays-flag" src={`https://flagcdn.com/w40/${p.id}.png`} alt={p.label}/>
                      <span className="pays-name">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="pstats">
              <div><div className="psn">{myAds.length}</div><div className="psl">Annonces</div></div>
              <div><div className="psn">{myAds.reduce((s,a)=>s+(a.vues||0),0)}</div><div className="psl">Vues totales</div></div>
              <div><div className="psn">{myAds.filter(a=>a.urgent).length}</div><div className="psl">Urgentes</div></div>
            </div>
          </div>
        </div>

        {/* Profil de confiance */}
        <div className="trust-section">
          <div className="trust-section-title">🛡️ Profil de confiance</div>
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-label">Membre depuis</div>
              <div className="trust-val">
                {userDoc?.createdAt?.toDate
                  ? new Date(userDoc.createdAt.toDate()).toLocaleDateString("fr-FR",{month:"long",year:"numeric"})
                  : "—"}
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-label">Note moyenne</div>
              <div className="trust-val" style={{color: myRatings?.length ? "var(--gold)" : "var(--muted)"}}>
                {myRatings?.length ? `⭐ ${avgRating(myRatings)}/5 (${myRatings.length} avis)` : "Nouveau vendeur"}
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-label">Téléphone</div>
              {userDoc?.phoneVerified
                ? <span className="verified-badge">✅ Vérifié</span>
                : <button className="btn-o" style={{fontSize:12,padding:"5px 12px"}} onClick={() => setPhoneStep("input")}>Vérifier →</button>}
            </div>
          </div>
          {phoneStep === "input" && (
            <div style={{marginTop:16,borderTop:"1px solid var(--border)",paddingTop:16}}>
              <div style={{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:8}}>Numéro avec indicatif pays</div>
              <div style={{display:"flex",gap:8}}>
                <input className="fi" placeholder="+22670123456" value={phoneInput}
                  onChange={e=>setPhoneInput(e.target.value)} style={{flex:1}}/>
                <button className="btn-p" onClick={startPhoneAuth}>Envoyer SMS</button>
              </div>
              {phoneError && <div style={{fontSize:12,color:"#f87171",marginTop:6}}>{phoneError}</div>}
              <div id="recaptcha-phone"/>
            </div>
          )}
          {phoneStep === "code" && (
            <div style={{marginTop:16,borderTop:"1px solid var(--border)",paddingTop:16}}>
              <div style={{fontSize:13,fontWeight:700,color:"var(--text)",marginBottom:8}}>Code SMS (6 chiffres)</div>
              <div style={{display:"flex",gap:8}}>
                <input className="fi" placeholder="123456" value={phoneCode} maxLength={6}
                  onChange={e=>setPhoneCode(e.target.value)} style={{flex:1}}/>
                <button className="btn-p" onClick={confirmPhoneCode}>Valider</button>
              </div>
              {phoneError && <div style={{fontSize:12,color:"#f87171",marginTop:6}}>{phoneError}</div>}
              <div style={{fontSize:11,color:"var(--muted)",marginTop:6,cursor:"pointer"}}
                onClick={()=>setPhoneStep("input")}>← Changer de numéro</div>
            </div>
          )}
        </div>

        {/* Stats détaillées */}
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-card-n">{myAds.length}</div><div className="stat-card-l">Annonces</div></div>
          <div className="stat-card"><div className="stat-card-n">{myAds.reduce((s,a)=>s+(a.vues||0),0)}</div><div className="stat-card-l">Vues</div></div>
          <div className="stat-card"><div className="stat-card-n">{myAds.filter(a=>a.categorie==="immobilier").length}</div><div className="stat-card-l">Immo</div></div>
          <div className="stat-card"><div className="stat-card-n">{myAds.filter(a=>a.categorie==="vehicules").length}</div><div className="stat-card-l">Véhicules</div></div>
          <div className="stat-card"><div className="stat-card-n">{myAds.filter(a=>a.categorie==="electronique").length}</div><div className="stat-card-l">Électro</div></div>
          <div className="stat-card"><div className="stat-card-n">{myAds.filter(a=>a.urgent).length}</div><div className="stat-card-l">Urgentes</div></div>
        </div>
        <div className="stitle">Mes annonces</div>
        {myAds.length === 0
          ? <div className="empty">
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
                  <div className="clieu">{a.quartier}, {a.ville}</div>
                  <div style={{fontSize:11,color:"var(--muted)",marginTop:2,display:"flex",alignItems:"center",gap:4}}>
                    <img src={`https://flagcdn.com/w20/${a.pays||"bf"}.png`} alt="" style={{width:14,height:10,objectFit:"cover",borderRadius:2}}/>
                    {getPays(a.pays||"bf").label}
                  </div>
                  <div className="cdesc">{a.description}</div>
                  <div style={{display:"flex",gap:8,marginTop:"auto",paddingTop:10,borderTop:"1px solid var(--border)"}}>
                    <button className="del-btn" style={{flex:1,background:"rgba(23,86,200,.1)",color:"#7ab3ff",border:"1px solid rgba(23,86,200,.3)"}} onClick={e=>{e.stopPropagation();startEdit(a);}}>Modifier</button>
                    <button className="del-btn" style={{flex:"0 0 auto",padding:"6px 10px"}} onClick={e=>{e.stopPropagation();deleteAd(a.id);}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}</div>
        }
      </div><Footer/>
    </div>
  </>);
}
