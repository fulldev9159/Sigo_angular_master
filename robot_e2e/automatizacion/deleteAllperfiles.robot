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

    Navegar al menu                              Perfil
    Eliminar todos los perfiles



    
