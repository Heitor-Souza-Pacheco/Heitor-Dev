(() => {
    const projectsSection = document.querySelector('#projetos');

    if (!projectsSection) {
        return;
    }

    if (!document.querySelector('link[data-projects-v2]')) {
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = 'CSS/v2-projects.css';
        stylesheet.dataset.projectsV2 = 'true';
        document.head.appendChild(stylesheet);
    }

    const projects = [
        {
            index: '01',
            type: 'BACKEND · REST API',
            name: 'HelpDesk API',
            role: 'Java / Spring Boot',
            image: 'https://raw.githubusercontent.com/Heitor-Souza-Pacheco/helpdesk-aplication/main/assets/helpdeskbanner.png',
            description: 'API REST para uma plataforma de perguntas e respostas, com autenticação e autorização utilizando JWT, gerenciamento de usuários e persistência de dados.',
            stack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'JPA', 'Hibernate', 'Docker'],
            repo: 'https://github.com/Heitor-Souza-Pacheco/helpdesk-aplication',
            featured: true
        },
        {
            index: '02',
            type: 'BACKEND · API REST',
            name: 'Academia API',
            role: 'Java / Spring Boot',
            image: 'https://raw.githubusercontent.com/Heitor-Souza-Pacheco/academia/main/assets/academiaapibanner.png',
            description: 'API REST para gerenciamento de academias, alunos, personal trainers e fichas de treino, com foco em segurança e regras de negócio.',
            stack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Maven'],
            repo: 'https://github.com/Heitor-Souza-Pacheco/academia',
            featured: false
        },
        {
            index: '03',
            type: 'BACKEND · API REST',
            name: 'App Rotina API',
            role: 'Java / Spring Boot',
            image: 'https://raw.githubusercontent.com/Heitor-Souza-Pacheco/appRotina-API/main/assets/approtinaapibanner.png',
            description: 'Backend de uma aplicação de organização de rotina, com tarefas, lembretes, notificações e acompanhamento de consistência através de Streak.',
            stack: ['Java', 'Spring Boot', 'REST API'],
            repo: 'https://github.com/Heitor-Souza-Pacheco/appRotina-API',
            featured: false
        }
    ];

    const cardMarkup = projects.map((project) => `
        <article class="project-v2-card${project.featured ? ' featured' : ''}">
            <a href="${project.repo}" target="_blank" rel="noopener noreferrer" aria-label="Abrir repositório ${project.name}">
                <div class="project-v2-media">
                    <img src="${project.image}" alt="Preview do projeto ${project.name}" loading="lazy">
                    <span class="project-v2-index">${project.index}</span>
                    <span class="project-v2-type">${project.type}</span>
                </div>
            </a>
            <div class="project-v2-body">
                <div class="project-v2-heading">
                    <div>
                        <h3>${project.name}</h3>
                        <p>${project.role}</p>
                    </div>
                    <a class="project-v2-arrow" href="${project.repo}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${project.name}">↗</a>
                </div>
                <p class="project-v2-copy">${project.description}</p>
                <div class="project-v2-stack">
                    ${project.stack.map((technology) => `<span>${technology}</span>`).join('')}
                </div>
                <div class="project-v2-footer">
                    <span class="project-v2-role">Projeto em destaque</span>
                    <a class="project-v2-link" href="${project.repo}" target="_blank" rel="noopener noreferrer">Ver no GitHub ↗</a>
                </div>
            </div>
        </article>
    `).join('');

    projectsSection.innerHTML = `
        <div class="projects-v2-header">
            <div>
                <span class="projects-v2-kicker">PROJETOS SELECIONADOS</span>
                <h2 class="projects-v2-title">Construindo <span>soluções.</span></h2>
            </div>
            <p class="projects-v2-description">
                Uma seleção de projetos com foco em backend, APIs REST,
                segurança, persistência de dados e regras de negócio.
            </p>
        </div>
        <div class="projects-v2-grid">
            ${cardMarkup}
        </div>
    `;

    const cards = projectsSection.querySelectorAll('.project-v2-card');
    const header = projectsSection.querySelector('.projects-v2-header');

    cards.forEach((card, index) => {
        card.style.setProperty('--project-delay', `${index * 140}ms`);

        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
        });
    });

    if (!('IntersectionObserver' in window)) {
        header?.classList.add('is-visible');
        cards.forEach((card) => card.classList.add('is-visible'));
        return;
    }

    const projectsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
    });

    if (header) {
        projectsObserver.observe(header);
    }

    cards.forEach((card) => projectsObserver.observe(card));
})();
