import { Phone, MessageCircle } from "lucide-react";

export function UtilityBar() {
  return (
    <div className="bg-lagos-blue text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 overflow-x-auto px-4 py-2.5 text-caption uppercase sm:px-6 lg:px-8">
        <span className="flex items-center gap-1.5 whitespace-nowrap font-semibold text-white">
          <Phone size={12} />
          Emergency: 112 / 767
        </span>
        <span className="hidden items-center gap-1.5 whitespace-nowrap border-l border-white/20 pl-4 text-white sm:flex">
          Non-emergency: +234-800-002-4842
        </span>
        <a
          href="https://wa.me/2348000024842"
          className="hidden items-center gap-1.5 whitespace-nowrap border-l border-white/20 pl-4 text-white/70 hover:text-white sm:flex"
        >
          <MessageCircle size={12} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
