async function fetchData(endpoint) {
  try {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar dados de ${endpoint}:`, error);
    alert(
      `Erro ao se conectar ao servidor ao buscar ${endpoint}. Tente novamente mais tarde.`
    );
  }
}

function calculateStatus(estoque, quantRecom, quantMin) {
  if (estoque > quantRecom) {
    return "OK";
  } else if (estoque >= quantMin && estoque <= quantRecom) {
    return "ATENÇÃO";
  } else {
    return "ALERTA";
  }
}

async function showData() {
  let profiles = await fetchData("profile");
  let users = await fetchData("register");
  let userprofile = await fetchData("association");
  let stores = await fetchData("store");
  let stocks = await fetchData("stock");

  let totalAlertas = 0;
  if (stocks.length > 0) {
    stocks.forEach(function (element) {
      const status = calculateStatus(
        element.current_quantity,
        element.recommended_quantity,
        element.minimum_quantity
      );
      if (status === "ALERTA") totalAlertas += 1;
    });
  }

  let totalAssociacoes = userprofile.length;
  let totalUsuarios = users.length;
  let totalPerfis = profiles.length;
  let totalLojas = stores.length;

  // Atualiza a interface
  document.getElementById("totalUsuarios").textContent = totalUsuarios;
  document.getElementById("totalPerfis").textContent = totalPerfis;
  document.getElementById("totalAssociacoes").textContent = totalAssociacoes;
  document.getElementById("totalLojas").textContent = totalLojas;
  document.getElementById("totalAlertas").textContent = totalAlertas;
}

document.addEventListener("DOMContentLoaded", function () {
  showData();
});
