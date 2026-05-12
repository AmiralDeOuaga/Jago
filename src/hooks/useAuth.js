import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithCredential,
  getRedirectResult,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export function useAuth(showToast) {
  const [user, setUser]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [authErr, setAuthErr]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [authTab, setAuthTab]     = useState("login");

  // Auth fields
  const [lEmail, setLEmail] = useState("");
  const [lPwd, setLPwd]     = useState("");
  const [rNom, setRNom]     = useState("");
  const [rEmail, setREmail] = useState("");
  const [rTel, setRTel]     = useState("");
  const [rWa, setRWa]       = useState("");
  const [rPwd, setRPwd]     = useState("");

  // Auth listener + récupération résultat redirect Google (web + Android)
  useEffect(() => {
    const platform = window.Capacitor?.getPlatform?.() || window.Capacitor?.platform || "web";
    // iOS natif gère le résultat directement — pas besoin de redirect
    if (platform !== "ios") {
      getRedirectResult(auth).then(async (cred) => {
        if (cred?.user) {
          const ref = doc(db, "users", cred.user.uid);
          const snap = await getDoc(ref);
          if (!snap.exists()) {
            await setDoc(ref, {
              uid: cred.user.uid,
              nom: cred.user.displayName,
              email: cred.user.email,
              tel: "", whatsapp: "",
              createdAt: serverTimestamp()
            });
          }
        }
      }).catch(() => {});
    }

    const timeout = setTimeout(() => setLoading(false), 5000);
    const unsub = onAuthStateChanged(auth, u => {
      clearTimeout(timeout);
      setUser(u);
      setLoading(false);
    });
    return () => { unsub(); clearTimeout(timeout); };
  }, []);

  const loginGoogle = async () => {
    setAuthErr(""); setSubmitting(true);
    try {
      const platform = window.Capacitor?.getPlatform?.() || window.Capacitor?.platform || "web";
      let firebaseCred;

      if (platform === "ios") {
        // iOS natif — plugin Swift GoogleSignIn
        const { GoogleSignInPlugin } = window.Capacitor.Plugins;
        const result = await GoogleSignInPlugin.signIn();
        firebaseCred = await signInWithCredential(auth, GoogleAuthProvider.credential(result.idToken));

      } else if (platform === "android") {
        // Android WebView — redirect vers Chrome Custom Tabs
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
        setSubmitting(false);
        return; // résultat capturé au prochain chargement via getRedirectResult

      } else {
        // Web — popup standard
        const provider = new GoogleAuthProvider();
        firebaseCred = await signInWithPopup(auth, provider);
      }

      if (firebaseCred?.user) {
        const ref = doc(db, "users", firebaseCred.user.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(ref, {
            uid: firebaseCred.user.uid,
            nom: firebaseCred.user.displayName,
            email: firebaseCred.user.email,
            tel: "", whatsapp: "",
            createdAt: serverTimestamp()
          });
        }
      }
    } catch(e) {
      console.error("Google login error:", e);
      setAuthErr("Erreur de connexion Google. Vérifie ta connexion internet.");
    }
    setSubmitting(false);
  };

  const loginApple = async () => {
    setAuthErr(""); setSubmitting(true);
    try {
      const isCapacitor = !!(window.Capacitor?.isNativePlatform?.());
      let firebaseCred;
      if (isCapacitor) {
        const { SignInWithApple } = window.Capacitor.Plugins;
        const result = await SignInWithApple.authorize({ scopes: "name email" });
        const r = result.response;
        const provider = new OAuthProvider("apple.com");
        const credential = provider.credential({
          idToken: r.identityToken,
          rawNonce: r.nonce,
        });
        firebaseCred = await signInWithCredential(auth, credential);
      } else {
        const provider = new OAuthProvider("apple.com");
        provider.addScope("email");
        provider.addScope("name");
        firebaseCred = await signInWithPopup(auth, provider);
      }
      const ref = doc(db, "users", firebaseCred.user.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        const displayName = firebaseCred.user.displayName ||
          (firebaseCred.user.providerData[0]?.displayName) || "Utilisateur Apple";
        await setDoc(ref, {
          uid: firebaseCred.user.uid,
          nom: displayName,
          email: firebaseCred.user.email || "",
          tel: "", whatsapp: "",
          createdAt: serverTimestamp()
        });
      }
    } catch(e) {
      console.error("Apple login error:", e);
      if (e.code !== "ERR_CANCELED" && e.message !== "The operation was canceled.") {
        setAuthErr("Erreur de connexion Apple. Réessaie.");
      }
    }
    setSubmitting(false);
  };

  const forgotPassword = async () => {
    if (!lEmail) { setAuthErr("Entre ton email pour réinitialiser ton mot de passe."); return; }
    try {
      await sendPasswordResetEmail(auth, lEmail);
      setAuthErr("");
      showToast(`📧 Email envoyé à ${lEmail}`);
    } catch(e) {
      setAuthErr("Email introuvable. Vérifie l'adresse saisie.");
    }
  };

  const login = async () => {
    setAuthErr(""); setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, lEmail, lPwd);
    } catch(e) {
      if (e.code === "auth/user-not-found" || e.code === "auth/wrong-password" || e.code === "auth/invalid-credential") {
        setAuthErr("Email ou mot de passe incorrect.");
      } else if (e.code === "auth/too-many-requests") {
        setAuthErr("Trop de tentatives. Réessaie dans quelques minutes.");
      } else if (e.code === "auth/network-request-failed") {
        setAuthErr("Pas de connexion internet. Vérifie ton réseau.");
      } else if (e.code === "auth/user-disabled") {
        setAuthErr("Ce compte a été désactivé.");
      } else {
        setAuthErr("Erreur de connexion. Réessaie.");
      }
    }
    setSubmitting(false);
  };

  const register = async () => {
    setAuthErr(""); setSubmitting(true);
    if (!rNom||!rEmail||!rTel||!rPwd) { setAuthErr("Veuillez remplir tous les champs obligatoires."); setSubmitting(false); return; }
    try {
      const cred = await createUserWithEmailAndPassword(auth, rEmail, rPwd);
      await updateProfile(cred.user, { displayName: rNom });
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid, nom: rNom, email: rEmail,
        tel: rTel, whatsapp: rWa || rTel, createdAt: serverTimestamp()
      });
    } catch(e) {
      if (e.code === "auth/email-already-in-use") {
        setAuthErr("Cet email est déjà utilisé.");
      } else if (e.code === "auth/weak-password") {
        setAuthErr("Le mot de passe doit contenir au moins 6 caractères.");
      } else if (e.code === "auth/network-request-failed") {
        setAuthErr("Pas de connexion internet. Vérifie ton réseau.");
      } else {
        setAuthErr("Erreur lors de l'inscription. Réessaie.");
      }
    }
    setSubmitting(false);
  };

  const logout = (onLogout) => {
    signOut(auth);
    if (onLogout) onLogout();
  };

  return {
    user, setUser,
    loading,
    authErr, setAuthErr,
    submitting,
    authTab, setAuthTab,
    lEmail, setLEmail,
    lPwd, setLPwd,
    rNom, setRNom,
    rEmail, setREmail,
    rTel, setRTel,
    rWa, setRWa,
    rPwd, setRPwd,
    loginGoogle,
    loginApple,
    forgotPassword,
    login,
    register,
    logout,
  };
}
