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
  heroDescription: 'Make more of the home you have. We carry out renovations, NDIS home modifications and outdoor building works across Sydney, with clear communication from the first conversation.',
  comparisonIntroduction: 'See how we turned a small courtyard into a deck with built-in seating and gave a weathered shed a fresh exterior.',
  portfolioIntroduction: 'Take a closer look at our work, from bathroom renovations and timber decks to shed improvements and land clearing.',
  approach: 'It might be a bathroom that no longer suits you, a home that needs more room or a yard you’d like to use more. We’ll talk through what you need and help you decide where to start.',
  commitment: 'You can expect clear communication and quality workmanship, whether we’re making one room easier to use or taking on a larger renovation.',
  contactIntroduction: 'Tell us what you’d like to change and where your property is. We’ll get in touch to discuss the work and arrange a free quote.',
  accessibilityIntroduction: 'Your home should be comfortable to move around in. We modify bathrooms, doorways and access points to help make everyday tasks safer and easier.',
  accessibilityDetail: 'Every person uses their home differently. We’ll listen to what’s difficult now and talk through the changes that could help.',
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
  { name: 'NDIS & accessibility', value: 'NDIS & Accessibility', text: 'Changes to a bathroom, ramp or doorway can make a difference to daily life. We work through your access needs with you and plan the modifications around how you use your home.' },
  { name: 'Major renovations', value: 'Major Renovations', text: 'Update a kitchen or bathroom, change your internal layout or renovate the whole home. We’ll help you work through the scope so the finished space suits the way you live.' },
  { name: 'Building works', value: 'Building Works', text: 'We carry out alterations, additions and structural building works for homes and commercial properties. Talk to us about the space you need and the building you have.' },
  { name: 'Land clearing', value: 'Land Clearing', text: 'We prepare properties through vegetation clearing and site clean-ups, subject to applicable approvals and site conditions.' },
  { name: 'Fencing & outdoor works', value: 'Fencing & Outdoor Works', text: 'Give your boundary a new fence, replace a gate or turn an unused corner into a deck. We build outdoor spaces you can enjoy and use every day.' },
  { name: 'Property improvements', value: 'Property Improvements', text: 'We repair and refurbish homes and commercial spaces, including sheds and building exteriors. Let us know what needs attention and we’ll discuss the work with you.' },
];
