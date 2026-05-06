document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Main Title Typing Animation
    var typed = new Typed(".typewriter", {
        strings: ["UI/UX Designer.", "Frontend Developer.", "Logo Artist."],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000, 
        loop: true,
        cursorChar: '|'
    });

    // 2. Navigation Highlighting Logic
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main[id], section[id]');

    const options = {
        // This margin ensures the highlight shifts when the section 
        // is roughly 150px from the top (header height)
        rootMargin: "-150px 0px -50% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Carousel 3D Depth Logic
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const dots = document.querySelectorAll('.dot');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        cards.forEach((card, index) => {
            // Calculate distance from center (negative for left, positive for right)
            let distance = index - currentIndex;

            // Handle looping: make it circular
            if (distance > totalCards / 2) {
                distance -= totalCards;
            } else if (distance < -totalCards / 2) {
                distance += totalCards;
            }

            // Remove previous classes
            card.classList.remove('active', 'prev', 'next');
            dots[index].classList.remove('active');

            // Apply 3D Transforms based on distance from center
            // Active Center Card
            if (distance === 0) {
                card.classList.add('active');
                card.style.transform = `translateX(0px) translateZ(100px) scale(1.1) rotateY(0deg)`;
                card.style.opacity = '1';
                card.style.zIndex = '10';
                dots[index].classList.add('active');
            }
            // Card immediately to the Left
            else if (distance === -1 || (currentIndex === 0 && distance === totalCards - 1)) {
                card.classList.add('prev');
                card.style.transform = `translateX(-300px) translateZ(-50px) scale(0.9) rotateY(15deg)`;
                card.style.opacity = '0.6';
                card.style.zIndex = '5';
            }
            // Card immediately to the Right
            else if (distance === 1 || (currentIndex === totalCards - 1 && distance === 1)) {
                card.classList.add('next');
                card.style.transform = `translateX(300px) translateZ(-50px) scale(0.9) rotateY(-15deg)`;
                card.style.opacity = '0.6';
                card.style.zIndex = '5';
            }
            // Cards farther away (hidden or stacked behind)
            else {
                // Determine direction to stack them
                const direction = distance > 0 ? 1 : -1;
                card.style.transform = `translateX(${direction * 400}px) translateZ(-200px) scale(0.8) rotateY(${direction * -25}deg)`;
                card.style.opacity = '0'; // Hide cards beyond the side-cards
                card.style.zIndex = '1';
            }
        });
    }

    rightBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });

    leftBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });

    // Initialize first state
    updateCarousel();
});

// Animation Scroll Observer
// Add '.reveal-bottom' to the list of elements to watch
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        } else {
            // Remove this line if you want the animation to happen only once
            entry.target.classList.remove('reveal-active');
        }
    });
}, {
    threshold: 0.15 // Triggers when 15% of the section is visible
});

revealElements.forEach(el => revealObserver.observe(el));

document.getElementById('whatsapp-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values from form
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Your WhatsApp Number
    const myNumber = "919945525217";

    // Create the message string
    const whatsappMsg = `*New Inquiry from Portfolio*%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Phone:* ${phone}%0A` +
        `*Email:* ${email}%0A` +
        `*Subject:* ${subject}%0A` +
        `*Message:* ${message}`;

    // Open WhatsApp
    window.open(`https://wa.me/${myNumber}?text=${whatsappMsg}`, '_blank');
});