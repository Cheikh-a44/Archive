const firebaseConfig = {
  apiKey: "AIzaSyDnrW6WnmbEFpbWzlW9IGglxAafajt2Kyo",
  authDomain: "iset-b9974.firebaseapp.com",
  databaseURL: "https://iset-b9974-default-rtdb.firebaseio.com",
  projectId: "iset-b9974",
  storageBucket: "iset-b9974.firebasestorage.app",
  messagingSenderId: "1054170284751",
  appId: "1:1054170284751:web:8f02232478430d5ae2adba",
};

let db = null;
try {
  if (typeof firebase !== "undefined") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
  }
} catch (e) {
  console.error("Firebase init error:", e);
}

const SUBJECT_NAMES = {
  Math: "Mathématiques",
  Physique: "Physique",
  Chimie: "Chimie",
  Anglais: "Anglais",
  Francais: "Français",
  Biologie: "Biologie",
  Microbiologie: "Microbiologie",
  Genetique: "Génétique",
  Informatique: "Informatique",
  Statistique: "Statistique",
  Francais2: "Français 2",
  Anglais2: "Anglais 2",
  GEM: "GEM",
  GAB: "GAB",
  PPV: "PPV",
  TIC: "TIC",
  STA: "STA",
  PSA: "PSA",
  Francais3: "Français 3",
  EconomieGestion: "Économie et Gestion",
  Agronomie: "Agronomie",
  Horticulture: "Horticulture",
  Pesticides: "Pesticides",
  Entomologie: "Entomologie",
  ScienceSols: "Science des Sols",
  SciencePlantes: "Science des Plantes",
  ResistanceMateriaux: "Résistance de matériaux",
  EnergieRenouvelable: "Énergie renouvelable",
  Environnement: "Environnement",
  Topographie: "Topographie",
  DAO: "DAO",
  MecaniqueFluides: "Mécanique de fluides",
  ChimieEau: "Chimie de l'eau",
  Automatique: "Automatique",
  Automatisme: "Automatisme",
  ProcedeFabrication: "Procédé de fabrication mécanique",
  Electronique: "Électronique",
  DessinIndustriel: "Dessin industriel",
  ResistanceMateriauxGEM: "Résistance de matériaux",
  SchemasCablage: "Schémas et câblage électrique",
  Vulgarisation: "Vulgarisation",
  TechniquePropagation: "Technique de propagation",
  TechniqueIrrigation: "Technique d'irrigation",
  Ecophysiologie: "Ecophysiologie végétale",
  BiochimieStructurale: "Biochimie structurale",
  FertiliteSol: "Fertilité du sol",
  MethodesDiagnostic: "Méthodes de diagnostic",
  Malherbologie: "Malherbologie",
  BesoinEau: "Besoin en eau",
  SciencesMateriaux: "Sciences de matériaux",
  TechnologieConstruction: "Technologie de construction mécanique",
  Metrologie: "Métrologie capteur instrumentation",
  Refrigeration: "Réfrigération climatisation ventilation",
  Electrotechnique: "Électrotechnique",
  MoteurCombustion: "Moteur à combustion interne",
  DroitSanteSecurite: "Droit Santé et sécurité au travail",
  TechniqueGestionEntrepreneuriat: "Technique de gestion et entreprenariat",
  SystemeProduction: "Système de Production",
  Arboriculture: "Arboriculture",
  ConduiteCalibrage: "Conduite et Calibrage",
  Phytopathologie1: "Phytopathologie 1",
  GestionConservationSolEau: "Gestion et conservation du sol et de l'eau",
  EnnemisCultures: "Ennemis des cultures et lutte intégrée",
  PaysageCulturesOrnementales: "Intro au paysage et cultures ornementales",
  RedactionRapports: "Rédaction et édition des rapports",
  AmeliorationGenetique: "Amélioration génétique des plantes et biotechnologie",
  Agroenvironnement: "Agroenvironnement et agriculture de précision",
  Phytopathologie2: "Phytopathologie 2",
  AdaptationClimat:
    "Adaptation au changement climatique et agriculture durable",
  AmenagementPaysager: "Aménagement paysager et poste récolte",
};

const DEPARTMENTS = ["PPV", "GAB", "GEM", "PSA", "STA"];
const ALL_TYPES = ["Cours", "TD", "Devoirs", "Examens"];

const SHARED = {
  S3: ["Francais3", "EconomieGestion"],
  S4: ["Vulgarisation"],
  S5: ["DroitSanteSecurite", "TechniqueGestionEntrepreneuriat"],
  S6: ["RedactionRapports"],
};

const DEPT_SUBJECTS = {
  "S3-PPV": [
    "Agronomie",
    "Horticulture",
    "Pesticides",
    "Entomologie",
    "ScienceSols",
    "SciencePlantes",
  ],
  "S3-GAB": [
    "ResistanceMateriaux",
    "EnergieRenouvelable",
    "Environnement",
    "Topographie",
    "DAO",
    "MecaniqueFluides",
    "ChimieEau",
  ],
  "S3-GEM": [
    "Automatique",
    "Automatisme",
    "ProcedeFabrication",
    "Electronique",
    "DessinIndustriel",
    "ResistanceMateriauxGEM",
    "SchemasCablage",
  ],
  "S3-PSA": [],
  "S3-STA": [],
  "S4-PPV": [
    "TechniquePropagation",
    "TechniqueIrrigation",
    "Ecophysiologie",
    "BiochimieStructurale",
    "FertiliteSol",
    "MethodesDiagnostic",
    "Malherbologie",
    "BesoinEau",
  ],
  "S4-GAB": ["TechniqueIrrigation"],
  "S4-GEM": [
    "SciencesMateriaux",
    "TechnologieConstruction",
    "Metrologie",
    "Refrigeration",
    "Electrotechnique",
    "MoteurCombustion",
  ],
  "S4-PSA": [],
  "S4-STA": [],
  "S5-PPV": [
    "SystemeProduction",
    "Arboriculture",
    "ConduiteCalibrage",
    "Phytopathologie1",
    "GestionConservationSolEau",
    "EnnemisCultures",
    "PaysageCulturesOrnementales",
  ],
  "S5-GAB": [],
  "S5-GEM": [],
  "S5-PSA": [],
  "S5-STA": [],
  "S6-PPV": [
    "AmeliorationGenetique",
    "Agroenvironnement",
    "Phytopathologie2",
    "AdaptationClimat",
    "AmenagementPaysager",
  ],
  "S6-GAB": [],
  "S6-GEM": [],
  "S6-PSA": [],
  "S6-STA": [],
};

const FIXED = {
  S1: [
    "Math",
    "Physique",
    "Chimie",
    "Anglais",
    "Francais",
    "Biologie",
    "Microbiologie",
    "Genetique",
    "Informatique",
    "Statistique",
  ],
  S2: ["Francais2", "Anglais2", "GEM", "GAB", "PPV", "TIC", "STA", "PSA"],
};

const SHARED_SET = new Set([
  "Francais3",
  "EconomieGestion",
  "Vulgarisation",
  "DroitSanteSecurite",
  "TechniqueGestionEntrepreneuriat",
  "RedactionRapports",
]);

const COLORS = [
  "170, 75%, 41%",
  "351, 83%, 61%",
  "229, 75%, 58%",
  "42, 94%, 55%",
];
const TYPE_COLOR = {
  Cours: "170, 75%, 41%",
  TD: "351, 83%, 61%",
  Devoirs: "260, 100%, 67%",
  Examens: "42, 94%, 55%",
};

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c];
  });
}

function safeUrl(u) {
  u = String(u || "").trim();
  return /^https?:\/\//i.test(u) ? u : "";
}

function subjectsFor(semDept) {
  const sem = semDept.split("-")[0];
  return [].concat(SHARED[sem] || [], DEPT_SUBJECTS[semDept] || []);
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise(function (_, rej) {
      setTimeout(function () {
        rej(new Error("timeout"));
      }, ms);
    }),
  ]);
}

let currentScreen = "home";
let filesList = [];
let viewList = [];
let currentSubject = "";
let currentGemAspect = "";
let activeFilter = "all";
let isLoading = false;
let errorMsg = "";
let selSem = "";
let setupYear = "";
let menuStep = "";

const subjectCache = {};
let allCache = null;

function getProfile() {
  try {
    const p = JSON.parse(localStorage.getItem("profile") || "null");
    if (
      p &&
      ["L1", "L2", "L3"].indexOf(p.year) !== -1 &&
      (p.year === "L1" || DEPARTMENTS.indexOf(p.dept) !== -1)
    )
      return p;
  } catch (e) {}
  return null;
}

function saveProfile(p) {
  try {
    localStorage.setItem("profile", JSON.stringify(p));
  } catch (e) {}
}

function semsOf(year) {
  return year === "L1"
    ? ["S1", "S2"]
    : year === "L2"
      ? ["S3", "S4"]
      : ["S5", "S6"];
}

function subjectsOfSem(p, sem) {
  return p.year === "L1" ? FIXED[sem] || [] : subjectsFor(sem + "-" + p.dept);
}

function chooseYear(y) {
  if (y === "L1") return finishSetup("L1", "");
  setupYear = y;
  commit();
}

function chooseDept(d) {
  finishSetup(setupYear, d);
}

function finishSetup(y, d) {
  saveProfile({ year: y, dept: d });
  selSem = semsOf(y)[0];
  setupYear = "";
  currentScreen = "home";
  commit();
}

function renderProfileMenu() {
  const dd = document.getElementById("profileDropdown");
  if (!dd) return;
  const p = getProfile();
  let h = "";
  if (!menuStep) {
    h += '<p class="dd-title">Année</p>';
    ["L1", "L2", "L3"].forEach(function (y) {
      h +=
        '<button type="button" class="dd-item' +
        (p && p.year === y ? " current" : "") +
        '" onclick="menuYear(\'' +
        y +
        "')\">" +
        y +
        "</button>";
    });
  } else {
    h +=
      '<button type="button" class="dd-back" onclick="menuBack()">← ' +
      esc(menuStep) +
      "</button>" +
      '<p class="dd-title">Filière</p>';
    DEPARTMENTS.forEach(function (d) {
      h +=
        '<button type="button" class="dd-item' +
        (p && p.year === menuStep && p.dept === d ? " current" : "") +
        '" onclick="menuDept(\'' +
        d +
        "')\">" +
        d +
        "</button>";
    });
  }
  dd.innerHTML = h;
}

function openProfileMenu() {
  const dd = document.getElementById("profileDropdown");
  menuStep = "";
  renderProfileMenu();
  dd.hidden = false;
  document.getElementById("profileBtn").setAttribute("aria-expanded", "true");
}

function closeProfileMenu() {
  const dd = document.getElementById("profileDropdown");
  if (!dd) return;
  dd.hidden = true;
  const pb = document.getElementById("profileBtn");
  if (pb) pb.setAttribute("aria-expanded", "false");
}

function toggleProfileMenu(e) {
  if (e) e.stopPropagation();
  const dd = document.getElementById("profileDropdown");
  if (dd.hidden) openProfileMenu();
  else closeProfileMenu();
}

function menuYear(y) {
  if (y === "L1") {
    closeProfileMenu();
    finishSetup("L1", "");
  } else {
    menuStep = y;
    renderProfileMenu();
  }
}

function menuBack() {
  menuStep = "";
  renderProfileMenu();
}

function menuDept(d) {
  const y = menuStep;
  closeProfileMenu();
  finishSetup(y, d);
}

function changeProfile() {
  if (!getProfile()) {
    go("home");
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  openProfileMenu();
}

function setSem(s) {
  selSem = s;
  try {
    window.history.replaceState(snapshot(), "");
  } catch (e) {}
  render();
}

function snapshot() {
  return {
    screen: currentScreen,
    subject: currentSubject,
    gemAspect: currentGemAspect,
    files: filesList,
    filter: activeFilter,
    sem: selSem,
    setupYear: setupYear,
  };
}

function restore(s) {
  currentScreen = s.screen || "home";
  currentSubject = s.subject || "";
  currentGemAspect = s.gemAspect || "";
  filesList = s.files || [];
  activeFilter = s.filter || "all";
  selSem = s.sem || selSem;
  setupYear = s.setupYear || "";
  errorMsg = "";
}

function commit() {
  errorMsg = "";
  try {
    window.history.pushState(snapshot(), "");
  } catch (e) {}
  render();
  window.scrollTo(0, 0);
}

function push(screen) {
  currentScreen = screen;
  activeFilter = "all";
  commit();
}

function go(screen) {
  currentSubject = "";
  currentGemAspect = "";
  filesList = [];
  activeFilter = "all";
  setupYear = "";
  if (screen === "home" && !getProfile()) currentScreen = "setup";
  else currentScreen = screen;
  commit();
}

function goBack() {
  const st = window.history.state;
  if (st && !st.root) window.history.back();
  else if (currentScreen !== "home" && currentScreen !== "setup") go("home");
}

window.addEventListener("popstate", function (e) {
  if (e.state) restore(e.state);
  else go("home");
  render();
});

function setFilter(val) {
  activeFilter = val;
  try {
    window.history.replaceState(snapshot(), "");
  } catch (e) {}
  render();
}

function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function openWhatsApp() {
  window.open(
    "https://wa.me/22237635859?text=" +
      encodeURIComponent("Bonjour, je souhaite contribuer à ESAV"),
    "_blank",
    "noopener",
  );
}

function nodeToList(node, subjectLabel) {
  const out = [];
  if (!node) return out;
  ALL_TYPES.forEach(function (type) {
    const t = node[type];
    if (!t) return;
    Object.keys(t).forEach(function (key) {
      const f = t[key];
      if (!f || !f.name) return;
      out.push({
        key: key,
        fileType: type,
        name: String(f.name),
        url: safeUrl(f.url),
        subject: subjectLabel || "",
      });
    });
  });
  return out;
}

async function loadSubject(subject, gemAspect) {
  const key = subject === "GEM" && gemAspect ? "GEM/" + gemAspect : subject;
  if (subjectCache[key]) return subjectCache[key];
  if (!db) throw new Error("offline");
  let node;
  if (allCache) {
    node = allCache[subject];
    if (subject === "GEM" && gemAspect) node = node && node[gemAspect];
  } else {
    const snap = await withTimeout(db.ref("files/" + key).once("value"), 10000);
    node = snap.val();
  }
  const list = nodeToList(node, "");
  subjectCache[key] = list;
  return list;
}

async function loadAll() {
  if (allCache) return allCache;
  if (!db) throw new Error("offline");
  const snap = await withTimeout(db.ref("files").once("value"), 15000);
  allCache = snap.val() || {};
  return allCache;
}

async function openSubject(subject, gemAspect) {
  gemAspect = gemAspect || "";
  isLoading = true;
  errorMsg = "";
  render();
  try {
    const files = await loadSubject(subject, gemAspect);
    isLoading = false;
    currentSubject = subject;
    currentGemAspect = gemAspect;
    filesList = files;
    currentScreen = "filesList";
    activeFilter = "all";
    commit();
  } catch (e) {
    isLoading = false;
    errorMsg =
      "Impossible de charger les fichiers. Vérifiez votre connexion internet.";
    render();
  }
}

async function performSearch(term) {
  if (!term || !String(term).trim()) return;
  isLoading = true;
  errorMsg = "";
  render();
  try {
    const data = await loadAll();
    const t = String(term).trim().toLowerCase();
    const results = [];
    function searchNode(node, subjectKey, gem) {
      const display = SUBJECT_NAMES[subjectKey] || subjectKey;
      const label = gem ? "GEM — " + gem : display;
      nodeToList(node, label).forEach(function (f) {
        if (
          display.toLowerCase().indexOf(t) !== -1 ||
          f.name.toLowerCase().indexOf(t) !== -1
        ) {
          results.push(f);
        }
      });
    }
    Object.keys(data).forEach(function (sk) {
      const sd = data[sk];
      if (sk === "GEM") {
        Object.keys(sd || {}).forEach(function (aspect) {
          searchNode(sd[aspect], "GEM", aspect);
        });
      } else {
        searchNode(sd, sk, "");
      }
    });
    isLoading = false;
    filesList = results;
    currentScreen = "searchResults";
    commit();
  } catch (e) {
    isLoading = false;
    errorMsg = "Recherche impossible. Vérifiez votre connexion internet.";
    render();
  }
}

function clearError() {
  errorMsg = "";
  render();
}

function drivePreview(url) {
  const m = String(url || "").match(/\/d\/([a-zA-Z0-9_-]+)/);
  return m ? "https://drive.google.com/file/d/" + m[1] + "/preview" : url;
}

function driveDownload(url) {
  const m = String(url || "").match(/\/d\/([a-zA-Z0-9_-]+)/);
  return m ? "https://drive.google.com/uc?export=download&id=" + m[1] : url;
}

function imgUrl(u) {
  return String(u || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/ /g, "%20");
}

function pic(url, cls, w, h, alt) {
  url = imgUrl(url);
  return (
    '<div class="img-holder ' +
    cls +
    '" style="--width:' +
    w +
    ";--height:" +
    h +
    '">' +
    (url
      ? '<img class="img-cover" src="' +
        esc(url) +
        '" alt="' +
        esc(alt || "") +
        '" loading="lazy">'
      : "") +
    "</div>"
  );
}

function backBtn() {
  return '<button type="button" class="back-btn" onclick="goBack()" aria-label="Retour">← Retour</button>';
}

function heroBgStyle() {
  return typeof IMAGES !== "undefined" && IMAGES.heroBg
    ? " style=\"background-image:url('" + esc(imgUrl(IMAGES.heroBg)) + "')\""
    : "";
}

function applyLogo() {
  try {
    if (typeof IMAGES === "undefined" || !IMAGES.logo) return;
    const src = esc(imgUrl(IMAGES.logo));
    document.querySelectorAll(".logo").forEach(function (el) {
      const text = el.querySelector(".logo-text");
      const label = text ? text.textContent : "ESAV";
      el.innerHTML =
        '<img src="' +
        src +
        '" alt="">' +
        '<span class="logo-text">' +
        esc(label) +
        "</span>";
    });
  } catch (e) {}
}

function renderSetup() {
  const hasProfile = !!getProfile();
  const step2 = !!setupYear;
  let h =
    '<section class="section hero"' +
    heroBgStyle() +
    '><div class="container"><div>' +
    (hasProfile ? backBtn() : "") +
    '<h1 class="h1 section-title">' +
    (step2
      ? 'Choisissez votre <span class="span">filière</span>'
      : 'Choisissez votre <span class="span">niveau</span>') +
    "</h1>" +
    '<p class="hero-text">' +
    (step2
      ? "Niveau " + esc(setupYear) + "."
      : "Vous ne le faites qu'une seule fois.") +
    " Modifiable via le menu en haut.</p></div>" +
    '<div class="hero-banner">' +
    pic(typeof IMAGES !== "undefined" ? IMAGES.hero1 : "", "one", 270, 300) +
    pic(typeof IMAGES !== "undefined" ? IMAGES.hero2 : "", "two", 240, 370) +
    "</div></div></section>" +
    '<section class="section"><div class="container"><ul class="grid-list">';
  if (!step2) {
    [
      ["L1", "S1 · S2"],
      ["L2", "S3 · S4"],
      ["L3", "S5 · S6"],
    ].forEach(function (y, i) {
      h +=
        '<li><button type="button" class="category-card big" style="--color:' +
        COLORS[i] +
        '" onclick="chooseYear(\'' +
        y[0] +
        '\')"><span class="card-title">' +
        y[0] +
        '</span><span class="card-badge">' +
        y[1] +
        "</span></button></li>";
    });
  } else {
    DEPARTMENTS.forEach(function (d, i) {
      h +=
        '<li><button type="button" class="category-card big" style="--color:' +
        COLORS[i % 4] +
        '" onclick="chooseDept(\'' +
        d +
        '\')"><span class="card-title">' +
        d +
        "</span></button></li>";
    });
  }
  return h + "</ul></div></section>";
}

function subjectCard(s, i, sem) {
  const click = s === "GEM" ? "push('gemParts')" : "openSubject('" + s + "')";
  return (
    '<li><button type="button" class="category-card" style="--color:' +
    COLORS[i % 4] +
    '" onclick="' +
    click +
    '"><span class="card-title">' +
    esc(SUBJECT_NAMES[s] || s) +
    '</span><span class="card-badge">' +
    (SHARED_SET.has(s) ? "Commun · " : "") +
    esc(sem) +
    "</span></button></li>"
  );
}

function renderHome() {
  const p = getProfile();
  if (!p) return renderSetup();
  const sems = semsOf(p.year);
  if (sems.indexOf(selSem) === -1) selSem = sems[0];
  const subs = subjectsOfSem(p, selSem);
  const label = p.year + (p.dept ? " · " + p.dept : "");

  let h =
    '<section class="section hero"' +
    heroBgStyle() +
    '><div class="container"><div>' +
    '<span class="badge">' +
    esc(label) +
    "</span>" +
    '<h1 class="h1 section-title">Tous vos <span class="span">cours</span> au même endroit</h1>' +
    '<p class="hero-text">Cours, TD, devoirs et examens de votre filière, par semestre et matière.</p>' +
    '<div class="search-wrap">' +
    '<input id="searchInput" type="search" aria-label="Rechercher" placeholder="Rechercher une matière ou un fichier..." ' +
    "onkeydown=\"if(event.key==='Enter') performSearch(this.value)\" />" +
    "</div></div>" +
    '<div class="hero-banner">' +
    pic(
      typeof IMAGES !== "undefined" ? IMAGES.hero1 : "",
      "one",
      270,
      300,
      "ESAV",
    ) +
    pic(
      typeof IMAGES !== "undefined" ? IMAGES.hero2 : "",
      "two",
      240,
      370,
      "ESAV",
    ) +
    "</div></div></section>" +
    '<section class="section category"><div class="container">' +
    '<p class="section-subtitle">Matières</p>' +
    '<h2 class="h2 section-title">Choisissez une <span class="span">matière</span></h2>' +
    '<p class="section-text">Sélectionnez votre semestre puis la matière.</p><div class="tabs">';
  sems.forEach(function (s) {
    h +=
      '<button type="button" class="tab ' +
      (s === selSem ? "active" : "") +
      '" onclick="setSem(\'' +
      s +
      "')\">" +
      s +
      "</button>";
  });
  h += "</div>";
  if (!subs.length) {
    h += '<div class="empty">Aucune matière pour le moment...</div>';
  } else {
    h += '<ul class="grid-list">';
    subs.forEach(function (s, i) {
      h += subjectCard(s, i, selSem);
    });
    h += "</ul>";
  }
  h +=
    "</div></section>" +
    '<section class="section cta"><div class="container"><div class="box"><div>' +
    '<h3 class="h3">Vous avez un fichier à partager ?</h3>' +
    "<p>Contribuez en nous l'envoyant sur WhatsApp.</p></div>" +
    '<button type="button" class="btn light" onclick="location.href=\'contribuer.html\'"><span>Contribuer un fichier</span></button>' +
    "</div></div></section>";
  return h;
}

function renderGem() {
  return (
    '<section class="files-section"><div class="container">' +
    backBtn() +
    '<div class="page-banner"><h2>GEM (S2)</h2><p>Choisissez un aspect</p></div><ul class="grid-list">' +
    '<li><button type="button" class="category-card" style="--color:' +
    COLORS[0] +
    '" onclick="openSubject(\'GEM\',\'Dessin\')"><span class="card-title">Dessin</span></button></li>' +
    '<li><button type="button" class="category-card" style="--color:' +
    COLORS[1] +
    '" onclick="openSubject(\'GEM\',\'Electricite\')"><span class="card-title">Électricité</span></button></li>' +
    "</ul></div></section>"
  );
}

function renderFiles(isSearch) {
  const title = isSearch
    ? "Résultats de la recherche"
    : currentGemAspect
      ? "GEM — " + currentGemAspect
      : SUBJECT_NAMES[currentSubject] || currentSubject;
  const types = [];
  filesList.forEach(function (f) {
    if (types.indexOf(f.fileType) === -1) types.push(f.fileType);
  });
  viewList =
    activeFilter === "all"
      ? filesList
      : filesList.filter(function (f) {
          return f.fileType === activeFilter;
        });

  let h =
    '<section class="files-section"><div class="container">' +
    backBtn() +
    '<div class="page-banner"><h2>' +
    esc(title) +
    "</h2><p>" +
    filesList.length +
    " fichier(s)</p></div>";
  if (!filesList.length) {
    return (
      h +
      '<div class="empty">' +
      (isSearch ? "Aucun résultat" : "Aucun fichier disponible") +
      "</div></div></section>"
    );
  }
  if (types.length > 1) {
    h +=
      '<div class="filter-bar"><button type="button" class="chip ' +
      (activeFilter === "all" ? "active" : "") +
      '" onclick="setFilter(\'all\')">Tout</button>';
    types.forEach(function (t) {
      h +=
        '<button type="button" class="chip ' +
        (activeFilter === t ? "active" : "") +
        '" style="--color:' +
        (TYPE_COLOR[t] || COLORS[0]) +
        '" onclick="setFilter(\'' +
        t +
        "')\">" +
        esc(t) +
        "</button>";
    });
    h += "</div>";
  }
  h += '<div class="file-list">';
  viewList.forEach(function (f, i) {
    h +=
      '<div class="file-card" style="--color:' +
      (TYPE_COLOR[f.fileType] || COLORS[0]) +
      '" data-act="open" data-i="' +
      i +
      '" role="button" tabindex="0">' +
      '<div class="info"><div class="name">' +
      esc(f.name) +
      "</div>" +
      (f.subject ? '<div class="sub">' + esc(f.subject) + "</div>" : "") +
      '<span class="badge">' +
      esc(f.fileType) +
      "</span></div>" +
      '<div class="file-actions">' +
      '<button type="button" data-act="open" data-i="' +
      i +
      '">Ouvrir</button>' +
      '<button type="button" data-act="download" data-i="' +
      i +
      '">Télécharger</button>' +
      "</div></div>";
  });
  return h + "</div></div></section>";
}

function render() {
  const p = getProfile();
  const navHome = document.getElementById("navHome");
  if (navHome) {
    navHome.classList.toggle(
      "active",
      currentScreen === "home" || currentScreen === "setup",
    );
  }
  const pb = document.getElementById("profileBtn");
  if (pb) {
    pb.parentNode.style.display = p ? "" : "none";
    if (p)
      pb.querySelector(".lbl").textContent =
        p.year + (p.dept ? " · " + p.dept : "");
  }

  const el = document.getElementById("content");
  if (isLoading) {
    el.innerHTML = '<div class="empty">Chargement...</div>';
    return;
  }
  if (errorMsg) {
    el.innerHTML =
      '<div class="empty">' +
      esc(errorMsg) +
      '<br><button type="button" class="btn retry-btn" onclick="clearError()"><span>OK</span></button></div>';
    return;
  }

  const s = currentScreen;
  if (s === "setup") el.innerHTML = renderSetup();
  else if (s === "gemParts") el.innerHTML = renderGem();
  else if (s === "filesList") el.innerHTML = renderFiles(false);
  else if (s === "searchResults") el.innerHTML = renderFiles(true);
  else el.innerHTML = renderHome();
}

const contentEl = document.getElementById("content");

contentEl.addEventListener("click", function (e) {
  const t = e.target.closest("[data-act]");
  if (!t) return;
  e.stopPropagation();
  const f = viewList[Number(t.dataset.i)];
  if (!f || !f.url) return;
  window.open(
    t.dataset.act === "download" ? driveDownload(f.url) : drivePreview(f.url),
    "_blank",
    "noopener",
  );
});

document
  .getElementById("profileDropdown")
  .addEventListener("click", function (e) {
    e.stopPropagation();
  });
document.addEventListener("click", closeProfileMenu);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeProfileMenu();
  if (
    (e.key === "Enter" || e.key === " ") &&
    e.target.matches('[role="button"]')
  ) {
    e.preventDefault();
    e.target.click();
  }
});

window.push = push;
window.go = go;
window.goBack = goBack;
window.openSubject = openSubject;
window.performSearch = performSearch;
window.setFilter = setFilter;
window.setSem = setSem;
window.chooseYear = chooseYear;
window.chooseDept = chooseDept;
window.changeProfile = changeProfile;
window.toggleProfileMenu = toggleProfileMenu;
window.menuYear = menuYear;
window.menuDept = menuDept;
window.menuBack = menuBack;
window.openWhatsApp = openWhatsApp;
window.clearError = clearError;
window.scrollToContact = scrollToContact;

applyLogo();

try {
  const p0 = getProfile();
  currentScreen = p0 ? "home" : "setup";
  selSem = p0 ? semsOf(p0.year)[0] : "";
  window.history.replaceState(Object.assign(snapshot(), { root: true }), "");
  render();
} catch (e) {
  console.error(e);
  contentEl.innerHTML = '<div class="empty">' + esc(e.message) + "</div>";
}
