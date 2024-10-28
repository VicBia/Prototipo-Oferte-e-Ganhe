// Função para autenticar o login
function authenticateLogin(email, password) {
  const registerList = JSON.parse(localStorage.getItem("registerList")) || [];

  // Verifica se o usuário existe e a senha está correta
  const user = registerList.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    // Autenticação bem-sucedida, guarda o perfil do usuário
    sessionStorage.setItem(
      "authenticatedUser",
      JSON.stringify({
        name: user.name,
        perfis: user.perfis,
      })
    );
    alert("Login bem-sucedido!");

    // Redireciona o usuário com base no perfil
    redirectUserByPerfil(user.perfis);
  } else {
    alert("Email ou senha incorretos.");
  }
}

// Função para redirecionar o usuário com base no perfil
function redirectUserByPerfil(perfis) {
  if (perfis.includes("ADM")) {
    window.location.href = "/PrototipoOrganizado/pageDashboard.html"; // Exemplo de redirecionamento para admin
  } else if (perfis.includes("Gerente")) {
    window.location.href = "/PrototipoOrganizado/pageDashboard.html"; // Exemplo de redirecionamento para gerente
  } else if (perfis.includes("Caixa")) {
    window.location.href = "/PrototipoOrganizado/pageManutencao.html"; // Exemplo de redirecionamento para caixa
  } else {
    window.location.href = "/PrototipoOrganizado/pageManutencao.html"; // Redirecionamento padrão
  }
}

// Adiciona o evento de submit ao formulário de login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Previne o comportamento padrão do formulário

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Chama a função de autenticação
  authenticateLogin(email, password);
});
