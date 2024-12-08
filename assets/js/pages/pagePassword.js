document
  .getElementById("forgotPasswordForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Instruções de reset de senha foram enviadas para seu e-mail.");
      } else {
        alert(result.error || "Erro ao enviar email.");
      }
    } catch (error) {
      alert("Erro ao tentar enviar o e-mail. Tente novamente.");
      console.error(error);
    }
  });
