from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
url = "https://casadosdados.com.br/solucao/cnpj/pesquisa-avancada"

# Inicializa o driver do Chrome
driver = webdriver.Chrome()

try:
    # Abre a página web
    driver.get(url)

    # Encontra o elemento do botão de pesquisa e clica
    pesquisar = driver.find_element(By.CSS_SELECTOR, ".button.is-success.is-medium")
    driver.execute_script("arguments[0].scrollIntoView(true);", pesquisar)
    pesquisar.click()

    # Define a espera explícita para os elementos <a> na lista de resultados
    wait = WebDriverWait(driver, 10)
    elementos = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.box a[href]")))
    hrefs = [elemento.get_attribute("href") for elemento in elementos]

    # Lista para armazenar os dados de cada CNPJ
    dados_cnpjs = []

    # Função para extrair dados de um CNPJ
    def extrair_dados_cnpj(href):
        driver.get(href)
        time.sleep(2)  # Aguarda um pouco para garantir que a página esteja totalmente carregada
        
        def extrair_texto_xpath(xpath):
            try:
                elemento = driver.find_element(By.XPATH, xpath)
                return elemento.text.strip()
            except Exception as e:
                print(f"Erro ao extrair {xpath}: {e}")
                return "Não encontrado"

        # Extrai dados usando os XPaths fornecidos
        cnpj = extrair_texto_xpath('//label[contains(text(), "CNPJ:")]/following-sibling::p[@class="has-text-weight-bold"]')
        razaoSocial = extrair_texto_xpath('//label[contains(text(), "Razão Social:")]/following-sibling::p[@class="has-text-weight-bold"]')
        nomeFantasia = extrair_texto_xpath('//label[contains(text(), "Nome Fantasia:")]/following-sibling::p[@class="has-text-weight-bold"]')
        situacaoCadastral = extrair_texto_xpath('//label[contains(text(), "Situação Cadastral:")]/following-sibling::p[@class="has-text-weight-bold"]')
        dataSituacao = extrair_texto_xpath('//label[contains(text(), "Data da Situação:")]/following-sibling::p[@class="has-text-weight-bold"]')
        abertura = extrair_texto_xpath('//label[contains(text(), "Data de Abertura:")]/following-sibling::p[@class="has-text-weight-bold"]')
        matrizOuFilial = extrair_texto_xpath('//label[contains(text(), "Matriz ou Filial:")]/following-sibling::p[@class="has-text-weight-bold"]')
        naturezaJuridica = extrair_texto_xpath('//label[contains(text(), "Natureza Jurídica:")]/following-sibling::p[@class="has-text-weight-bold"]')
        empresaMei = extrair_texto_xpath('//label[contains(text(), "Empresa MEI:")]/following-sibling::p[@class="has-text-weight-bold"]')
        capitalSocial = extrair_texto_xpath('//label[contains(text(), "Capital Social:")]/following-sibling::p[@class="has-text-weight-bold"]')
        logradouro = extrair_texto_xpath('//label[contains(text(), "Logradouro:")]/following-sibling::p[@class="has-text-weight-bold"]')
        numero = extrair_texto_xpath('//label[contains(text(), "Número:")]/following-sibling::p[@class="has-text-weight-bold"]')
        complemento = extrair_texto_xpath('//label[contains(text(), "Complemento:")]/following-sibling::p[@class="has-text-weight-bold"]')
        bairro = extrair_texto_xpath('//label[contains(text(), "Bairro:")]/following-sibling::p[@class="has-text-weight-bold"]')
        cep = extrair_texto_xpath('//label[contains(text(), "CEP:")]/following-sibling::p[@class="has-text-weight-bold"]')
        municipio = extrair_texto_xpath('//label[contains(text(), "Municipio:")]/following-sibling::p[@class="has-text-weight-bold"]')
        estado = extrair_texto_xpath('//label[contains(text(), "Estado:")]/following-sibling::p[@class="has-text-weight-bold"]')
        email = extrair_texto_xpath('//label[contains(text(), "Email:")]/following-sibling::p[@class="has-text-weight-bold"]')
        telefone = extrair_texto_xpath('//label[contains(text(), "Telefone:")]/following-sibling::p[@class="has-text-weight-bold"]')
        cnaePrincipal = extrair_texto_xpath('//label[contains(text(), "CNAE Principal:")]/following-sibling::p[@class="has-text-weight-bold"]')
        cnaesSecundarios = extrair_texto_xpath('//label[contains(text(), "CNAEs Secundários:")]/following-sibling::p[@class="has-text-weight-bold"]')
        simples = extrair_texto_xpath('//label[contains(text(), "Simples:")]/following-sibling::p[@class="has-text-weight-bold"]')
        socios = extrair_texto_xpath('//label[contains(text(), "Sócios:")]/following-sibling::p[@class="has-text-weight-bold"]')

        # Armazena os dados em um dicionário
        dados = {
            "CNPJ": cnpj,
            "RazaoSocial": razaoSocial,
            "NomeFantasia": nomeFantasia,
            "SituacaoCadastral": situacaoCadastral,
            "DataSituacao": dataSituacao,
            "Abertura": abertura,
            "MatrizOuFilial": matrizOuFilial,
            "NaturezaJuridica": naturezaJuridica,
            "EmpresaMEI": empresaMei,
            "CapitalSocial": capitalSocial,
            "Logradouro": logradouro,
            "Numero": numero,
            "Complemento": complemento,
            "Bairro": bairro,
            "CEP": cep,
            "Municipio": municipio,
            "Estado": estado,
            "Email": email,
            "Telefone": telefone,
            "CNAEPrincipal": cnaePrincipal,
            "CNAEsSecundarios": cnaesSecundarios,
            "Simples": simples,
            "Socios": socios
        }

        return dados

    # Itera sobre os links dos CNPJs encontrados
    for href in hrefs:
        dados_cnpj = extrair_dados_cnpj(href)
        if dados_cnpj:
            dados_cnpjs.append(dados_cnpj)
            # Imprime os dados do CNPJ
            print("Dados do CNPJ:")
            for chave, valor in dados_cnpj.items():
                print(f"{chave}: {valor}")
            print("=" * 50)  # Separador visual entre os dados de diferentes CNPJs

finally:
    # Fecha o navegador
    driver.quit()
