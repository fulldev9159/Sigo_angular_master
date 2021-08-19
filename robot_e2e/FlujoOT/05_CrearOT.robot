*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ../resource.robot

*** Test Cases ***
Crear OT happy path
    Open Browser To Page    ${url}
    # Login                   ${user}                           password
    Login                   mgestor1                          password
    Go To                   ${url}/app/cubicacion/list-cub
    FOR                     ${i}                              IN RANGE                            99
    ${cub existe}=          Existe cubicacion                 CUBICACION ${i} HAPPY PATH ROBOT
    Log To Console          ${cub existe}
    ${numero}               set variable                      ${i - 1}
    Log To Console          ${numero}
    Set Suite Variable      ${numero}
    Exit For Loop If        '${cub existe}' == 'False' 
    END

    ${nombre cubicacion}    set variable            CUBICACION ${numero} HAPPY PATH ROBOT 
    # Set Suite Variable      ${nombre cubicacion}
    Set Global Variable     ${nombre cubicacion}
    ${nombre OT}            set variable            OT ${numero} HAPPY PATH ROBOT 
    # Set Suite Variable      ${nombre OT}
    Set Global Variable     ${nombre OT}

    # Log To Console    ${numero}
    #Crear Cubicacion
    Navegar al menu          Crear Cubicacion
    sleep                    1
    Set Nombre Cubicacion    ${nombre cubicacion}
    Set contrato             SBE
    Set proveedor            COASIN
    Set region               Región Metropolitana de Santiago
    Set tipo servicio        PROYECTO (FIJA)
    sleep                    2
    Click Visible Element    css:#box > div.col-xs-12.col-md-8 > div:nth-child(2) > p-listbox > div > div.p-listbox-list-wrapper > ul > li:nth-child(1) > div.p-checkbox.p-component.ng-star-inserted > div
    Click Visible Element    css:#box > div.col-xs-12.col-md-8 > div:nth-child(2) > p-listbox > div > div.p-listbox-list-wrapper > ul > li:nth-child(2) > div.p-checkbox.p-component.ng-star-inserted > div
    sleep                    2
    Guardar Cubicacion

    # #CREAR OT
    SSLEEP
    Execute javascript         document.querySelector("#otSub>li:nth-child(2)>a").click()
    Set Nombre OT              ${nombre OT}
    Set Tipo OT                OT
    Set Cubicacion de la OT    ${nombre cubicacion}
    Set Plan Proyecto OT       EMPRESAS
    Set Sitio OT               NEWIND0021F3 - BANCO RIPLEY
    Click Opex OT
    Set ID OPEX OT             00-01820
    Set Cuenta SAP OT          6052561
    Set CECO OT                49516
    Set Fecha Inicio           06/22/2021
    Set Fecha Termino
    Set Proyecto OT            proyecto test(1)
    Set Observaciones OT       Robot Observaciones
    Guardar OT

    sleep            10
    close Browser