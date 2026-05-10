export const BottomNav = ({ page, setPage, catActive, setCat, favoris, unread = 0 }) => (
  <nav className="bottom-nav">
    <button className={`bnav-item${page === "home" && catActive !== "favoris" ? " on" : ""}`} onClick={() => { setPage("home"); setCat("tous"); }} style={{ position: "relative" }}>
      <span className="bnav-icon">🏠</span>
      <span className="bnav-label">Accueil</span>
    </button>
    <button className={`bnav-item${page === "messages" ? " on" : ""}`} onClick={() => setPage("messages")} style={{ position: "relative" }}>
      <span className="bnav-icon">💬</span>
      {unread > 0 && <span className="bnav-badge">{unread}</span>}
      <span className="bnav-label">Messages</span>
    </button>
    <button className="bnav-item bnav-post" onClick={() => setPage("post")} style={{ position: "relative" }}>
      <span className="bnav-icon">+</span>
      <span className="bnav-label">Publier</span>
    </button>
    <button className={`bnav-item${page === "home" && catActive === "favoris" ? " on" : ""}`} onClick={() => { setPage("home"); setCat("favoris"); }} style={{ position: "relative" }}>
      <span className="bnav-icon">{catActive === "favoris" ? "❤️" : "🤍"}</span>
      {favoris.length > 0 && <span className="bnav-badge">{favoris.length}</span>}
      <span className="bnav-label">Favoris</span>
    </button>
    <button className={`bnav-item${page === "profile" ? " on" : ""}`} onClick={() => setPage("profile")} style={{ position: "relative" }}>
      <span className="bnav-icon">👤</span>
      <span className="bnav-label">Profil</span>
    </button>
  </nav>
);
