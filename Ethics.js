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

// Función para manejar el envío del formulario
function submitInfo(event) {
    event.preventDefault(); // Prevenir recarga de página

    const studentName = document.getElementById('student-name').value;
    const studentGroup = document.getElementById('student-group').value;

    const greeting = document.getElementById('greeting');
    greeting.textContent = `¡Hola, ${studentName} del grupo ${studentGroup}! Bienvenido a la actividad.`;

    // Ocultar formulario después de enviar
    document.getElementById('student-info').style.display = 'none';
}

// Funciones de arrastrar y soltar
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

// Función para verificar si los elementos están en el contenedor correcto
function checkClassification() {
    let correct = true;

    const ethicalContainer = document.getElementById("ethical");
    const ethicalItems = ethicalContainer.getElementsByTagName("p");

    for (let item of ethicalItems) {
        if (correctClassification[item.id] !== "ethical") {
            item.style.backgroundColor = "red";
            correct = false;
        } else {
            item.style.backgroundColor = "lightgreen";
        }
    }

    const unethicalContainer = document.getElementById("unethical");
    const unethicalItems = unethicalContainer.getElementsByTagName("p");

    for (let item of unethicalItems) {
        if (correctClassification[item.id] !== "unethical") {
            item.style.backgroundColor = "red";
            correct = false;
        } else {
            item.style.backgroundColor = "lightgreen";
        }
    }

    if (correct) {
        alert("¡Todos los escenarios están correctamente clasificados!");
    } else {
        alert("Algunos escenarios están en el contenedor incorrecto. Revisa los elementos en rojo.");
    }
}

// Función para limpiar los escenarios y devolverlos a su posición original
function resetScenarios() {
    const scenariosContainer = document.querySelector(".scenarios");

    const items = document.querySelectorAll(".scenarios p, #ethical p, #unethical p");
    items.forEach(item => {
        item.style.backgroundColor = "";
        scenariosContainer.appendChild(item);
        item.style.display = "block";
    });

    document.getElementById("currentScenario").innerHTML = "";
}

// Función para obtener un escenario aleatorio
let scenarios = Array.from(document.querySelectorAll('.scenarios p'));
let currentScenario = null;

function getNextScenario() {
    if (currentScenario && (currentScenario.parentElement.id === 'ethical' || currentScenario.parentElement.id === 'unethical')) {
        currentScenario = null;
    }

    const remainingScenarios = scenarios.filter(scenario => scenario.parentElement.className === 'scenarios');

    if (remainingScenarios.length === 0) {
        alert("¡Todos los escenarios ya han sido clasificados!");
        return;
    }

    currentScenario = remainingScenarios[Math.floor(Math.random() * remainingScenarios.length)];
    currentScenario.style.display = 'block';
    document.getElementById('currentScenario').appendChild(currentScenario);
    currentScenario.style.backgroundColor = '';
}
