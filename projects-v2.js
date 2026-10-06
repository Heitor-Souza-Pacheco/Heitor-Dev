(() => {
    const projectsSection = document.querySelector('#projetos');
    if (!projectsSection) return;

    const projects = [
        { index: '01', type: 'BACKEND · REST API', name: 'HelpDesk API', role: 'Java / Spring Boot', image: 'https://raw.githubusercontent.com/Heitor-Souza-Pacheco/helpdesk-aplication/main/assets/helpdeskbanner.png', description: 'API REST para uma plataforma de perguntas e respostas, com autenticação e autorização utilizando JWT, gerenciamento de usuários e persistência de dados.', stack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'JPA', 'Hibernate', 'Docker'], repo: 'https://github.com/Heitor-Souza-Pacheco/helpdesk-aplication', destaque: true },
        { index: '02', type: 'BACKEND · API REST', name: 'Academia API', role: 'Java / Spring Boot', image: 'https://raw.githubusercontent.com/Heitor-Souza-Pacheco/academia/main/assets/academiaapibanner.png', description: 'API REST para gerenciamento de academias, alunos, personal trainers e fichas de treino, com foco em segurança e regras de negócio.', stack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Maven'], repo: 'https://github.com/Heitor-Souza-Pacheco/academia', destaque: false },
        { index: '03', type: 'BACKEND · API REST', name: 'App Rotina API', role: 'Java / Spring Boot', image: 'https://raw.githubusercontent.com/Heitor-Souza-Pacheco/appRotina-API/main/assets/approtinaapibanner.png', description: 'Backend de uma aplicação de organização de rotina, com tarefas, lembretes, notificações e acompanhamento de consistência através de Streak.', stack: ['Java', 'Spring Boot', 'REST API'], repo: 'https://github.com/Heitor-Souza-Pacheco/appRotina-API', destaque: false }
    ];

    projectsSection.innerHTML = `
        <div class="cabecalho-projetos">
            <div><span class="destaque-projetos">PROJETOS SELECIONADOS</span><h2 class="titulo-projetos">Construindo <span>soluções.</span></h2></div>
            <p class="descricao-projetos">Uma seleção de projetos com foco em backend, APIs REST, segurança, persistência de dados e regras de negócio.</p>
        </div>
        <div class="grade-projetos">
            ${projects.map((project) => `
                <article class="cartao-projeto${project.destaque ? ' destaque' : ''}">
                    <div class="cartao-projeto-reveal">
                        <a href="${project.repo}" target="_blank" rel="noopener noreferrer">
                            <div class="midia-projeto"><img src="${project.image}" alt="Preview do projeto ${project.name}" loading="lazy"><span class="indice-projeto">${project.index}</span><span class="tipo-projeto">${project.type}</span></div>
                        </a>
                        <div class="corpo-projeto">
                            <div class="cabecalho-projeto"><div><h3>${project.name}</h3><p>${project.role}</p></div><a class="seta-projeto" href="${project.repo}" target="_blank" rel="noopener noreferrer">↗</a></div>
                            <p class="descricao-cartao-projeto">${project.description}</p>
                            <div class="tecnologias-projeto">${project.stack.map((technology) => `<span>${technology}</span>`).join('')}</div>
                            <div class="rodape-projeto"><span class="funcao-projeto">Projeto em destaque</span><a class="link-projeto" href="${project.repo}" target="_blank" rel="noopener noreferrer">Ver no GitHub ↗</a></div>
                        </div>
                    </div>
                </article>
            `).join('')}
        </div>
    `;

    const header = projectsSection.querySelector('.cabecalho-projetos');
    const cards = [...projectsSection.querySelectorAll('.cartao-projeto')];
    const revealTargets = cards.map(card => card.querySelector('.cartao-projeto-reveal')).filter(Boolean);

    const reveal = (element, delay = 0) => {
        if (!element || element.dataset.revealed === 'true') return;

        element.dataset.revealed = 'true';

        const animation = element.animate(
            [
                { opacity: 0, transform: 'translate3d(0, 90px, 0) scale(.96)' },
                { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
            ],
            {
                duration: 950,
                delay,
                easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                fill: 'both'
            }
        );

        animation.finished.then(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate3d(0, 0, 0) scale(1)';
            element.style.willChange = 'auto';
        }).catch(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate3d(0, 0, 0) scale(1)';
        });
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observerRef) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const delay = Number(entry.target.dataset.projectDelay || 0);
                reveal(entry.target, delay);
                observerRef.unobserve(entry.target);
            });
        }, {
            threshold: 0.01,
            rootMargin: '0px 0px -12% 0px'
        });

        if (header) observer.observe(header);

        revealTargets.forEach((target, index) => {
            target.dataset.projectDelay = String(index * 180);
            observer.observe(target);
        });
    } else {
        if (header) reveal(header);

        revealTargets.forEach((target, index) => {
            reveal(target, index * 180);
        });
    }

    cards.forEach((card) => {
        const revealLayer = card.querySelector('.cartao-projeto-reveal');
        if (!revealLayer) return;

        card.style.setProperty('--card-rotate-x', '0deg');
        card.style.setProperty('--card-rotate-y', '0deg');

        const resetHover = () => {
            card.style.setProperty('--card-rotate-x', '0deg');
            card.style.setProperty('--card-rotate-y', '0deg');
            revealLayer.style.setProperty('--mouse-x', '50%');
            revealLayer.style.setProperty('--mouse-y', '50%');
            card.classList.remove('em-hover');
        };

        card.addEventListener('pointerenter', (event) => {
            if (event.pointerType === 'touch') return;
            card.classList.add('em-hover');
        });

        card.addEventListener('pointermove', (event) => {
            if (event.pointerType === 'touch') return;

            const rect = revealLayer.getBoundingClientRect();
            const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
            const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);

            const normalizedX = x / rect.width;
            const normalizedY = y / rect.height;

            revealLayer.style.setProperty('--mouse-x', `${x}px`);
            revealLayer.style.setProperty('--mouse-y', `${y}px`);

            card.style.setProperty('--card-rotate-x', `${(0.5 - normalizedY) * 4.5}deg`);
            card.style.setProperty('--card-rotate-y', `${(normalizedX - 0.5) * 6}deg`);
            card.classList.add('em-hover');
        });

        card.addEventListener('pointerleave', resetHover);
        card.addEventListener('pointercancel', resetHover);
    });
})();
