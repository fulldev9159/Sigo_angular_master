*** Settings ***
Documentation    Test de funcionanildad del login.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot

*** Test Cases ***
Redirect to page Login not login person
    _Open Browser To Page    ${url}
    # Location Should Be       ${url}/auth/login
    close Browser

Redirect to dashboard to a login person
     _Open Browser To Page    ${url}
#    Location Should Be       ${url}/auth/login

#    # Validar elementos
#    element should be visible    name:username
#    element should be enabled    name:username

#    element should be visible    name:password
#    element should be enabled    name:password

#    element should be visible     id:login
#    element should be disabled    id:login

#    # Ingresar datos de login
#    input text                   name:username    admin
#    input password               name:password    pass

#    # Validar elementos
#    element should be enabled    id:login

#    # Presionar botón
#    _Click visible element    id:login

#    # Validar ubicación actual
#    Wait Until Element Is Visible    id:user-name             timeout=15
#    Location Should Be               ${url}/app/ot/list-ot

    close Browser
