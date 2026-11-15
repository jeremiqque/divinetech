# Divintech Aluminium website

Marketing website for Divintech Aluminium: aluminium windows and doors, glass, roofing, metro tiles, longspan roofing, handrails and glass cubicles.

**Built with:** Astro, React (for the menu and forms), Tailwind CSS 4, shadcn-style components, Hugeicons.
**Fonts:** Clash Grotesk (headings) and General Sans (body), downloaded from Fontshare.

## Pages

| Page | Address | File |
| --- | --- | --- |
| Home | `/` | `src/pages/index.astro` |
| Services | `/services` | `src/pages/services.astro` |
| About | `/about` | `src/pages/about.astro` |
| Projects | `/projects` | `src/pages/projects/index.astro` |
| One project | `/projects/<name>` | `src/pages/projects/[slug].astro` |
| Contact and quote form | `/contact` | `src/pages/contact.astro` |
| Not found (404) | any broken link | `src/pages/404.astro` |

## Run it on your computer

1. Install Node.js (the LTS version) from nodejs.org, then run `npm install -g pnpm`.
2. Open this folder in a terminal and run `pnpm install` (once, and again after packages change).
3. Run `pnpm dev` and open the address it prints (usually http://localhost:4321).

It needs internet the first time so the fonts can be downloaded.

| Command | What it does |
| --- | --- |
| `pnpm dev` | Starts the site for editing. Changes show as you save. |
| `pnpm build` | Makes the finished site in the `dist` folder. |
| `pnpm preview` | Shows the finished site from `dist` before you publish it. |

## Where to change things

You never need to touch page code to change wording, numbers or photos.

**`src/config/site.ts`** holds almost everything:
- Business name, tagline, phone number and WhatsApp number (`contact`).
- Navigation, footer links and footer wording.
- Services text, Why Divintech cards, Process steps, About beliefs.
- Testimonials (currently made-up examples).
- Which photo goes where (`homeImages`, `aboutImages`, `serviceDetails`).
- Where quote requests go (`quoteForm`, see below).

**`src/config/projects.ts`** holds the projects list: title, service, location, story, photos. Add a block to add a project.

**`src/styles/global.css`** holds the colours and look. The accent colour (copper `#B8794A`) is the single `--accent` value near the top. Change it and every accent on the site follows.

**Headings:** put stars around words to show them in the accent colour, for example `"Solutions designed around *your space.*"`.

## Photos

Put photos in `public/images/` and refer to them as `/images/name.webp`. Use `.webp` or `.jpg`, around 1600 pixels wide, and under about 300 KB each. Big files make the site slow. A picture slot left as `""` shows a grey box.

## Quote requests

Every request from the Contact page opens WhatsApp with the details already typed in, sent to the number in `site.ts`.

To also receive each request by email, create a free form at Formspree or Web3Forms, then paste the details into `quoteForm` in `site.ts`:
- Formspree: set `endpoint` to your form link, leave `accessKey` empty.
- Web3Forms: set `endpoint` to `https://api.web3forms.com/submit` and paste your key in `accessKey`.

Leave `endpoint` empty to use WhatsApp only.

## Still to replace before launch

- **Logo:** done. `public/logo.png` (icon, navbar and browser tab) and `public/logo-wide.png` (with name, footer). To change, replace those files or update `logo` in `site.ts`.
- **Address and email:** add them to `contact` in `site.ts` (the address shows on the Contact page).
- **TikTok link:** set `social.tiktok` in `site.ts`. Use `""` to hide the icon.
- **Testimonials:** the ones in `site.ts` are fictional. Replace them with real client quotes.
- **Projects:** replace the sample projects and photos in `projects.ts`.
- **Real facts for trust:** years in business, number of projects, warranty and areas served, if you want to show them.

## Folder map

```
src/
  pages/        the pages listed above
  components/   reusable parts (navbar, footer, cards, forms)
    illustrations/   the drawings (footer scene, process steps, 404, About cards)
    ui/              form fields and the dropdown
  config/       site.ts and projects.ts (the content)
  layouts/      BaseLayout.astro (page frame, page descriptions, fade-ins)
  scripts/      smooth-scroll.ts (eased scrolling)
  lib/          small helpers
  styles/       global.css (colours, fonts, animations)
public/
  images/       photos, and peeps/ for the footer characters
```

## Notes

- Animations switch off automatically for visitors who set their device to reduce motion.
- The people in the footer scene are from Open Peeps (CC0, free to use).
- Phone and WhatsApp buttons are in the hero, process section, final banner and footer. There is no floating contact bar.
