export function photographerTemplate(data) {
  const { name, portrait, country, city, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `Accéder au profil de ${name}`);
    link.setAttribute("tabindex", "0");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    link.appendChild(img);
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
