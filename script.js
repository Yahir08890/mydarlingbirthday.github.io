const btnSiguiente = document.getElementById('btn-siguiente');
        const pantallaLyrics = document.getElementById('pantalla-lyrics');
        const letrasScroll = document.getElementById('letras-scroll');

        // Cuando le da a "Sí", solo mostramos la carta y los corazones (SIN música aún)
        btnSi.addEventListener('click', () => {
            pantallaInicial.classList.add('oculto');
            pantallaCarta.classList.remove('oculto');
            crearLluviaCorazones();
        });

        // Cuando le da al botón "Siguiente" en la carta
        btnSiguiente.addEventListener('click', () => {
            pantallaCarta.classList.add('oculto');
            pantallaLyrics.classList.remove('oculto');
            
            // Aquí reproducimos la música
            if (musica) {
                musica.play().catch(e => console.log("Audio play blocked"));
                iniciarLetras(); // Arrancamos la animación de la letra
            }
        });

        // ---------------------------------------------------------
        // BASE DE DATOS DE LA LETRA (Busca la letra en Google y pégala aquí)
        // El 'tiempo' es el SEGUNDO exacto en el que empieza a cantar esa frase
        // ---------------------------------------------------------
        const letrasCancion = [
            { tiempo: 0, texto: "🎶 (Música) 🎶" },
            { tiempo: 12.5, texto: "Dame un beso que me dure hasta el lunes" },
            { tiempo: 16.0, texto: "Que me llene de luz y que me quite el estrés" },
            // Agrega el resto de las líneas aquí abajo...
        ];

        function iniciarLetras() {
            // 1. Inyectar las letras en el HTML
            letrasCancion.forEach((linea, index) => {
                let p = document.createElement('p');
                p.classList.add('linea-letra');
                p.id = 'linea-' + index;
                p.innerText = linea.texto;
                letrasScroll.appendChild(p);
            });

            // 2. Escuchar el tiempo de la canción
            musica.addEventListener('timeupdate', () => {
                let tiempoActual = musica.currentTime;
                
                for (let i = 0; i < letrasCancion.length; i++) {
                    let tiempoLinea = letrasCancion[i].tiempo;
                    let tiempoSiguiente = (i < letrasCancion.length - 1) ? letrasCancion[i+1].tiempo : 9999;

                    // Si la canción está en el tiempo de esta frase
                    if (tiempoActual >= tiempoLinea && tiempoActual < tiempoSiguiente) {
                        resaltarLinea(i);
                        break;
                    }
                }
            });
        }

        let indiceActual = -1;
        function resaltarLinea(index) {
            if (indiceActual === index) return;
            indiceActual = index;

            // Quitar el brillo a todas las letras
            document.querySelectorAll('.linea-letra').forEach(el => el.classList.remove('activa'));
            
            // Ponerle brillo a la letra actual
            let lineaActiva = document.getElementById('linea-' + index);
            if (lineaActiva) {
                lineaActiva.classList.add('activa');
                
                // Hacer scroll automático para que la letra quede en el centro de la pantalla
                lineaActiva.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // Tus otras funciones (como crearLluviaCorazones y btnRevelar) se quedan exactamente igual abajo de esto.
