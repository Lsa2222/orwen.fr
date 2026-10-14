// Mode édition du site orwen.fr, pour Lucas seulement : ce fichier n'est chargé que dans un navigateur où le mode a
// été allumé depuis la page /edition/. Il est fabriqué par construire.py à partir du dossier edition/.
(() => {
'use strict';
if (window.orwenEdition) return;
window.orwenEdition = true;
const STYLE = "/* Mode édition. construire.py range cette feuille dans edition.js : seul le navigateur de Lucas la reçoit.\n   La barre, les fenêtres et le panneau sont posés hors de .site et ne peuvent pas se servir de ses couleurs : ils ont\n   les leurs (--e-…). Ce qui est posé dans la page (outils d'une vignette, d'une photo) peut s'appuyer sur les deux. */\n.ed{ --e-fond:#1c1513; --e-creux:#110d0c; --e-trait:#3a2a24; --e-texte:#f6eee8; --e-doux:#b9aaa0; --e-feu:#ff7a2b; --e-clair:#ffb37a; --e-encre:#1a0d06;\n  --e-titre:\"Red Hat Display\",\"Segoe UI\",sans-serif; --e-corps:\"Red Hat Text\",\"Segoe UI\",sans-serif;\n  box-sizing:border-box; color:var(--e-texte); font:400 14.5px/1.45 var(--e-corps); -webkit-font-smoothing:antialiased }\n.ed *,.ed *::before,.ed *::after{ box-sizing:border-box }\n.ed[hidden],.ed [hidden]{ display:none !important }\n.ed p,.ed h2,.ed ul{ margin:0; padding:0 }\n.ed svg{ width:18px; height:18px; flex:none }\n.ed button,.ed input,.ed select{ font:inherit; color:inherit }\n.ed button{ cursor:pointer }\n.ed :focus-visible{ outline:2px solid var(--e-feu); outline-offset:2px }\nhtml.ed-actif body{ padding-bottom:92px }\n\n/* ---------- boutons */\n.ed-bouton{ display:inline-flex; align-items:center; justify-content:center; gap:7px; min-height:38px; padding:9px 16px; border:0; border-radius:999px;\n  background:linear-gradient(#3b2e29,#2a201c); color:var(--e-texte); font:700 14px/1.1 var(--e-titre); text-decoration:none; white-space:nowrap;\n  box-shadow:inset 0 1px 0 #5c4b44,inset 0 -2px 0 #120c0a; transition:filter .15s }\n.ed-bouton:hover{ filter:brightness(1.15) }\n.ed-bouton.ed-principal{ background:linear-gradient(#ffb04a,#ff6a1f 60%,#d9480f); color:var(--e-encre); box-shadow:inset 0 1.5px 0 #ffd9a0,inset 0 -2px 0 #a8380c }\n.ed-bouton:disabled{ opacity:.4; cursor:default; filter:none }\n.ed-rond{ display:grid; place-items:center; flex:none; width:38px; height:38px; padding:0; border:0; border-radius:50%; background:linear-gradient(#3b2e29,#2a201c);\n  color:var(--e-texte); box-shadow:inset 0 1px 0 #5c4b44,inset 0 -2px 0 #120c0a; transition:filter .15s }\n.ed-rond:hover{ filter:brightness(1.2) }\n.ed-rond[aria-pressed=\"true\"]{ background:var(--e-feu); color:var(--e-encre); box-shadow:none }\n.ed .ed-lien{ justify-self:start; padding:0; border:0; background:none; color:var(--e-clair); font-weight:500; text-align:left; text-decoration:underline; text-underline-offset:3px }\n\n/* ---------- barre du bas, menu, message */\n.ed-barre{ position:fixed; left:50%; bottom:14px; z-index:70; translate:-50% 0; display:flex; align-items:center; gap:8px; max-width:calc(100vw - 16px); padding:7px;\n  background:#1c1513f5; border:1px solid #ff7a2b59; border-radius:999px; box-shadow:0 20px 44px -14px #000,0 0 0 1px #00000059 }\n.ed-compte{ display:grid; gap:3px; min-width:0; padding:3px 8px 3px 14px; border:0; border-radius:999px; background:none; text-align:left }\n.ed-compte b{ font:700 14.5px/1.15 var(--e-titre); white-space:nowrap }\n.ed-compte small{ color:var(--e-doux); font-size:12px; line-height:1.15; white-space:nowrap; overflow:hidden; text-overflow:ellipsis }\n.ed-compte small:empty{ display:none }\n.ed-barre.ed-plein .ed-compte b{ color:var(--e-clair) }\n.ed-barre.ed-attente .ed-compte small::before{ content:\"\"; display:inline-block; width:7px; height:7px; margin-right:6px; border-radius:50%; background:var(--e-feu); animation:ed-pouls 1.3s ease-in-out infinite }\n@keyframes ed-pouls{ 50%{ opacity:.25 } }\n.ed-menu{ position:absolute; right:0; bottom:calc(100% + 10px); display:grid; width:max-content; min-width:230px; max-width:calc(100vw - 16px); padding:8px;\n  background:var(--e-fond); border:1px solid #ff7a2b59; border-radius:20px; box-shadow:0 24px 50px -16px #000; animation:ed-entree .18s cubic-bezier(.2,.7,.2,1) }\n.ed-entree{ display:block; width:100%; padding:11px 14px; border:0; border-radius:12px; background:none; color:var(--e-texte); font:500 14.5px/1.2 var(--e-corps); text-align:left; text-decoration:none }\n.ed-entree:hover{ background:#ffffff0f }\n.ed-bulle{ position:fixed; inset:auto auto 84px 50%; z-index:71; translate:-50% 0; width:max-content; max-width:min(560px,calc(100vw - 24px)); margin:0; padding:11px 16px;\n  background:#2a201c; border:1px solid var(--e-trait); border-radius:16px; box-shadow:0 18px 40px -16px #000; font-weight:500; animation:ed-entree .2s cubic-bezier(.2,.7,.2,1) }\n.ed-bulle.ed-erreur{ border-color:var(--e-feu); color:#ffd2b0 }\n@keyframes ed-entree{ from{ opacity:0; transform:translateY(8px) } }\n\n/* ---------- fenêtres et panneau */\n.ed-fenetre{ width:min(560px,calc(100vw - 20px)); max-width:none; max-height:min(88dvh,780px); padding:0; border:1px solid #ff7a2b59; border-radius:24px;\n  background:var(--e-fond); box-shadow:0 40px 90px -30px #000; overflow:hidden }\n.ed-fenetre[open]{ display:flex; flex-direction:column; animation:ed-entree .22s cubic-bezier(.2,.7,.2,1) }\n.ed-fenetre::backdrop{ background:#0b0807c7 }\n.ed-fenetre-tete{ display:flex; align-items:center; justify-content:space-between; gap:12px; padding:16px 16px 10px 22px }\n.ed-fenetre-tete h2{ font:800 20px/1.2 var(--e-titre); letter-spacing:-.01em }\n.ed-fenetre-corps{ display:grid; gap:14px; min-height:0; padding:6px 22px 22px; overflow-y:auto; overscroll-behavior:contain }\n.ed-fenetre-pied{ display:grid; gap:10px; padding:14px 22px 18px; border-top:1px solid var(--e-trait) }\n.ed-fenetre-pied .ed-actions{ margin-top:0 }\n.ed-panneau{ position:fixed; right:14px; bottom:92px; z-index:69; display:grid; gap:12px; width:min(340px,calc(100vw - 28px)); margin:0; padding:0 18px 18px;\n  background:#1c1513f7; border:1px solid #ff7a2b59; border-radius:22px; box-shadow:0 24px 50px -16px #000; animation:ed-entree .2s cubic-bezier(.2,.7,.2,1) }\n.ed-panneau .ed-fenetre-tete{ padding:14px 0 0 }\n.ed-panneau .ed-fenetre-tete h2{ font-size:17px }\n.ed-note{ color:var(--e-doux); font-size:13.5px }\n.ed-erreur{ color:#ffb08a; font-weight:500 }\n.ed-erreur:empty{ display:none }\n.ed-actions{ display:flex; flex-wrap:wrap; gap:10px; margin-top:4px }\n\n/* ---------- champs */\n.ed-champ{ display:grid; gap:5px; min-width:0; font-weight:500 }\n.ed-champ > span:first-child{ color:var(--e-doux); font-size:13.5px }\n.ed-champ small{ color:var(--e-doux); font-size:12.5px; font-weight:400 }\n.ed input[type=text],.ed input[type=number],.ed select{ width:100%; min-height:40px; padding:8px 12px; border:1px solid var(--e-trait); border-radius:12px; background:var(--e-creux) }\n.ed input:disabled,.ed select:disabled{ opacity:.45 }\n.ed input[type=range]{ flex:1; min-width:0; accent-color:var(--e-feu) }\n.ed input[type=checkbox]{ flex:none; width:18px; height:18px; margin:2px 0 0; accent-color:var(--e-feu) }\n.ed-case{ display:flex; align-items:flex-start; gap:10px; font-weight:500 }\n.ed-ligne{ display:flex; align-items:center; gap:12px }\n.ed output{ min-width:3.4em; text-align:right; font:700 15px/1 var(--e-titre) }\n.ed-deux{ display:grid; grid-template-columns:1fr 1fr; gap:10px 12px; align-items:start }\n.ed-deux > .ed-case{ align-self:center }\n.ed details summary{ color:var(--e-doux); font-size:13.5px; cursor:pointer }\n.ed details[open] summary{ margin-bottom:10px }\n\n/* ---------- listes (brouillon, historique, textes à revoir), libellés, choix d'une icône */\n.ed-liste{ display:grid; gap:8px; list-style:none }\n.ed-liste li{ display:flex; align-items:center; gap:8px; padding:10px 10px 10px 14px; border:1px solid var(--e-trait); border-radius:16px; background:#ffffff08 }\n.ed-liste li > div{ display:grid; flex:1; gap:2px; min-width:0 }\n.ed-liste b{ font:700 14.5px/1.25 var(--e-titre) }\n.ed-liste small{ color:var(--e-doux); font-size:12.5px; overflow-wrap:anywhere }\n.ed-libelles{ display:grid; gap:10px }\n.ed-libelle{ display:grid; gap:10px; min-width:0; margin:0; padding:12px 14px 14px; border:1px solid var(--e-trait); border-radius:16px }\n.ed-choix-icones{ display:grid; grid-template-columns:repeat(auto-fill,minmax(104px,1fr)); gap:10px }\n.ed-choix-icones button{ display:grid; justify-items:center; gap:7px; padding:10px 6px; border:1px solid var(--e-trait); border-radius:16px; background:#ffffff08; font-size:12.5px; line-height:1.2 }\n.ed-choix-icones img{ width:64px; height:64px; border-radius:16px; object-fit:cover }\n.ed-choix-icones .ed-choisi{ border-color:var(--e-feu); background:#ff7a2b1f }\n\n/* ---------- textes qui se modifient dans la page */\nhtml.ed-actif:not(.ed-apercu) .site [data-ed],html.ed-actif:not(.ed-apercu) .site [data-ed-liste] > *{ outline:1.5px dashed #ff7a2b4d; outline-offset:4px; border-radius:6px;\n  white-space:pre-wrap; cursor:text; transition:outline-color .15s,background-color .15s }\nhtml.ed-actif:not(.ed-apercu) .site [data-ed-liste] > *{ outline-offset:2px; min-height:1.55em }\nhtml.ed-actif:not(.ed-apercu) .site [data-ed]:hover,html.ed-actif:not(.ed-apercu) .site [data-ed-liste] > :hover{ outline-color:#ff7a2bb3 }\nhtml.ed-actif:not(.ed-apercu) .site [data-ed]:focus,html.ed-actif:not(.ed-apercu) .site [data-ed-liste] > :focus{ outline:2px solid #ff7a2b; background:#ff7a2b14 }\nhtml.ed-actif:not(.ed-apercu) .site [data-ed]:empty::before{ content:attr(data-ed-vide); color:#b9aaa099 }\n/* repris de l'autre langue, faute de traduction ; à revoir, parce que le français a changé depuis */\nhtml.ed-actif:not(.ed-apercu) .site .ed-repris{ text-decoration:underline dotted #ff7a2b99; text-underline-offset:5px }\nhtml.ed-actif:not(.ed-apercu) .site .ed-a-revoir,html.ed-actif:not(.ed-apercu) .site .ed-a-revoir > *{ outline:2px dotted #ffc24a }\n.site .ed-vise{ animation:ed-vise 1s ease-in-out 3 }\n@keyframes ed-vise{ 50%{ background:#ffc24a33 } }\n.site .ed-ajout{ display:flex; align-items:center; gap:6px; width:fit-content; margin-top:12px; padding:7px 13px 7px 9px; border:1.5px dashed #ff7a2b66; border-radius:999px; background:none;\n  color:#ffb37a; font:600 13.5px/1 var(--f-display); cursor:pointer }\n.site .ed-ajout:hover{ border-color:#ff7a2b; background:#ff7a2b14 }\n.site .ed-ajout svg{ width:16px; height:16px }\n.ed-outils-ligne{ position:absolute; z-index:65; display:flex; gap:4px; padding:4px; background:var(--e-fond); border:1px solid #ff7a2b59; border-radius:999px; box-shadow:0 12px 26px -12px #000 }\n\n/* ---------- petits boutons posés dans la page */\n.ed-outil{ display:grid; place-items:center; flex:none; width:32px; height:32px; padding:0; border:1px solid #ff7a2b66; border-radius:50%; background:#110d0ce6; color:#f6eee8; cursor:pointer }\n.ed-outil svg{ width:16px; height:16px }\n.ed-outil:hover{ background:#ff7a2b; border-color:#ff7a2b; color:#1a0d06 }\n.ed-puce{ display:inline-flex; align-items:center; gap:6px; padding:7px 12px 7px 10px; border:1px solid #ff7a2b80; border-radius:999px; background:#110d0ceb; color:#ffb37a;\n  font:700 13px/1 \"Red Hat Display\",\"Segoe UI\",sans-serif; white-space:nowrap; cursor:pointer }\n.ed-puce svg{ width:15px; height:15px }\n.ed-puce:hover{ background:#ff7a2b; color:#1a0d06 }\nhtml.ed-actif .site .s-game-top .s-cover,html.ed-actif .site a.s-avancement,html.ed-actif .site a.s-shot,html.ed-actif .site .s-grid > a.s-card,html.ed-actif .site .s-card .s-cover{ position:relative }\n.site .s-cover > .ed-puce{ position:absolute; left:50%; bottom:10px; z-index:2; translate:-50% 0 }\n.site a.s-avancement > .ed-puce{ position:absolute; top:-15px; right:18px }\n.site .s-av-tete > .ed-puce{ margin-left:auto }\n\n/* ---------- accueil : vignettes */\nhtml.ed-actif:not(.ed-apercu) .site .s-grid > a.s-card{ user-select:none; -webkit-user-drag:none; -webkit-touch-callout:none }\n.site .s-card > .ed-outils{ position:absolute; top:18px; left:18px; right:18px; z-index:2; display:flex; align-items:flex-start; justify-content:space-between; pointer-events:none }\n.site .s-card > .ed-outils > *{ pointer-events:auto }\n.ed-groupe{ display:flex; gap:5px }\n.ed-poignee{ cursor:grab; touch-action:none }\n/* À la souris, les outils d'une vignette ou d'une photo n'apparaissent qu'à son survol ; au doigt, ils restent visibles. */\n@media (hover:hover){\n  .site .s-card > .ed-outils,.site .s-shot > .ed-outils{ opacity:0; transition:opacity .15s }\n  .site .s-card:hover > .ed-outils,.site .s-card:focus-within > .ed-outils,.site .s-card.ed-masquee > .ed-outils,\n  .site .s-shot:hover > .ed-outils,.site .s-shot:focus-within > .ed-outils{ opacity:1 }\n}\nhtml.ed-glisse,html.ed-glisse *{ cursor:grabbing !important; user-select:none !important }\n.site .s-card.ed-source{ opacity:.3 }\n.site .s-card.ed-cible{ outline:2.5px solid #ff7a2b; outline-offset:5px }\n.site .s-card.ed-fantome{ position:absolute; z-index:50; margin:0; pointer-events:none; translate:none !important; rotate:-2.5deg; scale:.97; opacity:.96;\n  box-shadow:0 30px 60px -18px #000,0 0 0 2px #ff7a2b }\n.site .s-card.ed-masquee .s-cover > :is(img,.s-ph),.site .s-card.ed-masquee .s-card-body{ opacity:.35; filter:grayscale(.7) }\n.site .s-card.ed-masquee .ed-poignee,.site .s-card.ed-masquee .ed-fleche{ display:none }\n.site .s-card.ed-masquee .ed-groupe{ margin-left:auto }\n.site .s-card.ed-masquee .s-cover::after,.site .s-card.ed-nouvelle .s-cover::after{ content:\"Masquée\"; position:absolute; left:8px; bottom:8px; padding:6px 10px; border-radius:999px;\n  background:#110d0ce6; color:#f6eee8; font:700 12px/1 var(--f-display) }\n.site .s-card.ed-nouvelle .s-cover::after{ content:\"Nouvelle · à publier\"; background:#ff7a2b; color:#1a0d06 }\n.site .s-card.ed-nouvelle.ed-masquee .s-cover::after{ content:\"Nouvelle · masquée\" }\n\n/* ---------- page d'un jeu : photos, fiche masquée */\n.site .s-shot > .ed-outils{ position:absolute; top:8px; left:8px; right:8px; display:flex; justify-content:flex-end; gap:5px }\n.site .ed-photo-ajout{ display:grid; place-content:center; justify-items:center; gap:8px; padding:10px; border:2px dashed #ff7a2b66; background:#ff7a2b0d; box-shadow:none;\n  color:#ffb37a; font:600 14px/1.25 var(--f-display); text-align:center; cursor:pointer }\n.site .ed-photo-ajout:hover{ border-color:#ff7a2b; background:#ff7a2b1a }\n.site .ed-photo-ajout svg{ width:26px; height:26px }\n.site .ed-note-galerie{ margin-top:12px }\n.site .ed-note-galerie:empty{ display:none }\n.site .ed-bandeau{ display:flex; flex-wrap:wrap; align-items:center; gap:10px 14px; margin:0 0 22px; padding:12px 14px 12px 16px; border:1px solid #ff7a2b59; border-radius:16px; background:#ff7a2b14 }\n.site .ed-bandeau > span{ flex:1; min-width:220px }\n\n/* ---------- aperçu : la page sans les outils */\nhtml.ed-apercu .ed-puce,html.ed-apercu .ed-ajout,html.ed-apercu .ed-photo-ajout,html.ed-apercu .ed-note-galerie,html.ed-apercu .ed-bandeau,\nhtml.ed-apercu .site .ed-outils,html.ed-apercu .ed-outils-ligne{ display:none !important }\nhtml.ed-apercu .site .s-card .s-cover::after{ content:none }\n\n@container vp (max-width:640px){\n  .site .s-card > .ed-outils{ top:14px; left:14px; right:14px }\n  .site .s-card .ed-outil{ width:30px; height:30px }\n  .site .ed-groupe{ gap:4px }\n}\n@media (max-width:640px){\n  .ed-barre{ left:8px; right:8px; bottom:8px; translate:none; max-width:none }\n  .ed-compte{ flex:1; padding-left:10px }\n  .ed-bulle{ bottom:78px }\n  .ed-panneau{ left:8px; right:8px; bottom:80px; width:auto }\n  .ed-fenetre{ width:100vw; max-height:90dvh; margin:auto 0 0; border-width:1px 0 0; border-radius:24px 24px 0 0 }\n  .ed-deux{ grid-template-columns:1fr }\n  .ed input[type=text],.ed input[type=number],.ed select{ font-size:16px }\n}\n@media (prefers-reduced-motion:reduce){\n  .ed-fenetre[open],.ed-panneau,.ed-menu,.ed-bulle,.site .ed-vise,.ed-barre.ed-attente .ed-compte small::before{ animation:none }\n}\n";
// ===== 00-socle.js =====
// Socle du mode édition : où l'on est, petits outils, photos gardées dans le navigateur, fenêtres.
//
// Les fichiers de ce dossier sont réunis par construire.py, dans l'ordre de leur nom, en un seul script (edition.js) :
// ils partagent donc leurs noms. Ce script n'est chargé que dans le navigateur où Lucas a allumé le mode édition.
const RACINE = new URL('.', document.currentScript.src).href; // edition.js est à la racine du site
const CLE = 'orwen-edition'; // réglages : {mode, depot, branche, jeton}
const CLE_BROUILLON = 'orwen-brouillon'; // changements pas encore publiés
const CLE_DEPOT = 'orwen-edition-depot'; // dernier état lu du dépôt, pour afficher sans attendre le réseau
const CLE_RECENTES = 'orwen-edition-recentes'; // images publiées depuis peu, encore montrées depuis ce navigateur
const LANGUE = document.documentElement.lang === 'en' ? 'en' : 'fr';
const AUTRE = LANGUE === 'fr' ? 'en' : 'fr';
const PAGE = (document.querySelector('main[data-page]') || { dataset: {} }).dataset; // {page, slug}
const NOMS_LANGUES = { fr: 'français', en: 'anglais' };

const lire = (cle) => { try { return JSON.parse(localStorage.getItem(cle)); } catch (erreur) { return null; } };
const garder = (cle, valeur) => {
  try {
    if (valeur === null) localStorage.removeItem(cle); else localStorage.setItem(cle, JSON.stringify(valeur));
    return true;
  } catch (erreur) {
    return false; // navigation privée ou place manquante
  }
};
const copie = (valeur) => (valeur === undefined ? undefined : JSON.parse(JSON.stringify(valeur)));
const egal = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// « titre/fr » dans un objet : lire, écrire (ou retirer, avec undefined).
const prendre = (objet, chemin) => chemin.split('/').reduce((o, cle) => (o === null || o === undefined ? undefined : o[cle]), objet);
const poser = (objet, chemin, valeur) => {
  const cles = chemin.split('/');
  const derniere = cles.pop();
  let o = objet;
  for (const cle of cles) {
    if (typeof o[cle] !== 'object' || o[cle] === null) o[cle] = {};
    o = o[cle];
  }
  if (valeur === undefined) delete o[derniere]; else o[derniere] = valeur;
};

// Texte saisi : espaces de début et de fin retirés, suites d'espaces réduites à une seule. Les espaces insécables restent.
const propre = (brut) => brut.replace(/[ \t\r\n]+/g, ' ').trim();
const slugifier = (texte) => texte.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const aujourdhui = () => {
  const jour = new Date();
  return `${jour.getFullYear()}-${String(jour.getMonth() + 1).padStart(2, '0')}-${String(jour.getDate()).padStart(2, '0')}`;
};
const pluriel = (nombre, mot, mots) => `${nombre} ${nombre > 1 ? mots || mot + 's' : mot}`;

// ---------- éléments de page
const ICONES = {
  crayon: 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z',
  oeil: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  oeilBarre: 'M3 3l18 18M10.6 5.1Q11.3 5 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.5 6.6C3.6 8.5 2 12 2 12s3.6 7 10 7c1.6 0 3.1-.4 4.4-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2',
  poignee: 'M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01',
  gauche: 'M15 6l-6 6 6 6', droite: 'M9 6l6 6-6 6', haut: 'M6 15l6-6 6 6', bas: 'M6 9l6 6 6-6',
  croix: 'M6 6l12 12M18 6 6 18', plus: 'M12 5v14M5 12h14', points: 'M5 12h.01M12 12h.01M19 12h.01',
  coche: 'M5 12.5l4.5 4.5L19 7.5', image: 'M4 5h16v14H4ZM4 16l4.5-4.5 4 4 3-3L20 17M9 9.5h.01',
  retour: 'M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',
};
const icone = (nom) => {
  const espace = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(espace, 'svg');
  for (const [attribut, valeur] of Object.entries({
    viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': nom === 'poignee' || nom === 'points' ? 3 : 2,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
  })) svg.setAttribute(attribut, valeur);
  const trait = document.createElementNS(espace, 'path');
  trait.setAttribute('d', ICONES[nom]);
  svg.append(trait);
  return svg;
};
// creer('p', {class: 'x', texte: 'Bonjour', clic: fonction}, enfant, enfant…) ; un attribut false, null ou undefined est omis.
const creer = (balise, attributs = {}, ...enfants) => {
  const element = document.createElement(balise);
  for (const [nom, valeur] of Object.entries(attributs)) {
    if (valeur === false || valeur === null || valeur === undefined) continue;
    if (nom === 'texte') element.textContent = valeur;
    else if (nom === 'clic') element.addEventListener('click', valeur);
    else element.setAttribute(nom, valeur === true ? '' : valeur);
  }
  element.append(...enfants.flat().filter((enfant) => enfant !== null && enfant !== undefined && enfant !== false));
  return element;
};
// bouton('Publier', action, {classe, icone, titre}) ; sans texte, `titre` sert aussi de nom pour les lecteurs d'écran.
const bouton = (texte, clic, options = {}) => creer('button', {
  type: 'button', class: options.classe || 'ed-bouton', title: options.titre, 'aria-label': texte ? null : options.titre, clic,
}, options.icone && icone(options.icone), texte && creer('span', { texte }));
// Petit bouton posé dans la page, parfois à l'intérieur d'un lien : le clic ne doit pas suivre ce lien.
const horsLien = (element, action) => {
  element.addEventListener('click', (evenement) => {
    evenement.preventDefault();
    evenement.stopPropagation();
    if (action) action(evenement);
  });
  return element;
};
const outil = (nomIcone, titre, action, classe = '') => horsLien(bouton('', null, { classe: `ed-outil ${classe}`.trim(), icone: nomIcone, titre }), action);
const puce = (texte, action, nomIcone = 'crayon') => horsLien(bouton(texte, null, { classe: 'ed-puce', icone: nomIcone }), action);

// ---------- fenêtres
// Une fenêtre du mode édition : un titre, un contenu, une croix. Elle quitte la page quand on la ferme.
const fenetre = (titre, ...contenu) => {
  const corps = creer('div', { class: 'ed-fenetre-corps' }, ...contenu);
  // Les boutons d'action, et le message d'erreur qui les précède, restent au pied de la fenêtre : ils ne défilent pas.
  const pied = [...corps.querySelectorAll(':scope > .ed-erreur, :scope > .ed-actions')];
  const boite = creer('dialog', { class: 'ed ed-fenetre' },
    creer('div', { class: 'ed-fenetre-tete' }, creer('h2', { texte: titre }),
      bouton('', () => boite.close(), { classe: 'ed-rond', icone: 'croix', titre: 'Fermer' })),
    corps, pied.length > 0 && creer('div', { class: 'ed-fenetre-pied' }, ...pied));
  // Un clic à côté la ferme, sauf si elle contient des champs : ce qu'on y a écrit ne doit pas se perdre sur un clic
  // maladroit. Le clic doit avoir commencé à côté, pour qu'une sélection de texte qui déborde ne ferme rien.
  let dehors = false;
  boite.addEventListener('pointerdown', (evenement) => { dehors = evenement.target === boite; });
  boite.addEventListener('click', (evenement) => { if (dehors && evenement.target === boite && !boite.querySelector('input, select')) boite.close(); });
  boite.addEventListener('close', () => boite.remove());
  document.body.append(boite);
  boite.showModal();
  return boite;
};
// Question à laquelle on répond par oui ou par non. `message` : un texte, un élément, ou une liste des deux.
const demander = (titre, message, oui, non = 'Annuler') => new Promise((resoudre) => {
  let reponse = false;
  const boite = fenetre(titre,
    ...[].concat(message).map((ligne) => (typeof ligne === 'string' ? creer('p', { texte: ligne }) : ligne)),
    creer('p', { class: 'ed-actions' },
      bouton(oui, () => { reponse = true; boite.close(); }, { classe: 'ed-bouton ed-principal' }),
      bouton(non, () => boite.close())));
  boite.addEventListener('close', () => resoudre(reponse));
});
const champ = (libelle, element, aide) => creer('label', { class: 'ed-champ' }, creer('span', { texte: libelle }), element, aide && creer('small', { texte: aide }));

// ---------- photos gardées dans ce navigateur
// Une photo ajoutée en brouillon est rangée dans IndexedDB ; le brouillon lui-même n'en retient que le nom et la taille.
let baseImages = null;
const ouvrirImages = () => baseImages || (baseImages = new Promise((resoudre, rejeter) => {
  const demande = indexedDB.open('orwen-edition', 1);
  demande.onupgradeneeded = () => demande.result.createObjectStore('images');
  demande.onsuccess = () => resoudre(demande.result);
  demande.onerror = () => rejeter(demande.error);
}));
const surImages = async (ecriture, action) => {
  const base = await ouvrirImages();
  return new Promise((resoudre, rejeter) => {
    const transaction = base.transaction('images', ecriture ? 'readwrite' : 'readonly');
    const demande = action(transaction.objectStore('images'));
    transaction.oncomplete = () => resoudre(demande.result);
    transaction.onerror = transaction.onabort = () => rejeter(transaction.error);
  });
};
const imageGarder = (chemin, blob) => surImages(true, (magasin) => magasin.put(blob, chemin));
const imageLire = (chemin) => surImages(false, (magasin) => magasin.get(chemin));
const imageOter = (chemin) => surImages(true, (magasin) => magasin.delete(chemin));
const imagesGardees = () => surImages(false, (magasin) => magasin.getAllKeys());
const enBase64 = async (blob) => {
  const octets = new Uint8Array(await blob.arrayBuffer());
  let binaire = '';
  for (let i = 0; i < octets.length; i += 0x8000) binaire += String.fromCharCode.apply(null, octets.subarray(i, i + 0x8000));
  return btoa(binaire);
};

// ===== 10-depot.js =====
// Lecture et écriture du contenu du site. Deux façons de faire, selon les réglages :
//   « github » : par l'API de GitHub, dans le dépôt du site, avec le jeton de Lucas. Un envoi fait un seul commit, que
//                GitHub construit et publie en une minute environ ;
//   « local »  : par l'aperçu lancé sur ce PC (outils/editer.py), qui écrit les fichiers et reconstruit le site.
// Les deux rendent le même état : {tete, arbre: {chemin: empreinte}, textes: {chemin: contenu des fichiers JSON}}.

// Ce que le mode édition lit et écrit dans le dépôt, et rien d'autre.
const UTILE = /^(contenu\/(site|libelles|a_revoir)\.json|contenu\/(jeux|avancement)\/[a-z0-9]+(-[a-z0-9]+)*\.json|images\/[a-z0-9]+(-[a-z0-9]+)*\/[\w.-]+)$/;

const depotGithub = (reglages) => {
  const base = `https://api.github.com/repos/${reglages.depot}`;
  const branche = reglages.branche.split('/').map(encodeURIComponent).join('/');
  // `forme` : 'texte' ou 'blob' pour recevoir le contenu brut d'un fichier, sinon du JSON.
  const api = async (methode, chemin, corps, forme) => {
    let reponse;
    try {
      reponse = await fetch(base + chemin, {
        method: methode, cache: 'no-store', body: corps ? JSON.stringify(corps) : undefined,
        headers: {
          Authorization: `Bearer ${reglages.jeton}`, 'X-GitHub-Api-Version': '2022-11-28',
          Accept: forme ? 'application/vnd.github.raw+json' : 'application/vnd.github+json',
          ...(corps ? { 'Content-Type': 'application/json' } : {}),
        },
      });
    } catch (erreur) {
      throw new Error('GitHub ne répond pas : la connexion est peut-être coupée.');
    }
    if (reponse.ok) return forme === 'texte' ? reponse.text() : forme === 'blob' ? reponse.blob() : reponse.json();
    const ecriture = methode !== 'GET';
    const erreur = new Error(
      reponse.status === 401 ? 'GitHub refuse le jeton : il est expiré ou mal recopié. Refais-en un et colle-le dans les réglages du mode édition.'
        : reponse.status === 403 && reponse.headers.get('x-ratelimit-remaining') === '0' ? 'Trop de demandes envoyées à GitHub : réessaie dans quelques minutes.'
          : (reponse.status === 403 || reponse.status === 404) && ecriture ? 'Le jeton n\'a pas le droit d\'écrire dans le dépôt : sur github.com, sa permission « Contents » doit être « Read and write ».'
            : reponse.status === 403 || reponse.status === 404 ? `Le jeton ne donne pas accès au dépôt ${reglages.depot}, branche ${reglages.branche}.`
              : `GitHub a répondu ${reponse.status}.`);
    erreur.code = reponse.status;
    throw erreur;
  };
  const arbreDe = async (sha) => {
    const arbre = {};
    for (const entree of (await api('GET', `/git/trees/${sha}?recursive=1`)).tree) if (entree.type === 'blob') arbre[entree.path] = entree.sha;
    return arbre;
  };
  return {
    nom: 'github',
    // `ancien` : l'état lu la fois d'avant. Si le dépôt n'a pas bougé, une seule demande suffit ; sinon seuls les
    // fichiers qui ont changé sont relus. `perimee` : la tête d'avant un envoi qu'on vient de faire. Dans la seconde
    // qui suit, GitHub répond parfois encore celle-là : on insiste un peu, et faute de mieux on garde l'état qu'on a.
    async charger(ancien, perimee) {
      let tete = null;
      for (let essai = 0; essai < 12; essai += 1) {
        tete = (await api('GET', `/git/ref/heads/${branche}`)).object.sha;
        if (tete !== perimee) break;
        await new Promise((fini) => setTimeout(fini, 500));
      }
      if (ancien && (ancien.tete === tete || tete === perimee)) return ancien;
      const complet = await arbreDe(tete);
      const arbre = {}, textes = {};
      for (const [chemin, sha] of Object.entries(complet)) if (UTILE.test(chemin)) arbre[chemin] = sha;
      await Promise.all(Object.entries(arbre).filter(([chemin]) => chemin.endsWith('.json')).map(async ([chemin, sha]) => {
        const connu = ancien && ancien.arbre[chemin] === sha && typeof ancien.textes[chemin] === 'string';
        textes[chemin] = connu ? ancien.textes[chemin] : await api('GET', `/git/blobs/${sha}`, null, 'texte');
      }));
      return { tete, arbre, textes };
    },
    // Un seul commit pour tout le lot : {ecrire: {chemin: texte}, binaires: {chemin: Blob}, supprimer: [chemins],
    // reprendre: {chemin: empreinte d'un contenu déjà dans le dépôt}, message}. Rend l'empreinte du commit.
    async envoyer(parent, lot) {
      const racine = (await api('GET', `/git/commits/${parent}`)).tree.sha;
      const entrees = Object.entries(lot.ecrire).map(([path, content]) => ({ path, mode: '100644', type: 'blob', content }));
      for (const [path, blob] of Object.entries(lot.binaires)) {
        const { sha } = await api('POST', '/git/blobs', { content: await enBase64(blob), encoding: 'base64' });
        entrees.push({ path, mode: '100644', type: 'blob', sha });
      }
      for (const [path, sha] of Object.entries(lot.reprendre || {})) entrees.push({ path, mode: '100644', type: 'blob', sha });
      for (const path of lot.supprimer) entrees.push({ path, mode: '100644', type: 'blob', sha: null });
      const arbre = await api('POST', '/git/trees', { base_tree: racine, tree: entrees });
      const commit = await api('POST', '/git/commits', { message: lot.message, tree: arbre.sha, parents: [parent] });
      try {
        await api('PATCH', `/git/refs/heads/${branche}`, { sha: commit.sha, force: false });
      } catch (erreur) {
        // Quelqu'un (Lucas sur un autre appareil, ou Claude depuis le PC) a publié entre-temps : il faut repartir du nouvel état.
        if (erreur.code === 422 || erreur.code === 409) erreur.depasse = true;
        throw erreur;
      }
      return commit.sha;
    },
    async historique(nombre) {
      return (await api('GET', `/commits?sha=${encodeURIComponent(reglages.branche)}&per_page=${nombre}`)).map((commit) => ({
        sha: commit.sha, message: commit.commit.message, date: commit.commit.committer.date,
      }));
    },
    // Ce qu'un commit a changé : {parent, parents, fichiers: [{chemin, statut, sha, ancien}]}.
    async detail(sha) {
      const commit = await api('GET', `/commits/${sha}`);
      return {
        parent: commit.parents[0] && commit.parents[0].sha, parents: commit.parents.length,
        fichiers: (commit.files || []).map((f) => ({ chemin: f.filename, statut: f.status, sha: f.sha, ancien: f.previous_filename })),
      };
    },
    arbreDe,
    texte: (sha) => api('GET', `/git/blobs/${sha}`, null, 'texte'),
    // Essai du jeton au moment d'allumer le mode édition : il doit pouvoir lire les fiches du dépôt. Rend leur nombre.
    async verifier() {
      const liste = await api('GET', `/contents/contenu/jeux?ref=${encodeURIComponent(reglages.branche)}`);
      return liste.filter((fichier) => fichier.name.endsWith('.json')).length;
    },
  };
};

const depotLocal = () => {
  const appeler = async (methode, adresse, corps) => {
    let reponse;
    try {
      reponse = await fetch(RACINE + adresse, {
        method: methode, cache: 'no-store', headers: corps ? { 'Content-Type': 'application/json' } : {}, body: corps ? JSON.stringify(corps) : undefined,
      });
    } catch (erreur) {
      throw new Error('L\'aperçu de ce PC ne répond plus : relance « py outils/editer.py ».');
    }
    if ([404, 405, 501].includes(reponse.status)) throw new Error('Cette adresse ne sait pas enregistrer sur ce PC : lance « py outils/editer.py », ou choisis GitHub dans les réglages du mode édition.');
    const donnees = await reponse.json().catch(() => ({}));
    if (!reponse.ok) throw new Error(donnees.erreur || `L'aperçu a répondu ${reponse.status}.`);
    return donnees;
  };
  return {
    nom: 'local',
    charger: () => appeler('GET', '_etat'),
    async envoyer(parent, lot) {
      const binaires = {};
      for (const [chemin, blob] of Object.entries(lot.binaires)) binaires[chemin] = await enBase64(blob);
      return (await appeler('POST', '_publier', { ecrire: lot.ecrire, binaires, supprimer: lot.supprimer, message: lot.message })).tete;
    },
  };
};

// ===== 20-donnees.js =====
// L'état du mode édition : ce que contient le dépôt, le brouillon de Lucas, et le mélange des deux, que la page montre.
// Les règles de la seconde moitié (pourcentage, libellé, galerie, icônes du haut) reprennent celles de construire.py :
// elles doivent donner le même résultat que lui, pour que le brouillon ressemble au site une fois publié.
const F_SITE = 'contenu/site.json';
const F_LIBELLES = 'contenu/libelles.json';
const F_REVOIR = 'contenu/a_revoir.json';
const fJeu = (slug) => `contenu/jeux/${slug}.json`;
const fAvancement = (slug) => `contenu/avancement/${slug}.json`;
const fImage = (slug, nom) => `images/${slug}/${nom}`;
const fTailles = (slug) => `images/${slug}/tailles.json`;
const BILINGUE = /^(.+)\/(fr|en)$/; // « accroche/fr » : un champ écrit dans les deux langues

const etat = {
  reglages: null, // {mode, depot, branche, jeton}
  transport: null, // depotGithub(…) ou depotLocal()
  depot: null, // {tete, arbre, textes} : dernier état lu du dépôt
  base: {}, // ses fichiers JSON, analysés
  brouillon: { modifs: {}, nouveaux: {}, images: {}, vus: [] },
  donnees: {}, // base + brouillon : ce que la page doit montrer
  reference: null, // edition/donnees.json : version du site construit, textes d'interface, règle du pourcentage
  urls: {}, // photos gardées dans ce navigateur : chemin → adresse « blob: »
  apercu: false, // vrai : la page est montrée comme aux visiteurs, sans les outils
};
const pret = () => !!(etat.depot && etat.reference);

// ---------- brouillon
// modifs   : {« fichier#chemin » : {v: nouvelle valeur, avant: celle du dépôt}} ou {s: 1, avant} pour un champ retiré ;
// nouveaux : {fichier: contenu} pour une fiche créée depuis le site ;
// images   : {chemin: {l, h}} pour une icône ou une photo ajoutée (le fichier lui-même est dans IndexedDB) ;
// vus      : textes « à revoir » que Lucas a marqués comme relus.
const lireBrouillon = () => { etat.brouillon = { modifs: {}, nouveaux: {}, images: {}, vus: [], ...(lire(CLE_BROUILLON) || {}) }; };
const brouillonVide = () => {
  const { modifs, nouveaux, images, vus } = etat.brouillon;
  return !Object.keys(modifs).length && !Object.keys(nouveaux).length && !Object.keys(images).length && !vus.length;
};
const garderBrouillon = () => {
  if (!garder(CLE_BROUILLON, brouillonVide() ? null : etat.brouillon)) {
    dire('Ce navigateur refuse de garder le brouillon (navigation privée ?) : publie avant de quitter la page.', true);
  }
};
const analyser = () => {
  etat.base = {};
  for (const [chemin, texte] of Object.entries(etat.depot ? etat.depot.textes : {})) {
    try { etat.base[chemin] = JSON.parse(texte); } catch (erreur) { /* fichier illisible : on fait sans */ }
  }
};
const fusionner = () => {
  const donnees = { ...etat.base };
  const copies = new Set();
  for (const [fichier, objet] of Object.entries(etat.brouillon.nouveaux)) {
    if (donnees[fichier]) continue; // la fiche existe désormais dans le dépôt : c'est lui qui fait foi
    donnees[fichier] = copie(objet);
    copies.add(fichier);
  }
  for (const [cle, modif] of Object.entries(etat.brouillon.modifs)) {
    const [fichier, chemin] = cle.split('#');
    if (!donnees[fichier]) continue;
    if (!copies.has(fichier)) {
      donnees[fichier] = copie(donnees[fichier]);
      copies.add(fichier);
    }
    poser(donnees[fichier], chemin, modif.s ? undefined : copie(modif.v));
  }
  etat.donnees = donnees;
};
const valeur = (fichier, chemin) => prendre(etat.donnees[fichier], chemin);
// Note un changement dans le brouillon ; `undefined` retire le champ du fichier. Revenir à la valeur du dépôt efface la
// note. `discret` : ne rien redessiner tout de suite, parce qu'un autre changement suit.
const modifier = (fichier, chemin, nouvelle, discret = false) => {
  if (etat.brouillon.nouveaux[fichier]) {
    poser(etat.brouillon.nouveaux[fichier], chemin, copie(nouvelle));
  } else {
    const cle = `${fichier}#${chemin}`;
    const avant = prendre(etat.base[fichier], chemin);
    if (egal(avant, nouvelle)) delete etat.brouillon.modifs[cle];
    else etat.brouillon.modifs[cle] = nouvelle === undefined ? { s: 1, avant: copie(avant) } : { v: copie(nouvelle), avant: copie(avant) };
  }
  if (!discret) apresChangement();
};
const apresChangement = () => {
  garderBrouillon();
  fusionner();
  rafraichir();
};
const oterImage = async (chemin) => {
  delete etat.brouillon.images[chemin];
  if (etat.urls[chemin]) URL.revokeObjectURL(etat.urls[chemin]);
  delete etat.urls[chemin];
  await imageOter(chemin).catch(() => {});
};
// Une photo du brouillon que plus aucune galerie ne cite n'a plus de raison d'y rester.
const menageImages = async () => {
  fusionner();
  for (const chemin of Object.keys(etat.brouillon.images)) {
    const [, slug, nom] = chemin.split('/');
    if (nom === 'icone.webp') continue;
    const galeries = valeur(fJeu(slug), 'galerie') || {};
    if (![].concat(galeries.fr || [], galeries.en || []).includes(nom)) await oterImage(chemin);
  }
};
const viderBrouillon = async () => {
  for (const chemin of Object.keys(etat.brouillon.images)) await oterImage(chemin);
  etat.brouillon = { modifs: {}, nouveaux: {}, images: {}, vus: [] };
  garderBrouillon();
  fusionner();
};
// Un changement du brouillon que le dépôt contient déjà n'en est plus un : il a été publié depuis un autre appareil.
const elaguerBrouillon = () => {
  const { modifs, nouveaux } = etat.brouillon;
  let retires = 0;
  for (const [cle, modif] of Object.entries(modifs)) {
    const [fichier, chemin] = cle.split('#');
    if (!(fichier in etat.base) || !egal(prendre(etat.base[fichier], chemin), modif.s ? undefined : modif.v)) continue;
    delete modifs[cle];
    retires += 1;
  }
  for (const fichier of Object.keys(nouveaux)) {
    if (!(fichier in etat.base)) continue;
    delete nouveaux[fichier];
    retires += 1;
  }
  if (retires) garderBrouillon();
};

// ---------- ce que le brouillon contient, dit en clair
const NOMS_CHAMPS = {
  titre: 'nom', genre: 'genre', accroche: 'accroche', description: 'description', points: 'points forts',
  resume: 'résumé de l\'avancement', fait: 'dernières modifications', en_cours: 'travail en cours', a_venir: 'suite prévue',
  sur_titre: 'ligne au-dessus du titre', texte: 'présentation', apropos: 'à propos', contact_phrase: 'phrase de contact', galerie: 'photos',
};
const nomDuChamp = (fichier, nom) => (fichier === F_SITE && nom === 'titre' ? 'titre' : NOMS_CHAMPS[nom] || nom);
const nomFiche = (slug) => {
  const fiche = jeu(slug);
  return fiche ? titreDe(fiche, 'fr') : slug;
};
// Une ligne par changement : {titre, detail, cles}. `cles` dit quoi retirer du brouillon pour l'annuler.
const resumeBrouillon = () => {
  const lignes = [];
  const { modifs, nouveaux, images, vus } = etat.brouillon;
  const ajouter = (titre, detail, cles) => lignes.push({ titre, detail, cles });
  const court = (v) => {
    const texte = v === undefined || v === '' ? '(vide)' : String(v);
    return texte.length > 90 ? `${texte.slice(0, 88)}…` : texte;
  };
  // Pour un champ fait de plusieurs lignes : ce qui a bougé, plutôt que les deux listes entières.
  const ecart = (avant, apres) => {
    if (!Array.isArray(avant) || !Array.isArray(apres)) return `${court(avant)} → ${court(apres)}`;
    if (avant.length !== apres.length) return `${pluriel(avant.length, 'ligne')} → ${pluriel(apres.length, 'ligne')}`;
    const changees = apres.map((ligne, i) => (ligne === avant[i] ? null : i)).filter((i) => i !== null);
    return changees.length === 1 ? `ligne ${changees[0] + 1} : ${court(apres[changees[0]])}` : `${changees.length} lignes changées ou déplacées`;
  };
  for (const fichier of Object.keys(nouveaux)) {
    const trouve = /^contenu\/jeux\/(.+)\.json$/.exec(fichier);
    if (trouve) ajouter(`Nouvelle fiche : ${titreDe({ ...nouveaux[fichier], slug: trouve[1] }, 'fr')}`, `orwen.fr/${trouve[1]}/`, { nouveau: trouve[1] });
  }
  const parFichier = {};
  for (const cle of Object.keys(modifs)) {
    const [fichier, chemin] = cle.split('#');
    (parFichier[fichier] = parFichier[fichier] || []).push(chemin);
  }
  const deplacees = Object.keys(modifs).filter((cle) => /^contenu\/jeux\/[^#]+#ordre$/.test(cle));
  if (deplacees.length) ajouter('Accueil : ordre de la liste', pluriel(deplacees.length, 'fiche déplacée', 'fiches déplacées'), { modifs: deplacees });
  const icones = new Set(Object.keys(images).filter((chemin) => chemin.endsWith('/icone.webp')));
  for (const [fichier, chemins] of Object.entries(parFichier)) {
    const deJeu = /^contenu\/jeux\/(.+)\.json$/.exec(fichier);
    const deSuivi = /^contenu\/avancement\/(.+)\.json$/.exec(fichier);
    const qui = deJeu ? nomFiche(deJeu[1]) : deSuivi ? nomFiche(deSuivi[1]) : fichier === F_SITE ? 'Accueil' : fichier;
    const restants = new Set(chemins);
    const sortir = (...noms) => noms.filter((nom) => restants.delete(nom)).map((nom) => `${fichier}#${nom}`);
    restants.delete('ordre');
    if (deJeu) {
      const cache = sortir('masque');
      if (cache.length) ajouter(`${qui} : ${valeur(fichier, 'masque') ? 'masqué de l\'accueil' : 'de retour dans l\'accueil'}`, '', { modifs: cache });
      const sortie = sortir('etat', 'play');
      if (sortie.length) {
        ajouter(`${qui} : sortie`, valeur(fichier, 'etat') === 'disponible' ? `sorti sur Google Play (${valeur(fichier, 'play') || 'sans lien'})` : 'pas encore sorti', { modifs: sortie });
      }
      const image = fImage(deJeu[1], 'icone.webp');
      const marque = sortir('icone_site');
      if (marque.length || icones.has(image)) ajouter(`${qui} : icône`, 'nouvelle image', { modifs: marque, images: icones.delete(image) ? [image] : [] });
    }
    if (deSuivi) {
      const reglages = sortir('affiche', 'libelle', 'pause');
      const fiche = jeu(deSuivi[1]);
      if (reglages.length) ajouter(`${qui} : avancement`, fiche ? `${pourcentage(fiche.slug)} % · ${nomLibelle(libelleDe(fiche), 'court', 'fr')}` : '', { modifs: reglages });
    }
    if (fichier === F_SITE && restants.has('vedettes')) ajouter('Accueil : icônes du haut de page', (valeur(F_SITE, 'vedettes') || []).map(nomFiche).join(', '), { modifs: sortir('vedettes') });
    if (fichier === F_LIBELLES && restants.has('libelles')) ajouter('Libellés', libelles().map((libelle) => nomLibelle(libelle, 'court', 'fr')).join(', '), { modifs: sortir('libelles') });
    for (const chemin of restants) {
      const trouve = BILINGUE.exec(chemin);
      const modif = modifs[`${fichier}#${chemin}`];
      const nom = trouve ? `${nomDuChamp(fichier, trouve[1])} (${NOMS_LANGUES[trouve[2]]})` : chemin;
      const detail = trouve && trouve[1] === 'galerie' ? pluriel((modif.v || []).length, 'photo') : ecart(modif.avant, modif.s ? undefined : modif.v);
      // Le dépôt a pu changer ce champ depuis que le brouillon l'a noté (un autre appareil, ou Claude depuis le PC).
      const rechange = egal(prendre(etat.base[fichier], chemin), modif.avant) ? '' : ' — attention : ce texte a aussi changé sur le site depuis, ta version le remplacera';
      ajouter(`${qui} : ${nom}`, detail + rechange, { modifs: [`${fichier}#${chemin}`] });
    }
  }
  // Une icône changée sur une fiche qui avait déjà une icône venue du site : seule l'image est dans le brouillon.
  for (const image of icones) ajouter(`${nomFiche(image.split('/')[1])} : icône`, 'nouvelle image', { images: [image] });
  if (vus.length) ajouter('Textes à revoir', `${pluriel(vus.length, 'texte marqué', 'textes marqués')} comme relu${vus.length > 1 ? 's' : ''}`, { vus: true });
  return lignes;
};
const retirerDuBrouillon = async (cles) => {
  for (const cle of cles.modifs || []) delete etat.brouillon.modifs[cle];
  if (cles.nouveau) {
    delete etat.brouillon.nouveaux[fJeu(cles.nouveau)];
    delete etat.brouillon.nouveaux[fAvancement(cles.nouveau)];
  }
  if (cles.vus) etat.brouillon.vus = [];
  for (const chemin of cles.images || []) await oterImage(chemin);
  await menageImages();
  apresChangement();
};

// ---------- textes en deux langues
const texteDe = (champ, langue = LANGUE) => (champ && typeof champ === 'object' && (champ[langue] || champ[langue === 'fr' ? 'en' : 'fr'])) || '';
const lignesDe = (champ, langue = LANGUE) => {
  if (!champ || typeof champ !== 'object') return [];
  const propres = Array.isArray(champ[langue]) && champ[langue].length ? champ[langue] : champ[langue === 'fr' ? 'en' : 'fr'];
  return (Array.isArray(propres) ? propres : []).filter(Boolean);
};
// Les textes anglais plus anciens que leur version française : {« jeux/x#accroche » : 'en'}. C'est le contenu de
// contenu/a_revoir.json, corrigé de ce que le brouillon change : un texte français modifié sans son anglais y entre,
// un texte anglais modifié en sort, de même qu'un texte que Lucas a marqué comme relu.
const aRevoir = () => {
  const liste = { ...(etat.base[F_REVOIR] || {}) };
  const touches = {};
  for (const cle of Object.keys(etat.brouillon.modifs)) {
    const [fichier, chemin] = cle.split('#');
    const trouve = BILINGUE.exec(chemin);
    if (!trouve || trouve[1] === 'galerie' || !fichier.startsWith('contenu/')) continue;
    const nom = `${fichier.slice(8, -5)}#${trouve[1]}`;
    (touches[nom] = touches[nom] || new Set()).add(trouve[2]);
  }
  for (const [nom, langues] of Object.entries(touches)) {
    if (langues.has('en')) delete liste[nom]; else liste[nom] = 'en';
  }
  for (const [fichier, objet] of Object.entries(etat.brouillon.nouveaux)) {
    for (const [cle, v] of Object.entries(objet)) {
      if (!v || typeof v !== 'object' || !('fr' in v) || cle === 'galerie') continue;
      const plein = (x) => (Array.isArray(x) ? x.length > 0 : !!x);
      if (plein(v.fr) && !plein(v.en)) liste[`${fichier.slice(8, -5)}#${cle}`] = 'en';
    }
  }
  for (const vu of etat.brouillon.vus) delete liste[vu];
  return liste;
};

// ---------- fiches
const jeux = () => Object.keys(etat.donnees).filter((fichier) => fichier.startsWith('contenu/jeux/'))
  .map((fichier) => ({ ...etat.donnees[fichier], slug: fichier.slice(13, -5) }))
  .sort((a, b) => ((a.ordre || 0) - (b.ordre || 0)) || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
const jeu = (slug) => etat.donnees[fJeu(slug)] && { ...etat.donnees[fJeu(slug)], slug };
const avancement = (slug) => etat.donnees[fAvancement(slug)];
const titreDe = (fiche, langue = LANGUE) => texteDe(fiche.titre, langue) || fiche.slug;
const typeDe = (fiche) => fiche.type || 'jeu';
const estNouvelle = (slug) => fJeu(slug) in etat.brouillon.nouveaux && !(fJeu(slug) in etat.base);
const adressePage = (slug, langue = LANGUE) => RACINE + (langue === 'en' ? 'en/' : '') + (slug ? slug + '/' : '');
const adresseAvancement = (slug, langue = LANGUE) => adressePage(slug, langue) + etat.reference.textes[langue].seg_avancement + '/';

// ---------- pourcentage et libellé
const libelles = () => (etat.donnees[F_LIBELLES] && etat.donnees[F_LIBELLES].libelles) || [];
const libelleDeRole = (role) => libelles().find((libelle) => libelle.role === role) || etat.reference.roles[role];
const libelleAutomatique = (avance) => {
  const aSeuil = libelles().filter((libelle) => !libelle.role && typeof libelle.seuil === 'number').sort((a, b) => b.seuil - a.seuil);
  if (!aSeuil.length) return libelles().find((libelle) => !libelle.role) || etat.reference.roles.pause;
  return aSeuil.find((libelle) => avance >= libelle.seuil) || aSeuil[aSeuil.length - 1];
};
const nomLibelle = (libelle, forme = 'court', langue = LANGUE) => (forme === 'long' && texteDe(libelle.long, langue)) || texteDe(libelle.court, langue) || libelle.id;
const classeBadge = (libelle) => (libelle.role === 'sorti' ? 'ok' : libelle.accent ? 'proche' : 'soon');
const pourcentageCalcule = (slug) => {
  const suivi = (avancement(slug) || {}).suivi;
  return typeof suivi === 'number' ? Math.floor(Math.trunc(suivi * etat.reference.prudence) / 5) * 5 : null;
};
const pourcentage = (slug) => {
  const suivi = avancement(slug);
  if (!suivi) return null;
  if (Number.isInteger(suivi.affiche)) return Math.max(0, Math.min(100, suivi.affiche));
  return pourcentageCalcule(slug) || 0;
};
const libelleDe = (fiche) => {
  if (fiche.etat === 'disponible') return libelleDeRole('sorti');
  const suivi = avancement(fiche.slug) || {};
  const choisi = libelles().find((libelle) => libelle.id === suivi.libelle && libelle.role !== 'sorti');
  if (choisi) return choisi;
  if (suivi.pause) return libelleDeRole('pause');
  return libelleAutomatique(pourcentage(fiche.slug) || 0);
};
const dateLongue = (jour, langue = LANGUE) => {
  const [annee, mois, numero] = String(jour || '').split('-').map(Number);
  const nom = etat.reference.mois[langue][mois - 1];
  if (!annee || !nom || !numero) return String(jour || '');
  return langue === 'fr' ? `${numero === 1 ? '1er' : numero} ${nom} ${annee}` : `${nom} ${numero}, ${annee}`;
};

// ---------- images
const existe = (chemin) => chemin in etat.brouillon.images || chemin in etat.depot.arbre;
// Une image du brouillon, ou publiée depuis trop peu de temps pour être déjà sur le site, vient de ce navigateur.
const adresseImage = (chemin) => etat.urls[chemin] || RACINE + chemin;
const aIcone = (slug) => existe(fImage(slug, 'icone.webp'));
// Photos d'une fiche pour une langue : la liste écrite dans son champ `galerie`, sinon les captures importées pour
// cette langue (capture-<langue>-<n>.webp).
const photosDe = (fiche, langue) => {
  const choisies = fiche.galerie && typeof fiche.galerie === 'object' ? fiche.galerie[langue] : null;
  if (Array.isArray(choisies)) return choisies.filter((nom) => typeof nom === 'string' && /^[\w.-]+$/.test(nom) && existe(fImage(fiche.slug, nom)));
  const debut = `images/${fiche.slug}/capture-${langue}-`;
  return Object.keys(etat.depot.arbre).filter((chemin) => chemin.startsWith(debut) && chemin.endsWith('.webp')).map((chemin) => chemin.slice(chemin.lastIndexOf('/') + 1)).sort();
};
const galerieChoisie = (fiche, langue) => !!fiche.galerie && typeof fiche.galerie === 'object' && Array.isArray(fiche.galerie[langue]);
// Une langue sans photo reprend celles de l'autre, sauf si sa galerie a été vidée exprès.
const galerieReprise = (fiche, langue = LANGUE) => !galerieChoisie(fiche, langue) && !photosDe(fiche, langue).length && photosDe(fiche, langue === 'fr' ? 'en' : 'fr').length > 0;
const galerie = (fiche, langue = LANGUE) => photosDe(fiche, galerieReprise(fiche, langue) ? (langue === 'fr' ? 'en' : 'fr') : langue);
const taillesDe = (slug) => {
  const mesures = { ...(etat.donnees[fTailles(slug)] || {}) };
  for (const [chemin, image] of Object.entries(etat.brouillon.images)) {
    if (chemin.startsWith(`images/${slug}/`)) mesures[chemin.slice(chemin.lastIndexOf('/') + 1)] = [image.l, image.h];
  }
  return mesures;
};
const vedettes = () => {
  const avecIcone = jeux().filter((fiche) => !fiche.masque && aIcone(fiche.slug));
  const choisies = [];
  for (const slug of valeur(F_SITE, 'vedettes') || []) {
    const fiche = avecIcone.find((autre) => autre.slug === slug);
    if (fiche && !choisies.includes(fiche)) choisies.push(fiche);
  }
  for (const fiche of avecIcone) if (!choisies.includes(fiche)) choisies.push(fiche);
  return choisies.slice(0, 3);
};

// ===== 30-vue.js =====
// Ce que la page montre. Le HTML vient du générateur et date de la dernière publication ; ces fonctions y reportent
// l'état d'aujourd'hui (dépôt + brouillon) : Lucas voit donc ses changements tout de suite, tels que le site les
// montrera une fois publiés. Rien n'est redessiné de zéro : on corrige ce qui diffère, pour rester fidèle au générateur.

// « jeux/elyndra#accroche/fr », dans l'attribut d'un élément → ['contenu/jeux/elyndra.json', 'accroche/fr'].
const cible = (element, attribut) => {
  const [court, chemin] = element.getAttribute(attribut).split('#');
  return [`contenu/${court}.json`, chemin];
};
// Texte d'un champ : le sien, sinon celui de l'autre langue (`repris`), comme le fait le générateur.
const texteAffiche = (fichier, chemin) => {
  const sien = valeur(fichier, chemin);
  if (typeof sien === 'string' && sien) return { texte: sien, repris: false };
  const trouve = BILINGUE.exec(chemin);
  const repli = trouve ? valeur(fichier, `${trouve[1]}/${trouve[2] === 'fr' ? 'en' : 'fr'}`) : '';
  if (typeof repli === 'string' && repli) return { texte: repli, repris: true };
  return { texte: trouve && trouve[1] === 'titre' && fichier.startsWith('contenu/jeux/') ? fichier.slice(13, -5) : '', repris: false };
};
// Titre de l'accueil : « Des jeux *dans la poche*. », les étoiles marquant la partie en couleur.
const poserRelief = (element, brut) => {
  const noeuds = [];
  let fin = 0;
  for (const trouve of brut.matchAll(/\*(.+?)\*/g)) {
    noeuds.push(brut.slice(fin, trouve.index), creer('em', { texte: trouve[1] }));
    fin = trouve.index + trouve[0].length;
  }
  noeuds.push(brut.slice(fin));
  element.replaceChildren(...noeuds.filter((noeud) => noeud !== ''));
};
const lireRelief = (element) => [...element.childNodes].map((noeud) => (noeud.nodeName === 'EM' ? `*${noeud.textContent}*` : noeud.textContent)).join('');

let listeEnSaisie = null; // liste dont une ligne est en cours de saisie : la page fait foi, on n'y touche pas
const vueTextes = () => {
  for (const element of document.querySelectorAll('[data-ed], [data-ed-vue]')) {
    if (element === document.activeElement) continue;
    const modifiable = element.hasAttribute('data-ed');
    const [fichier, chemin] = cible(element, modifiable ? 'data-ed' : 'data-ed-vue');
    if (!etat.donnees[fichier]) continue;
    const { texte: valeurChamp, repris } = texteAffiche(fichier, chemin);
    // Un titre comme « Gravity Sort : avancement » montre le champ dans une phrase, que donne data-ed-gabarit.
    const texte = element.dataset.edGabarit ? element.dataset.edGabarit.replace('{t}', valeurChamp) : valeurChamp;
    if (element.dataset.edForme === 'relief') {
      // `edBrut` : le titre vient d'être saisi avec ses étoiles, il faut lui rendre sa partie en couleur.
      if (element.dataset.edBrut || lireRelief(element) !== texte) poserRelief(element, texte);
      delete element.dataset.edBrut;
    } else if (element.textContent !== texte || element.childElementCount) element.textContent = texte; // y compris un <br> resté d'une saisie
    if (modifiable) element.classList.toggle('ed-repris', repris);
    if (element.classList.contains('s-av-resume')) element.hidden = etat.apercu && !texte;
  }
  for (const liste of document.querySelectorAll('[data-ed-liste]')) {
    const [fichier, chemin] = cible(liste, 'data-ed-liste');
    const trouve = BILINGUE.exec(chemin);
    if (!etat.donnees[fichier] || !trouve) continue;
    const voulues = lignesDe(valeur(fichier, trouve[1]), trouve[2]);
    if (liste !== listeEnSaisie) {
      const balise = liste.tagName === 'UL' ? 'li' : 'p';
      const enfants = [...liste.children];
      voulues.forEach((ligne, i) => {
        const enfant = enfants[i] || liste.appendChild(document.createElement(balise));
        if (enfant.textContent !== ligne || enfant.childElementCount) enfant.textContent = ligne;
      });
      enfants.slice(voulues.length).forEach((enfant) => enfant.remove());
    }
    // Une liste vide est cachée aux visiteurs ; en mode édition elle reste là, pour qu'on puisse y écrire.
    const vide = etat.apercu && !voulues.length;
    const rubrique = liste.closest('.s-rubrique');
    if (rubrique) rubrique.hidden = vide; else if (liste.tagName === 'UL') liste.hidden = vide;
  }
};

// ---------- icône d'une fiche
const teinte = (slug) => [...slug].reduce((somme, lettre) => (somme * 31 + lettre.charCodeAt(0)) % 360, 7);
const poserCouverture = (boite, fiche) => {
  if (!boite) return;
  const actuel = boite.querySelector(':scope > img, :scope > .s-ph');
  const chemin = fImage(fiche.slug, 'icone.webp');
  if (existe(chemin)) {
    const adresse = adresseImage(chemin);
    if (actuel && actuel.tagName === 'IMG') {
      if (actuel.src !== adresse) actuel.src = adresse;
      return;
    }
    const image = creer('img', { src: adresse, alt: '', width: '384', height: '384', decoding: 'async' });
    if (actuel) actuel.replaceWith(image); else boite.prepend(image);
    return;
  }
  // Sans icône : les initiales du nom sur un fond de couleur. La couleur d'une fiche déjà publiée est celle du générateur.
  const initiales = (titreDe(fiche).match(/[A-Za-zÀ-ÿ]+/g) || []).slice(0, 2).map((mot) => mot[0]).join('').toUpperCase();
  if (actuel && actuel.classList.contains('s-ph')) {
    if (actuel.textContent !== initiales) actuel.textContent = initiales;
    return;
  }
  const remplacement = creer('span', { class: 's-ph', style: `--h:${teinte(fiche.slug)}`, 'aria-hidden': 'true', texte: initiales });
  if (actuel) actuel.replaceWith(remplacement); else boite.prepend(remplacement);
};

// ---------- accueil
const nouvelleCarte = (modele, fiche) => {
  const carte = modele.cloneNode(true);
  carte.querySelectorAll('.ed-outils').forEach((outils) => outils.remove());
  carte.className = 's-card';
  carte.removeAttribute('style');
  carte.dataset.slug = fiche.slug;
  carte.href = adressePage(fiche.slug);
  for (const element of carte.querySelectorAll('[data-ed-vue]')) {
    element.setAttribute('data-ed-vue', element.getAttribute('data-ed-vue').replace(/^jeux\/[^#]+/, `jeux/${fiche.slug}`));
  }
  carte.querySelector('.s-cover').replaceChildren(); // l'icône du modèle n'est pas la sienne
  return carte;
};
const vueAccueil = () => {
  const grille = document.querySelector('.s-grid');
  if (!grille) return;
  const fiches = jeux();
  const cartes = new Map([...grille.querySelectorAll(':scope > a.s-card')].map((carte) => [carte.dataset.slug, carte]));
  const modele = grille.querySelector(':scope > a.s-card');
  for (const [slug, carte] of cartes) {
    if (!fiches.some((fiche) => fiche.slug === slug)) {
      carte.remove(); // fiche retirée du brouillon
      cartes.delete(slug);
    }
  }
  for (const fiche of fiches) {
    // Une fiche masquée ou toute nouvelle n'a pas de vignette dans la page publiée : on la fabrique d'après une voisine.
    if (!cartes.has(fiche.slug) && modele) cartes.set(fiche.slug, nouvelleCarte(modele, fiche));
    const carte = cartes.get(fiche.slug);
    if (!carte) continue;
    carte.dataset.type = typeDe(fiche);
    carte.classList.toggle('ed-masquee', !!fiche.masque);
    carte.classList.toggle('ed-nouvelle', estNouvelle(fiche.slug));
    carte.hidden = etat.apercu && !!fiche.masque;
    poserCouverture(carte.querySelector('.s-cover'), fiche);
    const ou = libelleDe(fiche);
    const badge = carte.querySelector('.s-badge');
    if (badge.textContent !== nomLibelle(ou)) badge.textContent = nomLibelle(ou);
    badge.className = `s-badge ${classeBadge(ou)}`;
  }
  // Les fiches masquées sont rangées à la fin : celles que voient les visiteurs gardent ainsi leur place et leur décalage.
  const rangees = [...fiches.filter((fiche) => !fiche.masque), ...fiches.filter((fiche) => fiche.masque)].map((fiche) => cartes.get(fiche.slug)).filter(Boolean);
  rangees.forEach((carte, i) => { if (grille.children[i] !== carte) grille.insertBefore(carte, grille.children[i] || null); });

  const visibles = fiches.filter((fiche) => !fiche.masque);
  const nombres = { tous: visibles.length, jeu: visibles.filter((fiche) => typeDe(fiche) === 'jeu').length };
  nombres.application = visibles.length - nombres.jeu;
  for (const [choix, nombre] of Object.entries(nombres)) {
    const compteur = document.querySelector(`label[for="f-${choix}"] span`);
    if (compteur && compteur.textContent !== String(nombre)) compteur.textContent = nombre;
  }

  // Les trois icônes du haut : dans la page, celle du milieu est la deuxième ; dans la liste choisie, c'est la première.
  const enTete = vedettes();
  const couvertures = [...document.querySelectorAll('.s-art > .s-cover')];
  (enTete.length === 3 ? [enTete[1], enTete[0], enTete[2]] : enTete).forEach((fiche, i) => {
    if (!couvertures[i]) return;
    couvertures[i].dataset.slug = fiche.slug;
    poserCouverture(couvertures[i], fiche);
  });
};

// ---------- page d'un jeu
const vueEtat = (fiche) => {
  const boutons = document.querySelector('.s-game-top .s-cta');
  if (!boutons) return;
  const t = etat.reference.textes[LANGUE];
  const ou = libelleDe(fiche);
  const actuel = boutons.querySelector(':scope > .s-btn:not(.alt)');
  let voulu;
  if (ou.role === 'sorti' && fiche.play) {
    voulu = actuel && actuel.tagName === 'A' ? actuel : creer('a', { class: 's-btn', rel: 'noopener' });
    voulu.href = etat.reference.play + fiche.play;
    if (voulu.textContent !== t.play) voulu.textContent = t.play;
  } else {
    voulu = actuel && actuel.tagName === 'SPAN' ? actuel : creer('span', { class: 's-btn attente' });
    const texte = ou.role === 'sorti' ? t.play_bientot : nomLibelle(ou, 'long');
    if (voulu.textContent !== texte) voulu.textContent = texte;
  }
  if (voulu === actuel) return;
  if (actuel) actuel.replaceWith(voulu); else boutons.prepend(voulu);
};
const vueGalerie = (fiche) => {
  const boite = document.querySelector('.s-game .s-shots');
  if (!boite) return;
  const t = etat.reference.textes[LANGUE];
  const noms = galerie(fiche);
  const mesures = taillesDe(fiche.slug);
  const [largeur, hauteur] = (noms.length && mesures[noms[0]]) || [9, 16];
  const presentes = new Map();
  for (const lien of boite.querySelectorAll(':scope > a.s-shot')) {
    if (!lien.dataset.nom) lien.dataset.nom = lien.getAttribute('href').split('/').pop();
    presentes.set(lien.dataset.nom, lien);
  }
  const voulues = noms.map((nom, i) => {
    const adresse = adresseImage(fImage(fiche.slug, nom));
    const lien = presentes.get(nom) || creer('a', { class: 's-shot', 'data-nom': nom }, creer('img', { loading: 'lazy', decoding: 'async' }));
    presentes.delete(nom);
    const image = lien.querySelector('img');
    if (lien.href !== adresse) {
      lien.href = adresse;
      image.src = adresse;
    }
    const [l, h] = mesures[nom] || [largeur, hauteur];
    image.alt = t.capture.replace('{t}', titreDe(fiche)).replace('{n}', i + 1);
    image.width = l;
    image.height = h;
    return lien;
  });
  presentes.forEach((lien) => lien.remove());
  voulues.forEach((lien, i) => { if (boite.children[i] !== lien) boite.insertBefore(lien, boite.children[i] || null); });
  // La forme des vignettes suit celle de la première photo ; un jeu en paysage a trois vignettes par rangée.
  boite.classList.remove(...[...boite.classList].filter((classe) => /^(paysage|n\d+)$/.test(classe)));
  boite.classList.add(largeur > hauteur ? 'paysage' : `n${noms.length}`);
  boite.style.setProperty('--forme', `${largeur}/${hauteur}`);
  boite.hidden = etat.apercu && !noms.length;
};
const vueJeu = () => {
  const fiche = jeu(PAGE.slug);
  if (!fiche) return;
  const t = etat.reference.textes[LANGUE];
  poserCouverture(document.querySelector('.s-game-top .s-cover'), fiche);
  vueEtat(fiche);
  const bloc = document.querySelector('a.s-avancement');
  if (bloc && avancement(fiche.slug)) {
    const avance = pourcentage(fiche.slug);
    bloc.querySelector('.s-jauge i').style.width = `${avance}%`;
    const chiffre = `${t.environ.replace('{n}', avance)} · ${nomLibelle(libelleDe(fiche))}`;
    if (bloc.querySelector('.s-av-chiffre').textContent !== chiffre) bloc.querySelector('.s-av-chiffre').textContent = chiffre;
  }
  vueGalerie(fiche);
  const rubrique = document.querySelector('.s-game .s-prose > h2');
  if (rubrique) rubrique.hidden = etat.apercu && !lignesDe(fiche.description).length && !lignesDe(fiche.points).length;
};

// ---------- page d'avancement
// Une fiche d'avancement que le brouillon modifie sera datée du jour de sa publication.
const avancementTouche = (slug) => Object.keys(etat.brouillon.modifs).some((cle) => cle.startsWith(`${fAvancement(slug)}#`));
const vueAvancement = () => {
  const fiche = jeu(PAGE.slug);
  const suivi = fiche && avancement(fiche.slug);
  if (!suivi) return;
  const t = etat.reference.textes[LANGUE];
  const avance = pourcentage(fiche.slug);
  const ou = libelleDe(fiche);
  const environ = t.environ.replace('{n}', avance);
  const poserTexte = (selecteur, texte) => {
    const element = document.querySelector(selecteur);
    if (element && element.textContent !== texte) element.textContent = texte;
    return element;
  };
  poserTexte('.s-av-grand', environ);
  const badge = poserTexte('.s-av-tete .s-badge', nomLibelle(ou, 'long'));
  if (badge) badge.className = `s-badge ${classeBadge(ou)}`;
  const jauge = document.querySelector('.s-jauge.grande');
  if (jauge) {
    jauge.setAttribute('aria-label', `${t.avancement} : ${environ}`);
    jauge.querySelector('i').style.width = `${avance}%`;
  }
  poserTexte('main .s-meta', `${t.prudent} ${t.etat_au.replace('{d}', dateLongue(avancementTouche(fiche.slug) ? aujourdhui() : suivi.maj || aujourdhui()))}.`);
  const pause = document.querySelector('.s-av-pause');
  if (pause) pause.hidden = ou.role !== 'pause';
};

// ---------- tout redessiner
const rafraichir = () => {
  if (!pret()) return;
  const etapes = [PAGE.page === 'accueil' && vueAccueil, PAGE.page === 'jeu' && vueJeu, PAGE.page === 'avancement' && vueAvancement, vueTextes, armer, rafraichirBarre];
  for (const etape of etapes) {
    if (!etape) continue;
    try { etape(); } catch (erreur) { console.error('Mode édition :', erreur); }
  }
};

// ===== 40-textes.js =====
// Saisie dans la page : en mode édition, un texte du site se modifie là où il est affiché. Un champ simple s'enregistre
// dans le brouillon quand on le quitte (ou avec Entrée) ; Échap annule. Un champ fait de plusieurs lignes (paragraphes,
// points) se manie ligne par ligne : Entrée coupe la ligne en deux, Retour arrière au début la joint à la précédente.
const SAISIE = (() => {
  const essai = document.createElement('div');
  try { essai.contentEditable = 'plaintext-only'; } catch (erreur) { return 'true'; }
  return essai.contentEditable === 'plaintext-only' ? 'plaintext-only' : 'true';
})();
const INVITES = {
  titre: 'Nom', genre: 'Genre, par exemple « Puzzle »', accroche: 'Accroche : une phrase qui donne envie',
  resume: 'Où en est le projet, en une ou deux phrases', sur_titre: 'Ligne au-dessus du titre', texte: 'Présentation',
  contact_phrase: 'Phrase qui invite à écrire',
};
const AJOUTS = { description: 'Ajouter un paragraphe', apropos: 'Ajouter un paragraphe', points: 'Ajouter un point' };
const MARQUE = 'À COMPLÉTER'; // construire.py --strict refuse de publier une page qui contient ces mots

// Le champ qu'un élément de la page permet de modifier : {element, liste} (liste : null pour un champ simple).
const champDe = (noeud) => {
  const element = noeud && noeud.nodeType === 1 ? noeud : noeud && noeud.parentElement;
  if (!element || etat.apercu) return null;
  const simple = element.closest('[data-ed]');
  if (simple) return { element: simple, liste: null };
  const liste = element.closest('[data-ed-liste]');
  if (!liste || element === liste) return null;
  let ligne = element;
  while (ligne.parentElement !== liste) ligne = ligne.parentElement;
  return { element: ligne, liste };
};
const positionCurseur = (element) => {
  const selection = getSelection();
  if (!selection.rangeCount || !element.contains(selection.anchorNode)) return null;
  const portee = document.createRange();
  portee.selectNodeContents(element);
  portee.setEnd(selection.anchorNode, selection.anchorOffset);
  return portee.toString().length;
};
const placerCurseur = (element, position) => {
  const portee = document.createRange();
  const marcheur = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let reste = position;
  let noeud = marcheur.nextNode();
  while (noeud && reste > noeud.length) {
    reste -= noeud.length;
    noeud = marcheur.nextNode();
  }
  if (noeud) portee.setStart(noeud, reste); else portee.selectNodeContents(element);
  portee.collapse(!!noeud);
  getSelection().removeAllRanges();
  getSelection().addRange(portee);
};
// Ce qui est écrit dans un champ. Un texte collé sur plusieurs lignes y arrive, selon le navigateur, avec des retours
// à la ligne ou avec des balises <br> : les deux sont lus comme des retours à la ligne.
const texteSaisi = (element) => {
  let texte = '';
  for (const noeud of element.childNodes) {
    if (noeud.nodeType === 3) texte += noeud.data;
    else if (noeud.nodeName === 'BR') texte += '\n';
    else if (noeud.nodeType === 1) texte += (/^(DIV|P)$/.test(noeud.nodeName) ? '\n' : '') + texteSaisi(noeud);
  }
  return texte;
};
const rendreSaisissable = (element) => {
  element.contentEditable = SAISIE;
  element.spellcheck = true;
  return element;
};

// ---------- enregistrement dans le brouillon
const refuse = (texte) => {
  if (!texte.includes(MARQUE)) return false;
  dire(`Les mots « ${MARQUE} » sont réservés : le site refuse de se publier tant qu'une page les contient.`, true);
  return true;
};
const enregistrerChamp = (element) => {
  const [fichier, chemin] = cible(element, 'data-ed');
  const saisi = propre(texteSaisi(element));
  if (saisi === texteAffiche(fichier, chemin).texte || refuse(saisi)) return rafraichir(); // rien de changé : on remet la page d'aplomb
  if (!saisi && /(^|\/)titre\/fr$/.test(chemin)) {
    dire('Le nom ne peut pas rester vide.', true);
    return rafraichir();
  }
  modifier(fichier, chemin, saisi);
};
// `fini` : on quitte la liste ; elle est alors remise au propre (lignes vides retirées).
const enregistrerListe = (liste, fini) => {
  const [fichier, chemin] = cible(liste, 'data-ed-liste');
  const trouve = BILINGUE.exec(chemin);
  // Un texte collé sur plusieurs lignes donne plusieurs paragraphes.
  const lignes = [...liste.children].flatMap((ligne) => texteSaisi(ligne).split(/\n+/).map(propre).filter(Boolean));
  if (egal(lignes, lignesDe(valeur(fichier, trouve[1]), trouve[2])) || lignes.some(refuse)) {
    if (fini) rafraichir();
    return;
  }
  modifier(fichier, chemin, lignes);
};

// ---------- outils d'une ligne : monter, descendre, supprimer
let manoeuvre = false; // vrai pendant qu'on déplace ou retire une ligne : les pertes de focus qui en découlent ne comptent pas
let avantSaisie = null; // {element, texte} : ce qu'Échap doit remettre
const apresManoeuvre = (liste, ligne, position) => {
  manoeuvre = false;
  listeEnSaisie = ligne ? liste : null;
  if (ligne) {
    ligne.focus();
    if (position !== undefined) placerCurseur(ligne, position);
    avantSaisie = { element: ligne, texte: ligne.textContent };
    montrerOutils(ligne);
  } else cacherOutils();
  enregistrerListe(liste, !ligne);
};
const deplacerLigne = (ligne, sens) => {
  const voisine = sens < 0 ? ligne.previousElementSibling : ligne.nextElementSibling;
  if (!voisine) return;
  manoeuvre = true;
  if (sens < 0) voisine.before(ligne); else voisine.after(ligne);
  apresManoeuvre(ligne.parentElement, ligne);
};
const supprimerLigne = (ligne) => {
  const liste = ligne.parentElement;
  const voisine = ligne.nextElementSibling || ligne.previousElementSibling;
  manoeuvre = true;
  ligne.remove();
  apresManoeuvre(liste, voisine);
};
const couperLigne = (ligne) => {
  const texte = ligne.textContent;
  const position = positionCurseur(ligne);
  const coupe = position === null ? texte.length : position;
  manoeuvre = true;
  ligne.textContent = texte.slice(0, coupe);
  const suivante = rendreSaisissable(document.createElement(ligne.tagName));
  suivante.textContent = texte.slice(coupe);
  ligne.after(suivante);
  apresManoeuvre(ligne.parentElement, suivante, 0);
};
const joindreLigne = (ligne) => {
  const precedente = ligne.previousElementSibling;
  const jonction = precedente.textContent.length;
  manoeuvre = true;
  precedente.textContent += ligne.textContent;
  ligne.remove();
  apresManoeuvre(precedente.parentElement, precedente, jonction);
};
const ajouterLigne = (liste) => {
  manoeuvre = true;
  liste.hidden = false;
  apresManoeuvre(liste, liste.appendChild(rendreSaisissable(document.createElement(liste.tagName === 'UL' ? 'li' : 'p'))));
};

let ligneOutillee = null;
const outilsLigne = creer('div', { class: 'ed ed-outils-ligne', hidden: true },
  outil('haut', 'Monter cette ligne', () => ligneOutillee && deplacerLigne(ligneOutillee, -1)),
  outil('bas', 'Descendre cette ligne', () => ligneOutillee && deplacerLigne(ligneOutillee, 1)),
  outil('croix', 'Supprimer cette ligne', () => ligneOutillee && supprimerLigne(ligneOutillee)));
// Ces boutons ne doivent pas prendre le focus : la ligne resterait sans curseur, et serait enregistrée trop tôt.
for (const type of ['pointerdown', 'mousedown']) outilsLigne.addEventListener(type, (evenement) => evenement.preventDefault());
const montrerOutils = (ligne) => {
  ligneOutillee = ligne;
  if (!outilsLigne.isConnected) document.body.append(outilsLigne);
  outilsLigne.hidden = false;
  const cadre = ligne.getBoundingClientRect();
  outilsLigne.style.top = `${Math.max(4, cadre.top + scrollY - outilsLigne.offsetHeight - 6)}px`;
  outilsLigne.style.left = `${Math.max(4, cadre.right + scrollX - outilsLigne.offsetWidth)}px`;
};
const cacherOutils = () => {
  ligneOutillee = null;
  outilsLigne.hidden = true;
};

// ---------- ce que fait le clavier
// Le titre de l'accueil s'écrit avec ses étoiles : « Des jeux *dans la poche*. ».
const etoilesAvant = (brut, position) => {
  const etoiles = new Set();
  for (const trouve of brut.matchAll(/\*(.+?)\*/g)) etoiles.add(trouve.index).add(trouve.index + trouve[0].length - 1);
  let vus = 0;
  for (let i = 0; i < brut.length; i++) {
    if (etoiles.has(i)) continue;
    if (vus === position) return i;
    vus += 1;
  }
  return brut.length;
};
document.addEventListener('focusin', (evenement) => {
  const vise = champDe(evenement.target);
  if (!vise || !vise.element.isContentEditable) return;
  const { element, liste } = vise;
  avantSaisie = { element, texte: element.textContent };
  if (liste) {
    listeEnSaisie = liste;
    montrerOutils(element);
  } else if (element.dataset.edForme === 'relief') {
    // Le navigateur pose le curseur juste après cet événement : on attend qu'il l'ait fait pour passer au texte à étoiles.
    setTimeout(() => {
      if (document.activeElement !== element || element.querySelector('em') === null) return;
      const brut = lireRelief(element);
      const position = positionCurseur(element);
      element.textContent = brut;
      element.dataset.edBrut = '1';
      avantSaisie = { element, texte: brut };
      placerCurseur(element, position === null ? brut.length : etoilesAvant(brut, position));
      dire('Entre deux étoiles : la partie du titre en couleur.');
    }, 0);
  }
});
document.addEventListener('focusout', (evenement) => {
  if (manoeuvre) return;
  const vise = champDe(evenement.target);
  if (!vise || !avantSaisie || avantSaisie.element !== vise.element) return;
  const { element, liste } = vise;
  avantSaisie = null;
  if (!liste) return enregistrerChamp(element);
  // Passer à une autre ligne de la même liste, ce n'est pas la quitter.
  const reste = evenement.relatedTarget && liste.contains(evenement.relatedTarget) && evenement.relatedTarget !== liste;
  if (!reste) {
    listeEnSaisie = null;
    cacherOutils();
  }
  enregistrerListe(liste, !reste);
});
document.addEventListener('keydown', (evenement) => {
  const vise = champDe(evenement.target);
  if (!vise || !vise.element.isContentEditable || evenement.isComposing) return;
  const { element, liste } = vise;
  if (evenement.key === 'Escape') {
    evenement.preventDefault();
    if (avantSaisie && avantSaisie.element === element) element.textContent = avantSaisie.texte;
    element.blur();
  } else if (evenement.key === 'Enter') {
    evenement.preventDefault();
    if (liste) couperLigne(element); else element.blur();
  } else if (evenement.key === 'Backspace' && liste && element.previousElementSibling && getSelection().isCollapsed && positionCurseur(element) === 0) {
    evenement.preventDefault();
    joindreLigne(element);
  }
});
// Sur téléphone, le clavier à l'écran n'annonce pas toujours ses touches : Entrée et Retour arrière s'y reconnaissent
// à ce qu'ils s'apprêtent à faire. (Sur ordinateur, les touches ont déjà été traitées ci-dessus.)
document.addEventListener('beforeinput', (evenement) => {
  const vise = champDe(evenement.target);
  if (!vise || !vise.element.isContentEditable) return;
  const { element, liste } = vise;
  if (evenement.inputType === 'insertParagraph' || evenement.inputType === 'insertLineBreak') {
    evenement.preventDefault();
    if (liste) couperLigne(element); else element.blur();
  } else if (evenement.inputType === 'deleteContentBackward' && liste && element.previousElementSibling && getSelection().isCollapsed && positionCurseur(element) === 0) {
    evenement.preventDefault();
    joindreLigne(element);
  }
});
// Un navigateur sans « plaintext-only » collerait aussi la mise en forme : on ne garde que le texte.
if (SAISIE === 'true') {
  document.addEventListener('paste', (evenement) => {
    if (!champDe(evenement.target)) return;
    evenement.preventDefault();
    document.execCommand('insertText', false, evenement.clipboardData.getData('text/plain'));
  });
}

// ---------- préparation de la page
const armerTextes = () => {
  const revoir = aRevoir();
  const regler = (element) => {
    if (etat.apercu) element.removeAttribute('contenteditable');
    else if (element.contentEditable !== SAISIE) rendreSaisissable(element);
  };
  const marquer = (element, attribut) => {
    const [court, chemin] = element.getAttribute(attribut).split('#');
    const trouve = BILINGUE.exec(chemin);
    const signale = !!trouve && revoir[`${court}#${trouve[1]}`] === trouve[2];
    element.classList.toggle('ed-a-revoir', signale);
    if (signale) element.title = 'À revoir : le texte français a changé depuis que celui-ci a été écrit.';
    else if (element.classList.contains('ed-repris')) element.title = 'Texte de l\'autre langue, repris tel quel : écris ici pour le traduire.';
    else element.removeAttribute('title');
    return trouve ? trouve[1] : chemin;
  };
  for (const element of document.querySelectorAll('[data-ed]')) {
    regler(element);
    const nom = marquer(element, 'data-ed');
    if (!element.dataset.edVide) element.dataset.edVide = INVITES[nom] || 'Écrire ici';
  }
  for (const liste of document.querySelectorAll('[data-ed-liste]')) {
    [...liste.children].forEach(regler);
    const nom = marquer(liste, 'data-ed-liste');
    const suivant = liste.nextElementSibling;
    if (!(suivant && suivant.classList.contains('ed-ajout'))) {
      liste.after(bouton(AJOUTS[nom] || 'Ajouter une ligne', () => ajouterLigne(liste), { classe: 'ed-ajout', icone: 'plus' }));
    }
  }
};
// Lien venu de la fenêtre « À revoir » : « …#ed:jeux/elyndra#accroche/en » mène au texte et le fait remarquer.
const viserTexte = () => {
  if (!location.hash.startsWith('#ed:')) return;
  const nom = decodeURIComponent(location.hash.slice(4));
  const element = [...document.querySelectorAll('[data-ed], [data-ed-liste]')].find((e) => (e.getAttribute('data-ed') || e.getAttribute('data-ed-liste')) === nom);
  if (!element) return;
  element.scrollIntoView({ block: 'center' });
  element.classList.add('ed-vise');
  setTimeout(() => element.classList.remove('ed-vise'), 3000);
};

// ===== 50-accueil.js =====
// Accueil : ordre de la liste, fiches masquées, icônes du haut de page.
// Glisser une vignette sur une autre échange leurs places. À la souris on attrape la vignette n'importe où ; au doigt,
// par sa poignée (le reste de la vignette doit continuer de faire défiler la page). Les flèches font la même chose
// avec la voisine.

// ---------- échanger deux fiches
const placesCartes = () => new Map([...document.querySelectorAll('.s-grid > a.s-card')].map((carte) => [carte, carte.getBoundingClientRect()]));
// Les vignettes glissent de leur ancienne place à la nouvelle, au lieu d'y sauter.
const animerCartes = (avant) => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (const [carte, ancienne] of avant) {
    if (!carte.isConnected) continue;
    const nouvelle = carte.getBoundingClientRect();
    const dx = ancienne.left - nouvelle.left;
    const dy = ancienne.top - nouvelle.top;
    if (dx || dy) carte.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' });
  }
};
const echanger = (slugA, slugB) => {
  const fiches = jeux();
  const a = fiches.findIndex((fiche) => fiche.slug === slugA);
  const b = fiches.findIndex((fiche) => fiche.slug === slugB);
  if (a < 0 || b < 0 || a === b) return;
  const avant = placesCartes();
  [fiches[a], fiches[b]] = [fiches[b], fiches[a]];
  // Les rangs sont renumérotés de 1 en 1 : quand ils se suivaient déjà, seules les deux fiches échangées changent.
  fiches.forEach((fiche, i) => { if (fiche.ordre !== i + 1) modifier(fJeu(fiche.slug), 'ordre', i + 1, true); });
  apresChangement();
  animerCartes(avant);
};
const echangerAvecVoisine = (carte, sens) => {
  let autre = carte;
  do autre = sens < 0 ? autre.previousElementSibling : autre.nextElementSibling;
  while (autre && (!autre.matches('a.s-card') || autre.classList.contains('ed-masquee') || !autre.getClientRects().length));
  if (autre) echanger(carte.dataset.slug, autre.dataset.slug);
};
const basculerMasque = (slug) => {
  const avant = placesCartes();
  modifier(fJeu(slug), 'masque', jeu(slug).masque ? undefined : true);
  animerCartes(avant);
};

// ---------- glisser une vignette
let glisse = null; // {carte, id, x, y, dx, dy, px, py, fantome, cible, boucle}
let finDeGlisse = 0;
const suivreGlisse = () => {
  const site = document.querySelector('.site').getBoundingClientRect();
  glisse.fantome.style.left = `${glisse.px - site.left - glisse.dx}px`;
  glisse.fantome.style.top = `${glisse.py - site.top - glisse.dy}px`;
  const dessous = document.elementFromPoint(glisse.px, glisse.py);
  const carte = dessous && dessous.closest('.s-grid > a.s-card:not(.ed-masquee)');
  const cible = carte && carte !== glisse.carte ? carte : null;
  if (cible === glisse.cible) return;
  if (glisse.cible) glisse.cible.classList.remove('ed-cible');
  if (cible) cible.classList.add('ed-cible');
  glisse.cible = cible;
};
// Près du haut ou du bas de l'écran, la page défile pour atteindre une vignette qu'on ne voit pas.
const defilerGlisse = () => {
  if (!glisse || !glisse.fantome) return;
  if (glisse.py < 90) scrollBy({ top: -14, behavior: 'instant' });
  else if (glisse.py > innerHeight - 150) scrollBy({ top: 14, behavior: 'instant' });
  suivreGlisse();
  glisse.boucle = requestAnimationFrame(defilerGlisse);
};
const commencerGlisse = () => {
  const cadre = glisse.carte.getBoundingClientRect();
  glisse.dx = glisse.x - cadre.left;
  glisse.dy = glisse.y - cadre.top;
  // Le fantôme reste dans .site pour garder l'allure d'une vignette ; il s'y place en coordonnées de page.
  const fantome = glisse.carte.cloneNode(true);
  fantome.querySelectorAll('.ed-outils').forEach((outils) => outils.remove());
  fantome.className = 's-card ed-fantome';
  fantome.removeAttribute('href');
  fantome.style.width = `${cadre.width}px`;
  fantome.style.height = `${cadre.height}px`;
  document.querySelector('.site').append(fantome);
  glisse.fantome = fantome;
  glisse.carte.classList.add('ed-source');
  document.documentElement.classList.add('ed-glisse');
  glisse.boucle = requestAnimationFrame(defilerGlisse);
};
const finirGlisse = (abandon) => {
  const { carte, cible, fantome, boucle } = glisse;
  glisse = null;
  if (!fantome) return; // un simple clic
  cancelAnimationFrame(boucle);
  fantome.remove();
  carte.classList.remove('ed-source');
  if (cible) cible.classList.remove('ed-cible');
  document.documentElement.classList.remove('ed-glisse');
  finDeGlisse = Date.now();
  if (cible && !abandon) echanger(carte.dataset.slug, cible.dataset.slug);
};
if (PAGE.page === 'accueil') {
  document.addEventListener('pointerdown', (evenement) => {
    if (etat.apercu || evenement.button || !evenement.target.closest) return;
    const carte = evenement.target.closest('.s-grid > a.s-card');
    if (!carte || carte.classList.contains('ed-masquee')) return;
    const parPoignee = !!evenement.target.closest('.ed-poignee');
    if (!parPoignee && (evenement.pointerType !== 'mouse' || evenement.target.closest('.ed-outils'))) return;
    glisse = { carte, id: evenement.pointerId, x: evenement.clientX, y: evenement.clientY, fantome: null, cible: null };
  });
  document.addEventListener('pointermove', (evenement) => {
    if (!glisse || evenement.pointerId !== glisse.id) return;
    glisse.px = evenement.clientX;
    glisse.py = evenement.clientY;
    if (!glisse.fantome) {
      if (Math.hypot(glisse.px - glisse.x, glisse.py - glisse.y) < 8) return;
      commencerGlisse();
    }
    suivreGlisse();
  });
  document.addEventListener('pointerup', (evenement) => { if (glisse && evenement.pointerId === glisse.id) finirGlisse(false); });
  document.addEventListener('pointercancel', (evenement) => { if (glisse && evenement.pointerId === glisse.id) finirGlisse(true); });
  document.addEventListener('keydown', (evenement) => { if (glisse && evenement.key === 'Escape') finirGlisse(true); });
  document.addEventListener('dragstart', (evenement) => { if (!etat.apercu && evenement.target.closest && evenement.target.closest('.s-grid')) evenement.preventDefault(); });
  // Le clic que le navigateur envoie au lâcher d'un glisser ne doit pas ouvrir la page de la vignette (ce clic-là
  // seulement : il arrive dans l'instant) ; une fiche pas encore publiée n'a pas de page.
  document.addEventListener('click', (evenement) => {
    const carte = evenement.target.closest && evenement.target.closest('.s-grid > a.s-card');
    if (!carte) return;
    if (Date.now() - finDeGlisse < 80) {
      finDeGlisse = 0;
      evenement.preventDefault();
      evenement.stopPropagation();
    } else if (carte.classList.contains('ed-nouvelle') && !evenement.target.closest('.ed-outils')) {
      evenement.preventDefault();
      dire('Sa page sera créée à la publication : publie d\'abord, tu pourras ensuite la remplir.');
    }
  }, true);
}

// ---------- icônes du haut de page
const choisirVedette = (rang) => {
  const place = [1, 0, 2][rang]; // dans la page : gauche, milieu, droite ; dans la liste enregistrée : celle du milieu d'abord
  const actuelles = vedettes().map((fiche) => fiche.slug);
  const boite = fenetre(['Icône de gauche', 'Icône du milieu', 'Icône de droite'][rang],
    creer('p', { class: 'ed-note', texte: 'Choisis ce qui se montre à cette place, en haut de l\'accueil. Seules les fiches qui ont une icône sont proposées.' }),
    creer('div', { class: 'ed-choix-icones' }, jeux().filter((fiche) => !fiche.masque && aIcone(fiche.slug)).map((fiche) => creer('button', {
      type: 'button', class: actuelles[place] === fiche.slug ? 'ed-choisi' : null,
      clic: () => {
        const liste = [...actuelles];
        const deja = liste.indexOf(fiche.slug);
        if (deja >= 0) liste[deja] = liste[place]; // déjà montrée ailleurs : les deux échangent leurs places
        liste[place] = fiche.slug;
        modifier(F_SITE, 'vedettes', liste.filter(Boolean));
        boite.close();
      },
    }, creer('img', { src: adresseImage(fImage(fiche.slug, 'icone.webp')), alt: '' }), creer('span', { texte: titreDe(fiche, 'fr') })))));
};

// ---------- préparation de la page
const armerAccueil = () => {
  const fiches = new Map(jeux().map((fiche) => [fiche.slug, fiche]));
  for (const carte of document.querySelectorAll('.s-grid > a.s-card')) {
    const fiche = fiches.get(carte.dataset.slug);
    if (!fiche) continue;
    let outils = carte.querySelector(':scope > .ed-outils');
    if (!outils) {
      carte.draggable = false;
      outils = creer('span', { class: 'ed ed-outils' },
        horsLien(creer('span', { class: 'ed-outil ed-poignee', title: 'Glisser sur une autre vignette pour échanger leurs places' }, icone('poignee'))),
        creer('span', { class: 'ed-groupe' },
          outil('gauche', 'Échanger avec la précédente', () => echangerAvecVoisine(carte, -1), 'ed-fleche'),
          outil('droite', 'Échanger avec la suivante', () => echangerAvecVoisine(carte, 1), 'ed-fleche'),
          outil('oeil', '', () => basculerMasque(carte.dataset.slug), 'ed-oeil')));
      carte.append(outils);
    }
    const oeil = outils.querySelector('.ed-oeil');
    const masquee = String(!!fiche.masque);
    if (oeil.dataset.masquee !== masquee) {
      oeil.dataset.masquee = masquee;
      oeil.replaceChildren(icone(fiche.masque ? 'oeilBarre' : 'oeil'));
      oeil.title = fiche.masque ? 'Masquée : la remettre dans la liste' : 'Masquer de la liste';
      oeil.setAttribute('aria-label', oeil.title);
    }
  }
  [...document.querySelectorAll('.s-art > .s-cover')].forEach((couverture, rang) => {
    if (!couverture.querySelector(':scope > .ed-puce')) couverture.append(puce('Changer', () => choisirVedette(rang)));
  });
};

// ===== 60-jeu.js =====
// Page d'un jeu et page de son avancement : pourcentage et libellé, sortie, icône, photos, fiche masquée.

// ---------- pourcentage et libellé
let panneau = null;
const fermerPanneau = () => {
  if (panneau) panneau.remove();
  panneau = null;
};
// Le panneau suit l'état du brouillon : il est remis d'accord à chaque fois que la page est redessinée.
const reglerPanneau = () => {
  if (!panneau) return;
  const slug = PAGE.slug;
  const fiche = jeu(slug);
  const suivi = avancement(slug);
  if (!fiche || !suivi || etat.apercu) return fermerPanneau();
  const curseur = panneau.querySelector('input');
  const choix = panneau.querySelector('select');
  const avance = pourcentage(slug);
  const calcule = pourcentageCalcule(slug);
  const fixe = Number.isInteger(suivi.affiche);
  if (Number(curseur.value) !== avance) curseur.value = avance;
  panneau.querySelector('output').textContent = `${avance} %`;
  panneau.querySelector('.ed-note').textContent = calcule === null ? 'Cette fiche n\'a pas de suivi chiffré : son pourcentage se règle ici.'
    : fixe ? `Fixé à la main. Le suivi du projet donnerait ${calcule} %.` : 'Calculé d\'après le suivi du projet, avec prudence.';
  panneau.querySelector('.ed-lien').hidden = !fixe || calcule === null;
  // Le libellé d'un projet en pause ne dépend pas du pourcentage : il se choisit comme les autres dans la liste.
  const options = [['', `Automatique (${nomLibelle(libelleAutomatique(avance), 'court', 'fr')})`]]
    .concat(libelles().filter((libelle) => libelle.role !== 'sorti').map((libelle) => [libelle.id, nomLibelle(libelle, 'court', 'fr')]));
  if (choix.dataset.options !== JSON.stringify(options)) {
    choix.dataset.options = JSON.stringify(options);
    choix.replaceChildren(...options.map(([value, texte]) => creer('option', { value, texte })));
  }
  const choisi = libelles().find((libelle) => libelle.id === suivi.libelle && libelle.role !== 'sorti');
  choix.value = choisi ? choisi.id : suivi.pause ? libelleDeRole('pause').id : '';
  choix.disabled = fiche.etat === 'disponible';
  panneau.querySelector('.ed-sorti').hidden = !choix.disabled;
};
const ouvrirAvancement = () => {
  if (panneau) return fermerPanneau();
  const fichier = fAvancement(PAGE.slug);
  const curseur = creer('input', { type: 'range', min: '0', max: '100', step: '5' });
  const choix = creer('select');
  panneau = creer('form', { class: 'ed ed-panneau', 'aria-label': 'Avancement' },
    creer('div', { class: 'ed-fenetre-tete' }, creer('h2', { texte: 'Avancement' }), bouton('', fermerPanneau, { classe: 'ed-rond', icone: 'croix', titre: 'Fermer' })),
    champ('Pourcentage affiché', creer('span', { class: 'ed-ligne' }, curseur, creer('output'))),
    creer('p', { class: 'ed-note' }),
    bouton('Revenir au pourcentage calculé', () => modifier(fichier, 'affiche', undefined), { classe: 'ed-lien' }),
    champ('Libellé', choix),
    creer('p', { class: 'ed-note ed-sorti', texte: 'Cette fiche est marquée comme sortie : son libellé est celui d\'un jeu disponible.' }));
  panneau.addEventListener('submit', (evenement) => evenement.preventDefault());
  // Un pourcentage remis à la valeur calculée n'est plus « fixé à la main » : la fiche se remet à suivre le calcul.
  curseur.addEventListener('input', () => modifier(fichier, 'affiche', Number(curseur.value) === pourcentageCalcule(PAGE.slug) ? undefined : Number(curseur.value)));
  choix.addEventListener('change', () => {
    const libelle = libelles().find((autre) => autre.id === choix.value);
    modifier(fichier, 'pause', !!libelle && libelle.role === 'pause', true);
    modifier(fichier, 'libelle', libelle && !libelle.role ? libelle.id : undefined);
  });
  document.body.append(panneau);
  reglerPanneau();
};

// ---------- sortie sur Google Play
const ouvrirSortie = () => {
  const slug = PAGE.slug;
  const fiche = jeu(slug);
  const sorti = creer('input', { type: 'checkbox', checked: fiche.etat === 'disponible' });
  const lien = creer('input', { type: 'text', value: fiche.play ? etat.reference.play + fiche.play : '', placeholder: `${etat.reference.play}fr.orwen.monjeu`, spellcheck: 'false', autocomplete: 'off' });
  const complet = creer('input', { type: 'checkbox', checked: fiche.etat !== 'disponible' });
  const erreur = creer('p', { class: 'ed-erreur', role: 'alert' });
  const valider = () => {
    if (!sorti.checked) {
      modifier(fJeu(slug), 'etat', 'bientot', true);
      modifier(fJeu(slug), 'play', '');
      return boite.close();
    }
    const saisie = lien.value.trim();
    const identifiant = (/[?&]id=([\w.]+)/.exec(saisie) || [null, saisie])[1];
    if (!/^[A-Za-z]\w*(\.[A-Za-z]\w*)+$/.test(identifiant)) {
      erreur.textContent = 'Ce n\'est pas le lien d\'une page Google Play : il se termine par « id= » suivi de l\'identifiant de l\'application, par exemple fr.orwen.monjeu.';
      return undefined;
    }
    modifier(fJeu(slug), 'etat', 'disponible', true);
    modifier(fJeu(slug), 'play', identifiant, true);
    if (complet.checked && avancement(slug)) modifier(fAvancement(slug), 'affiche', 100, true);
    apresChangement();
    return boite.close();
  };
  const boite = fenetre(`Sortie de ${titreDe(fiche, 'fr')}`,
    creer('p', { class: 'ed-note', texte: 'Une fiche marquée comme sortie montre un bouton vers Google Play, et son libellé devient celui d\'un jeu disponible.' }),
    creer('label', { class: 'ed-case' }, sorti, creer('span', { texte: 'Sorti sur Google Play' })),
    champ('Lien de sa page Google Play', lien, 'Le lien entier, ou seulement l\'identifiant de l\'application.'),
    creer('label', { class: 'ed-case' }, complet, creer('span', { texte: 'Passer son avancement à 100 %' })),
    erreur,
    creer('p', { class: 'ed-actions' }, bouton('Mettre dans le brouillon', valider, { classe: 'ed-bouton ed-principal' }), bouton('Annuler', () => boite.close())));
  const regler = () => { lien.disabled = complet.disabled = !sorti.checked; };
  sorti.addEventListener('change', regler);
  regler();
};

// ---------- images : icône et photos
// Une image choisie sur le téléphone ou le PC est réduite et convertie ici même, comme le fait outils/importer_images.py :
// icône carrée de 384 points ; photo de 1280 points de haut au plus, ou de 1600 de large si elle est en paysage.
const preparerImage = async (fichier, pourIcone) => {
  let source;
  try {
    source = await createImageBitmap(fichier);
  } catch (erreur) {
    throw new Error(`« ${fichier.name} » n'est pas une image que ce navigateur sait lire.`);
  }
  let x = 0, y = 0, l = source.width, h = source.height, largeur, hauteur;
  if (pourIcone) {
    const cote = Math.min(l, h); // une image qui n'est pas carrée est recadrée au centre
    x = (l - cote) / 2;
    y = (h - cote) / 2;
    l = h = cote;
    largeur = hauteur = 384;
  } else {
    const echelle = Math.min(1, l > h ? 1600 / l : 1280 / h);
    largeur = Math.round(l * echelle);
    hauteur = Math.round(h * echelle);
  }
  const dessiner = (image, sx, sy, sl, sh, dl, dh) => {
    const toile = creer('canvas', { width: dl, height: dh });
    const pinceau = toile.getContext('2d');
    pinceau.imageSmoothingQuality = 'high';
    pinceau.drawImage(image, sx, sy, sl, sh, 0, 0, dl, dh);
    return toile;
  };
  // Réduire par moitiés successives donne une image plus nette qu'une seule grande réduction.
  let toile = null;
  while (l / 2 >= largeur && h / 2 >= hauteur) {
    toile = dessiner(toile || source, toile ? 0 : x, toile ? 0 : y, l, h, Math.round(l / 2), Math.round(h / 2));
    l = toile.width;
    h = toile.height;
  }
  toile = dessiner(toile || source, toile ? 0 : x, toile ? 0 : y, l, h, largeur, hauteur);
  const blob = await new Promise((resoudre) => toile.toBlob(resoudre, 'image/webp', pourIcone ? 0.86 : 0.8));
  if (!blob || blob.type !== 'image/webp') throw new Error('Ce navigateur ne sait pas fabriquer d\'image WebP : ajoute les images depuis Chrome ou Firefox.');
  return { blob, l: largeur, h: hauteur };
};
const choisirFichiers = (plusieurs) => new Promise((resoudre) => {
  const entree = creer('input', { type: 'file', accept: 'image/*', multiple: plusieurs, hidden: true });
  const finir = () => {
    resoudre([...entree.files]);
    entree.remove();
  };
  entree.addEventListener('change', finir);
  entree.addEventListener('cancel', finir);
  document.body.append(entree);
  entree.click();
});
const ajouterImage = async (chemin, image) => {
  try {
    await imageGarder(chemin, image.blob);
  } catch (erreur) {
    throw new Error('Ce navigateur refuse de garder des images en brouillon (navigation privée ?).');
  }
  if (etat.urls[chemin]) URL.revokeObjectURL(etat.urls[chemin]);
  etat.urls[chemin] = URL.createObjectURL(image.blob);
  etat.brouillon.images[chemin] = { l: image.l, h: image.h };
};
const choisirIcone = async () => {
  const [fichier] = await choisirFichiers(false);
  if (!fichier) return;
  try {
    await ajouterImage(fImage(PAGE.slug, 'icone.webp'), await preparerImage(fichier, true));
    // `icone_site` dit à outils/importer_images.py de ne pas remettre par-dessus l'icône rangée dans le projet du jeu.
    modifier(fJeu(PAGE.slug), 'icone_site', true);
    dire('Icône changée dans le brouillon.');
  } catch (erreur) {
    dire(erreur.message, true);
  }
};
const ajouterPhotos = async () => {
  const fichiers = await choisirFichiers(true);
  if (!fichiers.length) return;
  const fiche = jeu(PAGE.slug);
  const noms = [...galerie(fiche)];
  let refus = '';
  dire(`Préparation de ${pluriel(fichiers.length, 'photo')}…`, false, true);
  for (const fichier of fichiers) {
    try {
      const nom = `photo-${[...crypto.getRandomValues(new Uint8Array(5))].map((octet) => (octet % 36).toString(36)).join('')}.webp`;
      await ajouterImage(fImage(fiche.slug, nom), await preparerImage(fichier, false));
      noms.push(nom);
    } catch (erreur) {
      refus = erreur.message;
    }
  }
  modifier(fJeu(fiche.slug), `galerie/${LANGUE}`, noms);
  const ajoutees = noms.length - galerie(fiche).length;
  dire(refus || `${pluriel(ajoutees, 'photo ajoutée', 'photos ajoutées')} au brouillon.`, !!refus);
};
// Changer l'ordre ou retirer une photo fixe la galerie de cette langue : elle ne suit plus celle de l'autre.
const deplacerPhoto = (nom, sens) => {
  const fiche = jeu(PAGE.slug);
  const noms = [...galerie(fiche)];
  const i = noms.indexOf(nom);
  if (i < 0 || !noms[i + sens]) return;
  [noms[i], noms[i + sens]] = [noms[i + sens], noms[i]];
  modifier(fJeu(fiche.slug), `galerie/${LANGUE}`, noms);
};
const retirerPhoto = async (nom) => {
  const fiche = jeu(PAGE.slug);
  modifier(fJeu(fiche.slug), `galerie/${LANGUE}`, galerie(fiche).filter((autre) => autre !== nom), true);
  await menageImages();
  apresChangement();
};
const armerGalerie = (fiche) => {
  const boite = document.querySelector('.s-game .s-shots');
  if (!boite) return;
  for (const lien of boite.querySelectorAll(':scope > a.s-shot')) {
    if (lien.querySelector(':scope > .ed-outils')) continue;
    lien.append(creer('span', { class: 'ed ed-outils' },
      outil('gauche', 'Avancer cette photo', () => deplacerPhoto(lien.dataset.nom, -1), 'ed-fleche'),
      outil('droite', 'Reculer cette photo', () => deplacerPhoto(lien.dataset.nom, 1), 'ed-fleche'),
      outil('croix', 'Retirer cette photo', () => retirerPhoto(lien.dataset.nom))));
  }
  if (!boite.querySelector(':scope > .ed-photo-ajout')) {
    boite.append(creer('button', { type: 'button', class: 's-shot ed-photo-ajout', clic: ajouterPhotos }, icone('plus'), creer('span', { texte: 'Ajouter des photos' })));
  }
  let note = boite.nextElementSibling && boite.nextElementSibling.classList.contains('ed-note-galerie') ? boite.nextElementSibling : null;
  if (!note) {
    note = creer('p', { class: 'ed ed-note ed-note-galerie' });
    boite.after(note);
  }
  note.textContent = galerieReprise(fiche)
    ? `Cette page reprend les photos de la page en ${NOMS_LANGUES[AUTRE]}. Si tu en ajoutes, en retires ou en changes l'ordre ici, elle aura sa propre galerie.`
    : '';
};

// ---------- fiche masquée
const bandeauMasque = (fiche) => {
  let bandeau = document.querySelector('.ed-bandeau');
  if (!fiche || !fiche.masque) {
    if (bandeau) bandeau.remove();
    return;
  }
  if (bandeau) return;
  bandeau = creer('p', { class: 'ed ed-bandeau' }, icone('oeilBarre'),
    creer('span', { texte: 'Cette fiche est masquée : elle n\'est ni dans la liste de l\'accueil ni dans le plan du site. Sa page reste ouverte à qui en connaît l\'adresse.' }),
    bouton('La montrer', () => modifier(fJeu(fiche.slug), 'masque', undefined)));
  document.querySelector('main .s-wrap').prepend(bandeau);
};

// ---------- préparation de la page
const poserPuce = (parent, texte, action, nomIcone) => {
  if (parent && !parent.querySelector(':scope > .ed-puce')) parent.append(puce(texte, action, nomIcone));
};
const armerJeu = () => {
  const fiche = jeu(PAGE.slug);
  if (!fiche) return;
  poserPuce(document.querySelector('.s-game-top .s-cover'), 'Icône', choisirIcone, 'image');
  poserPuce(document.querySelector('.s-game-top .s-cta'), 'Sortie', ouvrirSortie);
  poserPuce(document.querySelector('a.s-avancement'), 'Modifier', ouvrirAvancement);
  armerGalerie(fiche);
  bandeauMasque(fiche);
  reglerPanneau();
};
const armerAvancement = () => {
  poserPuce(document.querySelector('.s-av-tete'), 'Modifier', ouvrirAvancement);
  bandeauMasque(jeu(PAGE.slug));
  reglerPanneau();
};

// ===== 70-fenetres.js =====
// Les fenêtres du mode édition : brouillon et publication, libellés, nouvelle fiche, textes à revoir, historique.

// ---------- publication
// Un fichier réécrit garde la mise en forme qu'il avait dans le dépôt, pour que son historique reste lisible.
const indentation = (fichier) => {
  const trouve = /^[{[]\r?\n([ \t]+)/.exec(etat.depot.textes[fichier] || '');
  return trouve ? trouve[1] : fichier.startsWith('images/') ? ' ' : '  ';
};
// Ce qu'il faut écrire dans le dépôt pour publier le brouillon : les fichiers qu'il change, relus dans le dépôt tel
// qu'il est à l'instant, plus ce qui en découle (date des fiches d'avancement, textes à revoir, taille des photos).
const preparerLot = async () => {
  const { modifs, nouveaux, images } = etat.brouillon;
  const fichiers = {};
  const ouvrir = (fichier, defaut) => {
    if (!(fichier in fichiers)) fichiers[fichier] = fichier in etat.base ? copie(etat.base[fichier]) : defaut;
    return fichiers[fichier];
  };
  for (const [fichier, objet] of Object.entries(nouveaux)) if (!(fichier in etat.base)) fichiers[fichier] = copie(objet);
  for (const [cle, modif] of Object.entries(modifs)) {
    const [fichier, chemin] = cle.split('#');
    const objet = ouvrir(fichier);
    if (objet) poser(objet, chemin, modif.s ? undefined : copie(modif.v));
  }
  for (const [fichier, objet] of Object.entries(fichiers)) {
    if (objet && fichier.startsWith('contenu/avancement/') && !egal(objet, etat.base[fichier])) objet.maj = aujourdhui();
  }
  const revoir = aRevoir();
  const range = Object.fromEntries(Object.keys(revoir).sort().map((nom) => [nom, revoir[nom]]));
  if (!egal(range, etat.base[F_REVOIR] || {})) fichiers[F_REVOIR] = range;

  const lot = { ecrire: {}, binaires: {}, supprimer: [], message: '' };
  for (const [chemin, image] of Object.entries(images)) {
    const [, slug, nom] = chemin.split('/');
    const blob = await imageLire(chemin).catch(() => null);
    if (!blob) continue;
    lot.binaires[chemin] = blob;
    if (nom !== 'icone.webp') ouvrir(fTailles(slug), {})[nom] = [image.l, image.h];
  }
  // Une photo venue du site que plus aucune galerie ne cite quitte le dépôt.
  for (const [fichier, objet] of Object.entries(fichiers)) {
    const trouve = /^contenu\/jeux\/(.+)\.json$/.exec(fichier);
    if (!trouve || !objet) continue;
    const galeries = objet.galerie || {};
    const citees = new Set([].concat(galeries.fr || [], galeries.en || []));
    const debut = `images/${trouve[1]}/photo-`;
    for (const chemin of Object.keys(etat.depot.arbre)) {
      const nom = chemin.slice(chemin.lastIndexOf('/') + 1);
      if (!chemin.startsWith(debut) || citees.has(nom) || chemin in lot.binaires) continue;
      lot.supprimer.push(chemin);
      delete ouvrir(fTailles(trouve[1]), {})[nom];
    }
  }
  for (const [fichier, objet] of Object.entries(fichiers)) {
    if (!objet) continue;
    const texte = `${JSON.stringify(objet, null, indentation(fichier))}\n`;
    if (texte !== (etat.depot.textes[fichier] || '').replace(/\r\n/g, '\n')) lot.ecrire[fichier] = texte;
  }
  return lot;
};
// Message du commit. Sa première ligne est ce que montre l'historique : « Gravity Sort : accroche (français), photos
// (français) » quand tout concerne la même fiche, « 5 changements : Accueil, Gravity Sort, Libellés » sinon.
const messageDe = (lignes) => {
  const sujets = [...new Set(lignes.map((ligne) => ligne.titre.split(' : ')[0]))];
  let tete = lignes.length === 1 ? lignes[0].titre
    : sujets.length === 1 ? `${sujets[0]} : ${lignes.map((ligne) => ligne.titre.split(' : ').slice(1).join(' : ')).join(', ')}`
      : `${lignes.length} changements : ${sujets.join(', ')}`;
  if (tete.length > 70) tete = `${tete.slice(0, 69)}…`;
  return `${tete} (depuis le site)\n\n${lignes.map((ligne) => `- ${ligne.titre}${ligne.detail ? ` : ${ligne.detail}` : ''}`).join('\n')}\n`;
};
let occupe = false; // une publication ou une annulation est en route
const publier = async () => {
  if (occupe) return;
  const lignes = resumeBrouillon();
  if (!lignes.length) {
    dire('Le brouillon est vide : rien à publier.');
    return;
  }
  occupe = true;
  rafraichirBarre();
  dire('Publication en cours…', false, true);
  try {
    let tete = null;
    let lot = null;
    for (let essai = 0; !tete; essai += 1) {
      await lireDepot();
      lot = await preparerLot();
      lot.message = messageDe(lignes);
      if (!Object.keys(lot.ecrire).length && !Object.keys(lot.binaires).length && !lot.supprimer.length) tete = etat.depot.tete; // le dépôt dit déjà la même chose
      else {
        try {
          tete = await etat.transport.envoyer(etat.depot.tete, lot);
        } catch (erreur) {
          if (!erreur.depasse || essai >= 2) throw erreur; // sinon : le dépôt a bougé entre-temps, on repart de son nouvel état
        }
      }
    }
    // Ce qui vient de partir est reporté tout de suite dans l'état connu du dépôt, pour que la page ne revienne pas
    // un instant en arrière quand le brouillon se vide ; l'état exact est relu juste après. D'ici là, la tête du
    // dépôt n'est plus connue : on ne peut pas dire le site public à jour en le comparant à l'ancienne.
    const avant = etat.depot.tete;
    const envoye = tete !== avant;
    if (envoye) etat.depot.tete = null;
    for (const chemin of Object.keys(lot.ecrire).concat(Object.keys(lot.binaires))) etat.depot.arbre[chemin] = 'publié'; // empreinte pas encore connue
    Object.assign(etat.depot.textes, lot.ecrire);
    for (const chemin of lot.supprimer) delete etat.depot.arbre[chemin];
    // Les images qui viennent de partir ne sont pas encore servies par le site, et l'ancienne icône peut rester un
    // moment dans la mémoire du navigateur : on continue de les montrer d'ici pendant quelques minutes.
    const recentes = lire(CLE_RECENTES);
    const encoreUtiles = recentes && Date.now() - recentes.quand < DUREE_RECENTES ? recentes.chemins : [];
    const parties = [...new Set(encoreUtiles.concat(Object.keys(etat.brouillon.images)))];
    etat.brouillon = { modifs: {}, nouveaux: {}, images: {}, vus: [] };
    garderBrouillon();
    analyser();
    fusionner();
    if (etat.transport.nom === 'local') {
      location.reload(); // le site de ce PC vient d'être reconstruit
      return;
    }
    if (parties.length) garder(CLE_RECENTES, { chemins: parties, quand: Date.now() });
    garder(CLE_DEPOT, { pour: empreinteReglages(), depot: etat.depot, reference: etat.reference }); // une page ouverte dans la seconde partira de là
    occupe = false;
    if (envoye) site.etat = 'attente'; // dit tout de suite, sans attendre la première relecture de la version du site
    rafraichir();
    dire(envoye ? 'Publié. Le site public se met à jour : compte une minute.' : 'Le site contenait déjà ces changements : il n\'y avait rien à envoyer.');
    await lireDepot(envoye ? avant : undefined).catch(() => {});
    surveillerSite();
  } catch (erreur) {
    dire(`Rien n'a été publié. ${erreur.message}`, true);
  } finally {
    occupe = false;
    rafraichirBarre();
  }
};

// ---------- brouillon
const ouvrirBrouillon = () => {
  if (!resumeBrouillon().length) {
    dire('Le brouillon est vide : rien à publier.');
    return;
  }
  const liste = creer('ul', { class: 'ed-liste' });
  const envoi = bouton('Publier', () => {
    boite.close();
    publier();
  }, { classe: 'ed-bouton ed-principal' });
  const abandon = bouton('Tout abandonner', async () => {
    if (!(await demander('Abandonner le brouillon', 'Tous les changements qui ne sont pas publiés seront perdus.', 'Abandonner', 'Garder le brouillon'))) return;
    await viderBrouillon();
    rafraichir();
    boite.close();
    dire('Brouillon abandonné.');
  });
  const boite = fenetre('Brouillon',
    creer('p', { class: 'ed-note', texte: 'Ces changements ne sont visibles que dans ce navigateur. « Publier » les envoie tous d\'un coup sur le site.' }),
    liste, creer('p', { class: 'ed-actions' }, envoi, abandon));
  const remplir = () => {
    const lignes = resumeBrouillon();
    if (!lignes.length) return boite.close();
    envoi.lastChild.textContent = `Publier ${pluriel(lignes.length, 'changement')}`;
    return liste.replaceChildren(...lignes.map((ligne) => creer('li', {},
      creer('div', {}, creer('b', { texte: ligne.titre }), ligne.detail && creer('small', { texte: ligne.detail })),
      bouton('Retirer', async () => {
        await retirerDuBrouillon(ligne.cles);
        remplir();
      }))));
  };
  remplir();
};

// ---------- libellés
const ouvrirLibelles = () => {
  const lignes = copie(libelles());
  const corps = creer('div', { class: 'ed-libelles' });
  const portee = creer('p', { class: 'ed-note' });
  const erreur = creer('p', { class: 'ed-erreur', role: 'alert' });
  const direPortee = () => {
    const automatiques = lignes.filter((libelle) => !libelle.role && typeof libelle.seuil === 'number').sort((a, b) => a.seuil - b.seuil);
    portee.textContent = automatiques.length ? `D'après le pourcentage : ${automatiques.map((libelle, i) => {
      const suivant = automatiques[i + 1];
      const debut = i === 0 ? 0 : libelle.seuil;
      return `${libelle.court.fr || 'sans nom'} ${suivant ? `de ${debut} à ${suivant.seuil - 1} %` : `à partir de ${debut} %`}`;
    }).join(', ')}.` : 'Aucun libellé ne se pose d\'après le pourcentage.';
  };
  const entree = (valeurDepart, noter) => {
    const element = creer('input', { type: 'text', value: valeurDepart || '' });
    element.addEventListener('input', () => {
      noter(element.value);
      direPortee();
    });
    return element;
  };
  const dessiner = () => {
    corps.replaceChildren(...lignes.map((libelle, i) => {
      libelle.court = libelle.court || {};
      const long = () => (libelle.long = libelle.long || {});
      const seuil = creer('input', { type: 'number', min: '0', max: '100', step: '5', value: typeof libelle.seuil === 'number' ? String(libelle.seuil) : '', placeholder: 'aucun' });
      seuil.addEventListener('input', () => {
        if (seuil.value === '') delete libelle.seuil; else libelle.seuil = Number(seuil.value);
        direPortee();
      });
      const couleur = creer('input', { type: 'checkbox', checked: !!libelle.accent });
      couleur.addEventListener('change', () => { libelle.accent = couleur.checked; });
      return creer('fieldset', { class: 'ed-libelle' },
        creer('div', { class: 'ed-deux' },
          champ('En français', entree(libelle.court.fr, (v) => { libelle.court.fr = v; })),
          champ('En anglais', entree(libelle.court.en, (v) => { libelle.court.en = v; }))),
        libelle.role === 'sorti' && creer('p', { class: 'ed-note', texte: 'Se pose tout seul sur une fiche marquée comme sortie.' }),
        libelle.role === 'pause' && creer('p', { class: 'ed-note', texte: 'Libellé d\'un projet en pause : il se choisit à la main, fiche par fiche.' }),
        !libelle.role && creer('div', { class: 'ed-deux' },
          champ('Se pose à partir de (%)', seuil, 'Vide : seulement choisi à la main.'),
          creer('label', { class: 'ed-case' }, couleur, creer('span', { texte: 'En couleur' }))),
        libelle.role !== 'sorti' && creer('details', {}, creer('summary', { texte: 'Texte plus long, pour la page du jeu' }),
          creer('div', { class: 'ed-deux' },
            champ('En français', entree((libelle.long || {}).fr, (v) => { long().fr = v; })),
            champ('En anglais', entree((libelle.long || {}).en, (v) => { long().en = v; })))),
        !libelle.role && bouton('Supprimer ce libellé', () => {
          lignes.splice(i, 1);
          dessiner();
        }, { classe: 'ed-lien' }));
    }));
    direPortee();
  };
  const enregistrer = () => {
    const nets = [];
    for (const libelle of lignes) {
      const court = { fr: propre(libelle.court.fr || ''), en: propre(libelle.court.en || '') };
      const long = { fr: propre((libelle.long || {}).fr || ''), en: propre((libelle.long || {}).en || '') };
      if (!court.fr) {
        erreur.textContent = 'Chaque libellé a besoin de son texte français.';
        return;
      }
      let id = libelle.id;
      if (!id) {
        const racine = slugifier(court.fr) || 'libelle';
        id = racine;
        for (let n = 2; lignes.some((autre) => autre.id === id) || nets.some((autre) => autre.id === id); n += 1) id = `${racine}-${n}`;
      }
      const net = libelle.role ? { id, role: libelle.role, court } : { id, court };
      if (long.fr || long.en) net.long = long;
      if (!libelle.role && typeof libelle.seuil === 'number') {
        if (!Number.isInteger(libelle.seuil) || libelle.seuil < 0 || libelle.seuil > 100) {
          erreur.textContent = `« ${court.fr} » : le pourcentage de départ est un nombre entier de 0 à 100.`;
          return;
        }
        net.seuil = libelle.seuil;
      }
      if (!libelle.role && libelle.accent) net.accent = true;
      nets.push(net);
    }
    const seuils = nets.filter((libelle) => 'seuil' in libelle).map((libelle) => libelle.seuil);
    if (!seuils.length) {
      erreur.textContent = 'Il faut au moins un libellé qui se pose d\'après le pourcentage, sinon une fiche resterait sans libellé.';
      return;
    }
    if (new Set(seuils).size !== seuils.length) {
      erreur.textContent = 'Deux libellés ne peuvent pas se poser à partir du même pourcentage.';
      return;
    }
    modifier(F_LIBELLES, 'libelles', nets, true);
    // Une fiche qui portait un libellé supprimé retrouve celui que donne son pourcentage.
    for (const fiche of jeux()) {
      const suivi = avancement(fiche.slug);
      if (suivi && suivi.libelle && !nets.some((libelle) => libelle.id === suivi.libelle)) modifier(fAvancement(fiche.slug), 'libelle', undefined, true);
    }
    apresChangement();
    boite.close();
    dire('Libellés mis dans le brouillon.');
  };
  const boite = fenetre('Libellés',
    creer('p', { class: 'ed-note', texte: 'Le libellé dit où en est un jeu : sur sa vignette, sur sa page et sur sa page d\'avancement.' }),
    corps, portee,
    bouton('Ajouter un libellé', () => {
      lignes.push({ id: '', court: { fr: '', en: '' } });
      dessiner();
      corps.lastElementChild.querySelector('input').focus();
    }, { icone: 'plus' }),
    erreur,
    creer('p', { class: 'ed-actions' }, bouton('Mettre dans le brouillon', enregistrer, { classe: 'ed-bouton ed-principal' }), bouton('Annuler', () => boite.close())));
  dessiner();
};

// ---------- nouvelle fiche
const ouvrirAjout = () => {
  const sorte = creer('select', {}, creer('option', { value: 'jeu', texte: 'Un jeu' }), creer('option', { value: 'application', texte: 'Une application' }));
  const nom = creer('input', { type: 'text', autocomplete: 'off' });
  const nomAnglais = creer('input', { type: 'text', autocomplete: 'off', placeholder: 'le même, sauf si tu en écris un autre' });
  const adresse = creer('input', { type: 'text', autocomplete: 'off', spellcheck: 'false' });
  const genre = creer('input', { type: 'text', placeholder: 'par exemple : Puzzle' });
  const accroche = creer('input', { type: 'text', placeholder: 'une phrase qui donne envie' });
  const avance = creer('input', { type: 'range', min: '0', max: '100', step: '5', value: '10' });
  const chiffre = creer('output', { texte: '10 %' });
  const masque = creer('input', { type: 'checkbox', checked: true });
  const erreur = creer('p', { class: 'ed-erreur', role: 'alert' });
  // L'adresse suit le nom tant que Lucas ne l'a pas écrite lui-même.
  let adresseLibre = false;
  nom.addEventListener('input', () => { if (!adresseLibre) adresse.value = slugifier(nom.value); });
  adresse.addEventListener('input', () => { adresseLibre = adresse.value !== ''; });
  avance.addEventListener('input', () => { chiffre.textContent = `${avance.value} %`; });
  const creerFiche = () => {
    const titre = propre(nom.value);
    const slug = adresse.value.trim();
    if (!titre) erreur.textContent = 'Il manque le nom.';
    else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || slug.length > 40) erreur.textContent = 'L\'adresse s\'écrit en minuscules, avec des chiffres et des tirets seulement : mon-jeu.';
    else if (etat.reference.reserves.includes(slug)) erreur.textContent = `« ${slug} » est une adresse déjà prise par le site lui-même.`;
    else if (jeu(slug) || fJeu(slug) in etat.base) erreur.textContent = `Une fiche a déjà l'adresse « ${slug} ».`;
    else {
      const jour = aujourdhui();
      const origine = [`Fiche créée depuis le site le ${dateLongue(jour, 'fr')}.`];
      etat.brouillon.nouveaux[fJeu(slug)] = {
        slug, ordre: Math.max(0, ...jeux().map((fiche) => fiche.ordre || 0)) + 1, ...(sorte.value === 'application' ? { type: 'application' } : {}),
        titre: { fr: titre, en: propre(nomAnglais.value) || titre }, genre: { fr: propre(genre.value), en: '' }, accroche: { fr: propre(accroche.value), en: '' },
        description: { fr: [], en: [] }, points: { fr: [], en: [] }, etat: 'bientot', play: '', icone: '', captures: { fr: [], en: [] },
        ...(masque.checked ? { masque: true } : {}), sources: origine, a_verifier: [],
      };
      etat.brouillon.nouveaux[fAvancement(slug)] = {
        slug, affiche: Number(avance.value), pause: false, resume: { fr: '', en: '' }, fait: { fr: [], en: [] }, en_cours: { fr: [], en: [] }, a_venir: { fr: [], en: [] },
        maj: jour, sources: origine, a_verifier: [],
      };
      apresChangement();
      boite.close();
      dire('Fiche ajoutée au brouillon. Publie pour créer sa page : tu pourras ensuite y mettre son icône, ses photos et ses textes.');
    }
  };
  const boite = fenetre('Nouvelle fiche',
    champ('C\'est', sorte),
    champ('Nom', nom),
    champ('Nom en anglais', nomAnglais),
    champ('Adresse de sa page : orwen.fr/…', adresse, 'Elle ne changera plus une fois le jeu publié sur Google Play : c\'est aussi celle de sa politique de confidentialité.'),
    champ('Genre', genre),
    champ('Accroche', accroche),
    champ('Avancement', creer('span', { class: 'ed-ligne' }, avance, chiffre)),
    creer('label', { class: 'ed-case' }, masque, creer('span', { texte: 'Masquée pour l\'instant : sa page existe, mais elle n\'entre dans la liste de l\'accueil que quand tu la montres' })),
    erreur,
    creer('p', { class: 'ed-actions' }, bouton('Ajouter au brouillon', creerFiche, { classe: 'ed-bouton ed-principal' }), bouton('Annuler', () => boite.close())));
  nom.focus();
};

// ---------- textes anglais à revoir
const ouvrirRevoir = () => {
  if (!Object.keys(aRevoir()).length) {
    dire('Aucun texte anglais à revoir.');
    return;
  }
  const liste = creer('ul', { class: 'ed-liste' });
  const boite = fenetre('Textes anglais à revoir',
    creer('p', { class: 'ed-note', texte: 'Leur version française a changé, pas eux : l\'anglais ne se traduit pas tout seul. « Voir » ouvre la page anglaise sur le texte, que tu modifies sur place.' }),
    liste);
  const remplir = () => {
    const noms = Object.keys(aRevoir()).sort();
    if (!noms.length) {
      boite.close();
      dire('Plus aucun texte anglais à revoir.');
      return;
    }
    liste.replaceChildren(...noms.map((nom) => {
      const [court, nomChamp] = nom.split('#');
      const [sorte, slug] = court.split('/');
      const page = sorte === 'jeux' ? adressePage(slug, 'en') : sorte === 'avancement' ? adresseAvancement(slug, 'en') : adressePage('', 'en');
      return creer('li', {},
        creer('div', {}, creer('b', { texte: `${slug ? nomFiche(slug) : 'Accueil'} : ${nomDuChamp(`contenu/${court}.json`, nomChamp)}` })),
        creer('a', { class: 'ed-bouton', href: `${page}#ed:${encodeURIComponent(`${nom}/en`)}`, texte: 'Voir' }),
        bouton('C\'est bon', () => {
          etat.brouillon.vus.push(nom);
          apresChangement();
          remplir();
        }));
    }));
  };
  remplir();
};

// ---------- historique
const quand = (date) => new Date(date).toLocaleString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
// Ce qu'une publication a changé dans un fichier JSON, champ par champ : [[clés…], valeur d'avant, valeur d'après].
// Une liste (paragraphes, photos) compte pour un seul champ, comme dans le brouillon.
const ecarts = (avant, apres, cles = []) => {
  const objet = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
  if (!objet(avant) || !objet(apres)) return egal(avant, apres) ? [] : [[cles, avant, apres]];
  return [...new Set([...Object.keys(avant), ...Object.keys(apres)])].flatMap((cle) => ecarts(avant[cle], apres[cle], [...cles, cle]));
};
// Défait ces changements dans le fichier tel qu'il est aujourd'hui. Un champ que personne n'a retouché depuis reprend
// sa valeur d'avant ; les autres sont rendus : ils ont encore changé, on ne sait plus quoi y remettre.
const defaire = (maintenant, avant, apres) => {
  const heurts = [];
  for (const [cles, ancien, nouveau] of ecarts(avant, apres)) {
    const parent = cles.slice(0, -1).reduce((o, cle) => (o !== null && typeof o === 'object' ? o[cle] : undefined), maintenant);
    const cle = cles[cles.length - 1];
    const actuel = parent !== null && typeof parent === 'object' ? parent[cle] : undefined;
    if (egal(actuel, ancien)) continue;
    // La date d'une fiche d'avancement change à chaque publication : qu'elle ait rechangé depuis n'empêche rien.
    if (!egal(actuel, nouveau)) { if (cles.join() !== 'maj') heurts.push(cles); }
    else if (ancien === undefined) delete parent[cle];
    else parent[cle] = copie(ancien);
  }
  return heurts;
};
const nomDuHeurt = (fichier, cles) => {
  const trouve = /^contenu\/(?:jeux|avancement)\/(.+)\.json$/.exec(fichier);
  const qui = trouve ? nomFiche(trouve[1]) : fichier === F_SITE ? 'Accueil' : fichier === F_LIBELLES ? 'Libellés' : fichier;
  return cles.length ? `${qui} : ${nomDuChamp(fichier, cles[0])}${NOMS_LANGUES[cles[1]] ? ` (${NOMS_LANGUES[cles[1]]})` : ''}` : qui;
};
// Annuler une publication : remettre ce qu'elle a changé comme c'était juste avant, par un nouveau commit. Permis
// seulement si elle n'a touché qu'au contenu du site, et si aucun des champs qu'elle a changés n'a rechangé depuis.
let annulation = false; // une annulation est à l'étude (lecture de ce qu'elle déferait, puis question)
const annulerPublication = async (commit, boite) => {
  if (occupe || annulation) return;
  const titre = commit.message.split('\n')[0].replace(/ \(depuis le site\)$/, '');
  annulation = true;
  try {
    const detail = await etat.transport.detail(commit.sha);
    if (detail.parents !== 1 || !detail.fichiers.length) throw new Error('Cette publication ne s\'annule pas d\'ici.');
    if (detail.fichiers.some((fichier) => !UTILE.test(fichier.chemin) || fichier.statut === 'renamed')) {
      throw new Error('Cette publication touche à autre chose qu\'au contenu du site (elle vient du PC) : elle ne s\'annule pas d\'ici.');
    }
    await lireDepot();
    const arbre = etat.depot.arbre;
    const avant = await etat.transport.arbreDe(detail.parent);
    const lot = { ecrire: {}, binaires: {}, supprimer: [], reprendre: {}, message: `Annulation : ${titre} (depuis le site)\n\nAnnule : ${commit.sha}\n` };
    const heurts = [];
    for (const { chemin, statut, sha } of detail.fichiers) {
      // Les fichiers tenus par le mode édition lui-même (textes à revoir, tailles des photos) ne bloquent jamais.
      const tenu = chemin === F_REVOIR || chemin.endsWith('/tailles.json');
      const enJson = chemin.endsWith('.json') && chemin in arbre && (statut === 'modified' || (statut === 'added' && tenu && arbre[chemin] !== sha));
      if (enJson) {
        const maintenant = JSON.parse(etat.depot.textes[chemin]);
        const [ancien, nouveau] = await Promise.all([statut === 'added' ? '{}' : etat.transport.texte(avant[chemin]), etat.transport.texte(sha)]);
        const genes = defaire(maintenant, JSON.parse(ancien), JSON.parse(nouveau));
        if (!tenu) heurts.push(...genes.map((cles) => nomDuHeurt(chemin, cles)));
        const texte = `${JSON.stringify(maintenant, null, indentation(chemin))}\n`;
        if (texte !== etat.depot.textes[chemin].replace(/\r\n/g, '\n')) lot.ecrire[chemin] = texte;
      } else if (statut === 'added') {
        if (!(chemin in arbre)) continue; // déjà retiré
        if (arbre[chemin] === sha) lot.supprimer.push(chemin); else heurts.push(nomDuHeurt(chemin, []));
      } else if (arbre[chemin] !== avant[chemin]) { // fichier retiré, ou image remplacée : on reprend celui d'avant
        if (statut === 'removed' ? chemin in arbre : arbre[chemin] !== sha) heurts.push(nomDuHeurt(chemin, []));
        else lot.reprendre[chemin] = avant[chemin];
      }
    }
    if (heurts.length) {
      throw new Error(`Depuis cette publication, ceci a encore changé : ${[...new Set(heurts)].slice(0, 3).join(', ')}. Elle ne s'annule donc plus d'un bloc : corrige à la main ce que tu veux retrouver.`);
    }
    if (!Object.keys(lot.ecrire).length && !Object.keys(lot.reprendre).length && !lot.supprimer.length) throw new Error('Cette publication est déjà annulée : le site ne contient plus rien de ce qu\'elle avait changé.');
    const accord = await demander('Annuler cette publication',
      [`« ${titre} »`, 'Ce qu\'elle a changé reviendra comme c\'était juste avant. Le reste du site et ton brouillon ne sont pas concernés.'], 'Annuler la publication', 'Ne rien faire');
    if (!accord) return;
    occupe = true;
    rafraichirBarre();
    const avantEnvoi = etat.depot.tete;
    await etat.transport.envoyer(avantEnvoi, lot);
    etat.depot.tete = null; // inconnue tant que le dépôt n'a pas été relu
    site.etat = 'attente';
    boite.close();
    dire('Publication annulée. Le site public se met à jour : compte une minute.');
    await lireDepot(avantEnvoi).catch(() => {});
    surveillerSite();
  } catch (erreur) {
    dire(erreur.depasse ? 'Le site a encore changé pendant que tu répondais : rouvre l\'historique et recommence.' : erreur.message, true);
  } finally {
    occupe = annulation = false;
    rafraichirBarre();
  }
};
const ouvrirHistorique = async () => {
  if (!etat.transport.historique) {
    dire('L\'historique n\'existe que pour le site en ligne, quand le mode édition enregistre par GitHub.');
    return;
  }
  const liste = creer('ul', { class: 'ed-liste' }, creer('li', { texte: 'Lecture de l\'historique…' }));
  const repli = bouton('', null, { classe: 'ed-lien' });
  repli.hidden = true;
  const boite = fenetre('Historique',
    creer('p', { class: 'ed-note', texte: 'Les dernières publications, la plus récente en premier. « Annuler » remet ce que l\'une d\'elles a changé comme c\'était juste avant.' }),
    liste, repli);
  const duSite = (commit) => / \(depuis le site\)$/.test(commit.message.split('\n')[0]);
  const titreDe = (commit) => commit.message.split('\n')[0].replace(/ \(depuis le site\)$/, '');
  try {
    const commits = await etat.transport.historique(60);
    // Une publication annulée et son annulation ne sont plus en vigueur ni l'une ni l'autre : elles sont repliées.
    // L'annulation nomme le commit qu'elle défait ; les plus anciennes ne le faisaient pas, on les reconnaît à leur titre.
    const annules = new Set();
    commits.forEach((commit, rang) => {
      if (annules.has(commit.sha) || !duSite(commit) || !titreDe(commit).startsWith('Annulation : ')) return;
      const vise = (/^Annule : ([0-9a-f]{40})$/m.exec(commit.message) || [])[1];
      const defait = commits.slice(rang + 1).find((ancien) => !annules.has(ancien.sha)
        && (vise ? ancien.sha === vise : duSite(ancien) && `Annulation : ${titreDe(ancien)}` === titreDe(commit)));
      if (defait) annules.add(commit.sha).add(defait.sha);
    });
    let tout = false;
    const dessiner = () => {
      liste.replaceChildren(...commits.filter((commit) => tout || !annules.has(commit.sha)).slice(0, 30).map((commit) => creer('li', {},
        creer('div', {}, creer('b', { texte: titreDe(commit) }),
          creer('small', { texte: `${quand(commit.date)} · ${duSite(commit) ? 'depuis le site' : 'depuis le PC'}${annules.has(commit.sha) ? ' · plus en vigueur' : ''}` })),
        duSite(commit) && bouton('Annuler', () => annulerPublication(commit, boite), { icone: 'retour' }))));
      repli.hidden = !annules.size;
      repli.textContent = tout ? 'Ne montrer que ce qui est en vigueur' : `Montrer aussi ce qui a été annulé (${pluriel(annules.size / 2, 'publication')})`;
    };
    repli.addEventListener('click', () => {
      tout = !tout;
      dessiner();
    });
    dessiner();
  } catch (erreur) {
    liste.replaceChildren(creer('li', { class: 'ed-erreur', texte: erreur.message }));
  }
};

// ===== 80-barre.js =====
// La barre du mode édition, en bas de chaque page : où en est le brouillon, « Publier », aperçu, menu. Et ce qui la
// renseigne : la lecture du dépôt, et l'attente du site public après une publication.
let barre = null;
let bulle = null;
let menu = null;
let fermetureBulle = null;
// Où en est le site public par rapport au dépôt : '' (inconnu), 'attente', 'retard' ou 'jour'. `erreur` : le dépôt n'a pas pu être lu.
const site = { etat: '', erreur: '' };

// Un mot au-dessus de la barre. `erreur` : il reste plus longtemps ; `tenir` : il reste jusqu'au suivant.
// La bulle est un « popover » : rouverte à chaque message, elle passe par-dessus une fenêtre ouverte entre-temps.
const montrerBulle = (visible) => {
  if (!bulle.showPopover) {
    bulle.hidden = !visible;
    return;
  }
  if (bulle.matches(':popover-open')) bulle.hidePopover();
  if (visible) bulle.showPopover();
};
function dire(message, erreur = false, tenir = false) {
  if (!bulle) return;
  clearTimeout(fermetureBulle);
  bulle.textContent = message;
  bulle.classList.toggle('ed-erreur', erreur);
  montrerBulle(true);
  if (!tenir) fermetureBulle = setTimeout(() => montrerBulle(false), erreur ? 9000 : 5000);
}

// ---------- menu
const fermerMenu = () => {
  if (menu) menu.remove();
  menu = null;
};
const ouvrirMenu = () => {
  if (menu) return fermerMenu();
  if (!pret()) return dire('Le dépôt n\'a pas encore été lu.');
  clearTimeout(fermetureBulle);
  montrerBulle(false); // un message resté affiché cacherait le bas du menu
  const entree = (texte, action) => bouton(texte, () => {
    fermerMenu();
    action();
  }, { classe: 'ed-entree' });
  const revoir = Object.keys(aRevoir()).length;
  const fiche = (PAGE.page === 'jeu' || PAGE.page === 'avancement') && jeu(PAGE.slug);
  menu = creer('div', { class: 'ed-menu' },
    entree('Libellés', ouvrirLibelles),
    entree('Nouvelle fiche', ouvrirAjout),
    entree(`Textes anglais à revoir${revoir ? ` (${revoir})` : ''}`, ouvrirRevoir),
    entree('Historique', ouvrirHistorique),
    fiche && entree(fiche.masque ? 'Montrer cette fiche' : 'Masquer cette fiche', () => modifier(fJeu(fiche.slug), 'masque', fiche.masque ? undefined : true)),
    creer('a', { class: 'ed-entree', href: `${RACINE}edition/`, texte: 'Réglages et mode d\'emploi' }));
  barre.append(menu);
  return undefined;
};
document.addEventListener('pointerdown', (evenement) => {
  if (menu && !(evenement.target.closest && evenement.target.closest('.ed-menu, .ed-bouton-menu'))) fermerMenu();
});
document.addEventListener('keydown', (evenement) => { if (evenement.key === 'Escape') fermerMenu(); });

// ---------- aperçu : la page comme la verront les visiteurs
const basculerApercu = () => {
  etat.apercu = !etat.apercu;
  try { sessionStorage.setItem('orwen-apercu', etat.apercu ? '1' : ''); } catch (erreur) { /* l'aperçu ne suivra pas d'une page à l'autre */ }
  document.documentElement.classList.toggle('ed-apercu', etat.apercu);
  fermerPanneau();
  cacherOutils();
  rafraichir();
  dire(etat.apercu ? 'Aperçu : la page telle que les visiteurs la verront une fois le brouillon publié.' : 'Les outils sont de retour.');
};

// ---------- la barre
const construireBarre = () => {
  barre = creer('div', { class: 'ed ed-barre', role: 'toolbar', 'aria-label': 'Mode édition' },
    creer('button', { type: 'button', class: 'ed-compte', clic: () => ouvrirBrouillon() }, creer('b'), creer('small')),
    bouton('Publier', () => ouvrirBrouillon(), { classe: 'ed-bouton ed-principal ed-publier' }),
    bouton('', basculerApercu, { classe: 'ed-rond ed-bouton-apercu', icone: 'oeil', titre: 'Voir la page comme un visiteur' }),
    bouton('', ouvrirMenu, { classe: 'ed-rond ed-bouton-menu', icone: 'points', titre: 'Autres actions' }));
  bulle = creer('p', { class: 'ed ed-bulle', role: 'status', popover: 'manual' });
  if (!bulle.showPopover) bulle.hidden = true;
  document.body.append(barre, bulle);
};
const texteSite = () => {
  if (!etat.depot) return site.erreur ? 'Dépôt injoignable' : 'Lecture du dépôt…';
  if (site.erreur) return 'Dépôt injoignable : dernier état connu';
  if (etat.transport.nom === 'local') return 'Enregistrement sur ce PC';
  return { attente: 'Site public : mise à jour en cours…', retard: 'Le site public tarde à se mettre à jour', jour: 'Site public à jour' }[site.etat] || '';
};
const rafraichirBarre = () => {
  if (!barre) return;
  const nombre = pret() ? resumeBrouillon().length : 0;
  barre.querySelector('.ed-compte b').textContent = occupe ? 'Envoi en cours…' : nombre ? pluriel(nombre, 'changement') : 'Brouillon vide';
  barre.querySelector('.ed-compte small').textContent = texteSite();
  barre.querySelector('.ed-publier').disabled = !nombre || occupe;
  barre.classList.toggle('ed-plein', nombre > 0);
  barre.classList.toggle('ed-attente', occupe || site.etat === 'attente');
  const apercu = barre.querySelector('.ed-bouton-apercu');
  apercu.setAttribute('aria-pressed', String(etat.apercu));
  apercu.title = etat.apercu ? 'Revenir aux outils' : 'Voir la page comme un visiteur';
  apercu.setAttribute('aria-label', apercu.title);
};

// ---------- lecture du dépôt et du site
const empreinteReglages = () => `${etat.reglages.mode}|${etat.reglages.depot || ''}|${etat.reglages.branche || ''}`;
// edition/donnees.json, écrit par le générateur : version du site construit, textes d'interface, règle du pourcentage.
const lireReference = async () => {
  const reponse = await fetch(`${RACINE}edition/donnees.json?t=${Date.now()}`, { cache: 'no-store' }).catch(() => null);
  if (!reponse || !reponse.ok) throw new Error('Le site ne répond pas : la connexion est peut-être coupée.');
  return reponse.json();
};
// `perimee` : après un envoi, la tête que le dépôt avait juste avant (voir `charger`).
const lireDepot = async (perimee) => {
  etat.depot = await etat.transport.charger(etat.depot, perimee);
  garder(CLE_DEPOT, { pour: empreinteReglages(), depot: etat.depot, reference: etat.reference });
  analyser();
  elaguerBrouillon();
  fusionner();
  rafraichir();
};
// Se remettre d'accord avec le site et avec le dépôt : à l'ouverture de la page, puis chaque fois qu'elle revient au
// premier plan ou que la connexion revient. Un échec est dit une fois, pas à chaque tentative.
const synchroniser = async () => {
  try {
    etat.reference = await lireReference();
    await lireDepot();
    site.erreur = '';
  } catch (erreur) {
    if (site.erreur !== erreur.message) dire(erreur.message, true);
    site.erreur = erreur.message;
  }
  rafraichirBarre();
};
// Les images du brouillon s'affichent depuis ce navigateur. Celles qui viennent d'être publiées aussi, pendant vingt
// minutes : le temps que le site les serve, et que le navigateur oublie l'ancienne icône qu'il avait gardée en mémoire.
// Les autres n'ont plus rien à faire ici.
const DUREE_RECENTES = 20 * 60000;
const chargerImages = async () => {
  let gardees;
  try {
    gardees = await imagesGardees();
  } catch (erreur) {
    gardees = [];
  }
  let recentes = lire(CLE_RECENTES);
  if (recentes && Date.now() - recentes.quand >= DUREE_RECENTES) {
    garder(CLE_RECENTES, null);
    recentes = null;
  }
  const utiles = new Set(Object.keys(etat.brouillon.images).concat(recentes ? recentes.chemins : []));
  for (const chemin of gardees) {
    if (!utiles.has(chemin)) imageOter(chemin).catch(() => {});
    else if (!etat.urls[chemin]) {
      const blob = await imageLire(chemin).catch(() => null);
      if (blob) etat.urls[chemin] = URL.createObjectURL(blob);
    }
  }
  // Une image du brouillon que le navigateur n'a plus (données effacées) ne peut plus être publiée.
  let perdues = 0;
  for (const chemin of Object.keys(etat.brouillon.images)) {
    if (etat.urls[chemin]) continue;
    delete etat.brouillon.images[chemin];
    perdues += 1;
  }
  if (perdues) garderBrouillon();
};
// Après une publication, GitHub met environ une minute à reconstruire le site. On relit sa version toutes les cinq
// secondes jusqu'à ce qu'elle soit celle du dépôt ; la page, elle, montre déjà le nouvel état.
let veille = null;
let debutVeille = 0;
const surveillerSite = () => {
  clearTimeout(veille);
  debutVeille = Date.now();
  const tour = async () => {
    if (etat.transport.nom !== 'github' || !etat.depot || document.hidden) return;
    try {
      etat.reference = await lireReference();
    } catch (erreur) { /* on réessaiera au tour suivant */ }
    if (!etat.reference) return;
    if (etat.reference.version === 'local') site.etat = ''; // aperçu de ce PC : pas de site public à attendre
    else if (etat.reference.version === etat.depot.tete) {
      const attendu = site.etat === 'attente' || site.etat === 'retard';
      site.etat = 'jour';
      if (attendu) dire('Le site public est à jour.');
    } else {
      site.etat = Date.now() - debutVeille > 5 * 60000 ? 'retard' : 'attente';
      if (Date.now() - debutVeille < 20 * 60000) veille = setTimeout(tour, 5000);
    }
    rafraichirBarre();
  };
  tour();
};

// ===== 90-demarrage.js =====
// Mise en route : la page /edition/, où le mode s'allume et s'éteint, puis le mode édition lui-même sur chaque page.

// Après chaque dessin de la page : rendre saisissable ce qui doit l'être et poser les outils. Peut être rappelé sans dégât.
const armer = () => {
  armerTextes();
  if (etat.apercu) return;
  if (PAGE.page === 'accueil') armerAccueil();
  if (PAGE.page === 'jeu') armerJeu();
  if (PAGE.page === 'avancement') armerAvancement();
};

let allume = false;
const demarrer = async () => {
  etat.reglages = lire(CLE);
  if (!etat.reglages || allume) return;
  allume = true;
  etat.transport = etat.reglages.mode === 'github' ? depotGithub(etat.reglages) : depotLocal();
  garder('orwen-edition-attente', null); // clé de la première version du mode édition
  document.head.append(creer('style', { texte: STYLE }));
  try { etat.apercu = sessionStorage.getItem('orwen-apercu') === '1'; } catch (erreur) { /* pas d'aperçu retenu */ }
  document.documentElement.classList.add('ed-actif');
  document.documentElement.classList.toggle('ed-apercu', etat.apercu);
  lireBrouillon();
  construireBarre();
  // Le dernier état lu du dépôt est gardé dans ce navigateur : la page se met d'accord avec lui sans attendre le réseau.
  const memoire = lire(CLE_DEPOT);
  if (memoire && memoire.pour === empreinteReglages() && memoire.depot && memoire.reference) {
    etat.depot = memoire.depot;
    etat.reference = memoire.reference;
    analyser();
    fusionner();
  }
  await chargerImages();
  rafraichir();
  rafraichirBarre();
  await synchroniser();
  document.documentElement.classList.add('ed-pret'); // la page est d'accord avec le dépôt (repère pour les essais)
  viserTexte();
  surveillerSite();
};

// ---------- page /edition/ : allumer ou éteindre le mode dans ce navigateur
const formulaire = document.getElementById('ed-reglages');
if (formulaire) {
  const annonce = document.getElementById('ed-etat');
  const github = document.getElementById('ed-github');
  const saisie = (nom) => formulaire.elements[nom];
  let reglages = lire(CLE);
  const annoncer = (suite = '') => {
    annonce.textContent = (!reglages ? 'Le mode édition est éteint dans ce navigateur.'
      : reglages.mode === 'github' ? `Le mode édition est allumé dans ce navigateur. Enregistrement dans le dépôt ${reglages.depot}, branche ${reglages.branche}.`
        : 'Le mode édition est allumé dans ce navigateur. Enregistrement sur ce PC.') + suite;
  };
  const montrerGithub = () => { github.hidden = saisie('mode').value !== 'github'; };
  if (reglages) {
    saisie('mode').value = reglages.mode;
    if (reglages.depot) saisie('depot').value = reglages.depot;
    if (reglages.branche) saisie('branche').value = reglages.branche;
    if (reglages.jeton) saisie('jeton').placeholder = 'déjà enregistré ; laisser vide pour le garder';
  } else {
    // Sur le site en ligne, on enregistre par GitHub ; « sur ce PC » ne vaut que pour l'aperçu local.
    saisie('mode').value = ['127.0.0.1', 'localhost'].includes(location.hostname) ? 'local' : 'github';
  }
  formulaire.addEventListener('change', montrerGithub);
  formulaire.addEventListener('submit', async (evenement) => {
    evenement.preventDefault();
    const nouveaux = { mode: saisie('mode').value };
    let suite = '';
    if (nouveaux.mode === 'github') {
      nouveaux.depot = saisie('depot').value.trim();
      nouveaux.branche = saisie('branche').value.trim() || 'main';
      nouveaux.jeton = saisie('jeton').value.trim() || (reglages && reglages.jeton) || '';
      if (!/^[\w.-]+\/[\w.-]+$/.test(nouveaux.depot)) {
        annonce.textContent = 'Le dépôt s\'écrit « compte/depot ».';
        return;
      }
      if (!nouveaux.jeton) {
        annonce.textContent = 'Il manque le jeton.';
        return;
      }
      // On essaie le jeton tout de suite : il doit pouvoir lire les fiches du dépôt.
      annonce.textContent = 'Vérification du jeton auprès de GitHub…';
      try {
        suite = ` Jeton accepté : ${await depotGithub(nouveaux).verifier()} fiches lues dans le dépôt. Le droit d'écrire sera vérifié à la première publication.`;
      } catch (erreur) {
        annonce.textContent = `${erreur.message} Le mode édition n'a pas été allumé.`;
        return;
      }
    }
    reglages = nouveaux;
    garder(CLE, reglages);
    garder(CLE_DEPOT, null);
    saisie('jeton').value = '';
    saisie('jeton').placeholder = reglages.jeton ? 'déjà enregistré ; laisser vide pour le garder' : '';
    annoncer(suite);
    // Déjà en route avec d'autres réglages : il faut repartir de zéro.
    if (allume) location.reload(); else demarrer();
  });
  document.getElementById('ed-quitter').addEventListener('click', () => {
    reglages = null;
    garder(CLE, null);
    garder(CLE_DEPOT, null);
    garder(CLE_RECENTES, null);
    if (allume) location.reload(); else annoncer();
  });
  montrerGithub();
  annoncer(reglages && lire(CLE_BROUILLON) ? ' Un brouillon t\'attend : il est gardé dans ce navigateur tant qu\'il n\'est ni publié ni abandonné.' : '');
}

// ---------- quand la page revient
addEventListener('storage', (evenement) => {
  if (!allume) return;
  if (evenement.key === CLE && !evenement.newValue) location.reload(); // éteint depuis un autre onglet
  if (evenement.key !== CLE_BROUILLON) return;
  // Le brouillon a changé dans un autre onglet : celui-ci le suit.
  lireBrouillon();
  chargerImages().then(() => {
    fusionner();
    rafraichir();
  });
});
addEventListener('pageshow', (evenement) => {
  if (!allume || !evenement.persisted) return;
  lireBrouillon();
  fusionner();
  rafraichir();
});
document.addEventListener('visibilitychange', () => {
  if (allume && !document.hidden) synchroniser().then(surveillerSite);
});
addEventListener('online', () => {
  if (allume) synchroniser().then(surveillerSite);
});

demarrer();

})();
