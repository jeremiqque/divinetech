/**
 * YOUR PROJECTS — add, edit or remove projects here. No other file needs to change.
 *
 * To add a project, copy one block { ... }, paste it at the end of the list and change the text.
 *   slug      → the web address of the project page (lowercase, dashes, no spaces): /projects/your-slug
 *   service   → which service it belongs to. Use one of the service codes listed below.
 *   image     → main photo, e.g. "/images/projects/my-project.jpg". Leave "" to show a grey box.
 *   gallery   → more photos, e.g. ["/images/projects/a.jpg", "/images/projects/b.jpg"].
 *               Leave as [] to show 4 grey boxes. Save photos in public/images/projects/.
 *   featured  → true shows it on the Home page (the first 4 featured projects are used).
 *
 * Service codes: aluminium-windows, aluminium-doors, glass, aluminium-roofing,
 *                metro-tiles, longspan-roofing, handrails, glass-cubicles
 *
 * Everything below is PLACEHOLDER text until you have real projects.
 */
import { services } from "./site";

export type ServiceSlug = (typeof services)[number]["slug"];

/** The filter tabs on the Projects page. */
export const projectCategories = ["Windows", "Doors", "Glass", "Roofing", "Handrails", "Cubicles"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

/** Which filter tab each service falls under. */
export const serviceCategory: Record<ServiceSlug, ProjectCategory> = {
  "aluminium-windows": "Windows",
  "aluminium-doors": "Doors",
  glass: "Glass",
  "aluminium-roofing": "Roofing",
  "metro-tiles": "Roofing",
  "longspan-roofing": "Roofing",
  handrails: "Handrails",
  "glass-cubicles": "Cubicles",
};

export interface Project {
  slug: string;
  title: string;
  service: ServiceSlug;
  projectType: string;
  location: string;
  /** "The project" paragraph(s) */
  story: string[];
  /** "What we delivered" list */
  delivered: string[];
  image: string;
  gallery: string[];
  featured?: boolean;
}

const placeholderStory = [
  "[Short description of the project: who it was for, what the space needed and what we set out to achieve.]",
  "[Add a second paragraph about the approach, materials or any challenge we solved.]",
];

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project name",
    service: "aluminium-windows",
    projectType: "Residential",
    location: "[Location]",
    story: placeholderStory,
    delivered: ["[Item delivered, e.g. Aluminium sliding windows]", "[Item delivered]", "[Item delivered]"],
    image: "/images/facade-windows.webp",
    gallery: [],
    featured: true,
  },
  {
    slug: "project-two",
    title: "Project name",
    service: "aluminium-roofing",
    projectType: "Commercial",
    location: "[Location]",
    story: placeholderStory,
    delivered: ["[Item delivered]", "[Item delivered]", "[Item delivered]"],
    image: "/images/timber-house-roof.webp",
    gallery: [],
    featured: true,
  },
  {
    slug: "project-three",
    title: "Project name",
    service: "glass",
    projectType: "Residential",
    location: "[Location]",
    story: placeholderStory,
    delivered: ["[Item delivered]", "[Item delivered]", "[Item delivered]"],
    image: "/images/glass-folding-doors.webp",
    gallery: [],
    featured: true,
  },
  {
    slug: "project-four",
    title: "Project name",
    service: "aluminium-doors",
    projectType: "Commercial",
    location: "[Location]",
    story: placeholderStory,
    delivered: ["[Item delivered]", "[Item delivered]", "[Item delivered]"],
    image: "/images/entrance-door.webp",
    gallery: [],
    featured: true,
  },
  {
    slug: "project-five",
    title: "Project name",
    service: "handrails",
    projectType: "Residential",
    location: "[Location]",
    story: placeholderStory,
    delivered: ["[Item delivered]", "[Item delivered]", "[Item delivered]"],
    image: "/images/balcony-railing.webp",
    gallery: [],
  },
  {
    slug: "project-six",
    title: "Project name",
    service: "glass-cubicles",
    projectType: "Residential",
    location: "[Location]",
    story: placeholderStory,
    delivered: ["[Item delivered]", "[Item delivered]", "[Item delivered]"],
    image: "/images/shower-cubicle.webp",
    gallery: [],
  },
  {
    slug: "project-seven",
    title: "Project name",
    service: "longspan-roofing",
    projectType: "Industrial",
    location: "[Location]",
    story: placeholderStory,
    delivered: ["[Item delivered]", "[Item delivered]", "[Item delivered]"],
    image: "/images/curved-glass-roof.webp",
    gallery: [],
  },
  {
    slug: "project-eight",
    title: "Project name",
    service: "metro-tiles",
    projectType: "Residential",
    location: "[Location]",
    story: placeholderStory,
    delivered: ["[Item delivered]", "[Item delivered]", "[Item delivered]"],
    image: "/images/metal-roof.webp",
    gallery: [],
  },
];

export const serviceTitle = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!.title;
export const projectHref = (p: Project) => `/projects/${p.slug}`;
export const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);
