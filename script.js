const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const elements = document.querySelectorAll('.hiden');
elements.forEach((element) => myObserver.observe(element));


const myObserver2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const elements2 = document.querySelectorAll('.hiden2');
elements2.forEach((element) => myObserver2.observe(element));


const myObserver3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('tituloAnimaShow');
        } else {
            entry.target.classList.remove('tituloAnimaShow');
        }
    });
});

const elements3 = document.querySelectorAll('.tituloAnima');
elements3.forEach((element) => myObserver3.observe(element));


const myObserver4 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('tituloAnimaShow');
        } else {
            entry.target.classList.remove('tituloAnimaShow');
        }
    });
});

const elements4 = document.querySelectorAll('.tituloAnima2');
elements4.forEach((element) => myObserver4.observe(element));


const myObserver5 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('tituloAnimaShow');
        } else {
            entry.target.classList.remove('tituloAnimaShow');
        }
    });
});

const elements5 = document.querySelectorAll('.tituloAnima3');
elements5.forEach((element) => myObserver5.observe(element));


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


// ========================================
// EXPERIENCE — SCROLL REVEAL
// ========================================

const experienceSection = document.querySelector('.experience');

if (experienceSection) {
    // A classe só ativa o estado inicial da animação.
    // Sem JavaScript, a seção continua visível normalmente.
    experienceSection.classList.add('animate-ready');

    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                experienceSection.classList.add('visible');
                experienceObserver.unobserve(experienceSection);
            }
        });
    }, {
        threshold: 0.2
    });

    experienceObserver.observe(experienceSection);
}
