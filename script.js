

// Sélection des éléments nécessaires
const body = document.querySelector("body");
const toggleCheckbox = document.querySelector(".toggle-checkbox");
const toggleSlot = document.querySelector(".toggle-slot")
const welcomeTitle = document.querySelector(".title")

// Fonction pour appliquer le mode en fonction de l'état
const applyMode = (isDarkMode) => {
    if (isDarkMode) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        toggleSlot.style.boxShadow = "0px calc(10px / 3) calc(25px / 3) #07215b";
        welcomeTitle.style.background = `url("/assets/img/moon.jpg") repeat`;
        welcomeTitle.style.backgroundClip = "text";
        toggleCheckbox.checked = true; // Cocher le toggle pour le mode sombre
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        toggleSlot.style.boxShadow = "0px calc(10px / 3) calc(25px / 3) #ffbb52";
        welcomeTitle.style.background = `url("/assets/img/sun.jpg") repeat center`;
        welcomeTitle.style.backgroundClip = "text";
        toggleCheckbox.checked = false; // Décocher le toggle pour le mode clair
    }
};

// Vérifier et appliquer la préférence sauvegardée au chargement de la page
const savedMode = localStorage.getItem("theme"); // Récupérer la préférence depuis le Local Storage
if (savedMode) {
    applyMode(savedMode === "dark"); // Appliquer le mode selon la valeur sauvegardée
} else {
    // Si aucune préférence n'est sauvegardée, appliquer un mode par défaut (par exemple, clair)
    applyMode(false);
}

// Ajout d'un écouteur d'événements sur le checkbox pour détecter les changements
toggleCheckbox.addEventListener("change", () => {
    const isDarkMode = toggleCheckbox.checked; // Vérifier si le toggle est coché
    applyMode(isDarkMode); // Appliquer le mode correspondant
    localStorage.setItem("theme", isDarkMode ? "dark" : "light"); // Sauvegarder la préférence dans le Local Storage
});
