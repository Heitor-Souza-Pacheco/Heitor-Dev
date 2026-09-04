const hero = document.querySelector(".hero");
const heroGlow = document.querySelector(".hero-glow");

if (hero && heroGlow) {

    hero.addEventListener("mousemove", (event) => {

        const rect = hero.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        heroGlow.style.left = `${x}px`;
        heroGlow.style.top = `${y}px`;

        hero.style.setProperty("--mouse-x", `${x}px`);
        hero.style.setProperty("--mouse-y", `${y}px`);

    });

}