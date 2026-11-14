import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, Image01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";

type Props = {
  endpoint: string;
  accessKey?: string;
  whatsappNumber: string;
  projectTypes: readonly string[];
  serviceToType: Record<string, string>;
};

type Errors = Partial<Record<"name" | "phone" | "email" | "type" | "location" | "details" | "image", string>>;
const MAX_MB = 5;

export default function QuoteForm({ endpoint, accessKey, whatsappNumber, projectTypes, serviceToType }: Props) {
  const [type, setType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // "Request a Window Quote" on the Services page sends people here with ?service=...
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    if (service && serviceToType[service]) setType(serviceToType[service]);
  }, [serviceToType]);

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!String(data.get("name") || "").trim()) e.name = "Please enter your name.";
    const phone = String(data.get("phone") || "").trim();
    if (phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a phone or WhatsApp number.";
    const email = String(data.get("email") || "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "That email doesn't look right.";
    if (!String(data.get("type") || "")) e.type = "Please choose a project type.";
    if (!String(data.get("details") || "").trim()) e.details = "Please tell us a little about your project.";
    if (file && !file.type.startsWith("image/")) e.image = "Please choose an image file.";
    if (file && file.size > MAX_MB * 1024 * 1024) e.image = `Image is too large (max ${MAX_MB} MB).`;
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    if (data.get("company")) return; // hidden spam trap
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      (ev.currentTarget.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus();
      return;
    }
    if (file) data.set("image", file); else data.delete("image");

    // 1) WhatsApp: opens straight away with everything typed in (done first so the browser allows the new tab).
    const lines = [
      "Hello Divintech, I'd like a quote.",
      `Name: ${data.get("name")}`,
      `Phone/WhatsApp: ${data.get("phone")}`,
      data.get("email") ? `Email: ${data.get("email")}` : "",
      `Project type: ${data.get("type")}`,
      data.get("location") ? `Location: ${data.get("location")}` : "",
      `Details: ${data.get("details")}`,
      file ? "(I have a reference image to send in this chat.)" : "",
    ].filter(Boolean);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");

    // 2) Email: sent to the form service when one is connected (see quoteForm in site.ts).
    if (endpoint) {
      setStatus("sending");
      if (accessKey) data.set("access_key", accessKey);
      data.set("subject", `New quote request: ${data.get("type")}`);
      try {
        const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
        setEmailSent(res.ok);
      } catch {
        setEmailSent(false);
      }
    }
    setStatus("sent");
    formRef.current?.reset();
    setFile(null);
    setType("");
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} role="alert" className="text-sm text-red-600">{errors[k]}</p>
    ) : null;
  const a11y = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-error` : undefined });

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
        <h3 className="font-heading text-3xl text-black">Thank you.</h3>
        <p className="max-w-[420px] text-base text-body">
          {endpoint && emailSent
            ? "We've emailed your request to our team. WhatsApp has also opened with your details ready: press send there to reach us faster."
            : endpoint
              ? "WhatsApp has opened with your details ready: please press send there. (Your email copy couldn't be sent, so WhatsApp is the way to reach us.)"
              : "WhatsApp should have opened with your details ready to send. Press send there and we'll reply as soon as we can."}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-2 text-sm underline underline-offset-4">Send another request</button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <h3 className="font-heading text-[28px] leading-tight text-black md:text-[32px]">Tell us what you're building.</h3>

      {/* hidden spam trap: people never see or fill this */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" placeholder="Your name" {...a11y("name")} />
          {err("name")}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone / WhatsApp</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" {...a11y("phone")} />
          {err("phone")}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email <span className="font-normal text-[#777]">(optional)</span></Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="Your email address" {...a11y("email")} />
          {err("email")}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="type">Project Type</Label>
          <Dropdown id="type" name="type" value={type} onChange={setType} options={projectTypes} placeholder="Choose a project type" {...a11y("type")} />
          {err("type")}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="location">Project Location <span className="font-normal text-[#777]">(optional)</span></Label>
        <Input id="location" name="location" placeholder="Where is the project located?" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="details">Tell us about your project</Label>
        <Textarea id="details" name="details" placeholder="e.g. 6 sliding windows for a 3-bedroom flat, or new roofing for a 200m² hall. Add sizes if you have them." {...a11y("details")} />
        {err("details")}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="image">Upload project image <span className="font-normal text-[#777]">(optional)</span></Label>
        {file ? (
          <div className="flex items-center justify-between gap-3 rounded-button border border-input bg-white px-4 py-3 text-sm">
            <span className="truncate">{file.name}</span>
            <button type="button" aria-label="Remove image" onClick={() => setFile(null)} className="shrink-0 text-black/60 hover:text-black">
              <HugeiconsIcon icon={Cancel01Icon} size={18} />
            </button>
          </div>
        ) : (
          <label htmlFor="image" className="flex cursor-pointer items-center gap-3 rounded-button border border-dashed border-[#c9c9c9] bg-white px-4 py-4 text-sm text-body transition-colors hover:border-black">
            <HugeiconsIcon icon={Image01Icon} size={22} />
            Have a building/reference image? Upload it here.
          </label>
        )}
        <input id="image" name="image" type="file" accept="image/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        {err("image")}
        {!endpoint && file && <p className="text-xs text-[#777]">Images can't go through WhatsApp text, so you'll be asked to send it in the chat.</p>}
      </div>


      <button
        type="submit"
        disabled={status === "sending"}
        className="relative mt-1 inline-flex h-14 w-full items-center justify-center gap-2 rounded-[14px] border-[1.06px] border-dark-top bg-gradient-to-b from-dark-top to-dark-bottom text-base font-medium text-white transition-[filter,transform] hover:brightness-110 active:scale-[0.99] disabled:opacity-60 md:w-fit md:px-8"
      >
        {status === "sending" ? "Sending…" : "Request My Quote"}
        <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
      </button>
      <p className="text-sm text-[#666]">We'll reply on WhatsApp or by phone. Your details are only used to respond to your request.</p>
    </form>
  );
}
