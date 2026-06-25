const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('active'));
  });
}

const preorderForm = document.getElementById('preorder-form');
if (preorderForm) {
  preorderForm.addEventListener('submit', (e) => {
    e.preventDefault(); // empêche l’envoi si erreurs
    let valid = true;

    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (name.value.trim() === "") {
      nameError.textContent = "Le nom est requis.";
      valid = false;
    } else {
      nameError.textContent = "";
    }

    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email.value)) {
      emailError.textContent = "Email invalide.";
      valid = false;
    } else {
      emailError.textContent = "";
    }

    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^[0-9]{8,}$/;
    if (!phoneRegex.test(phone.value)) {
      phoneError.textContent = "Numéro invalide (min. 8 chiffres).";
      valid = false;
    } else {
      phoneError.textContent = "";
    }

    const password = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    if (password && password.value.length < 6) {
      passwordError.textContent = "Mot de passe trop court (min. 6 caractères).";
      valid = false;
    } else if (passwordError) {
      passwordError.textContent = "";
    }

    if (valid) {
      alert("Formulaire soumis avec succès !");
      preorderForm.reset();
    }
  });
}


const video = document.querySelector('.hero-video');
if (video) {
  function updateVideoProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0 || isNaN(video.duration) || video.duration === 0) {
      return;
    }

    const scrollPos = window.scrollY;
    const scrollFraction = scrollPos / maxScroll;
    video.currentTime = video.duration * scrollFraction;
  }

  video.addEventListener('loadedmetadata', () => {
    video.currentTime = 0;
    video.pause();
    updateVideoProgress();
  });

  window.addEventListener('scroll', () => {
    if (!video.paused) {
      video.pause();
    }
    updateVideoProgress();
  });
  window.addEventListener('resize', updateVideoProgress);
}
