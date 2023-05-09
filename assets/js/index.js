// obtener los elementos de cada sección
const saldoSection = document.getElementById('saldo-section');
const gastosSection = document.getElementById('gastos-section');
const totalSection = document.getElementById('total-section');

// Variables para el presupuesto
let presupuestoTotal = 0;
let saldo = 0;
let gastos = [];

// Selección de elementos del DOM
const presupuestoInput = document.getElementById("presupuesto-input");
const calcularBtn = document.getElementById("calcular-btn");
const saldoDiv = document.getElementById("saldo");
const gastosDiv = document.getElementById("gastos");
const agregarGastoForm = document.getElementById("agregar-gasto-form");

// Función para actualizar el saldo
const actualizarSaldo = () => {
  saldo = presupuestoTotal - gastos.reduce((total, gasto) => total + gasto.valor, 0);
  saldoDiv.textContent = `$ ${saldo.toFixed(2)}`;
};

// Función para actualizar los gastos
const actualizarGastos = () => {
  gastosDiv.innerHTML = "";
  gastos.forEach((gasto) => {
    const gastoDiv = document.createElement("div");
    gastoDiv.classList.add("gasto");
    gastoDiv.innerHTML = `
      <div class="gasto-nombre">${gasto.nombre}</div>
      <div class="gasto-valor">$ ${gasto.valor.toFixed(2)}</div>
      <div class="eliminar-gasto" data-id="${gasto.id}">
        <i class="fas fa-trash"></i>
      </div>
    `;
    gastosDiv.appendChild(gastoDiv);
  });
};

// Función para actualizar el presupuesto
const actualizarPresupuesto = () => {
  presupuestoTotal = parseFloat(presupuestoInput.value);
  document.getElementById("presupuesto").textContent = `$ ${presupuestoTotal.toFixed(2)}`;
};

// Evento para el botón de "calcular"
calcularBtn.addEventListener("click", () => {
  actualizarPresupuesto();
  actualizarSaldo();
});

// Evento para el formulario de agregar gastos
agregarGastoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nombreInput = document.getElementById("nombre-input");
  const valorInput = document.getElementById("valor-input");
  const nombre = nombreInput.value;
  const valor = parseFloat(valorInput.value);
  const id = new Date().valueOf().toString();
  gastos.push({ id, nombre, valor });
  actualizarGastos();
  actualizarSaldo();
  nombreInput.value = "";
  valorInput.value = "";
});

// Evento para el ícono de papelera
gastosDiv.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    const id = event.target.parentNode.getAttribute("data-id");
    gastos = gastos.filter((gasto) => gasto.id !== id);
    actualizarGastos();
    actualizarSaldo();
  }
});
