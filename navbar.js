const navbar = document.querySelector(".navbar-v2");
const navLinks = document.querySelectorAll(".nav-link");

if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 30);
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
                    link.classList.toggle("active", isActive);
                    link.setAttribute("aria-current", isActive ? "page" : "false");
                });
            });
        },
        { threshold: 0.35 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
}

const menuButton = document.querySelector(".nav-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

if (menuButton && mobileMenu) {
    const setMenuState = (isOpen) => {
        mobileMenu.classList.toggle("open", isOpen);
        menuButton.classList.toggle("active", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    };

    setMenuState(false);

    menuButton.addEventListener("click", () => {
        setMenuState(!mobileMenu.classList.contains("open"));
    });

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
            setMenuState(false);
            menuButton.focus();
        }
    });
}
