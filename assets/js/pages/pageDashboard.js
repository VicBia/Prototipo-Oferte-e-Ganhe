function calculateStatus(estoque, quantRecom, quantMin) {
  if (estoque > quantRecom) {
    return "OK";
  } else if (estoque >= quantMin && estoque <= quantRecom) {
    return "ATENÇÃO";
  } else {
    return "ALERTA";
  }
}

function showData() {
  let perfilList = JSON.parse(localStorage.getItem("perfilList")) || [];
  let registerList = JSON.parse(localStorage.getItem("registerList")) || [];
  let lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];
  let estoqueList = JSON.parse(localStorage.getItem("estoqueList")) || [];

  let totalAlertas = 0;
  estoqueList.forEach(function (element) {
    const status = calculateStatus(
      element.estoque,
      element.quantRecom,
      element.quantMin
    );
    if (status === "ALERTA") totalAlertas += 1;
  });

  let totalAssociacoes = 0;
  registerList.forEach(function (element) {
    if (element.perfis) totalAssociacoes += 1;
  });

  let totalUsuarios = registerList.length;
  let totalPerfis = perfilList.length;
  let totalLojas = lojaList.length;

  document.getElementById("totalUsuarios").textContent = totalUsuarios;
  document.getElementById("totalPerfis").textContent = totalPerfis;
  document.getElementById("totalAssociacoes").textContent = totalAssociacoes;
  document.getElementById("totalLojas").textContent = totalLojas;
  document.getElementById("totalAlertas").textContent = totalAlertas;
}

document.addEventListener("DOMContentLoaded", function () {
  showData();
});
