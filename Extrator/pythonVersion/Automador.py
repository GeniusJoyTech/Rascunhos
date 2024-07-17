from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
import time
from colorama import init, Fore, Style

# Inicializa a colorama
init(autoreset=True)

# Função para inicializar o driver do navegador
def inicializar_driver():
    options = webdriver.ChromeOptions()
    options.add_argument('--log-level=3')
    driver = webdriver.Chrome(options=options)
    return driver

# Função para abrir a página e clicar no botão de pesquisa
def abrir_pagina(driver, url):
    driver.get(url)
    pesquisar = driver.find_element(By.CSS_SELECTOR, ".button.is-success.is-medium")
    driver.execute_script("arguments[0].scrollIntoView(true);", pesquisar)
    pesquisar.click()

# Função para extrair os links dos CNPJs
def extrair_links(driver):
    wait = WebDriverWait(driver, 10)
    elementos = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.box a[href]")))
    hrefs = [elemento.get_attribute("href") for elemento in elementos]
    return hrefs

# Função para extrair os dados de um CNPJ
def extrair_dados_cnpj(driver, href):
    campos = [
        ("CNPJ", '//label[contains(text(), "CNPJ:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("RazaoSocial", '//label[contains(text(), "Razão Social:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("NomeFantasia", '//label[contains(text(), "Nome Fantasia:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("SituacaoCadastral", '//label[contains(text(), "Situação Cadastral:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("DataSituacao", '//label[contains(text(), "Data da Situação:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("Abertura", '//label[contains(text(), "Data de Abertura:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("MatrizOuFilial", '//label[contains(text(), "Matriz ou Filial:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("NaturezaJuridica", '//label[contains(text(), "Natureza Jurídica:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("EmpresaMEI", '//label[contains(text(), "Empresa MEI:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("CapitalSocial", '//label[contains(text(), "Capital Social:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("Logradouro", '//label[contains(text(), "Logradouro:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("Numero", '//label[contains(text(), "Número:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("Complemento", '//label[contains(text(), "Complemento:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("Bairro", '//label[contains(text(), "Bairro:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("CEP", '//label[contains(text(), "CEP:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("Municipio", '//label[contains(text(), "Municipio:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("Estado", '//label[contains(text(), "Estado:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("Email", '//label[contains(text(), "Email:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("Telefone", '//label[contains(text(), "Telefone:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("CNAEPrincipal", '//label[contains(text(), "CNAE Principal:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("CNAEsSecundarios", '//label[contains(text(), "CNAEs Secundários:")]/following-sibling::p[@data-v-36e2f600]'),
        ("Simples", '//label[contains(text(), "Simples:")]/following-sibling::p[@class="has-text-weight-bold"]'),
        ("Socios", '//label[contains(text(), "Sócios:")]/following-sibling::p[@data-v-36e2f600]')
    ]

    dados_cnpj = {"Href": href}

    # Tenta extrair os dados duas vezes, recriando o driver na segunda tentativa
    for tentativa in range(2):
        if tentativa == 1:
            print(Fore.RED + f"Segunda Tentativa em {href}" + Style.RESET_ALL)
            driver.quit()
            time.sleep(7)
            driver = inicializar_driver()
            driver.get(href)
            time.sleep(2)

        for campo, xpath in campos:
            try:
                elemento = driver.find_element(By.XPATH, xpath)
                dados_cnpj[campo] = elemento.text.strip()
            except:
                dados_cnpj[campo] = "Não encontrado pelo extrator."

        if "Não encontrado pelo extrator." not in dados_cnpj.values():
            break

    return dados_cnpj

# Função para coletar dados de um link
def processar_link(href, dados_cnpjs):
    driver = inicializar_driver()
    driver.get(href)
    time.sleep(2)
    try:
        dados_cnpj = extrair_dados_cnpj(driver, href)
        dados_cnpjs.append(dados_cnpj)
        print_dados_cnpj(dados_cnpj)
    except Exception as e:
        print('*' * 50)
        print(Fore.RED + 'Erro desconhecido:' + str(e) + Style.RESET_ALL)
        print('*' * 50)
    finally:
        driver.quit()

# Função para imprimir os dados de um CNPJ
def print_dados_cnpj(dados_cnpj):
    print("Dados do CNPJ:")
    for chave, valor in dados_cnpj.items():
        print(f"{chave}: {valor}")
    print("=" * 50)

# Função principal para coletar os dados dos CNPJs
def coletar_dados_cnpjs(url):
    inicio = datetime.now()
    driver = inicializar_driver()
    abrir_pagina(driver, url)
    hrefs = extrair_links(driver)
    driver.quit()

    dados_cnpjs = []

    cont = 0

    for href in hrefs:
        cont += 1
        processar_link(href, dados_cnpjs)
        print(cont)
        if cont == 10:
            break

    fim = datetime.now()
    print(Fore.RED + f"Começo: {inicio} Fim: {fim}" + Style.RESET_ALL)
    print(dados_cnpjs)

# Executa a coleta de dados
url = "https://casadosdados.com.br/solucao/cnpj/pesquisa-avancada"
coletar_dados_cnpjs(url)
