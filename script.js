document.addEventListener("DOMContentLoaded", () => {
  marcarEnlaceActivo();
  configurarMenuMovil();
  efectoTecleo();
  animarBarras();
});

function marcarEnlaceActivo() {
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((enlace) => {
    const destino = enlace.getAttribute("href");
    if (destino === pagina) {
      enlace.classList.add("active");
      enlace.setAttribute("aria-current", "page");
    }
  });
}

function configurarMenuMovil() {
  const boton = document.querySelector(".nav-toggle");
  const enlaces = document.querySelector(".nav-links");
  if (!boton || !enlaces) return;

  boton.addEventListener("click", () => {
    const abierto = enlaces.classList.toggle("open");
    boton.setAttribute("aria-expanded", String(abierto));
  });
}

function efectoTecleo() {
  const el = document.querySelector("[data-typing]");
  if (!el) return;

  const texto = el.dataset.typing;
  el.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  el.after(cursor);

  let i = 0;
  const escribir = () => {
    if (i <= texto.length) {
      el.textContent = texto.slice(0, i);
      i++;
      setTimeout(escribir, 28);
    }
  };
  escribir();
}

function animarBarras() {
  document.querySelectorAll(".bar > span").forEach((barra) => {
    const nivel = barra.dataset.nivel || "0";
    requestAnimationFrame(() => {
      barra.style.width = nivel + "%";
    });
  });
}