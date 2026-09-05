(() => {
    // =====================================================
    // LEGACY REVEAL
    // Mantido apenas para as seções que ainda não foram migradas.
    // =====================================================

    const revealTargets = [
        { selector: '.hiden', className: 'show' },
        { selector: '.hiden2', className: 'show' },
        { selector: '.tituloAnima', className: 'tituloAnimaShow' },
        { selector: '.tituloAnima2', className: 'tituloAnimaShow' },
        { selector: '.tituloAnima3', className: 'tituloAnimaShow' },
    ];

    const revealObserver = new IntersectionObserver((entries, observerRef) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const className = entry.target.dataset.revealClass;
            if (className) {
                entry.target.classList.add(className);
            }

            observerRef.unobserve(entry.target);
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -5% 0px'
    });

    revealTargets.forEach(({ selector, className }) => {
        document.querySelectorAll(selector).forEach((element) => {
            element.dataset.revealClass = className;
            revealObserver.observe(element);
        });
    });

    // Divisores que ainda pertencem ao layout antigo.
    const elementos = document.querySelectorAll('.animar');

    if (elementos.length) {
        const dividerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle('ativo', entry.isIntersecting);
            });
        });

        elementos.forEach((element) => dividerObserver.observe(element));
    }

    // =====================================================
    // V2 — CARREGAMENTO DOS MÓDULOS
    // =====================================================

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`);

            if (existing) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    // A navbar precisa ser carregada antes das interações de experiência.
    loadScript('navbar.js')
        .then(() => loadScript('projects-v2.js'))
        .catch((error) => console.error('Erro ao carregar módulos V2:', error));
})();
