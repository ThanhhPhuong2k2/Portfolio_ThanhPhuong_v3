import { socials, ui, type Locale, type SocialLink } from "@/content/site";
import { t } from "@/lib/i18n";
import { CopyEmailButton } from "./CopyEmailButton";

interface ContactChannelsProps {
  locale: Locale;
}

/** Each channel's real mark (taste-skill house rule 7), drawn on a light tile like the page's other marks. */
const MARKS: Readonly<Record<SocialLink["id"], string>> = {
  email: "/assets/icons/gmail.svg",
  linkedin: "/assets/icons/linkedin.svg",
  github: "/assets/icons/github.svg",
};

/**
 * The three ways to reach the owner (email, LinkedIn, GitHub) as one row of slim kit cards (owner's
 * choice: one line each, so the close and the footer keep one screen): the real mark, the old site's
 * word for the channel (Giao tiếp, Mạng lưới, Kho lưu trữ) over its address, then an arrow (or, on
 * the email card, the copy button). The whole card is the link (its ::after covers the card); the
 * copy button is laid over the link rather than inside it (a button inside a link is invalid HTML).
 * A channel missing from the data is not drawn; with none the row is not drawn.
 */
export function ContactChannels({ locale }: ContactChannelsProps) {
  if (socials.length === 0) return null;

  return (
    <ul className="contact__channels">
      {socials.map((channel) => (
        <Channel key={channel.id} channel={channel} locale={locale} />
      ))}
    </ul>
  );
}

/** An address that may break before its "@" on a narrow screen, never inside a word. */
function EmailAddress({ address }: { address: string }) {
  const at = address.indexOf("@");
  if (at <= 0) return <>{address}</>;
  return (
    <>
      {address.slice(0, at)}
      <wbr />
      {address.slice(at)}
    </>
  );
}

function Channel({ channel, locale }: { channel: SocialLink; locale: Locale }) {
  const external = channel.id !== "email";
  const email = channel.id === "email" ? channel.href.replace(/^mailto:/, "") : null;

  return (
    <li className="card contact__card" data-channel={channel.id}>
      <span className="contact__mark" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny logo files, no resizing to do */}
        <img src={MARKS[channel.id]} alt="" width={20} height={20} loading="lazy" decoding="async" />
      </span>
      <div className="contact__text">
        <h3 className="contact__label">{t(channel.label, locale)}</h3>
        <a
          className="contact__link"
          href={channel.href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {email ? <EmailAddress address={channel.value} /> : channel.value}
        </a>
      </div>
      {email ? (
        <CopyEmailButton
          email={email}
          label={t(ui.copyEmail, locale)}
          copiedLabel={t(ui.copied, locale)}
          failedLabel={t(ui.copyFailed, locale)}
        />
      ) : (
        <svg className="contact__arrow" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 9 9 3M4.5 3H9v4.5" />
        </svg>
      )}
    </li>
  );
}
