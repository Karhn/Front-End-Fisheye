export function mediaFactory(media, photographerName) {
    
    const folderName = photographerName.split(" ")[0];

     console.log(folderName)
     
    let mediaElement;
    let mediaSrc;

    if (media.image) {

        mediaSrc = `assets/images/${folderName}/${media.image}`;
        mediaElement = document.createElement("img");
        mediaElement.setAttribute("src", mediaSrc);
        mediaElement.setAttribute("alt", media.title);
        mediaElement.setAttribute("aria-label", media.title);

    } else if (media.video) {

        mediaSrc = `assets/images/${folderName}/${media.video}`;
        mediaElement = document.createElement("video");
        mediaElement.setAttribute("src", mediaSrc);
        mediaElement.setAttribute("aria-label", media.title);
        mediaElement.setAttribute("controls", true);

    }

    mediaElement.classList.add("media-content");
    return mediaElement;

}