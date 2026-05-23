// ─────────────────────────────────────────────────────────────
export const ADMIN_UID = "VE183TvlMgNxmiO9kJjzX6IlzNg1";
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
export const CLOUDINARY_CLOUD_NAME    = "dw4clwa2b";
export const CLOUDINARY_UPLOAD_PRESET = "yo man";
// ─────────────────────────────────────────────────────────────

export const categories = [
  { id: "immobilier",   label: "Immobilier",       icon: "🏠" },
  { id: "vehicules",    label: "Véhicules",         icon: "🚗" },
  { id: "electronique", label: "Électronique",      icon: "📱" },
  { id: "agriculture",  label: "Agriculture",       icon: "🌾" },
  { id: "vetements",    label: "Vêtements & Mode",  icon: "👗" },
  { id: "maison",       label: "Maison & Mobilier", icon: "🛋️" },
  { id: "emploi",       label: "Emploi & Services", icon: "💼" },
  { id: "education",    label: "Éducation",         icon: "📚" },
  { id: "alimentation", label: "Alimentation",      icon: "🍎" },
  { id: "sante",        label: "Santé & Beauté",    icon: "⚕️" },
  { id: "animaux",      label: "Animaux",           icon: "🐄" },
];

export const catEmojis = {
  immobilier:"🏡", vehicules:"🚗", electronique:"📱",
  agriculture:"🌾", vetements:"👗", maison:"🛋️",
  emploi:"💼", education:"📚", alimentation:"🍎",
  sante:"⚕️", animaux:"🐄"
};

export const villes = [
  "Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Ouahigouya", "Banfora",
  "Dédougou", "Fada N'Gourma", "Tenkodogo", "Kaya", "Ziniaré",
  "Kongoussi", "Manga", "Léo", "Diébougou", "Gaoua",
  "Pô", "Réo", "Yako", "Titao", "Tougan",
  "Nouna", "Djibo", "Dori", "Gorom-Gorom", "Sebba",
  "Bogandé", "Gayéri", "Diapaga", "Kantchari", "Pama",
  "Batié", "Kampti", "Dano", "Dissin", "Nako",
  "Solenzo", "Boromo", "Sapone", "Kombissiri", "Saponé",
  "Kokologo", "Pô", "Boulsa", "Koupéla", "Pouytenga",
  "Zorgho", "Zorgo", "Zinigma", "Bassawarga", "Gourcy",
  "Thiou", "Seguenega", "Ouarkoye", "Lanfiéra", "Banh",
  "Kelbo", "Boundore", "Manni", "Bilanga", "Piela"
];

export const waLink = (num, titre) =>
  `https://wa.me/${num}?text=${encodeURIComponent(`Bonjour ! Je suis intéressé(e) par votre annonce "${titre}" sur Jago`)}`;
