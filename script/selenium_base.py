from selenium.webdriver.common.by import By
from selenium import webdriver

driver = ''


def open(host, port):
    global driver
    # Create a new instance of the Chrome web browser
    driver = webdriver.Chrome()

    # Open the web page
    driver.get("http://{0}:{1}".format(host, port))


def crear_cubicacion_nueva():
    login('gestor')


def login(rol):
    search_field = driver.find_element(By.NAME, "username")
    search_field.send_keys("Selenium 4.3.0")
