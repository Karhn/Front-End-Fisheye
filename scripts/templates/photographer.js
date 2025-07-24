function photographerTemplate(data) {
    const { name, portrait, country, city, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement( 'p' );
        location.classList.add("photographer-location");
        location.textContent = `${city}, ${country}`;

        const taglineElement = document.createElement( 'p' );
        taglineElement.classList.add("photographer-tagline");
        taglineElement.textContent = tagline;

        const priceElement = document.createElement( 'p' );
        priceElement.classList.add("photographer-price");
        priceElement.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return (article);
    }
    
    return { name, picture, getUserCardDOM }

}