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

// Adiciona a classe no frame seguinte ao observer.
// Isso garante que o navegador tenha tempo de renderizar
// o estado inicial antes de iniciar a animação.
const revealElement = (element, className) => {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            element.classList.add(className);
        });
    });
};

if (experienceSection) {
    const timelineObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    revealElement(experienceSection, "visible");
                    timelineObserver.unobserve(experienceSection);
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px -5% 0px"
        }
    );

    timelineObserver.observe(experienceSection);
}

if (experienceIntro) {
    const introObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    revealElement(experienceIntro, "is-visible");
                    introObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px -5% 0px"
        }
    );

    introObserver.observe(experienceIntro);
}

if (experienceItems.length) {
    const itemObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    revealElement(entry.target, "is-visible");
                    itemObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px -5% 0px"
        }
    );

    experienceItems.forEach((item) => {
        itemObserver.observe(item);
    });
}
