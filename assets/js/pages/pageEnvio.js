// Função para obter e renderizar as solicitações na tabela de "Solicitado"
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

// Função para abrir o modal de confirmação para deletar uma solicitação
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

// Função para fechar o modal de exclusão
function closeModalDeleteUser() {
  document.getElementById("open-modal-DeleteUser").classList.remove("show");
}

// Função para deletar uma solicitação
function deleteData() {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  taloesList.splice(deleteIndex, 1);
  localStorage.setItem("taloesList", JSON.stringify(taloesList));
  document.getElementById("open-modal-DeleteUser").classList.remove("show");

  getDataSolicitacao();
  getDataEnviados();
}

// Função para obter e renderizar as solicitações na tabela de "Enviado"
function getDataEnviados() {
  const taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  var html = "";
  taloesList.forEach(function (element, index) {
    if (element.status === "Enviado") {
      html += "<tr>";
      html += `<td>${element.loja}</td>`;
      html += `<td>${element.quantidade}</td>`;
      html += `<td>${element.dataEnvio}</td>`;
      html += `<td>${element.previsaoChegada}</td>`;
      html += '<td class="buttons">';
      html += `
      <button type="button" class="btn btn-primary btn-xs dt-edit" onclick="updateData(${index})">
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

    if (!dataEnvio || !horaEnvio || !previsaoChegada) {
      alert("Por favor, preencha todos os campos de envio e previsão.");
      return;
    }

    const envioFormatado = `${dataEnvio} ${horaEnvio}`;

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

document.addEventListener("DOMContentLoaded", function () {
  getDataSolicitacao();
  getDataEnviados();
});