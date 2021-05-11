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
    Click Element                                         css:#menu-usuario>a>span
    Wait Until Element Is Visible                         css:.p-datatable-wrapper    timeout=5
    ${cantidad de filas}=    get element count            css:.p-datatable-wrapper>table>tbody>tr
    ${status}=    Evaluate                                ${cantidad de filas} > 0
    Should Be True                                        ${status}
    Click Element                                         css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(8)>div:nth-child(2)>div>button
    Wait Until Element Is Visible                         css:p-dialog    timeout=3
    # ${cantidad de datos de contrato detalle usuario}=     get element count            css:#detalle_contrato_marco>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    # ${statusContratoDetalle}=    Evaluate                 ${cantidad de datos de contrato detalle usuario} > 0
    # Should Be True                                        ${statusContratoDetalle}
    # ${cantidad de datos de perfil detalle usuario}=       get element count            css:#detalle_perfil>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    # ${statusPerfilDetalle}=    Evaluate                   ${cantidad de datos de perfil detalle usuario} > 0
    # Should Be True                                        ${statusPerfilDetalle}
    close Browser

Delete usuario
    Open Browser To Page                                  ${url}
    Location Should Be                                    ${url}/auth/login
    Login    admin    password
    Wait Until Element Is Visible                         id:user-name    timeout=5
    Click Element                                         css:#menu-usuario>a>span
    Wait Until Element Is Visible                         css:.p-datatable-wrapper    timeout=5
    Scroll Element Into View                              css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(8)>div:nth-child(3)>div>button
    Wait Until Element Is Visible                         css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(8)>div:nth-child(3)>div>button    timeout=3
    Click Element                                         css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(8)>div:nth-child(3)>div>button
    ${boton de confirmar}    set variable                 css:body>div>div.p-confirm-popup-footer.ng-tns-c99-5>button.ng-tns-c99-5.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
    Wait Until Element Is Visible    ${boton de confirmar}    timeout=10
    Click Element    ${boton de confirmar}
    close Browser