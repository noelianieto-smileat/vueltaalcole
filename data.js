/* =========================================================================
   SMILEAT · Vuelta al Cole — data.js
   Todos los datos del informe. Editar aquí para actualizar cifras.
   ========================================================================= */

const DATA = {

  meta: {
    periodo: "30 ago – 7 sept 2026",
    promo: "−30% en primera suscripción y −15% en toda la web",
    kpis: [
      { label: "Inversión", value: "2.593,54 €" },
      { label: "Compras", value: "290" },
      { label: "ROAS", value: "5,14x" },
      { label: "Ingresos", value: "13.341,75 €" },
    ],
    creatividades: [
      {
        type: "image", src: "media/IMG3_VUELTAALCOLE.jpg", nota: "IMG 3",
        metricas: { resultados: "121", ingresos: "5.948,75 €", gasto: "923,23 €", costeResultado: "7,63 €", impresiones: "251.337", alcance: "58.385" }
      },
      {
        type: "image", src: "media/IMG1_VUELTAALCOLE.jpg", nota: "IMG 1",
        metricas: { resultados: "70", ingresos: "3.004,95 €", gasto: "518,84 €", costeResultado: "7,41 €", impresiones: "147.622", alcance: "35.876" }
      },
      {
        type: "image", src: "media/IMG2_VUELTAALCOLE.jpg", nota: "IMG 2",
        metricas: { resultados: "44", ingresos: "2.038,42 €", gasto: "447,81 €", costeResultado: "10,18 €", impresiones: "115.914", alcance: "30.791" }
      },
      {
        type: "video", src: "media/VID1_VUELTAALCOLE.mp4", nota: "VID 1",
        metricas: { resultados: "40", ingresos: "1.713,12 €", gasto: "537,38 €", costeResultado: "13,43 €", impresiones: "128.445", alcance: "34.100" }
      },
      {
        type: "image", src: "media/IMG4_VUELTAALCOLE_UltimoPush.jpg", nota: "IMG 4 · Último Push",
        metricas: { resultados: "15", ingresos: "636,51 €", gasto: "166,28 €", costeResultado: "11,09 €", impresiones: "40.664", alcance: "19.627" }
      },
    ],
  },

  google: {
    label: "Vuelta al Cole · 15% todo y 30% suscripción",
    sub: "Grupo de recursos Performance Max · 30 ago – 7 sept 2026",
    estado: "Pausada",
    stats: [
      { val: "219,24 €", lab: "Gasto" },
      { val: "119,27", lab: "Conversiones" },
      { val: "6.348,39 €", lab: "Ingresos" },
      { val: "1,84 €", lab: "CPA" },
      { val: "28,96x", lab: "ROAS" },
    ]
  },

  productos: {
    periodo: "30 ago – 8 sept 2026 (GA4)",
    top10: [
      { name: "Tarrito de cocidito con ternera y jamón", cantidad: 31, val: "65,21 €" },
      { name: "Tarrito de guisito de alubias", cantidad: 30, val: "61,56 €" },
      { name: "Tarrito de pollo con arroz y guisantes", cantidad: 27, val: "58,77 €" },
      { name: "Tarrito de multifrutas con mango", cantidad: 25, val: "35,93 €" },
      { name: "Tarrito de arándanos, plátano y manzana", cantidad: 24, val: "34,66 €" },
      { name: "Tarrito de bacalao con patatas y verduras", cantidad: 23, val: "49,61 €" },
      { name: "Tarrito de ternera con verduras", cantidad: 21, val: "45,37 €" },
      { name: "Tarrito de verduras con lubina y merluza", cantidad: 21, val: "43,67 €" },
      { name: "Tarrito de pavo y verduras", cantidad: 20, val: "43,08 €" },
      { name: "Pouch de frutas variadas", cantidad: 19, val: "26,04 €" },
    ]
  },

  /* Campos y umbrales de color para las tarjetas de creatividades */
  campos: [
    ['resultados', 'Resultados'],
    ['ingresos', 'Ingresos'],
    ['gasto', 'Gasto'],
    ['costeResultado', 'Coste/result.'],
    ['impresiones', 'Impresiones'],
    ['alcance', 'Alcance'],
  ],

  umbrales: {
    resultados:     { dir: 1,  bueno: 70,    regular: 15 },
    ingresos:       { dir: 1,  bueno: 3000,  regular: 600 },
    costeResultado: { dir: -1, bueno: 8,     regular: 11 },
    alcance:        { dir: 1,  bueno: 45000, regular: 18000 },
  },

  umbralProducto: { dir: 1, bueno: 25, regular: 15 },

};
