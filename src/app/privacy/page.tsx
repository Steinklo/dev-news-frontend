import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — DevNews",
  description: "How DevNews handles data and privacy.",
};

const LAST_UPDATED = "June 2026";
const CONTACT_EMAIL = "privacy@dev-news.dev";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-[#e8eaed]">{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-[#e8eaed]">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-[#5a6070]">Last updated: {LAST_UPDATED}</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[#b4b9c6]">
        <p>
          DevNews (
          <Link
            href="/"
            className="text-indigo-400 transition-colors hover:text-indigo-300"
          >
            dev-news.dev
          </Link>
          ) is an AI-curated developer-news reader. This policy explains what
          data the service does and does not handle.
        </p>

        <Section title="Information we collect">
          <p>
            DevNews has no user accounts and does not ask you for personal
            information. We do not use advertising or cross-site tracking
            cookies. Our hosting provider may retain standard server logs (such
            as IP address and request metadata) for security and operational
            purposes.
          </p>
        </Section>

        <Section title="How the site works">
          <p>
            The site displays publicly available developer news that has been
            summarized and categorized by AI. All content is fetched at runtime
            from the DevNews backend API. There is no user-generated content,
            and nothing you submit is stored.
          </p>
        </Section>

        <Section title="Third-party services">
          <p>
            DevNews is hosted on Microsoft Azure. We may publish our own curated
            content to our own channels on platforms such as LinkedIn and
            YouTube. We do not access, collect, or store data from your accounts
            on those platforms.
          </p>
        </Section>

        <Section title="Data sharing">
          <p>
            We do not sell or rent personal data, and we do not share personal
            data with third parties except as required to operate the service
            (for example, hosting) or to comply with the law.
          </p>
        </Section>

        <Section title="Children">
          <p>
            DevNews is intended for a professional, general audience and is not
            directed at children under 13.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this policy from time to time. Material changes will
            be reflected by the &ldquo;last updated&rdquo; date above.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy? Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-indigo-400 transition-colors hover:text-indigo-300"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
