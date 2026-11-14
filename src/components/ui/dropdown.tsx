import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  className?: string;
} & Pick<React.AriaAttributes, "aria-invalid" | "aria-describedby">;

/** Styled drop-down list (replaces the plain browser <select>). Works with mouse, touch and keyboard. */
export function Dropdown({ id, name, value, onChange, options, placeholder = "Choose an option", className, ...aria }: Props) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const root = React.useRef<HTMLDivElement>(null);
  const list = React.useRef<HTMLUListElement>(null);
  const listId = `${id}-list`;

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
    root.current?.querySelector("button")?.focus();
  };

  React.useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent | TouchEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", away);
    document.addEventListener("touchstart", away);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("touchstart", away);
    };
  }, [open]);

  React.useEffect(() => {
    if (open && active >= 0) list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Tab") return setOpen(false);
    if (e.key === "Escape") return setOpen(false);
    if (["ArrowDown", "ArrowUp", "Enter", " ", "Home", "End"].includes(e.key)) e.preventDefault();
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) openList();
      return;
    }
    if (e.key === "ArrowDown") setActive((a) => Math.min(options.length - 1, a + 1));
    else if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(options.length - 1);
    else if ((e.key === "Enter" || e.key === " ") && active >= 0) choose(options[active]);
    else if (e.key.length === 1) {
      const i = options.findIndex((o) => o.toLowerCase().startsWith(e.key.toLowerCase()));
      if (i >= 0) setActive(i);
    }
  }

  return (
    <div ref={root} className={cn("relative", className)}>
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        {...aria}
        className={cn(
          "flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-button border bg-white px-4 text-left text-base transition-colors",
          "focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20",
          "aria-[invalid=true]:border-red-500",
          open ? "border-accent ring-2 ring-accent/20" : "border-input hover:border-accent/50",
        )}
      >
        <span className={cn("truncate", value ? "text-black" : "text-[#9a9a9a]")}>{value || placeholder}</span>
        <HugeiconsIcon icon={ArrowDown01Icon} size={18} className={cn("shrink-0 text-[#555] transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-[280px] overflow-y-auto rounded-2xl border border-black/10 bg-white p-1.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25)]"
          style={{ animation: "dd-in 140ms ease-out" }}
        >
          {options.map((o, i) => {
            const selected = o === value;
            return (
              <li
                key={o}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(o)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-[15px] text-black",
                  i === active && "bg-accent-soft",
                  selected && "font-medium",
                )}
              >
                {o}
                {selected && <HugeiconsIcon icon={Tick02Icon} size={16} className="shrink-0 text-accent" />}
              </li>
            );
          })}
        </ul>
      )}
      <style>{`@keyframes dd-in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){[role=listbox]{animation:none!important}}`}</style>
    </div>
  );
}
