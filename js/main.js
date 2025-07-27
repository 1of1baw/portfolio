// Menu mobile
const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = '☰';
document.querySelector('.header .container').appendChild(hamburger);

const nav = document.querySelector('.nav');
hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.textContent = nav.classList.contains('active') ? '✕' : '☰';
});

// Fermer le menu au clic sur un lien
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.textContent = '☰';
    });
});

// Changement d'actif dans la navigation au scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animation au défilement
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .about .container > div, .hero-content, .hero-image');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Ajouter des styles initiaux pour l'animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about .container > div, .hero-content, .hero-image');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Déclencher l'animation initiale
    setTimeout(animateOnScroll, 500);
});

window.addEventListener('scroll', animateOnScroll);

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupération des valeurs du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Ici, vous pouvez ajouter le code pour envoyer les données à un serveur
        console.log('Données du formulaire :', data);
        
        // Afficher un message de confirmation
        alert('Merci pour votre message ! Je vous répondrai dès que possible.');
        contactForm.reset();
    });
}

// Basculement de langue (exemple basique)
const langToggle = document.querySelector('.lang-toggle');
if (langToggle) {
    langToggle.addEventListener('click', (e) => {
        e.preventDefault();
        // Ici, vous pouvez ajouter la logique de changement de langue
        console.log('Changement de langue');
        // Par exemple, rediriger vers la version anglaise :
        // window.location.href = '/en';
    });
}

// Chargement fluide des images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));
