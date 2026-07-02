/**
 * Server-side meta tag injection for SEO pre-rendering.
 *
 * Search engine crawlers receive HTML with the correct title, description,
 * Open Graph tags, and JSON-LD structured data already in the <head>,
 * instead of the generic fallback tags from public/index.html.
 *
 * This avoids the need for a headless browser or a full SSR framework.
 */

// Static page meta data
const STATIC_PAGES = {
  '/': {
    title: 'Xeus Home | Premium Renovations',
    description: 'Xeus Home offers premium full home, kitchen, bathroom, and basement renovations. Managed by our dedicated core team and a trusted network of skilled trades.',
    ogImage: 'https://xeushome.ca/og-image.jpg',
  },
  '/our-projects': {
    title: 'Our Projects | Xeus Home',
    description: 'Explore our portfolio of premium full home, kitchen, bathroom, and basement renovations across Hamilton, Burlington, Oakville, Mississauga, and the GTA.',
    ogImage: 'https://xeushome.ca/og-image.jpg',
  },
  '/about-us': {
    title: 'About Us | Xeus Home',
    description: 'Meet the specialized core team and trusted network of skilled trades leading Xeus Home renovations across Ontario.',
    ogImage: 'https://xeushome.ca/og-image.jpg',
  },
  '/contact-us': {
    title: 'Contact Us | Xeus Home',
    description: 'Get in touch with Xeus Home for a free renovation consultation. Serving Hamilton, Burlington, Oakville, Mississauga, Milton, St. Catharines, and the GTA.',
    ogImage: 'https://xeushome.ca/og-image.jpg',
  },
  '/blog': {
    title: 'Blog | Xeus Home',
    description: 'Renovation tips, guides, and expert advice from Xeus Home. Learn how to plan your renovation, choose the right contractor, and transform your home in Hamilton, Burlington, Mississauga, and the GTA.',
    ogImage: 'https://xeushome.ca/og-image.jpg',
  },
};

// Blog article meta data
const BLOG_ARTICLES = {
  'how-to-choose-renovation-contractor-hamilton-gta': {
    title: 'How to Choose a Renovation Contractor in Hamilton, Mississauga & the GTA | Xeus Home',
    description: 'Not sure how to choose a renovation contractor in Hamilton, Mississauga, Burlington, or Oakville? Learn what to look for, what questions to ask, and how Xeus Home delivers the premium experience you deserve.',
  },
  'what-to-expect-during-home-renovation-ontario': {
    title: 'What to Expect During a Home Renovation in Ontario | Xeus Home',
    description: 'Wondering what happens during a kitchen, bathroom, or basement renovation? Xeus Home walks you through every phase, from planning to final walkthrough, so you know exactly what to expect.',
  },
};

// Location landing page meta data
const LOCATION_PAGES = {
  'kitchen-renovation-hamilton': {
    title: 'Kitchen Renovation in Hamilton | Xeus Home',
    description: 'Premium kitchen renovations in Hamilton, Ontario. Xeus Home delivers custom cabinetry, countertops, and full kitchen remodels with expert craftsmanship. Free consultation.',
  },
  'bathroom-renovation-burlington': {
    title: 'Bathroom Renovation in Burlington | Xeus Home',
    description: 'Transform your bathroom with Xeus Home in Burlington, Ontario. Custom vanities, tile work, glass showers, and full bathroom remodels. Free consultation.',
  },
  'home-renovation-oakville': {
    title: 'Home Renovation in Oakville | Xeus Home',
    description: 'Full home renovations in Oakville, Ontario. Xeus Home delivers premium kitchen, bathroom, basement, and whole-home remodels. Free consultation.',
  },
  'home-renovation-mississauga': {
    title: 'Home Renovation in Mississauga | Xeus Home',
    description: 'Premium home renovation services in Mississauga, Ontario. Kitchens, bathrooms, basements, and full home remodels by Xeus Home. Free consultation.',
  },
  'basement-renovation-gta': {
    title: 'Basement Renovation in the GTA | Xeus Home',
    description: 'Basement finishing and renovation across the Greater Toronto Area. Xeus Home creates functional, beautiful basement spaces. Free consultation.',
  },
  'renovation-contractor-st-catharines': {
    title: 'Renovation Contractor in St. Catharines | Xeus Home',
    description: 'Trusted renovation contractor in St. Catharines, Ontario. Xeus Home specializes in kitchens, bathrooms, basements, and full home renovations. Free consultation.',
  },
};

/**
 * Given a request path, return the SEO meta for that page.
 * Returns null if the path has no pre-configured meta.
 */
function getMetaForPath(reqPath, projectRow) {
  // Static pages
  if (STATIC_PAGES[reqPath]) {
    const page = STATIC_PAGES[reqPath];
    return {
      ...page,
      url: `https://xeushome.ca${reqPath === '/' ? '' : reqPath}`,
      bodyContent: `<h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.description)}</p>`,
    };
  }

  // Blog detail pages
  const blogMatch = reqPath.match(/^\/blog\/(.+)$/);
  if (blogMatch && BLOG_ARTICLES[blogMatch[1]]) {
    const article = BLOG_ARTICLES[blogMatch[1]];
    return {
      ...article,
      ogImage: 'https://xeushome.ca/og-image.jpg',
      url: `https://xeushome.ca${reqPath}`,
      bodyContent: article.bodyContent || `<h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.description)}</p>`,
    };
  }

  // Location pages
  const locMatch = reqPath.match(/^\/services\/(.+)$/);
  if (locMatch && LOCATION_PAGES[locMatch[1]]) {
    const loc = LOCATION_PAGES[locMatch[1]];
    return {
      ...loc,
      ogImage: 'https://xeushome.ca/og-image.jpg',
      url: `https://xeushome.ca${reqPath}`,
      bodyContent: loc.bodyContent || `<h1>${escapeHtml(loc.title)}</h1><p>${escapeHtml(loc.description)}</p>`,
    };
  }

  // Project detail pages (from DB row)
  if (projectRow) {
    const desc = projectRow.meta_description || (projectRow.description ? projectRow.description.slice(0, 160) : `${projectRow.title} - A renovation project by Xeus Home.`);
    const plainDesc = projectRow.description ? projectRow.description.replace(/<[^>]+>/g, ' ').slice(0, 500) : '';
    return {
      title: `${projectRow.title} | Xeus Home`,
      description: desc,
      ogImage: projectRow.cover_image ? (projectRow.cover_image.startsWith('http') ? projectRow.cover_image : `https://renovation-website-pdnn.onrender.com${projectRow.cover_image}`) : 'https://xeushome.ca/og-image.jpg',
      url: `https://xeushome.ca/our-projects/${projectRow.slug}`,
      bodyContent: `<h1>${escapeHtml(projectRow.title)}</h1><p>${escapeHtml(plainDesc)}</p>`,
    };
  }

  return null;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Inject meta tags into the HTML template string.
 */
function injectMeta(html, meta) {
  if (!meta) return html;

  // Replace <title>
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${meta.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeAttr(meta.url || 'https://xeushome.ca')}" />`
  );
  if (meta.ogImage) {
    html = html.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${escapeAttr(meta.ogImage)}" />`
    );
  }

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`
  );

  // Add canonical link before </head>
  if (meta.url) {
    html = html.replace(
      '</head>',
      `  <link rel="canonical" href="${escapeAttr(meta.url)}" />\n  </head>`
    );
  }

  // Inject server-rendered content into <div id="root"> for crawlers
  if (meta.bodyContent) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n  <div id="seo-content" style="display:none">${meta.bodyContent}</div>`
    );
  }

  return html;
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = { getMetaForPath, injectMeta, LOCATION_PAGES };
