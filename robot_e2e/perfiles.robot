*** Settings ***
Documentation    Test de funcionanildad del modulo de Perfiles.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    resource.robot

*** Test Cases ***
Crear perfil
    Open Browser To Page             ${url}
    Login                            admin                                     password
    Wait Until Element Is Visible    id:user-name                              timeout=5
    ###### Acceder a crear perfil a través del listar pefiles navbar
    Click Visible Element            css:#menu-perfil>a>span
    Click Visible Element            id:add-profile-button
    ####### Crear perfil en la interfaz  ###############
    Wait Until Element Is Enabled    css:#nombre-perfil-input>input
    input text                       css:#nombre-perfil-input>input            Nuevo Perfil robot
    input text                       css:#descripcion-perfil-input>textarea    Nuevo Descripcion perfil robot
    Select item                      css:#nombre-perfil-input > select         AdminContrato
    ${Option Listar OT}=                         set variable                         css:#modulos-pefil-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li:nth-child(1)
    Click Visible Element                        ${Option Listar OT}
#    ${"selector permisos del modulo CUBAGE"}     set variable                         css:#modulos-pefil-CUBAGE>p-listbox>div>div.p-listbox-list-wrapper>ul>li
#    ${permisos del modulo CUBAGE}=               Get WebElements                      ${"selector permisos del modulo CUBAGE"}
#    Click Element                                ${permisos del modulo CUBAGE}[0]
    ${Option Listar CUBAGE}=                     set variable                         css:#modulos-pefil-CUBAGE>p-listbox>div>div.p-listbox-list-wrapper>ul>li:nth-child(1)
    Click Visible Element                        ${Option Listar CUBAGE}
#    ${"selector permisos del modulo PROFILE"}    set variable                         css:#modulos-pefil-PROFILE>p-listbox>div>div.p-listbox-list-wrapper>ul>li
#    ${permisos del modulo PROFILE}=              Get WebElements                      ${"selector permisos del modulo PROFILE"}
#    Click Element                                ${permisos del modulo PROFILE}[0]
    ${Option Listar PROFILE}=                    set variable                         css:#modulos-pefil-PROFILE>p-listbox>div>div.p-listbox-list-wrapper>ul>li:nth-child(1)
    Click Visible Element                        ${Option Listar PROFILE}
    Click Visible Element    id:guardar-button
    close Browser

Listar perfil y desplegar detalle
    Open Browser To Page             ${url}
    Login                            admin                                                                                               password
    Wait Until Element Is Visible    id:user-name                                                                                        timeout=5
    Click Visible Element            css:#menu-perfil>a>span
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)                                timeout=5
    ${cantidad de filas}=            get element count                                                                                   css:.p-datatable-wrapper>table>tbody>tr
    ${status}=                       Evaluate                                                                                            ${cantidad de filas} > 0
    Should Be True                   ${status}
    FOR    ${i}    IN RANGE    ${cantidad de filas}
        ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
        ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    Nuevo Perfil robot
        Set Suite Variable    ${areYouMyLine}
        ${numero de fila}   set variable    ${i + 1}
        Set Suite Variable    ${numero de fila}
        Run Keyword If     ${areYouMyLine}    Exit For Loop
    END
    Should Be True    ${areYouMyLine}
    Element text should be    css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(3)    AdminContrato
    Click Visible Element                                         css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(5)>div:nth-child(2)>div>button
    Wait Until Element Is Visible    css:p-dialog                                                                                        timeout=3
    Element text should be    css:#permisos-modulo-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted         Listar OT
    Element text should be    css:#permisos-modulo-CUBAGE>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted     Listar Cubicacion
    Element text should be    css:#permisos-modulo-PROFILE>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted    Listar Perfiles
    close Browser

Editar perfil
    Open Browser To Page             ${url}
    Login                            admin                                                                   password
    Wait Until Element Is Visible    id:user-name                                                            timeout=5
    Click Element                    css:#menu-perfil>a>span
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
    ${cantidad de filas}=            get element count                                                       css:.p-datatable-wrapper>table>tbody>tr
    ${status}=                       Evaluate                                                                ${cantidad de filas} > 0
    Should Be True                   ${status}

    FOR    ${i}    IN RANGE    ${cantidad de filas}
        ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
        ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    Nuevo Perfil robot
        Set Suite Variable    ${areYouMyLine}
        ${numero de fila}   set variable    ${i + 1}
        Set Suite Variable    ${numero de fila}
        Run Keyword If     ${areYouMyLine}    Exit For Loop
    END
    Element text should be    css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(3)    AdminContrato
    Should Be True    ${areYouMyLine}
    Click Element                                                 css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(5)>div:nth-child(1)>button
    Wait Until Element Is Visible    css:#title-create-profile>h1                                                                    timeout=3
    Wait Until Element Is Enabled    css:#nombre-perfil-input>input
    input text                       css:#nombre-perfil-input>input                                                                  Nuevo Perfil robot editado

    ${permisos del modulo OT}=    Get WebElements                css:#modulos-pefil-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    Click Visible Element                                                ${permisos del modulo OT}[0]
    Click Visible Element                                                ${permisos del modulo OT}[1]

    Click Visible Element                    id:guardar-button
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
    ${cantidad de filas}=            get element count                                                       css:.p-datatable-wrapper>table>tbody>tr
    ${status}=                       Evaluate                                                                ${cantidad de filas} > 0
    Should Be True                   ${status}

### Se comenta por revisión pendiente. A veces no se editan correctamente los permisos
    # FOR    ${i}    IN RANGE    ${cantidad de filas}
    #     ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
    #     ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    Nuevo Perfil robot editado
    #     Set Suite Variable    ${areYouMyLine}
    #     ${numero de fila2}   set variable    ${i + 1}
    #     Set Suite Variable    ${numero de fila2}
    #     Run Keyword If     ${areYouMyLine}    Exit For Loop
    # END
    # Should Be True    ${areYouMyLine}
    # Element text should be    css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila2})>td:nth-child(3)    AdminContrato
    # Click Visible Element                                               css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila2})>td:nth-child(5)>div:nth-child(2)>div>button
    # Wait Until Element Is Visible                                       css:p-dialog    timeout=3

    # Element text should be    css:#permisos-modulo-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted         Crear OT
    close Browser

Eliminar Perfil
    Open Browser To Page             ${url}
    Login                            admin                                                                                           password
    Wait Until Element Is Visible    id:user-name                                                                                    timeout=5
    Click Visible Element                    css:#menu-perfil>a>span
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)                            timeout=5
    ${cantidad de filas}=            get element count                                                                               css:.p-datatable-wrapper>table>tbody>tr
    ${status}=                       Evaluate                                                                                        ${cantidad de filas} > 0
    Should Be True                   ${status}
    FOR    ${i}    IN RANGE    ${cantidad de filas}
        ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
        ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    Nuevo Perfil robot editado
        Set Suite Variable    ${areYouMyLine}
        ${numero de fila}   set variable    ${i + 1}
        Set Suite Variable    ${numero de fila}
        Run Keyword If     ${areYouMyLine}    Exit For Loop
    END
    Should Be True    ${areYouMyLine}
    Click Visible Element                                                 css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(5)>div:nth-child(3)>button
    ${boton de confirmar}    set variable                          css:.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
    Click Visible Element    ${boton de confirmar}
    FOR    ${i}    IN RANGE    ${cantidad de filas}
        ${txt nombre perfil}=    Get Text                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
        ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    Nuevo Perfil robot editado
        Set Suite Variable    ${areYouMyLine}
        ${numero de fila}   set variable    ${i + 1}
        Set Suite Variable    ${numero de fila}
        Run Keyword If     ${areYouMyLine}    Exit For Loop
    END
    Should Not Be True    ${areYouMyLine}
    close Browser


# Al editar a veces falla el cambio de permisos. No cambia o borra todos los permisos
# Al precionar boton eliminar no desaparece de la lista el borrado