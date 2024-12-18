function initializeTaloesList() {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  if (taloesList.length === 0) {
    taloesList.push(
      {
        loja: "126",
        previsaoChegada: "2024-10-30",
        quantidade: "37",
        status: "Enviado",
        dataEnvio: "2024-10-12 15:36",
        remessa: "D5EG56142",
      },
      { loja: "126", quantidade: "49", status: "Em espera" },
      { loja: "54", quantidade: "35", status: "Em espera" },
      { loja: "21", quantidade: "67", status: "Em espera" },
      { loja: "51", quantidade: "56", status: "Solicitado" },
      {
        loja: "201",
        previsaoChegada: "2024-10-30",
        quantidade: "37",
        status: "Recebido",
        dataEnvio: "2024-10-12 15:36",
        dataRecebimento: "2024-10-29 09:30",
        pessoaRecebido: "Mario Augusto",
        remessa: "G45S9Q842",
      },
      {
        loja: "89",
        previsaoChegada: "2024-11-02",
        quantidade: "45",
        status: "Enviado",
        dataEnvio: "2024-10-15 12:45",
        remessa: "F8E456S95",
      },
      {
        loja: "34",
        quantidade: "22",
        status: "Solicitado",
      },
      {
        loja: "132",
        previsaoChegada: "2024-11-01",
        quantidade: "30",
        status: "Enviado",
        dataEnvio: "2024-10-18 10:15",
        remessa: "A12D56Q48",
      },
      {
        loja: "78",
        quantidade: "60",
        status: "Solicitado",
      },
      {
        loja: "99",
        previsaoChegada: "2024-11-03",
        quantidade: "40",
        status: "Recebido",
        dataEnvio: "2024-10-20 08:30",
        dataRecebimento: "2024-10-29 16:45",
        pessoaRecebido: "Anna Giulia",
        remessa: "GW85A4621",
      },
      {
        loja: "56",
        previsaoChegada: "2024-10-28",
        quantidade: "50",
        status: "Enviado",
        dataEnvio: "2024-10-14 14:20",
        remessa: "G1D26S458",
      },
      {
        loja: "110",
        quantidade: "70",
        status: "Solicitado",
      },
      {
        loja: "201",
        previsaoChegada: "2024-10-15",
        quantidade: "37",
        status: "Atrasado",
        dataEnvio: "2024-09-12 15:36",
        remessa: "T1W254E64",
      },
      {
        loja: "89",
        previsaoChegada: "2024-10-02",
        quantidade: "45",
        status: "Atrasado",
        dataEnvio: "2024-09-03 12:45",
        remessa: "Q123W4E68",
      }
    );
    localStorage.setItem("taloesList", JSON.stringify(taloesList));
  }
}

function openModalSolicitacao() {
  document.getElementById("open-modal-solicitacao").classList.add("show");

  const authenticatedUser = JSON.parse(
    sessionStorage.getItem("authenticatedUser")
  );
  if (authenticatedUser && authenticatedUser.loja) {
    document.getElementById("loja").value = authenticatedUser.loja;
  }
}

function closeModalSolicitacao() {
  document.getElementById("open-modal-solicitacao").classList.remove("show");
}

document
  .getElementById("talonarioForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const loja = document.getElementById("loja").value;
    const quantidade = document.getElementById("quantidade").value;

    if (loja && quantidade) {
      alert(
        `Solicitação de ${quantidade} talões para a loja ${loja} foi gerada!`
      );
      let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

      taloesList.push({
        loja: loja,
        quantidade: quantidade,
        status: "Em espera",
      });

      localStorage.setItem("taloesList", JSON.stringify(taloesList));
    } else {
      alert("Por favor, preencha todos os campos.");
    }

    modal.style.display = "none";
  });

function getData() {
  const user = JSON.parse(sessionStorage.getItem("authenticatedUser"));

  if (!user || !user.profiles || user.profiles.length === 0) {
    alert("Usuário não autenticado ou sem perfil.");
    window.location.href = "./login.html";
    return;
  }

  const perfilList = JSON.parse(localStorage.getItem("perfilList"));
  if (!perfilList) {
    console.error("Lista de perfis não encontrada no localStorage.");
    return;
  }

  let hasLojaEspecifica = false;
  let lojaEspecifica = "";

  user.profiles.forEach((userPerfil) => {
    const perfilData = perfilList.find((perfil) => perfil.name === userPerfil);
    if (
      perfilData &&
      perfilData.permissions &&
      perfilData.permissions.lojaEspecifica
    ) {
      hasLojaEspecifica = true;
      lojaEspecifica = user.loja;
    }
  });

  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  if (hasLojaEspecifica) {
    taloesList = taloesList.filter(
      (element) => element.loja === lojaEspecifica
    );
  }

  var html = "";
  taloesList.forEach(function (element, index) {
    if (element.status === "Enviado" || element.status === "Atrasado") {
      html += `<tr class="manutencao">   `;
      html += `<td>${element.loja}</td>`;
      html += `<td>${element.quantidade}</td>`;
      html += `<td>${element.dataEnvio}</td>`;
      html += `<td>${element.previsaoChegada}</td>`;
      html += `<td>${element.remessa}</td>`;
      html += "<td>";
      html +=
        `
        <button type="button" class="btn btn-add btn-xs dt-add"  onclick="details(` +
        index +
        `)">
                  Detalhes
                </button>`;
      html += "</td>";
      html += '<td class="buttons">';
      html += `
        <button type="button" class="btn btn-primary btn-xs dt-edit" onclick="updateData(${index})">
            <img src="./assets/images/edit-pencil.svg" alt="Botão Editar" width="25px"/>
            </button>`;
      html += "</td>";
      html += "</tr>";
    }
  });

  document.getElementById("enviadosBody").innerHTML = html;
}

function updateData(index) {
  document.getElementById("open-modal-recebido").classList.add("show");

  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];
  const selectedTalao = taloesList[index];

  document.getElementById("editLoja").value = selectedTalao.loja;
  document.getElementById("editQuantidade").value = selectedTalao.quantidade;

  document.getElementById("recebimentoForm").onsubmit = function (e) {
    e.preventDefault();

    const dataRecebimento = document.getElementById("dataRecebimento").value;
    const horaRecebimento = document.getElementById("horaRecebimento").value;
    const pessoaRecebido = document.getElementById("pessoaRecebido").value;

    if (!dataRecebimento || !horaRecebimento || !pessoaRecebido) {
      alert("Por favor, preencha todos os campos de envio e previsão.");
      return;
    }

    const envioFormatado = `${dataRecebimento} ${horaRecebimento}`;

    selectedTalao.dataRecebimento = envioFormatado;
    selectedTalao.pessoaRecebido = pessoaRecebido;
    selectedTalao.status = "Recebido";

    taloesList[index] = selectedTalao;
    localStorage.setItem("taloesList", JSON.stringify(taloesList));

    closeModalRecebido();
    getDataEnviados();
    getDataRecebidos();
  };
}

function details(index) {
  let taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  document.querySelector(".containerDetails").innerHTML = `
     <h2>Detalhes manutenção loja <strong>${taloesList[index].loja}</strong></h2>
    <span>Quantidade: ${taloesList[index].quantidade}</span>
    <span>Data do envio: ${taloesList[index].dataEnvio}</span>
    <span>Previsão: ${taloesList[index].previsaoChegada}</span>
    <span>Remessa: ${taloesList[index].remessa}</span>
    `;

  document.getElementById("open-modal-detalhes").classList.add("show");
}

function closeModalDetails() {
  document.getElementById("open-modal-detalhes").classList.remove("show");
}

function closeModalRecebido() {
  document.getElementById("open-modal-recebido").classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
  initializeTaloesList();
  getData();
});
