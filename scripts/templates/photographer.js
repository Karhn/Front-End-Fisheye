function photographerTemplate(data) {
    const { name, portrait, country, city, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );

        const link = document.createElement( 'a' );
        link.setAttribute("href", `photographer.html?id=${id}`);
        link.setAttribute("aria-label", `Accéder au profil de ${name}`)
        link.setAttribute("tabindex", "0");

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);

        const location = document.createElement( 'p' );
        location.classList.add("photographer-location");
        location.textContent = `${city}, ${country}`;

        const taglineElement = document.createElement( 'p' );
        taglineElement.classList.add("photographer-tagline");
        taglineElement.textContent = tagline;

        const priceElement = document.createElement( 'p' );
        priceElement.classList.add("photographer-price");
        priceElement.textContent = `${price}€/jour`;


        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return (article);
    }
    
    return { name, picture, getUserCardDOM }

}