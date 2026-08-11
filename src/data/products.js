const DEFAULT_IMAGES = [
  {
    id: 1,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkBwQ7DMrb6gClUCcC3_zpCHyafbXRCM0LRPRb-0rH3hxCoBzYF8XHsZde94UyD8T50v9L0a-mdG9P0V-AodzaOA2xX9LF6UFPiNJBIPleRSpqHvFhOaA6KIFU7QuQpzq38y1TcrSi6V4lTxaFY_IvZWWneKHo0WxVHdWpcGMJBTOWQSoTWfHyofx6asZn2-kGMIcZNx0tzovPriKbd6cAPvrb6mIpxzvvy9CBBDL3Lc8c_jTZr5OS',
    alt: {
      es: 'Fotografía editorial de alta costura de la Blusa Athene Silk en crema suave',
      en: 'High-fashion editorial photo of Athene Silk Blouse in soft cream',
    },
  },
  {
    id: 2,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf8DpRdglknXmK29iaCfUSTeYfveK_6XFBLD4XFMWFP-jDRpW8-86FT-LouuymXKQ8wrZjagBxLKF4TEhukkqXXeYjUNVqdgu70JURc5xnScn0QTTkXBnMazMMrzWfumaS8PCvT270jgUG1B3Tif2AbiYY2IA74MkCJGmh-2uxp-WK4_EHZMrNcf-tsHJ1nfEcFJYmyro19m5aueWdIIGgXbRXClIt58FGbj2oj4OUxIoCa6E69N9l',
    alt: {
      es: 'Detalle de cuello y botones de perla',
      en: 'Detail shot of collar and button placket with pearl buttons',
    },
  },
  {
    id: 3,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxZ_pwzriNB0ylgTlKoS2JgTOyoK8y2iZMAzZBc4qp8uz3gilj5ce3pSGClmE701Y9sLuSVmZxHgTUGm78QDVL-IWVdY7yULtFZ4qage_DwxTb2cSmn-sBSjFm--O0b2qZp_aL3NdBkC-uPHHx0sUBc1wbPfZiDRlQbUhUOPABL1AFG1CGcVRCZOI2tV3yEQFxzJkaHvyNrpkCKDKH6GGoP_w9jqmBrz_dd01BT29P9R1nyGjn4utn',
    alt: {
      es: 'Primer plano del puño con pliegue sutil',
      en: 'Close up of cuff with subtle pleat detail',
    },
  },
  {
    id: 4,
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfaMdc4GrXPMZ-jNxHX-2XNS60ig6BLfYhdrm2T67z7ftRURxjF-K_ovIVdGZe3tmO5tEJhRXI71_nDCVs1uHh8pLautKqfgs4SQk2njbICMCQ6SBtV3jnifqIV9qqVZTSF_atEffOqNGrrfwmdkmdk_Kw4iJrKXkLmBvFcbEipOeLm6oXEUPrkgKZDcDCSyYYyVh1VREryLRNh2rpw-V-tzgkmgil1Ifp0i6HCPrvpkh2Dd-hYQh1',
    alt: {
      es: 'Vista posterior mostrando la caída elegante de la seda',
      en: 'Back view showing elegant drape of silk fabric',
    },
  },
];

export const PRODUCTS = [
  {
    id: 'minnus',
    categorySlug: 'blouses',
    category: {
      es: 'Blusas',
      en: 'Blouses',
    },
    title: {
      es: 'La Minnus',
      en: 'The Minnus',
    },
    price: '$450.00',
    description: {
      es: 'Confeccionada en seda doble georgette de peso pesado, esta blusa ofrece una caída fluida y un acabado mate. Con un cuello alargado de punta y solapa oculta, representa la cumbre de la elegancia sobria. Elaborada éticamente en Italia.',
      en: 'Crafted from heavyweight double georgette silk, this blouse offers a fluid drape and a matte finish. Featuring an elongated pointed collar and concealed placket, it represents the pinnacle of understated elegance. Made ethically in Italy.',
    },
    composition: {
      es: '100% Seda Orgánica Doble Georgette',
      en: '100% Organic Double Georgette Silk',
    },
    origin: {
      es: 'Hecho a mano en Milán, Italia',
      en: 'Handmade in Milan, Italy',
    },
    size: 'featured',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByNH9M3n_XMicM3GMWbcqqfmSqcK6KZq7PolHkUj2LVUnKQNERdtY7GPkoxjC3hIlQaCBtikvYIL6umwO8ddxPeF_uPU5hJz2h66T7A6OCaJ_EVoE1FOs_IRcXOMQ0ZWLYvfw5mm4E9W7VjHDnmEu25FNU7ONqR6eRFLqxdrVpDu_SwkUPXVmHOVWEASDWMnN_p0gjVGCJ9bA2Gu4qG0FOPGYQIjsioHwZjrGdYsnnIxu08z99LFdR',
    alt: {
      es: 'Primer plano de blusa de seda de lujo en pedestal minimalista',
      en: 'Close-up of luxury silk blouse fabric draped on minimalist pedestal',
    },
    gallery: DEFAULT_IMAGES,
  },
  {
    id: 'sculptural-forms',
    categorySlug: 'accessories',
    category: {
      es: 'Accesorios',
      en: 'Accessories',
    },
    title: {
      es: 'Formas Escultóricas',
      en: 'Sculptural Forms',
    },
    price: '$320.00',
    description: {
      es: 'Pendientes de latón hechos a mano con acabado en oro cepillado. Cada par está forjado individualmente a mano, reflejando la luz en geometrías orgánicas únicas.',
      en: 'Hand-crafted brass earrings with a brushed gold finish. Each pair is uniquely shaped through hand forging, reflecting light in organic geometries.',
    },
    composition: {
      es: 'Latón reciclado teñido en Oro de 18K',
      en: 'Recycled Brass dipped in 18K Gold',
    },
    origin: {
      es: 'Forjado a mano en Florencia, Italia',
      en: 'Hand-forged in Florence, Italy',
    },
    size: 'small',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6_g_r5cUyG8dRQppl2fTSvmYvL145-hBQyxBbGAozo-bt366uJhicfM2Rh6dsQlPKcmWq5C7HftPJGfJ5q0kJzESQE3rxkYwy6Q137ryFy6E6RcjeDLKBfj8InRBDQ6wMlJcO6TaZyWArVp3Xe90nWEUnniesNPZ7gEhiWh-gfNGs6sUyvEagKyRxCW9XoGcsESb4qHiHG--11_kHQdnDOGtpiP_SCDwA6JHKJly-84tc6ON1dfBO',
    alt: {
      es: 'Pendientes escultóricos de vanguardia sobre bloque de piedra',
      en: 'Sculptural avant-garde earrings on rough-hewn stone block',
    },
    gallery: [
      {
        id: 1,
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6_g_r5cUyG8dRQppl2fTSvmYvL145-hBQyxBbGAozo-bt366uJhicfM2Rh6dsQlPKcmWq5C7HftPJGfJ5q0kJzESQE3rxkYwy6Q137ryFy6E6RcjeDLKBfj8InRBDQ6wMlJcO6TaZyWArVp3Xe90nWEUnniesNPZ7gEhiWh-gfNGs6sUyvEagKyRxCW9XoGcsESb4qHiHG--11_kHQdnDOGtpiP_SCDwA6JHKJly-84tc6ON1dfBO',
        alt: {
          es: 'Pendientes escultóricos sobre piedra',
          en: 'Sculptural avant-garde earrings on rough-hewn stone block',
        },
      },
    ],
  },
  {
    id: 'structured-pleats',
    categorySlug: 'skirts',
    category: {
      es: 'Faldas',
      en: 'Skirts',
    },
    title: {
      es: 'Pliegues Estructurados',
      en: 'Structured Pleats',
    },
    price: '$580.00',
    description: {
      es: 'Falda midi plisada de talle alto en mezcla de crepé de lana. Presenta pliegues permanentes definidos y una cremallera lateral oculta para una silueta arquitectónica impecable.',
      en: 'High-waisted pleated midi skirt in wool-crepe blend. Features sharp permanent pleating and a concealed side zipper for a seamless architectural silhouette.',
    },
    composition: {
      es: '70% Lana Virgen, 30% Seda',
      en: '70% Virgin Wool, 30% Silk',
    },
    origin: {
      es: 'Confeccionado en Turín, Italia',
      en: 'Tailored in Turin, Italy',
    },
    size: 'small',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKGEP_R7KgsIV5eGg-0MdWMD7vrg8XfQlY5eR4KIpNCWosvXEVsvUZ9P6n62S1yA03iwPjiop9JmFKwS59zqBzPP773Bg4kx__xeiSbu89TBXdfLqknEZBHff6pts0LqsHXjYHEgJBXRMC13Qtw6cgcOhH9pLvdviBsBY9U4H2HUbYMq4Zkxsj_tfg_aEik1GdWxW8pjOGrdTHL-ktw5Fo_hBSMhmElbrWm1EkjCtdmSvvxgBGWlDf',
    alt: {
      es: 'Imagen de moda editorial de falda plisada en movimiento',
      en: 'Editorial fashion image of pleated skirt in motion through sunlit hallway',
    },
    gallery: [
      {
        id: 1,
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKGEP_R7KgsIV5eGg-0MdWMD7vrg8XfQlY5eR4KIpNCWosvXEVsvUZ9P6n62S1yA03iwPjiop9JmFKwS59zqBzPP773Bg4kx__xeiSbu89TBXdfLqknEZBHff6pts0LqsHXjYHEgJBXRMC13Qtw6cgcOhH9pLvdviBsBY9U4H2HUbYMq4Zkxsj_tfg_aEik1GdWxW8pjOGrdTHL-ktw5Fo_hBSMhmElbrWm1EkjCtdmSvvxgBGWlDf',
        alt: {
          es: 'Falda plisada en movimiento',
          en: 'Editorial fashion image of pleated skirt in motion',
        },
      },
    ],
  },
];

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export const CATEGORIES = [
  { id: 'blouses', name: { es: 'Blusas', en: 'Blouses' } },
  { id: 'skirts', name: { es: 'Faldas', en: 'Skirts' } },
  { id: 'accessories', name: { es: 'Accesorios', en: 'Accessories' } },
];

export function getProductsByCategory(categorySlug) {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug || p.category.en.toLowerCase() === categorySlug.toLowerCase() || p.category.es.toLowerCase() === categorySlug.toLowerCase());
}

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.id === slug);
}
