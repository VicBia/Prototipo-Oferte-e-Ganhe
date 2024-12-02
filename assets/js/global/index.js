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

function configureMenuByPerfil() {
  const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));

  if (!user || !user.profiles || user.profiles.length === 0) {
    alert("Usuário não autenticado ou sem perfis.");
    window.location.href = "/login";
    return;
  }

  const userProfiles = user.profiles; // Lista de perfis do usuário
  console.log("Perfis do usuário:", userProfiles);

  // Seleciona todos os itens do menu
  const allLinks = document.querySelectorAll("#menu-hamb-section nav ul li");

  allLinks.forEach((link) => {
    const permission = link.getAttribute("data-permission");

    // Verifica se o usuário tem a permissão correspondente para exibir o item do menu
    if (!userProfiles.includes(permission)) {
      link.style.display = "none"; 
    } else {
      link.style.display = ""; 
    }
  });
}

document.addEventListener("DOMContentLoaded", configureMenuByPerfil);


async function logout() {
  try {
    // Faz a chamada para o backend para realizar o logout
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", 
    });

    if (response.ok) {
      // Se o logout for bem-sucedido no backend, redireciona para a página de login
      sessionStorage.removeItem("authenticatedUser"); 
      window.location.href = "/login";
    } else {
      const errorData = await response.json();
      console.error("Erro ao fazer logout:", errorData.message);
      alert("Erro ao fazer logout. Tente novamente.");
    }
  } catch (erro) {
    console.error("Erro durante o logout:", erro);
    alert("Erro ao fazer logout. Tente novamente.");
  }
}

document.getElementById("logoutButton").onclick = logout;

function checkSession() {
  const authenticatedUser = JSON.parse(
    sessionStorage.getItem("authenticatedUser")
  );

  if (!authenticatedUser) {
    alert("Sessão expirada ou não iniciada. Faça login novamente.");
    window.location.href = "/login";
  }
}

window.onload = function () {
  let user = JSON.parse(sessionStorage.getItem("authenticatedUser")) || {
    name: "Usuário",
  };
  document.getElementById("loggedUser").textContent = user.name;
};

window.addEventListener("load", () => {
  checkSession();
  configureMenuByPerfil();
});

function exportTableToCSV() {
  showCSVExportModal();
}

function showCSVExportModal() {
  const modal = document.getElementById("csvExportModal");

  modal.classList.add("show");

  setTimeout(() => {
    modal.classList.remove("show");
  }, 1000);
}
