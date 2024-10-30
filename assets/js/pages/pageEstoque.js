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

function initializeEstoqueList() {
  let estoqueList = JSON.parse(localStorage.getItem("estoqueList")) || [];

  if (estoqueList.length === 0) {
    estoqueList.push(
      {
        loja: "126",
        estoque: 50,
        quantRecom: 126,
        quantMin: 25,
      },
      {
        loja: "245",
        estoque: 126,
        quantRecom: 150,
        quantMin: 50,
      },
      {
        loja: "54",
        estoque: 12,
        quantRecom: 78,
        quantMin: 20,
      }
    );
    localStorage.setItem("estoqueList", JSON.stringify(estoqueList));
  }
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

function showData() {
  const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));

  if (!user || !user.perfis || user.perfis.length === 0) {
    alert("Usuário não autenticado ou sem perfil.");
    window.location.href = "./login.html";
    return;
  }

  const perfilList = JSON.parse(localStorage.getItem("perfilList"));
  if (!perfilList) {
    console.error("Lista de perfis não encontrada no localStorage.");
    return;
  }

  let hasLojaEspecifica = false;
  let lojaEspecifica = "";

  user.perfis.forEach((userPerfil) => {
    const perfilData = perfilList.find((perfil) => perfil.name === userPerfil);
    if (
      perfilData &&
      perfilData.permissions &&
      perfilData.permissions.lojaEspecifica
    ) {
      hasLojaEspecifica = true;
      lojaEspecifica = user.loja;
    }
  });

  let estoqueList = JSON.parse(localStorage.getItem("estoqueList")) || [];

  if (hasLojaEspecifica) {
    estoqueList = estoqueList.filter(
      (element) => element.loja === lojaEspecifica
    );
  }

  var html = "";
  estoqueList.forEach(function (element, index) {
    const status = calculateStatus(
      element.estoque,
      element.quantRecom,
      element.quantMin
    );

    html += "<tr>";
    html += `<td>${element.loja}</td>`;
    html += `<td>${element.estoque}</td>`;
    html += `<td>${element.quantRecom}</td>`;
    html += `<td>${element.quantMin}</td>`;
    html += `<td>${status}</td>`;
    html += '<td class="buttons">';
    html +=
      `
        <button type="button" class="btn btn-primary btn-xs dt-edit" onclick="updateData(` +
      index +
      `)">
          <img src="./assets/images/edit-pencil.svg" alt="Botão Editar" width="25px"/>
        </button>
        <button type="button" class="btn btn-danger btn-xs dt-delete" onclick="openModalDeleteUser(` +
      index +
      `)">
          <img src="./assets/images/delete-trash.svg" alt="Botão Excluir" width="25px"/>
        </button>
      `;
    html += "</td>";
    html += "</tr>";
  });

  document.querySelector("#registerCRUD tbody").innerHTML = html;

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

function closeModalDeleteUser() {
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
        <button type="button" class="btn btn-danger btn-xs dt-delete" onclick="openModalDeleteSolicitacap(${index})">
          <img src="./assets/images/delete-trash.svg" alt="Botão Excluir" width="25px"/>
        </button>`;
      html += "</td>";
      html += "</tr>";
    }
  });

  document.getElementById("tableBody").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
  initializeEstoqueList();
  showData();
  getDataSolicitacao();
});
