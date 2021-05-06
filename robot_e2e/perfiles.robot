*** Settings ***
Documentation     Test de funcionanildad del modulo de Perfiles.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Crear perfil
    Open Browser To Page                                         ${url}
    Login    admin    password
    Wait Until Element Is Visible                                id:user-name    timeout=5
    ###### Acceder a ver listar pefiles a través del navbar
    Click Element                                                css:#menu-perfil>a>span
    Wait Until Element Is Visible                                id:add-profile-button    timeout=3
    Click Element                                                id:add-profile-button
#     ###### Guardar Perfil ###############
    input text    css:#nombre-perfil-input>input                 Nuevo Perfil robot
    input text    css:#descripcion-perfil-input>textarea         Nuevo Descripcion perfil robot
    ${Listar OT}=    set variable                                css:#modulos-pefil-OT >p-listbox>div>div.p-listbox-list-wrapper>ul>li:nth-child(1)>div>div
    Wait Until Element Is Enabled    ${Listar OT}
    Wait Until Element Is Visible    ${Listar OT}
    sleep    10
    Click Element                                                ${Listar OT}
    Execute Javascript    document.querySelector("#modulos-pefil-OT >p-listbox>div>div.p-listbox-list-wrapper>ul>li:nth-child(1)").click()
#     ${"selector permisos del modulo CUBAGE"}    set variable     css:#modulos-pefil-CUBAGE>p-listbox>div>div.p-listbox-list-wrapper>ul>li
#     ${permisos del modulo CUBAGE}=    Get WebElements            ${"selector permisos del modulo CUBAGE"}
#     Click Element                                                ${permisos del modulo CUBAGE}[0]
#     ${"selector permisos del modulo PROFILE"}    set variable    css:#modulos-pefil-PROFILE>p-listbox>div>div.p-listbox-list-wrapper>ul>li
#     ${permisos del modulo PROFILE}=    Get WebElements           ${"selector permisos del modulo PROFILE"}
#     Click Element                                                ${permisos del modulo PROFILE}[0]
#     Click Element                                                id:guardar-button
#     close Browser
    
# Listar perfil y desplegar detalle
#     Open Browser To Page                                         ${url}
#     Login    admin    password
#     Wait Until Element Is Visible                                id:user-name    timeout=5
#     ${"boton-perfil-menu"}           set variable                css:#menu-perfil>a>span
#     Click Element                                                ${"boton-perfil-menu"}
#     Wait Until Element Is Visible                                css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
#     ${cantidad de filas}=    get element count                   css:.p-datatable-wrapper>table>tbody>tr
    
#     FOR    ${i}    IN RANGE    ${cantidad de filas}
#         ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#         ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    Nuevo Perfil robot
#         Set Suite Variable    ${areYouMyLine}
#         ${numero de fila}   set variable    ${i + 1}
#         Set Suite Variable    ${numero de fila}
#         Run Keyword If     ${areYouMyLine}    Exit For Loop        
#     END
#     Should Be True    ${areYouMyLine}
#     Click Element                                                 css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(5)>div:nth-child(2)>button
#     Wait Until Element Is Visible                                 css:p-dialog    timeout=3
#     Element text should be    css:#permisos-modulo-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted         Listar OT
#     Element text should be    css:#permisos-modulo-CUBAGE>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted     Listar Cubicacion
#     Element text should be    css:#permisos-modulo-PROFILE>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted    Listar Perfiles
#     close Browser

# Editar perfil
#     Open Browser To Page                                         ${url}
#     Login    admin    password
#     Wait Until Element Is Visible                                id:user-name    timeout=5
#     ${"boton-perfil-menu"}           set variable                css:#menu-perfil>a>span
#     Click Element                                                ${"boton-perfil-menu"}
#     Wait Until Element Is Visible                                css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
#     ${cantidad de filas}=    get element count                   css:.p-datatable-wrapper>table>tbody>tr
    
#     FOR    ${i}    IN RANGE    ${cantidad de filas}
#         ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#         ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    Nuevo Perfil robot
#         Set Suite Variable    ${areYouMyLine}
#         ${numero de fila}   set variable    ${i + 1}
#         Set Suite Variable    ${numero de fila}
#         Run Keyword If     ${areYouMyLine}    Exit For Loop        
#     END
#     Should Be True    ${areYouMyLine}
#     Click Element                                                 css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(5)>div:nth-child(1)>button
#     Wait Until Element Is Visible                                 css:#title-create-profile>h1    timeout=3
#     ${"input-nombre-perfil"}    set variable                      css:#nombre-perfil-input
#     input text    ${"input-nombre-perfil"}>input                  Nuevo Perfil robot editado
#     ${"selector permisos del modulo OT"}    set variable         css:#modulos-pefil-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li
#     ${permisos del modulo OT}=    Get WebElements                ${"selector permisos del modulo OT"}
#     Click Element                                                ${permisos del modulo OT}[0]
#     Click Element                                                ${permisos del modulo OT}[1]
#     Click Element                                                id:guardar-button
#     Wait Until Element Is Visible                                css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
#     ${cantidad de filas}=    get element count                   css:.p-datatable-wrapper>table>tbody>tr
    
#     FOR    ${i}    IN RANGE    ${cantidad de filas}
#         ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#         ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    Nuevo Perfil robot editado
#         Set Suite Variable    ${areYouMyLine}
#         ${numero de fila2}   set variable    ${i + 1}
#         Set Suite Variable    ${numero de fila2}
#         Run Keyword If     ${areYouMyLine}    Exit For Loop        
#     END
#     Should Be True    ${areYouMyLine}
#     Click Element                                                 css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila2})>td:nth-child(5)>div:nth-child(2)>button
#     Wait Until Element Is Visible                                 css:p-dialog    timeout=3
#     Element text should be    css:#permisos-modulo-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted         Crear OT
#     close Browser

# Eliminar Perfil
#     Open Browser To Page                                         ${url}
#     Login    admin    password
#     Wait Until Element Is Visible                                id:user-name    timeout=5
#     ${"boton-perfil-menu"}           set variable                css:#menu-perfil>a>span
#     Click Element                                                ${"boton-perfil-menu"}
#     Wait Until Element Is Visible                                css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
#     ${cantidad de filas}=    get element count                   css:.p-datatable-wrapper>table>tbody>tr
    
#     FOR    ${i}    IN RANGE    ${cantidad de filas}
#         ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#         ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    Nuevo Perfil robot editado
#         Set Suite Variable    ${areYouMyLine}
#         ${numero de fila}   set variable    ${i + 1}
#         Set Suite Variable    ${numero de fila}
#         Run Keyword If     ${areYouMyLine}    Exit For Loop        
#     END
#     Click Element                                                 css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(5)>div:nth-child(3)>button
#     ${boton de confirmar}    set variable                         css:body>div>div.p-confirm-popup-footer.ng-tns-c99-5>button.ng-tns-c99-5.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
#     Wait Until Element Is Visible    ${boton de confirmar}    timeout=3
#     Click Element    ${boton de confirmar}
#     close Browser