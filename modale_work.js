let carouselData = [];
let currentIndex = 0;


document.addEventListener("DOMContentLoaded", () => {
    // Charge les données JSON
    fetch('work.json')
    .then(res => res.json())
    .then(data => {
    carouselData = data;

      // Active showModal() au clic 
        document.querySelectorAll('.work__btn-modal').forEach(btn => {
            btn.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = parseInt(this.dataset.index, 10) || 0;
            showModal(currentIndex);
            });
        });
    });

    // Navigation
    document.getElementById('moveLeft').onclick = function() {
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        updateCarousel(currentIndex);
    };
    document.getElementById('moveRight').onclick = function() {
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateCarousel(currentIndex);
    };

    // Fermeture par croix ou clic hors de la modale
    document.querySelector('.work__modal-close').onclick = function() {
        document.getElementById('work-modal').close();
    };
    document.getElementById('work-modal').addEventListener('click', function(e) {
        if (e.target === this) this.close();
    });
    });

// Fonction qui affiche la modale et le carousel
    function showModal(index) {
    const dialog = document.getElementById('work-modal');
    updateCarousel(index);
    dialog.showModal();
    }

// Mise à jour du carousel
    function updateCarousel(index) {
    const container = document.getElementById('work-modal-carousel-container');
    const template = document.getElementById('work-modal-carousel-project-template');
    container.innerHTML = '';
    const data = carouselData[index];
    if (!data) return;
    const clone = template.content.cloneNode(true);

//   test de l'affichage du clone
    console.log(clone.innerHTML);

  // vérifie les éléments avant d'y accéder
    const image = clone.querySelector('.work__modal-carousel-project-image');
    const subtitle = clone.querySelector('.work__modal-carousel-project-subtitle');
    const title = clone.querySelector('.work__modal-carousel-project-title');
    const description = clone.querySelector('.work__modal-carousel-project-description');
    const btn = clone.querySelector('.work__modal-carousel-project-btn');

    if (!image || !subtitle || !title || !description || !btn) {
    console.error('Un ou plusieurs éléments du template sont manquants !');
    return;
    }
// Injecte les infos du Json
    image.style.backgroundImage = `url(${data.image})`;
    console.log("data image ok");
    
    subtitle.textContent = data.subtitle;
    title.textContent = data.title;
    description.textContent = data.description;
    btn.textContent = data.btnText;
    btn.href = data.btnLink;

    container.appendChild(clone);
}


