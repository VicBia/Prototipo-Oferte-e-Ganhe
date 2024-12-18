function calculateStatus(dataEnvio, previsaoChegada, status) {
  const dataEnvioDate = new Date(dataEnvio);
  const previsaoChegadaDate = new Date(previsaoChegada);

  if (status === "Enviado") {
    if (dataEnvioDate > previsaoChegadaDate) {
      return "Atrasado";
    }
  }
  return status;
}

function hasLojaEspecifica() {
  const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));

  if (!user || !user.perfis || user.perfis.length === 0) {
    console.error("Usuário não autenticado ou sem perfil.");
    return false;
  }

  const perfilList = JSON.parse(localStorage.getItem("perfilList"));
  if (!perfilList) {
    console.error("Lista de perfis não encontrada no localStorage.");
    return false;
  }

  // Verifica se algum dos perfis do usuário tem lojaEspecifica: true
  return user.perfis.some((userPerfil) => {
    const perfilData = perfilList.find((perfil) => perfil.name === userPerfil);
    return (
      perfilData &&
      perfilData.permissions &&
      perfilData.permissions.lojaEspecifica
    );
  });
}

function getDataEnviados() {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  if (hasLojaEspecifica()) {
    const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));
    taloesList = taloesList.filter((element) => element.loja === user.loja);
  }

  var html = "";
  taloesList.forEach(function (element, index) {
    if (element.status === "Enviado" || element.status === "Atrasado") {
      const status = calculateStatus(
        element.dataEnvio,
        element.previsaoChegada,
        element.status
      );
      html += `<tr class="receive">   `;
      html += `<td>${element.loja}</td>`;
      html += `<td>${element.quantidade}</td>`;
      html += `<td>${element.dataEnvio}</td>`;
      html += `<td>${element.previsaoChegada}</td>`;
      html += `<td>${element.remessa}</td>`;
      html += `<td>${status}</td>`;
      html += "<td>";
      html +=
        `
        <button type="button" class="btn btn-add btn-xs dt-add"  onclick="detailsPendentes(` +
        index +
        `)">
                  Detalhes
                </button>`;
      html += "</td>";
      html += "<td>";
      html +=
        `
        <button type="button" class="btn btn-add btn-xs dt-add"  onclick="updateData(` +
        index +
        `)">
                  Entregue
                </button>`;
      html += "</td>";
      html += "</tr>";
    }
  });

  document.getElementById("enviadosBody").innerHTML = html;

  document.querySelectorAll("tr").forEach(function (row) {
    row.querySelectorAll("td").forEach(function (cell) {
      if (cell.textContent.trim() === "Atrasado") {
        row.style.backgroundColor = "#f96060";
        row.style.color = "#fff";
        row.style.fontWeight = "600";
      }
    });
  });
}

function getDataRecebidos() {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  if (hasLojaEspecifica()) {
    const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));
    taloesList = taloesList.filter((element) => element.loja === user.loja);
  }

  var html = "";
  taloesList.forEach(function (element, index) {
    if (element.status === "Recebido") {
      html += `<tr class="receive2">   `;
      html += `<td>${element.loja}</td>`;
      html += `<td>${element.quantidade}</td>`;
      html += `<td>${element.dataRecebimento}</td>`;
      html += "<td>";
      html +=
        `
        <button type="button" class="btn btn-add btn-xs dt-add"  onclick="details(` +
        index +
        `)">
                  Detalhes
                </button>`;
      html += "</td>";
      html += "</tr>";
    }
  });

  document.getElementById("recebidosBody").innerHTML = html;
}

function updateData(index) {
  document.getElementById("open-modal-recebido").classList.add("show");

  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  const selectedTalao = taloesList[index];

  document.getElementById("editLoja").value = selectedTalao.loja;
  document.getElementById("editQuantidade").value = selectedTalao.quantidade;

  document.getElementById("recebimentoForm").onsubmit = function (e) {
    e.preventDefault();

    const dataRecebimento = document.getElementById("dataRecebimento").value;
    const horaRecebimento = document.getElementById("horaRecebimento").value;
    const pessoaRecebido = document.getElementById("pessoaRecebido").value;

    if (!dataRecebimento || !horaRecebimento || !pessoaRecebido) {
      alert("Por favor, preencha todos os campos de envio e previsão.");
      return;
    }

    const envioFormatado = `${dataRecebimento} ${horaRecebimento}`;

    selectedTalao.dataRecebimento = envioFormatado;
    selectedTalao.pessoaRecebido = pessoaRecebido;
    selectedTalao.status = "Recebido";

    taloesList[index] = selectedTalao;
    localStorage.setItem("taloesList", JSON.stringify(taloesList));

    closeModalRecebido();
    getDataEnviados();
    getDataRecebidos();
  };
}

function closeModalRecebido() {
  document.getElementById("open-modal-recebido").classList.remove("show");
}

function details(index) {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  document.querySelector(".containerDetails").innerHTML = `
     <h2>Detalhes do recebimento para loja <strong>${taloesList[index].loja}</strong></h2>
    <span>Quantidade: ${taloesList[index].quantidade}</span>
    <span>Data do envio: ${taloesList[index].dataEnvio}</span>
    <span>Data do recebimento: ${taloesList[index].dataRecebimento}</span>
    <span>Pessoa que recebeu: ${taloesList[index].pessoaRecebido}</span>
    `;

  document.getElementById("open-modal-detalhes").classList.add("show");
}

function closeModalDetails() {
  document.getElementById("open-modal-detalhes").classList.remove("show");
}

function detailsPendentes(index) {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  document.querySelector(".containerDetailsPendentes").innerHTML = `
     <h2>Detalhes dos talões pendentes para loja <strong>${taloesList[index].loja}</strong></h2>
    <span>Quantidade: ${taloesList[index].quantidade}</span>
    <span>Data do envio: ${taloesList[index].dataEnvio}</span>
    <span>Previsão: ${taloesList[index].previsaoChegada}</span>
    <span>Remessa: ${taloesList[index].remessa}</span>
    `;

  document.getElementById("open-modal-detalhesPendentes").classList.add("show");
}

function closeModalDetailsPendentes() {
  document
    .getElementById("open-modal-detalhesPendentes")
    .classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
  getDataEnviados();
  getDataRecebidos();
});
