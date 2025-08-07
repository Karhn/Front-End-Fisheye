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
    createPhotographerInfoBar(photographer, mediaList);
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

function createPhotographerInfoBar(photographer, mediaList) {

    const main = document.getElementById("main");

    const infoBar = document.createElement("div");
    infoBar.classList.add("photographer-infoBar");
    infoBar.setAttribute("aria-label", "Informations du photographe");

    const totalLikes = mediaList.reduce((sum, media) => sum + media.likes, 0);

    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes-container");

    const likesCount = document.createElement("span");
    likesCount.textContent = totalLikes;
    likesCount.classList.add("likes-count");

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa", "fa-heart");

    likesContainer.appendChild(likesCount);
    likesContainer.appendChild(heartIcon);

    const priceElement = document.createElement("span");
    priceElement.classList.add("daily-price");
    priceElement.textContent = `${photographer.price}€ / jour`;

    infoBar.appendChild(likesContainer);
    infoBar.appendChild(priceElement);

    main.appendChild(infoBar);
}