*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ../resource.robot


*** Test Cases ***
Flujo rechazo OT
    Open Browser To Page                 ${url}
    Login                                cadmincontrato1                                                                                                                                           password
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

    Login                       mgestor1        password
    Debe existir en la tabla    ${nombre OT}    Ejecucion
    Acciones PEND ANULACION
    # Execute javascript          document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(2)>a").click()
    # Execute javascript          document.querySelector("div.p-confirm-popup-footer>button:nth-child(2)").click()

    # # Confirmar
    # SSLEEP
    # Debe existir en la tabla    ${nombre OT}    Cerradas
    # SSLEEP
