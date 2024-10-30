// CRUD REGISTER
function validateFormRegister() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var loja = document.getElementById("loja").value.trim();
  var password = document.getElementById("password").value.trim();
  var passwordRepeat = document.getElementById("passwordRepeat").value.trim();

  if (!name || !email || !loja || !password || !passwordRepeat) {
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

  if (password != passwordRepeat) {
    alert("As senhas devem ser iguais");
    return false;
  }

  return true;
}

document.getElementById("register").onsubmit = function (e) {
  e.preventDefault();
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
    window.location.href = "./registerObs.html";

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("loja").value = "";
    document.getElementById("password").value = "";
  }
};
