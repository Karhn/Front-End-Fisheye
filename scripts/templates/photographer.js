export function photographerTemplate(data) {
  const { name, portrait, country, city, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `${name}`);
    link.classList.add("photographers-list");

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    img.classList.add("photographer-profile-index");

    img.style.objectFit = "cover";

    avatar.appendChild(img);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    link.appendChild(avatar);
    link.appendChild(h2);
    article.appendChild(link);

    const infoGroup = document.createElement("div");
    infoGroup.classList.add("photographer-info");
    infoGroup.setAttribute("role", "group");
    infoGroup.setAttribute("tabindex", "0");
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
