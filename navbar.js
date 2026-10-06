const navbar = document.querySelector(".barra-navegacao");
const navLinks = document.querySelectorAll(".link-navegacao");

if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("rolado", window.scrollY > 30);
    }, { passive: true });
}

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const currentSection = entry.target.id;

                navLinks.forEach((link) => {
                    const isActive = link.getAttribute("href") === `#${currentSection}`;
                    link.classList.toggle("ativo", isActive);
                    link.setAttribute("aria-current", isActive ? "page" : "false");
                });
            });
        },
        { threshold: 0.35 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
}

const menuButton = document.querySelector(".botao-menu-navegacao");
const mobileMenu = document.querySelector(".menu-mobile");
const mobileLinks = document.querySelectorAll(".link-mobile");

if (menuButton && mobileMenu) {
    const setMenuState = (isOpen) => {
        mobileMenu.classList.toggle("aberto", isOpen);
        menuButton.classList.toggle("ativo", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    };

    setMenuState(false);

    menuButton.addEventListener("click", () => {
        setMenuState(!mobileMenu.classList.contains("aberto"));
    });

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileMenu.classList.contains("aberto")) {
            setMenuState(false);
            menuButton.focus();
        }
    });
}
