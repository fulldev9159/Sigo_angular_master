*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ../resource.robot

*** Test Cases ***
Index
    [Tags]    automatizacion
    Open Browser To Page    ${url}
    Login                   jcastill    password

    # Se agregan contratos al perfil de jcastill
    Navegar al menu                              Usuario
    Click Menu Editar                            jcastill
    Editar documento de identidad del usuario    jcastill          1173606312
    Editar contratos del usuario                 all
    Click Visible Element                        id:submit-user

