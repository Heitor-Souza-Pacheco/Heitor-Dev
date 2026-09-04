(() => {
    // ========================================
    // REVEAL ON SCROLL — elementos da versão antiga
    // Mantido temporariamente para as seções que ainda não
    // foram migradas para a nova identidade visual.
    // ========================================

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

    // ========================================
    // NAVEGAÇÃO LEGADA
    // Isolada em escopo próprio para não conflitar com navbar.js.
    // A nova navbar possui seu próprio sistema de navegação.
    // ========================================

    const legacySections = document.querySelectorAll("section");
    const legacyNavLinks = document.querySelectorAll(".navegacao");

    let activeSection = "";

    const observerMenu = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                activeSection = entry.target.getAttribute("id");

                legacyNavLinks.forEach((link) => {
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

    legacySections.forEach((section) => observerMenu.observe(section));

    legacyNavLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
            legacyNavLinks.forEach((item) => item.classList.remove("ativo"));
            link.classList.add("ativo");
        });

        link.addEventListener("mouseleave", () => {
            legacyNavLinks.forEach((item) => item.classList.remove("ativo"));

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

            document.body.style.overflow = menuMobile.classList.contains("ativo")
                ? "hidden"
                : "auto";
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

    // Divisores antigos que ainda usam a classe .animar.
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

    elementos.forEach((element) => observer.observe(element));
})();
