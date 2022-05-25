*** Settings ***
Documentation    Test de funcionanildad del módulo Contratos.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot

*** Test Cases ***

Editar Contratos
    _Login          admin        M0v15tar.    Admin
    _Navegate to    Contratos

    _Table should display data

    _Search table             prueba
    sleep                     1
    _Click visible element    css:#action-buttons > div > button:nth-child(1)
    sleep                     0.5
    _Set input text           css:#nombre-contrato>app-input>input               PruebaRobot                        #prueba
    #Fecha inicio
    #Fecha fin
    _Select visible item      css:#tipo-contrato-selector>app-select>select      Fijo                               # Móvil
    _Select visible item      css:#tipo-moneda-selector>app-select>select        CLF (Unidad de fomento Chilena)    #CLP (Peso Chileno)
    _Select visible item      css:#tipo-pago-selector>app-select>select          PARCIAL                            #TOTAL
    _Set input text           css:#costo-max-input>app-input>input               100                                #0
    _Click visible element    css:#check-req-apro-jera
    _Click visible element    css:#check-req-vali-oper
    _Click visible element    css:#check-tiene-encuesta
    _Click visible element    css:#estado-activo
    # capture page screenshot    /opt/robotframework/reports/contratos4.png
    _Click visible element    css:#submit-contrato

    sleep    1

    _Element should exist in table    PruebaRobot
    _Validate column data             1              PruebaRobot
    #_Validate column data            2                                   Fecha inicio
    #_Validate column data            3                                   Fecha fin
    _Validate column data             4              Fijo
    # _Validate column data             5                                                  Unidad de fomento chilena
    _Validate column data             5              CLF
    _Validate column data             6              Si
    _Validate column data             7              Si
    _Validate column data             8              Si
    _Validate column data             9              PARCIAL
    _Validate column data             10             $100
    _Validate column data             11             Inactivo

    close Browser

Bloquear contrato
    _Login                            admin                                                                                                                            M0v15tar.    Admin
    _Navegate to                      Contratos
    _Table should display data
    _Element should exist in table    prueba
    _Click visible element            css:#action-buttons > div > button:nth-child(2)
    _Click visible element            css:body > div > div.p-confirm-popup-footer > button.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
    sleep                             1
    _Validate column data             11                                                                                                                               Activo
    close Browser