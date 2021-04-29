*** Settings ***
Documentation     Test de funcionanildad del modulo de Perfiles.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Create perfil
    Open Browser To Page    ${url}
    Location Should Be    ${url}/auth/login
    Login    admin    password
    Wait Until Element Is Visible    id:user-name    timeout=5

    Element text should be    class:header-menu    Módulos
    Element text should be    css:#menu-ot>a>span    OT
    ${menus}=    Get WebElements    css:#otSub>li
    # ${txt}=    Get Text    ${menus}[0]
    # Log to Console    ${txt}
    Element text should be    ${menus}[0]    Listar OTs
    Element text should be    ${menus}[1]    Crear OT
    Element text should be    css:#menu-cubicacion>a>span    Cubicación
    Click Element    css:#menu-cubicacion>a>span
    ${menus}=    Get WebElements    css:#cubSub>li
    Element text should be    ${menus}[0]    Listar Cubicaciones
    Wait Until Element Is Visible    ${menus}[1]    timeout=5
    Element text should be    ${menus}[1]    Crear Cubicación
    Element text should be    css:#menu-perfil>a>span    Perfiles

    close Browser


    # Log to Console    ${txt}