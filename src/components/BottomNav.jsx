const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const IconMsg = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);
const IconHeart = ({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);
const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export const BottomNav = ({ page, setPage, catActive, setCat, favoris, unread = 0 }) => (
  <nav className="bottom-nav" aria-label="Navigation principale">
    <button aria-label="Accueil" className={`bnav-item${page === "home" && catActive !== "favoris" ? " on" : ""}`} onClick={() => { setPage("home"); setCat("tous"); }} style={{ position: "relative" }}>
      <span className="bnav-icon"><IconHome/></span>
      <span className="bnav-label">Accueil</span>
    </button>
    <button aria-label={`Messages${unread > 0 ? ` (${unread} non lus)` : ""}`} className={`bnav-item${page === "messages" ? " on" : ""}`} onClick={() => setPage("messages")} style={{ position: "relative" }}>
      <span className="bnav-icon"><IconMsg/></span>
      {unread > 0 && <span className="bnav-badge" aria-hidden="true">{unread}</span>}
      <span className="bnav-label">Messages</span>
    </button>
    <button aria-label="Publier une annonce" className="bnav-item bnav-post" onClick={() => setPage("post")} style={{ position: "relative" }}>
      <span className="bnav-icon">+</span>
      <span className="bnav-label">Publier</span>
    </button>
    <button aria-label={`Favoris${favoris.length > 0 ? ` (${favoris.length})` : ""}`} className={`bnav-item${page === "home" && catActive === "favoris" ? " on" : ""}`} onClick={() => { setPage("home"); setCat("favoris"); }} style={{ position: "relative" }}>
      <span className="bnav-icon"><IconHeart filled={catActive === "favoris"}/></span>
      {favoris.length > 0 && <span className="bnav-badge" aria-hidden="true">{favoris.length}</span>}
      <span className="bnav-label">Favoris</span>
    </button>
    <button aria-label="Mon profil" className={`bnav-item${page === "profile" ? " on" : ""}`} onClick={() => setPage("profile")} style={{ position: "relative" }}>
      <span className="bnav-icon"><IconUser/></span>
      <span className="bnav-label">Profil</span>
    </button>
  </nav>
);
