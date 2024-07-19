from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

import time


# Função para inicializar o driver do navegador
def inicializar_driver():
    options = webdriver.ChromeOptions()
    options.add_argument('--log-level=3')
    driver = webdriver.Chrome(options=options)
    return driver

# Função para abrir a página e clicar no botão de pesquisa
def abrir_pagina(driver, url):
    return driver.get(url)

# Função para escrever dados na página, separado por input
def dadosBusca(driver, elemento, texto_para_digitar):    
    try:
        # driver.execute_script("arguments[0].scrollIntoView(true);", elemento)
        for texto in texto_para_digitar:
                elemento.send_keys(texto)
                
                # Pressiona a seta para baixo
                elemento.send_keys(Keys.ARROW_DOWN)
                # Pressiona Enter
                elemento.send_keys(Keys.RETURN)
                
                # Pressiona Esc
                elemento.send_keys(Keys.ESCAPE)
                
    except Exception as e:
        print("Erro: " + str(e))
    # driver.execute_script("arguments[0].scrollIntoView(true);", pesquisar)
    # pesquisar.click()
def clicar_checkbox(driver, texto):
    
    try:
        # Localiza o label pelo texto e então encontra o input checkbox dentro do label
        checkbox_label = driver.find_element(By.XPATH, f"//span[.//text()[contains(., '{texto}')]]")
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
# Parte de processamento
url = "https://casadosdados.com.br/solucao/cnpj/pesquisa-avancada"

driver = inicializar_driver()
abrir_pagina(driver, url)

textoRazaoSocial = ["Teste", "Testando"]
if textoRazaoSocial:
    inputRazaoSocial = driver.find_element(By.XPATH, '//input[@placeholder="Razão Social ou Fantasia" and @class="input is-is-normal" and @type="is-info"]')
    dadosBusca(driver, inputRazaoSocial, textoRazaoSocial)

textoCNAE = ["4721102", "5611202"]
if textoCNAE:
    inputCNAE = driver.find_element(By.XPATH, '//input[@placeholder="Código ou nome da atividade" and @class="input is-is-normal" and @type="text"]')
    dadosBusca(driver, inputCNAE, textoCNAE)

checkCnae2 = True
if checkCnae2:
    clicar_checkbox(driver, "Incluir Atividade Secundária")

textoNatureza = ["1023"]
if textoNatureza:
    inputNatureza = driver.find_element(By.XPATH, '//input[@placeholder="Código ou nome da atividade" and @class="input is-is-normal" and @type="text"]')
    dadosBusca(driver, inputNatureza, textoNatureza)
    
selecao = "Inapta"
if selecao:
    inputSelecao = driver.find_element(By.TAG_NAME, 'select')
    inputSelecao.send_keys(selecao)
    inputSelecao.send_keys(Keys.TAB)

textoUF = ["São Paulo", "Acre"]
if textoUF:
    inputUF = driver.find_element(By.XPATH, '//input[@placeholder="Selecione o estado" and @class="input is-is-normal" and @type="text"]')
    dadosBusca(driver, inputUF, textoUF)

textoMunicipio = ["Sorocaba", "Acrelandia"]
if textoMunicipio:
    inputMunicipio = driver.find_element(By.XPATH, '//input[@placeholder="Selecione um município"]')
    dadosBusca(driver, inputMunicipio, textoMunicipio)

textoBairro = ["Central Parque"]
if textoBairro:
    inputBairro = driver.find_element(By.XPATH, '//input[@placeholder="Digite o nome do bairro"]')
    dadosBusca(driver, inputBairro, textoBairro)

textoCep = ["18051360"]
if textoCep:
    inputCep = driver.find_element(By.XPATH, '//input[@placeholder="Somente 8 digitos"]')
    dadosBusca(driver, inputCep, textoCep)

textoDDD = ["15"]
if textoDDD:
    inputDDD = driver.find_element(By.XPATH, '//input[@placeholder="2 dígitos"]')
    dadosBusca(driver, inputDDD, textoDDD)


textoDataDe = ["24-06-1998"]
if textoDataDe:
    inputDataDe = driver.find_element(By.XPATH, '//input[@placeholder="A partir de" and @class="input" and @type="date"]')
    dadosBusca(driver, inputDataDe, textoDataDe)

textoDataAte = ["24-06-2025"]
if textoDataAte:
    inputDataAte = driver.find_element(By.XPATH, '//input[@placeholder="Até" and @class="input" and @type="date"]')
    dadosBusca(driver, inputDataAte, textoDataAte)

textoCapitalDe = ["2406"]
if textoCapitalDe:
    inputCapitalDe = driver.find_element(By.XPATH, '//input[@placeholder="A partir de" and @type="number"]')
    dadosBusca(driver, inputCapitalDe, textoCapitalDe)

textoCapitalAte = ["2025"]
if textoCapitalAte:
    inputCapitalAte = driver.find_element(By.XPATH, '//input[@placeholder="Até" and @type="number"]')
    dadosBusca(driver, inputCapitalAte, textoCapitalAte)

checkSomenteMei = True
if checkSomenteMei:
    clicar_checkbox(driver, " Somente MEI ")

checkExcluirMei = True
if checkExcluirMei:
    clicar_checkbox(driver, " Excluir MEI ")

checkMatriz = True
if checkMatriz:
    clicar_checkbox(driver, " Somente matriz ")

checkFilial = True
if checkFilial:
    clicar_checkbox(driver, " Somente filial ")

checkComTelefone = True
if checkComTelefone:
    clicar_checkbox(driver, " Com contato de telefone ")

checkFixo = True
if checkFixo:
    clicar_checkbox(driver, " Somente fixo ")

checkCelular = True
if checkCelular:
    clicar_checkbox(driver, " Somente celular ")

checkEmail = True
if checkEmail:
    clicar_checkbox(driver, " Com e-mail ")
driver.quit()
