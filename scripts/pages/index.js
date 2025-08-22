import { photographerTemplate } from "../templates/photographer.js";

async function getPhotographers() {
  try {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();

    console.log("Données JSON :", data.photographers);

    return {
      photographers: data.photographers,
    };
  } catch (error) {
    console.log("Erreurs :", error);
    return { photographers: [] };
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographersSection.innerHTML = "";
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
