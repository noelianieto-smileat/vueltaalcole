/* =========================================================================
   SMILEAT · Vuelta al Cole — app.js
   Renderiza todo el informe a partir de DATA (data.js)
   ========================================================================= */

/* ---------------- Helpers ---------------- */
function parseNum(str){
  if (str == null) return NaN;
  const limpio = String(str).replace(/[€%x\s]/g, '').replace(/\./g, '').replace(',', '.');
  const n = parseFloat(limpio);
  return isNaN(n) ? NaN : n;
}

function claseColor(valor, umbral){
  if (isNaN(valor)) return null;
  const { dir, bueno, regular } = umbral;
  if (dir === 1){
    if (valor >= bueno) return 'good';
    if (valor >= regular) return 'mid';
    return 'bad';
  } else {
    if (valor <= bueno) return 'good';
    if (valor <= regular) return 'mid';
    return 'bad';
  }
}

function calcularColores(contenido, umbrales){
  return contenido.map(item => {
    const colorItem = {};
    Object.keys(umbrales).forEach(key => {
      const val = parseNum(item.metricas?.[key]);
      const cls = claseColor(val, umbrales[key]);
      if (cls) colorItem[key] = cls;
    });
    return colorItem;
  });
}

/* ============================================================
   HERO — meta línea + KPIs
   ============================================================ */
function renderHero(){
  document.getElementById('hero-periodo-meta').textContent = DATA.meta.periodo;
  document.getElementById('hero-periodo-google').textContent = "1 – 31 ago 2026 (pausada)";
  document.getElementById('hero-periodo-productos').textContent = DATA.productos.periodo;
  document.getElementById('hero-lede').textContent =
    `${DATA.meta.promo}. Resultados de Meta Ads ordenados de mejor a peor por volumen de ventas, resumen de Google Ads Performance Max y ranking de productos vendidos según GA4.`;

  document.getElementById('kpi-row').innerHTML = DATA.meta.kpis.map(k =>
    `<div class="kpi-card"><div class="label">${k.label}</div><div class="value">${k.value}</div></div>`
  ).join('');
}

/* ============================================================
   CREATIVIDADES — Meta Ads
   ============================================================ */
function renderCreatividades(){
  const grid = document.getElementById('creative-grid');
  const lista = DATA.meta.creatividades;
  const colores = calcularColores(lista, DATA.umbrales);

  grid.innerHTML = lista.map((item, i) => {
    const mediaEl = item.type === 'video'
      ? `<video src="${item.src}" controls playsinline muted loop></video>`
      : `<img src="${item.src}" alt="${item.nota || ''}">`;

    const m = item.metricas || {};
    const colorItem = colores[i] || {};
    const statsHtml = DATA.campos.map(([key, label]) => {
      const clsColor = colorItem[key] ? ` ${colorItem[key]}` : '';
      return `
      <div class="metric${clsColor}">
        <div class="m-value">${m[key] ?? '—'}</div>
        <div class="m-label">${label}</div>
      </div>`;
    }).join('');

    return `
      <div class="creative-card">
        <div class="rank-pill">#${i + 1}</div>
        <div class="creative-media">${mediaEl}</div>
        <div class="creative-body">
          <p class="creative-title">${item.nota || ''}</p>
          <div class="metric-grid">${statsHtml}</div>
        </div>
      </div>`;
  }).join('');
}

/* ============================================================
   GOOGLE ADS + TOP PRODUCTOS
   ============================================================ */
function renderSplit(){
  const g = DATA.google;
  const p = DATA.productos;

  document.getElementById('split-grid').innerHTML = `
    <div class="card card-pad">
      <h3>${g.label}</h3>
      <div class="meta-line">${g.sub}</div>
      <div class="compare-grid">
        ${g.stats.map(s => `<div class="compare-card"><div class="label">${s.lab}</div><div class="value">${s.val}</div></div>`).join('')}
      </div>
      <span class="status-pill">${g.estado}</span>
    </div>
    <div class="card card-pad">
      <h3>Top 10 productos</h3>
      <div class="meta-line">Unidades vendidas e ingresos a nivel de artículo · GA4</div>
      <table class="data-table">
        <thead>
          <tr><th>#</th><th>Producto</th><th class="num">Unidades</th><th class="num">Ingresos</th></tr>
        </thead>
        <tbody>
          ${p.top10.map((item, i) => {
            const cls = claseColor(item.cantidad, DATA.umbralProducto);
            return `<tr>
              <td class="rk">${i + 1}</td>
              <td>${item.name}</td>
              <td class="num"><span class="qty-pill${cls ? ' ' + cls : ''}">${item.cantidad} ud.</span></td>
              <td class="num">${item.val}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/* ============================================================
   INIT
   ============================================================ */
renderHero();
renderCreatividades();
renderSplit();
