// CRUD LOJA
function validateFormRegister() {
  var codLoja = document.getElementById("codLoja").value.trim();
  var name = document.getElementById("name").value.trim();

  if (!codLoja || !name) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  return true;
}

let deleteIndex;
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/api/store", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados de lojas:", error);
    alert("Erro ao se conectar ao servidor. Tente novamente mais tarde.");
  }
}

async function showData() {
  let lojaList = await fetchData();

  var html = "";
  lojaList.forEach(function (element, index) {
    html += "<tr>";
    html += `<td>${element.store_name}</td>`;
    html += `<td>${element.store_number}</td>`;
    html += '<td class="buttons">';
    html += `
        <button type="button" class="btn btn-primary btn-xs dt-edit" onclick="updateData(${index})">
          <img src="./assets/images/edit-pencil.svg" alt="Botão Editar" width="25px"/>
        </button>
        <button type="button" class="btn btn-danger btn-xs dt-delete" onclick="openModalDeleteUser(${index})">
          <img src="./assets/images/delete-trash.svg" alt="Botão Excluir" width="25px"/>
        </button>
      `;
    html += "</td>";
    html += "</tr>";
  });

  document.querySelector("#registerCRUD tbody").innerHTML = html;
}

async function addData() {
  if (validateFormRegister() == true) {
    var codLoja = document.getElementById("codLoja").value.trim();
    var name = document.getElementById("name").value.trim();

    let lojaList = await fetchData();

    lojaList.push({
      store_name: name,
      store_number: codLoja,
    });

    // Enviar dados atualizados para a API
    await fetch("http://localhost:3000/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        store_name: name,
        store_number: codLoja,
      }),
    });

    document.getElementById("open-modal-cadUser").classList.remove("show");

    showData();

    document.getElementById("codLoja").value = "";
  }
}

async function openModalDeleteUser(index) {
  let lojaList = await fetchData();

  const store_name = lojaList[index].store_name;
  document.querySelector(".containerDelete").innerHTML = `
     <h2> Realmente deseja deletar a loja <strong>${store_name}</strong>?</h2>
      <button type="button" id="delete" class="btn-del" onclick="deleteData(${index})">
        Deletar
      </button>
    `;

  document.getElementById("open-modal-DeleteUser").classList.add("show");
}

function closeModalDeleteUser() {
  document.getElementById("open-modal-DeleteUser").classList.remove("show");
}

async function deleteData(index) {
  let lojaList = await fetchData();

  const id_store = lojaList[index].id_store;

  // Enviar requisição DELETE para a API
  await fetch(`http://localhost:3000/api/store/${id_store}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  document.getElementById("open-modal-DeleteUser").classList.remove("show");

  showData();
}

function validateFormEdit() {
  var codLoja = document.getElementById("codLojaEdit").value.trim();
  var name = document.getElementById("nameEdit").value.trim();

  if (!codLoja || !name) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  return true;
}

async function updateData(index) {
  document.getElementById("open-modal-editUser").classList.add("show");

  let lojaList = await fetchData();

  document.getElementById("nameEdit").value = lojaList[index].store_name;
  document.getElementById("codLojaEdit").value = lojaList[index].store_number;

  document.querySelector("#update").onclick = async function (event) {
    event.preventDefault(); 

    // Chama a função de validação
    if (validateFormEdit()) {
      let updatedName = document.getElementById("nameEdit").value;
      let updatedCodLoja = document.getElementById("codLojaEdit").value;

      try {
        await fetch(
          `http://localhost:3000/api/store/${lojaList[index].id_store}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              store_name: updatedName,
              store_number: updatedCodLoja,
            }),
          }
        );

        // Fechar modal e atualizar os dados exibidos
        document.getElementById("open-modal-editUser").classList.remove("show");
        showData();

        // Limpar os campos após a atualização
        document.getElementById("codLojaEdit").value = "";
        document.getElementById("nameEdit").value = "";
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
        alert("Ocorreu um erro ao atualizar a loja.");
      }
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  showData();
});
