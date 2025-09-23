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

// Chargement des flux RSS pour la veille
document.addEventListener("DOMContentLoaded", () => {
  const rssContainer = document.getElementById("rss-container");
  if (!rssContainer) return;

  // Configuration des flux RSS - REMPLACEZ par vos vrais flux
  const rssFeeds = [
    // Exemples de flux RSS technologiques populaires
    "https://feeds.feedburner.com/oreilly/radar", // O'Reilly Radar
    "https://www.smashingmagazine.com/feed/", // Smashing Magazine
    "https://css-tricks.com/feed/", // CSS-Tricks
    "https://feeds.feedburner.com/venturebeat/SZYF", // VentureBeat
    "https://feeds.feedburner.com/TechCrunch/", // TechCrunch
    // Ajoutez vos flux Google Alerts ici :
    // "https://www.google.com/alerts/feeds/VOTRE_ID_1/VOTRE_ID_2"
  ];

  // Fonction pour charger un flux RSS via RSS2JSON
  async function loadRSSFeed(feedUrl) {
    try {
      const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        feedUrl
      )}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();

      if (data.status === "ok") {
        return data.items.slice(0, 2); // Limiter à 2 articles par flux
      }
    } catch (error) {
      console.error("Erreur lors du chargement du flux RSS:", error);
    }
    return [];
  }

  // Fonction pour afficher les articles RSS
  function displayRSSArticles(articles) {
    if (articles.length === 0) {
      rssContainer.innerHTML = `
        <div class="rss-loading">
          <p>⚠️ Aucun flux RSS configuré ou erreur de chargement.</p>
          <p><small>Vérifiez les URLs dans le fichier main.js</small></p>
        </div>
      `;
      return;
    }

    const articlesHTML = articles
      .map(
        (article) => `
      <div class="rss-item">
        <div class="rss-meta">
          <span class="rss-date">${new Date(article.pubDate).toLocaleDateString(
            "fr-FR"
          )}</span>
          <span class="rss-source">${article.author || "RSS Feed"}</span>
        </div>
        <h4><a href="${article.link}" target="_blank" rel="noopener">${
          article.title
        }</a></h4>
        <p>${
          article.description
            ? article.description.replace(/<[^>]*>/g, "").substring(0, 150) +
              "..."
            : ""
        }</p>
      </div>
    `
      )
      .join("");

    rssContainer.innerHTML = articlesHTML;
  }

  // Charger tous les flux RSS
  async function loadAllRSSFeeds() {
    const allArticles = [];

    for (const feedUrl of rssFeeds) {
      const articles = await loadRSSFeed(feedUrl);
      allArticles.push(...articles);
    }

    // Trier par date (plus récent en premier)
    allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // Afficher les 6 articles les plus récents
    displayRSSArticles(allArticles.slice(0, 6));
  }

  // Démarrer le chargement
  loadAllRSSFeeds();
});
