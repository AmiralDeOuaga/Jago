export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
  :root {
    --blue:#1756C8; --dark:#0A2463; --sky:#38CFFF;
    --gold:#FFD93D; --bg:#182236; --bg2:#1f2d47; --bg3:#243450;
    --text:#e8f0ff; --muted:#7a90b8;
    --border:rgba(255,255,255,0.08); --border2:rgba(255,255,255,0.14);
    --card:rgba(255,255,255,0.04); --card-hover:rgba(255,255,255,0.07);
    --green:#22C55E; --red:#EF4444;
    --radius:16px; --card-radius:20px;
  }
  body { font-family:'Inter','Nunito',sans-serif; background:var(--bg); color:var(--text); overflow-x:hidden; touch-action:manipulation; }
  * { touch-action:manipulation; }
  .offline-banner { position:fixed; top:0; left:0; right:0; z-index:9999; background:#EF4444; color:#fff; text-align:center; padding:10px 16px; font-size:13px; font-weight:700; font-family:'Montserrat',sans-serif; display:flex; align-items:center; justify-content:center; gap:8px; }
  .offline-banner span { font-size:16px; }
  .signal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.7); z-index:9000; display:flex; align-items:center; justify-content:center; padding:20px; }
  .signal-box { background:var(--bg2); border-radius:20px; padding:24px; width:100%; max-width:400px; border:1px solid var(--border2); }
  .signal-box h3 { font-family:'Montserrat',sans-serif; font-size:16px; font-weight:800; color:var(--text); margin:0 0 16px; }
  .signal-options { display:flex; flex-direction:column; gap:8px; margin-bottom:16px; }
  .signal-opt { display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:12px; border:1.5px solid var(--border2); cursor:pointer; transition:all .2s; }
  .signal-opt.on { border-color:rgba(239,68,68,.6); background:rgba(239,68,68,.1); }
  .signal-opt span { font-size:14px; color:var(--text); font-weight:600; }
  .signal-btns { display:flex; gap:10px; }
  .signal-cancel { flex:1; padding:12px; border-radius:12px; border:1.5px solid var(--border2); background:transparent; color:var(--muted); font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; font-size:13px; }
  .signal-submit { flex:1; padding:12px; border-radius:12px; border:none; background:#EF4444; color:#fff; font-weight:800; cursor:pointer; font-family:'Montserrat',sans-serif; font-size:13px; }
  .signal-submit:disabled { opacity:.4; cursor:not-allowed; }
  .toast { position:fixed; bottom:90px; left:50%; transform:translateX(-50%); background:var(--bg2); color:var(--text); padding:13px 20px; border-radius:14px; font-size:13px; font-weight:700; font-family:'Montserrat',sans-serif; z-index:9998; box-shadow:0 8px 32px rgba(0,0,0,.5); border:1.5px solid var(--border2); white-space:nowrap; animation:toastIn .25s ease; }
  .toast.success { border-color:rgba(34,197,94,.4); }
  .toast.error { border-color:rgba(239,68,68,.4); color:#f87171; }
  .toast.warn { border-color:rgba(234,179,8,.4); color:#fde047; }
  @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  .app { min-height:100vh; padding-bottom:72px; }
  @media(min-width:768px){ .app{ padding-bottom:0; } }

  /* ── LOADING ── */
  .loading { display:flex; align-items:center; justify-content:center; min-height:100vh; font-size:32px; background:var(--bg); }

  /* ── HEADER ── */
  .hdr { background:rgba(8,12,20,0.75); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); padding:0; position:sticky; top:0; z-index:100; transition:background .3s,border-color .3s; }
  .hdr-in { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; min-height:64px; padding:0 28px; gap:14px; }
  .hdr-r { display:flex; align-items:center; gap:8px; flex-shrink:0; }
  .huser { font-size:13px; color:rgba(232,240,255,.7); white-space:nowrap; display:none; }
  @media(min-width:640px){ .huser{ display:block; } }
  .huser strong { color:var(--gold); font-weight:800; }
  .nav-search { flex:1; max-width:420px; display:flex; background:rgba(255,255,255,.06); border:1.5px solid var(--border); border-radius:12px; overflow:hidden; transition:all .2s; }
  .nav-search:focus-within { background:rgba(255,255,255,.1); border-color:rgba(23,86,200,.5); box-shadow:0 0 0 3px rgba(23,86,200,.12); }
  .nav-search input { flex:1; padding:10px 16px; background:transparent; border:none; outline:none; color:var(--text); font-size:13px; font-family:'Inter',sans-serif; }
  .nav-search input::placeholder { color:var(--muted); }
  .nav-search button { background:var(--gold); color:var(--dark); border:none; padding:10px 18px; font-size:13px; font-weight:800; font-family:'Montserrat',sans-serif; transition:background .2s; flex-shrink:0; cursor:pointer; }
  .nav-search button:hover { background:#FFC800; }
  @media(max-width:768px){ .nav-search{ display:none; } }
  .btn-p { background:var(--gold); color:var(--dark); border:none; border-radius:10px; padding:9px 16px; font-size:13px; font-weight:800; cursor:pointer; font-family:'Montserrat',sans-serif; transition:all .2s; white-space:nowrap; }
  .btn-p:hover { background:#FFC800; box-shadow:0 4px 20px rgba(255,217,61,.3); }
  .btn-o { background:var(--card); color:var(--text); border:1.5px solid var(--border2); border-radius:10px; padding:8px 13px; font-size:13px; font-weight:600; cursor:pointer; font-family:'Inter',sans-serif; transition:all .2s; white-space:nowrap; position:relative; }
  .btn-o:hover { background:var(--card-hover); border-color:rgba(255,255,255,.25); }

  /* ── BOTTOM NAV ── */
  .bottom-nav { display:none; }
  @media(max-width:767px){
    .bottom-nav { display:flex; position:fixed; bottom:0; left:0; right:0; background:rgba(13,21,38,.97); backdrop-filter:blur(16px); border-top:1px solid var(--border2); z-index:99; }
    .hdr-mobile-hide { display:none !important; }
    .hdr-in { padding:0 12px !important; min-height:52px !important; }
    .btn-o { padding:6px 10px !important; font-size:15px !important; }
  }
  .bnav-item { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px 4px 8px; cursor:pointer; border:none; background:transparent; font-family:'Montserrat',sans-serif; color:var(--muted); gap:3px; transition:color .2s; }
  .bnav-item.on { color:#4d90ff; }
  .bnav-icon { font-size:20px; line-height:1; transition:transform .2s; }
  .bnav-item.on .bnav-icon { transform:translateY(-2px); }
  .bnav-label { font-size:9px; font-weight:700; letter-spacing:0.4px; text-transform:uppercase; }
  .bnav-badge { position:absolute; top:6px; right:calc(50% - 20px); background:var(--red); color:white; font-size:9px; font-weight:800; min-width:16px; height:16px; padding:0 4px; border-radius:8px; display:flex; align-items:center; justify-content:center; }
  .bnav-post .bnav-icon { background:linear-gradient(135deg,var(--blue),var(--dark)); border-radius:50%; width:44px; height:44px; display:flex; align-items:center; justify-content:center; font-size:24px; color:white; margin-top:-14px; box-shadow:0 4px 20px rgba(23,86,200,.5); }

  /* ── HERO ── */
  .hero { display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:80px 28px 80px; position:relative; overflow:hidden; }
  .hero-glow1 { position:absolute; top:-200px; left:50%; transform:translateX(-50%); width:900px; height:900px; background:radial-gradient(ellipse,rgba(23,86,200,.22) 0%,transparent 65%); pointer-events:none; }
  .hero-glow2 { position:absolute; bottom:-100px; left:15%; width:500px; height:500px; background:radial-gradient(ellipse,rgba(255,217,61,.07) 0%,transparent 65%); pointer-events:none; }
  .hero-glow3 { position:absolute; top:20%; right:5%; width:300px; height:300px; background:radial-gradient(ellipse,rgba(56,207,255,.08) 0%,transparent 65%); pointer-events:none; }
  .hero::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E"); pointer-events:none; }
  .hero-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(23,86,200,.15); border:1px solid rgba(23,86,200,.35); color:#7ab3ff; font-size:.72rem; font-weight:700; padding:6px 16px; border-radius:50px; letter-spacing:.5px; margin-bottom:26px; text-transform:uppercase; position:relative; z-index:1; opacity:0; animation:fadeUp .8s ease .1s forwards; }
  .hero-badge::before { content:''; display:inline-block; width:7px; height:7px; border-radius:50%; background:#4d90ff; box-shadow:0 0 8px #4d90ff; animation:blink 2s infinite; flex-shrink:0; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
  .hero h1 { font-family:'Montserrat',sans-serif; font-size:clamp(2rem,6vw,4.5rem); font-weight:900; color:var(--text); line-height:1.05; letter-spacing:-2px; margin-bottom:18px; position:relative; z-index:1; opacity:0; animation:fadeUp .9s ease .3s forwards; }
  .hero h1 em { color:var(--gold); font-style:normal; }
  .hero p { color:var(--muted); font-size:clamp(1rem,2.2vw,1.15rem); margin-bottom:38px; max-width:520px; margin-left:auto; margin-right:auto; line-height:1.7; position:relative; z-index:1; opacity:0; animation:fadeUp .9s ease .5s forwards; }
  .sbar { display:flex; max-width:620px; width:100%; margin:0 auto 32px; background:rgba(255,255,255,.06); border:1.5px solid var(--border2); border-radius:18px; overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.04); position:relative; z-index:1; opacity:0; animation:fadeUp .9s ease .7s forwards; transition:border-color .2s; }
  .sbar:focus-within { border-color:rgba(23,86,200,.5); box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 0 3px rgba(23,86,200,.15); }
  .sbar input { flex:1; padding:18px 22px; background:transparent; border:none; outline:none; color:var(--text); font-size:15px; font-family:'Inter',sans-serif; }
  .sbar input::placeholder { color:var(--muted); }
  .sbar button { background:var(--gold); color:var(--dark); border:none; padding:16px 28px; font-size:14px; font-weight:800; cursor:pointer; font-family:'Montserrat',sans-serif; transition:background .2s; flex-shrink:0; }
  .sbar button:hover { background:#FFC800; }
  .hero-cats { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; margin-bottom:40px; opacity:0; animation:fadeUp .9s ease .85s forwards; }
  .hero-cat { display:flex; align-items:center; gap:6px; background:var(--card); border:1.5px solid var(--border2); color:var(--muted); font-size:12px; font-weight:600; padding:8px 15px; border-radius:50px; font-family:'Montserrat',sans-serif; cursor:pointer; transition:all .2s; }
  .hero-cat:hover { background:rgba(23,86,200,.15); border-color:rgba(23,86,200,.4); color:#7ab3ff; transform:translateY(-2px); }
  .hero-stats { display:flex; justify-content:center; flex-wrap:wrap; position:relative; z-index:1; opacity:0; animation:fadeUp .9s ease 1s forwards; }
  .hero-stat { padding:8px 28px; text-align:center; }
  .hero-stat + .hero-stat { border-left:1px solid var(--border2); }
  .stn { font-size:26px; font-weight:900; color:var(--gold); font-family:'Montserrat',sans-serif; line-height:1; }
  .stl { font-size:10px; color:var(--muted); text-transform:uppercase; letter-spacing:2px; margin-top:4px; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

  /* ── SECTION ── */
  .sec { max-width:1200px; margin:0 auto; padding:36px 28px 80px; }
  @media(max-width:480px){ .sec{ padding:24px 16px 80px; } }
  .sec-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; color:var(--text); margin:28px 0 12px; display:flex; align-items:center; gap:8px; }
  .sec-label { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:#4d90ff; margin-bottom:6px; }

  /* ── VEDETTES (urgent scroll) ── */
  .vedettes-scroll { display:flex; gap:12px; overflow-x:auto; padding:4px 0 16px; scrollbar-width:none; -ms-overflow-style:none; }
  .vedettes-scroll::-webkit-scrollbar { display:none; }
  .vedette-card { min-width:180px; background:var(--bg2); border-radius:14px; overflow:hidden; border:1.5px solid rgba(255,217,61,.2); flex-shrink:0; cursor:pointer; transition:all .25s; }
  .vedette-card:hover { transform:translateY(-4px); border-color:rgba(255,217,61,.5); box-shadow:0 12px 32px rgba(255,217,61,.12); }
  .vedette-img { height:90px; background:linear-gradient(135deg,#0e1e3a,#1a3a8f); display:flex; align-items:center; justify-content:center; font-size:36px; position:relative; overflow:hidden; }
  .vedette-img img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
  .vedette-badge { position:absolute; top:7px; left:7px; background:var(--gold); color:var(--dark); font-size:9px; font-weight:900; padding:3px 8px; border-radius:8px; font-family:'Montserrat',sans-serif; z-index:1; }
  .vedette-body { padding:10px 12px; }
  .vedette-title { font-family:'Montserrat',sans-serif; font-size:12px; font-weight:700; color:var(--text); margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .vedette-prix { font-size:13px; font-weight:800; color:var(--gold); font-family:'Montserrat',sans-serif; }

  /* ── CATÉGORIE TABS (scrollable) ── */
  .cat-tabs-wrap { overflow-x:auto; scrollbar-width:none; -ms-overflow-style:none; margin:0 -28px; padding:0 28px; }
  @media(max-width:480px){ .cat-tabs-wrap{ margin:0 -16px; padding:0 16px; } }
  .cat-tabs-wrap::-webkit-scrollbar { display:none; }
  .cat-tabs { display:flex; gap:8px; padding:4px 0 14px; width:max-content; min-width:100%; }
  .cat-tab-item { display:flex; align-items:center; gap:7px; padding:9px 16px; border-radius:50px; border:1.5px solid var(--border2); background:var(--card); font-family:'Montserrat',sans-serif; font-size:12px; font-weight:700; color:var(--muted); cursor:pointer; transition:all .2s; white-space:nowrap; flex-shrink:0; }
  .cat-tab-item:hover { border-color:rgba(77,144,255,.4); color:#7ab3ff; background:rgba(23,86,200,.1); }
  .cat-tab-item.on { border-color:rgba(23,86,200,.6); background:rgba(23,86,200,.18); color:#7ab3ff; box-shadow:0 0 0 1px rgba(23,86,200,.3); }
  .cat-tab-item.fav.on { border-color:rgba(239,68,68,.5); background:rgba(239,68,68,.1); color:#f87171; }
  .cat-tab-icon { font-size:16px; line-height:1; }
  .cat-tab-count { background:rgba(255,255,255,.08); border-radius:10px; padding:1px 6px; font-size:10px; }
  .cat-tab-item.on .cat-tab-count { background:rgba(255,255,255,.15); }

  /* ── FILTRES ── */
  .filter-row { display:flex; align-items:center; gap:8px; margin:14px 0 8px; flex-wrap:wrap; }
  .filter-chip { display:flex; align-items:center; gap:5px; padding:7px 14px; border-radius:50px; border:1.5px solid var(--border2); background:var(--card); font-size:12px; font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; color:var(--muted); transition:all .2s; }
  .filter-chip.on, .filter-chip:hover { border-color:rgba(23,86,200,.5); background:rgba(23,86,200,.15); color:#7ab3ff; }
  .filter-panel { background:var(--bg2); border-radius:16px; border:1.5px solid var(--border2); padding:20px 22px; margin-bottom:14px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; box-shadow:0 8px 32px rgba(0,0,0,.3); animation:fadeUp .2s ease; }
  @media(max-width:600px){ .filter-panel{ grid-template-columns:1fr 1fr; } }
  .filter-label { font-size:11px; font-weight:800; color:var(--text); margin-bottom:6px; display:block; text-transform:uppercase; letter-spacing:0.5px; }
  .filter-reset { background:rgba(255,255,255,.04); color:var(--muted); border:1.5px solid var(--border); border-radius:10px; padding:10px; font-size:12px; font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; grid-column:1/-1; transition:all .2s; }
  .filter-reset:hover { border-color:rgba(23,86,200,.4); color:#7ab3ff; }
  .results-bar { display:flex; align-items:center; justify-content:space-between; margin:16px 0 12px; }
  .results-count { font-family:'Montserrat',sans-serif; font-size:15px; font-weight:800; color:var(--text); }
  .results-sub { font-size:12px; color:rgba(232,240,255,.6); margin-top:2px; }

  /* ── GRID CARDS ── */
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:18px; margin-bottom:36px; }
  @media(max-width:640px){ .grid{ grid-template-columns:repeat(2,1fr); gap:12px; } }
  @media(max-width:360px){ .grid{ grid-template-columns:1fr; } }

  .card { background:var(--bg2); border-radius:var(--card-radius); overflow:hidden; border:1.5px solid var(--border); transition:all .28s cubic-bezier(.2,.8,.2,1); cursor:pointer; display:flex; flex-direction:column; }
  .card:hover { transform:translateY(-5px); box-shadow:0 20px 56px rgba(0,0,0,.5),0 0 0 1px rgba(23,86,200,.3); border-color:rgba(23,86,200,.35); }

  .cimg { height:190px; position:relative; overflow:hidden; flex-shrink:0; }
  .cimg-real { width:100%; height:100%; object-fit:cover; display:block; transition:transform .4s ease; }
  .card:hover .cimg-real { transform:scale(1.04); }
  .cimg-emoji { height:190px; background:linear-gradient(135deg,#0e1e3a 0%,#1a3a8f 100%); display:flex; align-items:center; justify-content:center; font-size:64px; position:relative; flex-shrink:0; }
  .photo-count { position:absolute; bottom:10px; right:10px; background:rgba(8,12,20,.75); color:var(--text); font-size:10px; font-weight:700; padding:3px 9px; border-radius:10px; font-family:'Montserrat',sans-serif; backdrop-filter:blur(4px); }
  .bcat { position:absolute; top:10px; left:10px; background:rgba(10,36,99,.85); color:#7ab3ff; font-size:9px; font-weight:800; letter-spacing:0.8px; padding:4px 10px; border-radius:20px; text-transform:uppercase; font-family:'Montserrat',sans-serif; z-index:1; backdrop-filter:blur(6px); border:1px solid rgba(77,144,255,.25); }
  .burg { position:absolute; top:10px; right:42px; background:linear-gradient(135deg,#FF6B35,#FF3D00); color:white; font-size:9px; font-weight:800; padding:4px 10px; border-radius:20px; font-family:'Montserrat',sans-serif; z-index:1; animation:puls 2.5s infinite; }
  @keyframes puls { 0%,100%{box-shadow:0 0 0 0 rgba(255,61,0,.4)} 50%{box-shadow:0 0 0 6px rgba(255,61,0,0)} }
  .bmine { position:absolute; bottom:10px; left:10px; background:var(--gold); color:var(--dark); font-size:9px; font-weight:800; padding:3px 9px; border-radius:20px; font-family:'Montserrat',sans-serif; z-index:1; }
  .fav-btn { position:absolute; top:10px; right:10px; width:30px; height:30px; border-radius:50%; background:rgba(8,12,20,.75); border:1px solid var(--border2); font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(6px); transition:all .2s; z-index:2; }
  .fav-btn:hover { transform:scale(1.2); }

  .cbody { padding:14px 16px 16px; display:flex; flex-direction:column; flex:1; }
  .ctitle { font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; color:var(--text); margin-bottom:6px; line-height:1.35; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .cprix { font-size:18px; font-weight:900; color:var(--gold); margin-bottom:6px; font-family:'Montserrat',sans-serif; letter-spacing:-0.3px; }
  .clieu { font-size:11px; color:rgba(232,240,255,.6); margin-bottom:8px; }
  .cdesc { font-size:12px; color:rgba(232,240,255,.75); line-height:1.6; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin-bottom:12px; flex:1; }
  .cfoot { display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--border); padding-top:11px; margin-top:auto; }
  .cvend { font-size:11px; color:rgba(232,240,255,.6); min-width:0; }
  .cvend strong { color:var(--text); font-size:12px; display:block; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:120px; }
  .cbtn { display:flex; align-items:center; gap:4px; background:rgba(23,86,200,.2); color:#7ab3ff; border:1px solid rgba(23,86,200,.35); border-radius:9px; padding:7px 13px; font-size:12px; font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; transition:all .2s; flex-shrink:0; }
  .cbtn:hover { background:rgba(23,86,200,.35); border-color:rgba(77,144,255,.5); }

  /* ── EMPTY STATE ── */
  .empty { text-align:center; padding:60px 20px; color:var(--muted); }
  .eico { font-size:52px; margin-bottom:14px; line-height:1; }
  .emsg { font-size:16px; font-weight:700; color:var(--text); margin-bottom:6px; }
  .esub { font-size:13px; color:var(--muted); }

  /* ── PAGINATION ── */
  .pagination { display:flex; align-items:center; justify-content:center; gap:6px; margin:8px 0 44px; flex-wrap:wrap; }
  .page-btn { width:40px; height:40px; border-radius:12px; border:1.5px solid var(--border2); background:var(--bg2); font-size:14px; font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; color:var(--muted); transition:all .2s; display:flex; align-items:center; justify-content:center; }
  .page-btn:hover:not(:disabled){ border-color:rgba(23,86,200,.5); color:#7ab3ff; background:rgba(23,86,200,.1); }
  .page-btn.on { background:rgba(23,86,200,.2); color:#7ab3ff; border-color:rgba(23,86,200,.5); }
  .page-btn:disabled { opacity:0.35; cursor:not-allowed; }

  /* ── AUTH ── */
  .auth-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; background:var(--bg); position:relative; overflow:hidden; }
  .auth-wrap::before { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:600px; height:600px; background:radial-gradient(ellipse,rgba(23,86,200,.18) 0%,transparent 65%); pointer-events:none; }
  .auth-box { background:var(--bg2); border:1px solid var(--border2); border-radius:28px; padding:36px 32px; max-width:400px; width:100%; box-shadow:0 40px 100px rgba(0,0,0,.6); animation:fadeUp .5s ease; position:relative; z-index:1; }
  .auth-logo-wrap { display:flex; justify-content:center; margin-bottom:24px; }
  .tabs { display:flex; background:rgba(255,255,255,.04); border:1px solid var(--border); border-radius:12px; padding:4px; margin-bottom:24px; gap:4px; }
  .tab { flex:1; padding:10px; border-radius:9px; font-size:13px; font-weight:700; cursor:pointer; border:none; background:transparent; font-family:'Montserrat',sans-serif; color:var(--muted); transition:all .2s; }
  .tab.on { background:rgba(23,86,200,.25); color:#7ab3ff; border:1px solid rgba(23,86,200,.4); }
  .fg { margin-bottom:14px; }
  .fl { display:block; font-size:12px; font-weight:700; color:var(--text); margin-bottom:5px; text-transform:uppercase; letter-spacing:0.4px; }
  .fi { width:100%; padding:11px 14px; border:1.5px solid var(--border2); border-radius:12px; font-size:14px; font-family:'Inter',sans-serif; outline:none; background:rgba(255,255,255,.04); color:var(--text); transition:all .2s; }
  .fi:focus { border-color:rgba(23,86,200,.5); background:rgba(23,86,200,.06); box-shadow:0 0 0 3px rgba(23,86,200,.1); }
  .fs { width:100%; padding:11px 14px; border:1.5px solid var(--border2); border-radius:12px; font-size:14px; font-family:'Inter',sans-serif; outline:none; background:rgba(255,255,255,.04); color:var(--text); cursor:pointer; }
  .fs:focus { border-color:rgba(23,86,200,.5); outline:none; }
  option { background:#1a2540; color:var(--text); }
  .fta { width:100%; padding:12px 14px; border:1.5px solid var(--border2); border-radius:12px; font-size:14px; font-family:'Inter',sans-serif; outline:none; resize:vertical; min-height:96px; background:rgba(255,255,255,.04); color:var(--text); transition:all .2s; }
  .fta:focus { border-color:rgba(23,86,200,.5); background:rgba(23,86,200,.05); box-shadow:0 0 0 3px rgba(23,86,200,.1); }
  .fb { width:100%; background:linear-gradient(135deg,var(--blue),var(--dark)); color:white; border:none; border-radius:12px; padding:14px; font-size:15px; font-weight:800; cursor:pointer; font-family:'Montserrat',sans-serif; margin-top:8px; transition:all .2s; }
  .fb:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(23,86,200,.4); }
  .fb:disabled { opacity:0.55; cursor:not-allowed; transform:none; box-shadow:none; }
  .ferr { background:rgba(239,68,68,.1); border:1.5px solid rgba(239,68,68,.3); border-radius:12px; padding:11px 14px; font-size:13px; color:#f87171; margin-bottom:14px; font-weight:600; display:flex; align-items:center; gap:8px; }
  .fhint { font-size:11px; color:var(--muted); margin-top:4px; }
  .frow { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .google-btn { width:100%; background:rgba(255,255,255,.05); color:var(--text); border:1.5px solid var(--border2); border-radius:12px; padding:13px; font-size:14px; font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:10px; }
  .google-btn:hover { background:rgba(255,255,255,.1); border-color:rgba(66,133,244,.4); }
  .divider { display:flex; align-items:center; gap:12px; margin:16px 0; color:var(--muted); font-size:12px; font-weight:600; }
  .divider::before, .divider::after { content:''; flex:1; height:1px; background:var(--border); }
  .utog { display:flex; align-items:center; gap:10px; cursor:pointer; user-select:none; }
  .tog { width:44px; height:24px; border-radius:12px; background:var(--border2); position:relative; transition:background .25s; flex-shrink:0; }
  .tog.on { background:var(--blue); }
  .tog::after { content:''; position:absolute; width:18px; height:18px; background:white; border-radius:50%; top:3px; left:3px; transition:left .25s; box-shadow:0 2px 6px rgba(0,0,0,.3); }
  .tog.on::after { left:23px; }

  /* ── PHOTO UPLOADER ── */
  .photo-section { margin-bottom:18px; }
  .photo-grid { display:flex; gap:10px; flex-wrap:wrap; margin-top:8px; }
  .photo-slot { width:96px; height:96px; border-radius:14px; border:2px dashed var(--border2); background:rgba(255,255,255,.03); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; position:relative; overflow:hidden; font-size:11px; color:var(--muted); font-weight:600; gap:5px; }
  .photo-slot:hover { border-color:rgba(23,86,200,.5); background:rgba(23,86,200,.08); color:#7ab3ff; }
  .photo-slot img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
  .photo-del { position:absolute; top:5px; right:5px; background:rgba(220,38,38,.9); color:white; border:none; border-radius:50%; width:22px; height:22px; font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-weight:700; z-index:2; }
  .photo-uploading { position:absolute; inset:0; background:rgba(23,86,200,.7); display:flex; align-items:center; justify-content:center; color:white; font-size:11px; font-weight:700; border-radius:12px; }
  .photo-main-badge { position:absolute; bottom:5px; left:5px; background:var(--gold); color:var(--dark); font-size:9px; font-weight:800; padding:2px 7px; border-radius:6px; font-family:'Montserrat',sans-serif; }
  .photo-limit { font-size:11px; color:var(--muted); margin-top:6px; }

  /* ── POST PAGE ── */
  .pscreen { max-width:580px; margin:32px auto; padding:0 20px 60px; }
  .pback { display:flex; align-items:center; gap:7px; color:var(--muted); font-size:13px; font-weight:700; cursor:pointer; margin-bottom:22px; background:none; border:none; font-family:'Montserrat',sans-serif; padding:0; transition:color .2s; }
  .pback:hover { color:#7ab3ff; }
  .pcard { background:var(--bg2); border-radius:24px; padding:32px; border:1px solid var(--border2); box-shadow:0 8px 40px rgba(0,0,0,.3); }
  .ptitle { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:900; color:var(--text); margin-bottom:26px; }
  .succ { background:rgba(34,197,94,.1); border:1.5px solid rgba(34,197,94,.3); border-radius:12px; padding:14px 18px; color:#4ade80; font-size:14px; font-weight:700; margin-bottom:18px; display:flex; align-items:center; gap:10px; }

  /* ── MODAL ── */
  .moverlay { position:fixed; inset:0; background:rgba(0,5,18,.85); z-index:200; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(8px); }
  .modal { background:var(--bg2); border:1px solid var(--border2); border-radius:24px; max-width:540px; width:100%; overflow:hidden; box-shadow:0 40px 100px rgba(0,0,0,.7); animation:fadeUp .3s cubic-bezier(.2,.8,.2,1); max-height:90vh; overflow-y:auto; position:relative; z-index:201; }
  .mimg-wrap { height:300px; position:relative; overflow:hidden; background:linear-gradient(135deg,#0e1e3a,#1a3a8f); cursor:zoom-in; }
  .mimg-real { width:100%; height:100%; object-fit:cover; display:block; transition:transform .3s; }
  .mimg-real:hover { transform:scale(1.03); }
  .mnav-btn { background:rgba(8,12,20,.65); color:white; border:1px solid var(--border2); border-radius:50%; width:36px; height:36px; font-size:20px; cursor:pointer; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px); transition:background .2s; }
  .mnav-btn:hover { background:rgba(8,12,20,.9); }
  .mnav-left { position:absolute; left:10px; top:50%; transform:translateY(-50%); z-index:4; }
  .mnav-right { position:absolute; right:10px; top:50%; transform:translateY(-50%); z-index:4; }
  .mimg-dots { position:absolute; bottom:12px; left:50%; transform:translateX(-50%); display:flex; gap:6px; }
  .mdot { width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,.35); transition:all .2s; }
  .mdot.on { background:white; width:20px; border-radius:4px; }
  .mbadges { position:absolute; top:12px; left:12px; display:flex; gap:6px; z-index:1; }
  .mimg-emoji { height:220px; display:flex; align-items:center; justify-content:center; font-size:80px; background:linear-gradient(135deg,#0e1e3a,#1a3a8f); }
  .mbody { padding:24px; }
  .mtitle { font-family:'Montserrat',sans-serif; font-size:20px; font-weight:900; color:var(--text); margin-bottom:6px; line-height:1.25; }
  .mprix { font-size:26px; font-weight:900; color:var(--gold); margin-bottom:14px; font-family:'Montserrat',sans-serif; letter-spacing:-0.5px; }
  .mmeta { display:flex; gap:8px; margin-bottom:14px; flex-wrap:wrap; }
  .mmeta span { font-size:12px; color:rgba(232,240,255,.7); background:rgba(255,255,255,.05); border:1px solid var(--border); border-radius:8px; padding:5px 11px; font-weight:600; }
  .mdesc { font-size:14px; color:rgba(232,240,255,.82); line-height:1.75; margin-bottom:20px; }
  .macts { display:flex; gap:10px; flex-wrap:wrap; }
  .mclose { flex:1; min-width:80px; background:rgba(255,255,255,.05); color:var(--muted); border:1.5px solid var(--border2); border-radius:12px; padding:13px; font-size:13px; font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; transition:all .2s; }
  .mclose:hover { color:var(--text); background:rgba(255,255,255,.08); }
  .mwa { flex:2; min-width:140px; display:flex; align-items:center; justify-content:center; gap:8px; background:rgba(23,86,200,.2); color:#7ab3ff; border:1.5px solid rgba(23,86,200,.4); border-radius:12px; padding:13px; font-size:14px; font-weight:800; cursor:pointer; font-family:'Montserrat',sans-serif; text-decoration:none; transition:all .2s; }
  .mwa:hover { background:rgba(23,86,200,.35); transform:translateY(-1px); }

  /* SELLER BOX */
  .seller-box { background:rgba(255,255,255,.04); border:1px solid var(--border); border-radius:14px; padding:14px 16px; margin-bottom:18px; display:flex; align-items:center; gap:14px; }
  .seller-avatar { width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,var(--dark),var(--blue)); display:flex; align-items:center; justify-content:center; font-family:'Montserrat',sans-serif; font-weight:900; font-size:16px; color:white; flex-shrink:0; border:1.5px solid rgba(255,255,255,.12); }
  .seller-name { font-family:'Montserrat',sans-serif; font-size:14px; font-weight:700; color:var(--text); }
  .seller-sub { font-size:12px; color:rgba(232,240,255,.6); margin-top:2px; }

  /* PLEIN ÉCRAN */
  .fullscreen-overlay { position:fixed; inset:0; background:rgba(0,0,0,.97); z-index:9999; display:flex; align-items:center; justify-content:center; cursor:zoom-out; }
  .fullscreen-img { max-width:100vw; max-height:100vh; object-fit:contain; }
  .fullscreen-close { position:fixed; top:54px; right:20px; color:white; font-size:20px; font-weight:900; cursor:pointer; background:rgba(0,0,0,.7); border:2px solid rgba(255,255,255,.6); border-radius:50%; width:52px; height:52px; display:flex; align-items:center; justify-content:center; z-index:10000; transition:background .2s; backdrop-filter:blur(8px); box-shadow:0 4px 20px rgba(0,0,0,.5); }
  .fullscreen-close:hover { background:rgba(255,255,255,.2); }
  .fullscreen-hint { position:fixed; bottom:40px; left:50%; transform:translateX(-50%); color:rgba(255,255,255,.5); font-size:12px; font-family:'Montserrat',sans-serif; z-index:10000; }

  /* ── PROFILE ── */
  .profscreen { max-width:740px; margin:32px auto; padding:0 20px 60px; }
  .profhead { background:linear-gradient(135deg,var(--bg2),var(--bg3)); border:1px solid var(--border2); border-radius:24px; padding:28px 32px; margin-bottom:20px; display:flex; align-items:center; gap:22px; position:relative; overflow:hidden; }
  .profhead::before { content:''; position:absolute; top:-60px; right:-60px; width:200px; height:200px; background:radial-gradient(ellipse,rgba(23,86,200,.2) 0%,transparent 65%); pointer-events:none; }
  .avatar { width:68px; height:68px; border-radius:50%; background:linear-gradient(135deg,var(--dark),var(--blue)); display:flex; align-items:center; justify-content:center; font-size:28px; color:white; font-weight:900; font-family:'Montserrat',sans-serif; flex-shrink:0; border:2px solid rgba(255,255,255,.15); box-shadow:0 4px 20px rgba(0,0,0,.4); }
  .pinfo h2 { font-family:'Montserrat',sans-serif; font-size:20px; font-weight:900; color:var(--text); margin:0 0 4px; }
  .pinfo p { font-size:13px; color:var(--muted); }
  .pstats { display:flex; gap:28px; margin-top:14px; }
  .psn { font-size:24px; font-weight:900; color:var(--gold); font-family:'Montserrat',sans-serif; }
  .psl { font-size:10px; color:var(--muted); text-transform:uppercase; letter-spacing:1.2px; }
  .del-btn { background:rgba(239,68,68,.1); color:#f87171; border:1px solid rgba(239,68,68,.3); border-radius:10px; padding:7px 14px; font-size:12px; font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; transition:all .2s; flex:1; }
  .del-btn:hover { background:rgba(239,68,68,.25); }

  /* ── STATS GRID ── */
  .stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:20px; }
  @media(max-width:480px){ .stats-grid{ grid-template-columns:repeat(2,1fr); } }
  .stat-card { background:var(--bg2); border-radius:var(--radius); border:1px solid var(--border2); padding:18px 16px; text-align:center; transition:border-color .2s; }
  .stat-card:hover { border-color:rgba(23,86,200,.3); }
  .stat-card-n { font-size:26px; font-weight:900; font-family:'Montserrat',sans-serif; color:#4d90ff; }
  .stat-card-l { font-size:11px; color:var(--muted); text-transform:uppercase; letter-spacing:1px; margin-top:5px; font-weight:700; }

  /* ── MESSAGERIE ── */
  .chat-list-wrap { max-width:720px; margin:28px auto; padding:0 20px 60px; }
  .conv-item { display:flex; align-items:center; gap:14px; padding:16px 20px; border-bottom:1px solid var(--border); cursor:pointer; transition:background .2s; }
  .conv-item:last-child { border-bottom:none; }
  .conv-item:hover { background:rgba(255,255,255,.03); }
  .conv-avatar { width:50px; height:50px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--dark)); display:flex; align-items:center; justify-content:center; font-size:20px; color:white; font-weight:800; font-family:'Montserrat',sans-serif; flex-shrink:0; }
  .conv-info { flex:1; min-width:0; }
  .conv-name { font-weight:800; font-size:14px; color:var(--text); margin-bottom:3px; }
  .conv-annonce { font-size:11px; color:#4d90ff; font-weight:700; margin-bottom:2px; }
  .conv-last { font-size:12px; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .conv-unread { background:var(--blue); color:white; font-size:10px; font-weight:800; min-width:20px; height:20px; padding:0 5px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .chatroom { display:flex; flex-direction:column; height:calc(100dvh - 68px); max-width:720px; margin:0 auto; }
  .chatroom-header { display:flex; align-items:center; gap:12px; padding:14px 20px; border-bottom:1px solid var(--border); background:var(--bg2); flex-shrink:0; }
  .chatroom-back { background:none; border:none; font-size:22px; cursor:pointer; color:#4d90ff; padding:0; line-height:1; }
  .chatroom-info h3 { font-family:'Montserrat',sans-serif; font-size:15px; font-weight:800; color:var(--text); margin:0; }
  .chatroom-info p { font-size:12px; color:var(--muted); margin:2px 0 0; }
  .chatroom-messages { flex:1; overflow-y:auto; padding:16px 20px; display:flex; flex-direction:column; gap:10px; background:var(--bg); }
  .msg { display:flex; flex-direction:column; max-width:75%; }
  .msg.mine { align-self:flex-end; align-items:flex-end; }
  .msg.theirs { align-self:flex-start; align-items:flex-start; }
  .msg-bubble { padding:11px 15px; border-radius:18px; font-size:14px; line-height:1.55; }
  .msg.mine .msg-bubble { background:linear-gradient(135deg,var(--blue),#1a4fd8); color:white; border-bottom-right-radius:5px; }
  .msg.theirs .msg-bubble { background:var(--bg2); color:var(--text); border:1px solid var(--border); border-bottom-left-radius:5px; }
  .msg-time { font-size:10px; color:var(--muted); margin-top:4px; }
  .chatroom-input { display:flex; gap:10px; padding:12px 16px; background:var(--bg2); border-top:1px solid var(--border); flex-shrink:0; }
  .chatroom-input input { flex:1; padding:12px 16px; border:1.5px solid var(--border2); border-radius:26px; font-size:14px; outline:none; background:rgba(255,255,255,.04); color:var(--text); transition:border-color .2s; }
  .chatroom-input input:focus { border-color:rgba(23,86,200,.5); background:rgba(23,86,200,.05); }
  .send-btn { background:var(--blue); color:white; border:none; border-radius:50%; width:44px; height:44px; font-size:20px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all .2s; }
  .send-btn:hover { background:var(--dark); transform:scale(1.08); }

  /* ── ADMIN ── */
  .admin-screen { max-width:940px; margin:32px auto; padding:0 20px 60px; }
  .admin-header { background:linear-gradient(135deg,#6d28d9,#4F46E5); border-radius:20px; padding:24px 28px; margin-bottom:24px; display:flex; align-items:center; justify-content:space-between; }
  .admin-title { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:900; color:white; }
  .admin-subtitle { font-size:13px; color:rgba(255,255,255,0.65); margin-top:4px; }
  .admin-stats { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:24px; }
  .admin-stat { background:var(--bg2); border-radius:16px; padding:18px 22px; border:1px solid var(--border2); flex:1; min-width:110px; text-align:center; }
  .admin-stat-n { font-size:30px; font-weight:900; font-family:'Montserrat',sans-serif; color:#4d90ff; }
  .admin-stat-l { font-size:10px; color:var(--muted); text-transform:uppercase; letter-spacing:1.2px; margin-top:5px; font-weight:700; }
  .admin-section { background:var(--bg2); border-radius:18px; border:1px solid var(--border2); overflow:hidden; margin-bottom:20px; }
  .admin-section-title { padding:16px 20px; font-family:'Montserrat',sans-serif; font-weight:800; font-size:15px; color:var(--text); border-bottom:1px solid var(--border); display:flex; align-items:center; gap:8px; }
  .admin-row { display:flex; align-items:center; justify-content:space-between; padding:14px 20px; border-bottom:1px solid var(--border); gap:12px; }
  .admin-row:last-child { border-bottom:none; }
  .admin-row-info { flex:1; min-width:0; }
  .admin-row-title { font-weight:700; font-size:14px; color:var(--text); margin-bottom:3px; }
  .admin-row-sub { font-size:12px; color:var(--muted); }
  .admin-row-actions { display:flex; gap:8px; flex-shrink:0; }
  .btn-danger { background:rgba(239,68,68,.1); color:#f87171; border:1px solid rgba(239,68,68,.3); border-radius:8px; padding:7px 13px; font-size:12px; font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; transition:all .2s; }
  .btn-danger:hover { background:rgba(239,68,68,.25); }
  .btn-warn { background:rgba(217,119,6,.1); color:#fbbf24; border:1px solid rgba(217,119,6,.3); border-radius:8px; padding:7px 13px; font-size:12px; font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; transition:all .2s; }
  .btn-warn:hover { background:rgba(217,119,6,.25); }
  .admin-tabs { display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap; }
  .admin-tab { padding:9px 18px; border-radius:10px; border:1.5px solid var(--border2); background:var(--card); font-size:13px; font-weight:700; cursor:pointer; font-family:'Montserrat',sans-serif; color:var(--muted); transition:all .2s; }
  .admin-tab.on { background:#6d28d9; color:white; border-color:#6d28d9; }

  /* ── NOTATION ── */
  .stars { display:flex; gap:4px; }
  .star { font-size:24px; cursor:pointer; transition:transform .15s; line-height:1; }
  .star:hover { transform:scale(1.25); }
  .rating-box { background:rgba(255,255,255,.03); border:1px solid var(--border); border-radius:14px; padding:18px; margin-bottom:18px; }
  .rating-title { font-family:'Montserrat',sans-serif; font-size:14px; font-weight:800; color:var(--text); margin-bottom:12px; }
  .rating-avg { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
  .rating-avg-n { font-size:30px; font-weight:900; color:var(--gold); font-family:'Montserrat',sans-serif; }
  .rating-count { font-size:12px; color:var(--muted); }
  .rating-comment { width:100%; padding:11px 14px; border:1.5px solid var(--border2); border-radius:12px; font-size:13px; outline:none; resize:none; min-height:72px; background:rgba(255,255,255,.04); color:var(--text); margin-top:8px; transition:border-color .2s; }
  .rating-comment:focus { border-color:rgba(23,86,200,.5); }
  .review-item { padding:12px 0; border-bottom:1px solid var(--border); }
  .review-item:last-child { border-bottom:none; }
  .review-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:5px; }
  .review-name { font-size:13px; font-weight:700; color:var(--text); }
  .review-date { font-size:11px; color:var(--muted); }
  .review-text { font-size:13px; color:rgba(232,240,255,.75); line-height:1.55; }

  /* ── FOOTER ── */
  .footer { background:var(--bg2); color:var(--muted); text-align:center; padding:20px; font-size:12px; margin-top:auto; border-top:1px solid var(--border); }
  .footer strong { color:var(--gold); font-weight:800; }

  /* ── stitle alias ── */
  .stitle { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; color:var(--text); margin:28px 0 12px; }
`;
