(() => {
    const section = document.querySelector('#contato');
    if (!section || section.dataset.contactV2Initialized === 'true') return;

    section.dataset.contactV2Initialized = 'true';

    const intro = section.querySelector('.contact-v2-intro');
    const form = section.querySelector('.contact-v2-form');

    if (!('IntersectionObserver' in window)) {
        section.classList.add('is-visible');
    } else {
        const observer = new IntersectionObserver((entries, observerRef) => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            section.classList.add('is-visible');
            observerRef.disconnect();
        }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

        observer.observe(section);
    }

    const formElement = section.querySelector('form');
    const status = section.querySelector('.contact-v2-status');

    formElement?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!status) return;

        status.textContent = 'Formulário preparado — configure o serviço de envio para receber mensagens.';
    });
})();