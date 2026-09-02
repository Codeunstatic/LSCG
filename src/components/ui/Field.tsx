import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const controlBase =
  "w-full rounded-md border border-border bg-white px-4 py-3 text-body text-text-primary placeholder:text-text-secondary/70 transition-colors focus:outline-none focus:ring-2 focus:ring-lagos-blue/40 focus:border-lagos-blue";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { className, ...rest } = props;
  return (
    <label
      className={cn(
        "mb-2 block text-small font-medium text-deep-navy",
        className,
      )}
      {...rest}
    />
  );
}

export function FieldGroup({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-error"> *</span>}
      </Label>
      {children}
      {hint && <p className="mt-1.5 text-small text-text-secondary">{hint}</p>}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return <input className={cn(controlBase, className)} {...rest} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return (
    <textarea className={cn(controlBase, "min-h-32 resize-y", className)} {...rest} />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, children, ...rest } = props;
  return (
    <div className="relative">
      <select
        className={cn(controlBase, "appearance-none pr-10", className)}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
        size={18}
      />
    </div>
  );
}
