import { useState, useRef } from "react";
import { categories, getVilles, getPays } from "../constants";
import { CardImage } from "../components/CardImage";
import { ModalImage } from "../components/ModalImage";
import { BottomNav } from "../components/BottomNav";
import { JagoLogo } from "../components/JagoLogo";

export function HomePage({
  user,
  userPays,
  annonces,
  filtered,
  paginatedAds,
  currentPage, setCurrentPage,
  totalPages,
  catActive, setCat,
  searchInput, setSI,
  search, setSearch,
  selected, setSelected,
  fullscreen, setFullscreen,
  favoris,
  toggleFavori,
  openAd,
  filtreVille, setFiltreVille,
  filtrePrixMin, setFiltrePrixMin,
  filtrePrixMax, setFiltrePrixMax,
  showFiltres, setShowFiltres,
  hasMore,
  loadMore,
  loadingMore,
  ratings,
  myRating, setMyRating,
  myComment, setMyComment,
  submitRating,
  avgRating,
  reportAd,
  startConversation,
  formatDate,
  unreadCount,
  page, setPage,
  signalModal, setSignalModal,
  signalRaison, setSignalRaison,
  submitReport,
  Header,
  Footer,
  OfflineBanner,
  Toast,
  SignalModal,
}) {
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showVilleMenu, setShowVilleMenu] = useState(false);
  const activeCatLabel = catActive === "tous" ? null : catActive === "favoris" ? "Favoris" : categories.find(c=>c.id===catActive)?.label;
  const villesDuPays = getVilles(userPays);
  const paysInfo = getPays(userPays);
  const resultsRef = useRef(null);

  const triggerSearch = () => {
    setSearch(searchInput);
    setCurrentPage(1);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  return (<>
    <OfflineBanner/><SignalModal/><Toast/>
    <div className="app"><Header/>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-logo-wrap">
          <JagoLogo variant="white" height={64}/>
        </div>
        <h1>Achète. Vends. Échanges.<br/><em>Entre particuliers.</em></h1>
        <div className="sbar">
          <input
            placeholder="téléphone, moto, maison, vêtements…"
            value={searchInput}
            onChange={e=>setSI(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter") triggerSearch();}}
          />
          <button onClick={triggerSearch}>Chercher</button>
        </div>
        {/* ── FILTRES & CATÉGORIES ── */}
        <div className="filter-row hero-filter-row">
          <div style={{position:"relative"}}>
            <button className={`filter-chip${catActive!=="tous"?" on":""}`} onClick={()=>{ setShowCatMenu(v=>!v); setShowVilleMenu(false); }}>
              {activeCatLabel || "Catégories"} <span style={{marginLeft:4,fontSize:10}}>{showCatMenu?"▲":"▼"}</span>
            </button>
            {showCatMenu && (
              <div className="cat-dropdown" onClick={()=>setShowCatMenu(false)}>
                <div className={`cat-drop-item${catActive==="tous"?" on":""}`}
                  onClick={()=>{setCat("tous");setCurrentPage(1);}}>
                  Toutes
                </div>
                {categories.map(c=>(
                  <div key={c.id} className={`cat-drop-item${catActive===c.id?" on":""}`}
                    onClick={()=>{setCat(c.id);setCurrentPage(1);}}>
                    {c.label}
                  </div>
                ))}
                <div className={`cat-drop-item${catActive==="favoris"?" on":""}`}
                  onClick={()=>{setCat("favoris");setCurrentPage(1);}}>
                  Favoris
                </div>
              </div>
            )}
          </div>
          <div style={{position:"relative"}}>
            <button className={`filter-chip${filtreVille!=="toutes"?" on":""}`} onClick={()=>{ setShowVilleMenu(v=>!v); setShowCatMenu(false); }}>
              {filtreVille!=="toutes" ? filtreVille : "Ville"} <span style={{marginLeft:4,fontSize:10}}>{showVilleMenu?"▲":"▼"}</span>
            </button>
            {showVilleMenu && (
              <div className="cat-dropdown" onClick={()=>setShowVilleMenu(false)}>
                <div className={`cat-drop-item${filtreVille==="toutes"?" on":""}`}
                  onClick={()=>{setFiltreVille("toutes");setCurrentPage(1);}}>
                  Toutes les villes
                </div>
                {villesDuPays.map(v=>(
                  <div key={v} className={`cat-drop-item${filtreVille===v?" on":""}`}
                    onClick={()=>{setFiltreVille(v);setCurrentPage(1);}}>
                    {v}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className={`filter-chip${showFiltres?" on":""}`} onClick={()=>{ setShowFiltres(f=>!f); setShowCatMenu(false); setShowVilleMenu(false); }}>
            Prix {(filtrePrixMin||filtrePrixMax) ? "·" : ""}
          </button>
          {search && (
            <button className="filter-chip" onClick={()=>{setSI("");setSearch("");setCurrentPage(1);}}>
              ✕ "{search}"
            </button>
          )}
          {(filtrePrixMin||filtrePrixMax) && (
            <button className="filter-chip" onClick={()=>{setFiltrePrixMin("");setFiltrePrixMax("");}}>
              ✕ Réinitialiser le prix
            </button>
          )}
        </div>
        {showFiltres && (
          <div className="filter-panel" style={{maxWidth:580,margin:"0 auto",width:"100%"}}>
            <div>
              <label className="filter-label">Prix min (FCFA)</label>
              <input className="fi" placeholder="Ex : 50 000" value={filtrePrixMin} onChange={e=>setFiltrePrixMin(e.target.value)}/>
            </div>
            <div>
              <label className="filter-label">Prix max (FCFA)</label>
              <input className="fi" placeholder="Ex : 5 000 000" value={filtrePrixMax} onChange={e=>setFiltrePrixMax(e.target.value)}/>
            </div>
            <button className="filter-reset" onClick={()=>{setFiltrePrixMin("");setFiltrePrixMax("");}}>
              Réinitialiser le prix
            </button>
          </div>
        )}
      </section>

      <div className="sec" ref={resultsRef}>
        {/* ── URGENTES ── */}
        {filtered.filter(a=>a.urgent).length > 0 && <>
          <div className="sec-title">Annonces urgentes</div>
          <div className="vedettes-scroll">
            {filtered.filter(a=>a.urgent).slice(0,12).map(a=>(
              <div key={a.id} className="vedette-card" onClick={()=>openAd(a)}>
                <div className="vedette-img">
                  {a.photos?.[0] && <img src={a.photos[0]} alt={a.titre} loading="lazy"/>}
                  {!a.photos?.[0] && <span style={{fontSize:42}}>{a.emoji}</span>}
                  <span className="vedette-badge">Urgent</span>
                </div>
                <div className="vedette-body">
                  <div className="vedette-title">{a.titre}</div>
                  <div className="vedette-prix">{a.prix}</div>
                </div>
              </div>
            ))}
          </div>
        </>}


        {filtered.length === 0
          ? <div className="empty">
              <div className="emsg">Aucune annonce trouvée</div>
              <div className="esub">Essayez d'autres critères de recherche</div>
            </div>
          : <>
            <div className="grid">{paginatedAds.map(a => (
              <div key={a.id} className="card" onClick={() => openAd(a)}>
                <div style={{position:"relative"}}>
                  <CardImage annonce={a}/>
                  {a.userId === user.uid && <span className="bmine">Ma annonce</span>}
                  <button className="fav-btn" onClick={e=>{e.stopPropagation();toggleFavori(a.id);}}>
                    {favoris.includes(a.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div className="cbody">
                  <div className="ctitle">{a.titre}</div>
                  <div className="cprix">{a.prix}</div>
                  <div className="clieu">{a.quartier}, {a.ville}</div>
                  <div className="cdesc">{a.description}</div>
                  <div className="cfoot">
                    <div className="cvend">
                      <strong>{a.vendeur}</strong>
                      <span style={{display:"flex",alignItems:"center",gap:4,marginTop:2}}>
                        <span style={{fontSize:10}}>{a.vues||0} vue{(a.vues||0)!==1?"s":""}</span>
                        <span style={{color:"var(--border)"}}>·</span>
                        {formatDate(a.createdAt)}
                      </span>
                    </div>
                    <button className="cbtn" onClick={e=>{e.stopPropagation();openAd(a);}}>Voir →</button>
                  </div>
                </div>
              </div>
            ))}</div>
            {hasMore && (
              <div style={{display:"flex",justifyContent:"center",margin:"12px 0 32px"}}>
                <button onClick={loadMore} disabled={loadingMore}
                  style={{padding:"12px 32px",borderRadius:"50px",border:"1.5px solid rgba(23,86,200,.4)",background:"rgba(23,86,200,.1)",color:"#7ab3ff",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'Montserrat',sans-serif"}}>
                  {loadingMore ? "Chargement…" : "Voir plus d'annonces"}
                </button>
              </div>
            )}
          </>
        }
      </div>

      {/* PLEIN ÉCRAN */}
      {fullscreen && (
        <div className="fullscreen-overlay" onClick={() => setFullscreen(null)}>
          <button className="fullscreen-close" onClick={() => setFullscreen(null)}>✕</button>
          <div className="fullscreen-hint">Appuie n'importe où pour fermer</div>
          <img src={fullscreen.photos[fullscreen.idx]} alt={`Photo ${fullscreen.idx + 1}`} className="fullscreen-img" onClick={e=>e.stopPropagation()}/>
          {fullscreen.photos.length > 1 && <>
            <button onClick={e=>{e.stopPropagation();setFullscreen(f=>({...f,idx:(f.idx-1+f.photos.length)%f.photos.length}))}} style={{position:"fixed",left:16,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.2)",color:"white",border:"none",borderRadius:"50%",width:48,height:48,fontSize:26,cursor:"pointer",zIndex:10000}}>‹</button>
            <button onClick={e=>{e.stopPropagation();setFullscreen(f=>({...f,idx:(f.idx+1)%f.photos.length}))}} style={{position:"fixed",right:16,top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.2)",color:"white",border:"none",borderRadius:"50%",width:48,height:48,fontSize:26,cursor:"pointer",zIndex:10000}}>›</button>
            <div style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,zIndex:10000}}>
              {fullscreen.photos.map((_,i)=><div key={i} onClick={e=>{e.stopPropagation();setFullscreen(f=>({...f,idx:i}));}} style={{width:9,height:9,borderRadius:"50%",background:i===fullscreen.idx?"white":"rgba(255,255,255,0.4)",cursor:"pointer"}}/>)}
            </div>
          </>}
        </div>
      )}

      {selected && (
        <div className="moverlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <ModalImage annonce={selected} onFullscreen={(photos, idx) => setFullscreen({photos, idx})}/>
            <div className="mbody">
              <div className="mtitle">{selected.titre}</div>
              <div className="mprix">{selected.prix}</div>
              <div className="mmeta">
                <span>{selected.quartier}, {selected.ville}</span>
                <span>{selected.vendeur}</span>
                <span>{formatDate(selected.createdAt)}</span>
                <span>{selected.vues||0} vue{(selected.vues||0)!==1?"s":""}</span>
              </div>
              <div className="mdesc">{selected.description}</div>

              <div className="macts">
                <button className="mclose" onClick={() => setSelected(null)}>Fermer</button>
                <button className="mclose" style={{color:"#f87171",borderColor:"rgba(239,68,68,.4)"}} onClick={()=>reportAd(selected)}>Signaler</button>
                <button className="mwa" onClick={()=>startConversation(selected)}>
                  Contacter le vendeur
                </button>
                <button className="mwa" style={{background:"rgba(18,140,126,.2)",color:"#34d399",borderColor:"rgba(18,140,126,.4)",flex:1}} onClick={async ()=>{
                  const txt = `${selected.titre}\n${selected.prix}\n${selected.quartier}, ${selected.ville}\n\n${selected.description}\n\nJago : https://appjago.com`;
                  if (navigator.share) {
                    try { await navigator.share({ title: selected.titre, text: txt }); } catch(e) {}
                  } else {
                    window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`, "_blank");
                  }
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <BottomNav page={page} setPage={setPage} catActive={catActive} setCat={setCat} favoris={favoris} unread={unreadCount}/>
      <Footer/>
    </div>
  </>);
}
