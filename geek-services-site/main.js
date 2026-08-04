const CONTACT_EMAIL = "leonardo@geekservicesny.com";

const contactForm = document.querySelector("#contact-form");
const emailLink = document.querySelector("#contact-email-link");
const formNote = document.querySelector("#form-note");
const siteHeader = document.querySelector(".site-header");

const updateHeaderState = () => {
  if (siteHeader) {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 16);
  }
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const revealTargets = document.querySelectorAll(
  ".section-heading, .signal-card, .metric-card, .starter-pack-card, .process-list li, .insight-preview-card, .reason-card, .booking-card, .contact-form, .founder-banner, .project-card, .skill-group, .featured-insight, .insight-card, .article-content, .article-cta"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  revealTargets.forEach((target) => {
    target.classList.add("reveal-ready");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

if (emailLink) {
  emailLink.textContent = CONTACT_EMAIL;
  emailLink.setAttribute("href", `mailto:${CONTACT_EMAIL}`);
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const business = String(formData.get("business") || "").trim();
    const interest = String(formData.get("interest") || "").trim();
    const biggestIssue = String(formData.get("biggest_issue") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent("New Business Inquiry - Geek Services");

    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business: ${business || "Not provided"}`,
        `Interest: ${interest || "Not provided"}`,
        `Biggest issue right now: ${biggestIssue || "Not provided"}`,
        "",
        "What they need help with:",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent =
        "Your email app should open with your inquiry ready to review and send. If you prefer, you can also use the consultation booking option above.";
    }
  });
}
