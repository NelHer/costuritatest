document.addEventListener("DOMContentLoaded", function () {
    async function loadContent(page) {
        try {
            const response = await fetch(`../web/${page}.html`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const content = await response.text();
            document.getElementById("content").innerHTML = content;
            loadStylesheet(`../css/${page}.css`);
        } catch (error) {
            console.error("Error fetching the content:", error);
            document.getElementById("content").innerHTML =
                "<p>Lo sentimos, no se pudo cargar el contenido.</p>";
        }
    }

    function loadStylesheet(filename) {
        let existingLink = document.getElementById("dynamic-stylesheet");
        if (existingLink) {
            existingLink.href = filename;
        } else {
            const link = document.createElement("link");
            link.id = "dynamic-stylesheet";
            link.rel = "stylesheet";
            link.href = filename;
            document.head.appendChild(link);
        }
    }

    document.oncontextmenu = function () {
        return false;
    };

    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links ul');
        navLinks.classList.toggle('active');
    }

    // Asignar el evento click al botón de menú hamburguesa
    document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);

    // Asignar el evento click a los enlaces del menú
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            const page = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            loadContent(page);
            const navLinks = document.querySelector('.nav-links ul');
            navLinks.classList.remove('active'); // Cerrar el menú desplegable
        });
    });
});
