import { styles } from "../styles";
import { categories, villes, catEmojis } from "../constants";
import { PhotoUploader } from "../components/PhotoUploader";

export function PostPage({
  user,
  isOnline,
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
  return (<><style>{styles}</style>
    <OfflineBanner/><Toast/>
    <div className="app"><Header showPost={false}/>
      <div className="pscreen">
        <button className="pback" onClick={() => setPage("home")}>← Retour</button>
        {postOk && <div className="succ">✅ Annonce publiée !</div>}
        <div className="pcard">
          <div className="ptitle">{editAd ? "✏️ Modifier l'annonce" : "📝 Déposer une annonce"}</div>
          <div className="fg"><label className="fl">Catégorie *</label><select className="fs" value={pCat} onChange={e=>setPCat(e.target.value)}>{categories.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}</select></div>
          <div className="fg"><label className="fl">Titre *</label><input className="fi" placeholder="Ex : Toyota Corolla 2020" value={pTitre} onChange={e=>setPTitre(e.target.value)}/></div>
          <div className="fg"><label className="fl">Prix (FCFA) *</label><input className="fi" placeholder="Ex : 2 500 000" value={pPrix} onChange={e=>setPPrix(e.target.value)}/></div>
          <div className="frow">
            <div className="fg"><label className="fl">Ville *</label><select className="fs" value={pVille} onChange={e=>setPVille(e.target.value)}>{villes.map(v=><option key={v}>{v}</option>)}</select></div>
            <div className="fg"><label className="fl">Quartier *</label><input className="fi" placeholder="Ex : Ouaga 2000" value={pQ} onChange={e=>setPQ(e.target.value)}/></div>
          </div>
          <div className="fg"><label className="fl">Description *</label><textarea className="fta" placeholder="Décrivez votre article…" value={pDesc} onChange={e=>setPDesc(e.target.value)}/></div>
          <PhotoUploader photos={pPhotos} setPhotos={setPPhotos} showToast={showToast}/>
          <div className="fg">
            <label className="utog">
              <div className={`tog${pUrg?" on":""}`} onClick={()=>setPUrg(p=>!p)}/>
              <span style={{fontSize:13,color:"var(--dark)",fontWeight:700}}>⚡ Marquer comme urgent</span>
            </label>
            <div className="fhint">1 annonce urgente gratuite par semaine</div>
          </div>
          <button className="fb" onClick={postAd} disabled={submitting}>{submitting ? "Enregistrement…" : editAd ? "Enregistrer les modifications →" : "Publier l'annonce →"}</button>
        </div>
      </div><Footer/>
    </div>
  </>);
}
