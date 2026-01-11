document.addEventListener('DOMContentLoaded', () => {
    
    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const startValue = 0;
                let startTime = null;

                function animate(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const progress = currentTime - startTime;
                    const percentage = Math.min(progress / duration, 1);
                    
                    // Ease out quart
                    const ease = 1 - Math.pow(1 - percentage, 4);
                    
                    const currentValue = Math.floor(startValue + (endValue - startValue) * ease);
                    target.textContent = currentValue.toLocaleString() + (target.getAttribute('data-suffix') || '');

                    if (percentage < 1) {
                        requestAnimationFrame(animate);
                    }
                }

                requestAnimationFrame(animate);
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

});
