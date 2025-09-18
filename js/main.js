// Menu mobile
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Fermer le menu au clic sur un lien
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Fermer le menu au clic en dehors
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  // Fermer le menu avec la touche Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
}

// Changement d'actif dans la navigation au scroll
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Animation au défilement
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".project-card, .about .container > div, .hero-content, .hero-image"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Ajouter des styles initiaux pour l'animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".project-card, .about .container > div, .hero-content, .hero-image"
  );

  animatedElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    element.style.transitionDelay = `${index * 0.1}s`;
  });

  // Déclencher l'animation initiale
  setTimeout(animateOnScroll, 500);
});

window.addEventListener("scroll", animateOnScroll);

// Gestion du formulaire de contact
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Récupération des valeurs du formulaire
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Ici, vous pouvez ajouter le code pour envoyer les données à un serveur
    console.log("Données du formulaire :", data);

    // Afficher un message de confirmation
    alert("Merci pour votre message ! Je vous répondrai dès que possible.");
    contactForm.reset();
  });
}

// Basculement de langue (exemple basique)
const langToggle = document.querySelector(".lang-toggle");
if (langToggle) {
  langToggle.addEventListener("click", (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique de changement de langue
    console.log("Changement de langue");
    // Par exemple, rediriger vers la version anglaise :
    // window.location.href = '/en';
  });
}

// Chargement fluide des images
const images = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
      observer.unobserve(img);
    }
  });
});

images.forEach((img) => imageObserver.observe(img));

// Effet machine à écrire sur le titre de la section héro
document.addEventListener("DOMContentLoaded", () => {
  const titleElement = document.getElementById("hero-typing");
  if (!titleElement) return;

  const fullText = titleElement.textContent.trim();
  titleElement.textContent = "";
  titleElement.classList.add("typing-active");

  const typingSpeedMs = 80; // vitesse de frappe
  let index = 0;

  const typeNextCharacter = () => {
    if (index <= fullText.length) {
      titleElement.textContent = fullText.slice(0, index);
      index += 1;
      setTimeout(typeNextCharacter, typingSpeedMs);
    } else {
      setTimeout(() => titleElement.classList.remove("typing-active"), 1200);
    }
  };

  setTimeout(typeNextCharacter, 400);
});

// Effet de texte "crypté" (scramble) pour le paragraphe sous le titre
document.addEventListener("DOMContentLoaded", () => {
  const p = document.getElementById("hero-scramble");
  if (!p) return;

  const original = p.textContent;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // jeu plus léger
  const durationMs = 3500; // durée totale plus longue (plus lent)
  const frameMs = 50; // rafraîchissement plus espacé
  const totalFrames = Math.ceil(durationMs / frameMs);

  let frame = 0;
  const revealPerFrame = original.length / totalFrames;
  let revealed = 0;

  const scrambleTick = () => {
    frame += 1;
    revealed = Math.min(original.length, Math.floor(frame * revealPerFrame));

    const head = original.slice(0, revealed);
    const remaining = original.slice(revealed);
    const windowSize = 8; // brouiller seulement les 8 prochains caractères
    const tail = remaining
      .split("")
      .map((ch, i) => {
        if (ch === " ") return " ";
        if (i < windowSize) {
          return chars[Math.floor(Math.random() * chars.length)];
        }
        return " "; // ne rien afficher au-delà de la fenêtre
      })
      .join("");

    p.textContent = head + tail;

    if (revealed < original.length) {
      setTimeout(scrambleTick, frameMs);
    } else {
      p.textContent = original; // fin propre sur le texte original
    }
  };

  scrambleTick();
});
