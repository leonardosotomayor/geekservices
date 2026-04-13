const CONTACT_EMAIL = "leonardo@geekservicesny.com";

const contactForm = document.querySelector("#contact-form");
const emailLink = document.querySelector("#contact-email-link");
const formNote = document.querySelector("#form-note");

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
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(
      `Consultation request from ${name || "website visitor"}`
    );

    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business: ${business || "Not provided"}`,
        "",
        "What they need help with:",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent =
        "Your email app should open with the message ready to send. Next step: replace this with a real form backend.";
    }
  });
}
