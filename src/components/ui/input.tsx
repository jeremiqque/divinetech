import * as React from "react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-button border border-input bg-white px-4 text-base text-black placeholder:text-[#9a9a9a] transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 aria-[invalid=true]:border-red-500 disabled:opacity-50";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(field, "h-12", className)} {...props} />;
}
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(field, "min-h-[120px] resize-y py-3", className)} {...props} />;
}
function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select className={cn(field, "h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23555%27 stroke-width=%272%27><path d=%27m6 9 6 6 6-6%27/></svg>')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat pr-10", className)} {...props}>
      {children}
    </select>
  );
}
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("text-sm font-medium text-black", className)} {...props} />;
}

export { Input, Textarea, Select, Label };
