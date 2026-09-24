import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "../components/Animation";
import { SOCIALS } from "../data/portfolio";
import { SITE } from "../data/site";

export function Contact() {
  return (
    <section id="contact" className="contact-section section">
      <div className="contact-orbit" aria-hidden="true" />
      <div className="shell">
        <Reveal>
          <div className="eyebrow">
            <span className="section-number">07</span>YOUR NEXT IDEA STARTS HERE
          </div>
          <h2>
            Let's build
            <br />
            something <span className="gradient-text">great.</span>
          </h2>
          <p>
            Have a project in mind, an opportunity to share, or a question?
            <br className="desktop-break" /> My inbox is always open. Let's
            start a conversation.
          </p>
          <div className="button-row">
            <a
              href="https://wa.me/923086772082?text=Hello.."
              className="button primary"
            >
              Say hello <ArrowUpRight size={18} />
            </a>
            <a className="contact-email" href={`mailto:${SITE.email}`}>
              <Mail size={16} />
              {SITE.email}
            </a>
          </div>
        </Reveal>
        <div className="contact-bottom">
          <span className="mono">
            GOOD CONVERSATIONS. BETTER POSSIBILITIES.
          </span>
          <div className="social-links">
            {SOCIALS.map(({ name, href, icon: Icon }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer">
                <Icon size={16} aria-hidden="true" />
                {name}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
