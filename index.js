'use strict';

// Discos:
let disco = {};
let todos_los_discos = [];
let nombreDisco, autor, codigo, nombre_cancion, duracion;
let pistas = [];
let cancion = {};


// Función Cargar:
function cargar () {
    do {

        let validador = true;

        do {
            nombreDisco = prompt("Ingresa el nombre del disco.");

            if (nombreDisco == null) {
                return
            } else if (!isNaN(nombreDisco)) {
                alert("Por favor ingresa un nombre válido para el disco.");
                validador = false;
            } else {
                validador = true;
                disco.nombre_disco = nombreDisco;
            }
        } while (!validador);

        do {
            autor = prompt("Ingresa el nombre del autor o la banda.");

            if (autor == null) {
                disco = [];
                return
            } else if (!isNaN(autor)) {
                alert("Por favor ingresa un nombre válido del autor o la banda.");
                validador = false;
            } else {
                validador = true;
                disco.autor = autor;
            }
        } while (!validador);

        do {
            codigo = parseInt(prompt("Ingresa el código del disco."));

            for (let i in disco) {
                if (disco[i] === codigo) {
                    alert("Este código ya existe.")
                    codigo = NaN;
                }
            }
            if (isNaN(codigo) || !(codigo >= 1 && codigo <= 999)) {
                alert("Por favor ingresa un código válido. Deben ser números entre 1 y 999.");
                validador = false;
            } else {
                validador = true;
                disco.codigo = codigo;
            }
        } while (!validador);

        cargarCancion ();

        todos_los_discos.push(disco);

        disco = {};

        pistas = [];
    } while (confirm("¿Quieres ingresar otro disco?"));
}

function cargarCancion () {
    do {
        let validador = true;

        do {
            nombre_cancion = prompt("Ingresa el nombre la canción.");

            if (nombre_cancion == null) {
                return
            } else if (!isNaN(nombre_cancion)) {
                alert("Por favor ingresa un nombre válido para la canción.");
                validador = false;
            } else {
                validador = true;
                cancion.nombre_cancion = nombre_cancion;
            }
        } while (!validador);
        
        do {
            duracion = prompt("Ingresa la duración de la pista (Entre 0 y 7200 segundos)");

            if (isNaN(duracion) || !(duracion >= 0 && duracion <= 7200)) {
                alert("Por favor ingresa una duración válida. Deben ser números entre 0 y 7200 segundos.");
                validador = false;
            } else {
                validador = true;
                cancion.duracion = duracion;
            }
        } while (!validador);

        pistas.push(cancion);

        disco.pistas = pistas;

        cancion = {};
    } while (confirm("¿Quieres ingresar otra canción?"));
}

// Función Mostrar:
function mostrar () {
    quitarAnimacion();

    let div_padre = document.getElementById("info");
    
    for (let i of todos_los_discos) {
        let div_interno = "<div>";

        let contenido1 = `
            <ul class="padre">
                <li>${i.nombre_disco}</li>
                <li>Autor: ${i.autor}</li>
                <li>Código: ${i.codigo}</li>
                <li>_____ Canciones:</li>
        `;

        div_interno += contenido1;

        for (let j of i.pistas) {
            if (j.duracion >= 180) {
                let contenido2 = `
                    <li>Nomnbre canción: ${j.nombre_cancion}</li>
                    <li class="rojo">duración: ${j.duracion}</li>
                `;
                div_interno += contenido2;    
            } else {
                let contenido2 = `
                    <li>Nomnbre canción: ${j.nombre_cancion}</li>
                    <li>duración: ${j.duracion}</li>
                `;
                div_interno += contenido2;
            }
        }

        div_interno += "</ul>";
    
        div_interno += "</div>";

        div_padre.innerHTML += div_interno;
    }

    todos_los_discos = [];
}

function quitarAnimacion () {
    let div_animacion;

    if (todos_los_discos.length >= 1) {
        div_animacion = document.getElementById("animacion").style.display = "none";
    } else {
        alert("Aún no has agregado ningún disco");
    }
}