*** Settings ***
Documentation    A resource file with reusable keywords and variables.
...
...        The system specific keywords created here form our own
...        domain specific language. They utilize keywords provided
...        by the imported SeleniumLibrary.
Library    SeleniumLibrary

*** Variables ***
# ${SERVER}    otec.zweicom.services
# ${SERVER}    localhost:4200
# ${HTTP}      https

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
    [Arguments]                      ${nombre cubicacion}                                                                                                                                                                                                                            ${contrato}             ${proveedor}    ${region}    ${tipo servicio}
    Wait Until Element Is Visible    css:ng-autocomplete > div > div.input-container > input                                                                                                                                                                                         
    input text                       css:ng-autocomplete > div > div.input-container > input                                                                                                                                                                                         ${nombre cubicacion}    
    Click Visible Element            id:box
    Select item                      name:select-contratoMarco                                                                                                                                                                                                                       ${contrato} 
    Select item                      name:select-proveedor                                                                                                                                                                                                                           ${proveedor}
    Select item                      name:select-region                                                                                                                                                                                                                              ${region} 
    Select item                      name:select-tipoServicio                                                                                                                                                                                                                        ${tipo servicio}
    Click Visible Element            css:#page-content-wrapper > div > app-cubicacion > div > app-form-cub-container > div > app-card > div > div.card-body > app-form > div > div.col-xs-12.col-md-8 > div > p-listbox > div > div.p-listbox-list-wrapper > ul > li:nth-child(1)

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

Validar si existe en la Lista
    [Arguments]                      ${columna a validar}                                                    ${nombre}
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=5
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
    close Browser

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
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)                                    timeout=5
    ${cantidad de filas}=            get element count                                                                                       css:.p-datatable-wrapper>table>tbody>tr
    ${status}=                       Evaluate                                                                                                ${cantidad de filas} > 0
    Should Be True                   ${status}
    FOR                              ${i}                                                                                                    IN RANGE                                                                       ${cantidad de filas}
    ${txt nombre fila}=              Get Text                                                                                                css:.p-datatable-wrapper>table>tbody>tr:nth-child(${i + 1})>td:nth-child(1)
    ${areYouMyLine} =                Run Keyword and Return Status                                                                           Should Be Equal As Strings                                                     ${txt nombre fila}      ${usuario}
    Set Suite Variable               ${areYouMyLine}
    ${numero de fila}                set variable                                                                                            ${i + 1}
    Set Suite Variable               ${numero de fila}
    Run Keyword If                   ${areYouMyLine}                                                                                         Exit For Loop
    END
    Should Be True                   ${areYouMyLine}
    Click Visible Element            css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>#action-buttons>app-menu>button
    Click Visible Element            css:app-menu > p-menu > div > ul > li:nth-child(1) > a


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

Click boton Editar
    [Arguments]              ${valor} 
    input text               css:div.p-datatable-header.ng-star-inserted > div > span > input                                ${valor}
    Click Visible Element    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(5)>div:nth-child(1)>button

Set Permisos modulo OT
    [Arguments]                   @{permisos}
    ${permisos del modulo OT}=    Get WebElements              css:#modulos-pefil-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    Set Suite Variable            ${permisos del modulo OT}
    FOR                           ${permiso a escoger}         IN                                                                      @{permisos}
    # Log To Console                ${permiso a escoger}
    ${selector permiso}=          Get selector permisos        ${permiso a escoger}                                                    @{permisos del modulo OT}    
    Click Visible Element         ${selector permiso}
    END

Get selector permisos
    [Arguments]           ${permisoescoger}                @{permisosmoduloOT}           
    FOR                   ${perm}                          IN                            @{permisosmoduloOT}
    ${txt}=               Get Text                         ${perm}
    ${areYouMyLine} =     Run Keyword and Return Status    Should Be Equal As Strings    ${txt}                 ${permisoescoger}
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
    Click Visible Element    id:add-perfil-button    

Acceder a creacion de nuevo usuario
    Click Visible Element    id:add-user-button

Guardar perfil
    Click Visible Element    id:guardar-button

Guardar usuario
    Click Visible Element    id:submit-user

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
    Select item              id:perfil-0            ${valor}

Set superior directo
    [Arguments]              ${valor}
    Click Visible Element    id:perfil_id
    Select item              css:#perfil_id > select.form-control.mb-3.ng-untouched.ng-pristine.ng-valid    ${valor}