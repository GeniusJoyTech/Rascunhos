from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from datetime import datetime
from tkinter import ttk
from colorama import init, Fore, Style

import cloudscraper
import json

import re
import tkinter as tk
import time
import pandas as pd
import sys
# import atexit
# Inicializa a colorama
init(autoreset=True)

# # Encerra os drivers, caso necessite
# def fechar_driver():
#     global driver
#     if driver:
#         driver.quit()

# # Registrar a função de encerramento
# atexit.register(fechar_driver)

# Função para inicializar o driver do navegador
def inicializar_driver():
    options = webdriver.ChromeOptions()
    # options.add_argument("--headless")  # Descomente se necessário
    options.add_argument("--log-level=3")  # Reduz a quantidade de logs
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920x1080")
    options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
    driver = webdriver.Chrome(options=options)
    return driver

# Função para abrir a página e clicar no botão de pesquisa
def abrir_pagina(driver, url):
    driver.get(url)


# # Função para extrair os links dos CNPJs
def extrair_dados_gerais(payload, url):
    # Cabeçalhos da requisição
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    # Criando o scraper
    scraper = cloudscraper.create_scraper()
    # Enviando a requisição
    try:
        response = scraper.post(url, headers=headers, data=json.dumps(payload))
        if response.status_code == 200:
            return(response.json())
        else:
            print(f"Erro: {response.json()}")
            return([])

    except Exception as e:
        print(f"Erro, {e}")
    # Verificando a resposta
    
def processar_dados_gerais(dados_gerais):
    # Adiciona uma nova chave 'link' a cada item em 'dados_gerais'
    for item in dados_gerais['data']['cnpj']:
        cnpj = item['cnpj']
        razao_social = item['razao_social']
        
        # Remove números da razão social
        razao_social_sem_numeros = re.sub(r'\d+', '', razao_social).strip()
        
        # Troca espaços por traços
        razao_social_traduzida = re.sub(r'\s+', '-', razao_social_sem_numeros)
        
        # Concatena a razão social com o CNPJ
        link = f"{razao_social_traduzida}-{cnpj}"
        
        # Adiciona o resultado como um novo campo 'link' no item
        item['link'] = 'https://casadosdados.com.br/solucao/cnpj/' + link
    
    return dados_gerais

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
            self.combobox_selecao = ttk.Combobox(self.frame, values=["ATIVA", "BAIXADA", "INAPTA", "SUSPENSA", "NULA"], width=37)
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
    
#Define o Json para busca na Api
def jsonBusca(jsonBusca):
    payload = {
        "query": {
            "termo": [jsonBusca['razao_social']] if jsonBusca['razao_social'] else [],
            "atividade_principal": [jsonBusca['cnae']] if jsonBusca['cnae'] else [],
            "natureza_juridica": [jsonBusca['natureza']] if jsonBusca['natureza'] else [],
            "uf": [jsonBusca['uf']] if jsonBusca['uf'] else [],
            "municipio": [jsonBusca['municipio']] if jsonBusca['municipio'] else [],
            "bairro": [jsonBusca['bairro']] if jsonBusca['bairro'] else [],
            "situacao_cadastral": jsonBusca['selecao'] if jsonBusca['selecao'] else "ATIVA",
            "cep": [jsonBusca['cep']] if jsonBusca['cep'] else [],
            "ddd": [jsonBusca['ddd']] if jsonBusca['ddd'] else []
        },
        "range_query": {
            "data_abertura": {
                "lte": jsonBusca['data_de'] if jsonBusca['data_de'] else None,
                "gte": jsonBusca['data_ate'] if jsonBusca['data_ate'] else None
            },
            "capital_social": {
                "lte": jsonBusca['capital_de'] if jsonBusca['capital_de'] else None,
                "gte": jsonBusca['capital_ate'] if jsonBusca['capital_ate'] else None
            }
        },
        # "page": page,
        "extras": {
            "somente_mei": jsonBusca['somente_mei'] if jsonBusca['somente_mei'] else False,
            "excluir_mei": jsonBusca['excluir_mei'] if jsonBusca['excluir_mei'] else False,
            "com_email": jsonBusca['email'] if jsonBusca['email'] else False,
            "incluir_atividade_secundaria": jsonBusca['cnae2'] if jsonBusca['cnae2'] else False,
            "com_contato_telefonico": jsonBusca['com_telefone'] if jsonBusca['com_telefone'] else False,
            "somente_fixo": jsonBusca['fixo'] if jsonBusca['fixo'] else False,
            "somente_matriz": jsonBusca['matriz'] if jsonBusca['matriz'] else False,
            "somente_filial": jsonBusca['filial'] if jsonBusca['filial'] else False
        }
        }
    return payload
# Função principal para coletar os dados dos CNPJs
def coletar_dados_cnpjs(url, payload):
    resposta = extrair_dados_gerais(payload, url)
    return(resposta)

# Executa a coleta de dados
def main():
    try:
        
        url = "https://api.casadosdados.com.br/v2/public/cnpj/search"
        
        dadosParaBusca = caixaDialogoUsuario()
        jsonParaBusca = jsonBusca(dadosParaBusca)
        pagina_atual = 1
        max_paginas = 1
        payload = coletar_dados_cnpjs(url, jsonParaBusca)
        
        num_resultado = int(payload['data']['count'])
        if num_resultado > 20:
            max_paginas = (num_resultado + 19) // 20
            max_paginas = min(max_paginas, 10)
        
        dataMenosTelefoneEEmail = []

        while pagina_atual <= max_paginas:
            print(f'Busca na página {pagina_atual}')
            payload["page"] = pagina_atual        
            try:
                coletados = coletar_dados_cnpjs(url, payload)
                coletadosProcessados = processar_dados_gerais(coletados)
                cnpjsGerais = coletadosProcessados['data']['cnpj']
                dataMenosTelefoneEEmail.append(cnpjsGerais)
            except:            
                time.sleep(5)
                try:
                    coletados = coletar_dados_cnpjs(url, payload)
                    coletadosProcessados = processar_dados_gerais(coletados)
                    cnpjsGerais = coletadosProcessados['data']['cnpj']
                    
                    dataMenosTelefoneEEmail.append(cnpjsGerais)
                except:            
                    print(f'Página {pagina_atual} não encontrada.')
                    print(f'Seguirei para a busca na próxima página, caso tenha.')
                    time.sleep(15)
            pagina_atual +=1
        empresas = []
        empresaComContato = []
        try:
            dataMenosTelefoneEEmail = [item for sublist in dataMenosTelefoneEEmail for item in sublist]
            cont = 1
            for empresaSemContato in dataMenosTelefoneEEmail:
                print(empresaComContato)
                cont +=1
                link = empresaSemContato['link']
                
                empresaComContato = empresaSemContato.copy()
                driver = inicializar_driver()
                wait = WebDriverWait(driver, 10)
                abrir_pagina(driver, link)
                try:                   
                    email = wait.until(EC.presence_of_element_located((By.XPATH, '//label[contains(text(), "Email:")]/following-sibling::p[@class="has-text-weight-bold"]'))).text
                    print(email)
                except:
                    email = 'Não encontrado pelo extrator.'
                try:
                    telefone = wait.until(EC.presence_of_element_located((By.XPATH, '//label[contains(text(), "Telefone:")]/following-sibling::p[@class="has-text-weight-bold"]'))).text
                    print(telefone)
                except:
                    telefone = 'Não encontrado pelo extrator.'
                
                empresaComContato['email'] = email
                empresaComContato['telefone'] = telefone
                empresas.append(empresaComContato)
                driver.quit()
        except:
            if driver:
                driver.quit()
        
        df = pd.DataFrame(empresas)
        # Obtém a data e hora atuais
        now = datetime.now()

        # Formata a data e hora como string no formato desejado
        timestamp = now.strftime('%Y%m%d_%H%M%S')

        # Cria o nome do arquivo
        filename = f'extracao_{timestamp}.xlsx'

        # Exemplo de impressão do nome do arquivo
        print(f"Salvando o arquivo como {filename}", flush=True)

        # Salva o DataFrame em um arquivo Excel com o nome gerado
        df.to_excel(filename, index=False)
        
    except Exception as e:
        print(e, flush=True)
main()