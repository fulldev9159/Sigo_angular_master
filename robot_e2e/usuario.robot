*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    resource.robot

*** Test Cases ***
Crear usuario
    Open Browser To Page             ${url}
    Login                            admin                                     password
    Wait Until Element Is Visible    id:user-name                              timeout=5
    # Datos Formulario Usuario
    Click Visible Element            css:#menu-usuario>a>span
    Click Visible Element            id:add-user-button
    # Creacion Usuario
    Usuario   carloscfuentes     17.220.899-1    Nombre Robot     Apllidos Robot     emailrobot@robot.cl    

Listar usuarios
    Open Browser To Page             ${url}
    Location Should Be               ${url}/auth/login
    Login                            admin                                                                       password
    Wait Until Element Is Visible    id:user-name                                                                timeout=5
    Click Element                    css:#menu-usuario>a>span
    Wait Until Element Is Visible    css:.p-datatable-wrapper                                                    timeout=5
    ${cantidad de filas}=            get element count                                                           css:.p-datatable-wrapper>table>tbody>tr
    ${status}=                       Evaluate                                                                    ${cantidad de filas} > 0
    Should Be True                   ${status}
    Click Visible Element            css:#action-buttons>app-menu>button
    Click Visible Element            css:#action-buttons > app-menu > p-menu > div > ul > li:nth-child(2) > a
    Wait Until Element Is Visible    css:p-dialog                                                                timeout=3
    # ${cantidad de datos de contrato detalle usuario}=     get element count            css:#detalle_contrato_marco>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    # ${statusContratoDetalle}=    Evaluate                 ${cantidad de datos de contrato detalle usuario} > 0
    # Should Be True                                        ${statusContratoDetalle}
    # ${cantidad de datos de perfil detalle usuario}=       get element count            css:#detalle_perfil>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    # ${statusPerfilDetalle}=    Evaluate                   ${cantidad de datos de perfil detalle usuario} > 0
    # Should Be True                                        ${statusPerfilDetalle}
    close Browser

Delete usuario
    Open Browser To Page             ${url}
    Location Should Be               ${url}/auth/login
    Login                            admin                                                                       password
    Wait Until Element Is Visible    id:user-name                                                                timeout=5
    Click Element                    css:#menu-usuario>a>span
    Wait Until Element Is Visible    css:.p-datatable-wrapper                                                    timeout=5
    Click Visible Element            css:#action-buttons>app-menu>button
    Click Visible Element            css:#action-buttons > app-menu > p-menu > div > ul > li:nth-child(3) > a
    ${boton de confirmar}            set variable                                                                css:.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
    Click Visible Element            ${boton de confirmar}
    close Browser

Activar usuario
    Open Browser To Page             ${url}
    Location Should Be               ${url}/auth/login
    Login                            admin                                                                       password
    Wait Until Element Is Visible    id:user-name                                                                timeout=5
    Click Element                    css:#menu-usuario>a>span
    Wait Until Element Is Visible    css:.p-datatable-wrapper 
    Click Visible Element            css:#action-buttons>app-menu>button
    Click Visible Element            css:#action-buttons > app-menu > p-menu > div > ul > li:nth-child(4) > a                   