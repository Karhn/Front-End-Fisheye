import { mediaFactory } from "../utils/mediaFactory.js";

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
    displayPhotographerMedia(photographer, mediaList);
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
    infoBar.setAttribute("role", "region");
    infoBar.setAttribute("aria-label", "Informations du photographe");

    const totalLikes = mediaList.reduce((sum, media) => sum + media.likes, 0);

    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes-container");

    const likesLabel = document.createElement("span");
    likesLabel.id = "likes-label";
    likesLabel.classList.add("sr-only");
    likesLabel.textContent = "Total des mentions j'aime";

    const likesCount = document.createElement("span");
    likesCount.id = "total-likes";
    likesCount.classList.add("likes-count");
    likesCount.setAttribute("aria-labelledby", "likes-label");
    likesCount.setAttribute("aria-live", "polite");
    likesCount.textContent = totalLikes;

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fas", "fa-heart");
    heartIcon.setAttribute("aria-hidden", "true");
    heartIcon.setAttribute("focusable", "false");

    likesContainer.appendChild(likesLabel);
    likesContainer.appendChild(likesCount);
    likesContainer.appendChild(heartIcon);

    const priceElement = document.createElement("span");
    priceElement.classList.add("daily-price");
    priceElement.setAttribute("aria-label", `Tarif ${photographer.price} euros par jour`);
    priceElement.textContent = `${photographer.price}€ / jour`;

    infoBar.appendChild(likesContainer);
    infoBar.appendChild(priceElement);

    main.appendChild(infoBar);
}

const liked = new Set();

function updateTotalLikes(mediaList) {
    const baseTotal = mediaList.reduce((s, m) => s + m.likes, 0);
    const totalOutput = document.getElementById("total-likes");
    if (totalOutput) totalOutput.textContent = String(baseTotal + liked.size);
}

function displayPhotographerMedia(photographer, mediaList) {

    const main = document.getElementById("main");

    const mediaSection = document.createElement("section");
    mediaSection.classList.add("media-section");
    mediaSection.setAttribute("aria-label", "Galerie des médias du photographe");
    main.appendChild(mediaSection);

    mediaList.forEach(media => {
        
        const mediaElement = mediaFactory(media, photographer.name);
        mediaElement.setAttribute("tabindex", "0");
        mediaElement.setAttribute("aria-label", `${media.title} Appuyez sur Entrée pour interagir`);

        const card = document.createElement("article");
        card.classList.add("media-card");

        card.appendChild(mediaElement);

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("media-info");

        const title = document.createElement("h2");
        title.textContent = media.title;
        title.setAttribute("tabindex", "0");

        const likesContainer = document.createElement("div");
        likesContainer.classList.add("media-likes");

        const likesLabel = document.createElement("span");
        likesLabel.classList.add("sr-only");
        likesLabel.textContent = `Mentions j'aime pour ${media.title}`;

        const likesCount = document.createElement("output");
        likesCount.classList.add("likes-count");
        likesCount.setAttribute("tabindex", "0");
        likesCount.setAttribute("aria-live", "polite");
        const current = () => media.likes + (liked.has(media.id) ? 1 : 0);
        likesCount.value = current();
        likesCount.textContent = String(current());

        const likeButton = document.createElement("button");
        likeButton.type = "button";
        likeButton.classList.add("like-button");
        likeButton.setAttribute("aria-pressed", liked.has(media.id) ? "true" : "false");
        likeButton.setAttribute("aria-label", `${liked.has(media.id) ? "Retirer" : "Ajouter"} un j'aime à ${media.title}`);

        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fas", "fa-heart");
        heartIcon.setAttribute("aria-label", "likes");
        likeButton.appendChild(heartIcon);

        likeButton.addEventListener("click", () => {
            const isLiked = liked.has(media.id);
            if (isLiked) liked.delete(media.id);
            else liked.add(media.id);

            const nowLiked = !isLiked;
            likeButton.setAttribute("aria-pressed", String(nowLiked));
            likeButton.setAttribute("aria-label", `${nowLiked ? "Retirer" : "Ajouter"} un j'aime à ${media.title}`);

            const newValue = media.likes + (nowLiked ? 1 : 0);
            likesCount.value = newValue;
            likesCount.textContent = String(newValue);

            updateTotalLikes(mediaList);
        })

        likesContainer.append(likesLabel, likesCount, likeButton);

        infoContainer.append(title, likesContainer);

        card.appendChild(infoContainer);
        mediaSection.appendChild(card);

    });
}