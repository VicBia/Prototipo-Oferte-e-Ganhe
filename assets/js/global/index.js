// Menu Dropdown

function toggleDropdown() {
  var dropdown = document.getElementById("dropdownMenu");
  dropdown.classList.toggle("show");
}

// Modal

function openModalCaduser() {
  document.getElementById("open-modal-cadUser").classList.add("show");
}

function closeModalCaduser() {
  document.getElementById("open-modal-cadUser").classList.remove("show");
}

function closeModalEdituser() {
  document.getElementById("open-modal-editUser").classList.remove("show");
}

function openModalCriarPerfil() {
  document.getElementById("open-modal-criarPerfil").classList.add("show");
}

function closeModalCriarPerfil() {
  document.getElementById("open-modal-criarPerfil").classList.remove("show");
}

function closeModalEditPerfil() {
  document.getElementById("open-modal-editUser").classList.remove("show");
}

// function openModalCadPerfil() {
//   document.getElementById("open-modal-cadPerfil").classList.add("show");
// }

// function closeModalCadPerfil() {
//   document.getElementById("open-modal-cadPerfil").classList.remove("show");
// }

// Menu hamburguer

var menuButton = document.getElementById("menu-hamb");
var menu = document.getElementById("menu-hamb-section");
var open = document.getElementById("open");
var close = document.getElementById("close");

menuButton.addEventListener("click", function () {
  if (menu.style.display === "block") {
    menu.style.display = "none";
    open.style.display = "block";
    close.style.display = "none";
  } else {
    menu.style.display = "block";
    open.style.display = "none";
    close.style.display = "block";
  }
});

// Autenticação

// Função para configurar o menu com base nas permissões do perfil
function configureMenuByPerfil() {
  // Obtém o perfil do usuário autenticado
  const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));

  if (!user || !user.perfis) {
    alert("Usuário não autenticado ou sem perfil.");
    window.location.href = "./login.html"; // Redireciona para login se não estiver autenticado
    return;
  }

  // Obtém a lista de perfis do localStorage
  const perfilList = JSON.parse(localStorage.getItem("perfilList"));

  if (!perfilList) {
    console.error("Perfil não encontrado no localStorage.");
    return;
  }

  // Obtém as permissões do perfil do usuário
  const userPerfil = user.perfis[0]; // Considerando que o usuário tem um único perfil
  const perfilData = perfilList.find((perfil) => perfil.name === userPerfil);

  if (!perfilData) {
    console.error("Perfil não encontrado na lista de perfis.");
    return;
  }

  // Seleciona todos os itens da navegação
  const allLinks = document.querySelectorAll("#menu-hamb-section nav ul li");

  allLinks.forEach((link) => {
    const permission = link.getAttribute("data-permission");

    // Verifica se a permissão existe no perfil do usuário
    if (!perfilData.permissions[permission]) {
      link.style.display = "none"; // Esconde o link se o perfil não tem permissão
    }
  });
}

// Chama a função quando a página carregar

function logout() {
  const authenticatedUser = JSON.parse(
    sessionStorage.getItem("authenticatedUser")
  );

  if (authenticatedUser) {
    // Atualiza o status do usuário no localStorage
    const registerList = JSON.parse(localStorage.getItem("registerList"));
    const updatedUsers = registerList.map((user) => {
      if (user.email === authenticatedUser.email) {
        user.isLoggedIn = false;
      }
      return user;
    });
    localStorage.setItem("registerList", JSON.stringify(updatedUsers));

    // Remove o usuário autenticado do sessionStorage
    sessionStorage.removeItem("authenticatedUser");

    // Redireciona para a página de login
    window.location.href = "./PrototipoOrganizado/login.html";
  }
}

document.getElementById("logoutButton").onclick = logout;

function checkSession() {
  const authenticatedUser = JSON.parse(
    sessionStorage.getItem("authenticatedUser")
  );

  if (!authenticatedUser) {
    alert("Sessão expirada ou não iniciada. Faça login novamente.");
    window.location.href = "./login.html"; // Redireciona para a página de login
  }
}

window.onload = configureMenuByPerfil;
window.onload = checkSession;
