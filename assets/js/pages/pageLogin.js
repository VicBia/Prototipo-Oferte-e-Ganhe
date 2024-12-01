const LOGIN_TIMEOUT = 10 * 200 * 1000; // Timeout de sessão
const MAX_ATTEMPTS = 3; // Máximo de tentativas de login
let loginAttempts = 0;

async function authenticateLogin(email, password) {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, user_password: password }), // Enviar email e senha corretamente
    });

    if (response.ok) {
      const data = await response.json();

      // Armazenar informações do usuário no sessionStorage (exceto token, que é armazenado no cookie)
      sessionStorage.setItem(
        "authenticatedUser",
        JSON.stringify({
          name: data.usuario.user_name,
          profiles: data.usuario.profiles,
        })
      );

      // Redirecionar o usuário conforme seus perfis
      redirectUserByPerfil(data.usuario.profiles);
      console.log("redirect");

      // Definir tempo limite de sessão
      setTimeout(() => {
        alert("Sessão expirada, por favor faça login novamente.");
        logout();
      }, LOGIN_TIMEOUT);
    } else {
      const error = await response.json();
      alert(error.message || "Email ou senha incorretos.");
      loginAttempts++;

      // Checar se o número de tentativas atingiu o máximo permitido
      if (loginAttempts >= MAX_ATTEMPTS) {
        alert(
          "Número máximo de tentativas atingido. Tente novamente mais tarde."
        );
      }
    }
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
    alert("Erro ao se conectar ao servidor. Tente novamente mais tarde.");
  }
}

function redirectUserByPerfil(perfis) {
  console.log("entrou");
  console.log("perfis", perfis);

  const authenticatedUser = JSON.parse(
    sessionStorage.getItem("authenticatedUser")
  );

  if (!authenticatedUser || !authenticatedUser.profiles) {
    console.error("Lista de perfis não encontrada no sessionStorage.");
    alert("Erro ao carregar perfis de usuário. Contate o administrador.");
    return;
  }

  const perfilList = authenticatedUser.profiles;
  console.log("perfilList", perfilList);

  // Definindo as rotas e suas permissões correspondentes
  const routes = [
    { url: "/dashboard", permission: "dashboard" },
    { url: "/gestao_usuarios", permission: "users" },
    { url: "/gestao_perfis", permission: "profile" },
    { url: "/gestao_lojas", permission: "store" },
    { url: "/estoque", permission: "stock" },
    { url: "/gestao_envio", permission: "send" },
    { url: "/gestao_recebimento", permission: "receive" },
    { url: "/manutencao", permission: "maintenance" },
    { url: "/relatorios", permission: "reports" },
  ];

  // Itera sobre os perfis do usuário logado
  for (const perfil of perfis) {
    console.log("perfil of perfis");
    // Verifica se o perfil está na lista de perfis do sessionStorage
    if (perfilList.includes(perfil)) {
      // Itera sobre as rotas para verificar as permissões do perfil
      for (const route of routes) {
        // Verifica se o perfil corresponde à permissão da rota
        if (perfil === route.permission) {
          // Redireciona o usuário para a primeira rota permitida
          window.location.href = route.url;
          console.log("Redirecionando para:", route.url);
          return;
        }
      }
    } else {
      console.warn(`Perfil ${perfil} não encontrado na lista de perfis.`);
    }
  }

  // Caso nenhuma permissão corresponda, redireciona para o dashboard
  console.warn(
    "Nenhuma permissão correspondente encontrada. Redirecionando ao dashboard."
  );
  window.location.href = "/dashboard";
}

// Captura o evento de submissão do formulário de login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  authenticateLogin(email, password); // Chama a função de autenticação
});

// Função para checar tentativas de login
function checkLoginAttempts() {
  if (loginAttempts >= MAX_ATTEMPTS) {
    alert(
      "Muitas tentativas de login falhadas. Por favor, tente novamente mais tarde."
    );
  }
}
