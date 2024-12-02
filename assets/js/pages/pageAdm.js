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


let deleteIndex;
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados de usuarios:", error);
    alert("Erro ao se conectar ao servidor. Tente novamente mais tarde.");
  }
}

async function fetchDataStore() {
  try {
    const response = await fetch("http://localhost:3000/api/store", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados de lojas:", error);
    alert("Erro ao se conectar ao servidor. Tente novamente mais tarde.");
  }
}

async function showData() {
  let usersList = await fetchData();
  let storeList = await fetchDataStore();

  // Exibe os dados retornados pela API
  var html = "";
  usersList.forEach(function (element, index) {
    const store = storeList.find(
      (store) => store.id_store === element.id_store
    );
    const store_name = store ? store.store_name : "Loja não encontrada"; // Verifica se a loja foi encontrada
    html += `<tr class="users">`;
    html += `<td>${element.user_name}</td>`;
    html += `<td>${element.email}</td>`;
    html += `<td>${store_name}</td>`;
    html += `<td>${new Date(element.registration_date).toLocaleString()}</td>`;
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

function details(index) {
  let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  document.querySelector(".containerDetails").innerHTML = `
     <h2>Detalhes do usuário <strong>${registerList[index].name}</strong></h2>
    <span>Email: ${registerList[index].email}</span>
    <span>Loja: ${registerList[index].loja}</span>
    <span>Perfil: ${registerList[index].perfis}</span>
    `;

  document.getElementById("open-modal-detalhes").classList.add("show");
}

function closeModalDetails() {
  document.getElementById("open-modal-detalhes").classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
  showData();
});
