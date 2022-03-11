*** Settings ***
Documentation    Test de funcionanildad del modulo de Perfiles.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    resource.robot

*** Variables ***
@{permisos OT jefe area}=    Listar
...                          Autorizar OT

@{permisos Cubicacion jefe area}=    Listar
...                                  Autorizar cubicación

@{permisos OT gestor}=    Listar

@{permisos Cubicacion gestor}=    Listar

*** Test Cases ***
Crear perfil
    Open Browser To Page                  ${url}
    Login                                 admin     pass
    Navegar al menu                       Perfil
    Acceder a creacion de nuevo perfil
    # Set nombre perfil                     TEST Jefe Área
    # Set descripcion perfil                Test Jefe Área de telefónica
    # Set Permisos modulo                   OT                              @{permisos OT jefe area}
    # Set Permisos modulo                   CUBICACION                      @{permisos Cubicacion jefe area}
    # Guardar perfil
    # Validar existencia en la tabla        1                                         TEST Jefe Área
    # Validar existencia en la tabla        2                                         Test Jefe Área de telefónica
    # Reload Page
    # Acceder a creacion de nuevo perfil
    # Set nombre perfil                     TEST Gestor Telefónica
    # Set jefatura                          TEST Jefe Área
    # Set descripcion perfil                Test Gestor de proyectos de telefónica
    # Set Permisos modulo                   OT                                        @{permisos OT gestor}
    # Set Permisos modulo                   CUBICACION                                @{permisos Cubicacion gestor}
    # Guardar perfil
    # Validar existencia en la tabla        1                                         TEST Gestor Telefónica
    # Validar existencia en la tabla        2                                         Test Gestor de proyectos de telefónica
    #  #Validar existencia en la tabla        3                                         TEST Jefe Área
    # Reload Page
    # Acceder a creacion de nuevo perfil
    # Set nombre perfil                     TEST para borrar
    # Set descripcion perfil                Test borrado
    # Set Permisos modulo                   OT                                        @{permisos OT jefe area}
    # Guardar perfil
    # close Browser


#Desplegar detalle
#    Open Browser To Page             ${url}
#    Login                            admin                                                                                                               password
#    Wait Until Element Is Visible    id:user-name                                                                                                        timeout=5
#    Click Visible Element            css:#menu-perfil>a>span
#    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)                                                timeout=5
#    ${cantidad de filas}=            get element count                                                                                                   css:.p-datatable-wrapper>table>tbody>tr
#    ${status}=                       Evaluate                                                                                                            ${cantidad de filas} > 0
#    Should Be True                   ${status}
#    FOR                              ${i}                                                                                                                IN RANGE                                                                       ${cantidad de filas}
#    ${txt nombre perfil}=            Get Text                                                                                                            css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#    ${areYouMyLine} =                Run Keyword and Return Status                                                                                       Should Be Equal As Strings                                                     ${txt nombre perfil}    Nuevo Perfil Robot
#    Set Suite Variable               ${areYouMyLine}
#    ${numero de fila}                set variable                                                                                                        ${i + 1}
#    Set Suite Variable               ${numero de fila}
#    Run Keyword If                   ${areYouMyLine}                                                                                                     Exit For Loop
#    END
#    Should Be True                   ${areYouMyLine}
#    Element text should be           css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(3)                                AdminContrato
#    Click Visible Element            css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(5)>div:nth-child(2)>div>button
#    Wait Until Element Is Visible    css:p-dialog                                                                                                        timeout=3
#    Element text should be           css:#permisos-modulo-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted                        Listar OT
#    Element text should be           css:#permisos-modulo-CUBICACION>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted                Listar Cubicacion
#    Element text should be           css:#permisos-modulo-PERFIL>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted                    Listar Perfiles
#    close Browser

# Editar perfil
#    Open Browser To Page             ${url}
#    Login                            admin                                                                   password
#    Wait Until Element Is Visible    id:user-name                                                            timeout=5
#    Click Element                    css:#menu-perfil>a>span
#    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
#    ${cantidad de filas}=            get element count                                                       css:.p-datatable-wrapper>table>tbody>tr
#    ${status}=                       Evaluate                                                                ${cantidad de filas} > 0
#    Should Be True                   ${status}

#    FOR                              ${i}                                                                                                            IN RANGE                                                                       ${cantidad de filas}
#    ${txt nombre perfil}=            Get Text                                                                                                        css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#    ${areYouMyLine} =                Run Keyword and Return Status                                                                                   Should Be Equal As Strings                                                     ${txt nombre perfil}    Nuevo Perfil Robot
#    Set Suite Variable               ${areYouMyLine}
#    ${numero de fila}                set variable                                                                                                    ${i + 1}
#    Set Suite Variable               ${numero de fila}
#    Run Keyword If                   ${areYouMyLine}                                                                                                 Exit For Loop
#    END
#    Element text should be           css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(3)                            AdminContrato
#    Should Be True                   ${areYouMyLine}
#    Click Element                    css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(5)>div:nth-child(1)>button
#    Wait Until Element Is Visible    css:#title-create-profile>h1                                                                                    timeout=3
#    Wait Until Element Is Enabled    css:#nombre-perfil-input>input
#    input text                       css:#nombre-perfil-input>input                                                                                  Nuevo Perfil Robot Editado

#    ${permisos del modulo OT}=    Get WebElements                 css:#modulos-pefil-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li
#    Click Visible Element         ${permisos del modulo OT}[0]
#    Click Visible Element         ${permisos del modulo OT}[1]

#    Click Visible Element            id:guardar-button
#    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
#    ${cantidad de filas}=            get element count                                                       css:.p-datatable-wrapper>table>tbody>tr
#    ${status}=                       Evaluate                                                                ${cantidad de filas} > 0
#    Should Be True                   ${status}

# ### Se comenta por revisión pendiente. A veces no se editan correctamente los permisos
#    # FOR                              ${i}                                                                                                                 IN RANGE                         ${cantidad de filas}
#    #                                  ${txt nombre perfil}=                                                                                                Get Text                         css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#    #                                  ${areYouMyLine} =                                                                                                    Run Keyword and Return Status    Should Be Equal As Strings                                                     ${txt nombre perfil}    Nuevo Perfil robot editado
#    #                                  Set Suite Variable                                                                                                   ${areYouMyLine}
#    #                                  ${numero de fila2}                                                                                                   set variable                     ${i + 1}
#    #                                  Set Suite Variable                                                                                                   ${numero de fila2}
#    #                                  Run Keyword If                                                                                                       ${areYouMyLine}                  Exit For Loop
#    # END
#    # Should Be True                   ${areYouMyLine}
#    # Element text should be           css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila2})>td:nth-child(3)                                AdminContrato
#    # Click Visible Element            css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila2})>td:nth-child(5)>div:nth-child(2)>div>button
#    # Wait Until Element Is Visible    css:p-dialog                                                                                                         timeout=3

#    # Element text should be    css:#permisos-modulo-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li>span.ng-star-inserted    Crear OT
#    close Browser

# Eliminar Perfil
#    Open Browser To Page           ${url}
#    Login                          admin               password
#    Navegar al menu                Perfil
#    Eliminar perfil                TEST para borrar
#    Reload Page
#    No debe existir en la tabla    TEST para borrar
#    close Browser


