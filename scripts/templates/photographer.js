export function photographerTemplate(data) {
  const { name, portrait, country, city, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  const CROPS = {
    243: { x: "70%", y: "26%", s: 1.50}, // MIMI
    930: { x: "50%", y: "30%", s: 1.90}, // ELLIE
    82: { x: "15%", y: "50%", s: 1.15}, // TRACY
    527: { x: "48%", y: "15%", s: 1.10}, // NABEEL
    925: { x: "55%", y: "50%", s: 1.45}, // RHODE
    195: { x: "56%", y: "80%", s: 1.57}, // MARCEL
  }

  const crop = CROPS[id] ?? { x: "50%", y: "50%", s: 1};

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `${name}`);
    link.setAttribute("tabindex", "0");
    link.classList.add("photographers-list");

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    img.classList.add("photographer-profile-index");

    img.style.objectPosition = `${crop.x} ${crop.y}`;
    img.style.transform = `scale(${crop.s})`;

    avatar.appendChild(img);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    link.appendChild(avatar);
    link.appendChild(h2);
    article.appendChild(link);

    const infoGroup = document.createElement("div");
    infoGroup.classList.add("photographer-info");
    infoGroup.setAttribute("tabindex", "0");
    infoGroup.setAttribute("role", "group");
    infoGroup.setAttribute(
      "aria-label",
      `Localisation : ${city}, ${country}. Phrase d'accroche : ${tagline}. Tarif : ${price} euros par jour.`
    );

    const location = document.createElement("p");
    location.classList.add("photographer-location");
    location.textContent = `${city}, ${country}`;
    location.setAttribute("aria-hidden", "true");

    const taglineElement = document.createElement("p");
    taglineElement.classList.add("photographer-tagline");
    taglineElement.textContent = tagline;
    taglineElement.setAttribute("aria-hidden", "true");

    const priceElement = document.createElement("p");
    priceElement.classList.add("photographer-price");
    priceElement.textContent = `${price}€/jour`;
    priceElement.setAttribute("aria-hidden", "true");

    infoGroup.append(location, taglineElement, priceElement);
    article.appendChild(infoGroup);

    return article;
  }

  return { name, picture, getUserCardDOM };
}
