
let presupuesto = 0;
let gastos = [];
const presupuestoForm = document.getElementById('presupuesto-form');
const gastoForm = document.getElementById('gasto-form');
const presupuestoTd = document.getElementById('presupuesto-td');
const gastoTd = document.getElementById('gasto-td');
const saldoTd = document.getElementById('saldo-td');
const tablaGastos = document.getElementById('tabla-gastos');

presupuestoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  presupuesto = Number(document.getElementById('presupuesto').value);
  presupuestoTd.innerHTML = presupuesto;
  saldoTd.innerHTML = presupuesto;
  actualizarPresupuesto();
  presupuestoForm.reset();
});

gastoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const gasto = document.getElementById('gasto').value;
  const valor = Number(document.getElementById('valor').value);
  const saldo = Number(saldoTd.innerHTML);
  if (saldo < valor) {
    alert('No tiene suficiente dinero para realizar este gasto');
  } else {
    const nuevoGasto = { gasto, valor };
    gastos.push(nuevoGasto);
    actualizarTablaGastos();
    actualizarSaldo(valor);
    gastoForm.reset();
  }
});

function actualizarTablaGastos() {
  tablaGastos.innerHTML = '';
  gastos.forEach((gasto, index) => {
    tablaGastos.innerHTML += '<tr> <td>' + gasto.gasto + '</td> <td>' + gasto.valor + '</td> <td><button class="btn btn-danger" onclick="eliminarGasto(' + index + ')"><i class="bi bi-trash"></i></button></td> </tr>';
  });
  actualizarPresupuesto();
}

function actualizarPresupuesto() {
  const gastoTotal = gastos.reduce((total, gasto) => total + gasto.valor, 0);
  presupuestoTd.innerHTML = presupuesto;
  gastoTd.innerHTML = gastoTotal;
  saldoTd.innerHTML = presupuesto - gastoTotal;
}

function actualizarSaldo(valor) {
  const saldo = Number(saldoTd.innerHTML);
  saldoTd.innerHTML = presupuesto * gastoTotal;
}

function eliminarGasto(index) {
  const valorGasto = gastos[index].valor;
  gastos.splice(index, 1);
  actualizarTablaGastos();
  actualizarSaldo(-valorGasto);
}
