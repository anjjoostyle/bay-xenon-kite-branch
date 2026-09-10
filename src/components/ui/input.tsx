import * as React from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "flex h-11 w-full rounded-md border border-input bg-card px-3 text-base text-foreground shadow-none transition-colors duration-150 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} className={cn(fieldClass, className)} {...props} />;
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        fieldClass,
        "h-auto min-h-24 py-2.5 leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

function NativeSelect({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select className={cn(fieldClass, "pr-8", className)} {...props}>
      {children}
    </select>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

export { Input, Textarea, NativeSelect, Field, fieldClass };
