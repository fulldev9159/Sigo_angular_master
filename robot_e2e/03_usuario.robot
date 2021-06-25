*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    resource.robot

*** Test Cases ***
Crear usuario
#delete from Usuario_has_contrato where id_usuario=(select id from Usuario_new where username='testjjefearea'); delete from Usuario_has_perfil where usuario_id=(select id from Usuario_new where username='testjjefearea');delete from Usuario_new where username='testjjefearea';
    Open Browser To Page                   ${url}
    Login                                  admin                                            password
    Navegar al menu                        Usuario
    #### Creacion del usuario #######
    Acceder a creacion de nuevo usuario
    Set username                           testjjefearea
    Set nombres y apellidos                Juan                                             Cancino
    Set email                              admin@contrato.com
    Set documento de identidad             12345671123
    #Set celular                       5555555 5555
    Set tipo empresa                       movistar
    Set empresa                            Telefonica Chile Servicios Corporativos Ltda.
    Set area                               CONECTIVIDAD Y BACKHAUL
    Set todos los contratos 
    Set perfil usuario                     TEST Jefe Área                                   
    Guardar usuario
    Log To Console                         testjjefearea
    sleep                                  5
    Validar existencia en la tabla         1                                                testjjefearea
    Reload Page
    # Acceder a creacion de nuevo usuario
    # Set username                           testjgestor
    # Set nombres y apellidos                Juan                                             Cancino
    # Set email                              admin@contrato.com
    # Set documento de identidad             12345671123
    # #Set celular                       5555555 5555
    # Set tipo empresa                       movistar
    # Set empresa                            Telefonica Chile Servicios Corporativos Ltda.
    # Set area                               CONECTIVIDAD Y BACKHAUL
    # Set todos los contratos
    # Set perfil usuario                     TEST Gestor Telefónica
    # Set superior directo                   Juan Cancino
    # Guardar usuario
    # Log To Console                         testjgestor
    # Validar existencia en la tabla         1                                                testjgestor
    close Browser

# Editar usuario
#    Open Browser To Page             ${url}
#    Login                            admin                                                                   password
#    Wait Until Element Is Visible    id:user-name                                                            timeout=5
#    Click Element                    css:#menu-usuario>a>span
#    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
#    ${cantidad de filas}=            get element count                                                       css:.p-datatable-wrapper>table>tbody>tr
#    ${status}=                       Evaluate                                                                ${cantidad de filas} > 0
#    Should Be True                   ${status}

#    FOR                              ${i}                                                                                                    IN RANGE                                                                       ${cantidad de filas}
#    ${txt nombre perfil}=            Get Text                                                                                                css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#    ${areYouMyLine} =                Run Keyword and Return Status                                                                           Should Be Equal As Strings                                                     ${txt nombre perfil}    carloscfuentes
#    Set Suite Variable               ${areYouMyLine}
#    ${numero de fila}                set variable                                                                                            ${i + 1}
#    Set Suite Variable               ${numero de fila}
#    Run Keyword If                   ${areYouMyLine}                                                                                         Exit For Loop
#    END
#    Element text should be           css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(1)                    carloscfuentes
#    Should Be True                   ${areYouMyLine}
#    Click Visible Element            css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>td:nth-child(8)>app-menu>button
#    Click Visible Element            css:app-menu > p-menu > div > ul > li:nth-child(1) > a
#    UsuarioEdit                      17.220.899-1                                                                                            Nombre Robot Editado                                                           Apllidos Robot          emailrobot@robot.cl
#    Validar si existe en la Lista    3                                                                                                       Nombre Robot Editado
#    close Browser

# Delete usuario
#    Open Browser To Page             ${url}
#    Location Should Be               ${url}/auth/login
#    Login                            admin                                                                                                   password
#    Wait Until Element Is Visible    id:user-name                                                                                            timeout=5
#    Click Element                    css:#menu-usuario>a>span
#    Wait Until Element Is Visible    css:.p-datatable-wrapper
#    ${cantidad de filas}=            get element count                                                                                       css:.p-datatable-wrapper>table>tbody>tr
#    ${status}=                       Evaluate                                                                                                ${cantidad de filas} > 0
#    Should Be True                   ${status}                                                                                               timeout=5
#    FOR                              ${i}                                                                                                    IN RANGE                                                                         ${cantidad de filas}
#    ${txt nombre perfil}=            Get Text                                                                                                css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
#    ${areYouMyLine} =                Run Keyword and Return Status                                                                           Should Be Equal As Strings                                                       ${txt nombre perfil}    carloscfuentes
#    Set Suite Variable               ${areYouMyLine}
#    ${numero de fila}                set variable                                                                                            ${i + 1}
#    Set Suite Variable               ${numero de fila}
#    Run Keyword If                   ${areYouMyLine}                                                                                         Exit For Loop
#    END
#    Click Visible Element            css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>#action-buttons>app-menu>button
#    Click Visible Element            css:app-menu > p-menu > div > ul > li:nth-child(3) > a
#    ${boton de confirmar}            set variable                                                                                            css:.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
#    Click Visible Element            ${boton de confirmar}
#    close Browser

# Activar usuario
#    Open Browser To Page             ${url}
#    Location Should Be               ${url}/auth/login
#    Login                            admin                                                     password
#    Wait Until Element Is Visible    id:user-name                                              timeout=5
#    Click Element                    css:#menu-usuario>a>span
#    Wait Until Element Is Visible    css:.p-datatable-wrapper 
#    Click Visible Element            css:app-menu>button
#    Click Visible Element            css:app-menu > p-menu > div > ul > li:nth-child(4) > a    