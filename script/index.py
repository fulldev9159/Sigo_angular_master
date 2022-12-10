import toml
import argparse
# import selenium_base
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

data = ''
driver = ''

# functions = {
#     'crear_cubicacion_nueva': selenium_base.crear_cubicacion_nueva()
# }


def config():
    # Parse the command-line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--config", help="Archivo de configuración - es obligatorio")
    args = parser.parse_args()

    if not args.config:
        # Display an error message and exit
        parser.error("The 'config' argument is required")

    else:
        with open(args.config) as f:
            global data
            data = toml.loads(f.read())


def __print__data():
    print(f'[Host]:', data["environment"]["host"])
    print(f'[Port]:', data["environment"]["port"])


def openBrowser():
    global driver
    # Create a new instance of the Chrome web browser
    driver = webdriver.Chrome()

    # Open the web page
    driver.get("http://{0}:{1}".format(data["environment"]["host"],
               data["environment"]["port"]))

    driver.set_page_load_timeout(30)
    driver.implicitly_wait(10)


def crear_cubicacion_nueva():
    cub = data['cubicacion']
    login(data['users']['gestor'], 'Gestor/JP')
    search_field = driver.find_element(
        By.CSS_SELECTOR, "button[id='navbar-create-cub']")
    search_field.click()

    search_field = driver.find_element(
        By.CSS_SELECTOR, "input[name='input-nombre-cubicacion']")
    search_field.send_keys(data['cubicacion']['nombre'])
    _select_dropdown('#select-tipo-cubicacion', cub['tipo_cubicacion'])
    _select_dropdown('#select-contrato_marco', cub['contrato_marco'])

    _input('input[name="input-direccion-desde"]', cub['direccion_desde'])
    _input('input[name="input-altura-desde"]', cub['altura_desde'])
    _input('input[name="input-direccion-hasta"]', cub['direccion_hasta'])
    _input('input[name="input-altura-hasta"]', cub['altura_hasta'])
    _input('textarea[id="input-descripcion"]', cub['detalles'])
    _select_dropdown('#select-agencia', cub['agencia'])
    _select_dropdown(
        '#select-proveedor',
        cub['proveedor']
    )


def login(username, perfil):
    search_field_username = driver.find_element(By.NAME, "username")
    search_field_username.send_keys(username)
    search_field_password = driver.find_element(By.NAME, "password")
    search_field_password.send_keys('adas')
    search_field_button = driver.find_element(By.ID, "login-button")
    search_field_button.click()
    search_field_username = driver.find_element(
        By.NAME, "input-codigo-verificacion")
    search_field_username.send_keys('asdasd')
    search_field_button = driver.find_element(By.ID, "login-button")
    search_field_button.click()
    _select_dropdown("#select_profile", perfil)
    search_field_button = driver.find_element(
        By.ID, "perfil-select-button")
    search_field_button.click()


def _select_dropdown(selector, selection):
    wait = WebDriverWait(driver, 10)
    # Wait for the callable function to return a non-empty value
    wait.until(lambda driver: get_element_attr(selector))

    dropdown = driver.find_element(By.CSS_SELECTOR, selector)
    dropdown.click()

    item = dropdown.find_element(
        By.CSS_SELECTOR, "li[aria-label='{0}']".format(selection))

    # Click on the item to select it
    item.click()


def _input(selector, text):
    search_field = driver.find_element(
        By.CSS_SELECTOR, selector)
    search_field.send_keys(text)


def get_element_attr(selector):
    element = driver.find_element(By.CSS_SELECTOR, selector)
    return element.get_attribute("ng-reflect-options")


def main():
    config()
    __print__data()

    # Start
    openBrowser()

    crear_cubicacion_nueva()
    # for paso in data["flujo"]:
    #     if data["flujo"][paso]:
    #         print(paso)
    #         functions[paso]()


if __name__ == "__main__":
    main()
