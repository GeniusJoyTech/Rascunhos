from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from datetime import datetime
from tkinter import ttk
from colorama import init, Fore, Style



import tkinter as tk
import time
import pandas as pd
import sys
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
    links = []
    
    # Espera até que o elemento <p class="subtitle is-5"> esteja presente
    wait = WebDriverWait(driver, 15)
    try:
        elemento_p = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "p.subtitle.is-5")))
        # Encontra o elemento <b> dentro do elemento <p>
        elemento_b = elemento_p.find_element(By.TAG_NAME, "b")
        
        # Extrai o texto do elemento <b> e converte para inteiro, removendo pontos
        numero_resultados = int(elemento_b.text.replace('.', ''))
        
        pagina_atual = 1
        if numero_resultados > 20:
            max_paginas = numero_resultados // 20
        else:
            max_paginas = numero_resultados
        
        ####Remover essa parte depois################################
        ####Remover essa parte depois################################
        ####Remover essa parte depois################################
        
        max_paginas = 2
        
        ####Remover essa parte depois################################
        ####Remover essa parte depois################################
        ####Remover essa parte depois################################
        
        
        while pagina_atual <= max_paginas:
            try:
                wait = WebDriverWait(driver, 10)
                elementos = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.box a[href]")))
                hrefs = [elemento.get_attribute("href") for elemento in elementos]
                links.extend(hrefs)
                seta = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "i.fa.fa-angle-right")))
                seta.click()
            except:
                time.sleep(5)
            pagina_atual +=1
        return links     
    except: return []       
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
            #print(Fore.RED + f"Segunda Tentativa em {href}" + Style.RESET_ALL)
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
        #print_dados_cnpj(dados_cnpj)
    except Exception as e:
        print('*' * 50)
        print(Fore.RED + 'Erro desconhecido:' + str(e) + Style.RESET_ALL)
        print('*' * 50)
    finally:
        driver.quit()

# # Função para imprimir os dados de um CNPJ
# def print_dados_cnpj(dados_cnpj):
#     print("Dados do CNPJ:")
#     for chave, valor in dados_cnpj.items():
#         print(f"{chave}: {valor}")
#     print("=" * 50)

# Função para escrever dados na página, separado por input
def dadosBusca(driver, elemento, texto_para_digitar):
    try:
        driver.execute_script("arguments[0].scrollIntoView(true);", elemento)
        elementos_para_digitar = texto_para_digitar.split(',')  # Divide o texto por vírgulas
        for texto in elementos_para_digitar:
            elemento.send_keys(texto.strip())  # Envia a palavra completa
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
            # print(f"Erro tentativa 1: {e}")
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
                # print("Não foi mesmo. :(")    
                return
    except Exception as e:
        print('*' * 50)
        print(texto)
        print('*' * 50)
        print("Erro: " + str(e))

def caixaDialogoUsuario():
    class FiltroDialog(tk.Toplevel):
        def __init__(self, master=None):
            super().__init__(master)
            self.title("Extrator casa dos dados. #Protótipo para teste.")
            self.geometry("800x800")

            self.resultado = {}

            # Cria um canvas e uma barra de rolagem
            self.canvas = tk.Canvas(self)
            self.scroll_y = tk.Scrollbar(self, orient="vertical", command=self.canvas.yview)
            self.scroll_x = tk.Scrollbar(self, orient="horizontal", command=self.canvas.xview)
            self.frame = tk.Frame(self.canvas)
            self.frame.bind("<Configure>", lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all")))
            
            self.canvas.create_window((0, 0), window=self.frame, anchor="nw")
            self.canvas.configure(yscrollcommand=self.scroll_y.set, xscrollcommand=self.scroll_x.set)

            self.scroll_y.pack(side="right", fill="y")
            self.scroll_x.pack(side="bottom", fill="x")
            self.canvas.pack(side="left", fill="both", expand=True)

            self.create_widgets()
        
            # Configura o protocolo para o evento de fechamento da janela
            self.protocol("WM_DELETE_WINDOW", self.cancel)
            
        def create_widgets(self):
            # Função para criar uma linha com um rótulo e um campo de entrada
            def criar_linha(label_text, row, column=0, column_span=2):
                tk.Label(self.frame, text=label_text).grid(row=row, column=column, padx=10, pady=5, sticky='w')
                entry = tk.Entry(self.frame, width=40)
                entry.grid(row=row, column=column+1, padx=10, pady=5, columnspan=column_span)
                return entry

            # Campos de entrada de texto
            self.entry_razao_social = criar_linha("Razão Social:", 0)
            self.entry_cnae = criar_linha("CNAE:", 1)
            self.entry_natureza = criar_linha("Natureza:", 2)
            self.entry_uf = criar_linha("UF:", 3)
            self.entry_municipio = criar_linha("Município:", 4)
            self.entry_bairro = criar_linha("Bairro:", 5)
            self.entry_cep = criar_linha("CEP:", 6)
            self.entry_ddd = criar_linha("DDD:", 7)
            self.entry_data_de = criar_linha("Data De:", 8)
            self.entry_data_ate = criar_linha("Data Até:", 9)
            self.entry_capital_de = criar_linha("Capital De:", 10)
            self.entry_capital_ate = criar_linha("Capital Até:", 11)

            # Opções de seleção (ComboBox)
            tk.Label(self.frame, text="Situação cadastral:").grid(row=12, column=0, padx=10, pady=5, sticky='w')
            self.combobox_selecao = ttk.Combobox(self.frame, values=["Ativa", "Baixada", "Inapta", "Suspensa", "Nula"], width=37)
            self.combobox_selecao.grid(row=12, column=1, padx=10, pady=5)

            # Caixas de seleção
            self.check_cnae2 = tk.BooleanVar()
            tk.Checkbutton(self.frame, text="Incluir subCategoria de CNAEs.", variable=self.check_cnae2).grid(row=13, column=1, padx=10, pady=5, sticky='w')

            self.check_somente_mei = tk.BooleanVar()
            tk.Checkbutton(self.frame, text="Somente MEI", variable=self.check_somente_mei).grid(row=14, column=1, padx=10, pady=5, sticky='w')

            self.check_excluir_mei = tk.BooleanVar()
            tk.Checkbutton(self.frame, text="Excluir MEI", variable=self.check_excluir_mei).grid(row=15, column=1, padx=10, pady=5, sticky='w')

            self.check_matriz = tk.BooleanVar()
            tk.Checkbutton(self.frame, text="Matriz", variable=self.check_matriz).grid(row=16, column=1, padx=10, pady=5, sticky='w')

            self.check_filial = tk.BooleanVar()
            tk.Checkbutton(self.frame, text="Filial", variable=self.check_filial).grid(row=17, column=1, padx=10, pady=5, sticky='w')

            self.check_com_telefone = tk.BooleanVar()
            tk.Checkbutton(self.frame, text="Com Telefone", variable=self.check_com_telefone).grid(row=18, column=1, padx=10, pady=5, sticky='w')

            self.check_fixo = tk.BooleanVar()
            tk.Checkbutton(self.frame, text="Telefone Fixo", variable=self.check_fixo).grid(row=19, column=1, padx=10, pady=5, sticky='w')

            self.check_celular = tk.BooleanVar()
            tk.Checkbutton(self.frame, text="Telefone Celular", variable=self.check_celular).grid(row=20, column=1, padx=10, pady=5, sticky='w')

            self.check_email = tk.BooleanVar()
            tk.Checkbutton(self.frame, text="Com E-mail", variable=self.check_email).grid(row=21, column=1, padx=10, pady=5, sticky='w')

            # Botões
            self.button_apply = tk.Button(self.frame, text="Aplicar", command=self.apply)
            self.button_apply.grid(row=22, column=0, padx=10, pady=10)

            self.button_cancel = tk.Button(self.frame, text="Cancelar", command=self.cancel)
            self.button_cancel.grid(row=22, column=1, padx=10, pady=10)

        def apply(self):
            # Coleta os dados inseridos
            self.resultado = {
                "razao_social": self.entry_razao_social.get(),
                "cnae": self.entry_cnae.get(),
                "natureza": self.entry_natureza.get(),
                "uf": self.entry_uf.get(),
                "municipio": self.entry_municipio.get(),
                "bairro": self.entry_bairro.get(),
                "cep": self.entry_cep.get(),
                "ddd": self.entry_ddd.get(),
                "data_de": self.entry_data_de.get(),
                "data_ate": self.entry_data_ate.get(),
                "capital_de": self.entry_capital_de.get(),
                "capital_ate": self.entry_capital_ate.get(),
                "selecao": self.combobox_selecao.get(),
                "cnae2": self.check_cnae2.get(),
                "somente_mei": self.check_somente_mei.get(),
                "excluir_mei": self.check_excluir_mei.get(),
                "matriz": self.check_matriz.get(),
                "filial": self.check_filial.get(),
                "com_telefone": self.check_com_telefone.get(),
                "fixo": self.check_fixo.get(),
                "celular": self.check_celular.get(),
                "email": self.check_email.get()
            }
            self.destroy()

        def cancel(self):
            self.resultado = None
            self.destroy()
            sys.exit(0)
            
    root = tk.Tk()
    root.withdraw()  # Oculta a janela principal
    dialog = FiltroDialog(root)
    root.wait_window(dialog)  # Aguarda o fechamento da caixa de diálogo
    return(dialog.resultado)
    # if dialog.resultado is not None:
    #     print("Dados coletados:", dialog.resultado)
    #     # Aqui você pode usar os dados coletados conforme necessário
    # else:
    #     print("Coleta de dados cancelada.")
    
# Função principal para coletar os dados dos CNPJs
def coletar_dados_cnpjs(url):
    resultado=caixaDialogoUsuario()
    
    if resultado is None:
        return  # Interrompe a execução da função
    
    inicio = datetime.now()
    driver = inicializar_driver()
    abrir_pagina(driver, url)
    wait = WebDriverWait(driver, 10)

    if resultado['razao_social']:
        inputRazaoSocial = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Razão Social ou Fantasia" and @class="input is-is-normal" and @type="is-info"]')))
        dadosBusca(driver, inputRazaoSocial, resultado['razao_social'])

    if resultado['cnae']:
        inputCNAE = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Código ou nome da atividade" and @class="input is-is-normal" and @type="text"]')))
        dadosBusca(driver, inputCNAE, resultado['cnae'])

    if resultado['cnae2']:
        clicar_checkbox(driver, "Incluir Atividade Secundária")

    if resultado['natureza']:
        inputNatureza = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Código ou nome da natureza" and @class="input is-is-normal" and @type="is-info"]')))
        dadosBusca(driver, inputNatureza, resultado['natureza'])
        
    if resultado['selecao']:
        inputSelecao = wait.until(EC.presence_of_element_located((By.TAG_NAME, 'select')))
        inputSelecao.send_keys(resultado['selecao'])
        inputSelecao.send_keys(Keys.TAB)

    if resultado['uf']:
        inputUF = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Selecione o estado" and @class="input is-is-normal" and @type="text"]')))
        dadosBusca(driver, inputUF, resultado['uf'])

    if resultado['municipio']:
        inputMunicipio = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Selecione um município"]')))
        dadosBusca(driver, inputMunicipio, resultado['municipio'])

    if resultado['bairro']:
        inputBairro = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Digite o nome do bairro"]')))
        dadosBusca(driver, inputBairro, resultado['bairro'])

    if resultado['cep']:
        inputCep = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Somente 8 digitos"]')))
        dadosBusca(driver, inputCep, resultado['cep'])

    if resultado['ddd']:
        inputDDD = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="2 dígitos"]')))
        dadosBusca(driver, inputDDD, resultado['ddd'])

    if resultado['data_de']:
        inputDataDe = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="A partir de" and @class="input" and @type="date"]')))
        dadosBusca(driver, inputDataDe, resultado['data_de'])

    if resultado['data_ate']:
        inputDataAte = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Até" and @class="input" and @type="date"]')))
        dadosBusca(driver, inputDataAte, resultado['data_ate'])

    if resultado['capital_de']:
        inputCapitalDe = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="A partir de" and @type="number"]')))
        dadosBusca(driver, inputCapitalDe, resultado['capital_de'])

    if resultado['capital_ate']:
        inputCapitalAte = wait.until(EC.presence_of_element_located((By.XPATH, '//input[@placeholder="Até" and @type="number"]')))
        dadosBusca(driver, inputCapitalAte, resultado['capital_ate'])

    if resultado['somente_mei']:
        clicar_checkbox(driver, " Somente MEI ")

    if resultado['excluir_mei']:
        clicar_checkbox(driver, " Excluir MEI ")

    if resultado['matriz']:
        clicar_checkbox(driver, " Somente matriz ")

    if resultado['filial']:
        clicar_checkbox(driver, " Somente filial ")

    if resultado['com_telefone']:
        clicar_checkbox(driver, " Com contato de telefone ")

    if resultado['fixo']:
        clicar_checkbox(driver, " Somente fixo ")

    if resultado['celular']:
        clicar_checkbox(driver, " Somente celular ")

    if resultado['email']:
        clicar_checkbox(driver, " Com e-mail ")

    # Nesta parte eu inicio a pesquisa
    pesquisar = wait.until(EC.element_to_be_clickable((By.XPATH, '//a[contains(@class, "button") and contains(@class, "is-success") and contains(@class, "is-medium") and text()="Pesquisar"]')))
    driver.execute_script("arguments[0].scrollIntoView(true);", pesquisar)
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
    pesquisar.click()

    dados_cnpjs = []
    cont = 0
    hrefss = extrair_links(driver)
    hrefs = list(dict.fromkeys(hrefss))
    driver.quit()
    if hrefs:
        for href in hrefs:
            cont += 1
            processar_link(href, dados_cnpjs)
            print(cont)
            print(href)
            if cont == 10:
                break
    else: 
        print("Nada consta.")
    fim = datetime.now()
    print(Fore.RED + f"Começo: {inicio} Fim: {fim}" + Style.RESET_ALL)
    return(dados_cnpjs)


# Executa a coleta de dados
def main():
    try:
        
        url = "https://casadosdados.com.br/solucao/cnpj/pesquisa-avancada"
        json_excel = coletar_dados_cnpjs(url)
        df = pd.DataFrame(json_excel)
        # Salvar o DataFrame como um arquivo Excel
        df.to_excel('extracao.xlsx', index=False)
        print(json_excel)
    except Exception as e:
        print(e)
main()