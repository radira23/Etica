// Lista de clasificación correcta para cada escenario
const correctClassification = {
    scenario1: "unethical",
    scenario2: "ethical",
    scenario3: "unethical",
    scenario4: "ethical",
    scenario5: "ethical",
    scenario6: "unethical",
    scenario7: "ethical",
    scenario8: "unethical",
    scenario9: "unethical",
    scenario10: "ethical",
    scenario11: "unethical",
    scenario12: "ethical",
    scenario13: "ethical",
    scenario14: "unethical",
    scenario15: "unethical",
    scenario16: "ethical",
    scenario17: "ethical",
    scenario18: "unethical",
    scenario19: "ethical",
    scenario20: "unethical"
};

// Permitir que los elementos se arrastren y se suelten en el contenedor
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

// Función para verificar si los elementos están en el contenedor correcto
function checkClassification() {
    let correct = true;
    
    // Obtener los elementos en el contenedor de escenarios éticos
    const ethicalContainer = document.getElementById("ethical");
    const ethicalItems = ethicalContainer.getElementsByTagName("p");

    // Verificar que los elementos en el contenedor de escenarios éticos tengan ID impar
    for (let item of ethicalItems) {
        if (parseInt(item.id.replace("scenario", "")) % 2 === 0) {
            item.style.backgroundColor = "red"; // Marcar incorrecto
            correct = false;
        } else {
            item.style.backgroundColor = "lightgreen"; // Marcar correcto
        }
    }

    // Obtener los elementos en el contenedor de escenarios no éticos
    const unethicalContainer = document.getElementById("unethical");
    const unethicalItems = unethicalContainer.getElementsByTagName("p");

    // Verificar que los elementos en el contenedor de escenarios no éticos tengan ID par
    for (let item of unethicalItems) {
        if (parseInt(item.id.replace("scenario", "")) % 2 !== 0) {
            item.style.backgroundColor = "red"; // Marcar incorrecto
            correct = false;
        } else {
            item.style.backgroundColor = "lightgreen"; // Marcar correcto
        }
    }

    // Mostrar mensaje de verificación
    if (correct) {
        alert("¡Todos los escenarios están correctamente clasificados!");
    } else {
        alert("Algunos escenarios están en el contenedor incorrecto. Revisa los elementos en rojo.");
    }
}

// Función para limpiar los escenarios y devolverlos a su posición original
function resetScenarios() {
    const scenariosContainer = document.querySelector(".scenarios");

    // Mover todos los elementos de vuelta al contenedor original
    const items = document.querySelectorAll(".scenarios p, #ethical p, #unethical p");
    items.forEach(item => {
        item.style.backgroundColor = ""; // Restaurar color de fondo
        scenariosContainer.appendChild(item); // Mover al contenedor original
        item.style.display = "none"; // Ocultar los elementos nuevamente
    });
    document.getElementById("currentScenario").innerHTML = ""; // Limpiar el área de visualización
    currentScenario = null;
}

// Nueva función para obtener un escenario aleatorio
let scenarios = Array.from(document.querySelectorAll('.scenarios p'));
let currentScenario = null;

function getNextScenario() {
    // Si hay un escenario actualmente seleccionado y ya fue movido, mantenerlo en su lugar
    if (currentScenario && (currentScenario.parentElement.id === 'ethical' || currentScenario.parentElement.id === 'unethical')) {
        currentScenario = null;
    }

    // Obtener un escenario aleatorio que aún esté en el contenedor original
    const remainingScenarios = scenarios.filter(scenario => scenario.parentElement.className === 'scenarios');

    if (remainingScenarios.length === 0) {
        alert("¡Todos los escenarios ya han sido clasificados!");
        return;
    }
    
    currentScenario = remainingScenarios[Math.floor(Math.random() * remainingScenarios.length)];
    currentScenario.style.display = 'block'; // Mostrar el escenario seleccionado
    document.getElementById('currentScenario').appendChild(currentScenario);
    currentScenario.style.backgroundColor = ''; // Restablece el fondo
}
