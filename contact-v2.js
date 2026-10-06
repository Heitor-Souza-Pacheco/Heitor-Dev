(() => {
    const section = document.querySelector('#contato');
    if (!section || section.dataset.contactV2Initialized === 'true') return;

    section.dataset.contactV2Initialized = 'true';

    const intro = section.querySelector('.contato-v2-intro');
    const form = section.querySelector('.contato-v2-form');

    if (!('IntersectionObserver' in window)) {
        section.classList.add('is-visivel');
    } else {
        const observer = new IntersectionObserver((entries, observerRef) => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            section.classList.add('is-visivel');
            observerRef.disconnect();
        }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

        observer.observe(section);
    }

    const formElement = section.querySelector('form');
    const status = section.querySelector('.contato-v2-status');

    formElement?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!status) return;

        status.textContent = 'Formulário preparado — configure o serviço de envio para receber mensagens.';
    });
})();


const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('input', function (e) {
  let valor = e.target.value.replace(/\D/g, ''); 
  
  if (valor.length > 11) {
    valor = valor.slice(0, 11); 
  }

  
  if (valor.length > 10) {
    
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (valor.length > 5) {
    
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else if (valor.length > 2) {
    
    valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
  } else if (valor.length > 0) {
    
    valor = valor.replace(/^(\d*)/, '($1');
  }

  e.target.value = valor;
});