import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MinimalHeader() {
  return (
    <header className="border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative h-9 w-[108px] shrink-0 overflow-hidden">
          <Image
            src="/images/brand/citizens-gate-logo.png"
            alt="Citizens Gate"
            fill
            sizes="108px"
            className="object-cover object-top"
            priority
          />
        </Link>
        <LanguageSwitcher className="text-text-secondary hover:text-lagos-blue" />
      </div>
    </header>
  );
}
