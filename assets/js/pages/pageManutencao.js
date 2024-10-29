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
        status: "Solicitado",
      });

      localStorage.setItem("taloesList", JSON.stringify(taloesList));
    } else {
      alert("Por favor, preencha todos os campos.");
    }

    modal.style.display = "none";
  });

function getData() {
  const taloesList = JSON.parse(localStorage.getItem("taloesList")) || [];

  var html = "";
  taloesList.forEach(function (element, index) {
    if (element.status === "Enviado" || element.status === "Atrasado") {
      html += "<tr>";
      html += `<td>${element.loja}</td>`;
      html += `<td>${element.quantidade}</td>`;
      html += `<td>${element.dataEnvio}</td>`;
      html += `<td>${element.previsaoChegada}</td>`;
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

document.addEventListener("DOMContentLoaded", function () {
  initializeTaloesList();
  getData();
});
