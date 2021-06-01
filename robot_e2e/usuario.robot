*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    resource.robot

*** Test Cases ***
# Crear usuario
#     Open Browser To Page             ${url}
#     Login                            admin                                     password
#     Wait Until Element Is Visible    id:user-name                              timeout=5
#     Click Visible Element            css:#menu-usuario>a>span
#     Click Visible Element            id:add-user-button
#     Usuario   carloscfuentes     17.220.899-1    Nombre Robot     Apllidos Robot     emailrobot@robot.cl
#     Validar si existe en la Lista    3    Nombre Robot
#     close Browser 
    
# Editar usuario
#     Open Browser To Page             ${url}
#     Login                            admin                                                                   password
#     Wait Until Element Is Visible    id:user-name                                                            timeout=5
#     Click Element                    css:#menu-usuario>a>span
#     Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
#     ${cantidad de filas}=            get element count                                                       css:.p-datatable-wrapper>table>tbody>tr
#     ${status}=                       Evaluate                                                                ${cantidad de filas} > 0
#     Should Be True                   ${status}

#     FOR    ${i}    IN RANGE    ${cantidad de filas}
#          ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#          ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    carloscfuentes
#          Set Suite Variable    ${areYouMyLine}
#          ${numero de fila}   set variable    ${i + 1}
#          Set Suite Variable    ${numero de fila}
#          Run Keyword If     ${areYouMyLine}    Exit For Loop
#      END
#     Element text should be    css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(1)    carloscfuentes
#     Should Be True    ${areYouMyLine}
#     Click Visible Element                                                 css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(8)>app-menu>button
#     Click Visible Element             css:app-menu > p-menu > div > ul > li:nth-child(1) > a
#     UsuarioEdit   17.220.899-1    Nombre Robot Editado     Apllidos Robot     emailrobot@robot.cl
#     Validar si existe en la Lista    3    Nombre Robot Editado
#     close Browser

# Delete usuario
#     Open Browser To Page             ${url}
#     Location Should Be               ${url}/auth/login
#     Login                            admin                                                                       password
#     Wait Until Element Is Visible    id:user-name                                                                timeout=5
#     Click Element                    css:#menu-usuario>a>span
#     Wait Until Element Is Visible    css:.p-datatable-wrapper
#      ${cantidad de filas}=            get element count                                                       css:.p-datatable-wrapper>table>tbody>tr
#     ${status}=                       Evaluate                                                                ${cantidad de filas} > 0
#     Should Be True                   ${status}                                                    timeout=5
#     FOR    ${i}    IN RANGE    ${cantidad de filas}
#          ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#          ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    carloscfuentes
#          Set Suite Variable    ${areYouMyLine}
#          ${numero de fila}   set variable    ${i + 1}
#          Set Suite Variable    ${numero de fila}
#          Run Keyword If     ${areYouMyLine}    Exit For Loop
#      END
#     Click Visible Element            css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>#action-buttons>app-menu>button
#     Click Visible Element            css:app-menu > p-menu > div > ul > li:nth-child(3) > a
#     ${boton de confirmar}            set variable                                                                css:.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
#     Click Visible Element            ${boton de confirmar}
#     close Browser

Activar usuario
     Open Browser To Page             ${url}
     Location Should Be               ${url}/auth/login
     Login                            admin                                                                       password
     Wait Until Element Is Visible    id:user-name                                                                timeout=5
     Click Element                    css:#menu-usuario>a>span
     Wait Until Element Is Visible    css:.p-datatable-wrapper 
     Click Visible Element            css:app-menu>button
     Click Visible Element            css:app-menu > p-menu > div > ul > li:nth-child(4) > a                   