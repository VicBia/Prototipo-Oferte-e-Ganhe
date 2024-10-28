// Função que exibe ou oculta o conteúdo do relatório
function toggleContent(contentId) {
  const content = document.getElementById(contentId);
  content.style.display = content.style.display === "block" ? "none" : "block";
}

// Função que exibe ou oculta a lista de lojas dependendo da escolha do relatório
function toggleLojas(show, lojasId) {
  const lojasDiv = document.getElementById(lojasId);
  if (show) {
    lojasDiv.style.display = "block";
    populateLojas(lojasId); // Preencher as lojas ao exibir o campo
  } else {
    lojasDiv.style.display = "none";
  }
}

// Função que popula as lojas com checkboxes baseado em lojaList armazenado no localStorage
function populateLojas(lojasId) {
  const lojaList = JSON.parse(localStorage.getItem("lojaList")) || [];
  const lojasCheckboxes = document.getElementById(lojasId);

  // Limpar checkboxes existentes antes de adicionar novos
  lojasCheckboxes.innerHTML = "";

  // Iterar sobre lojaList e criar checkboxes para cada loja
  lojaList.forEach(function (element) {
    const checkboxContainer = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = element.loja;
    checkbox.id = element.loja;

    const label = document.createElement("label");
    label.htmlFor = element.loja;
    label.textContent = element.loja;

    // Adicionar checkbox e label ao container
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);

    // Adicionar o container ao div de checkboxes
    lojasCheckboxes.appendChild(checkboxContainer);
  });
}

// Função para processar o relatório com base nas lojas selecionadas
function processarRelatorio(lojasCheckboxesId) {
  const selectedLojas = [];
  const checkboxes = document.querySelectorAll(
    `#${lojasCheckboxesId} input[type='checkbox']`
  );

  // Iterar sobre as checkboxes e adicionar as selecionadas ao array
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedLojas.push(checkbox.value);
    }
  });

  if (selectedLojas.length > 0) {
    console.log("Lojas selecionadas: ", selectedLojas);
    alert("Relatório gerado para as lojas: " + selectedLojas.join(", "));
  } else {
    alert("Nenhuma loja selecionada.");
  }
}
