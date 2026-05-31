// ─────────────────────────────────────────────────────────────
export const ADMIN_UID = "VE183TvlMgNxmiO9kJjzX6IlzNg1";
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
export const CLOUDINARY_CLOUD_NAME    = "dw4clwa2b";
export const CLOUDINARY_UPLOAD_PRESET = "yo man";
// ─────────────────────────────────────────────────────────────

export const categories = [
  { id: "immobilier",   label: "Immobilier",       icon: "" },
  { id: "vehicules",    label: "Véhicules",         icon: "" },
  { id: "electronique", label: "Électronique",      icon: "" },
  { id: "agriculture",  label: "Agriculture",       icon: "" },
  { id: "vetements",    label: "Vêtements & Mode",  icon: "" },
  { id: "maison",       label: "Maison & Mobilier", icon: "" },
  { id: "emploi",       label: "Emploi & Services", icon: "" },
  { id: "education",    label: "Éducation",         icon: "" },
  { id: "alimentation", label: "Alimentation",      icon: "" },
  { id: "sante",        label: "Santé & Beauté",    icon: "" },
  { id: "animaux",      label: "Animaux",           icon: "" },
];

export const catEmojis = {
  immobilier:"🏡", vehicules:"🚗", electronique:"📱",
  agriculture:"🌾", vetements:"👗", maison:"🛋️",
  emploi:"💼", education:"📚", alimentation:"🍎",
  sante:"⚕️", animaux:"🐄"
};

// ─── Pays UEMOA ───────────────────────────────────────────────
export const pays = [
  { id: "bf", label: "Burkina Faso",  flag: "🇧🇫", indicatif: "+226" },
  { id: "ci", label: "Côte d'Ivoire", flag: "🇨🇮", indicatif: "+225" },
  { id: "ml", label: "Mali",          flag: "🇲🇱", indicatif: "+223" },
  { id: "sn", label: "Sénégal",       flag: "🇸🇳", indicatif: "+221" },
  { id: "ne", label: "Niger",         flag: "🇳🇪", indicatif: "+227" },
  { id: "tg", label: "Togo",          flag: "🇹🇬", indicatif: "+228" },
  { id: "bj", label: "Bénin",         flag: "🇧🇯", indicatif: "+229" },
  { id: "gw", label: "Guinée-Bissau", flag: "🇬🇼", indicatif: "+245" },
];

// ─── Villes par pays ──────────────────────────────────────────
export const villesParPays = {
  bf: [
    "Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Ouahigouya", "Banfora",
    "Dédougou", "Fada N'Gourma", "Tenkodogo", "Kaya", "Ziniaré",
    "Kongoussi", "Manga", "Léo", "Diébougou", "Gaoua", "Pô", "Réo",
    "Yako", "Titao", "Tougan", "Nouna", "Djibo", "Dori", "Gorom-Gorom",
    "Sebba", "Bogandé", "Gayéri", "Diapaga", "Kantchari", "Pama",
    "Batié", "Kampti", "Dano", "Dissin", "Nako", "Solenzo", "Boromo",
    "Kombissiri", "Kokologo", "Boulsa", "Koupéla", "Pouytenga",
    "Zorgho", "Zorgo", "Gourcy", "Thiou", "Seguenega", "Ouarkoye",
    "Boundore", "Manni", "Bilanga", "Piela",
  ],
  ci: [
    "Abidjan", "Bouaké", "Daloa", "Korhogo", "Yamoussoukro", "San-Pédro",
    "Man", "Divo", "Gagnoa", "Abengourou", "Soubré", "Agboville",
    "Grand-Bassam", "Dimbokro", "Bondoukou", "Odienné", "Séguéla",
    "Toumodi", "Tiassalé", "Anyama", "Bingerville", "Sassandra",
    "Guiglo", "Duékoué", "Danané", "Issia", "Lakota",
  ],
  ml: [
    "Bamako", "Sikasso", "Mopti", "Ségou", "Kayes", "Tombouctou",
    "Gao", "Kidal", "Koulikoro", "Bougouni", "Kolondiéba", "Yanfolila",
    "Kati", "Fana", "Dioïla", "Niono", "Markala", "San", "Bla",
    "Koutiala", "Yorosso", "Kimparana", "Douentza", "Bandiagara",
    "Djenné", "Tenenkou", "Niafunké", "Diré", "Goundam",
  ],
  sn: [
    "Dakar", "Thiès", "Kaolack", "Saint-Louis", "Ziguinchor", "Touba",
    "Mbour", "Rufisque", "Diourbel", "Tambacounda", "Kolda", "Fatick",
    "Kaffrine", "Sédhiou", "Kédougou", "Matam", "Louga", "Pikine",
    "Guédiawaye", "Bargny", "Tivaouane", "Mékhé", "Kebemer",
    "Linguère", "Podor", "Richard-Toll", "Ndioum",
  ],
  ne: [
    "Niamey", "Zinder", "Maradi", "Tahoua", "Agadez", "Dosso",
    "Diffa", "Tillabéri", "Arlit", "Birni-N'Konni", "Téssaoua",
    "Magaria", "Mirriah", "Gouré", "Maïné-Soroa", "N'Guigmi",
    "Dakoro", "Mayahi", "Madaoua", "Bouza", "Illéla", "Filingué",
    "Say", "Kollo", "Torodi",
  ],
  tg: [
    "Lomé", "Kpalimé", "Sokodé", "Kara", "Atakpamé", "Bassar",
    "Tsévié", "Aného", "Mango", "Dapaong", "Notsé", "Vogan",
    "Tabligbo", "Badou", "Blitta", "Sotouboua", "Tchamba",
    "Niamtougou", "Kandé", "Pagouda",
  ],
  bj: [
    "Cotonou", "Porto-Novo", "Parakou", "Abomey-Calavi", "Djougou",
    "Bohicon", "Kandi", "Lokossa", "Ouidah", "Abomey", "Natitingou",
    "Malanville", "Nikki", "Pobè", "Aplahoué", "Dassa-Zoumè",
    "Savalou", "Tchaourou", "Banikoara", "Bembèrèkè",
  ],
  gw: [
    "Bissau", "Bafatá", "Gabú", "Bissorã", "Bolama", "Cacheu",
    "Bubaque", "Catió", "Farim", "Mansoa", "Buba", "Quebo",
  ],
};

// Villes pour un pays donné (ou Burkina par défaut)
export const getVilles = (paysId) => villesParPays[paysId] || villesParPays["bf"];

// Infos d'un pays
export const getPays = (paysId) => pays.find(p => p.id === paysId) || pays[0];

// Exemples de quartiers par pays
export const quartiersExemples = {
  bf: "Ouaga 2000",
  ci: "Cocody",
  ml: "Hippodrome",
  sn: "Plateau",
  ne: "Plateau",
  tg: "Bè",
  bj: "Cadjehoun",
  gw: "Bairro de Djeu",
};

// ─── Compatibilité ancienne version (Burkina) ─────────────────
export const villes = villesParPays.bf;

export const waLink = (num, titre) =>
  `https://wa.me/${num}?text=${encodeURIComponent(`Bonjour ! Je suis intéressé(e) par votre annonce "${titre}" sur Jago !`)}`;
