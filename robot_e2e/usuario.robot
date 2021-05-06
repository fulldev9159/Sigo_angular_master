*** Settings ***
Documentation     Test de funcionanildad del modulo de Perfiles.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
# Ingresar usuario
#     Open Browser To Page    ${url}
#     Location Should Be    ${url}/auth/login
#     Login    admin    password
#     Wait Until Element Is Visible    id:user-name    timeout=5
#     ${"boton-perfil-menu"}    set variable    css:#menu-usuario>a>span
#     Click Element    css:#menu-usuario>a>span
    
#     close Browser
    # Wait Until Element Is Visible    css:agregar-usuario    timeout=5
    # Click Element    css:agregar-usuario

Listar usuarios
    Open Browser To Page                                  ${url}
    Location Should Be                                    ${url}/auth/login
    Login    admin    password
    Wait Until Element Is Visible                         id:user-name    timeout=5
    ${"boton-perfil-menu"}    set variable                css:#menu-usuario>a>span
    Click Element                                         css:#menu-usuario>a>span
    Wait Until Element Is Visible                         css:.p-datatable-wrapper>table>tbody>tr    timeout=5
    ${cantidad de filas}=    get element count            css:.p-datatable-wrapper>table>tbody>tr
    ${status}=    Evaluate                                ${cantidad de filas} > 0
    Should Be True                                        ${status}
    close Browser