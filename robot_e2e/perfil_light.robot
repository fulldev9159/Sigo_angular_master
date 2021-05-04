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

#######    CREAR PERFIL   #########
  ###### Acceder a ver listar pefiles
    ${"boton-perfil-menu"}    set variable    css:#menu-perfil>a>span
    Click Element    ${"boton-perfil-menu"}
    ${"title-list-profile"}    set variable    css:#title-list-profile
    Wait Until Element Is Visible    ${"title-list-profile"}>h1    timeout=3
    Location Should Be    ${url}/app/profile/list-pro
    ${"boton-nuevo-pefil"}    set variable    id:add-profile-button
    Click Element    ${"boton-nuevo-pefil"}
    
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
    
Listar perfil
  ####### LISTAR PEFILES ###########
    Open Browser To Page    ${url}
    Location Should Be    ${url}/auth/login
    Login    admin    password
    Wait Until Element Is Visible    id:user-name    timeout=5
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