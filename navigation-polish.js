(() => {
    const navbar = document.querySelector('.navbar-v2');
    const progress = document.createElement('div');
    const scrollTop = document.createElement('a');

    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');

    scrollTop.className = 'scroll-top-v2';
    scrollTop.href = '#home';
    scrollTop.setAttribute('aria-label', 'Voltar ao topo');
    scrollTop.innerHTML = '↑';

    document.body.append(progress, scrollTop);

    let ticking = false;

    const updateScrollUI = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const amount = scrollable > 0 ? window.scrollY / scrollable : 0;

        progress.style.transform = `scaleX(${Math.min(1, Math.max(0, amount))})`;

        if (scrollTop) {
            scrollTop.classList.toggle('visible', window.scrollY > window.innerHeight * 0.7);
        }

        ticking = false;
    };

    const requestScrollUpdate = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollUI);
            ticking = true;
        }
    };

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate, { passive: true });

    updateScrollUI();

    // A navegação por âncoras permanece suave e respeita o scroll-padding da base V2.
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            const target = targetId && document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();
