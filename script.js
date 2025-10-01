function mostrarRegistro() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("registro").style.display = "block";
  document.getElementById("login").style.display = "none";
}

function mostrarLogin() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("login").style.display = "block";
  document.getElementById("registro").style.display = "none";
}

function volverInicio() {
  document.getElementById("inicio").style.display = "block";
  document.getElementById("registro").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "none"; 
}

// Registro en LocalStorage
function registrar() {
  const nombre = document.getElementById("regNombre").value;
  const fecha = document.getElementById("regFecha").value;
  const apodo = document.getElementById("regApodo").value;
  const password = document.getElementById("regPassword").value;

  if (nombre && fecha && apodo && password) {
    const usuario = {
      nombre: nombre,
      fechaNacimiento: fecha,
      apodo: apodo,
      password: password
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    document.getElementById("mensajeRegistro").textContent = "✅ ¡Registro exitoso!";
    
    setTimeout(() => {
        mostrarLogin();
        document.getElementById("mensajeRegistro").textContent = ""; 
    }, 1500);

  } else {
    document.getElementById("mensajeRegistro").textContent = "❌ Por favor completa todos los campos.";
  }
}

// Login
function login() {
  const loginUsuario = document.getElementById("loginUsuario").value;
  const loginPassword = document.getElementById("loginPassword").value;
  const mensajeLogin = document.getElementById("mensajeLogin");

  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

  if (usuarioGuardado && loginUsuario === usuarioGuardado.nombre && loginPassword === usuarioGuardado.password) {
    mensajeLogin.textContent = "✨ ¡Bienvenido de nuevo, " + usuarioGuardado.apodo + "!";
    
    setTimeout(() => {
      document.getElementById("login").style.display = "none";
      document.getElementById("app").style.display = "block";
      document.getElementById("saludoUsuario").textContent = 'Hola, ' + usuarioGuardado.apodo;
      mensajeLogin.textContent = "";
    }, 1200);

  } else {
    mensajeLogin.textContent = "❌ Usuario o contraseña incorrectos.";
  }
}

// Cerrar Sesión
function cerrarSesion() {
    document.getElementById("app").style.display = "none";
    document.getElementById("inicio").style.display = "block";
    document.getElementById("loginUsuario").value = "";
    document.getElementById("loginPassword").value = "";
}

// ===== NUEVO CONTENIDO DINÁMICO =====

const retosMentales = [
    "Escribe 3 cosas por las que te sientas agradecido/a hoy.",
    "Dedica 5 minutos a respirar profundamente sin distracciones.",
    "Sal a caminar 10 minutos y concéntrate en los sonidos a tu alrededor.",
    "Envía un mensaje positivo a un amigo o familiar.",
    "Escucha tu canción favorita y permítete sentir la música.",
    "Ordena un pequeño espacio de tu habitación o escritorio.",
    "Dibuja o colorea algo, sin importar el resultado."
];

const ejercicioMeditacion = "<strong>Respiración Consciente (5 min):</strong> Siéntate en una posición cómoda y cierra los ojos. Inhala profundamente por la nariz contando hasta 4, sostén la respiración por 4 segundos y exhala lentamente por la boca contando hasta 6. Concéntrate únicamente en el aire que entra y sale de tu cuerpo. Si tu mente divaga, amablemente regresa tu atención a la respiración.";

const actividadesAnimo = [
    "Llama a un ser querido solo para saludar. La conexión social es un potente elevador del ánimo.",
    "Mira un video corto y divertido en internet. La risa libera endorfinas.",
    "Prepara tu bebida caliente favorita y disfrútala en silencio, saboreando cada sorbo.",
    "Baila una canción enérgica en tu habitación. Mover el cuerpo libera tensiones.",
    "Pasa unos minutos al aire libre, si es posible bajo el sol. La luz natural ayuda a regular el estado de ánimo."
];


// Lógica para los iconos desplegables (CON CAMBIOS)
document.addEventListener('DOMContentLoaded', () => {
    const iconos = document.querySelectorAll('.icono-3d');
    const paneles = document.querySelectorAll('.panel-contenido');

    iconos.forEach(icono => {
        icono.addEventListener('click', () => {
            const targetId = icono.dataset.target;
            const panelActivo = document.getElementById(targetId);

            // --- Lógica para cargar contenido dinámico ---
            if (targetId === 'panel-calendario') {
                // Poner la fecha actual
                const hoy = new Date();
                const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                document.getElementById('fecha-hoy').textContent = hoy.toLocaleDateString('es-ES', opcionesFecha);
                
                // Poner un reto aleatorio
                const reto = retosMentales[Math.floor(Math.random() * retosMentales.length)];
                document.getElementById('reto-diario').textContent = reto;

            } else if (targetId === 'panel-meditacion') {
                document.getElementById('ejercicio-meditacion').innerHTML = ejercicioMeditacion;

            } else if (targetId === 'panel-actividades') {
                const actividad = actividadesAnimo[Math.floor(Math.random() * actividadesAnimo.length)];
                document.getElementById('actividad-sugerida').textContent = actividad;
            }
            // --- Fin de la lógica de contenido ---

            iconos.forEach(i => i.classList.remove('activo'));
            
            paneles.forEach(panel => {
                if (panel.id !== targetId) {
                    panel.style.display = 'none';
                }
            });

            if (panelActivo.style.display === 'block') {
                panelActivo.style.display = 'none';
            } else {
                panelActivo.style.display = 'block';
                icono.classList.add('activo');
            }
        });
    });
});