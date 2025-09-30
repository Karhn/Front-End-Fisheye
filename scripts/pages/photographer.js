import { mediaFactory } from "../utils/mediaFactory.js";
import { initContactForm } from "../utils/contactForm.js";

/* global bootstrap */

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
  initContactForm(photographer);
  initDropdown(photographer, mediaList);
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
  infoBlock.setAttribute(
    "aria-label",
    `Localisation : ${photographer.city}, ${photographer.country}. Phrase d'accroche : ${photographer.tagline}`
  );

  const location = document.createElement("h2");
  location.classList.add("photographer-locationHeader");
  location.textContent = `${photographer.city}, ${photographer.country}`;

  const tagline = document.createElement("p");
  tagline.classList.add("photographer-taglineHeader");
  tagline.textContent = photographer.tagline;

  infoBlock.appendChild(location);
  infoBlock.appendChild(tagline);
  infoDiv.appendChild(nameElement);
  infoDiv.appendChild(infoBlock);

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("profile-wrapper");

  const img = document.createElement("img");
  img.setAttribute("tabindex", "0");
  img.setAttribute("src", `assets/photographers/${photographer.portrait}`);
  img.setAttribute("alt", `Portrait de ${photographer.name}`);
  img.classList.add("photographer-profile");

  imgWrapper.appendChild(img)

  headerSection.insertBefore(infoDiv, headerSection.firstChild);
  headerSection.appendChild(imgWrapper);
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

  const folderName = photographer.name.split(" ")[0];
  const lightboxItems = mediaList
    .filter((media) => media.image || media.video)
    .map((media) => media.image 
      ? { type: "image", src: `assets/images/${folderName}/${media.image}`, title: media.title }
      : { type: "video", src: `assets/images/${folderName}/${media.video}`, title: media.title }
  );
  const lightbox = bootstrapLightbox(lightboxItems);

  mediaList.forEach((media) => {
    const mediaElement = mediaFactory(media, photographer.name);
    mediaElement.setAttribute("tabindex", "0");
    mediaElement.setAttribute("aria-label", `${media.title} Appuyez sur Entrée pour interagir`);

    if (media.image || media.video) {
      const src = media.image 
        ? `assets/images/${folderName}/${media.image}`
        : `assets/images/${folderName}/${media.video}`;

      const indexInLightbox = lightboxItems.findIndex((item) => item.src === src);
      const openLightbox = () => lightbox.show(indexInLightbox);

      mediaElement.addEventListener("click", openLightbox);
      mediaElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox();
        }
      });
    }

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
    likesCount.setAttribute("aria-live", "polite");
    const current = () => media.likes + (liked.has(media.id) ? 1 : 0);
    likesCount.value = current();
    likesCount.textContent = String(current());

    const likeButton = document.createElement("button");
    likeButton.type = "button";
    likeButton.classList.add("like-button");
    likeButton.setAttribute("aria-pressed", liked.has(media.id) ? "true" : "false");
    likeButton.setAttribute(
      "aria-label",
      `${liked.has(media.id) ? "Retirer" : "Ajouter"} un j'aime à ${media.title}`
    );

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
      likeButton.setAttribute(
        "aria-label",
        `${nowLiked ? "Retirer" : "Ajouter"} un j'aime à ${media.title}`
      );

      const newValue = media.likes + (nowLiked ? 1 : 0);
      likesCount.value = newValue;
      likesCount.textContent = String(newValue);

      updateTotalLikes(mediaList);
    });

    likesContainer.append(likesLabel, likesCount, likeButton);

    infoContainer.append(title, likesContainer);

    card.appendChild(infoContainer);
    mediaSection.appendChild(card);
  });
}

function bootstrapLightbox(lightboxItems) {
  const modalElement = document.getElementById("lightboxModal");
  const modal = new bootstrap.Modal(modalElement, { keyboard: true });
  const imageElement = document.getElementById("lightboxImage");
  const videoElement = document.getElementById("lightboxVideo");
  const labelElement = document.getElementById("lightboxLabel");
  const previousBtn = document.getElementById("lightboxPreviousBtn");
  const nextBtn = document.getElementById("lightboxNextBtn");
  const viewport = document.getElementById("lightboxViewport");
  const announcer = document.getElementById("lightboxAnnouncer");

  let currentIndex = 0;
  let openerElement = null;

  function stopVideo() {
    if (!videoElement) return;
    videoElement.pause();
    videoElement.removeAttribute("src");
    videoElement.load();
  }

  function render() {
    const image = lightboxItems.length;
    if (!image) return;

    currentIndex = (currentIndex + image) % image;

    const item = lightboxItems[currentIndex];

    labelElement.textContent = item.title || "";

    if (item.type === "video") {
      
      imageElement.hidden = true;
      imageElement.removeAttribute("src");
      imageElement.removeAttribute("alt");

      videoElement.hidden = false;
      if (videoElement.src !== item.src) {
        videoElement.src = item.src;
        videoElement.load();
      }
    } else {
      stopVideo();
      videoElement.hidden = true;

      imageElement.hidden = false;
      if (imageElement.src !== item.src) imageElement.src = item.src;
      imageElement.alt = item.title || "";
    }

    if (announcer) {
      announcer.textContent = item.title || "";
    }

  }

  function show(index) {
    currentIndex = index;
    render();
    modal.show();
  }

  function showNext() {
    stopVideo();
    currentIndex += 1; 
    render();
  }

  function showPrevious() {
    stopVideo();
    currentIndex -= 1; 
    render();
  }

  previousBtn.addEventListener("click", showPrevious);
  nextBtn.addEventListener("click", showNext);

  modalElement.addEventListener("show.bs.modal", (e) => {
    openerElement = e.relatedTarget || document.activeElement || null;
  });

  modalElement.addEventListener("shown.bs.modal", () => {

    viewport.focus();

    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrevious();
      }
    };

    modalElement.addEventListener("keydown", onKey);

    modalElement.addEventListener(
      "hidden.bs.modal",
      () => {
        document.removeEventListener("keydown", onKey);
        stopVideo();

        if (openerElement && typeof openerElement.focus === "function") openerElement.focus();
        openerElement = null;
      },
      { once: true }
    );
  });

  return { show };
}

function sortAndDisplay(photographer, mediaList, criteria) {
  const sortedList = [...mediaList];

  switch (criteria) {
    case "popularity":
      sortedList.sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      sortedList.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "title":
      sortedList.sort((a, b) =>
        a.title.localeCompare(b.title, "fr", { sensitivity: "base" })
      );
      break;
  }

  console.log(
    "Trier par :",
    criteria,
    sortedList.map((m) => ({
      titre: m.title,
      likes: m.likes,
      date: m.date,
    }))
  );

  document.querySelector(".media-section")?.remove();
  displayPhotographerMedia(photographer, sortedList);
}

function initDropdown(photographer, mediaList) {
  const dropdown = document.getElementById("sortDropdown");
  if (dropdown.dataset.sortInit === "1" ) return;
  dropdown.dataset.sortInit = "1";
  
  const btn = document.getElementById("sortBtn");
  const menu = dropdown.querySelector(".dropdown-menu");

  dropdown.addEventListener("show.bs.dropdown", () => {
    const current = btn.dataset.value || "popularity";
    menu.querySelectorAll(".dropdown-item").forEach(item => {
      const li = item.closest("li");
      li.style.display = (item.dataset.value === current) ? "none" : "";
    });
    btn.classList.add("is-open");
    menu.classList.add("is-open");
  });

  dropdown.addEventListener("hidden.bs.dropdown", () => {
    btn.setAttribute("aria-expanded", "false");
    btn.focus({ preventScroll: true });
  });

  menu.addEventListener("click", (e) => {
    const item = e.target.closest(".dropdown-item");
    if (!item) return;

    menu.querySelectorAll('.dropdown-item').forEach(element => element.classList.remove("active"));
    item.classList.add("active");
    btn.textContent = item.textContent;
    btn.dataset.value = item.dataset.value;

    sortAndDisplay(photographer, mediaList, item.dataset.value);
  });

  const initial = btn.dataset.value || "popularity";
  sortAndDisplay(photographer, mediaList, initial);
}