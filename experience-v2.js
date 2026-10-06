(() => {
    const initExperience = () => {
        const section = document.querySelector('#experiencia');
        if (!section || section.dataset.experiencia-secaoInitialized === 'true') return;

        section.dataset.experiencia-secaoInitialized = 'true';

        const intro = section.querySelector('.experiencia-secao-intro');
        const items = [...section.querySelectorAll('.experiencia-secao-item')];
        const markers = [...section.querySelectorAll('.experiencia-secao-marker')];
        const detailsButton = section.querySelector('.experiencia-secao-details-button');

        const revealTargets = [
            { element: intro, delay: 0, y: 45 },
            ...items.map((element, index) => ({
                element,
                delay: index * 180,
                y: 75
            }))
        ].filter(target => target.element);

        const animateReveal = ({ element, delay, y }) => {
            element.animate(
                [
                    { opacity: 0, transform: `translate3d(0, ${y}px, 0)` },
                    { opacity: 1, transform: 'translate3d(0, 0, 0)' }
                ],
                {
                    duration: 1000,
                    delay,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    fill: 'both'
                }
            );
        };

        const animateMarker = (marker) => {
            marker.animate(
                [
                    { opacity: 0, transform: 'scale(.55)' },
                    { opacity: 1, transform: 'scale(1)' }
                ],
                {
                    duration: 650,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    fill: 'both'
                }
            );
        };

        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries, observerRef) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const target = revealTargets.find(item => item.element === entry.target);
                    if (!target) return;

                    section.classList.add('experiencia-secao-activated');
                    animateReveal(target);
                    observerRef.unobserve(entry.target);
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -8% 0px'
            });

            revealTargets.forEach(target => revealObserver.observe(target.element));

            const markerObserver = new IntersectionObserver((entries, observerRef) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    animateMarker(entry.target);
                    observerRef.unobserve(entry.target);
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -8% 0px'
            });

            markers.forEach(marker => markerObserver.observe(marker));
        } else {
            section.classList.add('experiencia-secao-activated');
            revealTargets.forEach(animateReveal);
            markers.forEach(animateMarker);
        }

        if (detailsButton) {
            const closeModal = () => {
                const modal = document.querySelector('.experiencia-secao-modal');
                if (!modal) return;

                modal.classList.remove('is-aberto');
                document.body.classList.remove('experiencia-secao-modal-aberto');
                setTimeout(() => modal.remove(), 250);
            };

            detailsButton.addEventListener('click', () => {
                if (document.querySelector('.experiencia-secao-modal')) return;

                const modal = document.createElement('div');
                modal.className = 'experiencia-secao-modal';
                modal.innerHTML = `
                    <div class="experiencia-secao-modal-backdrop" data-close-modal></div>
                    <div class="experiencia-secao-modal-dialog" role="dialog">
                        <button class="experiencia-secao-modal-close" type="button">×</button>
                        <span class="experiencia-secao-modal-label">EXPERIÊNCIA · 01</span>
                        <h3 id="experiencia-secao-modal-title">Drogaria Araújo</h3>
                        <p class="experiencia-secao-modal-role">Estagiário Técnico · Desenvolvimento Backend</p>
                        <div class="experiencia-secao-modal-content">
                            <p>Atuação em um ambiente profissional de desenvolvimento, contribuindo para a evolução e manutenção de uma API existente.</p>
                            <div class="experiencia-secao-modal-grid">
                                <div><span>01</span><strong>Desenvolvimento</strong><p>Implementação de novas funcionalidades e evolução de regras de negócio.</p></div>
                                <div><span>02</span><strong>Manutenção</strong><p>Análise e manutenção de funcionalidades de uma aplicação já existente.</p></div>
                                <div><span>03</span><strong>Integrações</strong><p>Contato com tecnologias e ferramentas utilizadas no ecossistema backend.</p></div>
                                <div><span>04</span><strong>Arquitetura</strong><p>Leitura e análise de uma API legada para compreender sua estrutura e funcionamento.</p></div>
                            </div>
                        </div>
                        <div class="experiencia-secao-modal-stack">
                            <span>Java</span><span>Spring Boot</span><span>SQL</span><span>Docker</span><span>Kafka</span><span>Tanzu</span><span>New Relic</span>
                        </div>
                    </div>`;

                document.body.appendChild(modal);
                document.body.classList.add('experiencia-secao-modal-aberto');

                requestAnimationFrame(() => modal.classList.add('is-aberto'));

                modal.querySelector('.experiencia-secao-modal-close').addEventListener('click', closeModal);
                modal.querySelector('[data-close-modal]').addEventListener('click', closeModal);

                const onKeydown = event => {
                    if (event.key !== 'Escape') return;
                    closeModal();
                    document.removeEventListener('keydown', onKeydown);
                };

                document.addEventListener('keydown', onKeydown);
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExperience, { once: true });
    } else {
        initExperience();
    }
})();