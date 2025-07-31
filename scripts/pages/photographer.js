function getPhotographerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

async function getPhotographerData() {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    const photographerId = getPhotographerIdFromURL()
    const photographer = data.photographers.find((p) => p.id === photographerId);

    console.log("Photogrape Séléctionné :", photographer);
    return photographer;
}

async function init() {
    const photographer = await getPhotographerData();
}

init();