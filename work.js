let slidesData = [];
let current = 0;

async function loadSlides() {
  try {
    const response = await fetch('work.json');
    if (!response.ok) throw new Error('Erreur lors du chargement du JSON');
    slidesData = await response.json();
    if (slidesData.length === 0) throw new Error('Aucun slide trouvé');
    showSlide(0);
  } catch (e) {
    console.error(e);
    document.getElementById('carousel-container').textContent = "Impossible de charger le carousel.";
  }
  console.log("Json OK")
}

function showSlide(index) {
  const container = document.getElementById('carousel-container');
  container.innerHTML = ''; // Vide le container

  const template = document.getElementById('carousel-item-template');
  const slideData = slidesData[index];

  const clone = template.content.cloneNode(true);

  // Remplit le contenu du slide
  const imageDiv = clone.querySelector('.carousel-item__image');
  if (imageDiv) imageDiv.style.backgroundImage = `url(${slideData.image})`;

  const subtitle = clone.querySelector('.carousel-item__subtitle');
  if (subtitle) subtitle.textContent = slideData.subtitle || '';

  const title = clone.querySelector('.carousel-item__title');
  if (title) title.textContent = slideData.title || '';

  const description = clone.querySelector('.carousel-item__description');
  if (description) description.textContent = slideData.description || '';

  const btn = clone.querySelector('.carousel-item__btn');
  if (btn) {
    btn.textContent = slideData.buttonText || '';
    btn.href = slideData.buttonLink || '#';
    btn.setAttribute('target', '_blank');
  }
  clone.querySelector(".carousel-item")?.classList.add("active");
  container.appendChild(clone);
  console.log("Template OK")

}

// Navigation
document.getElementById('moveLeft').addEventListener('click', () => {
  if (slidesData.length === 0) return;
  current = (current - 1 + slidesData.length) % slidesData.length;
  showSlide(current);
});

document.getElementById('moveRight').addEventListener('click', () => {
  if (slidesData.length === 0) return;
  current = (current + 1) % slidesData.length;
  showSlide(current);
  console.log("navigation OK")
});

window.addEventListener('DOMContentLoaded', loadSlides);
