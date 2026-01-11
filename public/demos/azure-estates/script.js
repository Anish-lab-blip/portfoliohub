document.addEventListener('DOMContentLoaded', () => {

    // Mobile Nav Toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Active Link Logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const h = link.getAttribute('href').replace('./', '');
        if (h === currentPath) {
            link.classList.add('active');
        }
    });

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    });

    document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('transition', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });

});
