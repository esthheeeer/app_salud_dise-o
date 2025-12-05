/* ======================================================
   SETTINGS.JS – APLICACIÓN DE AJUSTES DE ACCESIBILIDAD
   ====================================================== */

/* ---------- TEMA CLARO / OSCURO ---------- */
function applyTheme(theme) {
    if (theme === "Oscuro") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

function initThemeSelector() {
    const radios = document.querySelectorAll('input[name="theme-selector"]');

    let savedTheme = localStorage.getItem("theme") || "Claro";
    applyTheme(savedTheme);

    radios.forEach(radio => {
        if (radio.value === savedTheme) radio.checked = true;

        radio.addEventListener("change", () => {
            localStorage.setItem("theme", radio.value);
            applyTheme(radio.value);
        });
    });
}

/* ---------- TAMAÑO DEL TEXTO ---------- */
function initFontSize() {
    const slider = document.querySelector('input[type="range"]');
    if (!slider) return;

    const savedSize = localStorage.getItem("fontSize") || "3";
    slider.value = savedSize;

    const baseSize = 16; // tamaño normal original

    if (savedSize === "3") {
        document.documentElement.style.fontSize = ""; // vuelve al tamaño natural
    } else {
        const scale = (savedSize - 3) * 2; 
        document.documentElement.style.fontSize = `${baseSize + scale}px`;
    }


    slider.addEventListener("input", () => {
        localStorage.setItem("fontSize", slider.value);
        if (slider.value === "3") {
            document.documentElement.style.fontSize = "";
        } else {
            const base = 16;
            const scale = (slider.value - 3) * 2;
            document.documentElement.style.fontSize = `${base + scale}px`;
        }

    });
}

/* ---------- SWITCHES GENERALES ---------- */
function initSwitches() {
    const switches = document.querySelectorAll('input[type="checkbox"]');

    switches.forEach((sw, index) => {
        const key = "switch_" + index;
        let saved = localStorage.getItem(key);

        if (saved !== null) sw.checked = saved === "true";

        sw.addEventListener("change", () => {
            localStorage.setItem(key, sw.checked);
        });
    });
}

/* ---------- INICIALIZACIÓN GENERAL ---------- */
document.addEventListener("DOMContentLoaded", () => {
    initThemeSelector();
    initFontSize();
    initSwitches();
});
