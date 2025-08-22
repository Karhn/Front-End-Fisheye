export function initContactForm(photographer) {
  const contactNameElement = document.getElementById("contactName");
  if (contactNameElement) contactNameElement.textContent = photographer.name ?? "";

  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      firstName: document.getElementById("firstName")?.value.trim() ?? "",
      lastName: document.getElementById("lastName")?.value.trim() ?? "",
      email: document.getElementById("email")?.value.trim() ?? "",
      message: document.getElementById("message")?.value.trim() ?? "",
      photographerId: photographer.id ?? null,
      photograpgerName: photographer?.name ?? "",
    };

    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      form.reportValidate();
      return;
    }

    console.log("Contact Form:", data);

    const modalEl = document.getElementById("contactModal");
    const modal = window.bootstrap?.Modal.getOrCreateInstance(modalEl);
    modal?.hide();

    form.reset();

    document.querySelector(`[data-bs-target="#contactModal"]`)?.focus();
  });
}
