/* =========================================================================
   SMILEAT · VUELTA AL COLE — app.js
   Renderiza todas las secciones a partir de DATA (data.js)
   ========================================================================= */

/* ---------------- Formatting helpers ---------------- */
const fmtEUR = n => n === null || n === undefined ? 'N/D' : n.toLocaleString('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0});
const fmtEUR2 = n => n === null || n === undefined ? 'N/D' : n.toLocaleString('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:2});
const fmtNum = n => n === null || n === undefined ? 'N/D' : Math.round(n).toLocaleString('es-ES');
const fmtNum1 = n => n === null || n === undefined ? 'N/D' : n.toLocaleString('es-ES',{maximumFractionDigits:1});
const fmtPct = n => n === null || n === undefined ? 'N/D' : n.toLocaleString('es-ES',{maximumFractionDigits:2})+'%';
const fmtX = n => n === null || n === undefined ? 'N/D' : n.toLocaleString('es-ES',{maximumFractionDigits:2})+'x';
const el = (tag, cls, html) => { const e = document.createElement(tag); if(cls) e.className = cls; if(html!==undefined) e.innerHTML = html; return e; };

/* ============================================================
   HERO — KPIs + split interactivo Meta/Google
   ============================================================ */
function renderHero(){
  const m = DATA.meta, g = DATA.google, c = DATA.combined;

  const metricsConfig = {
    spend: { label:'Inversión total', metaVal:m.spend, googleVal:g.spend, fmt:fmtEUR2, note:null },
    value: { label:'Ingresos generados', metaVal:m.value, googleVal:g.value, fmt:fmtEUR, note:null },
    results: { label:'Compras / conversiones', metaVal:m.purchases, googleVal:g.conversions, fmt:fmtNum1, note:'Compras (Meta) + conversiones (Google) — no representan usuarios únicos.' },
  };

  const kpis = [
    {label:'Inversión total', value: fmtEUR2(c.spend), sub:'Meta + Google', metric:'spend'},
    {label:'Ingresos generados', value: fmtEUR(c.value), sub:'Valor de conversión reportado por cada plataforma', metric:'value'},
    {label:'ROAS combinado', value: fmtX(c.roas), sub:'Por cada € invertido', metric:null},
    {label:'Resultados totales', value: fmtNum(c.results), sub:'Compras Meta + conversiones Google', metric:'results'},
  ];
  const row = document.getElementById('hero-kpis');
  kpis.forEach(k=>{
    const clickable = !!k.metric;
    const card = el('div', `kpi-card${clickable?' kpi-card--clickable':''}${k.metric==='spend'?' active':''}`, `<div class="label">${k.label}</div><div class="value">${k.value}</div><div class="sub">${k.sub}</div>`);
    if(clickable){
      card.dataset.metric = k.metric;
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');
      card.setAttribute('aria-pressed', k.metric==='spend' ? 'true':'false');
    }
    row.appendChild(card);
  });

  const barWrap = document.getElementById('hero-split');
  const metaPart = barWrap.querySelector('.meta-part');
  const googlePart = barWrap.querySelector('.google-part');
  const legend = document.getElementById('hero-split-legend');

  function renderSplit(metricId){
    const cfg = metricsConfig[metricId];
    const total = cfg.metaVal + cfg.googleVal;
    const metaPct = total ? (cfg.metaVal/total)*100 : 50;
    const googlePct = total ? (cfg.googleVal/total)*100 : 50;
    metaPart.style.width = metaPct + '%';
    googlePart.style.width = googlePct + '%';
    legend.innerHTML = `
      <span><span class="dot meta"></span>Meta Ads — ${cfg.fmt(cfg.metaVal)} (${metaPct.toFixed(1)}%)</span>
      <span><span class="dot google"></span>Google Ads — ${cfg.fmt(cfg.googleVal)} (${googlePct.toFixed(1)}%)</span>`;
  }

  function selectMetric(metricId){
    row.querySelectorAll('.kpi-card[data-metric]').forEach(cd=>{
      const active = cd.dataset.metric===metricId;
      cd.classList.toggle('active', active);
      cd.setAttribute('aria-pressed', active ? 'true':'false');
    });
    legend.classList.add('fading');
    window.setTimeout(()=>{ renderSplit(metricId); legend.classList.remove('fading'); }, 140);
  }

  row.addEventListener('click', e=>{
    const card = e.target.closest('.kpi-card[data-metric]');
    if(!card) return;
    selectMetric(card.dataset.metric);
  });
  row.addEventListener('keydown', e=>{
    if(e.key!=='Enter' && e.key!==' ') return;
    const card = e.target.closest('.kpi-card[data-metric]');
    if(!card) return;
    e.preventDefault();
    selectMetric(card.dataset.metric);
  });

  renderSplit('spend');
}

/* ============================================================
   META — Totales + creatividades
   ============================================================ */
function renderMeta(){
  const m = DATA.meta;
  document.getElementById('meta-adset-name').textContent = m.adset;

  const totals = [
    {l:'Inversión', v: fmtEUR2(m.spend)},
    {l:'Compras', v: fmtNum(m.purchases)},
    {l:'CPA', v: fmtEUR2(m.cpa)},
    {l:'ROAS', v: fmtX(m.roas)},
  ];
  const totalsGrid = document.getElementById('meta-totals');
  totals.forEach(t=> totalsGrid.appendChild(el('div','compare-card', `<div class="label">${t.l}</div><div class="value">${t.v}</div>`)));

  const best = m.creatives.reduce((a,b)=> b.roas>a.roas ? b : a, m.creatives[0]);

  const grid = document.getElementById('meta-creative-grid');
  m.creatives.forEach(cr=>{
    const card = el('div', `creative-result-card${cr.id===best.id?' best':''}`);
    const thumb = el('div','thumb');
    if(cr.type==='video'){
      const video = document.createElement('video');
      video.src = `assets/creatives/${cr.file}`;
      video.muted = true; video.loop = true; video.playsInline = true; video.preload = 'metadata';
      video.addEventListener('mouseenter', ()=> video.play().catch(()=>{}));
      video.addEventListener('mouseleave', ()=> video.pause());
      thumb.appendChild(video);
      thumb.appendChild(el('div','play-badge','▶ Vídeo'));
    } else {
      const img = document.createElement('img');
      img.src = `assets/creatives/${cr.file}`;
      img.alt = cr.name;
      thumb.appendChild(img);
    }
    if(cr.id===best.id) thumb.appendChild(el('div','best-tag','Mejor ROAS'));
    thumb.addEventListener('click', ()=> openLightbox(cr));
    card.appendChild(thumb);

    const body = el('div','cr-body');
    body.appendChild(el('div','cr-name', cr.name));
    if(cr.note) body.appendChild(el('div','cr-note', cr.note));
    const metrics = [
      ['Inversión', fmtEUR2(cr.spend)],
      ['Compras', fmtNum(cr.purchases)],
      ['CPA', fmtEUR2(cr.cpa)],
      ['ROAS', fmtX(cr.roas)],
      ['Impresiones', fmtNum(cr.impressions)],
      ['Alcance', fmtNum(cr.reach)],
    ];
    const mg = el('div','cr-metrics');
    metrics.forEach(([l,v])=> mg.appendChild(el('div','cr-metric', `<div class="cm-label">${l}</div><div class="cm-value">${v}</div>`)));
    body.appendChild(mg);
    card.appendChild(body);
    grid.appendChild(card);
  });

  document.getElementById('meta-summary-callout').innerHTML = `
    <b>En conjunto,</b> las 5 creatividades de Vuelta al Cole invirtieron ${fmtEUR2(m.spend)} y generaron ${fmtNum(m.purchases)} compras (${fmtEUR2(m.cpa)} de CPA) por ${fmtEUR(m.value)} de valor, un ROAS de ${fmtX(m.roas)}. <b>${best.name}</b> fue la pieza más eficiente, con un ROAS de ${fmtX(best.roas)} y concentrando ${fmtNum(best.purchases)} de las ${fmtNum(m.purchases)} compras totales (${((best.purchases/m.purchases)*100).toFixed(0)}%).`;

  document.getElementById('meta-reach-callout').innerHTML = m.reachSumNote;
}

function openLightbox(cr){
  const content = document.getElementById('lightbox-content');
  content.innerHTML = '';
  if(cr.type==='video'){
    const video = document.createElement('video');
    video.src = `assets/creatives/${cr.file}`;
    video.controls = true; video.autoplay = true; video.playsInline = true;
    content.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = `assets/creatives/${cr.file}`;
    img.alt = cr.name;
    content.appendChild(img);
  }
  document.getElementById('lightbox').classList.remove('hide');
}
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', e=>{ if(e.target.id==='lightbox') closeLightbox(); });
function closeLightbox(){
  const lb = document.getElementById('lightbox');
  lb.classList.add('hide');
  const v = lb.querySelector('video');
  if(v) v.pause();
  document.getElementById('lightbox-content').innerHTML = '';
}

/* ============================================================
   GA4 — Producto
   ============================================================ */
function renderGa4(){
  const d = DATA.ga4;
  const totals = [
    {l:'Artículos comprados', v: fmtNum(d.totalPurchasedItems)},
    {l:'Añadidos al carrito', v: fmtNum(d.totalCartItems)},
    {l:'Ingresos (nivel artículo)', v: fmtEUR2(d.totalRevenue)},
    {l:'Productos distintos', v: fmtNum(d.topProducts.length) + '+'},
  ];
  const grid = document.getElementById('ga4-totals');
  totals.forEach(t=> grid.appendChild(el('div','compare-card', `<div class="label">${t.l}</div><div class="value">${t.v}</div>`)));

  const rows = d.topProducts.map(p=>`<tr>
    <td><b>${p.name}</b></td>
    <td class="num">${fmtNum(p.purchased)}</td>
    <td class="num">${fmtNum(p.cart)}</td>
    <td class="num">${fmtEUR2(p.revenue)}</td>
  </tr>`).join('');
  document.getElementById('ga4-products-table').innerHTML = `
    <thead><tr><th>Producto</th><th class="num">Comprados</th><th class="num">Añadidos al carrito</th><th class="num">Ingresos</th></tr></thead>
    <tbody>${rows}</tbody>`;

  const crRows = d.byCreative.map(c=>`<tr>
    <td><b>${c.creative}</b></td>
    <td class="num">${fmtNum(c.purchased)}</td>
    <td class="num">${fmtNum(c.cart)}</td>
    <td class="num">${fmtEUR2(c.revenue)}</td>
  </tr>`).join('');
  document.getElementById('ga4-creative-table').innerHTML = `
    <thead><tr><th>Contenido de anuncio</th><th class="num">Comprados</th><th class="num">Añadidos al carrito</th><th class="num">Ingresos</th></tr></thead>
    <tbody>${crRows}</tbody>`;

  document.getElementById('ga4-note').innerHTML = `<b>Nota sobre esta cifra:</b> ${d.note}`;
}

/* ============================================================
   GOOGLE — Grupo de recursos
   ============================================================ */
function renderGoogle(){
  const g = DATA.google;
  const card = el('div','assetgroup-card');
  card.innerHTML = `
    <div class="ag-top">
      <div>
        <h3>${g.assetGroup}</h3>
        <div class="ag-meta">${g.campaignType} · señal de audiencia: ${g.audienceSignal} · eficacia del anuncio: ${g.adStrength}</div>
      </div>
      <div class="status-pill paused">● ${g.status}</div>
    </div>
    <div class="metric-grid" style="margin-top:18px;">
      <div class="metric"><div class="m-label">Inversión</div><div class="m-value">${fmtEUR2(g.spend)}</div></div>
      <div class="metric"><div class="m-label">Clics</div><div class="m-value">${fmtNum(g.clicks)}</div></div>
      <div class="metric"><div class="m-label">Impresiones</div><div class="m-value">${fmtNum(g.impressions)}</div></div>
      <div class="metric"><div class="m-label">CTR</div><div class="m-value">${fmtPct(g.ctr)}</div></div>
      <div class="metric"><div class="m-label">Conversiones</div><div class="m-value">${fmtNum1(g.conversions)}</div></div>
      <div class="metric"><div class="m-label">CPA</div><div class="m-value">${fmtEUR2(g.cpa)}</div></div>
      <div class="metric"><div class="m-label">Valor de conversión</div><div class="m-value">${fmtEUR2(g.value)}</div></div>
      <div class="metric"><div class="m-label">ROAS</div><div class="m-value">${fmtX(g.roas)}</div></div>
    </div>
    <h4 style="font-family:var(--ff-title);color:var(--blue-ink);margin:22px 0 8px;font-size:.85rem;text-transform:uppercase;letter-spacing:.05em;">Temas de búsqueda asociados</h4>
    <div class="chip-cloud" style="margin:0 0 18px;">${g.searchThemes.map(t=>`<span class="chip">${t}</span>`).join('')}</div>
    <div class="callout warn">${g.note}</div>
  `;
  document.getElementById('google-assetgroup-card').appendChild(card);
}

/* ============================================================
   VISIÓN CONJUNTA
   ============================================================ */
function renderJoint(){
  const m = DATA.meta, g = DATA.google, c = DATA.combined;
  document.getElementById('channel-grid').innerHTML = `
    <div class="channel-card meta">
      <h4>Meta Ads</h4>
      <div class="cc-row"><span>Inversión</span><b>${fmtEUR2(m.spend)}</b></div>
      <div class="cc-row"><span>Compras</span><b>${fmtNum(m.purchases)}</b></div>
      <div class="cc-row"><span>Ingresos</span><b>${fmtEUR(m.value)}</b></div>
      <div class="cc-row"><span>ROAS</span><b>${fmtX(m.roas)}</b></div>
      <div class="cc-row"><span>% del gasto conjunto</span><b>${fmtPct(c.metaSharePct)}</b></div>
    </div>
    <div class="channel-card google">
      <h4>Google Ads</h4>
      <div class="cc-row"><span>Inversión</span><b>${fmtEUR2(g.spend)}</b></div>
      <div class="cc-row"><span>Conversiones</span><b>${fmtNum1(g.conversions)}</b></div>
      <div class="cc-row"><span>Ingresos</span><b>${fmtEUR2(g.value)}</b></div>
      <div class="cc-row"><span>ROAS</span><b>${fmtX(g.roas)}</b></div>
      <div class="cc-row"><span>% del gasto conjunto</span><b>${fmtPct(c.googleSharePct)}</b></div>
    </div>`;

  const rows = [
    ['Inversión', fmtEUR2(m.spend), fmtEUR2(g.spend), fmtEUR2(c.spend)],
    ['Resultados (compras/conv.)', fmtNum(m.purchases), fmtNum1(g.conversions), fmtNum1(c.results)+'*'],
    ['Ingresos', fmtEUR(m.value), fmtEUR2(g.value), fmtEUR(c.value)],
    ['ROAS', fmtX(m.roas), fmtX(g.roas), fmtX(c.roas)],
  ];
  document.getElementById('joint-table').innerHTML = `
    <thead><tr><th>KPI</th><th>Meta</th><th>Google</th><th>Total</th></tr></thead>
    <tbody>${rows.map((r,i)=>`<tr class="${i===rows.length-1?'total-row':''}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody>`;
}

/* ============================================================
   CONCLUSIONES
   ============================================================ */
function renderConclusions(){
  const m = DATA.meta, g = DATA.google;
  const best = m.creatives.reduce((a,b)=> b.roas>a.roas ? b : a, m.creatives[0]);
  const worst = m.creatives.filter(c=>c.id!=='IMG4').reduce((a,b)=> b.roas<a.roas ? b : a, m.creatives[0]);
  const img4 = m.creatives.find(c=>c.id==='IMG4');
  const img3Share = ((best.purchases/m.purchases)*100).toFixed(0);

  const items = [
    {
      t:'La campaña cerró con un ROAS por encima de la media de la cuenta',
      dato:`ROAS ${fmtX(m.roas)} en Meta, con ${fmtEUR2(m.spend)} invertidos y ${fmtNum(m.purchases)} compras (CPA ${fmtEUR2(m.cpa)})`,
      interp:'Vuelta al Cole rindió por encima del ROAS medio de la cuenta en el periodo julio-agosto (4,69x), a pesar de tratarse de una promoción táctica de solo 9 días.',
      impacto:'Confirma que las promociones de doble descuento estacionales (suscripción + web) funcionan bien como palanca puntual, no solo como always-on.',
      reco:'Repetir el formato en la próxima fecha estacional relevante (Navidad, vuelta de verano, etc.), manteniendo la combinación de descuento en suscripción + descuento general.'
    },
    {
      t:`${best.name} concentró casi la mitad del resultado con un ROAS muy superior al resto`,
      dato:`ROAS ${fmtX(best.roas)}, ${fmtNum(best.purchases)} compras (${img3Share}% del total) con ${fmtEUR2(best.spend)} de inversión`,
      interp:`Fue claramente la pieza más eficiente, muy por delante de ${worst.name} (ROAS ${fmtX(worst.roas)}), el peor resultado entre las piezas activadas desde el inicio.`,
      impacto:'Gran parte del resultado de la campaña depende de una sola creatividad, lo que concentra el riesgo si esa pieza se fatiga en una campaña más larga.',
      reco:`Analizar qué hace a ${best.name} distinta (formato, producto mostrado, copy) para replicar ese patrón como punto de partida en el brief de la próxima campaña.`
    },
    {
      t:'El vídeo fue la pieza de menor ROAS entre las activadas desde el primer día',
      dato:`ROAS ${fmtX(worst.roas)}, CPA ${fmtEUR2(worst.cpa)} — el más alto de las 4 piezas que corrieron todo el flight`,
      interp:'Con los datos disponibles no se puede aislar si el motivo es el formato en sí, el gancho creativo o el momento de la compra dentro del funnel; el export no incluye CTR ni frecuencia por separado del resto de métricas ya reportadas.',
      impacto:'Si el patrón se repite en la próxima campaña, el vídeo estaría restando eficiencia media al conjunto.',
      reco:'Testear el vídeo en un adset o campaña separada la próxima vez, para poder leer su rendimiento sin que quede diluido junto al resto de imágenes.'
    },
    {
      t:`${img4.name.replace('_',' ')} tuvo menos tiempo para aprender antes del cierre`,
      dato:`Activada como último empujón, con ${fmtEUR2(img4.spend)} de inversión y ROAS ${fmtX(img4.roas)}`,
      interp:'Al lanzarse cerca del final de la promoción, tuvo menos días de rodaje y de aprendizaje del algoritmo que el resto de piezas.',
      impacto:'Es difícil separar si el ROAS más bajo se debe a la propia creatividad o simplemente a que tuvo menos tiempo para optimizarse.',
      reco:'Adelantar el lanzamiento de la pieza de "último empujón" varios días respecto al cierre de la promoción, en lugar de activarla en los últimos días.'
    },
    {
      t:'En Google, la promoción quedó infrafinanciada dentro de Performance Max',
      dato:`Solo ${fmtEUR2(g.spend)} de gasto, pero con un ROAS de ${fmtX(g.roas)}`,
      interp:'El algoritmo de Performance Max priorizó otros grupos de recursos de la misma campaña y apenas asignó presupuesto a Vuelta al Cole, aunque el poco gasto que tuvo fue muy rentable.',
      impacto:'Es probable que se haya dejado sobre la mesa un volumen de ventas incremental en Google por falta de presupuesto dedicado, no por falta de rendimiento.',
      reco:'Para la próxima promoción estacional, considerar una campaña de Search o Performance Max dedicada en Google (en vez de un grupo de recursos dentro de una campaña más amplia) para asegurarle presupuesto propio.'
    },
    {
      t:'A nivel de producto, la campaña empujó sobre todo packs y tarritos individuales',
      dato:`Pack Carne y Pescado lidera en ingresos (${fmtEUR2(DATA.ga4.topProducts[0].revenue)}), seguido de varios tarritos individuales de venta recurrente`,
      interp:'El patrón de compra encaja con el mensaje de la promo ("menos carga en septiembre", packs a medida): no fue solo tráfico genérico, se tradujo en compra de producto núcleo.',
      impacto:'Valida que el creative y el mensaje estaban alineados con el catálogo que realmente se quería impulsar.',
      reco:'Mantener el foco de producto (packs familiares + tarrito individual) como eje del catálogo destacado en la próxima campaña de temporada.'
    }
  ];
  document.getElementById('conclusions-list').innerHTML = items.map((it,i)=>`
    <div class="conclusion-card">
      <div class="conclusion-num">${i+1}</div>
      <div>
        <h4>${it.t}</h4>
        <div class="conclusion-row"><b>Dato:</b><span>${it.dato}</span></div>
        <div class="conclusion-row"><b>Interpretación:</b><span>${it.interp}</span></div>
        <div class="conclusion-row"><b>Impacto:</b><span>${it.impacto}</span></div>
        <div class="conclusion-row"><b>Recomendación:</b><span>${it.reco}</span></div>
      </div>
    </div>`).join('');
}

/* ============================================================
   INIT
   ============================================================ */
renderHero();
renderMeta();
renderGa4();
renderGoogle();
renderJoint();
renderConclusions();
