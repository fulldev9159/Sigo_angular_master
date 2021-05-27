*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    resource.robot

*** Test Cases ***
Crear cubicacion
    Open Browser To Page             ${url}
    Login                            admin                                     password
    Wait Until Element Is Visible    id:user-name                              timeout=5
    # Datos Formulario Usuario
    Click Visible Element            css:#menu-cubicacion > a > span
    Click Visible Element            id:listarCubSubMenu
    Crear Cubicacion    RobotCubicacion    SBE    AJ INGENIEROS S.A.    Región Metropolitana de Santiago    PROYECTO (FIJA)
    close Browser 