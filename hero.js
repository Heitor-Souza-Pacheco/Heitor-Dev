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
            heroGlow.style.left = `${x}px`;
            heroGlow.style.top = `${y}px`;
        }
    });

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
})();
