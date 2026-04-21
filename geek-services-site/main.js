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
