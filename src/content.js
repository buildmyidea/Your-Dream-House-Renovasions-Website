// Business facts, photographs and copy adapted from the client's material.
// The uploaded HTML is a copy reference, not a template or runtime dependency.
export const business = {
  name: 'Your Dream Home Renovations',
  legalName: 'Your Dream Home Renovations Pty Ltd',
  abn: '27 680 849 987',
  phone: '0413 780 709',
  phoneLink: 'tel:+61413780709',
  email: 'infoydhr@gmail.com',
  location: 'Kemps Creek, NSW',
  region: 'Sydney and surrounding regions',
};

export const pageCopy = {
  heroLead: 'Built around',
  heroAccent: 'you.',
  heroDescription: 'From NDIS home modifications to complete renovations, building works, land clearing and fencing, we bring skill and care to every project.',
  comparisonIntroduction: 'From built-in deck seating to refreshed shed exteriors, our improvements make everyday spaces more useful.',
  portfolioIntroduction: 'Renovations, building works and property improvements for homes and commercial properties across Sydney.',
  approach: 'We plan building and renovation solutions around your home, property and lifestyle. Practical needs and the way you want to live guide the work.',
  commitment: 'Whether you need urgent accessibility improvements, a full property transformation or dependable outdoor works, we focus on clear communication, quality workmanship and lasting results.',
  contactIntroduction: 'Tell us about the changes you have in mind, from an urgent accessibility modification to a major renovation or outdoor property works. We’ll help you work through the next step.',
};

const picture = (id, caption, alt) => ({
  url: `/assets/project-${String(id).padStart(2, '0')}.webp`, caption, alt,
});

export const collections = [
  {
    key: 'land', type: 'outdoor', name: 'Land & site preparation',
    summary: 'Clearing, earthworks and prepared grounds.', cover: 4, stage: 'Project stages',
    images: [
      picture(14, 'Existing site', 'Overgrown land and debris beside a waterway'),
      picture(15, 'Clearing in progress', 'An excavator alongside cleared vegetation and site debris'),
      picture(16, 'Earthworks', 'An excavator shaping cleared ground'),
      picture(17, 'Prepared grounds', 'Graded banks and cleared land beside a waterway'),
      picture(18, 'Waterside grounds', 'Open grounds beside trees and a waterway'),
      picture(19, 'Existing vegetation', 'Dense vegetation around an outdoor structure'),
    ],
  },
  {
    key: 'deck', type: 'outdoor', name: 'Outdoor deck transformation',
    summary: 'A timber deck with built-in seating.', cover: 2, stage: 'Before & after',
    images: [
      picture(3, 'Before', 'A small courtyard with artificial grass'),
      picture(4, 'During', 'Timber decking and bench seating under construction'),
      picture(5, 'After', 'Finished stained timber decking with built-in bench seating'),
    ],
  },
  {
    key: 'bathroom', type: 'renovation', name: 'Bathroom renovation',
    summary: 'From strip-out to waterproofing.', cover: 1, stage: 'In progress',
    images: [
      picture(1, 'Strip-out', 'A bathroom with exposed framing and old tiles during strip-out'),
      picture(2, 'Waterproofing', 'Waterproofed bathroom walls and floor with a recessed shower niche'),
    ],
  },
  {
    key: 'rural', type: 'building', name: 'Rural property improvements',
    summary: 'Rural structures and water storage works.', cover: 1, stage: 'On site',
    images: [
      picture(12, 'Existing structure', 'A weathered timber and steel structure beside a shed'),
      picture(13, 'Water storage works', 'The team working on a structure beneath water tanks'),
    ],
  },
  {
    key: 'grounds', type: 'outdoor', name: 'Outdoor property works',
    summary: 'Outdoor property and residential site works.', cover: 0, stage: 'On site',
    images: [
      picture(8, 'Residential site works', 'An excavator working beside a brick home'),
      picture(9, 'Property grounds', 'Grassy grounds viewed from beside a brick building'),
    ],
  },
  {
    key: 'exterior', type: 'building', name: 'Exterior building works',
    summary: 'Exterior building maintenance.', cover: 0, stage: 'Maintenance',
    images: [
      picture(6, 'Building exterior', 'A light-coloured building with a dark roof'),
      picture(7, 'Work in progress', 'A worker carrying out maintenance beside a roof chimney'),
    ],
  },
  {
    key: 'shed', type: 'building', name: 'Property & shed improvements',
    summary: 'A refreshed shed exterior.', cover: 1, stage: 'Before & after',
    images: [
      picture(10, 'Before', 'A weathered corrugated shed exterior'),
      picture(11, 'Updated exterior', 'A refreshed dark corrugated shed with roller doors'),
    ],
  },
];

export const comparisons = [
  {
    projectKey: 'deck', before: 0, after: 2,
    name: 'Outdoor deck transformation',
    description: 'An unused courtyard becomes a timber deck with built-in seating.',
  },
  {
    projectKey: 'shed', before: 0, after: 1,
    name: 'Shed exterior refresh',
    description: 'A weathered shed exterior takes on a fresh, dark finish.',
  },
];

export const vision = {
  key: 'vision', name: 'Tina’s House', summary: 'An illustrated home design concept, shown for inspiration.',
  images: [{ url: '/assets/tinas-house-cover.webp', caption: 'Home design concept', alt: 'Tina’s House concept illustration with a residence, detailed floor plan and landscaped grounds' }],
};

export const services = [
  { name: 'NDIS & accessibility', value: 'NDIS & Accessibility', text: 'We adapt bathrooms, ramps and doorways around individual needs to support safer, more accessible living at home.' },
  { name: 'Major renovations', value: 'Major Renovations', text: 'From kitchens and bathrooms to new internal layouts and full-home transformations, we plan major upgrades around the way you want to live.' },
  { name: 'Building works', value: 'Building Works', text: 'Alterations, additions and structural projects, with coordinated building works for residential and commercial properties.' },
  { name: 'Land clearing', value: 'Land Clearing', text: 'We prepare properties through vegetation clearing and site clean-ups, subject to applicable approvals and site conditions.' },
  { name: 'Fencing & outdoor works', value: 'Fencing & Outdoor Works', text: 'Boundary fencing, gates, decking and practical outdoor improvements that make more of your property.' },
  { name: 'Property improvements', value: 'Property Improvements', text: 'Carefully managed repairs, refurbishments and improvements for homes and commercial spaces.' },
];
