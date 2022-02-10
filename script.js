const count = 5; // Number of images to fetch on initial load
const apiKey = "n4N3VdH0VbT_PlzUvls7WyE98HHQfYuMx5hZirZXr4Y";
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let picturesArray = [];
const imgContainer = document.querySelector(".image-container");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let initialLoad = true;

function setAttributes(element, attributes) {
  for (key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    // Hide loader when image is fully loaded on the page
    loader.hidden = true;
    if (!initialLoad) {
      count = 30; // number of images to fetch after fetching the first five images
    }
  }
}

// Display photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = picturesArray.length;

  picturesArray.forEach((photo) => {
    let description = photo.alt_description;
    if (photo.alt_description === null) {
      description = `Unsplash image by ${photo.user.first_name} ${photo.user.last_name}`;
    }
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // Simplifying my code with setAttributes function
    setAttributes(item, { href: photo.links.html });

    const image = document.createElement("img");
    // image.setAttribute("src", photo.urls.regular);
    // image.setAttribute("alt", description);
    // image.setAttribute("title", description);

    // Simplified to this fuction to set attributes on an element
    setAttributes(image, {
      src: photo.urls.regular,
      alt: description,
      title: description,
    });

    image.addEventListener("load", imageLoaded);

    item.appendChild(image);
    imgContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    picturesArray = data;
    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling near the bottom of page then load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// Load getPhotos function
getPhotos();
