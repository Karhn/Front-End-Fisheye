export function mediaFactory(media, photographerName) {
  const folderName = (photographerName || "").split(" ")[0] || "unknown";

  let mediaElement;
  let mediaSrc;

  const file = media.image || media.video;

  if (!file) {
    console.warn("Media manquant (image/video):", media);
    const fallback = document.createElement("div");
    fallback.className = "media-content";
    fallback.setAttribute("role", "img");
    fallback.setAttribute("aria-label", media.title || "Media indisponible");
    return fallback;
  }

  if (media.image) {
    mediaSrc = `assets/images/${folderName}/${media.image}`;
    mediaElement = document.createElement("img");
    mediaElement.setAttribute("src", mediaSrc);
    mediaElement.setAttribute("alt", media.title);
    mediaElement.setAttribute("aria-label", media.title);
    mediaElement.loading = "lazy";
  } else if (media.video) {
    mediaSrc = `assets/images/${folderName}/${media.video}`;
    mediaElement = document.createElement("video");
    mediaElement.setAttribute("src", mediaSrc);
    mediaElement.setAttribute("aria-label", media.title);
    mediaElement.controls = true;
  }

  mediaElement.classList.add("media-content");
  return mediaElement;
}
