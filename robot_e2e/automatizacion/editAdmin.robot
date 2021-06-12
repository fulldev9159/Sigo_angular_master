*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ../resource.robot

*** Test Cases ***
Index
    [Tags]                  automatizacion
    Open Browser To Page    ${url}
    Login                   jcastill          password

    Navegar al menu                              Usuario
    Click Menu Editar                            admin
    Editar documento de identidad del usuario    admin          12345678910
    Editar email del usuario                     admin          email@admin.com
    Click Visible Element            id:submit-user
