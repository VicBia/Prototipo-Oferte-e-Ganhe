function newSolicitacao() {
  document.getElementById("open-modal-newSolicitacao").classList.add("show");

  document.getElementById("newSolicitacaoForm").onsubmit = function (e) {
    e.preventDefault();

    const loja = document.getElementById("loja").value;
    const quantidade = document.getElementById("quantidade").value;
    const dataEnvio = document.getElementById("dataEnvioNew").value;
    const horaEnvio = document.getElementById("horaEnvioNew").value;
    const previsaoChegada = document.getElementById("previsaoChegadaNew").value;
    const remessa = document.getElementById("remessa").value;

    if (
      !loja ||
      !quantidade ||
      !dataEnvio ||
      !horaEnvio ||
      !previsaoChegada ||
      !remessa
    ) {
      alert("Por favor, preencha todos os campos de envio e previsão.");
      return;
    }

    const envioFormatado = `${dataEnvio} ${horaEnvio}`;

    let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

    taloesList.push({
      loja: loja,
      quantidade: quantidade,
      dataEnvio: envioFormatado,
      previsaoChegada: previsaoChegada,
      remessa: remessa,
      status: "Enviado",
    });

    localStorage.setItem("taloesList", JSON.stringify(taloesList));
    document
      .getElementById("open-modal-newSolicitacao")
      .classList.remove("show");

    getDataEnviados();
  };
}

function closeModalNewSolicitacao() {
  document.getElementById("open-modal-newSolicitacao").classList.remove("show");
}

function getDataSolicitacao() {
  const taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  var html = "";
  taloesList.forEach(function (element, index) {
    if (element.status === "Solicitado") {
      html += "<tr>";
      html += `<td>${element.loja}</td>`;
      html += `<td>${element.quantidade}</td>`;
      html += '<td class="buttons">';
      html += `
        <button type="button" class="btn btn-primary btn-xs dt-edit" onclick="updateSolicitacao(${index})">
          <img src="./assets/images/edit-pencil.svg" alt="Botão Editar" width="25px"/>
        </button>
        <button type="button" class="btn btn-danger btn-xs dt-delete" onclick="openModalDeleteUser(${index})">
          <img src="./assets/images/delete-trash.svg" alt="Botão Excluir" width="25px"/>
        </button>`;
      html += "</td>";
      html += "</tr>";
    }
  });

  document.getElementById("tableBody").innerHTML = html;
}

function openModalDeleteUser(index) {
  deleteIndex = index;
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  const lojaNumber = taloesList[index].loja;
  document.querySelector(".containerDelete").innerHTML = `
     <h2> Realmente deseja deletar essa solicitação da loja <strong>${lojaNumber}</strong>?</h2>
      <button type="button" id="delete" class="btn-del" onclick="deleteData()">
        Deletar
      </button>
    `;

  document.getElementById("open-modal-DeleteUser").classList.add("show");
}

function closeModalDeleteUser() {
  document.getElementById("open-modal-DeleteUser").classList.remove("show");
}

function deleteData() {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  taloesList.splice(deleteIndex, 1);
  localStorage.setItem("taloesList", JSON.stringify(taloesList));
  document.getElementById("open-modal-DeleteUser").classList.remove("show");

  getDataSolicitacao();
  getDataEnviados();
}

function getDataEnviados() {
  const taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  var html = "";
  taloesList.forEach(function (element, index) {
    if (element.status === "Enviado") {
      html += `<tr class="send">   `;
      html += `<td>${element.loja}</td>`;
      html += `<td>${element.quantidade}</td>`;
      html += `<td>${element.dataEnvio}</td>`;
      html += `<td>${element.previsaoChegada}</td>`;
      html += `<td>${element.remessa}</td>`;
      html += "<td>";
      html +=
        `
        <button type="button" class="btn btn-add btn-xs dt-add"  onclick="details(` +
        index +
        `)">
                  Detalhes
                </button>`;
      html += "</td>";
      html += '<td class="buttons">';
      html += `
      <button type="button" class="btn btn-primary btn-xs dt-edit" onclick="editEnvio(${index})">
          <img src="./assets/images/edit-pencil.svg" alt="Botão Editar" width="25px"/>
          </button>`;
      html += "</td>";
      html += "</tr>";
    }
  });

  document.getElementById("enviadosBody").innerHTML = html;
}

function updateSolicitacao(index) {
  document.getElementById("open-modal-solicitacao").classList.add("show");

  const taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  const selectedTalao = taloesList[index];

  document.getElementById("editLoja").value = selectedTalao.loja;
  document.getElementById("editQuantidade").value = selectedTalao.quantidade;

  document.getElementById("solicitacaoForm").onsubmit = function (e) {
    e.preventDefault();

    const dataEnvio = document.getElementById("dataEnvio").value;
    const horaEnvio = document.getElementById("horaEnvio").value;
    const previsaoChegada = document.getElementById("previsaoChegada").value;
    const remessa = document.getElementById("remessa").value;

    if (!dataEnvio || !horaEnvio || !previsaoChegada || !remessa) {
      alert("Por favor, preencha todos os campos de envio e previsão.");
      return;
    }

    const envioFormatado = `${dataEnvio} ${horaEnvio}`;

    selectedTalao.remessa = remessa;
    selectedTalao.dataEnvio = envioFormatado;
    selectedTalao.previsaoChegada = previsaoChegada;
    selectedTalao.status = "Enviado";

    taloesList[index] = selectedTalao;
    localStorage.setItem("taloesList", JSON.stringify(taloesList));

    closeModalSolicitacao();
    getDataSolicitacao();
    getDataEnviados();
  };
}

function closeModalSolicitacao() {
  document.getElementById("open-modal-solicitacao").classList.remove("show");
}

function details(index) {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  document.querySelector(".containerDetails").innerHTML = `
     <h2>Detalhes dos talões ja enviados da loja <strong>${taloesList[index].loja}</strong></h2>
    <span>Quantidade enviada: ${taloesList[index].quantidade}</span>
    <span>Data/Hora envio: ${taloesList[index].dataEnvio}</span>
    <span>Previsão: ${taloesList[index].previsaoChegada}</span>
      <span>Remessa: ${taloesList[index].remessa}</span>
    `;

  document.getElementById("open-modal-detalhes").classList.add("show");
}

function closeModalDetails() {
  document.getElementById("open-modal-detalhes").classList.remove("show");
}

function editEnvio(index) {
  document.getElementById("open-modal-editarTalaiEnviado").classList.add("show");

  const taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  const selectedTalao = taloesList[index];


  document.getElementById("editLojaEnvio").value = selectedTalao.loja;
  document.getElementById("editQuantidadeEnvio").value =
    selectedTalao.quantidade;
  document.getElementById("dataEnvioEdit").value = selectedTalao.dataEnvio;
  document.getElementById("horaEnvioEdit").value = selectedTalao.horaEnvio;
  document.getElementById("previsaoChegadaEdit").value =
    selectedTalao.previsaoChegada;
  document.getElementById("remessaEnvio").value = selectedTalao.remessa;

  document.getElementById("editEnvioForm").onsubmit = function (e) {
    e.preventDefault();

    const dataEnvio = document.getElementById("dataEnvioEdit").value;
    const horaEnvio = document.getElementById("horaEnvioEdit").value;
    const previsaoChegada = document.getElementById(
      "previsaoChegadaEdit"
    ).value;
    const remessa = document.getElementById("remessaEnvio").value;

    if (!dataEnvio || !horaEnvio || !previsaoChegada || !remessa) {
      alert("Por favor, preencha todos os campos de envio e previsão.");
      return;
    }

    const envioFormatado = `${dataEnvio} ${horaEnvio}`;

    selectedTalao.remessa = remessa;
    selectedTalao.dataEnvio = envioFormatado;
    selectedTalao.previsaoChegada = previsaoChegada;
    selectedTalao.status = "Enviado";

    taloesList[index] = selectedTalao;
    localStorage.setItem("taloesList", JSON.stringify(taloesList));

    closeModalEditEnvio();
    getDataEnviados();
  };
}

function closeModalEditEnvio() {
  document
    .getElementById("open-modal-editarTalaiEnviado")
    .classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
  getDataSolicitacao();
  getDataEnviados();
});
