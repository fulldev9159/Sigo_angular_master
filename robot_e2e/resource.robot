*** Settings ***
Documentation    A resource file with reusable keywords and variables.
...
...        The system specific keywords created here form our own
...        domain specific language. They utilize keywords provided
...        by the imported SeleniumLibrary.
Library    SeleniumLibrary

*** Variables ***

*** Keywords ***
Open Browser To Page
    [Arguments]                ${page}
    ${options}=                Evaluate                      sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Run Keyword If             '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    disable-web-security
    Run Keyword If             '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    allow-running-insecure-content
    Run Keyword If             '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    headless
    Run Keyword If             '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    disable-gpu
    Run Keyword If             '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    no-sandbox
    # Set Window Size     1500    1500
    Create WebDriver           Chrome                        chrome_options=${options}
    Maximize Browser Window
    Go To                      ${page}

Login
    [Arguments]                      ${username}      ${password}
    input text                       name:username    ${username}
    input password                   name:password    ${password}
    element should be enabled        id:login
    Click Button                     id:login
    Wait Until Element Is Visible    id:user-name     timeout=5

Element text should be
    [Arguments]        ${element}    ${texto}
    ${txt}=            Get Text      ${element}
    Should Be Equal    ${txt}        ${texto}

Click Visible Element
    [Arguments]                      ${element}
    Wait Until Element Is Visible    ${element}    timeout=4
    Scroll Element Into View         ${element}
    Click Element                    ${element}

Select item
    [Arguments]                      ${selector}          ${value}
    ${select element}                Get WebElement       ${selector}
    Wait Until Element Is Visible    ${select element}    timeout=4
    Wait Until Element Is enabled    ${select element}
    Scroll Element Into View         ${select element}
    Select From List By Label        ${select element}    ${value}

Select item value
    [Arguments]                  ${selector}          ${value}
    ${select element}            Get WebElement       ${selector}
    Click Visible Element        ${select element}
    Select From List By Value    ${select element}    ${value}

Usuario
    [Arguments]                      ${username}                                                                                                      ${documento}                                     ${nombres}    ${apellidos}    ${email}
    input text                       name:username                                                                                                    ${username}
    input text                       name:documento-input                                                                                             ${documento}
    input text                       name:nombre-input                                                                                                ${nombres}
    input text                       name:apellidos-input                                                                                             ${apellidos}
    input text                       name:email-input                                                                                                 ${email}
    Select item                      css:#proveedor_id > select                                                                                       Telefonica Chile Servicios Corporativos Ltda.
    Select item                      css:#area_id > select                                                                                            CONECTIVIDAD Y BACKHAUL
    Click Visible Element            id:contratos_marco_multi
    Wait Until Element Is Visible    id:contratos_marco_multi
    Click Visible Element            css:.p-multiselect-items-wrapper>ul>cdk-virtual-scroll-viewport>div>p-multiselectitem:nth-child(1)>li>div>div
    Click Visible Element            id: caja_formulario
    sleep                            2
    Scroll Element Into View         css:#perfil_id > select
    Select item                      css:#perfil_id > select                                                                                          Admin
    element should be enabled        id:submit-user
    Click Visible Element            id:submit-user

Crear Cubicacion
    [Arguments]                      ${nombre cubicacion}                                                                                                                                                 ${contrato}             ${proveedor}    ${region}    ${tipo servicio}
    Wait Until Element Is Visible    css:ng-autocomplete > div > div.input-container > input                                                                                                              
    input text                       css:ng-autocomplete > div > div.input-container > input                                                                                                              ${nombre cubicacion}    
    Click Visible Element            id:box
    Select item                      name:select-contratoMarco                                                                                                                                            ${contrato} 
    Select item                      name:select-proveedor                                                                                                                                                ${proveedor}
    Select item                      name:select-region                                                                                                                                                   ${region} 
    Select item                      name:select-tipoServicio                                                                                                                                             ${tipo servicio}
    Click Visible Element            css:#box > div.col-xs-12.col-md-8 > div > p-listbox > div > div.p-listbox-list-wrapper > ul > li:nth-child(1) > div.p-checkbox.p-component.ng-star-inserted > div

UsuarioEdit
    [Arguments]                      ${documento}                                                                                                     ${nombres}                                       ${apellidos}    ${email}
    input text                       name:documento-input                                                                                             ${documento}
    input text                       name:nombre-input                                                                                                ${nombres}
    input text                       name:apellidos-input                                                                                             ${apellidos}
    input text                       name:email-input                                                                                                 ${email}
    Select item                      css:#proveedor_id > select                                                                                       Telefonica Chile Servicios Corporativos Ltda.
    Select item                      css:#area_id > select                                                                                            CONECTIVIDAD Y BACKHAUL
    Click Visible Element            id:contratos_marco_multi
    Wait Until Element Is Visible    id:contratos_marco_multi
    Click Visible Element            css:.p-multiselect-items-wrapper>ul>cdk-virtual-scroll-viewport>div>p-multiselectitem:nth-child(1)>li>div>div
    Click Visible Element            id: caja_formulario
    element should be enabled        id:submit-user
    Click Visible Element            id:submit-user

Validar existencia en la tabla
    [Arguments]                      ${columna a validar}                                                    ${nombre}
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
    input text                       css:div.p-datatable-header.ng-star-inserted > div > span > input        ${nombre}
    sleep                            1
    ${cantidad de filas}=            get element count                                                       css:.p-datatable-wrapper>table>tbody>tr
    ${status}=                       Evaluate                                                                ${cantidad de filas} > 0
    Should Be True                   ${status}
    FOR                              ${i}                                                                    IN RANGE                                                                                          ${cantidad de filas}
    ${txt nombre fila}=              Get Text                                                                css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(${columna a validar})
    ${areYouMyLine} =                Run Keyword and Return Status                                           Should Be Equal As Strings                                                                        ${txt nombre fila}      ${nombre}
    Set Suite Variable               ${areYouMyLine}
    ${numero de fila}                set variable                                                            ${i + 1}
    Set Suite Variable               ${numero de fila}
    Run Keyword If                   ${areYouMyLine}                                                         Exit For Loop
    END
    Should Be True                   ${areYouMyLine}

Get index list
    [Arguments]                      ${columna a validar}                                                    ${valor}
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
    ${cantidad de filas}=            get element count                                                       css:.p-datatable-wrapper>table>tbody>tr
    ${status}=                       Evaluate                                                                ${cantidad de filas} > 0
    Should Be True                   ${status}
    FOR                              ${i}                                                                    IN RANGE                                                                                          ${cantidad de filas}
    ${txt nombre fila}=              Get Text                                                                css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(${columna a validar})
    ${areYouMyLine} =                Run Keyword and Return Status                                           Should Be Equal As Strings                                                                        ${txt nombre fila}      ${valor}
    Set Suite Variable               ${areYouMyLine}
    ${numero de fila}                set variable                                                            ${i + 1}
    Set Suite Variable               ${numero de fila}
    Run Keyword If                   ${areYouMyLine}                                                         Exit For Loop
    END
    Should Be True                   ${areYouMyLine}
    [return]                         ${numero de fila}

Click Menu Editar
    [Arguments]                      ${usuario}
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)                                      timeout=5
    input text                       css:div.p-datatable-header.ng-star-inserted > div > span > input                                          ${usuario}    timeout=5
    # ${cantidad de filas}=            get element count                                                                                         css:.p-datatable-wrapper>table>tbody>tr
    # ${status}=                       Evaluate                                                                                                  ${cantidad de filas} > 0
    # Should Be True                   ${status}
    # FOR                              ${i}                                                                                                      IN RANGE                                                                       ${cantidad de filas}
    # ${txt nombre fila}=              Get Text                                                                                                  css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
    # ${areYouMyLine} =                Run Keyword and Return Status                                                                             Should Be Equal As Strings                                                     ${txt nombre fila}      ${usuario}
    # Set Suite Variable               ${areYouMyLine}
    # ${numero de fila}                set variable                                                                                              ${i + 1}
    # Set Suite Variable               ${numero de fila}
    # Run Keyword If                   ${areYouMyLine}                                                                                           Exit For Loop
    # END
    # Should Be True                   ${areYouMyLine}
    Click Visible Element            css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>#action-buttons>app-menu>button
    Click Visible Element            css:app-menu > p-menu > div > ul > li:nth-child(1) > a
    Wait Until Element Is Visible    css:#page-content-wrapper > div > app-user > div > app-form-user > div > div > div:nth-child(1) > span

Eliminar todos los perfiles
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1) 
    ${cantidad de filas}=            get element count                                                                               css:.p-datatable-wrapper>table>tbody>tr
    FOR                              ${i}                                                                                            IN RANGE                                                                         ${cantidad de filas}
    Click Visible Element            css:.p-datatable-wrapper>table>tbody>tr:nth-child(2)>td:nth-child(5)>div:nth-child(3)>button
    ${boton de confirmar}            set variable                                                                                    css:.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
    Click Visible Element            ${boton de confirmar}
    END

Eliminar usuario
    [Arguments]              ${usuario}
    ${numero de fila}=       Get index list                                                                                          1                                                                                ${usuario}
    Click Visible Element    css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>#action-buttons>app-menu>button
    Click Visible Element    css:app-menu > p-menu > div > ul > li:nth-child(3) > a
    ${boton de confirmar}    set variable                                                                                            css:.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
    Click Visible Element    ${boton de confirmar}

Navegar al menu
    [Arguments]       ${menu}
    Run Keyword If    '${menu}' == 'Usuario'             Click Element            css:#menu-usuario>a>span
    Run Keyword If    '${menu}' == 'Crear Cubicacion'    Click Visible Element    css:#menu-cubicacion > a > span
    Run Keyword If    '${menu}' == 'Crear Cubicacion'    Click Visible Element    id:listarCubSubMenu
    Run Keyword If    '${menu}' == 'Perfil'              Click Visible Element    css:#menu-perfil>a>span
    Run Keyword If    '${menu}' == 'Crear OT'            Click Visible Element    id:otSub
    Run Keyword If    '${menu}' == 'Crear OT'            Click Visible Element    css:#otSub>li.pl-5.ng-star-inserted.active-item>a

Click boton Editar
    [Arguments]              ${valor} 
    input text               css:div.p-datatable-header.ng-star-inserted > div > span > input                                ${valor}
    Click Visible Element    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(5)>div:nth-child(1)>button

Set Permisos modulo
    [Arguments]                ${modulo}                                   @{permisos a seleccionar}
    ${selectorID}=             Run Keyword If                              '${modulo}' == 'OT'
    ...                        Set variable                                css:#modulos-pefil-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    ...                        ELSE
    ...                        Run Keyword If                              '${modulo}' == 'CUBICACION'
    ...                        Set variable                                css:#modulos-pefil-CUBICACION>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    ${permisos del modulo}=    Get WebElements                             ${selectorID}
    Set Suite Variable         ${permisos del modulo}
    FOR                        ${permiso escogido}                         IN                                                                              @{permisos a seleccionar}
    ${selector}=               Obtener el selector del permiso escogido    ${permiso escogido}                                                             @{permisos del modulo}       
    Click Visible Element      ${selector}
    sleep                      1
    END

Obtener el selector del permiso escogido
    [Arguments]           ${permisoescoger}                @{permisosmodulo}             
    FOR                   ${perm}                          IN                            @{permisosmodulo}
    ${txt}=               Get Text                         ${perm}
    ${areYouMyLine} =     Run Keyword and Return Status    Should Be Equal As Strings    ${txt}               ${permisoescoger}
    ${selector}           set variable                     ${perm}
    Set Suite Variable    ${selector}
    Run Keyword If        ${areYouMyLine}                  Exit For Loop                 
    END
    [return]              ${selector}

Set nombre perfil
    [Arguments]                      ${nombre}
    Wait Until Element Is Visible    css:#nombre-perfil-input>input
    input text                       css:#nombre-perfil-input>input    ${nombre}

Set descripcion perfil
    [Arguments]                      ${descripcion}
    Wait Until Element Is Visible    css:#descripcion-perfil-input>textarea
    input text                       css:#descripcion-perfil-input>textarea    ${descripcion}

Set Jefatura
    [Arguments]                      ${jerarquia}
    Wait Until Element Is Visible    css:#nombre-perfil-input > select
    Select item                      css:#nombre-perfil-input > select    ${jerarquia}

Acceder a creacion de nuevo perfil
    Click Visible Element    id:add-profile-button    

Acceder a creacion de nuevo usuario
    Click Visible Element    id:add-user-button

Guardar perfil
    Click Visible Element    id:guardar-button

Guardar usuario
    Click Visible Element            id:submit-user
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5

Set username
    [Arguments]    ${valor}
    input text     name:username    ${valor}

Set documento de identidad
    [Arguments]    ${documento}
    input text     name:documento-input    ${documento}

Set nombres y apellidos
    [Arguments]    ${nombres}              ${apellidos}
    input text     name:nombre-input       ${nombres}
    input text     name:apellidos-input    ${apellidos}

Set email
    [Arguments]    ${email}
    input text     name:email-input    ${email}

Set celular
    [Arguments]    ${valor}
    input text     name:celular-input    ${valor}

Set empresa
    [Arguments]    ${valor}
    Select item    css:#proveedor_id > select    ${valor}

Set area
    [Arguments]    ${valor}
    Select item    css:#area_id > select    ${valor}

Set todos los contratos
    # [Arguments]              ${contratos}
    Click Visible Element    css:#contratos_marco_multi > div > div.p-multiselect-label-container> div
    Click Visible Element    css:#contratos_marco_multi > div > div>div>div:nth-child(1)
    Click Visible Element    id: caja_formulario

Set tipo empresa
    [Arguments]       ${valor}
    Run Keyword If    '${valor}' == 'proveedor'    Click Visible Element    id:proveedor
    Run Keyword If    '${valor}' == 'movistar'     Click Visible Element    id:movistar

Set perfil usuario
    [Arguments]              ${valor}
    Click Visible Element    id:perfil_id
    Select item              id:perfil-0     ${valor}

Set superior directo
    [Arguments]              ${valor}
    Click Visible Element    id:perfil_id
    Select item              css:#perfil_id > select.form-control.mb-3.ng-untouched.ng-pristine.ng-valid    ${valor}

Set Permisos modulo CUBICACION
    Click Visible Element    css:#modulos-pefil-CUBICACION > p-listbox > div > div:nth-child(2) > div.p-checkbox.p-component.ng-star-inserted > div.p-checkbox-box

Set Nombre OT
    [Arguments]                      ${nombre}
    Wait Until Element Is Visible    id: nombre-ot    
    input text                       id: nombre-ot    ${nombre}

Set Tipo OT
    [Arguments]                      ${valor}
    Wait Until Element Is Visible    id:tipo-ot
    Click Visible Element            id:tipo-ot
    Select item                      id:tipo-ot    ${valor}

Set Cubicacion de la OT
    [Arguments]                      ${valor}
    Wait Until Element Is Visible    id:cubicacion-de-ot
    Click Visible Element            id:cubicacion-de-ot
    Select item                      id:cubicacion-de-ot    ${valor}

Set Plan Proyecto OT
    [Arguments]                      ${valor}
    Wait Until Element Is Visible    id:plan-proyecto
    Click Visible Element            id:plan-proyecto
    Select item                      id:plan-proyecto    ${valor}

Set Sitio OT
    [Arguments]                      ${valor}
    Wait Until Element Is Visible    id:sitio
    Click Visible Element            id:sitio
    Select item                      id:sitio    ${valor}

Click Opex OT
    Wait Until Element Is Visible    id:opex
    Scroll Element Into View         id:opex
    Click Visible Element            id:opex

Set ID OPEX OT
    [Arguments]                      ${valor}
    Wait Until Element Is Visible    id:id-opex
    Scroll Element Into View         id:id-opex
    Click Visible Element            id:id-opex
    Select item                      id:id-opex    ${valor}

Set Cuenta SAP OT
    [Arguments]                      ${valor}
    Wait Until Element Is Visible    id:cuenta-sap
    Scroll Element Into View         id:cuenta-sap
    Click Visible Element            id:cuenta-sap
    Select item                      id:cuenta-sap    ${valor}

Set CECO OT
    [Arguments]                      ${valor}
    Wait Until Element Is Visible    id:ceco
    Scroll Element Into View         id:ceco
    Click Visible Element            id:ceco
    Select item                      id:ceco     ${valor}

Set CECO Provisorio
    [Arguments]                      ${nombre-ceco}
    Wait Until Element Is Visible    id:ceco-provisorio
    Scroll Element Into View         id:ceco-provisorio
    input text                       id:ceco-provisorio    ${nombre-ceco}

Set Fecha Inicio
    [Arguments]                      ${nombre-ceco}
    Click Visible Element            css:p-calendar
    ${selector fecha}=               set variable          css: p-calendar > span > div > div > div > div.p-datepicker-calendar-container> table > tbody > tr:nth-child(4) > td:nth-child(3) > span
    Wait Until Element Is Visible    ${selector fecha}
    Scroll Element Into View         ${selector fecha} 
    Click Visible Element            ${selector fecha} 

Set Fecha Termino
    Wait Until Element Is Visible    id:fecha-termino-ot
    Scroll Element Into View         id:fecha-termino-ot
    Click Visible Element            id:fecha-termino-ot
    Wait Until Element Is Visible    css:#fecha-termino-ot > span > div > div > div > div.p-datepicker-calendar-container> table > tbody > tr:nth-child(4) > td:nth-child(4) > span
    Scroll Element Into View         css:#fecha-termino-ot > span > div > div > div > div.p-datepicker-calendar-container> table > tbody > tr:nth-child(4) > td:nth-child(4) > span
    Click Visible Element            css:#fecha-termino-ot > span > div > div > div > div.p-datepicker-calendar-container> table > tbody > tr:nth-child(4) > td:nth-child(4) > span

Set Proyecto OT
    [Arguments]                      ${valor}
    Wait Until Element Is Visible    id:proyecto-ot
    Scroll Element Into View         id:proyecto-ot
    Click Visible Element            id:proyecto-ot
    Select item                      id:proyecto-ot    ${valor}

Set Observaciones OT
    [Arguments]                      ${observaciones}
    Wait Until Element Is Visible    id:observaciones
    Scroll Element Into View         id:observaciones
    input text                       id:observaciones    ${observaciones}

Guardar OT
    Wait Until Element Is Visible    id:guardar-ot
    Scroll Element Into View         id:guardar-ot
    Click Visible Element            id:guardar-ot

Eliminar perfil
    [Arguments]                      ${nombre}
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)                            timeout=5
    input text                       css:div.p-datatable-header.ng-star-inserted > div > span > input                                ${nombre}
    sleep                            1
    Click Visible Element            css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(5)>div:nth-child(3)>button
    Click Visible Element            css:.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted

No debe existir en la tabla
    [Arguments]                      ${nombre}
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
    input text                       css:div.p-datatable-header.ng-star-inserted > div > span > input        ${nombre}
    sleep                            1
    ${cantidad de filas}=            get element count                                                       css:.p-datatable-wrapper>table>tbody>tr
    ${status}=                       Evaluate                                                                ${cantidad de filas} > 0
    Should Not Be True               ${status}

