// Seleccionamos los elementos de tu HTML
const btnSi = document.getElementById('btn-si');
const musica = document.getElementById('musicaFondo');

// Asumo que tienes un contenedor para la pregunta y otro para la carta
const contenedorPregunta = document.getElementById('contenedor-pregunta'); 
const contenedorCarta = document.getElementById('contenedor-carta');

// Evento al hacer clic en el botón "SÍ"
btnSi.addEventListener('click', () => {
    // 1. Reproducir la música
    musica.play();

    // 2. Ocultar la pregunta y mostrar la carta (la "3ra parte")
    contenedorPregunta.classList.add('oculto');
    contenedorCarta.classList.remove('oculto');

    // 3. Activar la lluvia de corazones
    crearLluviaCorazones();
});

// Función que crea los corazones
function crearLluviaCorazones() {
    // Crearemos 40 corazones con un pequeño retraso entre cada uno
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const corazon = document.createElement('div');
            corazon.classList.add('corazon');
            corazon.innerHTML = '❤️'; // Puedes cambiarlo por 💖 o 🥰

            // Posición aleatoria de izquierda a derecha (0% a 100% de la pantalla)
            corazon.style.left = Math.random() * 100 + 'vw';

            // Duración aleatoria para que unos caigan más rápido que otros (entre 2 y 5 segundos)
            corazon.style.animationDuration = Math.random() * 3 + 2 + 's';

            // Agregamos el corazón a la pantalla
            document.body.appendChild(corazon);

            // Limpieza: eliminamos el corazón de la memoria después de 5 segundos (cuando ya cayó)
            setTimeout(() => {
                corazon.remove();
            }, 5000); 

        }, i * 100); // Aparece un corazón nuevo cada 100 milisegundos
    }
}
