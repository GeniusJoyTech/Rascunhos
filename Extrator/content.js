// Função para criar o botão de download
function createDownloadButton() {
  const button = document.createElement('button');
  button.id = 'downloadJSON';
  button.innerText = 'Download JSON';
  button.style.position = 'fixed';
  button.style.top = '10px';
  button.style.right = '10px';
  button.style.zIndex = 1000;
  button.style.padding = '10px';
  button.style.backgroundColor = '#4CAF50';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.borderRadius = '5px';
  button.style.display = 'none';
  document.body.appendChild(button);

  button.addEventListener('click', downloadJSON);
}

// Função para baixar os dados em formato JSON
function downloadJSON() {
  if (window.apiResponseData && window.apiResponseData.data && window.apiResponseData) {
    console.log('Preparing data for download.');
    const jsonData = JSON.stringify(window.apiResponseData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'apiResponse.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('Download initiated.');
  } else {
    alert('Por favor, faça uma pesquisa primeiro.');
  }
}

// Função para adicionar um listener ao botão de pesquisa
function addSearchButtonListener() {
  const searchButton = document.querySelector('a.button.is-success.is-medium');
  if (searchButton) {
    searchButton.addEventListener('click', (event) => {
      event.preventDefault(); // Previne a ação padrão do botão
      console.log('Search button clicked.');

      // Obtendo dados do formulário de pesquisa
      const payload = getSearchPayload();
      console.log('Payload:', payload);

      fetch("https://api.casadosdados.com.br/v2/public/cnpj/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          console.log('Response received.');
          return response.json();
        })
        .then(data => {
          console.log('Data parsed.', data);
          window.apiResponseData = data;
          console.log('API response data:', data);

          const links = document.querySelectorAll('a[target="_blank"]');
          const hrefs = Array.from(links).map(link => link.getAttribute('href'));

          console.log('HREFs dos links:', hrefs);
          const link = document.createElement('a');
          link.href = hrefs[3]; // Define o atributo href
          link.target = '_blank'; // Define o atributo target para abrir em uma nova aba
          link.style.display = 'none'; // Opcional: Esconde o link para não aparecer na página
          document.body.appendChild(link); // Adiciona o link ao corpo do documento
          // alert('Pesquisa concluída. Clique no botão "Download JSON" para baixar os dados.');
          // document.getElementById('downloadJSON').style.display = 'block';
        })
        .catch(error => console.error('Erro:', error));
    });
  } else {
    console.error('Search button not found.');
  }
}

// Obtém os dados do formulário de pesquisa
function getSearchPayload() {
  // Obtenha os valores dos campos do formulário e construa o payload
  return {
    "query": {
      "termo": [],
      "atividade_principal": [],
      "natureza_juridica": [],
      "uf": [],
      "municipio": [],
      "bairro": [],
      "situacao_cadastral": "ATIVA",
      "cep": [],
      "ddd": []
    },
    "range_query": {
      "data_abertura": {
        "lte": null,
        "gte": null
      },
      "capital_social": {
        "lte": null,
        "gte": null
      }
    },
    "extras": {
      "somente_mei": false,
      "excluir_mei": false,
      "com_email": false,
      "incluir_atividade_secundaria": false,
      "com_contato_telefonico": false,
      "somente_fixo": false,
      "somente_celular": false,
      "somente_matriz": false,
      "somente_filial": false
    },
    "page": 1
  };
}

// Inicia a criação do botão de download e adiciona o listener ao botão de pesquisa
createDownloadButton();
addSearchButtonListener();
