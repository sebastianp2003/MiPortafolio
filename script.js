$(function () {
  marcarEnlaceActivo();
  configurarMenuMovil();
  efectoTecleo();
  animarBarras();
  animarEntrada();
  configurarFormularioContacto();
});

// Resalta en el menú el enlace de la página actual
function marcarEnlaceActivo() {
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  $(".nav-link").each(function () {
    const destino = $(this).attr("href");
    if (destino === pagina) {
      $(this).addClass("active").attr("aria-current", "page");
    }
  });
}

// El botón hamburguesa lo maneja Bootstrap (data-bs-toggle="collapse");
// aquí solo cerramos el menú al tocar un enlace, para que no quede abierto.
function configurarMenuMovil() {
  $(".nav-link").on("click", function () {
    const $menu = $("#menuPrincipal");
    if ($menu.hasClass("show")) {
      $menu.collapse("hide");
    }
  });
}

// Efecto de "máquina de escribir" en el tagline del hero
function efectoTecleo() {
  const $el = $("[data-typing]");
  if ($el.length === 0) return;

  const texto = $el.data("typing");
  $el.text("");
  $el.after('<span class="cursor"></span>');

  let i = 0;
  const escribir = () => {
    if (i <= texto.length) {
      $el.text(texto.slice(0, i));
      i++;
      setTimeout(escribir, 28);
    }
  };
  escribir();
}

// Anima las barras de nivel de habilidad hasta su ancho final
function animarBarras() {
  $(".progress-terminal .progress-bar").each(function () {
    const nivel = $(this).data("nivel") || 0;
    $(this).attr("aria-valuenow", nivel);
    requestAnimationFrame(() => {
      $(this).css("width", nivel + "%");
    });
  });
}

// Una sola entrada suave para los paneles principales al cargar la página
function animarEntrada() {
  $(".panel.fade-target").each(function (i) {
    $(this)
      .delay(i * 90)
      .animate({ opacity: 1 }, 400)
      .css({ transform: "translateY(0)", transition: "transform 0.4s ease" });
  });
}

// Validación del formulario de contacto (sin recargar la página)
function configurarFormularioContacto() {
  const $form = $("#form-contacto");
  if ($form.length === 0) return;

  const $nombre = $("#nombre");
  const $email = $("#email");
  const $mensaje = $("#mensaje");
  const $toast = $("#toast");

  const reglas = {
    nombre: {
      valido: (valor) => valor.trim().length >= 3,
      error: "Escribe tu nombre completo (mínimo 3 caracteres).",
    },
    email: {
      valido: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),
      error: "Ingresa un correo válido, por ejemplo nombre@dominio.com.",
    },
    mensaje: {
      valido: (valor) => valor.trim().length >= 10,
      error: "Cuéntame un poco más (mínimo 10 caracteres).",
    },
  };

  function validarCampo($campo, regla) {
    const valor = $campo.val();
    const esValido = regla.valido(valor);
    $campo.toggleClass("is-invalid", !esValido);
    $campo.toggleClass("is-valid", esValido);
    $campo.next(".invalid-feedback-terminal").text(esValido ? "" : regla.error);
    return esValido;
  }

  // Valida cada campo mientras el usuario escribe, después del primer intento de envío
  $nombre.on("input", () => validarCampo($nombre, reglas.nombre));
  $email.on("input", () => validarCampo($email, reglas.email));
  $mensaje.on("input", () => validarCampo($mensaje, reglas.mensaje));

  $form.on("submit", function (evento) {
    evento.preventDefault();

    const nombreOk = validarCampo($nombre, reglas.nombre);
    const emailOk = validarCampo($email, reglas.email);
    const mensajeOk = validarCampo($mensaje, reglas.mensaje);

    if (!nombreOk || !emailOk || !mensajeOk) {
      $toast
        .removeClass("text-success")
        .addClass("text-danger")
        .text("Revisa los campos marcados en rojo antes de enviar.");
      return;
    }

    // Aquí no hay backend: solo confirmamos visualmente el envío.
    $toast
      .removeClass("text-danger")
      .addClass("text-success")
      .text(`¡Gracias, ${$nombre.val().trim()}! Tu mensaje quedó registrado.`);

    $form[0].reset();
    $form.find(".is-valid").removeClass("is-valid");
  });
}