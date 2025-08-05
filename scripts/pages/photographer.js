function getPhotographerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

async function getPhotographerData() {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    const photographerId = getPhotographerIdFromURL();
    const photographer = data.photographers.find((p) => p.id === photographerId);

    console.log("Photogrape Séléctionné :", photographer);
    return photographer;
}

async function getPhotographerMedia() {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    const photographerId = getPhotographerIdFromURL();
    const mediaList = data.media.filter((media) => media.photographerId === parseInt(photographerId));

    console.log("Media Séléctionné :", mediaList);
    return mediaList;
}

async function init() {
    const photographer = await getPhotographerData();
    const mediaList = await getPhotographerMedia();

    displayPhotographerHeader(photographer);
    displayPhotographerInfoBar(photographer, mediaList);
}

init();

function displayPhotographerHeader(photographer) {
    
    const headerSection = document.querySelector(".photograph-header");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const nameElement = document.createElement("h1");
    nameElement.classList.add("photographer-nameHeader");
    nameElement.setAttribute("tabindex", "0");
    nameElement.textContent = photographer.name;

    const infoBlock = document.createElement("div");
    infoBlock.classList.add("photographer-infoBlock");
    infoBlock.setAttribute("tabindex", "0");
    infoBlock.setAttribute("aria-label", `Localisation : ${photographer.city}, ${photographer.country}. Phrase d'accroche : ${photographer.tagline}`);

    const location = document.createElement("p");
    location.classList.add("photographer-locationHeader");
    location.textContent = `${photographer.city}, ${photographer.country}`;

    const tagline = document.createElement("p");
    tagline.classList.add("photographer-taglineHeader");
    tagline.textContent = photographer.tagline;

    infoBlock.appendChild(location);
    infoBlock.appendChild(tagline);
    infoDiv.appendChild(nameElement);
    infoDiv.appendChild(infoBlock);

    const img = document.createElement("img");
    img.setAttribute("tabindex", "0");
    img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    img.setAttribute("alt", `Portrait de ${photographer.name}`);
    img.classList.add("photographer-profile");
  
    headerSection.insertBefore(infoDiv, headerSection.firstChild);
    headerSection.appendChild(img);

}

function displayPhotographerInfoBar(photographer, mediaList) {

    const infoBar = document.querySelector(".photographer-infoBar");

    const totalLikes = mediaList.reduce((sum, media) => sum + media.likes, 0);

    const likesDiv = document.createElement("div");
    likesDiv.classList.add("total-likes");
    likesDiv.innerHTML = `${totalLikes} <span aria-label="likes">❤️</span>`;

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("prices");
    priceDiv.textContent = `${photographer.price}€ / jour`;

    infoBar.appendChild(likesDiv);
    infoBar.appendChild(priceDiv);

}