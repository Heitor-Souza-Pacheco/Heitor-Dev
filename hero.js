(() => {
    const hero = document.querySelector('.hero-v2');

    if (!hero) return;

    const heroGlow = hero.querySelector('.hero-glow');

    hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        hero.style.setProperty('--mouse-x', `${x}px`);
        hero.style.setProperty('--mouse-y', `${y}px`);

        if (heroGlow) {
            const baseX = rect.width * 0.70;
            const baseY = rect.height * 0.45;

            heroGlow.style.setProperty('--glow-dx', `${x - baseX}px`);
            heroGlow.style.setProperty('--glow-dy', `${y - baseY}px`);
        }
    }, { passive: true });

    // Stacks flutuantes da Hero V2.
    if (!hero.querySelector('.hero-tech')) {
        const floatingTech = document.createElement('div');
        floatingTech.className = 'hero-tech';
        floatingTech.setAttribute('aria-hidden', 'true');

        const technologies = [
            ['Java', 'tech-java'],
            ['Spring Boot', 'tech-spring'],
            ['SQL', 'tech-sql'],
            ['Docker', 'tech-docker']
        ];

        floatingTech.innerHTML = technologies.map(([name, className]) => `
            <div class="tech-card ${className}">
                <span>◆</span>
                ${name}
            </div>
        `).join('');

        hero.appendChild(floatingTech);
    }

    const revealElements = [
        ['.hero-eyebrow', 120],
        ['.hero-title', 260],
        ['.hero-description', 400],
        ['.hero-tech-stack', 540],
        ['.hero-actions', 680]
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    revealElements.forEach(([selector, delay]) => {
        const element = hero.querySelector(selector);
        if (!element) return;

        if (prefersReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }

        element.animate(
            [
                { opacity: 0, transform: 'translate3d(0, 32px, 0)' },
                { opacity: 1, transform: 'translate3d(0, 0, 0)' }
            ],
            {
                duration: 850,
                delay,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'both'
            }
        );
    });

    const techCards = hero.querySelectorAll('.tech-card');
    const techDelays = [520, 670, 820, 970];

    techCards.forEach((card, index) => {
        if (prefersReducedMotion) {
            card.style.opacity = '1';
            return;
        }

        card.animate(
            [
                { opacity: 0, transform: 'translate3d(0, 24px, 0) scale(0.96)' },
                { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
            ],
            {
                duration: 800,
                delay: techDelays[index] ?? 520,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'both'
            }
        );
    });
})();
