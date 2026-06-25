// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ============================================
// 1. HERO SECTION - Canvas Animation
// ============================================
function initCanvasAnimation() {
    const canvas = document.getElementById('canvas-animation');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 1;
            this.opacity = Math.random() * 0.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// 2. STAGGER ANIMATION
// ============================================
function initStaggerAnimation() {
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    // Initial animation on load
    gsap.to(staggerItems, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'back.out',
    });
    
    // Hover animation
    document.querySelector('.stagger-demo').addEventListener('mouseenter', () => {
        gsap.to(staggerItems, {
            duration: 0.3,
            scale: 1.1,
            backgroundColor: 'rgba(102, 126, 234, 0.6)',
            stagger: 0.05,
            overwrite: 'auto'
        });
    });
    
    document.querySelector('.stagger-demo').addEventListener('mouseleave', () => {
        gsap.to(staggerItems, {
            duration: 0.3,
            scale: 1,
            backgroundColor: 'rgba(102, 126, 234, 0.3)',
            stagger: 0.05
        });
    });
}

// ============================================
// 3. SCROLL TRIGGER ANIMATION
// ============================================
function initScrollTriggerAnimation() {
    const scrollDemo = document.querySelector('.scroll-trigger-demo');
    
    gsap.to(scrollDemo, {
        scrollTrigger: {
            trigger: scrollDemo,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
        },
        backgroundColor: 'rgba(102, 126, 234, 0.5)',
        scale: 1.1,
        duration: 1
    });
    
    // Entry animation
    ScrollTrigger.create({
        trigger: scrollDemo,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(scrollDemo, {
                duration: 0.6,
                opacity: 1,
                y: 0,
                ease: 'power3.out'
            });
        }
    });
}

// ============================================
// 4. HOVER TRIGGER ANIMATION
// ============================================
function initHoverTriggerAnimation() {
    const hoverTrigger = document.querySelector('.hover-trigger');
    
    hoverTrigger.addEventListener('mouseenter', () => {
        gsap.timeline()
            .to(hoverTrigger, { duration: 0.3, scale: 1.2, ease: 'back.out' }, 0)
            .to(hoverTrigger, { duration: 0.3, rotation: 5, ease: 'sine.inOut' }, 0);
    });
    
    hoverTrigger.addEventListener('mouseleave', () => {
        gsap.to(hoverTrigger, {
            duration: 0.3,
            scale: 1,
            rotation: 0,
            ease: 'back.out'
        });
    });
}

// ============================================
// 5. MORPHING SHAPE ANIMATION
// ============================================
function initMorphingShape() {
    const paths = [
        'M50,10 Q90,30 90,70 Q50,90 10,70 Q10,30 50,10',
        'M50,20 L80,40 L90,70 L50,85 L10,70 L20,40 Z',
        'M50,10 L85,35 Q100,50 85,65 L50,90 L15,65 Q0,50 15,35 Z'
    ];
    
    const morphPath = document.querySelector('.morph-svg path');
    let pathIndex = 0;
    
    function morphShape() {
        gsap.to(morphPath, {
            attr: { d: paths[(pathIndex++) % paths.length] },
            duration: 1.5,
            ease: 'sine.inOut',
            onComplete: morphShape
        });
    }
    
    morphShape();
}

// ============================================
// 6. TEXT ANIMATION
// ============================================
function initTextAnimation() {
    const textDemo = document.querySelector('.text-animation-demo');
    const originalText = textDemo.textContent;
    
    gsap.to(textDemo, {
        text: originalText,
        duration: 2,
        ease: 'power1.inOut',
        delay: 0.5
    });
    
    // Letter animation
    textDemo.addEventListener('mouseenter', () => {
        const letters = textDemo.textContent.split('');
        textDemo.innerHTML = letters.map(letter => 
            `<span style="display: inline-block;">${letter}</span>`
        ).join('');
        
        gsap.to(textDemo.querySelectorAll('span'), {
            duration: 0.5,
            y: -10,
            opacity: 1,
            stagger: 0.05,
            ease: 'back.out',
            overwrite: 'auto'
        });
    });
}

// ============================================
// 7. COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counterDemo = document.querySelector('.counter-demo');
    
    ScrollTrigger.create({
        trigger: counterDemo,
        start: 'top 80%',
        onEnter: () => {
            gsap.to({ value: 0 }, {
                value: 1000,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function() {
                    counterDemo.textContent = Math.floor(this.targets()[0].value);
                }
            });
        },
        once: true
    });
}

// ============================================
// 8. INTERACTIVE DEMO BOXES
// ============================================
function initInteractiveBoxes() {
    const demoBoxes = document.querySelectorAll('.demo-box');
    
    demoBoxes.forEach((box, index) => {
        const boxElement = box.querySelector('.box-element');
        
        box.addEventListener('click', () => {
            const tl = gsap.timeline();
            
            tl.to(boxElement, {
                duration: 0.3,
                scale: 1.3,
                ease: 'back.out'
            }, 0)
            .to(boxElement, {
                duration: 0.3,
                rotation: 360,
                ease: 'power1.inOut'
            }, 0)
            .to(boxElement, {
                duration: 0.3,
                scale: 1,
                ease: 'back.out'
            })
            .to(boxElement, {
                duration: 0.3,
                rotation: 0
            }, '<');
        });
    });
}

// ============================================
// 9. PARALLAX ANIMATION
// ============================================
function initParallaxAnimation() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    parallaxLayers.forEach((layer, index) => {
        gsap.to(layer, {
            scrollTrigger: {
                trigger: layer.parentElement,
                start: 'top center',
                scrub: 1.5
            },
            y: index * 30,
            duration: 1
        });
    });
}

// ============================================
// 10. PORTFOLIO CARDS ANIMATION
// ============================================
function initPortfolioCards() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    gsap.set(cards, { opacity: 0, y: 50 });
    
    ScrollTrigger.batch(cards, {
        onEnter: (batch) => {
            gsap.to(batch, {
                duration: 0.6,
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        },
        once: true
    });
}

// ============================================
// 11. NAVIGATION ANIMATION
// ============================================
function initNavAnimation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                duration: 0.2,
                x: 5,
                ease: 'power2.out'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                duration: 0.2,
                x: 0
            });
        });
    });
}

// ============================================
// 12. CTA BUTTON ANIMATION
// ============================================
function initCTAAnimation() {
    const ctaBtn = document.querySelector('.cta-button');
    
    if (ctaBtn) {
        gsap.from(ctaBtn, {
            duration: 0.8,
            opacity: 0,
            y: 20,
            delay: 0.5,
            ease: 'back.out'
        });
        
        ctaBtn.addEventListener('click', () => {
            gsap.timeline()
                .to(ctaBtn, {
                    duration: 0.1,
                    scale: 0.95
                }, 0)
                .to(ctaBtn, {
                    duration: 0.2,
                    scale: 1,
                    ease: 'back.out'
                });
        });
    }
}

// ============================================
// 13. FORM ANIMATION
// ============================================
function initFormAnimation() {
    const form = document.querySelector('.contact-form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach((input, index) => {
            gsap.set(input, { opacity: 0, x: -20 });
            
            ScrollTrigger.create({
                trigger: form,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(input, {
                        duration: 0.5,
                        opacity: 1,
                        x: 0,
                        delay: index * 0.1,
                        ease: 'power2.out'
                    });
                },
                once: true
            });
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Initializing Advanced Animations with GSAP...');
    
    initCanvasAnimation();
    initStaggerAnimation();
    initScrollTriggerAnimation();
    initHoverTriggerAnimation();
    initMorphingShape();
    initTextAnimation();
    initCounterAnimation();
    initInteractiveBoxes();
    initParallaxAnimation();
    initPortfolioCards();
    initNavAnimation();
    initCTAAnimation();
    initFormAnimation();
    
    console.log('✨ All animations loaded!');
});

// Update ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
