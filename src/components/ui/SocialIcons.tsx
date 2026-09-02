import type { SVGProps } from "react";

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.55c0-.93.26-1.56 1.6-1.56h1.7V3.14C15.98 3.1 15.06 3 13.98 3c-2.24 0-3.78 1.37-3.78 3.88v2.72H7.44v3.2h2.76V21h3.3Z" />
    </svg>
  );
}

export function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3h3.1l-6.77 7.73L23.2 21h-6.23l-4.88-6.38L6.5 21H3.4l7.24-8.27L2.8 3h6.38l4.4 5.83L18.9 3Zm-1.09 16.17h1.72L7.29 4.73H5.44l12.37 14.44Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
