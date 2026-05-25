import { useState, useRef, useEffect } from "react";
import { db, auth, trackEvent } from "./firebase";
import {
  collection, addDoc, getDocs, query, orderBy, serverTimestamp, deleteDoc, doc, updateDoc,
  getDoc, setDoc, where, onSnapshot, limit, startAfter
} from "firebase/firestore";
import { signOut } from "firebase/auth";

import { ADMIN_UID, catEmojis, getPays } from "./constants";
import { styles } from "./styles";
import { useAuth } from "./hooks/useAuth";
import { JagoLogo } from "./components/JagoLogo";

import { PostPage }     from "./pages/PostPage";
import { ProfilePage }  from "./pages/ProfilePage";
import { AdminPage }    from "./pages/AdminPage";
import { MessagesPage } from "./pages/MessagesPage";
import { HomePage }     from "./pages/HomePage";

export default function Jago() {
  // ── Toast ──────────────────────────────────────────────────
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Auth ───────────────────────────────────────────────────
  const {
    user, loading,
    authErr, setAuthErr,
    submitting: authSubmitting,
    authTab, setAuthTab,
    lEmail, setLEmail,
    lPwd, setLPwd,
    rNom, setRNom,
    rPseudo, setRPseudo,
    rEmail, setREmail,
    rTel, setRTel,
    rWa, setRWa,
    rPwd, setRPwd,
    rPwd2, setRPwd2,
    rPays, setRPays, paysList,
    loginApple, forgotPassword, login, register,
  } = useAuth(showToast);

  // submitting for post operations (distinct from auth submitting)
  const [submitting, setSubmitting] = useState(false);

  // ── Pays utilisateur ───────────────────────────────────────
  const [userPays, setUserPays] = useState("bf");

  useEffect(() => {
    if (!user) return;
    const loadUserProfile = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists() && snap.data().pays) {
          setUserPays(snap.data().pays);
        }
      } catch(e) { console.error(e); }
    };
    loadUserProfile();
  }, [user]);

  // ── Network ────────────────────────────────────────────────
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on  = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online",  on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  // ── Navigation ─────────────────────────────────────────────
  const [page, setPage]           = useState("home");
  const navigate = (p) => { setPage(p); trackEvent("page_view", { page_title: p }); };
  const [catActive, setCat]       = useState("tous");
  const [searchInput, setSI]      = useState("");
  const [search, setSearch]       = useState("");
  const [selected, setSelected]   = useState(null);
  const [fullscreen, setFullscreen] = useState(null);

  // ── Annonces ───────────────────────────────────────────────
  const [annonces, setAnnonces]   = useState([]);
  const [lastDoc, setLastDoc]     = useState(null);
  const [hasMore, setHasMore]     = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const BATCH_SIZE = 50;

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, "annonces"), orderBy("createdAt", "desc"), limit(BATCH_SIZE));
        const snap = await getDocs(q);
        setAnnonces(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLastDoc(snap.docs[snap.docs.length - 1] || null);
        setHasMore(snap.docs.length === BATCH_SIZE);
      } catch(e) { console.error(e); }
    };
    load();
  }, []);

  const loadMore = async () => {
    if (!lastDoc || loadingMore) return;
    setLoadingMore(true);
    try {
      const q = query(collection(db, "annonces"), orderBy("createdAt", "desc"), startAfter(lastDoc), limit(BATCH_SIZE));
      const snap = await getDocs(q);
      setAnnonces(prev => [...prev, ...snap.docs.map(d => ({ id: d.id, ...d.data() }))]);
      setLastDoc(snap.docs[snap.docs.length - 1] || null);
      setHasMore(snap.docs.length === BATCH_SIZE);
    } catch(e) { console.error(e); }
    setLoadingMore(false);
  };

  // ── Favoris ────────────────────────────────────────────────
  const [favoris, setFavoris] = useState([]);
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const ref = doc(db, "favoris", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) setFavoris(snap.data().ids || []);
      } catch(e) { console.error(e); }
    };
    load();
  }, [user]);

  const toggleFavori = async (id) => {
    const ref = doc(db, "favoris", user.uid);
    const isFav = favoris.includes(id);
    try {
      await setDoc(ref, { ids: isFav ? favoris.filter(f=>f!==id) : [...favoris, id] }, { merge: true });
      setFavoris(p => isFav ? p.filter(f=>f!==id) : [...p, id]);
    } catch(e) { console.error(e); }
  };

  // ── Admin ──────────────────────────────────────────────────
  const isAdmin = user?.uid === ADMIN_UID;
  const [adminTab, setAdminTab]       = useState("annonces");
  const [signalements, setSignalements] = useState([]);
  const [allUsers, setAllUsers]       = useState([]);

  useEffect(() => {
    if (!isAdmin) return;
    const loadAdmin = async () => {
      try {
        const sigSnap = await getDocs(query(collection(db, "signalements"), orderBy("createdAt", "desc")));
        setSignalements(sigSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        const usersSnap = await getDocs(collection(db, "users"));
        setAllUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch(e) { console.error(e); }
    };
    loadAdmin();
  }, [isAdmin]);

  const adminDeleteAd = async (id) => {
    if (!window.confirm("Supprimer cette annonce ?")) return;
    try {
      await deleteDoc(doc(db, "annonces", id));
      setAnnonces(p => p.filter(a => a.id !== id));
    } catch(e) { showToast("Erreur : " + e.message, "error"); }
  };

  const adminDeleteSignalement = async (id) => {
    try {
      await deleteDoc(doc(db, "signalements", id));
      setSignalements(p => p.filter(s => s.id !== id));
    } catch(e) { showToast("Erreur : " + e.message, "error"); }
  };

  // ── Signalement ────────────────────────────────────────────
  const [signalModal, setSignalModal]   = useState(null);
  const [signalRaison, setSignalRaison] = useState("");

  const reportAd = (a) => { setSignalModal(a); setSignalRaison(""); };

  const submitReport = async () => {
    if (!signalRaison) return;
    try {
      await addDoc(collection(db, "signalements"), {
        annonceId: signalModal.id, titre: signalModal.titre,
        signalePar: user.uid, raison: signalRaison,
        createdAt: serverTimestamp()
      });
      setSignalModal(null);
      setSignalRaison("");
    } catch(e) { console.error(e); }
  };

  // ── Post ───────────────────────────────────────────────────
  const [pTitre, setPTitre]   = useState("");
  const [pCat,   setPCat]     = useState("immobilier");
  const [pPrix,  setPPrix]    = useState("");
  const [pVille, setPVille]   = useState("Ouagadougou");
  const [pQ,     setPQ]       = useState("");
  const [pDesc,  setPDesc]    = useState("");
  const [pUrg,   setPUrg]     = useState(false);
  const [pPhotos, setPPhotos] = useState([]);
  const [editAd, setEditAd]   = useState(null);
  const [postOk, setPostOk]   = useState(false);

  const startEdit = (a) => {
    setEditAd(a);
    setPTitre(a.titre); setPCat(a.categorie); setPPrix(a.prix.replace(" FCFA",""));
    setPVille(a.ville); setPQ(a.quartier); setPDesc(a.description);
    setPUrg(a.urgent); setPPhotos(a.photos||[]);
    setPage("post");
  };

  const postAd = async () => {
    if (!pTitre||!pPrix||!pQ||!pDesc) return;

    if (pUrg) {
      const uneSemaine = new Date();
      uneSemaine.setDate(uneSemaine.getDate() - 7);
      const annoncesUrgentes = annonces.filter(a =>
        a.userId === user.uid && a.urgent === true &&
        a.createdAt?.toDate && a.createdAt.toDate() > uneSemaine
      );
      if (annoncesUrgentes.length >= 1 && !editAd) {
        showToast("Annonce urgente déjà utilisée cette semaine. Revenez dans 7 jours !", "warn");
        return;
      }
    }

    trackEvent("post_ad_start", { category: pCat, pays: userPays, urgent: pUrg });
    setSubmitting(true);
    try {
      if (editAd) {
        const updates = {
          categorie:pCat, titre:pTitre, prix:pPrix+" FCFA",
          ville:pVille, quartier:pQ, description:pDesc,
          urgent:pUrg, emoji:catEmojis[pCat], photos:pPhotos,
        };
        await updateDoc(doc(db,"annonces",editAd.id), updates);
        setAnnonces(p => p.map(a => a.id===editAd.id ? {...a,...updates} : a));
        setEditAd(null);
        setPTitre(""); setPPrix(""); setPQ(""); setPDesc(""); setPUrg(false); setPPhotos([]);
        setPostOk(true);
        setTimeout(() => { setPostOk(false); setPage("profile"); }, 2000);
      } else {
        const na = {
          categorie: pCat, titre: pTitre, prix: pPrix + " FCFA",
          ville: pVille, quartier: pQ, description: pDesc,
          whatsapp: rWa || rTel || user.email,
          vendeur: user.displayName || user.email,
          urgent: pUrg, emoji: catEmojis[pCat],
          pays: userPays,
          userId: user.uid, photos: pPhotos,
          createdAt: serverTimestamp()
        };
        const docRef = await addDoc(collection(db, "annonces"), na);
        setAnnonces(p => [{ id: docRef.id, ...na, date: "À l'instant" }, ...p]);
        setPTitre(""); setPPrix(""); setPQ(""); setPDesc(""); setPUrg(false); setPPhotos([]);
        setPostOk(true);
        setTimeout(() => { setPostOk(false); setPage("home"); }, 2000);
      }
    } catch(e) { showToast("Erreur : " + e.message, "error"); }
    setSubmitting(false);
  };

  // ── Messagerie ─────────────────────────────────────────────
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv]       = useState(null);
  const [messages, setMessages]           = useState([]);
  const [newMsg, setNewMsg]               = useState("");
  const [unreadCount, setUnreadCount]     = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "conversations"), where("participants", "array-contains", user.uid), orderBy("lastMessageAt", "desc"));
    const unsub = onSnapshot(q, snap => {
      const convs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setConversations(convs);
      setUnreadCount(convs.filter(c => c.lastSenderId !== user.uid && !c[`read_${user.uid}`]).length);
    });
    return unsub;
  }, [user]);

  useEffect(() => {
    if (!activeConv) return;
    const q = query(collection(db, "conversations", activeConv.id, "messages"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
    updateDoc(doc(db, "conversations", activeConv.id), { [`read_${user.uid}`]: true });
    return unsub;
  }, [activeConv]);

  const startConversation = async (annonce) => {
    const convId = [user.uid, annonce.userId].sort().join("_") + "_" + annonce.id;
    const convRef = doc(db, "conversations", convId);
    const convSnap = await getDoc(convRef);
    if (!convSnap.exists()) {
      await setDoc(convRef, {
        participants: [user.uid, annonce.userId],
        buyerId: user.uid, buyerName: user.displayName,
        sellerId: annonce.userId, sellerName: annonce.vendeur,
        annonceId: annonce.id, annonceTitre: annonce.titre,
        lastMessage: "", lastMessageAt: serverTimestamp(),
        lastSenderId: "", [`read_${user.uid}`]: true, [`read_${annonce.userId}`]: false,
      });
    }
    setActiveConv({ id: convId, annonceTitre: annonce.titre, buyerName: user.displayName, sellerName: annonce.vendeur, sellerId: annonce.userId, buyerId: user.uid });
    setSelected(null);
    setPage("messages");
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !activeConv) return;
    const txt = newMsg.trim();
    trackEvent("send_message", { conv_id: activeConv.id });
    setNewMsg("");
    try {
      await addDoc(collection(db, "conversations", activeConv.id, "messages"), {
        text: txt, senderId: user.uid, senderName: user.displayName, createdAt: serverTimestamp()
      });
      const otherUid = activeConv.sellerId === user.uid ? activeConv.buyerId : activeConv.sellerId;
      await updateDoc(doc(db, "conversations", activeConv.id), {
        lastMessage: txt, lastMessageAt: serverTimestamp(),
        lastSenderId: user.uid, [`read_${user.uid}`]: true, [`read_${otherUid}`]: false,
      });
    } catch(e) { console.error(e); }
  };

  const getOtherName = (conv) => conv.sellerId === user.uid ? conv.buyerName : conv.sellerName;

  // ── Ratings ────────────────────────────────────────────────
  const [ratings, setRatings]         = useState([]);
  const [myRating, setMyRating]       = useState(0);
  const [myComment, setMyComment]     = useState("");
  const [ratingTarget, setRatingTarget] = useState(null);

  const loadRatings = async (sellerId) => {
    try {
      const q = query(collection(db, "ratings"), where("sellerId", "==", sellerId), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setRatings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setRatingTarget(sellerId);
      setMyRating(0); setMyComment("");
    } catch(e) { console.error(e); }
  };

  const submitRating = async (sellerId) => {
    if (!myRating) { showToast("Veuillez choisir une note !", "warn"); return; }
    if (sellerId === user.uid) { showToast("Vous ne pouvez pas vous noter vous-même !", "warn"); return; }
    try {
      const existing = ratings.find(r => r.buyerId === user.uid);
      if (existing) {
        await updateDoc(doc(db, "ratings", existing.id), { note: myRating, commentaire: myComment, createdAt: serverTimestamp() });
        setRatings(p => p.map(r => r.id === existing.id ? { ...r, note: myRating, commentaire: myComment } : r));
      } else {
        const newR = { sellerId, buyerId: user.uid, buyerName: user.displayName, note: myRating, commentaire: myComment, createdAt: serverTimestamp() };
        const ref = await addDoc(collection(db, "ratings"), newR);
        setRatings(p => [{ id: ref.id, ...newR }, ...p]);
      }
      setMyRating(0); setMyComment("");
      showToast("✅ Merci pour votre avis !");
    } catch(e) { showToast("Erreur : " + e.message, "error"); }
  };

  const avgRating = (rList) => {
    if (!rList.length) return 0;
    return (rList.reduce((s, r) => s + r.note, 0) / rList.length).toFixed(1);
  };

  // ── Filtres / Pagination ───────────────────────────────────
  const [filtreVille, setFiltreVille]     = useState("toutes");
  const [filtrePrixMin, setFiltrePrixMin] = useState("");
  const [filtrePrixMax, setFiltrePrixMax] = useState("");
  const [showFiltres, setShowFiltres]     = useState(false);
  const [currentPage, setCurrentPage]     = useState(1);
  const ADS_PER_PAGE = 9;

  const myAds = annonces.filter(a => a.userId === user?.uid);
  const filtered = annonces.filter(a => {
    // Filtre pays : les annonces sans champ `pays` sont considérées comme Burkina (rétrocompat)
    const aPays = a.pays || "bf";
    if (aPays !== userPays) return false;
    const mc = catActive === "tous" || (catActive === "favoris" ? favoris.includes(a.id) : a.categorie === catActive);
    const ms = search === "" || [a.titre, a.description, a.ville].some(s => s?.toLowerCase().includes(search.toLowerCase()));
    const mv = filtreVille === "toutes" || a.ville === filtreVille;
    const prix = parseInt(a.prix?.replace(/\D/g,"")) || 0;
    const mp = (!filtrePrixMin || prix >= parseInt(filtrePrixMin.replace(/\D/g,"")||0)) &&
               (!filtrePrixMax || prix <= parseInt(filtrePrixMax.replace(/\D/g,"")||99999999999));
    return mc && ms && mv && mp;
  });

  const totalPages  = Math.ceil(filtered.length / ADS_PER_PAGE);
  const paginatedAds = filtered.slice((currentPage-1)*ADS_PER_PAGE, currentPage*ADS_PER_PAGE);

  const formatDate = (ts) => {
    if (!ts) return "À l'instant";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    const diff = Math.floor((Date.now() - d) / 60000);
    if (diff < 60) return `Il y a ${diff} min`;
    if (diff < 1440) return `Il y a ${Math.floor(diff/60)} h`;
    return `Il y a ${Math.floor(diff/1440)} j`;
  };

  // ── Ouvrir une annonce ─────────────────────────────────────
  const openAd = async (a) => {
    setSelected(a);
    loadRatings(a.userId);
    trackEvent("view_item", { item_id: a.id, item_name: a.titre, item_category: a.categorie, item_variant: a.pays });
    try {
      const ref = doc(db, "annonces", a.id);
      await updateDoc(ref, { vues: (a.vues || 0) + 1 });
      setAnnonces(p => p.map(x => x.id === a.id ? {...x, vues: (x.vues||0)+1} : x));
    } catch(e) { console.error(e); }
  };

  // ── Delete ─────────────────────────────────────────────────
  const deleteAd = async (id) => {
    if (!window.confirm("Supprimer cette annonce ?")) return;
    try {
      await deleteDoc(doc(db, "annonces", id));
      setAnnonces(p => p.filter(a => a.id !== id));
    } catch(e) { showToast("Erreur : " + e.message, "error"); }
  };

  // ── Logout ─────────────────────────────────────────────────
  const logout = () => {
    signOut(auth);
    setPage("home");
    setFavoris([]);
  };

  // ── Push Notifications (iOS natif) ─────────────────────────
  useEffect(() => {
    if (!user) return;
    const isNative = !!(window.Capacitor?.isNativePlatform?.());
    if (!isNative) return;
    const initPush = async () => {
      try {
        const { PushNotifications } = await import("@capacitor/push-notifications");
        const perm = await PushNotifications.requestPermissions();
        if (perm.receive !== "granted") return;

        // Ajouter les listeners AVANT register() pour ne pas rater l'event
        PushNotifications.addListener("registration", async (token) => {
          const platform = window.Capacitor?.getPlatform?.() || "unknown";
          // Android → FCM token, iOS → APNs token
          const tokenKey = platform === "android" ? "fcmToken" : "apnsToken";
          console.log(`Token ${platform} (${tokenKey}):`, token.value);
          try {
            await setDoc(doc(db, "users", user.uid), { [tokenKey]: token.value }, { merge: true });
            console.log(`${tokenKey} sauvegardé`);
          } catch (e) {
            console.error("Erreur sauvegarde token push:", e);
          }
        });
        PushNotifications.addListener("registrationError", (err) => {
          console.error("Erreur d'enregistrement push:", JSON.stringify(err));
        });
        PushNotifications.addListener("pushNotificationReceived", (notification) => {
          showToast(`💬 ${notification.title}: ${notification.body}`, "info");
        });
        PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
          const data = action.notification.data;
          if (data?.page === "messages") setPage("messages");
        });

        await PushNotifications.register();
      } catch (e) { console.log("Push notifications non disponibles:", e); }
    };
    initPush();
  }, [user]);

  // ── Shared UI fragments ────────────────────────────────────
  const OfflineBanner = () => !isOnline ? (
    <div className="offline-banner">
      <span>📵</span> Pas de connexion internet — certaines fonctions sont indisponibles
    </div>
  ) : null;

  const Toast = () => toast ? (
    <div className={`toast ${toast.type}`}>{toast.msg}</div>
  ) : null;

  const SignalModal = () => signalModal ? (
    <div className="signal-overlay" onClick={()=>setSignalModal(null)}>
      <div className="signal-box" onClick={e=>e.stopPropagation()}>
        <h3>Signaler cette annonce</h3>
        <div className="signal-options">
          {["Fausse annonce","Prix abusif","Contenu inapproprié","Arnaque","Autre"].map(r=>(
            <div key={r} className={`signal-opt${signalRaison===r?" on":""}`} onClick={()=>setSignalRaison(r)}>
              <span>{r}</span>
            </div>
          ))}
        </div>
        <div className="signal-btns">
          <button className="signal-cancel" onClick={()=>setSignalModal(null)}>Annuler</button>
          <button className="signal-submit" onClick={submitReport} disabled={!signalRaison}>Signaler</button>
        </div>
      </div>
    </div>
  ) : null;

  const Header = ({ showPost = true }) => (
    <header className="hdr"><div className="hdr-in">
      <div style={{cursor:"pointer",flexShrink:0}} onClick={() => setPage("home")}><JagoLogo variant="white" height={38}/></div>
      <div className="hdr-r">
        {isAdmin && <button className="btn-o" style={{borderColor:"#7C3AED",color:"#a78bfa"}} onClick={()=>setPage("admin")}>Admin</button>}
        <button className="btn-o hdr-mobile-hide" style={{position:"relative"}} onClick={() => setPage("messages")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          {unreadCount>0&&<span style={{position:"absolute",top:-4,right:-4,background:"var(--red)",color:"white",fontSize:9,fontWeight:800,width:16,height:16,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{unreadCount}</span>}
        </button>
        <button className="btn-o hdr-mobile-hide" onClick={() => setPage("profile")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
        {showPost && <button className="btn-p hdr-mobile-hide" onClick={() => setPage("post")}>+ Annonce</button>}
        <button className="btn-o" onClick={logout} title="Déconnexion">⏻</button>
      </div>
    </div></header>
  );

  const Footer = () => (
    <footer className="footer"><strong>Jago</strong> &nbsp;·&nbsp; Vente entre particuliers · UEMOA · 2026</footer>
  );

  // ── Loading ────────────────────────────────────────────────
  if (loading) return <div className="loading">Chargement…</div>;

  // ── Auth screen ────────────────────────────────────────────
  if (!user) return (<><style>{styles}</style>
    <OfflineBanner/><Toast/>
    <div className="auth-wrap"><div className="auth-box">
      <div className="auth-logo-wrap"><JagoLogo variant="color" height={56}/></div>
      <div className="tabs">
        <button className={`tab${authTab==="login"?" on":""}`} onClick={() => { setAuthTab("login"); setAuthErr(""); }}>Se connecter</button>
        <button className={`tab${authTab==="register"?" on":""}`} onClick={() => { setAuthTab("register"); setAuthErr(""); }}>S'inscrire</button>
      </div>
      {authErr && <div className="ferr">{authErr}</div>}
      <button className="apple-btn" onClick={loginApple} disabled={authSubmitting}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
        Continuer avec Apple
      </button>
      <div className="divider">ou</div>
      {authTab === "login" ? <>
        <div className="fg"><label className="fl">Email</label><input className="fi" type="email" placeholder="votre@email.com" value={lEmail} onChange={e=>setLEmail(e.target.value)}/></div>
        <div className="fg"><label className="fl">Mot de passe</label><input className="fi" type="password" placeholder="••••••••" value={lPwd} onChange={e=>setLPwd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()}/></div>
        <div style={{textAlign:"right",marginBottom:8}}>
          <span onClick={forgotPassword} style={{fontSize:12,color:"var(--blue)",cursor:"pointer",fontWeight:700}}>Mot de passe oublié ?</span>
        </div>
        <button className="fb" onClick={login} disabled={authSubmitting}>{authSubmitting ? "Connexion…" : "Se connecter →"}</button>
      </> : <>
        <div className="fg">
          <label className="fl">Choisis ton pays *</label>
          <div className="pays-grid">
            {paysList.map(p => (
              <div key={p.id} className={`pays-card${rPays===p.id?" on":""}`} onClick={()=>setRPays(p.id)}>
                <img className="pays-flag" src={`https://flagcdn.com/w40/${p.id}.png`} alt={p.label}/>
                <span className="pays-name">{p.label}</span>
              </div>
            ))}
          </div>
          <div className="fhint">Ton marché local — modifiable dans les paramètres</div>
        </div>
        <div className="fg"><label className="fl">Nom complet *</label><input className="fi" placeholder="Ex : Moussa Kaboré" value={rNom} onChange={e=>setRNom(e.target.value)}/><div className="fhint">Non visible par les autres utilisateurs</div></div>
        <div className="fg"><label className="fl">Pseudo *</label><input className="fi" placeholder="Ex : moussa_bf" value={rPseudo} onChange={e=>setRPseudo(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,""))}/><div className="fhint">Visible publiquement · 3-20 caractères, lettres, chiffres, _</div></div>
        <div className="fg"><label className="fl">Email *</label><input className="fi" type="email" placeholder="votre@email.com" value={rEmail} onChange={e=>setREmail(e.target.value)}/></div>
        <div className="fg"><label className="fl">Numéro de téléphone *</label>
          <div style={{display:"flex",gap:6}}>
            <span className="fi" style={{width:"auto",flexShrink:0,display:"flex",alignItems:"center",paddingLeft:10,paddingRight:10,color:"var(--gray4)",fontWeight:600}}>
              {paysList.find(p=>p.id===rPays)?.indicatif || "+226"}
            </span>
            <input className="fi" style={{flex:1}} placeholder="Ex : 70123456" value={rTel} onChange={e=>setRTel(e.target.value)}/>
          </div>
        </div>
        <div className="fg"><label className="fl">Numéro WhatsApp (optionnel)</label>
          <div style={{display:"flex",gap:6}}>
            <span className="fi" style={{width:"auto",flexShrink:0,display:"flex",alignItems:"center",paddingLeft:10,paddingRight:10,color:"var(--gray4)",fontWeight:600}}>
              {paysList.find(p=>p.id===rPays)?.indicatif || "+226"}
            </span>
            <input className="fi" style={{flex:1}} placeholder="Ex : 70123456" value={rWa} onChange={e=>setRWa(e.target.value)}/>
          </div>
          <div className="fhint">Laisser vide = même que téléphone</div>
        </div>
        <div className="fg"><label className="fl">Mot de passe *</label><input className="fi" type="password" placeholder="Minimum 6 caractères" value={rPwd} onChange={e=>setRPwd(e.target.value)}/></div>
        <div className="fg"><label className="fl">Confirmer le mot de passe *</label><input className="fi" type="password" placeholder="Répète ton mot de passe" value={rPwd2} onChange={e=>setRPwd2(e.target.value)} style={{borderColor: rPwd2 && rPwd !== rPwd2 ? "var(--red)" : rPwd2 && rPwd === rPwd2 ? "var(--green)" : ""}}/>{rPwd2 && rPwd !== rPwd2 && <div className="fhint" style={{color:"var(--red)"}}>Les mots de passe ne correspondent pas</div>}{rPwd2 && rPwd === rPwd2 && <div className="fhint" style={{color:"var(--green)"}}>Mots de passe identiques</div>}</div>
        <button className="fb" onClick={register} disabled={authSubmitting}>{authSubmitting ? "Création…" : "Créer mon compte →"}</button>
      </>}
    </div></div>
  </>);

  // ── Pages ──────────────────────────────────────────────────
  if (page === "post") return (
    <PostPage
      user={user} isOnline={isOnline}
      userPays={userPays}
      page={page} setPage={setPage}
      editAd={editAd} setEditAd={setEditAd}
      pTitre={pTitre} setPTitre={setPTitre}
      pCat={pCat} setPCat={setPCat}
      pPrix={pPrix} setPPrix={setPPrix}
      pVille={pVille} setPVille={setPVille}
      pQ={pQ} setPQ={setPQ}
      pDesc={pDesc} setPDesc={setPDesc}
      pUrg={pUrg} setPUrg={setPUrg}
      pPhotos={pPhotos} setPPhotos={setPPhotos}
      postOk={postOk} submitting={submitting}
      postAd={postAd}
      showToast={showToast}
      Header={Header} Footer={Footer}
      OfflineBanner={OfflineBanner} Toast={Toast}
    />
  );

  if (page === "profile") return (
    <ProfilePage
      user={user}
      userPays={userPays}
      myAds={myAds}
      setSelected={setSelected}
      startEdit={startEdit}
      deleteAd={deleteAd}
      setPage={setPage}
      Header={Header} Footer={Footer}
      OfflineBanner={OfflineBanner} Toast={Toast}
    />
  );

  if (page === "admin" && isAdmin) return (
    <AdminPage
      annonces={annonces}
      allUsers={allUsers}
      signalements={signalements}
      adminTab={adminTab} setAdminTab={setAdminTab}
      adminDeleteAd={adminDeleteAd}
      adminDeleteSignalement={adminDeleteSignalement}
      setPage={setPage}
      Header={Header} Footer={Footer}
    />
  );

  if (page === "messages") return (
    <MessagesPage
      user={user}
      conversations={conversations}
      activeConv={activeConv} setActiveConv={setActiveConv}
      messages={messages}
      newMsg={newMsg} setNewMsg={setNewMsg}
      sendMessage={sendMessage}
      getOtherName={getOtherName}
      messagesEndRef={messagesEndRef}
      unreadCount={unreadCount}
      page={page} setPage={setPage}
      catActive={catActive} setCat={setCat}
      favoris={favoris}
      Header={Header} Footer={Footer}
      OfflineBanner={OfflineBanner} Toast={Toast}
    />
  );

  return (
    <HomePage
      user={user}
      userPays={userPays}
      annonces={annonces}
      filtered={filtered}
      paginatedAds={paginatedAds}
      currentPage={currentPage} setCurrentPage={setCurrentPage}
      totalPages={totalPages}
      catActive={catActive} setCat={setCat}
      searchInput={searchInput} setSI={setSI}
      search={search} setSearch={setSearch}
      selected={selected} setSelected={setSelected}
      fullscreen={fullscreen} setFullscreen={setFullscreen}
      favoris={favoris}
      toggleFavori={toggleFavori}
      openAd={openAd}
      filtreVille={filtreVille} setFiltreVille={setFiltreVille}
      filtrePrixMin={filtrePrixMin} setFiltrePrixMin={setFiltrePrixMin}
      filtrePrixMax={filtrePrixMax} setFiltrePrixMax={setFiltrePrixMax}
      showFiltres={showFiltres} setShowFiltres={setShowFiltres}
      hasMore={hasMore}
      loadMore={loadMore}
      loadingMore={loadingMore}
      ratings={ratings}
      myRating={myRating} setMyRating={setMyRating}
      myComment={myComment} setMyComment={setMyComment}
      submitRating={submitRating}
      avgRating={avgRating}
      reportAd={reportAd}
      startConversation={startConversation}
      formatDate={formatDate}
      unreadCount={unreadCount}
      page={page} setPage={setPage}
      signalModal={signalModal} setSignalModal={setSignalModal}
      signalRaison={signalRaison} setSignalRaison={setSignalRaison}
      submitReport={submitReport}
      Header={Header} Footer={Footer}
      OfflineBanner={OfflineBanner} Toast={Toast}
      SignalModal={SignalModal}
    />
  );
}
