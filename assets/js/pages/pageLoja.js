// CRUD LOJA
function validateFormRegister() {
  var codLoja = document.getElementById("codLoja").value.trim();
  var name = document.getElementById("name").value.trim();

  if (!codLoja || !name) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  return true;
}

function initializeLojaList() {
  let lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];

  if (lojaList.length === 0) {
    lojaList.push(
      {
        name: "Matriz",
        codLoja: "0",
      },
      {
        name: "Rio Grande",
        codLoja: "126",
      },
      {
        name: "Caxias do Sul",
        codLoja: "245",
      },
      {
        name: "Arroio Grande",
        codLoja: "54",
      },
      {
        name: "Viamão",
        codLoja: "191",
      },
      {
        name: "Alpestre",
        codLoja: "12",
      }
    );
    localStorage.setItem("lojaList", JSON.stringify(lojaList));
  }
}

let deleteIndex;

function showData() {
  let lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];

  var html = "";
  lojaList.forEach(function (element, index) {
    html += "<tr>";
    html += `<td>${element.name}</td>`;
    html += `<td>${element.codLoja}</td>`;
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
}

function addData() {
  if (validateFormRegister() == true) {
    var codLoja = document.getElementById("codLoja").value.trim();
    var name = document.getElementById("name").value.trim();

    let lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];

    lojaList.push({
      name: name,
      codLoja: codLoja,
    });

    localStorage.setItem("lojaList", JSON.stringify(lojaList));
    document.getElementById("open-modal-cadUser").classList.remove("show");

    showData();

    document.getElementById("codLoja").value = "";
  }
}

function openModalDeleteUser(index) {
  deleteIndex = index;
  let lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];

  const lojaNumber = lojaList[index].codLoja;
  document.querySelector(".containerDelete").innerHTML = `
     <h2> Realmente deseja deletar a loja <strong>${lojaNumber}</strong>?</h2>
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
  let lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];

  lojaList.splice(deleteIndex, 1);
  localStorage.setItem("lojaList", JSON.stringify(lojaList));
  document.getElementById("open-modal-DeleteUser").classList.remove("show");

  showData();
}

function validateFormEdit() {
  var codLoja = document.getElementById("codLojaEdit").value.trim();
  var name = document.getElementById("nameEdit").value.trim();

  if (!codLoja || !name) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  return true;
}

function updateData(index) {
  document.getElementById("open-modal-editUser").classList.add("show");

  let lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];

  document.getElementById("nameEdit").value = lojaList[index].name;
  document.getElementById("codLojaEdit").value = lojaList[index].codLoja;

  document.querySelector("#update").onclick = function () {
    if (validateFormEdit() == true) {
      lojaList[index].name = document.getElementById("nameEdit").value;
      lojaList[index].codLoja = document.getElementById("codLojaEdit").value;

      localStorage.setItem("lojaList", JSON.stringify(lojaList));

      document.getElementById("open-modal-editUser").classList.remove("show");

      showData();

      document.getElementById("codLojaEdit").value = "";
    }
  };
  showData();
}

document.addEventListener("DOMContentLoaded", function () {
  initializeLojaList();
  showData();
});
