import toml
import argparse
# import selenium_base
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from time import sleep
from urllib.parse import urlsplit
from urllib.parse import urlparse
import paramiko


data = ''
driver = ''


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
    driver.maximize_window()

    # Open the web page
    driver.get("http://{0}:{1}".format(data["environment"]["host"],
               data["environment"]["port"]))

    driver.set_page_load_timeout(30)
    driver.implicitly_wait(2)


def crear_cubicacion_nueva():
    path = whereiam()
    if path != '/login/auth':
        logout()

    cub = data['cubicacion']
    login(data['users']['gestor'], 'Gestor/JP')

    search_field = driver.find_element(
        By.CSS_SELECTOR, "button[id='navbar-create-cub']")
    search_field.click()

    search_field = driver.find_element(
        By.CSS_SELECTOR, "input[name='input-nombre-cubicacion']")
    search_field.send_keys('Cubicacion {0}'.format(data['nombre_global']))
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

    servicios = cub['servicios']
    for item in servicios:
        _select_dropdown('#select-actividad', item['actividad'])
        _select_dropdown('#select-tipo-servicio', item['tipo_servicio'])
        _searh_item_and_select('#select-servicio', item['nombre'])
        uos = item['uos']
        for uo in uos:
            _searh_uo_and_add('#select-unidad-obra', uo['nombre'])
            _change_cantidad(item['nombre'], item['cantidad'])
            _change_cantidad(uo['nombre'], uo['cantidad'])

    element = driver.find_element(
        By.CSS_SELECTOR, 'button[id="crear-cubicacion"]')
    element.click()


def crear_ot_nueva():
    path = whereiam()
    if path != '/login/auth':
        logout()

    ot = data['ot']
    login(data['users']['gestor'], 'Gestor/JP')
    search_field = driver.find_element(
        By.CSS_SELECTOR, "button[id='navbar-create-ot']")
    search_field.click()

    _input('input[name="input-nombre-ot"]',
           'OT {0}'.format(data['nombre_global']))
    _select_dropdown('#select-contrato_marco', ot['contrato_marco'])
    _select_dropdown('#select-cubicacion',
                     'Cubicacion {0}'.format(data['nombre_global']))
    _select_dropdown('#select-oficina-central', ot['oficina_central'])
    _select_dropdown('#select-solicitado-por', ot['solicitado_por'])
    _input('input[name="input-direccion"]', ot['direccion'])
    _input('input[name="input-altura"]', ot['altura'])
    _input('input[name="input-piso"]', ot['piso'])
    _input('input[name="input-departamento"]', ot['departamento'])
    _select_dropdown('#select-comuna', ot['comuna'])
    _select_dropdown('#select-tipo-red', ot['tipo_red'])
    _select_dropdown('#select-tipo-trabajo', ot['tipo_trabajo'])
    _select_dropdown('#select-area-negocio', ot['area_negocio'])
    _input('input[name="input-nombre-proyectista"]', ot['nombre_proyectista'])
    _select_dropdown('#select-pmo', ot['pmo'])
    _select_dropdown('#select-linea-presupuestaria',
                     ot['linea_presupuestaria'])
    _select_dropdown('#select-pep2', ot['pep2'])
    search_field = driver.find_element(
        By.CSS_SELECTOR, "#fecha-inicio-ot > span > input")
    search_field.click()
    search_field = driver.find_element(
        By.CSS_SELECTOR, "#fecha-inicio-ot > span > div > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(2)> span")
    search_field.click()
    search_field = driver.find_element(
        By.CSS_SELECTOR, "#fecha-termino-ot > span > input")
    search_field.click()
    search_field = driver.find_element(
        By.CSS_SELECTOR, "#fecha-termino-ot > span > div > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(7) > span")
    search_field.click()
    _select_dropdown('#select-admin-contrato',
                     data['users']['nombre_admineecc'])
    search_field = driver.find_element(
        By.CSS_SELECTOR, "#crear-ot")
    search_field.click()


def aprobacion_inicial_supervisor():
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['supervisor'], 'Supervisor (Telefónica)')

    aprobacion_inicial()


def aprobacion_inicial_jefearea():
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['jefearea'], 'Jefe de Área Telefónica')

    aprobacion_inicial()


def aprobacion_inicial_gerente():
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['gerente'], 'Gerente Telefónica')

    aprobacion_inicial()


def aprobacion_inicial_subgerente():
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['subgerente'], 'SubGerente Telefónica')

    aprobacion_inicial()


def aprobacion_inicial():
    buscar_ot()
    sleep(1)

    _click_button('button[id="play-button"]')
    _click_button('button[id="button-confirmar"]')


def aprobacion_proveedor():
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['admineecc'], 'Administrador EECC')

    buscar_ot()
    sleep(1)
    _click_button('button[id="play-button"]')
    _select_dropdown('#select-supervisor-trabajos',
                     data['users']['nombre_supervisor_trabajos'])
    _click_button('button[id="button-confirmar"]')


def buscar_ot():
    ot = data['ot']
    _click_button('#navbar-list-ot')
    search_field = driver.find_element(
        By.CSS_SELECTOR, '#table-ejecucion>p-table>div>.p-datatable-header>div>span>input')
    search_field.clear()
    search_field.send_keys('OT {0}'.format(data['nombre_global']))


def whereiam():
    sleep(1)
    url = driver.current_url
    parsed_url = urlparse(url)

    # Get the path of the URL
    path = parsed_url.path

    return path


def logout():
    element = driver.find_element(By.CSS_SELECTOR, "#logout")
    element.click()
    sleep(1)


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


def _click_button(selector):
    search_field = driver.find_element(
        By.CSS_SELECTOR, selector)
    search_field.click()


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
    search_field.clear()
    search_field.send_keys(text)


def get_element_attr(selector):
    element = driver.find_element(By.CSS_SELECTOR, selector)
    return element.get_attribute("ng-reflect-options")


def _searh_item_and_select(selector, item):
    wait = WebDriverWait(driver, 10)
    # Wait for the callable function to return a non-empty value
    wait.until(lambda driver: get_element_attr(selector))

    try:
        dropdown = driver.find_element(
            By.CSS_SELECTOR, '{0}> div > i'.format(selector))
        dropdown.click()

        dropdown = driver.find_element(By.CSS_SELECTOR, selector)
        dropdown.click()
    except NoSuchElementException:
        dropdown = driver.find_element(By.CSS_SELECTOR, selector)
        dropdown.click()
        pass

    _input('{0}>div>div:nth-child(4)>div:nth-child(1)>div>input'.format(selector), item)
    elements = driver.find_elements(By.CSS_SELECTOR, 'p-dropdownitem > li')
    print(f'c=', len(elements))
    if len(elements) == 1:
        elements[0].click()
    else:
        parser.error("Se encontraron {0} items para {1}".format(
            len(elements), item))


def _searh_uo_and_add(selector, item):
    wait = WebDriverWait(driver, 10)
    # Wait for the callable function to return a non-empty value
    wait.until(lambda driver: get_element_attr(selector))

    try:
        dropdown = driver.find_element(
            By.CSS_SELECTOR, '{0}> div > i'.format(selector))
        dropdown.click()

        dropdown = driver.find_element(By.CSS_SELECTOR, selector)
        dropdown.click()
    except NoSuchElementException:
        dropdown = driver.find_element(By.CSS_SELECTOR, selector)
        dropdown.click()
        pass

    _input('{0}>div>div:nth-child(4)>div:nth-child(1)>div>input'.format(selector), item)
    elements = driver.find_elements(By.CSS_SELECTOR, 'p-dropdownitem > li')
    if len(elements) == 1:
        elements[0].click()
        search_field_button = driver.find_element(
            By.CSS_SELECTOR, "#agregar-button")
        try:
            sleep(1)
            search_field_button.click()
        except StaleElementReferenceException:
            # Re-find the element and click it again
            search_field_button = driver.find_element(
                By.CSS_SELECTOR, "#agregar-button")
            sleep(1)
            search_field_button.click()
    else:
        parser.error("Se encontraron {0} items para {1}".format(
            len(elements), item))


def _change_cantidad(item, cantidad):
    if cantidad != 0 and cantidad != '0':
        # Find the siblings of the element using XPath
        xpath = f"//td[contains(text(), '{{0}}')]/following-sibling::*".format(
            item)
        elements = driver.find_elements(By.XPATH, xpath)
        inp = elements[2].find_element(By.CSS_SELECTOR, 'input')
        inp.clear()
        inp.send_keys(cantidad)


def agregar_adicionales():
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['supervisortrabajos'], 'Trabajador EECC')

    buscar_ot()
    sleep(1)
    _click_button('button[id="play-button"]')

    servicios = data['adicionales']['servicios']
    for item in servicios:
        _select_dropdown('#select-actividad', item['actividad'])
        _select_dropdown('#select-tipo-servicio', item['tipo_servicio'])
        _searh_item_and_select('#select-servicio', item['nombre'])
        uos = item['uos']
        for uo in uos:
            _searh_uo_and_add('#select-unidad-obra', uo['nombre'])
            _change_cantidad(item['nombre'], item['cantidad'])
            _change_cantidad(uo['nombre'], uo['cantidad'])

    element = driver.find_element(
        By.CSS_SELECTOR, 'button[id="guardar-borrador-button"]')
    element.click()


def enviar_informe_avance():
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['supervisortrabajos'], 'Trabajador EECC')

    buscar_ot()
    sleep(1)
    _click_button('button[id="play-button"]')
    _click_button('button[id="enviar-button"]')
    _click_button('#button-confirmar')


def aprobar_informe_avance():
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['admineecc'], 'Administrador EECC')

    buscar_ot()
    sleep(1)
    _click_button('button[id="play-button"]')
    _click_button('button[id="aceptar-button"]')
    _click_button('#button-confirmar')


def generar_acta(acta):
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['admineecc'], 'Administrador EECC')

    buscar_ot()
    sleep(1)

    _click_button('button[id="play-button"]')
    element = driver.find_element(
        By.CSS_SELECTOR, '#comentarios')
    print(f"Acta data:", acta)
    element.send_keys(acta['comentario_generar_acta'])
    _click_button('button[id="generar-acta-button"]')
    # _click_button('#button-confirmar')


def aprobar_acta_gestor(acta):
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['gestor'], 'Gestor/JP')

    buscar_ot()
    sleep(1)

    _click_button('button[id="play-button"]')

    element = driver.find_element(
        By.CSS_SELECTOR, '#select-tipo-pago>div')
    clases = element.get_attribute("class")

    if "p-disabled" in clases:
        print("El elemento tiene la clase 'p-disabled'.")
    else:
        _select_dropdown("#select-tipo-pago", acta['tipo_pago'])

    _input("input[name='input-porcentaje']", acta['porcentaje'])
    _click_button("#validar-acta-button")
    _click_button('#button-confirmar')


def solitar_pago(acta):
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['gestor'], 'Gestor/JP')

    buscar_ot()
    sleep(1)
    _click_button('button[id="play-button"]')
    _click_button('#button-confirmar')


def autorizar_solicitud_pago_supervisor(acta):
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['supervisor'], 'Supervisor (Telefónica)')

    buscar_ot()
    sleep(1)
    _click_button('button[id="play-button"]')
    _click_button("#validar-acta-button")
    _input("#observaciones", acta['comentario_autorizar_pago_supervisor'])
    _click_button('#button-confirmar')


def autorizar_solicitud_pago_jefearea(acta):
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['jefearea'], 'Jefe de Área Telefónica')

    buscar_ot()
    sleep(1)
    _click_button('button[id="play-button"]')
    _click_button("#validar-acta-button")
    _input("#observaciones", acta['comentario_autorizar_pago_jefearea'])
    _click_button('#button-confirmar')


def imputacion(acta):
    sleep(5)
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['gestor'], 'Gestor/JP')

    ot = data['ot']
    _click_button('#navbar-list-ot')
    sleep(1)
    elements = driver.find_elements(
        By.CSS_SELECTOR, 'ul.p-tabview-nav>li.ng-star-inserted>a')
    for indice, element in enumerate(elements):
        # print(indice, element.text)
        if indice == 1:
            element.click()

    search_field = driver.find_element(
        By.CSS_SELECTOR, '#table-abiertas>p-table>div>.p-datatable-header>div>span>input')
    search_field.clear()
    search_field.send_keys('OT {0}'.format(data['nombre_global']))

    sleep(2)
    elementos = driver.find_elements(
        By.CSS_SELECTOR, 'button[id="acta-button"]')
    for elemento in elementos:
        # Verificar si el elemento es visible en la pantalla
        if elemento.is_displayed():
            # Seleccionar el elemento si es visible
            elemento.click()
            break

    elements = driver.find_elements(
        By.CSS_SELECTOR, 'ul>li.acta-valida')

    for indice, element in enumerate(elements):
        if indice == len(elements) - 1:
            print(element.get_attribute("id"))

            acta_id = element.get_attribute("id")

            client = paramiko.SSHClient()
            client.load_system_host_keys()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            client.connect(
                hostname="34.122.92.38",
                username="zweicom",
                # key_filename=data['environment']['ruta_id_rsa']
            )
            stdin, stdout, stderr = client.exec_command(
                "./segunda_integracion.pl -acta={0} -puerto={1}|bash".format(acta_id, data['environment']['api_port']))

            for line in stdout:
                print(line.strip())

            client.close()
            # Interrumpir la ejecución del ciclo
            break

    sleep(1)


def aprobacion_operaciones(acta):
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['operaciones'], 'Operaciones')

    buscar_ot()
    sleep(1)
    _click_button('button[id="play-button"]')


def cerrar_ot():
    path = whereiam()
    if path != '/login/auth':
        logout()

    login(data['users']['gestor'], 'Gestor/JP')
    buscar_ot()
    sleep(1)
    _click_button('button[id="play-button"]')
    _click_button('#button-confirmar')


def main():
    config()
    __print__data()

    # Start
    openBrowser()

    functions = {
        'crear_cubicacion_nueva': crear_cubicacion_nueva,
        'crear_ot_nueva': crear_ot_nueva,
        'aprobacion_inicial_supervisor': aprobacion_inicial_supervisor,
        'rechazo_inicial_supervisor': '_',
        'aprobacion_inicial_jefearea': aprobacion_inicial_jefearea,
        'rechazo_inicial_trabajador': '_',
        'aprobacion_inicial_subgerente': aprobacion_inicial_subgerente,
        'rechazo_inicial_subgerente': '_',
        'aprobacion_inicial_gerente': aprobacion_inicial_gerente,
        'rechazo_inicial_gerente': '_',
        'aprobacion_proveedor': aprobacion_proveedor,
        'rechazo_proveedor': '_',
        'agregar_adicionales': agregar_adicionales,
        'enviar_informe_avance': enviar_informe_avance,
        'aprobar_informe_avance': aprobar_informe_avance,
        'rechazar_informe_avance': '_',
        'generar_acta': generar_acta,
        'aprobar_acta_gestor': aprobar_acta_gestor,
        'solitar_pago': solitar_pago,
        'autorizar_solicitud_pago_supervisor': autorizar_solicitud_pago_supervisor,
        'autorizar_solicitud_pago_jefearea': autorizar_solicitud_pago_jefearea,
        'imputacion': imputacion,
        'aprobacion_operaciones': aprobacion_operaciones,
        'cerrar_ot': cerrar_ot
    }

    for paso in data["flujo"]:
        if data["flujo"][paso] and paso != 'actas':
            functions[paso]()
        elif paso == 'actas':
            for acta in data["flujo"][paso]:
                print(f"Acta: ", acta['acta_numero'])
                print(f"Tipo Pago:", acta['tipo_pago'])
                for flujoacta in acta["flujo"]:
                    for flujo in flujoacta:
                        if flujoacta[flujo]:
                            functions[flujo](acta)


if __name__ == "__main__":
    main()
