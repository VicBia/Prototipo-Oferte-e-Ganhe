const LOGIN_TIMEOUT = 10 * 2 * 10;
const MAX_ATTEMPTS = 3;
let loginAttempts = 0;

function authenticateLogin(email, password) {
  const registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  const user = registerList.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    user.isLoggedIn = true;
    sessionStorage.setItem(
      "authenticatedUser",
      JSON.stringify({
        name: user.name,
        loja: user.loja,
        perfis: user.perfis,
      })
    );
    alert("Login bem-sucedido!");

    redirectUserByPerfil(user.perfis);
  } else if (user.isLoggedIn) {
    alert("O usuário já está logado em outro dispositivo.");
    return;
  } else {
    alert("Email ou senha incorretos.");
    loginAttempts++;
    checkLoginAttempts();
  }

  setTimeout(() => {
    alert("Sessão expirada, por favor faça login novamente.");
    logout();
  }, LOGIN_TIMEOUT);
}

function redirectUserByPerfil(perfis) {
  if (perfis.includes("ADM")) {
    window.location.href = "/PrototipoOrganizado/pageDashboard.html";
  } else if (perfis.includes("Gerente")) {
    window.location.href = "/PrototipoOrganizado/pageDashboard.html";
  } else if (perfis.includes("Caixa")) {
    window.location.href = "/PrototipoOrganizado/pageManutencao.html";
  } else {
    window.location.href = "/PrototipoOrganizado/pageManutencao.html";
  }
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  authenticateLogin(email, password);
});

function checkLoginAttempts() {
  if (loginAttempts >= MAX_ATTEMPTS) {
    alert(
      "Muitas tentativas de login falhadas. Por favor, tente novamente mais tarde."
    );
  }
}
