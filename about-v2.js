(() => {
    const section = document.querySelector('#sobre');

    if (!section || section.dataset.aboutV2Initialized === 'true') return;

    section.dataset.aboutV2Initialized = 'true';

    const introItems = section.querySelectorAll('.fotoEu, .textoSobre > p');
    const infoCards = section.querySelectorAll('.expContainer > *');

    [...introItems, ...infoCards].forEach((element, index) => {
        element.dataset.aboutRevealDelay = `${index * 110}ms`;
    });

    const reveal = (element) => {
        element.animate(
            [
                {
                    opacity: 0,
                    transform: 'translate3d(0, 45px, 0)'
                },
                {
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)'
                }
            ],
            {
                duration: 850,
                delay: Number.parseFloat(element.dataset.aboutRevealDelay) || 0,
                easing: 'cubic-bezier(.22, 1, .36, 1)',
                fill: 'both'
            }
        );
    };

    if (!('IntersectionObserver' in window)) {
        [...introItems, ...infoCards].forEach((element) => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
        return;
    }

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            reveal(entry.target);
            observerRef.unobserve(entry.target);
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -12% 0px'
    });

    [...introItems, ...infoCards].forEach((element) => observer.observe(element));
})();
