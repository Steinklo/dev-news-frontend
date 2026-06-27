// src/components/SocialLinks.tsx

import { Youtube, Linkedin, type LucideIcon } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/social";
import { cn } from "@/lib/utils";

// Bluesky isn't in lucide-react; inline the butterfly mark.
function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 568 501"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M123.121 33.664C188.241 82.553 258.281 181.681 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.946c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748 114.875 19.555 144.097 84.311 80.986 149.067-119.86 122.807-172.272-30.864-185.702-70.244-2.462-7.22-3.614-10.6-3.631-7.727-.017-2.873-1.169.507-3.631 7.727-13.43 39.38-65.842 193.051-185.702 70.244-63.111-64.756-33.889-129.512 80.986-149.067-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.292 0 57.946 0-28.906 76.134-1.611 123.121 33.664Z" />
    </svg>
  );
}

interface SocialItem {
  name: string;
  href: string;
  Icon: LucideIcon | typeof BlueskyIcon;
}

const items: SocialItem[] = [
  { name: "Bluesky", href: SOCIAL_LINKS.bluesky, Icon: BlueskyIcon },
  { name: "YouTube", href: SOCIAL_LINKS.youtube, Icon: Youtube },
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin, Icon: Linkedin },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {items.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          title={name}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9ba1b0] transition-all hover:bg-[#1a1d28] hover:text-[#e8eaed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
        >
          <Icon className="h-[15px] w-[15px]" />
        </a>
      ))}
    </div>
  );
}
