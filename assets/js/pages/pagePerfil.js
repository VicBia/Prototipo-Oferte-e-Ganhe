// CRUD Perfil
function validateFormRegister() {
  var nomePerfil = document.getElementById("nomePerfil").value.trim();

  if (!nomePerfil) {
    alert("Por favor, preencha o nome do perfil.");
    return false;
  }

  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var algumMarcado = Array.from(checkboxes).some(
    (checkbox) => checkbox.checked
  );

  if (!algumMarcado) {
    alert("Por favor, marque pelo menos uma opção de permissão.");
    return false;
  }

  return true;
}

function initializeperfilList() {
  let perfilList = JSON.parse(localStorage.getItem("perfilList")) || [];

  if (perfilList.length === 0) {
    perfilList.push(
      {
        name: "ADM",
        permissions: {
          lojaEspecifica: false,
          dashboard: true,
          usuarios: true,
          perfis: true,
          lojas: true,
          estoque: true,
          envio: true,
          recebimento: true,
          manutencao: true,
          relatorios: true,
        },
      },
      {
        name: "Gerente",
        permissions: {
          lojaEspecifica: true,
          dashboard: true,
          usuarios: false,
          perfis: false,
          lojas: false,
          estoque: true,
          envio: true,
          recebimento: true,
          manutencao: false,
          relatorios: true,
        },
      },
      {
        name: "Caixa",
        permissions: {
          lojaEspecifica: true,
          dashboard: false,
          usuarios: false,
          perfis: false,
          lojas: false,
          estoque: false,
          envio: false,
          recebimento: true,
          manutencao: true,
          relatorios: false,
        },
      }
    );
    localStorage.setItem("perfilList", JSON.stringify(perfilList));
  }
}

let deleteIndex;

function formatPermissions(permissions) {
  let allowedPermissions = Object.entries(permissions)
    .filter(([key, value]) => value)
    .map(([key]) => {
      switch (key) {
        case "justStore":
          return "Apenas loja";
        case "dashboard":
          return "Dashboard";
        case "users":
          return "Gestão de Usuários";
        case "profile":
          return "Gestão de Perfis";
        case "store":
          return "Gestão de Lojas";
        case "stock":
          return "Gestão de Estoque";
        case "send":
          return "Gestão de Envio";
        case "receive":
          return "Gestão de Recebimento";
        case "maintenance":
          return "Manutenção";
        case "reports":
          return "Relatórios";
        default:
          return key;
      }
    });

  return allowedPermissions.length > 0
    ? allowedPermissions.join(", ")
    : "Sem permissões";
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
  let perfilList = await fetchData("profile");

  var html = "";
  perfilList.forEach(function (element, index) {
    html += "<tr>";
    html += `<td>${element.profile_name}</td>`;
    html += `<td>${formatPermissions(element.description)}</td>`;
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
  if (validateFormRegister()) {
    var nomePerfil = document.getElementById("nomePerfil").value.trim();

    var permissions = {};

    document
      .querySelectorAll('#newPerfil input[type="checkbox"]')
      .forEach(function (checkbox) {
        permissions[checkbox.value] = checkbox.checked;
      });

    let perfilList = JSON.parse(localStorage.getItem("perfilList")) || [];

    perfilList.push({
      name: nomePerfil,
      permissions: permissions,
    });

    localStorage.setItem("perfilList", JSON.stringify(perfilList));

    document.getElementById("open-modal-criarPerfil").classList.remove("show");

    showData();

    document.getElementById("nomePerfil").value = "";
    document
      .querySelectorAll('#newPerfil input[type="checkbox"]')
      .forEach(function (checkbox) {
        checkbox.checked = false;
      });
  }
}

function openModalDeleteUser(index) {
  deleteIndex = index;
  let perfilList = JSON.parse(localStorage.getItem("perfilList")) || [];

  const userName = perfilList[index].name;
  document.querySelector(".containerDelete").innerHTML = `
       <h2> Realmente deseja deletar o perfil <strong>${userName}</strong>?</h2>
        <button type="button" id="delete" class="btn-del" onclick="deleteData()">
          Deletar
        </button>
      `;

  document.getElementById("open-modal-DeletePerfilUser").classList.add("show");
}

function closeModalDeleteUser() {
  document
    .getElementById("open-modal-DeletePerfilUser")
    .classList.remove("show");
}

function deleteData() {
  let perfilList = JSON.parse(localStorage.getItem("perfilList")) || [];

  perfilList.splice(deleteIndex, 1);
  localStorage.setItem("perfilList", JSON.stringify(perfilList));
  document.getElementById("open-modal-DeletePerfilUser").classList.remove("show");

  showData();
}

function validateFormEdit() {
  var nomePerfilEdit = document
    .getElementById("nomePerfilEditPerfil")
    .value.trim();

  if (!nomePerfilEdit) {
    alert("Por favor, preencha o nome do perfil.");
    return false;
  }

  const permissionsChecked = document.querySelectorAll(
    '#example input[type="checkbox"]:checked'
  );

  if (permissionsChecked.length === 0) {
    alert("Por favor, selecione pelo menos uma permissão.");
    return false;
  }

  return true;
}

function updateData(index) {
  console.log(index);
  // Exibe o modal de edição
  document.getElementById("open-modal-editUser").classList.add("show");

  // Obtém a lista de perfis do localStorage
  let perfilList = JSON.parse(localStorage.getItem("perfilList")) || [];
  console.log(perfilList[index]);

  // Verifica se o índice é válido
  if (!perfilList[index]) {
    console.error(`Perfil com índice ${index} não encontrado.`);
    return;
  }

  // Preenche o nome do perfil no campo de edição
  document.getElementById("nomePerfilEditPerfil").value =
    perfilList[index].name;

  // Preenche as permissões nos checkboxes
  const permissions = perfilList[index].permissions || {};

  document.querySelector('#example input[value="lojaEspecifica"]').checked =
    permissions.lojaEspecifica || false;
  document.querySelector('#example input[value="dashboard"]').checked =
    permissions.dashboard || false;
  document.querySelector('#example input[value="usuarios"]').checked =
    permissions.usuarios || false;
  document.querySelector('#example input[value="perfis"]').checked =
    permissions.perfis || false;
  document.querySelector('#example input[value="lojas"]').checked =
    permissions.lojas || false;
  document.querySelector('#example input[value="estoque"]').checked =
    permissions.estoque || false;
  document.querySelector('#example input[value="envio"]').checked =
    permissions.envio || false;
  document.querySelector('#example input[value="recebimento"]').checked =
    permissions.recebimento || false;
  document.querySelector('#example input[value="manutencao"]').checked =
    permissions.manutencao || false;
  document.querySelector('#example input[value="relatorios"]').checked =
    permissions.relatorios || false;

  // Define a ação de atualização no formulário de edição
  document
    .querySelector("#formEditPerfil")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateFormEdit()) {
        // Atualiza o nome do perfil
        perfilList[index].name = document.getElementById(
          "nomePerfilEditPerfil"
        ).value;

        // Atualiza as permissões do perfil
        perfilList[index].permissions = {
          lojaEspecifica: document.querySelector(
            '#example input[value="lojaEspecifica"]'
          ).checked,
          dashboard: document.querySelector('#example input[value="dashboard"]')
            .checked,
          usuarios: document.querySelector('#example input[value="usuarios"]')
            .checked,
          perfis: document.querySelector('#example input[value="perfis"]')
            .checked,
          lojas: document.querySelector('#example input[value="lojas"]')
            .checked,
          estoque: document.querySelector('#example input[value="estoque"]')
            .checked,
          envio: document.querySelector('#example input[value="envio"]')
            .checked,
          recebimento: document.querySelector(
            '#example input[value="recebimento"]'
          ).checked,
          manutencao: document.querySelector(
            '#example input[value="manutencao"]'
          ).checked,
          relatorios: document.querySelector(
            '#example input[value="relatorios"]'
          ).checked,
        };

        // Salva as atualizações no localStorage
        localStorage.setItem("perfilList", JSON.stringify(perfilList));

        // Fecha o modal
        document.getElementById("open-modal-editUser").classList.remove("show");

        // Atualiza a exibição de dados
        showData();

        // Limpa o campo de nome do perfil
        document.getElementById("nomePerfilEditPerfil").value = "";
      }
    });
}

document.addEventListener("DOMContentLoaded", function () {
  initializeperfilList();
  showData();
  showDataPerfilUsuario();
});

// SEARCH
function openModalCadPerfil() {
  document.getElementById("open-modal-cadPerfil").classList.add("show");
  loadPerfis();
}

function closeModalCadPerfil() {
  document.getElementById("open-modal-cadPerfil").classList.remove("show");
}

function showUserList() {
  const ul = document.getElementById("myMenu");
  const registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  // Limpa a lista antes de adicionar novos itens
  ul.innerHTML = "";

  // Adiciona os usuários à lista
  registerList.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="selectUser('${user.name}')">${user.name}</a>`;
    ul.appendChild(li);
  });

  // Exibe a lista se houver usuários
  ul.style.display = registerList.length > 0 ? "block" : "none";
}

// Função para filtrar os usuários enquanto o usuário digita
function filterUsers() {
  const input = document.getElementById("mySearch");
  const filter = input.value.toUpperCase();
  const ul = document.getElementById("myMenu");
  const li = ul.getElementsByTagName("li");

  // Loop para filtrar itens da lista
  for (let i = 0; i < li.length; i++) {
    const a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ""; // Mostra o item
    } else {
      li[i].style.display = "none"; // Esconde o item
    }
  }
}

// Função para selecionar o usuário e preencher o campo de busca
function selectUser(userName) {
  document.getElementById("mySearch").value = userName; // Preenche o campo de busca com o nome do usuário
  document.getElementById("myMenu").style.display = "none"; // Esconde a lista após a seleção
}

// Função para carregar perfis ao abrir o modal ou ao selecionar um usuário
function loadPerfis() {
  let perfilList = JSON.parse(localStorage.getItem("perfilList")) || [];
  let perfilOptionsContainer = document.getElementById("perfil-options");

  perfilOptionsContainer.innerHTML = ""; // Limpa opções anteriores

  perfilList.forEach((perfil) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${perfil.name}</td>
      <td>
        <input type="checkbox" class="perfil-checkbox" value="${perfil.name}" />
      </td>
    `;
    perfilOptionsContainer.appendChild(row);
  });
}

// Função para salvar o perfil selecionado para o usuário
function savePerfilToUser() {
  let selectedUser = document.getElementById("mySearch").value;
  let checkboxes = document.querySelectorAll(".perfil-checkbox");

  let selectedPerfis = [];
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedPerfis.push(checkbox.value); // Adiciona o perfil se estiver marcado
    }
  });

  if (selectedUser && selectedPerfis.length > 0) {
    let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

    // Encontra o usuário e atribui os perfis selecionados
    registerList = registerList.map((user) => {
      if (user.name === selectedUser) {
        return { ...user, perfis: selectedPerfis }; // Atualiza o usuário com os perfis selecionados
      }
      return user;
    });

    localStorage.setItem("registerList", JSON.stringify(registerList));
    alert("Perfis atribuídos com sucesso!");

    // Fecha o modal ou limpa os campos, conforme necessário
    closeModalCadPerfil();
    showDataPerfilUsuario();
  } else {
    alert("Por favor, selecione um usuário e ao menos um perfil.");
  }
}

async function showDataPerfilUsuario() {
  let registerList = await fetchData("association");

  var html = "";
  registerList.forEach(function (element, index) {
    html += "<tr>";
    html += `<td>${element.registration}</td>`;
    html += `<td>${element.id_profile}</td>`;
    html += '<td class="buttons">';
    html +=
      `
          <button type="button" class="btn btn-primary btn-xs dt-edit" onclick="openModalEditUserAssociacao(` +
      index +
      `)">
            <img src="./assets/images/edit-pencil.svg" alt="Botão Editar" width="25px"/>
          </button>
          <button type="button" class="btn btn-danger btn-xs dt-delete" onclick="openModalDeleteUserAssociacao(` +
      index +
      `)">
            <img src="./assets/images/delete-trash.svg" alt="Botão Excluir" width="25px"/>
          </button>
        `;
    html += "</td>";
    html += "</tr>";
  });

  document.querySelector("#user-perfil-table tbody").innerHTML = html;
}

function openModalEditUserAssociacao(index) {
  let registerList = JSON.parse(localStorage.getItem("registerList")) || [];
  let perfilList = JSON.parse(localStorage.getItem("perfilList")) || [];

  // Preenche o campo de nome do usuário no modal
  document.getElementById("nomePerfilAssociacao").value =
    registerList[index].name;

  // Carrega os perfis e marca os checkboxes de acordo com os perfis já atribuídos
  let perfilOptionsContainer = document.getElementById("perfil-options-edit");
  perfilOptionsContainer.innerHTML = "";

  perfilList.forEach((perfil) => {
    let isChecked = registerList[index].perfis.includes(perfil.name)
      ? "checked"
      : "";
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${perfil.name}</td>
        <td>
          <input type="checkbox" class="perfil-checkboxAssociacao" value="${perfil.name}" ${isChecked} />
        </td>
      `;
    perfilOptionsContainer.appendChild(row);
  });

  document.getElementById("open-modal-editAssociacao").classList.add("show");
}

document
  .getElementById("editAssociacao")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let userName = document.getElementById("nomePerfilAssociacao").value;
    let checkboxes = document.querySelectorAll(".perfil-checkboxAssociacao");

    let selectedPerfis = [];
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        selectedPerfis.push(checkbox.value);
      }
    });

    let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

    registerList = registerList.map((user) => {
      if (user.name === userName) {
        return { ...user, perfis: selectedPerfis };
      }
      return user;
    });

    localStorage.setItem("registerList", JSON.stringify(registerList));

    closeModalEditAssociacao();
    showDataPerfilUsuario();
  });

function closeModalEditAssociacao() {
  document.getElementById("open-modal-editAssociacao").classList.remove("show");
}

function openModalDeleteUserAssociacao(index) {
  let containerDelete = document.querySelector(".containerDeleteAssociacao");
  let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  const nome = registerList[index].name;
  containerDelete.innerHTML = `
    <h3>Deseja realmente excluir os perfis do usuário ${nome}?</h3>
    <buttontype="button" id="delete" class="btn-del" onclick="deletePerfilFromUser('${index}')">Confirmar</button>
  `;
  document
    .getElementById("open-modal-DeleteUserAssociacao")
    .classList.add("show");
}

function closeModalDeleteUserAssociacao() {
  document
    .getElementById("open-modal-DeleteUserAssociacao")
    .classList.remove("show");
}

function deletePerfilFromUser(index) {
  let registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  registerList.splice(index, 1);

  localStorage.setItem("registerList", JSON.stringify(registerList));
  closeModalDeleteUserAssociacao();
  showDataPerfilUsuario();
}
