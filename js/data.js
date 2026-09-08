/* =========================================================================
   SMILEAT · VUELTA AL COLE — Informe de campaña
   Promo: -30% en la primera suscripción / -15% en toda la web
   Fuentes:
   - Meta: "Smileat-Ad-Account-España-Anuncios-30-ago_-2026-7-sept_-2026.csv" (por anuncio, 30 ago–7 sept 2026)
   - Google: "Informe de grupos de recursos.csv" (grupo de recursos Performance Max, 1–31 ago 2026)
   - GA4: "download.csv" (Explorador GA4, producto x contenido de anuncio, 1–31 ago 2026)
   Todas las cifras proceden directamente de los CSV proporcionados. Donde el dato no existe se marca N/D.
   ========================================================================= */

const DATA = {

  campaign: {
    name: "VUELTA AL COLE",
    promo: "Hasta -30% en tu primera suscripción · -15% en toda la web",
    metaPeriod: "30 agosto – 7 septiembre 2026",
    googlePeriod: "1 – 31 agosto 2026",
    status: "Finalizada / en cierre — Meta ya no entrega (\"not_delivering\") y el grupo de recursos de Google está en pausa",
    periodNote: "Meta reporta el flight completo de la campaña (30 ago–7 sept). El export de Google es el informe de grupos de recursos del mes de agosto completo — el grupo de recursos solo tuvo actividad real dentro de esa ventana de flight, pero el export no permite acotar el rango de fechas al periodo exacto de Meta."
  },

  meta: {
    period: "30 ago – 7 sept 2026",
    spend: 2593.54,
    purchases: 290,
    impressions: 683982,
    value: 13341.75,
    roas: 5.14,
    cpa: 8.94,
    cpm: 3.79,
    reachSumNote: "La suma de alcance por creatividad (178.779) no representa alcance único: varias personas fueron impactadas por más de un anuncio de la campaña.",
    creatives: [
      { id:"IMG1", file:"IMG1_VUELTAALCOLE.jpg", type:"image", name:"IMG1_VUELTAALCOLE", spend:518.84, impressions:147622, reach:35876, frequency:4.11, cpm:3.51, purchases:70, cpa:7.41, roas:5.79, value:3004.95 },
      { id:"IMG2", file:"IMG2_VUELTAALCOLE.jpg", type:"image", name:"IMG2_VUELTAALCOLE", spend:447.81, impressions:115914, reach:30791, frequency:3.76, cpm:3.86, purchases:44, cpa:10.18, roas:4.55, value:2038.42 },
      { id:"IMG3", file:"IMG3_VUELTAALCOLE.jpg", type:"image", name:"IMG3_VUELTAALCOLE", spend:923.23, impressions:251337, reach:58385, frequency:4.30, cpm:3.67, purchases:121, cpa:7.63, roas:6.44, value:5948.75 },
      { id:"VID1", file:"VID1_VUELTAALCOLE.mp4", type:"video", name:"VID1_VUELTAALCOLE", spend:537.38, impressions:128445, reach:34100, frequency:3.77, cpm:4.18, purchases:40, cpa:13.43, roas:3.19, value:1713.12 },
      { id:"IMG4", file:"IMG4_VUELTAALCOLE_UltimoPush.jpg", type:"image", name:"IMG4_VUELTAALCOLE_ÚltimoPush", spend:166.28, impressions:40664, reach:19627, frequency:2.07, cpm:4.09, purchases:15, cpa:11.09, roas:3.83, value:636.51, note:"Última creatividad activada, a modo de \"último empujón\" antes del cierre de la promoción." }
    ],
    adset: "PROS/RET - VUELTA AL COLE (15% en todo / 30% primera suscripción)"
  },

  google: {
    period: "1 – 31 ago 2026 (informe de grupos de recursos)",
    assetGroup: "VUELTA AL COLE - 15% TODO Y 30% SUSCRIP.",
    campaignType: "Performance Max",
    status: "En pausa",
    adStrength: "Pendiente",
    audienceSignal: "Brand",
    clicks: 304,
    impressions: 12621,
    ctr: 2.41,
    cpc: 0.11,
    spend: 32.40,
    valuePerConv: 51.09,
    value: 1859.25,
    convRate: 11.89,
    conversions: 36.39,
    cpa: 0.89,
    roas: 57.38,
    searchThemes: ["comida infantil","comida para bebes","smileat","cereales bebe","comida bebes","tarritos para bebe","comida infantil ecologica"],
    note: "El gasto de este grupo de recursos (32,40€) es marginal frente al de Meta — probablemente porque, dentro de la campaña Performance Max, el algoritmo priorizó otros grupos de recursos / señales y apenas asignó presupuesto a este en concreto. Aun así, con el poco gasto que tuvo, el rendimiento fue excelente (ROAS 57,4x), lo que sugiere que ampliar su presupuesto o dedicarle una campaña propia podría ser rentable en la próxima promoción similar."
  },

  ga4: {
    period: "1 – 31 ago 2026",
    source: "GA4 · Exploración \"Smileat Global\"",
    totalPurchasedItems: 128,
    totalCartItems: 165,
    totalRevenue: 301.42,
    byCreative: [
      { creative:"IMG3_VUELTAALCOLE", purchased:110, cart:115, revenue:266.32 },
      { creative:"IMG1_VUELTAALCOLE", purchased:18, cart:35, revenue:35.10 },
      { creative:"IMG2_VUELTAALCOLE", purchased:0, cart:15, revenue:0 }
    ],
    topProducts: [
      { name:"Pack Carne y Pescado", purchased:2, cart:4, revenue:55.20 },
      { name:"Tarrito de pollo con arroz y guisantes", purchased:12, cart:11, revenue:27.14 },
      { name:"Tarrito de ternera con verduras", purchased:10, cart:10, revenue:22.22 },
      { name:"Tarrito de bacalao con patatas y verduras", purchased:9, cart:6, revenue:20.27 },
      { name:"Tarrito de pavo y verduras", purchased:9, cart:12, revenue:20.27 },
      { name:"Tarrito de multifrutas con mango", purchased:11, cart:7, revenue:16.39 },
      { name:"Pack Cereales KIDS", purchased:1, cart:2, revenue:16.15 },
      { name:"Pouch de fresa y plátano", purchased:11, cart:7, revenue:15.84 },
      { name:"Tarrito de cocidito con ternera y jamón", purchased:6, cart:12, revenue:12.72 },
      { name:"Tarrito de verduras con lubina y merluza", purchased:6, cart:19, revenue:12.72 }
    ],
    note: "Este desglose de producto de GA4 (128 artículos comprados, 301,42€) es una vista complementaria a nivel de artículo dentro del carrito/checkout, y no coincide con las 290 compras / 13.341,75€ que reporta Meta a nivel de evento de compra — cada plataforma mide con metodología y ventana de atribución distintas, y un pedido puede incluir varios artículos. Se incluye para mostrar qué productos concretos empujó la campaña, no como cifra sustitutiva del resultado de Meta."
  },

  combined: {
    spend: 2625.94,
    value: 15201.00,
    roas: 5.79,
    results: 326.39,
    metaSharePct: 98.8,
    googleSharePct: 1.2
  }
};
