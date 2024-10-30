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

    redirectUserByPerfil(user.perfis);
  // } else if (user.isLoggedIn) {
  //   alert("O usuário já está logado em outro dispositivo.");
  //   return;
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
  const perfilList = JSON.parse(localStorage.getItem("perfilList"));

  if (!perfilList) {
    console.error("Lista de perfis não encontrada no localStorage.");
    return;
  }

  const routes = [
    { url: "/PrototipoOrganizado/pageDashboard.html", permission: "dashboard" },
    { url: "/PrototipoOrganizado/pageEstoque.html", permission: "estoque" },
    { url: "/PrototipoOrganizado/pageEnvio.html", permission: "envio" },
    {
      url: "/PrototipoOrganizado/pageRecebimento.html",
      permission: "recebimento",
    },
    {
      url: "/PrototipoOrganizado/pageManutencao.html",
      permission: "manutencao",
    },
    { url: "/PrototipoOrganizado/pageAdm.html", permission: "usuarios" },
    { url: "/PrototipoOrganizado/pagePerfis.html", permission: "perfis" },
    { url: "/PrototipoOrganizado/pageLoja.html", permission: "lojas" },
    {
      url: "/PrototipoOrganizado/pageRelatorios.html",
      permission: "relatorios",
    },
  ];

  for (const perfil of perfis) {
    const perfilData = perfilList.find((p) => p.name === perfil);

    if (perfilData) {
      for (const route of routes) {
        if (perfilData.permissions[route.permission]) {
          window.location.href = route.url; 
          return;
        }
      }
    }
  }

  window.location.href = "/PrototipoOrganizado/pageDashboard.html"; 
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
