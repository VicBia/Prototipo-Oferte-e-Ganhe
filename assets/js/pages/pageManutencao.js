// CRUD LOJA
function validateFormRegister() {
    var loja = document.getElementById("loja").value.trim();
  
    if (!loja) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }
  
    return true;
  }
  
  function initializeManutencaoList() {
    let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  
    if (taloesList.length === 0) {
      taloesList.push(
        {
          loja: "126",
          quantidade: 50,
          dataEnvio: "24/02/2024",
          dataRecebimento: null,
          status: enviado
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
      localStorage.setItem("taloesList", JSON.stringify(taloesList));
    }
  }
  
  let deleteIndex;
  
  function showData() {
    let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  
    var html = "";
    taloesList.forEach(function (element, index) {
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
  
      let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  
      taloesList.push({
        loja: loja,
      });
      console.log(taloesList);
      localStorage.setItem("taloesList", JSON.stringify(taloesList));
      document.getElementById("open-modal-cadUser").classList.remove("show");
  
      showData();
  
      document.getElementById("loja").value = "";
    }
  }
  
  function openModalDeleteUser(index) {
    deleteIndex = index;
    let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  
    const lojaNumber = taloesList[index].loja;
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
    let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  
    taloesList.splice(deleteIndex, 1);
    localStorage.setItem("taloesList", JSON.stringify(taloesList));
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
  
    let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  
    document.getElementById("lojaEdit").value = taloesList[index].loja;
  
    document.querySelector("#update").onclick = function () {
      if (validateFormEdit() == true) {
        taloesList[index].loja = document.getElementById("lojaEdit").value;
  
        localStorage.setItem("taloesList", JSON.stringify(taloesList));
  
        document.getElementById("open-modal-editUser").classList.remove("show");
  
        showData();
  
        document.getElementById("lojaEdit").value = "";
      }
    };
    showData();
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    initializetaloesList();
    showData();
  });
  