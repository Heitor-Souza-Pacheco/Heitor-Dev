(() => {
    const section = document.querySelector('#experiencia');
    if (!section) return;

    const intro = section.querySelector('.experience-intro');
    const items = [...section.querySelectorAll('.experience-item')];
    const markers = [...section.querySelectorAll('.experience-marker')];

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const reveal = (element, keyframes, options) => {
        if (!element) return;

        if (reducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }

        const animation = element.animate(keyframes, {
            fill: 'both',
            ...options
        });

        animation.finished.catch(() => {});
    };

    if (!reducedMotion) {
        if (intro) {
            intro.style.opacity = '0';
            intro.style.transform = 'translate3d(0, 40px, 0)';
        }

        items.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translate3d(0, 60px, 0)';
        });

        markers.forEach((marker) => {
            marker.style.opacity = '0';
            marker.style.transform = 'scale(.65)';
        });
    } else {
        section.classList.add('experience-activated');
    }

    const playReveal = () => {
        section.classList.add('experience-activated');

        reveal(intro, [
            { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
            { opacity: 1, transform: 'translate3d(0, 0, 0)' }
        ], {
            duration: 850,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
        });

        items.forEach((item, index) => {
            reveal(item, [
                { opacity: 0, transform: 'translate3d(0, 60px, 0)' },
                { opacity: 1, transform: 'translate3d(0, 0, 0)' }
            ], {
                duration: 900,
                delay: 180 + index * 180,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
            });
        });

        markers.forEach((marker, index) => {
            reveal(marker, [
                { opacity: 0, transform: 'scale(.65)' },
                { opacity: 1, transform: 'scale(1)' }
            ], {
                duration: 550,
                delay: 420 + index * 180,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
            });
        });
    };

    if (!('IntersectionObserver' in window)) {
        playReveal();
        return;
    }

    const observer = new IntersectionObserver((entries, observerRef) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        playReveal();
        observerRef.disconnect();
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -8% 0px'
    });

    observer.observe(section);
})();
