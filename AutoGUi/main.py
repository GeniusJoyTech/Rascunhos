# -*- coding: utf-8 -*-
import pyautogui as py
import pyperclip
import datetime
import time
import random
horario_desejado = datetime.time(6, 30)

def sleep(seg):
    time.sleep(seg)
def nAleatorio():
    return random.randint(15, 7200)#15 seg à 3 h


def enviarMsgWhats(mensagem):
    py.hotkey("win", "2")
    sleep(2)
    py.hotkey("ctrl", 'f')
    sleep(2)
    py.write("Número que recebe a mensagem")
    sleep(5)
    py.press("tab")
    sleep(2)
    py.press("enter")
    sleep(1)
    for msg in mensagem:
        pyperclip.copy(msg)
        py.hotkey('ctrl', 'v')
        sleep(1)
        py.hotkey("ctrl","enter")
    py.press("enter")
    
def msgBomDia():
    enviarMsgWhats(["Bom dia!","Tudo bem com você?"])        
def msgTeAmo():
    enviarMsgWhats(["Te amo"])
cont = 0
while True:
    agora = datetime.datetime.now().time()
    if agora.hour >= 5 and agora.hour <= 8:
        msgBomDia()
        cont=1
    if agora.hour >= 6 and agora.hour <= 19:
        msgTeAmo()
        py.hotkey('alt', 'f4')
        time.sleep(nAleatorio())
    elif agora.hour >= 19 and agora.hour <= 0:
        cont = 0
        time.sleep(25200)
    elif agora.hour >= 1 and agora.hour <= 2:
        cont = 0
        time.sleep(18000)
    