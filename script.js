// ========================================
// REVEAL ON SCROLL — versão única e "one-shot"
// (antes eram 5 observers quase idênticos, e cada um
// desfazia a animação sempre que o elemento saía da tela.
// Isso fazia dezenas de elementos re-animarem blur+transform
// toda vez que a pessoa rolava a página pra cima ou pra baixo,
// o que causava o travamento. Agora cada elemento revela
// uma única vez e para de ser observado.)
const revealTargets = [
    { selector: '.hiden', className: 'show' },
    { selector: '.hiden2', className: 'show' },
    { selector: '.tituloAnima', className: 'tituloAnimaShow' },
    { selector: '.tituloAnima2', className: 'tituloAnimaShow' },
    { selector: '.tituloAnima3', className: 'tituloAnimaShow' },
];

const revealObserver = new IntersectionObserver((entries, observerRef) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const className = entry.target.dataset.revealClass;
            entry.target.classList.add(className);
            observerRef.unobserve(entry.target);
        }
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


// Parte de navegação
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navegacao");

let activeSection = "";

// Detecta section no scroll
const observerMenu = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            activeSection = entry.target.getAttribute("id");

            navLinks.forEach((link) => {
                link.classList.remove("ativo");

                if (link.getAttribute("href") === "#" + activeSection) {
                    link.classList.add("ativo");
                }
            });
        }
    });
}, {
    threshold: 0.6
});

sections.forEach((section) => observerMenu.observe(section));


// Efeito hover
navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        navLinks.forEach((l) => l.classList.remove("ativo"));
        link.classList.add("ativo");
    });

    link.addEventListener("mouseleave", () => {
        navLinks.forEach((l) => l.classList.remove("ativo"));

        const activeLink = document.querySelector(`a[href="#${activeSection}"]`);
        if (activeLink) {
            activeLink.classList.add("ativo");
        }
    });
});


const hamburguer = document.getElementById("menu-hamburguer");
const menuMobile = document.querySelector(".menu-mobile");

if (hamburguer && menuMobile) {
    hamburguer.addEventListener("click", function(event) {
        event.stopPropagation();
        this.classList.toggle("ativo");
        menuMobile.classList.toggle("ativo");

        if (menuMobile.classList.contains("ativo")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });

    const menuLinks = menuMobile.querySelectorAll("a");
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            hamburguer.classList.remove("ativo");
            menuMobile.classList.remove("ativo");
            document.body.style.overflow = "auto";
        });
    });

    document.addEventListener("click", function(event) {
        if (!menuMobile.contains(event.target) && !hamburguer.contains(event.target)) {
            hamburguer.classList.remove("ativo");
            menuMobile.classList.remove("ativo");
            document.body.style.overflow = "auto";
        }
    });
}


const elementos = document.querySelectorAll('.animar');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('ativo');
        } else {
            entry.target.classList.remove('ativo');
        }
    });
});

elementos.forEach((el) => observer.observe(el));

// Observação: a revelação da seção #experiencia (.experience) já é
// feita pelo navbar.js (que também anima cada card individualmente).
// Ter dois observers cuidando da mesma seção era redundante.