// CRUD LOJA
function validateFormRegister() {
  var loja = document.getElementById("loja").value.trim();

  if (!loja) {
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
        loja: "Matriz",
      },
      {
        loja: "126",
      },
      {
        loja: "245",
      },
      {
        loja: "54",
      },
      {
        loja: "191",
      },
      {
        loja: "12",
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
    html += `<td>${element.loja}</td>`;
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
    var loja = document.getElementById("loja").value.trim();

    let lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];

    lojaList.push({
      loja: loja,
    });

    localStorage.setItem("lojaList", JSON.stringify(lojaList));
    document.getElementById("open-modal-cadUser").classList.remove("show");

    showData();

    document.getElementById("loja").value = "";
  }
}

function openModalDeleteUser(index) {
  deleteIndex = index;
  let lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];

  const lojaNumber = lojaList[index].loja;
  document.querySelector(".containerDelete").innerHTML = `
     <h2> Realmente deseja deletar essa loja <strong>${lojaNumber}</strong>?</h2>
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
  var loja = document.getElementById("lojaEdit").value.trim();

  if (!loja) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  return true;
}

function updateData(index) {
  document.getElementById("open-modal-editUser").classList.add("show");

  let lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];

  document.getElementById("lojaEdit").value = lojaList[index].loja;

  document.querySelector("#update").onclick = function () {
    if (validateFormEdit() == true) {
      lojaList[index].loja = document.getElementById("lojaEdit").value;

      localStorage.setItem("lojaList", JSON.stringify(lojaList));

      document.getElementById("open-modal-editUser").classList.remove("show");

      showData();

      document.getElementById("lojaEdit").value = "";
    }
  };
  showData();
}

document.addEventListener("DOMContentLoaded", function () {
  initializeLojaList();
  showData();
});
