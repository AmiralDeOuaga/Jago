import { useState } from "react";
import { categories, getVilles, catEmojis, quartiersExemples } from "../constants";
import { PhotoUploader } from "../components/PhotoUploader";

export function PostPage({
  user,
  isOnline,
  userPays,
  page, setPage,
  editAd, setEditAd,
  pTitre, setPTitre,
  pCat, setPCat,
  pPrix, setPPrix,
  pVille, setPVille,
  pQ, setPQ,
  pDesc, setPDesc,
  pUrg, setPUrg,
  pPhotos, setPPhotos,
  postOk,
  submitting,
  postAd,
  unreadCount,
  favoris,
  catActive, setCat,
  searchInput, setSI,
  setSearch, setCurrentPage,
  isAdmin,
  logout,
  showToast,
  Header,
  Footer,
  OfflineBanner,
  Toast,
}) {
  const [catOpen, setCatOpen] = useState(false);
  const [villeOpen, setVilleOpen] = useState(false);
  const selectedCat = categories.find(c => c.id === pCat);
  const villes = getVilles(userPays);

  return (<>
    <OfflineBanner/><Toast/>
    <div className="app"><Header showPost={false}/>
      <div className="pscreen">
        <button className="pback" onClick={() => setPage("home")}>← Retour</button>
        {postOk && <div className="succ">Annonce publiée !</div>}
        <div className="pcard">
          <div className="ptitle">{editAd ? "Modifier l'annonce" : "Déposer une annonce"}</div>
          <div className="fg">
            <label className="fl">Catégorie *</label>
            <div className="cat-picker">
              <button type="button" className="cat-picker-btn" onClick={()=>{ setCatOpen(o=>!o); setVilleOpen(false); }}>
                <span>{selectedCat ? `${selectedCat.icon} ${selectedCat.label}` : "Choisir une catégorie…"}</span>
                <span className="cat-picker-arrow">{catOpen ? "▲" : "▼"}</span>
              </button>
              {catOpen && (
                <div className="cat-picker-list">
                  {categories.map(c => (
                    <button type="button" key={c.id} className={`cat-picker-item${pCat===c.id?" selected":""}`}
                      onClick={()=>{ setPCat(c.id); setCatOpen(false); }}>
                      <span className="cat-picker-icon">{c.icon}</span>
                      <span>{c.label}</span>
                      {pCat===c.id && <span className="cat-picker-check">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="fg"><label className="fl">Titre *</label><input className="fi" placeholder="Ex : Toyota Corolla 2020" value={pTitre} onChange={e=>setPTitre(e.target.value)}/></div>
          <div className="fg"><label className="fl">Prix (FCFA) *</label><input className="fi" placeholder="Ex : 2 500 000" value={pPrix} onChange={e=>setPPrix(e.target.value)}/></div>
          <div className="frow">
            <div className="fg">
              <label className="fl">Ville *</label>
              <div className="cat-picker">
                <button type="button" className="cat-picker-btn" onClick={()=>{ setVilleOpen(o=>!o); setCatOpen(false); }}>
                  <span style={!pVille ? {color:"var(--muted)"} : {}}>{pVille || `Ex : ${villes[0] || "Choisir une ville…"}`}</span>
                  <span className="cat-picker-arrow">{villeOpen ? "▲" : "▼"}</span>
                </button>
                {villeOpen && (
                  <div className="cat-picker-list">
                    {villes.map(v => (
                      <button type="button" key={v} className={`cat-picker-item${pVille===v?" selected":""}`}
                        onClick={()=>{ setPVille(v); setVilleOpen(false); }}>
                        <span>{v}</span>
                        {pVille===v && <span className="cat-picker-check">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="fg"><label className="fl">Quartier *</label><input className="fi" placeholder={`Ex : ${quartiersExemples[userPays] || "Ouaga 2000"}`} value={pQ} onChange={e=>setPQ(e.target.value)}/></div>
          </div>
          <div className="fg"><label className="fl">Description *</label><textarea className="fta" placeholder="Décrivez votre article…" value={pDesc} onChange={e=>setPDesc(e.target.value)}/></div>
          <PhotoUploader photos={pPhotos} setPhotos={setPPhotos} showToast={showToast}/>
          <div className="fg">
            <label className="utog">
              <div className={`tog${pUrg?" on":""}`} onClick={()=>setPUrg(p=>!p)}/>
              <span style={{fontSize:13,color:"var(--dark)",fontWeight:700}}>Marquer comme urgent</span>
            </label>
            <div className="fhint">1 annonce urgente gratuite par semaine</div>
          </div>
          <button className="fb" onClick={postAd} disabled={submitting}>{submitting ? "Enregistrement…" : editAd ? "Enregistrer les modifications →" : "Publier l'annonce →"}</button>
        </div>
      </div><Footer/>
    </div>
  </>);
}
