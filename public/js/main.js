document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Effect
    const textElement = document.getElementById('typing-text');
    const phrases = ["I build websites that breathe.", "I code customizations clients love.", "I create digital art."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of phrase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new phrase
        } else {
            typeSpeed = isDeleting ? 50 : 100;
        }

        setTimeout(type, typeSpeed);
    }

    if (textElement) {
        type();
    }

    // 2. Scroll Reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.card');
    hiddenElements.forEach((el) => observer.observe(el));
});
