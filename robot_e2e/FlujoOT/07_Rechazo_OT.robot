*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ../resource.robot


*** Test Cases ***
Flujo rechazo OT
    Open Browser To Page                 ${url}
    Login                                cadmincontrato1                                                                                                                                           pass
    Debe existir en la tabla             ${nombre OT}                                                                                                                                              Ejecucion
    Acciones PEND AUTH ADMIN Contrato
    Execute javascript                   document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(3)>a").click()
    Input Motivo                         "Porque quiero y porque puedo"
    Click Visible Element                css:#page-content-wrapper > div > app-ot > div > app-list-ot > app-modal:nth-child(3) > p-dialog > div > div > div > p-footer > button.btn.btn-primary
    SSLEEP
    Execute javascript                   document.querySelector("#navbarDropdown").click()
    sleep                                1
    Execute javascript                   document.querySelector("#navbarSupportedContent > ul > li > div > a").click()
    # Logout

    Login                       mgestor1        pass
    Debe existir en la tabla    ${nombre OT}    Ejecucion


    Acciones PEND ANULACION
    # capture page screenshot          /opt/robotframework/reports/cp1.png
    Wait Until Element Is Visible    css:#action-buttons > app-menu > p-menu > div > ul>li:nth-child(2)>a                                  timeout=5
    Scroll Element Into View         css:#action-buttons > app-menu > p-menu > div > ul>li:nth-child(2)>a
    # capture page screenshot          /opt/robotframework/reports/cp2.png
    Execute javaScript               window.scrollBy(900, 900);
    # capture page screenshot          /opt/robotframework/reports/cp3.png
    Click Visible Element            css:#action-buttons > app-menu > button > span.p-button-icon.pi.pi-ellipsis-v
    # capture page screenshot          /opt/robotframework/reports/cp4.png
    Execute javascript               document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(2)>a").click()
    # capture page screenshot          /opt/robotframework/reports/cp5.png
    Execute javascript               document.querySelector("div.p-confirm-popup-footer>button:nth-child(2)").click()
    SSLEEP
    Debe existir en la tabla         ${nombre OT}                                                                                          Cerradas
    # SSLEEP
