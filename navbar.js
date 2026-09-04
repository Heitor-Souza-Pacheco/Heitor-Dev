const navbar = document.querySelector(".navbar-v2");
const navLinks = document.querySelectorAll(".nav-link");

if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const currentSection = entry.target.id;

            navLinks.forEach((link) => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${currentSection}`) {
                    link.classList.add("active");
                }
            });
        });
    },
    {
        threshold: 0.35
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});

const menuButton = document.querySelector(".nav-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");

        menuButton.classList.toggle("active", isOpen);
        menuButton.setAttribute("aria-expanded", isOpen);
    });

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            menuButton.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

// ========================================
// EXPERIENCE — SCROLL REVEAL
// ========================================

const experienceSection = document.querySelector(".experience");
const experienceIntro = document.querySelector(".experience-intro");
const experienceItems = document.querySelectorAll(".experience-item");

if (experienceSection) {
    // Ativa a linha da timeline assim que a seção começa a entrar na tela.
    const timelineObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    experienceSection.classList.add("visible");
                    timelineObserver.unobserve(experienceSection);
                }
            });
        },
        {
            threshold: 0.08
        }
    );

    timelineObserver.observe(experienceSection);
}

// A introdução entra deslizando quando chega ao viewport.
if (experienceIntro) {
    const introObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    experienceIntro.classList.add("is-visible");
                    introObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    introObserver.observe(experienceIntro);
}

// Cada experiência possui sua própria animação de entrada.
// Assim o segundo card só começa a deslizar quando realmente
// estiver chegando à área visível da tela.
if (experienceItems.length) {
    const itemObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    itemObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -6% 0px"
        }
    );

    experienceItems.forEach((item) => {
        itemObserver.observe(item);
    });
}
