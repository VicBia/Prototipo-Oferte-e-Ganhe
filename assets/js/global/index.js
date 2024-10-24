// // Tabela alerta

// document.querySelectorAll("tr").forEach(function (row) {
//   row.querySelectorAll("td").forEach(function (cell) {
//     if (
//       cell.textContent.trim() === "ALERTA" ||
//       cell.textContent.trim() === "Atrasado"
//     ) {
//       row.style.backgroundColor = "#f96060";
//       row.style.color = "#fff";
//       row.style.fontWeight = "600";
//     }
//   });
// });

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

function openModalCadPerfil() {
  document.getElementById("open-modal-cadPerfil").classList.add("show");
}

function closeModalCadPerfil() {
  document.getElementById("open-modal-cadPerfil").classList.remove("show");
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
