// Interactive features for CSS Framework UI

document.addEventListener('DOMContentLoaded', () => {
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-purple-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            // Add active class to clicked button
            this.classList.add('bg-purple-600', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Here you could add filter logic
            console.log('Filtre appliqué:', this.textContent);
        });
    });

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('button:contains("Ajouter")');
    
    // Since :contains doesn't work in CSS selectors, let's use a different approach
    const productButtons = Array.from(document.querySelectorAll('button')).filter(btn => 
        btn.textContent.includes('Ajouter')
    );

    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product name and price
            const productCard = this.closest('div');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.text-2xl').textContent;
            
            // Show feedback
            const originalText = this.textContent;
            this.textContent = '✓ Ajouté !';
            this.classList.add('bg-green-600');
            this.classList.remove('bg-purple-600');
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('bg-green-600');
                this.classList.add('bg-purple-600');
            }, 2000);
            
            console.log(`Produit ajouté au panier: ${productName} - ${productPrice}`);
        });
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('input[placeholder="Votre email"]');
    const submitButton = newsletterForm?.parentElement?.querySelector('button');
    
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            const email = newsletterForm.value;
            
            if (!email) {
                alert('Veuillez entrer votre email');
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide');
                return;
            }
            
            const originalText = this.textContent;
            this.textContent = '✓ Inscrit !';
            this.classList.add('bg-green-700');
            
            // Reset after 3 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('bg-green-700');
                newsletterForm.value = '';
            }, 3000);
            
            console.log(`Email inscrit à la newsletter: ${email}`);
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuButton = document.querySelector('button').textContent.includes('☰');
    if (menuButton) {
        document.querySelector('button').addEventListener('click', function() {
            const navLinks = document.querySelector('.hidden.md\\:flex');
            if (navLinks) {
                navLinks.classList.toggle('hidden');
                navLinks.classList.toggle('flex');
                navLinks.classList.toggle('flex-col');
                navLinks.classList.toggle('absolute');
                navLinks.classList.toggle('top-16');
                navLinks.classList.toggle('left-0');
                navLinks.classList.toggle('right-0');
                navLinks.classList.toggle('bg-purple-700');
            }
        });
    }

    console.log('CSS Framework UI - TechHub loaded successfully');
});

// Intersection Observer for lazy load animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.card-hover').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
