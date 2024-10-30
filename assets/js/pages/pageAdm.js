// CRUD REGISTER
function validateFormRegister() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var loja = document.getElementById("loja").value.trim();
  var password = document.getElementById("password").value.trim();

  if (!name || !email || !loja || !password) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    alert("Por favor, insira um e-mail válido.");
    return false;
  }

  if (password.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres.");
    return false;
  }

  return true;
}

function initializeRegisterList() {
  let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  if (registerList.length === 0) {
    registerList.push(
      {
        name: "Ana",
        email: "admin@example.com",
        loja: "Matriz",
        password: "admin123",
      },
      {
        name: "Julio",
        email: "gerente@example.com",
        loja: "126",
        password: "gerente123",
      },
      {
        name: "Carla",
        email: "loja@example.com",
        loja: "126",
        password: "loja123",
      }
    );
    localStorage.setItem("registerList", JSON.stringify(registerList));
  }
}

let deleteIndex;

function showData() {
  let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  var html = "";
  registerList.forEach(function (element, index) {
    html += "<tr>";
    html += `<td>${element.name}</td>`;
    html += `<td>${element.email}</td>`;
    html += `<td>${element.loja}</td>`;
    html += "<td>" + new Date().toLocaleString() + "</td>";
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
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var loja = document.getElementById("loja").value.trim();
    var password = document.getElementById("password").value.trim();

    let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

    registerList.push({
      name: name,
      email: email,
      loja: loja,
      password: password,
    });
    localStorage.setItem("registerList", JSON.stringify(registerList));
    document.getElementById("open-modal-cadUser").classList.remove("show");

    showData();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("loja").value = "";
    document.getElementById("password").value = "";
  }
}

function openModalDeleteUser(index) {
  deleteIndex = index;
  let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  const userName = registerList[index].name;
  document.querySelector(".containerDelete").innerHTML = `
     <h2> Realmente deseja deletar o usuário <strong>${userName}</strong>?</h2>
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
  let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  registerList.splice(deleteIndex, 1);
  localStorage.setItem("registerList", JSON.stringify(registerList));
  document.getElementById("open-modal-DeleteUser").classList.remove("show");

  showData();
}

function validateFormEdit() {
  var name = document.getElementById("nameEdit").value.trim();
  var email = document.getElementById("emailEdit").value.trim();
  var loja = document.getElementById("lojaEdit").value.trim();
  var password = document.getElementById("passwordEdit").value.trim();

  if (!name || !email || !loja || !password) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    alert("Por favor, insira um e-mail válido.");
    return false;
  }

  if (password.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres.");
    return false;
  }

  return true;
}

function updateData(index) {
  document.getElementById("open-modal-editUser").classList.add("show");

  let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  document.getElementById("nameEdit").value = registerList[index].name;
  document.getElementById("emailEdit").value = registerList[index].email;
  document.getElementById("lojaEdit").value = registerList[index].loja;
  document.getElementById("passwordEdit").value = registerList[index].password;

  document.querySelector("#update").onclick = function () {
    if (validateFormEdit() == true) {
      registerList[index].name = document.getElementById("nameEdit").value;
      registerList[index].email = document.getElementById("emailEdit").value;
      registerList[index].loja = document.getElementById("lojaEdit").value;
      registerList[index].password =
        document.getElementById("passwordEdit").value;

      localStorage.setItem("registerList", JSON.stringify(registerList));

      document.getElementById("open-modal-editUser").classList.remove("show");

      showData();

      document.getElementById("nameEdit").value = "";
      document.getElementById("emailEdit").value = "";
      document.getElementById("lojaEdit").value = "";
      document.getElementById("passwordEdit").value = "";
    }
  };
  showData();
}

document.addEventListener("DOMContentLoaded", function () {
  initializeRegisterList();
  showData();
});



