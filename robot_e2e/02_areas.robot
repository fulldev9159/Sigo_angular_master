*** Settings ***
Documentation    Test de funcionanildad del módulo área.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot

*** Test Cases ***
# List Area
#    _Login                        admin    pass    Admin
#    _Navegate to                  Area
#    _Table should display data
#    close Browser

Editar Area
    _Login                            admin                               pass                                    Admin
    _Navegate to                      Area
    _Table should display data
    _Go to Editar element             Contratista
    sleep                             0.5
    _Set input text                   css:#nombre-area>app-input>input    TestAreaName                            #Contratista
    _Set input text                   css:#descripcion                    TestAreaDescripcion                     #Empresas colaboradoras de telefonica
    _Click visible element            css:#tipo-interno                   #tipo-externo
    _Click visible element            css:#estado-inactivo                #estado-activo
    _Click visible element            css:#submit-area
    _Element should exist in table    TestAreaName
    _Validate column data             1                                   TestAreaName
    _Validate column data             2                                   TestAreaDescripcion
    _Validate column data             3                                   Movistar
    _Validate column data             4                                   Inactiva
    _Go to Editar element             TestAreaName
    _Set input text                   css:#nombre-area>app-input>input    Contratista
    _Set input text                   css:#descripcion                    Empresas colaboradoras de telefonica
    _Click visible element            css:#tipo-externo
    _Click visible element            css:#estado-activo
    _Click visible element            css:#submit-area
    close Browser