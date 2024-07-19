from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
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

# Função para extrair os links dos CNPJs
def extrair_links(driver):
    try:
        wait = WebDriverWait(driver, 10)
        elementos = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.box a[href]")))
        hrefs = [elemento.get_attribute("href") for elemento in elementos]
        return hrefs
    except:
        return []
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
            except Exception as e:
                dados_cnpj[campo] = "Não encontrado pelo extrator."
                print(f"Erro ao extrair {campo}: {e}")

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

# Função para escrever dados na página, separado por input
def dadosBusca(driver, elemento, texto_para_digitar):    
    try:
        driver.execute_script("arguments[0].scrollIntoView(true);", elemento)
        for texto in texto_para_digitar:
            elemento.send_keys(texto)
            elemento.send_keys(Keys.ARROW_DOWN)
            elemento.send_keys(Keys.RETURN)
            elemento.send_keys(Keys.ESCAPE)
    except Exception as e:
        print("Erro: " + str(e))

def clicar_checkbox(driver, texto):
    try:
        checkbox_label = driver.find_element(By.XPATH, f"//span[contains(text(), '{texto}')]")
        driver.execute_script("""
            var iframes = document.getElementsByTagName('iframe');
            for (var i = 0; i < iframes.length; i++) {
                iframes[i].style.display = 'none';
            }
            var scripts = document.getElementsByTagName('script');
            for (var i = scripts.length - 1; i >= 0; i--) {
                if (scripts[i].src.startsWith('https://static.cloudflareinsights.com/beacon.min.js')) {
                    scripts[i].parentNode.removeChild(scripts[i]);
                }
            }
            var elements = document.querySelectorAll('div[style*="position: absolute"], div[style*="position: fixed"]');
            elements.forEach(function(element) {
                element.style.display = 'none';
            });
            var element = document.getElementById('aswift_6_host');
            if (element) {
                element.style.display = 'none';
            }
            var elements = document.querySelectorAll('ins.adsbygoogle');
            elements.forEach(function(element) {
                element.style.display = 'none';
            });
            var ads = document.querySelectorAll('div._2ckkx');
            ads.forEach(function(ad) {
                ad.style.display = 'none';
            });
            var elements = document.querySelectorAll('[id^="ad"]');
            elements.forEach(function(element) {
                element.remove();
            });
        """)
        try:
            checkbox_label.click()
        except Exception as e:
            print(f"Erro tentativa 1: {e}")
            time.sleep(5)
            driver.execute_script("""
                var iframes = document.getElementsByTagName('iframe');
                for (var i = 0; i < iframes.length; i++) {
                    iframes[i].style.display = 'none';
                }
                var scripts = document.getElementsByTagName('script');
                for (var i = scripts.length - 1; i >= 0; i--) {
                    if (scripts[i].src.startsWith('https://static.cloudflareinsights.com/beacon.min.js')) {
                        scripts[i].parentNode.removeChild(scripts[i]);
                    }
                }
                var elements = document.querySelectorAll('div[style*="position: absolute"], div[style*="position: fixed"]');
                elements.forEach(function(element) {
                    element.style.display = 'none';
                });
                var element = document.getElementById('aswift_6_host');
                if (element) {
                    element.style.display = 'none';
                }
                var elements = document.querySelectorAll('ins.adsbygoogle');
                elements.forEach(function(element) {
                    element.style.display = 'none';
                });
                var ads = document.querySelectorAll('div._2ckkx');
                ads.forEach(function(ad) {
                    ad.style.display = 'none';
                });
                var elements = document.querySelectorAll('[id^="ad"]');
                elements.forEach(function(element) {
                    element.remove();
                });
            """)
            try:
                checkbox_label.click()
            except:
                print("Não foi mesmo. :(")    
    except Exception as e:
        print('*' * 50)
        print(texto)
        print('*' * 50)
        print("Erro: " + str(e))

# Função principal para coletar os dados dos CNPJs
def coletar_dados_cnpjs(url):
    inicio = datetime.now()
    driver = inicializar_driver()
    abrir_pagina(driver, url)
    wait = WebDriverWait(driver, 10)

    # Aqui eu filtro quais dados desejo selecionar
    textoRazaoSocial = []
    textoCNAE = []
    checkCnae2 = False
    textoNatureza = []
    selecao = ""
    textoUF = []
    textoMunicipio = []
    textoBairro = []
    textoCep = []
    textoDDD = []
    textoDataDe = []
    textoDataAte = []
    textoCapitalDe = []
    textoCapitalAte = []
    checkSomenteMei = False
    checkExcluirMei = False
    checkMatriz = False
    checkFilial = False
    checkComTelefone = False
    checkFixo = False
    checkCelular = False
    checkEmail = False

    if textoRazaoSocial:
        inputRazaoSocial = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Razão Social ou Fantasia" and @class="input is-is-normal" and @type="is-info"]')))
        dadosBusca(driver, inputRazaoSocial, textoRazaoSocial)

    if textoCNAE:
        inputCNAE = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Código ou nome da atividade" and @class="input is-is-normal" and @type="text"]')))
        dadosBusca(driver, inputCNAE, textoCNAE)

    if checkCnae2:
        clicar_checkbox(driver, "Incluir Atividade Secundária")

    if textoNatureza:
        inputNatureza = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Código ou nome da natureza" and @class="input is-is-normal" and @type="is-info"]')))
        dadosBusca(driver, inputNatureza, textoNatureza)
        
    if selecao:
        inputSelecao = wait.until(EC.presence_of_element_located((By.TAG_NAME, 'select')))
        inputSelecao.send_keys(selecao)
        inputSelecao.send_keys(Keys.TAB)

    if textoUF:
        inputUF = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Selecione o estado" and @class="input is-is-normal" and @type="text"]')))
        dadosBusca(driver, inputUF, textoUF)

    if textoMunicipio:
        inputMunicipio = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Selecione um município"]')))
        dadosBusca(driver, inputMunicipio, textoMunicipio)

    if textoBairro:
        inputBairro = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Digite o nome do bairro"]')))
        dadosBusca(driver, inputBairro, textoBairro)

    if textoCep:
        inputCep = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Somente 8 digitos"]')))
        dadosBusca(driver, inputCep, textoCep)

    if textoDDD:
        inputDDD = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="2 dígitos"]')))
        dadosBusca(driver, inputDDD, textoDDD)

    if textoDataDe:
        inputDataDe = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="A partir de" and @class="input" and @type="date"]')))
        dadosBusca(driver, inputDataDe, textoDataDe)

    if textoDataAte:
        inputDataAte = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Até" and @class="input" and @type="date"]')))
        dadosBusca(driver, inputDataAte, textoDataAte)

    if textoCapitalDe:
        inputCapitalDe = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="A partir de" and @type="number"]')))
        dadosBusca(driver, inputCapitalDe, textoCapitalDe)

    if textoCapitalAte:
        inputCapitalAte = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Até" and @type="number"]')))
        dadosBusca(driver, inputCapitalAte, textoCapitalAte)

    if checkSomenteMei:
        clicar_checkbox(driver, " Somente MEI ")

    if checkExcluirMei:
        clicar_checkbox(driver, " Excluir MEI ")

    if checkMatriz:
        clicar_checkbox(driver, " Somente matriz ")

    if checkFilial:
        clicar_checkbox(driver, " Somente filial ")

    if checkComTelefone:
        clicar_checkbox(driver, " Com contato de telefone ")

    if checkFixo:
        clicar_checkbox(driver, " Somente fixo ")

    if checkCelular:
        clicar_checkbox(driver, " Somente celular ")

    if checkEmail:
        clicar_checkbox(driver, " Com e-mail ")

    # Nesta parte eu inicio a pesquisa
    pesquisar = wait.until(EC.element_to_be_clickable((By.XPATH, '//a[contains(@class, "button") and contains(@class, "is-success") and contains(@class, "is-medium") and text()="Pesquisar"]')))
    driver.execute_script("arguments[0].scrollIntoView(true);", pesquisar)
    pesquisar.click()

    dados_cnpjs = []
    cont = 0

    hrefs = extrair_links(driver)
    if hrefs:
        for href in hrefs:
            cont += 1
            processar_link(href, dados_cnpjs)
            print(cont)
            if cont == 10:
                break
    else: print("Nada consta.")
    fim = datetime.now()
    print(Fore.RED + f"Começo: {inicio} Fim: {fim}" + Style.RESET_ALL)
    print(dados_cnpjs)

# Executa a coleta de dados
url = "https://casadosdados.com.br/solucao/cnpj/pesquisa-avancada"
coletar_dados_cnpjs(url)
