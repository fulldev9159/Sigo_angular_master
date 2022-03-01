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
    _Login                        admin           pass    Admin
    _Navegate to                  Area
    _Table should display data
    _Go to Editar element         Contratista 