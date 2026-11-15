/**
 * ONE PLACE FOR SITE DETAILS
 * Anything marked PLACEHOLDER is temporary. Replace it here and the whole
 * website updates (navbar, footer, buttons, contact page).
 */

export const site = {
  name: "Divintech Aluminium",
  shortName: "Divintech",
  tagline:
    "Premium aluminium, glass and roofing solutions crafted for modern homes, businesses and architectural spaces.",

  // Icon (navbar, browser tab) and full logo with name (footer, on dark). Files live in /public/.
  logo: { src: "/logo.png", wide: "/logo-wide.png", alt: "Divintech Aluminium logo" },

  // PLACEHOLDER: replace with real contact details
  contact: {
    phone: "+234 803 617 8742",
    phoneLocal: "0803 617 8742", // shown on buttons
    whatsappNumber: "2348036178742", // digits only, with country code
    address: "[Business address will go here]",
  },

  social: {
    // PLACEHOLDER: "#" for now. Paste the real TikTok page link between the quotes (or "" to hide the icon).
    tiktok: "#",
  },
} as const;

export const whatsappLink = (message = "Hello Divintech, I'd like a quote for my project.") =>
  `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export const quoteCta = { label: "Request a Quote", href: "/contact#quote" };

export const services = [
  {
    slug: "aluminium-windows",
    title: "Aluminium Windows",
    summary:
      "Modern aluminium window systems designed to bring natural light, ventilation and a clean architectural finish to your space.",
  },
  {
    slug: "aluminium-doors",
    title: "Aluminium Doors",
    summary:
      "Strong, stylish aluminium doors designed for security, durability and a modern entrance.",
  },
  {
    slug: "glass",
    title: "Glass Solutions",
    summary:
      "Custom glass installations that create open, bright and contemporary spaces.",
  },
  {
    slug: "aluminium-roofing",
    title: "Aluminium Roofing",
    summary:
      "Reliable roofing solutions combining protection, durability and a refined finish.",
  },
  {
    slug: "metro-tiles",
    title: "Metro Tiles",
    summary:
      "Modern roofing systems designed to give your building a distinctive, finished appearance.",
  },
  {
    slug: "longspan-roofing",
    title: "Longspan Roofing",
    summary:
      "Practical and durable longspan roofing solutions for residential and commercial projects.",
  },
  {
    slug: "handrails",
    title: "Handrails",
    summary:
      "Functional architectural handrails designed to complement your building's structure and style.",
  },
  {
    slug: "glass-cubicles",
    title: "Glass Cubicles",
    summary:
      "Clean, modern glass cubicle solutions for bathrooms and other interior spaces.",
  },
] as const;

/** Footer: replaces the template text (Loopinc / SAP / Open-Source) with Divintech wording. */
export const footer = {
  blurb:
    "Quality aluminium, glass and roofing solutions for modern residential and commercial spaces. Precise installation, beautiful results.",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Aluminium Windows", href: "/services#aluminium-windows" },
        { label: "Aluminium Doors", href: "/services#aluminium-doors" },
        { label: "Glass Solutions", href: "/services#glass" },
        { label: "Roofing", href: "/services#aluminium-roofing" },
        { label: "Handrails & Cubicles", href: "/services#handrails" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
        { label: "Request a Quote", href: "/contact#quote" },
      ],
    },
    {
      title: "Get in touch",
      links: [
        { label: "Chat on WhatsApp", href: "whatsapp" },
        { label: `Call ${site.contact.phoneLocal}`, href: "tel" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Divintech Aluminium. All rights reserved.`,
} as const;

/** PLACEHOLDER testimonials, fake for now. Replace with real client quotes later. */
export const testimonialsHeading = {
  label: "Testimonials", // PLACEHOLDER heading (the Figma heading was copied from the Projects section)
  title: "What our *clients say.*",
  sub: "A few words from people we've worked with.",
};
export const testimonials = [
  { name: "Chinedu Eze", role: "Homeowner", quote: "The windows transformed the whole house. Clean finish and a very tidy installation." },
  { name: "Aisha Bello", role: "Property Developer", quote: "Precise measurements and on-time delivery. Exactly what we needed for our project." },
  { name: "Emeka Obi", role: "Business Owner", quote: "From quote to installation, the process was simple and professional." },
  { name: "Amara Okafor", role: "Architect", quote: "Their glass and aluminium detailing is spot on. Every frame lined up exactly as we drew it." },
  { name: "Oluwaseun Adeleke", role: "Site Contractor", quote: "The roofing crew finished ahead of schedule and left the site spotless. Easy to work with." },
  { name: "Ngozi Umeh", role: "Restaurant Owner", quote: "Our new glass doors let in so much light. Customers comment on them every single week." },
  { name: "Tunde Bakare", role: "Facility Manager", quote: "Handrails installed across three floors with zero disruption to the office. Very impressed." },
  { name: "Folake Williams", role: "Homeowner", quote: "The glass cubicle in our bathroom looks like something from a magazine. Worth every penny." },
  { name: "Ibrahim Musa", role: "Interior Designer", quote: "Finally, a supplier who understands finishes. The aluminium work was crisp, modern and durable." },
  { name: "Ifeoma Nwosu", role: "Estate Developer", quote: "We used Divintech for every unit in the estate. Consistent quality from the first to the last." },
  { name: "Peter Adeyemi", role: "School Administrator", quote: "Longspan roofing over our new hall was fast and solid. It has held up through every storm." },
  { name: "Halima Yusuf", role: "Boutique Owner", quote: "From the first measurement to the final polish, the team was careful, friendly and precise." },
] as const;

/** "Why Divintech" section (copy from the written brief; no Figma design yet) */
export const whyDivintech = [
  { icon: "award", title: "Quality workmanship", text: "Every installation is approached with precision and attention to detail." },
  { icon: "paint", title: "Modern finishes", text: "We create clean, contemporary solutions that complement your architecture." },
  { icon: "shield", title: "Built for durability", text: "Our solutions are selected and installed with long-term performance in mind." },
  { icon: "ruler", title: "Tailored solutions", text: "Every building is different. We adapt our work to your space, requirements and vision." },
] as const;

/** Process section (copy from the written brief; no Figma design yet) */
export const process = [
  { title: "Tell us what you need", text: "Share your project requirements, ideas and preferred design." },
  { title: "Assess & Measure", text: "We understand your space and determine the right solution for the project." },
  { title: "Recommend & Quote", text: "We recommend the appropriate materials and solution, then provide your quotation." },
  { title: "Installation", text: "Our team brings the project to life with careful installation and attention to detail." },
] as const;

/** PLACEHOLDER projects shown on Home. Replace with real projects and photos later. */
/** Home section images. PLACEHOLDER: leave "" to show a grey box, or set a path like "/images/hero.jpg". */
export const homeImages = {
  hero: "/images/house-pool.webp",
  intro: ["/images/glass-folding-doors.webp", "/images/glass-staircase.webp", "/images/glass-atrium.webp"],
} as const;

/** Services page: card text (from Figma) and the individual service sections (from the written brief). */
export const serviceDetails: Record<
  (typeof services)[number]["slug"],
  { headline: string; body: string[]; ideal?: string[]; cta: string; image: string }
> = {
  "aluminium-windows": {
    headline: "Bring more light into your architecture.",
    body: [
      "Our aluminium window solutions combine clean aesthetics, durability and functionality to create comfortable, modern spaces.",
    ],
    ideal: ["Residential buildings", "Offices", "Commercial spaces", "Renovations", "New developments"],
    cta: "Request a Window Quote",
    image: "/images/facade-windows.webp",
  },
  "aluminium-doors": {
    headline: "Make the entrance count.",
    body: [
      "Create a strong first impression with aluminium doors designed for modern buildings.",
      "Our door solutions balance appearance, durability and everyday functionality.",
    ],
    cta: "Request a Door Quote",
    image: "/images/entrance-door.webp",
  },
  glass: {
    headline: "More light. More openness. More possibilities.",
    body: [
      "Glass can completely change how a space feels.",
      "We provide glass solutions designed to create bright, open and contemporary environments while maintaining functionality and a refined finish.",
    ],
    cta: "Request a Glass Quote",
    image: "/images/glass-folding-doors.webp",
  },
  "aluminium-roofing": {
    headline: "Protection with a modern finish.",
    body: [
      "Our aluminium roofing solutions provide a durable roofing option while giving your building a clean, contemporary appearance.",
    ],
    cta: "Request a Roofing Quote",
    image: "/images/timber-house-roof.webp",
  },
  "metro-tiles": {
    headline: "A distinctive finish for your roof.",
    body: [
      "Metro tile roofing combines protection with a more refined architectural appearance.",
      "Suitable for projects where the roof is an important part of the building's overall character.",
    ],
    cta: "Request a Metro Tile Quote",
    image: "/images/metal-roof.webp",
  },
  "longspan-roofing": {
    headline: "Practical roofing. Built for performance.",
    body: [
      "Longspan roofing provides a practical solution for residential, commercial and other building projects.",
    ],
    cta: "Request a Longspan Quote",
    image: "/images/curved-glass-roof.webp",
  },
  handrails: {
    headline: "The detail that completes the structure.",
    body: [
      "Our handrail solutions combine safety, functionality and clean architectural detailing.",
    ],
    cta: "Request a Handrail Quote",
    image: "/images/balcony-railing.webp",
  },
  "glass-cubicles": {
    headline: "Clean lines for modern bathrooms.",
    body: [
      "Create a more refined bathroom experience with custom glass cubicle solutions designed around your available space.",
    ],
    cta: "Request a Cubicle Quote",
    image: "/images/shower-cubicle.webp",
  },
};

/** About page */
export const beliefs = [
  { key: "quality", title: "Quality", text: "We believe good results start with quality materials and careful workmanship.", cta: { label: "Our services", href: "/services" } },
  { key: "precision", title: "Precision", text: "Measurements, fittings and finishing details matter. We pay attention to the small things that make a big difference.", cta: { label: "How we work", href: "/#process" } },
  { key: "design", title: "Design", text: "Practical doesn't have to mean ordinary. We create solutions that perform while contributing to the overall look of your space.", cta: { label: "See our projects", href: "/projects" } },
] as const;

export const capabilities = [
  { label: "Aluminium windows", slug: "aluminium-windows", image: "/images/facade-windows.webp" },
  { label: "Aluminium doors", slug: "aluminium-doors", image: "/images/entrance-door.webp" },
  { label: "Glass installations", slug: "glass", image: "/images/glass-folding-doors.webp" },
  { label: "Aluminium roofing", slug: "aluminium-roofing", image: "/images/timber-house-roof.webp" },
  { label: "Metro tiles", slug: "metro-tiles", image: "/images/metal-roof.webp" },
  { label: "Longspan roofing", slug: "longspan-roofing", image: "/images/curved-glass-roof.webp" },
  { label: "Handrails", slug: "handrails", image: "/images/balcony-railing.webp" },
  { label: "Glass cubicles", slug: "glass-cubicles", image: "/images/shower-cubicle.webp" },
] as const;

/** About page pictures. PLACEHOLDER: leave "" for a grey box, or set a path like "/images/about.jpg". */
export const aboutImages = { hero: "/images/facade-windows.webp", statement: "/images/glass-atrium.webp" } as const;

/** Contact page / quote form */
export const quoteForm = {
  /**
   * WHERE QUOTE REQUESTS GO.
   * Every request ALWAYS opens WhatsApp (to +234 803 617 8742) with the details typed in.
   * To ALSO get each request by email, paste the link your form service gives you below:
   *   - Formspree: endpoint "https://formspree.io/f/xxxxxxx" (leave accessKey "")
   *   - Web3Forms: endpoint "https://api.web3forms.com/submit" and paste your key in accessKey
   * Leave endpoint "" to send by WhatsApp only.
   */
  endpoint: "",
  accessKey: "",
};

export const projectTypes = [
  "Aluminium Windows", "Aluminium Doors", "Glass", "Roofing", "Metro Tiles",
  "Longspan", "Handrails", "Glass Cubicle", "Other",
] as const;

/** Lets "Request a ... Quote" buttons on the Services page pre-select the project type. */
export const serviceToProjectType: Record<string, (typeof projectTypes)[number]> = {
  "aluminium-windows": "Aluminium Windows",
  "aluminium-doors": "Aluminium Doors",
  glass: "Glass",
  "aluminium-roofing": "Roofing",
  "metro-tiles": "Metro Tiles",
  "longspan-roofing": "Longspan",
  handrails: "Handrails",
  "glass-cubicles": "Glass Cubicle",
};
