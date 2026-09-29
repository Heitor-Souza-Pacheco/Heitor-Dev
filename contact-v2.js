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


const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('input', function (e) {
  let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
  
  if (valor.length > 11) {
    valor = valor.slice(0, 11); // Limita o tamanho máximo
  }

  // Aplica a máscara dependendo do tamanho do número
  if (valor.length > 10) {
    // Formato para celular com 9 dígitos: (00) 00000-0000
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (valor.length > 5) {
    // Formato intermediário ou fixo: (00) 0000-0000
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else if (valor.length > 2) {
    // Formato com DDD: (00) 0000
    valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  } else if (valor.length > 0) {
    // Formato inicial: (00
    valor = valor.replace(/^(\d*)/, '($1');
  }

  e.target.value = valor;
});