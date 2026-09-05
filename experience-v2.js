(() => {
    const initExperience = () => {
        const section = document.querySelector('#experiencia');
        if (!section || section.dataset.experienceInitialized === 'true') return;

        section.dataset.experienceInitialized = 'true';

        const intro = section.querySelector('.experience-intro');
        const items = [...section.querySelectorAll('.experience-item')];
        const markers = [...section.querySelectorAll('.experience-marker')];
        const detailsButton = section.querySelector('.experience-details-button');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!reducedMotion) section.classList.add('experience-reveal-pending');

        const animate = (element, keyframes, options) => {
            if (!element) return;
            if (reducedMotion) {
                element.style.opacity = '1';
                element.style.transform = 'none';
                return;
            }
            const animation = element.animate(keyframes, { fill: 'both', ...options });
            animation.finished.catch(() => {});
        };

        const playReveal = () => {
            if (section.dataset.experienceRevealed === 'true') return;
            section.dataset.experienceRevealed = 'true';
            section.classList.add('experience-activated');

            animate(intro, [
                { opacity: 0, transform: 'translate3d(0, 45px, 0)' },
                { opacity: 1, transform: 'translate3d(0, 0, 0)' }
            ], { duration: 950, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

            items.forEach((item, index) => {
                animate(item, [
                    { opacity: 0, transform: 'translate3d(0, 75px, 0)' },
                    { opacity: 1, transform: 'translate3d(0, 0, 0)' }
                ], {
                    duration: 1000,
                    delay: 180 + index * 220,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                });
            });

            markers.forEach((marker, index) => {
                animate(marker, [
                    { opacity: 0, transform: 'scale(.55)' },
                    { opacity: 1, transform: 'scale(1)' }
                ], {
                    duration: 600,
                    delay: 450 + index * 220,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                });
            });
        };

        if (reducedMotion) {
            playReveal();
        } else if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, observerRef) => {
                if (!entries.some(entry => entry.isIntersecting)) return;
                playReveal();
                observerRef.disconnect();
            }, { threshold: 0.01, rootMargin: '0px 0px -12% 0px' });
            observer.observe(section);
        } else {
            playReveal();
        }

        if (detailsButton) {
            const closeModal = () => {
                const modal = document.querySelector('.experience-modal');
                if (!modal) return;
                modal.classList.remove('is-open');
                document.body.classList.remove('experience-modal-open');
                setTimeout(() => modal.remove(), 250);
            };

            detailsButton.addEventListener('click', () => {
                if (document.querySelector('.experience-modal')) return;

                const modal = document.createElement('div');
                modal.className = 'experience-modal';
                modal.innerHTML = `
                    <div class="experience-modal-backdrop" data-close-modal></div>
                    <div class="experience-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="experience-modal-title">
                        <button class="experience-modal-close" type="button" aria-label="Fechar detalhes">×</button>
                        <span class="experience-modal-label">EXPERIÊNCIA · 01</span>
                        <h3 id="experience-modal-title">Drogaria Araújo</h3>
                        <p class="experience-modal-role">Estagiário Técnico · Desenvolvimento Backend</p>
                        <div class="experience-modal-content">
                            <p>Atuação em um ambiente profissional de desenvolvimento, contribuindo para a evolução e manutenção de uma API existente.</p>
                            <div class="experience-modal-grid">
                                <div><span>01</span><strong>Desenvolvimento</strong><p>Implementação de novas funcionalidades e evolução de regras de negócio.</p></div>
                                <div><span>02</span><strong>Manutenção</strong><p>Análise e manutenção de funcionalidades de uma aplicação já existente.</p></div>
                                <div><span>03</span><strong>Integrações</strong><p>Contato com tecnologias e ferramentas utilizadas no ecossistema backend.</p></div>
                                <div><span>04</span><strong>Arquitetura</strong><p>Leitura e análise de uma API legada para compreender sua estrutura e funcionamento.</p></div>
                            </div>
                        </div>
                        <div class="experience-modal-stack">
                            <span>Java</span><span>Spring Boot</span><span>SQL</span><span>Docker</span><span>Kafka</span><span>Tanzu</span><span>New Relic</span>
                        </div>
                    </div>`;

                document.body.appendChild(modal);
                document.body.classList.add('experience-modal-open');
                requestAnimationFrame(() => modal.classList.add('is-open'));

                modal.querySelector('.experience-modal-close').addEventListener('click', closeModal);
                modal.querySelector('[data-close-modal]').addEventListener('click', closeModal);

                const onKeydown = event => {
                    if (event.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', onKeydown);
                    }
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