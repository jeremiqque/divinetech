import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

type Item = { label: string; href: string };

/** Phone-size menu: a button that opens a full-width panel with the page links. */
export default function MobileMenu({ items, current, cta }: { items: Item[]; current: string; cta: Item }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent | TouchEvent) => {
      if (!(e.target as HTMLElement).closest("[data-mobile-menu]")) setOpen(false);
    };
    document.addEventListener("mousedown", away);
    document.addEventListener("touchstart", away);
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("touchstart", away); };
  }, [open]);

  return (
    <div className="lg:hidden" data-mobile-menu>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex size-14 items-center justify-center rounded-nav bg-white text-black"
      >
        <HugeiconsIcon icon={open ? Cancel01Icon : Menu01Icon} size={24} />
      </button>

      {open && (
        <div id="mobile-menu-panel" className="menu-in absolute inset-x-5 top-[calc(100%+8px)] z-50 rounded-[20px] bg-white p-3 shadow-xl md:inset-x-8">
          <nav className="flex flex-col">
            {items.map((item) => {
              const active = current === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-button px-4 py-4 text-base text-black ${active ? "bg-line font-medium" : ""}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <a
            href={cta.href}
            onClick={() => setOpen(false)}
            className="mt-2 flex h-14 items-center justify-center rounded-[14px] bg-gradient-to-b from-dark-top to-dark-bottom text-[15px] text-white"
          >
            {cta.label}
          </a>
        </div>
      )}
    </div>
  );
}
