import { business, collections, comparisons, designConcepts, pageCopy, ramps, services } from './content.js';

const html = (text) => String(text).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
function projectTile(project) {
  const image = project.images[project.cover];
  return `<article class="work-tile" data-reveal data-kind="${project.type}">
    <div class="work-photo"><img src="${image.url}" alt="${html(image.alt)}" loading="lazy" width="800" height="560" /></div>
    <div class="work-card-details"><h3>${html(project.name)}</h3><button class="work-trigger action action-outline action-small" type="button" data-project="${project.key}" aria-label="View ${html(project.name)}">View project</button></div>
  </article>`;
}

function comparisonPanel(comparison) {
  const project = collections.find((item) => item.key === comparison.projectKey);
  const stages = [
    { label: 'Before', index: comparison.before },
    { label: 'After', index: comparison.after },
  ];
  return `<article class="comparison-panel" data-reveal>
    <div class="comparison-pair">${stages.map((stage) => {
      const image = project.images[stage.index];
      return `<figure class="comparison-figure">
        <figcaption class="comparison-label ${stage.label.toLowerCase()}">${stage.label}</figcaption>
        <button class="comparison-photo" type="button" data-project="${project.key}" data-photo="${stage.index}" aria-label="View ${html(comparison.name)} ${stage.label.toLowerCase()} photo">
          <img src="${image.url}" alt="${stage.label}: ${html(image.alt)}" width="600" height="800" loading="lazy" /><span class="image-button-label">View photo</span>
        </button>
      </figure>`;
    }).join('')}</div>
    <h3 class="comparison-title">${html(comparison.name)}</h3>
  </article>`;
}

function designCard(design) {
  const cover = design.images[design.cover || 0];
  return `<article class="design-card ${design.key === 'vision' ? 'home-concept' : 'commercial-concept'}" data-reveal>
    <div class="design-cover"><img src="${cover.url}" alt="${html(cover.alt)}" width="1536" height="1024" loading="lazy" /></div>
    <div class="design-card-copy"><p class="design-type">${html(design.description)}</p><h3>${html(design.name)}</h3>
    ${design.images.length > 1 ? `<div class="design-thumbnails" aria-label="Explore 3D design views">${design.images.map((image, index) => `<button type="button" data-project="${design.key}" data-photo="${index}" aria-label="Open ${html(image.caption)}"><img src="${image.url}" alt="" width="180" height="120" loading="lazy" /></button>`).join('')}</div>` : ''}
    <button class="action action-outline" type="button" data-project="${design.key}" aria-label="View ${html(design.name)}">View design</button></div>
  </article>`;
}

export function renderWebsite() {
  const strata = collections.find((project) => project.key === 'strata');
  return `
  <a href="#page-content" class="jump-link">Skip to content</a>
  <header class="masthead">
    <div class="reading-progress" aria-hidden="true"><span></span></div>
    <div class="wrap masthead-inner">
      <a class="wordmark" href="#top" aria-label="Your Dream Home Renovations, home"><img src="/assets/ydhr-logo-transparent.png" width="1272" height="1237" alt="" /><span>Your Dream Home<small>RENOVATIONS</small></span></a>
      <button class="nav-toggle" type="button" aria-label="Menu" aria-controls="site-nav" aria-expanded="false"><span>Menu</span><span class="hamburger" aria-hidden="true"></span></button>
      <nav id="site-nav" aria-label="Main navigation"><a class="nav-access" href="#ndis">NDIS &amp; accessibility</a><a href="#transformations">Before &amp; after</a><a href="#work">Our work</a><a href="#services">Services</a><a class="action action-gold nav-quote" href="#contact">Free quote</a></nav>
    </div>
  </header>
  <main id="page-content">
    <section class="opening" id="top" aria-labelledby="opening-title">
      <div class="wrap opening-layout">
        <div class="opening-copy">
          <p class="kicker"><span class="location-dot" aria-hidden="true"></span> SYDNEY &amp; SURROUNDING REGIONS</p>
          <h1 id="opening-title" aria-label="${html(pageCopy.heroLead + ' ' + pageCopy.heroAccent)}"><span class="hero-line"><span class="hero-word">${pageCopy.heroLead}</span></span><span class="hero-line"><span class="hero-word hero-accent">${pageCopy.heroAccent}</span></span></h1>
          <p class="opening-description">${pageCopy.heroDescription}</p>
          <div class="opening-actions"><a class="action action-gold" href="#contact">Request a free quote</a><a class="action action-outline" href="#work">Explore our work</a></div>
          <p class="brand-promise">DESIGN. TRANSFORM. ELEVATE.</p>
        </div>
        <div class="hero-media">
          <div class="hero-image-frame"><img class="opening-photo" src="/assets/enhanced/project-13.webp" width="1500" height="1125" alt="The team carrying out rural property improvement works" fetchpriority="high" /></div>
          <article class="hero-project-card"><img src="/assets/enhanced/project-05.webp" width="250" height="326" alt="Completed timber deck with built-in seating" /><div><h2>Room to enjoy<br />the outdoors.</h2><button class="action action-outline action-small" type="button" data-project="deck" aria-label="View the outdoor deck transformation">View project</button></div></article>
        </div>
      </div>
    </section>

    <section class="accessibility block" id="ndis" aria-labelledby="ndis-title"><div class="wrap accessibility-layout">
      <div class="accessibility-copy" data-reveal>
        <p class="eyebrow">NDIS HOME MODIFICATIONS</p>
        <h2 id="ndis-title">Feel more<br /><span>at home.</span></h2>
        <p class="accessibility-lead">${pageCopy.accessibilityIntroduction}</p>
        <p>${pageCopy.accessibilityDetail}</p>
        <ul class="accessibility-options" aria-label="Home modification services"><li data-reveal>Bathroom modifications</li><li data-reveal>Wider doorways</li><li data-reveal>Ramps &amp; easier access</li></ul>
        <a class="action action-purple" href="#contact" data-interest="NDIS &amp; Accessibility">Discuss home modifications</a>
      </div>
      <div class="accessibility-visual ramp-feature" data-reveal>
        <div class="accessibility-image-frame"><img class="accessibility-art" src="${ramps.images[0].url}" width="1179" height="770" alt="${html(ramps.images[0].alt)}" loading="lazy" /></div>
        <div class="ramp-feature-details"><img src="${ramps.images[1].url}" width="1179" height="766" alt="${html(ramps.images[1].alt)}" loading="lazy" /><div><p class="project-classification">Accessibility examples</p><h3>Access ramps</h3><button class="action action-purple action-small" type="button" data-project="ramps">View ramp options</button></div></div>
      </div>
    </div></section>

    <section class="transformations block" id="transformations" aria-labelledby="transformations-title"><div class="wrap">
      <div class="section-intro" data-reveal><div><h2 id="transformations-title">Before.<br /><span class="serene">After.</span></h2></div><p>${pageCopy.comparisonIntroduction}</p></div>
      <div class="comparison-grid">${comparisons.map(comparisonPanel).join('')}</div>
    </div></section>

    <section class="portfolio block" id="work" aria-labelledby="work-title"><div class="wrap">
      <div class="section-intro" data-reveal><div><h2 id="work-title">A closer look<br /><span class="serene">at our work.</span></h2></div><p>${pageCopy.portfolioIntroduction}</p></div>
      <div class="collection-tools"><div class="collection-filters" role="group" aria-label="Choose a work category"><button class="selected" type="button" data-category="all" aria-pressed="true">All work</button><button type="button" data-category="outdoor" aria-pressed="false">Outdoor</button><button type="button" data-category="renovation" aria-pressed="false">Renovations</button><button type="button" data-category="building" aria-pressed="false">Building</button><button type="button" data-category="strata" aria-pressed="false">Strata</button></div><span class="collection-result sr-only" aria-live="polite" aria-atomic="true">${collections.length} collections</span></div>
      <div class="work-grid">${collections.map(projectTile).join('')}</div>
    </div></section>

    <section class="strata-feature block" id="strata" aria-labelledby="strata-title"><div class="wrap strata-layout">
      <div class="strata-copy" data-reveal><p class="eyebrow">FOR STRATA MANAGERS &amp; PROPERTY OWNERS</p><h2 id="strata-title">Care for your<br /><span class="serene">shared spaces.</span></h2><p>${pageCopy.strataIntroduction}</p><div class="strata-actions"><a class="action action-gold" href="#contact" data-interest="Strata &amp; Property Maintenance">Discuss strata work</a><button class="action action-outline" type="button" data-project="strata">View strata project</button></div></div>
      <div class="strata-project" data-reveal><div class="strata-main-photo"><img src="${strata.images[3].url}" alt="${html(strata.images[3].alt)}" width="1920" height="1440" loading="lazy" /></div><div class="strata-photo-detail"><img src="${strata.images[2].url}" alt="${html(strata.images[2].alt)}" width="1440" height="1920" loading="lazy" /></div></div>
    </div></section>

    <section class="design-showcase block" id="designs" aria-labelledby="designs-title"><div class="wrap">
      <div class="section-intro" data-reveal><h2 id="designs-title">Home &amp; commercial<br /><span class="serene">design concepts.</span></h2><p>${pageCopy.designsIntroduction}</p></div>
      <div class="design-grid">${designConcepts.map(designCard).join('')}</div>
    </div></section>

    <section class="capabilities block" id="services" aria-labelledby="services-title"><div class="wrap capabilities-grid"><div class="capabilities-intro" data-reveal><h2 id="services-title">Renovations,<br /><span class="serene">inside and out.</span></h2><p>${pageCopy.approach}</p><p>${pageCopy.commitment}</p><p>Based in ${business.location}, we work across ${business.region}.</p><a class="action action-dark" href="#contact">Discuss your project</a></div><div class="service-accordion">${services.map((service, index) => `<details class="service-detail" data-reveal${index === 0 ? ' open' : ''}><summary><h3>${html(service.name)}</h3><span class="detail-sign" aria-hidden="true"></span></summary><div class="service-body"><p>${service.text}</p><a class="action action-outline action-small" href="#contact" data-interest="${html(service.value)}">Enquire about this service</a></div></details>`).join('')}</div></div></section>

    <section class="conversation block" id="contact" aria-labelledby="contact-heading"><div class="wrap conversation-grid"><div class="conversation-intro" data-reveal><h2 id="contact-heading">Tell us about<br /><span>your project.</span></h2><p>${pageCopy.contactIntroduction}</p><a class="phone-display" href="${business.phoneLink}">${business.phone}</a><a class="email-display" href="mailto:${business.email}">${business.email}</a><p class="area-note">${business.location}<br /><span>${business.region}</span></p></div>
      <form class="project-enquiry" data-reveal action="mailto:${business.email}" method="post" enctype="text/plain"><h3>Request a free quote</h3><div class="input-pair"><label>Your name <span aria-hidden="true">*</span><input name="fullName" autocomplete="name" required maxlength="120" placeholder="Full name" /></label><label>Phone <span aria-hidden="true">*</span><input name="telephone" type="tel" autocomplete="tel" required maxlength="40" placeholder="Contact number" /></label></div><label>Email <span aria-hidden="true">*</span><input name="emailAddress" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com" /></label><div class="input-pair"><label>How can we help? <span aria-hidden="true">*</span><select name="interest" required><option value="">Choose a service</option>${services.map((service) => `<option value="${html(service.value)}">${html(service.name)}</option>`).join('')}<option>Other</option></select></label><label>Property suburb<input name="locality" autocomplete="address-level2" maxlength="120" placeholder="Suburb" /></label></div><label>Your project <span aria-hidden="true">*</span><textarea name="description" required rows="3" maxlength="2500" placeholder="Tell us what you’d like to do."></textarea></label><button class="action action-gold enquiry-submit" type="submit">Prepare my enquiry</button><p class="email-explanation">Opens your email app to review and send your enquiry.</p><div class="enquiry-result" hidden><p class="enquiry-status" role="status" aria-live="polite"></p><p>If your email app doesn’t open, copy your details below and email ${business.email}.</p><button class="action action-outline-light action-small copy-draft" type="button">Copy enquiry details</button><label class="draft-label">Your email draft<textarea class="draft-text" rows="6" readonly></textarea></label></div></form>
    </div></section>
  </main>
  <footer class="colophon"><div class="wrap colophon-inner"><span>© ${new Date().getFullYear()} ${business.legalName}</span><span>ABN ${business.abn}</span><a class="action action-outline-light action-small" href="#top">Back to top</a></div></footer>

  <dialog class="viewer" aria-labelledby="viewer-heading"><header class="viewer-header"><div><h2 id="viewer-heading"></h2><p id="viewer-description" hidden></p></div><button class="viewer-close action action-dark action-small" type="button" aria-label="Close photographs">Close</button></header><div class="viewer-stage"><img class="viewer-image" alt="" width="1500" height="1125" /></div><div class="viewer-controls"><button class="viewer-back action action-outline action-small" type="button" aria-label="Previous photograph">Previous</button><p class="viewer-caption" aria-live="polite" aria-atomic="true"></p><button class="viewer-forward action action-outline action-small" type="button" aria-label="Next photograph">Next</button></div><div class="viewer-footer"><div class="viewer-thumbs" aria-label="Select a photograph"></div></div></dialog>
`;
}
