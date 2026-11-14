/**
 * Gentle, eased mouse-wheel scrolling and smooth jumps to #sections.
 * Only for devices with a mouse/trackpad; phones keep their natural scrolling.
 * Switched off for visitors who ask their device to reduce motion.
 */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(pointer: fine)").matches;

if (!reduce && fine) {
  const root = document.documentElement;
  root.style.scrollBehavior = "auto";

  let target = scrollY;
  let current = scrollY;
  let running = false;

  const max = () => root.scrollHeight - innerHeight;
  const clamp = (v: number) => Math.max(0, Math.min(max(), v));

  const tick = () => {
    current += (target - current) * 0.11;
    if (Math.abs(target - current) < 0.4) {
      current = target;
      running = false;
    }
    scrollTo(0, current);
    if (running) requestAnimationFrame(tick);
  };
  const start = () => {
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  };

  // Don't hijack scrolling inside lists/boxes that scroll on their own (e.g. the dropdown).
  const scrollsInside = (el: EventTarget | null, dy: number) => {
    let node = el as HTMLElement | null;
    while (node && node !== document.body && node !== root) {
      const oy = getComputedStyle(node).overflowY;
      if ((oy === "auto" || oy === "scroll") && node.scrollHeight > node.clientHeight) {
        const atTop = node.scrollTop <= 0 && dy < 0;
        const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1 && dy > 0;
        if (!atTop && !atBottom) return true;
      }
      node = node.parentElement;
    }
    return false;
  };

  addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey || e.defaultPrevented || scrollsInside(e.target, e.deltaY)) return;
      e.preventDefault();
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 32;
      else if (e.deltaMode === 2) dy *= innerHeight;
      if (!running) {
        current = scrollY;
        target = scrollY;
      }
      target = clamp(target + dy);
      start();
    },
    { passive: false },
  );

  // Keyboard, scrollbar drag and anything else: stay in sync.
  addEventListener(
    "scroll",
    () => {
      if (!running) current = target = scrollY;
    },
    { passive: true },
  );

  // Smooth jump when clicking a link to a section on the same page.
  document.addEventListener("click", (e) => {
    const a = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null;
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname !== location.pathname || !u.hash) return;
    const el = document.getElementById(decodeURIComponent(u.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    current = scrollY;
    target = clamp(el.getBoundingClientRect().top + scrollY - 24);
    start();
    history.pushState(null, "", u.hash);
  });
}
