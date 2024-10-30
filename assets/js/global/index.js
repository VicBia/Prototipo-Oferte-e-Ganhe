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

function openModalSolicitacao() {
  document.getElementById("open-modal-solicitacao").classList.add("show");
}

function closeModalSolicitacao() {
  document.getElementById("open-modal-solicitacao").classList.remove("show");
}

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

function configureMenuByPerfil() {
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

  // Cria um objeto para armazenar todas as permissões agregadas dos perfis do usuário
  let combinedPermissions = {};

  // Itera sobre os perfis do usuário e combina as permissões
  user.perfis.forEach((userPerfil) => {
    const perfilData = perfilList.find((perfil) => perfil.name === userPerfil);

    if (perfilData && perfilData.permissions) {
      Object.keys(perfilData.permissions).forEach((permission) => {
        // Se a permissão for verdadeira em qualquer perfil, ela será mantida como verdadeira
        if (perfilData.permissions[permission]) {
          combinedPermissions[permission] = true;
        }
      });
    }
  });

  // Seleciona todos os itens da navegação
  const allLinks = document.querySelectorAll("#menu-hamb-section nav ul li");

  allLinks.forEach((link) => {
    const permission = link.getAttribute("data-permission");

    // Verifica se a permissão agregada permite exibir o link
    if (!combinedPermissions[permission]) {
      link.style.display = "none"; // Esconde o link se o perfil não tem permissão
    } else {
      link.style.display = ""; // Exibe o link se a permissão está presente
    }
  });
}

// Chama a função quando a página carregar

function logout() {
  const authenticatedUser = JSON.parse(
    sessionStorage.getItem("authenticatedUser")
  );

  if (authenticatedUser) {
    const registerList = JSON.parse(localStorage.getItem("registerList")) || [];
    const updatedUsers = registerList.map((user) => {
      if (user.email === authenticatedUser.email) {
        user.isLoggedIn = false;
      }
      return user;
    });
    localStorage.setItem("registerList", JSON.stringify(updatedUsers));

    sessionStorage.removeItem("authenticatedUser");

    window.location.href = "./login.html";
  }
}

document.getElementById("logoutButton").onclick = logout;

function checkSession() {
  const authenticatedUser = JSON.parse(
    sessionStorage.getItem("authenticatedUser")
  );

  if (!authenticatedUser) {
    alert("Sessão expirada ou não iniciada. Faça login novamente.");
    window.location.href = "./login.html";
  }
}

window.addEventListener("load", () => {
  checkSession(); 
  configureMenuByPerfil(); 
});



