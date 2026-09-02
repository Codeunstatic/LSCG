import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { NewsletterSignup } from "./NewsletterSignup";

const columns = [
  {
    heading: "Services",
    links: ["Report an issue", "Track a complaint", "LASRRA", "LASHMA", "Land services"],
  },
  {
    heading: "Information",
    links: ["Government services", "Consultations", "Resources", "News"],
  },
  {
    heading: "About",
    links: ["About Citizens Gate", "About Lagos State Government", "Team"],
  },
  {
    heading: "Legal",
    links: ["Privacy policy", "Terms of use"],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-deep-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/brand/citizens-gate-mark.png"
                alt="Citizens Gate"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-body font-bold">Citizens Gate</span>
            </div>
            <p className="mt-4 max-w-xs text-small text-white/60">
              A Lagos State Government platform connecting residents with
              government through complaints, enquiries and civic services.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-small font-semibold text-white">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-small text-white/60 hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          id="contact"
          className="mt-12 grid grid-cols-1 gap-10 border-t border-white/10 pt-10 lg:grid-cols-2"
        >
          <div>
            <p className="text-small font-semibold text-white">Contact us</p>
            <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 text-small text-white/70 sm:grid-cols-2">
              <p className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-warm-yellow" />
                Emergency: 112 / 767
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" />
                Non-emergency: +234-800-002-4842
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="shrink-0" />
                infocg@lagosstate.gov.ng
              </p>
              <p className="flex items-start gap-2 sm:col-span-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>
                  Office of Political, Legislative and Civic Engagement,
                  Block 23, 2nd &amp; 3rd Floors, The Secretariat, Alausa,
                  Ikeja, Lagos State
                </span>
              </p>
            </div>
          </div>

          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <p className="text-small font-semibold text-white">
              Subscribe to our e-Magazine
            </p>
            <p className="mt-2 text-small text-white/60">
              Get monthly updates from Lagos State Government in your inbox.
            </p>
            <div className="mt-4">
              <NewsletterSignup />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-caption text-white/50">
            &copy; {new Date().getFullYear()} Lagos State Government. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-white/60">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FacebookIcon width={16} height={16} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <TwitterIcon width={16} height={16} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <InstagramIcon width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
