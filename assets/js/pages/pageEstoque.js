// CRUD ESTOQUE
function validateFormRegister() {
  var loja = document.getElementById("loja").value.trim();
  var estoque = document.getElementById("estoque").value.trim();
  var quantRecom = document.getElementById("quantRecom").value.trim();
  var quantMin = document.getElementById("quantMin").value.trim();

  if (!loja || !estoque || !quantRecom || !quantMin) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  return true;
}

let deleteIndex;

function calculateStatus(estoque, quantRecom, quantMin) {
  if (estoque > quantRecom) {
    return "OK";
  } else if (estoque >= quantMin && estoque <= quantRecom) {
    return "ATENÇÃO";
  } else {
    return "ALERTA";
  }
}

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

async function showData() {
  const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));

  if (!user || !user.profiles || user.profiles.length === 0) {
    alert("Usuário não autenticado ou sem perfil.");
    window.location.href = "/login";
    return;
  }

  let hasJustStoreAccess = false;
  let userStoreId = "";

  let estoqueList = await fetchData("stock");
  let users = await fetchData("register");

  // Verifica se o usuário tem o perfil "justStore" e define a loja do usuário
  user.profiles.forEach((userProfile) => {
    if (userProfile === "justStore") {
      hasJustStoreAccess = true;
      users = users.filter(
        (element) => element.name === user.name
      );
      userStoreId = users.id_store; // Supõe-se que 'user.loja' contém o ID da loja do usuário
    }
  });

  // Se o usuário tiver "justStore", filtra os dados apenas para a loja dele
  if (hasJustStoreAccess) {
    estoqueList = estoqueList.filter(
      (element) => element.id_store === userStoreId
    );
  }

  var html = "";
  estoqueList.forEach(function (element, index) {
    // Corrigido: O segundo parâmetro da função calculateStatus estava duplicado
    const status = calculateStatus(
      element.recommended_quantity,
      element.current_quantity,
      element.minimum_quantity
    );

    html += `<tr class="stock">`;
    html += `<td>${element.id_store}</td>`;
    html += `<td>${element.recommended_quantity}</td>`;
    html += `<td>${element.current_quantity}</td>`;
    html += `<td>${element.minimum_quantity}</td>`;
    html += `<td>${status}</td>`;
    html += "<td>";
    html += `
      <button type="button" class="btn btn-add btn-xs dt-add" onclick="details(${index})">
        Detalhes
      </button>`;
    html += "</td>";
    html += '<td class="buttons">';
    html += `
      <button type="button" class="btn btn-primary btn-xs dt-edit" onclick="updateData(${index})">
        <img src="./assets/images/edit-pencil.svg" alt="Botão Editar" width="25px"/>
      </button>
      <button type="button" class="btn btn-danger btn-xs dt-delete" onclick="openModalDeleteUser(${index})">
        <img src="./assets/images/delete-trash.svg" alt="Botão Excluir" width="25px"/>
      </button>`;
    html += "</td>";
    html += "</tr>";
  });

  document.querySelector("#registerCRUD tbody").innerHTML = html;

  // Aplicação de estilos de alerta com base no status
  document.querySelectorAll("tr").forEach(function (row) {
    row.querySelectorAll("td").forEach(function (cell) {
      if (cell.textContent.trim() === "ALERTA") {
        row.style.backgroundColor = "#f96060";
        row.style.color = "#fff";
        row.style.fontWeight = "600";
      } else if (cell.textContent.trim() === "ATENÇÃO") {
        row.style.backgroundColor = "#fae984";
      }
    });
  });
}

function addData() {
  if (validateFormRegister() == true) {
    var loja = document.getElementById("loja").value.trim();
    var estoque = document.getElementById("estoque").value.trim();
    var quantRecom = document.getElementById("quantRecom").value.trim();
    var quantMin = document.getElementById("quantMin").value.trim();

    let estoqueList = JSON.parse(localStorage.getItem("estoqueList")) || [];

    const status = calculateStatus(estoque, quantRecom, quantMin);

    estoqueList.push({
      loja: loja,
      estoque: parseInt(estoque),
      quantRecom: parseInt(quantRecom),
      quantMin: parseInt(quantMin),
      status: status,
    });

    localStorage.setItem("estoqueList", JSON.stringify(estoqueList));
    document.getElementById("open-modal-cadUser").classList.remove("show");

    showData();

    document.getElementById("loja").value = "";
    document.getElementById("estoque").value = "";
    document.getElementById("quantRecom").value = "";
    document.getElementById("quantMin").value = "";
  }
}

function openModalDeleteUser(index) {
  deleteIndex = index;
  let estoqueList = JSON.parse(localStorage.getItem("estoqueList")) || [];

  const lojaNumber = estoqueList[index].loja;
  document.querySelector(".containerDelete").innerHTML = `
     <h2> Realmente deseja deletar o estoque da loja <strong>${lojaNumber}</strong>?</h2>
      <button type="button" id="delete" class="btn-del" onclick="deleteData()">
        Deletar
      </button>
    `;

  document.getElementById("open-modal-DeleteUser").classList.add("show");
}

function closeModalDeleteEst() {
  document.getElementById("open-modal-DeleteUser").classList.remove("show");
}

function deleteData() {
  let estoqueList = JSON.parse(localStorage.getItem("estoqueList")) || [];

  estoqueList.splice(deleteIndex, 1);
  localStorage.setItem("estoqueList", JSON.stringify(estoqueList));
  document.getElementById("open-modal-DeleteUser").classList.remove("show");

  showData();
}

function validateFormEdit() {
  var loja = document.getElementById("lojaEdit").value.trim();
  var estoque = document.getElementById("estoqueEdit").value.trim();
  var quantRecom = document.getElementById("quantRecomEdit").value.trim();
  var quantMin = document.getElementById("quantMinEdit").value.trim();

  if (!loja || !estoque || !quantRecom || !quantMin) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  return true;
}
function updateData(index) {
  document.getElementById("open-modal-editUser").classList.add("show");

  let estoqueList = JSON.parse(localStorage.getItem("estoqueList")) || [];

  document.getElementById("lojaEdit").value = estoqueList[index].loja;
  document.getElementById("estoqueEdit").value = estoqueList[index].estoque;
  document.getElementById("quantRecomEdit").value =
    estoqueList[index].quantRecom;
  document.getElementById("quantMinEdit").value = estoqueList[index].quantMin;

  document.querySelector("#update").onclick = function () {
    if (validateFormEdit() == true) {
      estoqueList[index].loja = document.getElementById("lojaEdit").value;
      estoqueList[index].estoque = parseInt(
        document.getElementById("estoqueEdit").value
      );
      estoqueList[index].quantRecom = parseInt(
        document.getElementById("quantRecomEdit").value
      );
      estoqueList[index].quantMin = parseInt(
        document.getElementById("quantMinEdit").value
      );

      estoqueList[index].status = calculateStatus(
        estoqueList[index].estoque,
        estoqueList[index].quantRecom,
        estoqueList[index].quantMin
      );

      localStorage.setItem("estoqueList", JSON.stringify(estoqueList));

      document.getElementById("open-modal-editUser").classList.remove("show");

      showData();

      document.getElementById("lojaEdit").value = "";
      document.getElementById("estoqueEdit").value = "";
      document.getElementById("quantRecomEdit").value = "";
      document.getElementById("quantMinEdit").value = "";
    }
  };
}

function closeModalEditEst() {
  document.getElementById("open-modal-editUser").classList.remove("show");
}

function hasLojaEspecifica() {
  const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));

  if (!user || !user.profiles || user.profiles.length === 0) {
    console.error("Usuário não autenticado ou sem perfil.");
    return false;
  }

  // Verifica se algum dos perfis do usuário tem lojaEspecifica: true
  return user.profiles.some((userPerfil) => {
    const perfilData = perfilList.find((perfil) => perfil.name === userPerfil);
    return (
      perfilData &&
      perfilData.permissions &&
      perfilData.permissions.lojaEspecifica
    );
  });
}

function getDataSolicitacao() {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  if (hasLojaEspecifica()) {
    const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));
    taloesList = taloesList.filter((element) => element.loja === user.loja);
  }

  var html = "";
  taloesList.forEach(function (element, index) {
    if (element.status === "Em espera") {
      html += "<tr>";
      html += `<td>${element.loja}</td>`;
      html += `<td>${element.quantidade}</td>`;
      html += '<td class="buttons">';
      html += `
        <button type="button" class="btn btn-primary btn-xs dt-edit" onclick="aprovarSolicitacao(${index})">
          <img src="./assets/images/edit-pencil.svg" alt="Botão Editar" width="25px"/>
        </button>
        <button type="button" class="btn btn-danger btn-xs dt-delete" onclick="deleteSolicitacao(${index})">
          <img src="./assets/images/delete-trash.svg" alt="Botão Excluir" width="25px"/>
        </button>`;
      html += "</td>";
      html += "</tr>";
    }
  });

  document.getElementById("tableBody").innerHTML = html;
}

function details(index) {
  let estoqueList = JSON.parse(localStorage.getItem("estoqueList")) || [];

  const status = calculateStatus(
    estoqueList[index].estoque,
    estoqueList[index].quantRecom,
    estoqueList[index].quantMin
  );

  document.querySelector(".containerDetails").innerHTML = `
     <h2>Detalhes do estoque da loja <strong>${estoqueList[index].loja}</strong></h2>
    <span>Estoque atual: ${estoqueList[index].estoque}</span>
    <span>Quantidade recomendada: ${estoqueList[index].quantRecom}</span>
    <span>Qauantidade minima: ${estoqueList[index].quantMin}</span>
    <span>Status: ${status}</span>
    `;

  document.getElementById("open-modal-detalhes").classList.add("show");
}

function closeModalDetails() {
  document.getElementById("open-modal-detalhes").classList.remove("show");
}

function aprovarSolicitacao(index) {
  document.getElementById("open-modal-aprovaSolicit").classList.add("show");

  const taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  const selectedTalao = taloesList[index];

  document.getElementById("lojaEditSolic").value = selectedTalao.loja;
  document.getElementById("quantSolic").value = selectedTalao.quantidade;

  document.getElementById("aprovaSolicit").onsubmit = function (e) {
    e.preventDefault();

    selectedTalao.status = "Solicitado";
    taloesList[index] = selectedTalao;
    localStorage.setItem("taloesList", JSON.stringify(taloesList));

    closeModalEdituser();
    getDataSolicitacao();
  };
}

let deleteSolicIndex;

function deleteSolicitacao(index) {
  deleteSolicIndex = index;
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  const lojaNumber = taloesList[index].loja;
  document.querySelector(".containerDeleteSolicit").innerHTML = `
     <h2> Realmente deseja deletar a solicitação da loja <strong>${lojaNumber}</strong>?</h2>
      <button type="button" id="delete" class="btn-del" onclick="deleteDataSolic()">
        Deletar
      </button>
    `;

  document
    .getElementById("open-modal-deleteAprovaSolicit")
    .classList.add("show");
}

function closeModalDeleteUser() {
  document
    .getElementById("open-modal-deleteAprovaSolicit")
    .classList.remove("show");
}

function closeModalEdituser() {
  document.getElementById("open-modal-aprovaSolicit").classList.remove("show");
}

function deleteDataSolic() {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  taloesList.splice(deleteSolicIndex, 1);
  localStorage.setItem("taloesList", JSON.stringify(taloesList));
  document
    .getElementById("open-modal-deleteAprovaSolicit")
    .classList.remove("show");

  showData();
}

document.addEventListener("DOMContentLoaded", function () {
  showData();
  getDataSolicitacao();
});
