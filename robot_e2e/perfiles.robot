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

######### NAVBAR #############
    Element text should be    class:header-menu    Módulos
    Element text should be    css:#menu-ot>a>span    OT
    ${menus}=    Get WebElements    css:#otSub>li
    Element text should be    ${menus}[0]    Listar OTs
    Element text should be    ${menus}[1]    Crear OT
    Element text should be    css:#menu-cubicacion>a>span    Cubicación
    Click Element    css:#menu-cubicacion>a>span
    ${menus}=    Get WebElements    css:#cubSub>li
    Element text should be    ${menus}[0]    Listar Cubicaciones
    Wait Until Element Is Visible    ${menus}[1]    timeout=5
    Element text should be    ${menus}[1]    Crear Cubicación
    Element text should be    css:#menu-perfil>a>span    Perfiles


#######    CREAR PERFIL   #########
  ###### Acceder a ver listar pefiles
    ${"boton-perfil-menu"}    set variable    css:#menu-perfil>a>span
    Click Element    ${"boton-perfil-menu"}
    ${"title-list-profile"}    set variable    css:#title-list-profile
    Wait Until Element Is Visible    ${"title-list-profile"}>h1    timeout=3
    Location Should Be    ${url}/app/profile/list-pro
    Element text should be    ${"title-list-profile"}>h1    Perfiles
    Element text should be    ${"title-list-profile"}>span    listado de perfiles en sistema
    ${"boton-nuevo-pefil"}    set variable    id:add-profile-button
    element should be visible    ${"boton-nuevo-pefil"}
    element should be enabled    ${"boton-nuevo-pefil"}
    # Presionar Ingresar Perfil
    Click Element    ${"boton-nuevo-pefil"}
    
  ####### Validacion de componentes 
    ${"title-create-profile"}    set variable    css:#title-create-profile
    Wait Until Element Is Visible    ${"title-create-profile"}>h1    timeout=3
    Location Should Be    ${url}/app/profile/form-pro
    ### Titlulos
    Element text should be    ${"title-create-profile"}>h1    Creación de Perfil
    Element text should be    ${"title-create-profile"}>span    formulario para crear un nuevo perfil
    ${"boton-volver"}    set variable    id:volver-button
    element should be visible    ${"boton-volver"}
    element should be enabled    ${"boton-volver"}

    ### Formulario 
    ${"input-nombre-perfil"}    set variable    css:#nombre-perfil-input
    Set Suite Variable    ${"input-nombre-perfil"}
    Element text should be    ${"input-nombre-perfil"}>label    Nombre perfil
    element should be visible    ${"input-nombre-perfil"}>input 
    element should be enabled    ${"input-nombre-perfil"}>input
    ${"input-descripcion-perfil"}    set variable    css:#descripcion-perfil-input
    Set Suite Variable    ${"input-descripcion-perfil"}
    Element text should be    ${"input-descripcion-perfil"}>label    Descripción perfil
    element should be visible    ${"input-descripcion-perfil"}>textarea 
    element should be enabled    ${"input-descripcion-perfil"}>textarea
    # Val Button guardar
    element should be visible    id:guardar-button 
    element should be disabled    id:guardar-button
    # Val despliegue de permisos por módulo
    #https://robotframework.org/robotframework/latest/libraries/Collections.html
    # ver como crear lógicas más complejas como manejo y manipulación de arrays
    ${"titulo modulo OT"}    set variable    css:#modulos-pefil-OT>p-listbox>div>div:nth-child(1)
    Element text should be    ${"titulo modulo OT"}    OT
    ${"selector permisos del modulo OT"}    set variable    css:#modulos-pefil-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    ${permisos del modulo OT}=    Get WebElements    ${"selector permisos del modulo OT"}
    Set Suite Variable    ${permisos del modulo OT}
    Element text should be    ${permisos del modulo OT}[0]    Listar OT
    Element text should be    ${permisos del modulo OT}[1]    Crear OT
    Element text should be    ${permisos del modulo OT}[2]    Aceptar OT
    Element text should be    ${permisos del modulo OT}[3]    Rechazar OT
    Element text should be    ${permisos del modulo OT}[4]    Editar OT
    Element text should be    ${permisos del modulo OT}[5]    Eliminar OT

    ${"titulo modulo CUBAGE"}    set variable    css:#modulos-pefil-CUBAGE>p-listbox>div>div:nth-child(1)
    Element text should be    ${"titulo modulo CUBAGE"}    CUBAGE
    ${"selector permisos del modulo CUBAGE"}    set variable    css:#modulos-pefil-CUBAGE>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    ${permisos del modulo CUBAGE}=    Get WebElements    ${"selector permisos del modulo CUBAGE"}
    Set Suite Variable    ${permisos del modulo CUBAGE}
    Element text should be    ${permisos del modulo CUBAGE}[0]    Listar Cubicacion
    Element text should be    ${permisos del modulo CUBAGE}[1]    Crear Cubicacion
    Element text should be    ${permisos del modulo CUBAGE}[2]    Aceptar Cubicacion
    Element text should be    ${permisos del modulo CUBAGE}[3]    Rechazar Cubicacion
    Element text should be    ${permisos del modulo CUBAGE}[4]    Editar Cubicacion
    Element text should be    ${permisos del modulo CUBAGE}[5]    Eliminar Cubicacion
    Element text should be    ${permisos del modulo CUBAGE}[6]    Copiar Cubicacion

    ${"titulo modulo PROFILE"}    set variable    css:#modulos-pefil-PROFILE>p-listbox>div>div:nth-child(1)
    Element text should be    ${"titulo modulo PROFILE"}    PROFILE
    ${"selector permisos del modulo PROFILE"}    set variable    css:#modulos-pefil-PROFILE>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    ${permisos del modulo PROFILE}=    Get WebElements    ${"selector permisos del modulo PROFILE"}
    Set Suite Variable    ${permisos del modulo PROFILE}
    Element text should be    ${permisos del modulo PROFILE}[0]    Listar Perfiles
    Element text should be    ${permisos del modulo PROFILE}[1]    Crear Perfil
    Element text should be    ${permisos del modulo PROFILE}[2]    Editar Perfil
    Element text should be    ${permisos del modulo PROFILE}[3]    Eliminar Perfil

 
 ###### Guardar Perfil ###############
    # ${"input-nombre-perfil"}    set variable    css:#nombre-perfil-input
    input text    ${"input-nombre-perfil"}>input    Nuevo Perfil robot
    input text    ${"input-descripcion-perfil"}>textarea    Nuevo Descripcion perfil robot
    Click Element    ${permisos del modulo OT}[0]
    Click Element    ${permisos del modulo OT}[1]
    Click Element    ${permisos del modulo CUBAGE}[0]
    Click Element    ${permisos del modulo CUBAGE}[3]
    Click Element    ${permisos del modulo PROFILE}[0]
    Click Element    id:guardar-button

    

  ####### LISTAR PEFILES ###########
    ${"title-list-profile"}    set variable    css:#title-list-profile
    Wait Until Element Is Visible    ${"title-list-profile"}>h1    timeout=3
    Location Should Be    ${url}/app/profile/list-pro

    ${selector titulos de la tabla}    set variable    css:.p-datatable-thead>tr>th
    ${titulos de la tabla}    Get WebElements    ${selector titulos de la tabla}
    Element text should be    ${titulos de la tabla}[0]    Nombre Perfil
    Element text should be    ${titulos de la tabla}[1]    Descripción
    Element text should be    ${titulos de la tabla}[2]    Perfil Superior
    Element text should be    ${titulos de la tabla}[3]    Fecha Creación

    ${txt}=    get element count    css:.p-datatable-wrapper>table>tbody>tr
    Log to Console    ${txt}

    FOR    ${i}    IN RANGE    ${txt}
        Log to Console    ${i + 1}
        
        ${nombre-perfil}    set variable    css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
        ${txt nombre perfil}=    Get Text    ${nombre-perfil}
        Log to Console    css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
        Log to Console    ${txt nombre perfil}
        ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${txt nombre perfil}    Nuevo Perfil robot
        # ${areYouMyLine} =   Run Keyword and Return Status    Should Be Equal As Strings    ${i + 1}    -3
        Log to Console     ${areYouMyLine}
        ${numero de fila}   set variable    ${i + 1}
        Set Suite Variable    ${numero de fila}
        Run Keyword If     ${areYouMyLine}    Exit For Loop        
    END
    Should Be True    ${areYouMyLine}

##### ELIMINAR ##########
    Log to Console    ${numero de fila}
    Click Element    css:.p-datatable-wrapper>table>tbody>tr:nth-child(2)>td:nth-child(5)>div:nth-child(3)>button
    ${boton de confirmar}    set variable    css:body>div>div.p-confirm-popup-footer.ng-tns-c99-5>button.ng-tns-c99-5.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
    Wait Until Element Is Visible    ${boton de confirmar}    timeout=3
    Click Element    ${boton de confirmar}
    
    # close Browser

# Vamos a permitir crear perfiles sin permisos?
# Ver como validar los toast en robotfaramework
# Falta desplegar a nivel web el error cuando se crea un perfil con un nombre ya existe

# ${txt}=    Get Text    ${permisos del modulo PROFILE}[0]
# Log to Console    ${txt}

