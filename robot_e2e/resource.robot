*** Settings ***
Documentation    A resource file with reusable keywords and variables.
...
...        The system specific keywords created here form our own
...        domain specific language. They utilize keywords provided
...        by the imported SeleniumLibrary.
Library    SeleniumLibrary

*** Variables ***

*** Keywords ***
Element text should be
    [Arguments]        ${element}    ${texto}
    ${txt}=            Get Text      ${element}
    Should Be Equal    ${txt}        ${texto}


Validar existencia en la tabla
    [Arguments]                      ${columna a validar}                                                    ${nombre}
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=15
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
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=15
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

Eliminar usuario
    [Arguments]              ${usuario}
    ${numero de fila}=       Get index list                                                                                          1                                                                                ${usuario}
    Click Visible Element    css:.p-datatable-wrapper>table>tbody>tr:nth-child(${numero de fila})>#action-buttons>app-menu>button
    Click Visible Element    css:app-menu > p-menu > div > ul > li:nth-child(3) > a
    ${boton de confirmar}    set variable                                                                                            css:.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted
    Click Visible Element    ${boton de confirmar}

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

#    PERFIL
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
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)    timeout=15

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

Set input text
    [Arguments]    ${valor}       ${selector} 
    WAIT           ${selector}
    input text     ${selector}    ${valor}        

Set select item
    [Arguments]                    ${valor}       ${selector} 
    WAIT                           ${selector}
    Wait Until Element Contains    ${selector}    ${valor}        timeout=15
    Select item                    ${selector}    ${valor}


Guardar OT
    Wait Until Element Is Visible    id:guardar-ot
    Scroll Element Into View         id:guardar-ot
    Click Visible Element            id:guardar-ot


##    PERFIL
Eliminar perfil
    [Arguments]                      ${nombre}
    Wait Until Element Is Visible    css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(1)                            timeout=15
    input text                       css:div.p-datatable-header.ng-star-inserted > div > span > input                                ${nombre}
    sleep                            1
    Click Visible Element            css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(5)>div:nth-child(3)>button
    Click Visible Element            css:.p-confirm-popup-accept.p-button-sm.p-button.p-component.ng-star-inserted


# TABLA
    1

Usar filtro tabla
    [Arguments]    ${nombre}                                                                                                                                                                                      ${number}    
    WAIT           css:#page-content-wrapper > div > app-ot > div > app-list-ot > div > p-tabview > div > div>p-tabpanel:nth-child(${number})>div>app-table>div>p-table>div>.p-datatable-header>div>span>input
    input text     css:#page-content-wrapper > div > app-ot > div > app-list-ot > div > p-tabview > div > div>p-tabpanel:nth-child(${number})>div>app-table>div>p-table>div>.p-datatable-header>div>span>input    ${nombre}
    sleep          1

No debe existir en la tabla
    [Arguments]           ${nombre}             ${pestaña}    
    Click en pestaña      ${pestaña}            
    ${status}=            Existe en la tabla    ${nombre}     ${pestaña}
    Should Not Be True    ${status}



Acciones solo Info
    Click Visible Element     css:#action-buttons > app-menu > button > span.p-button-icon.pi.pi-ellipsis-v
    ${items}=                 Get WebElements                                                                  css:#action-buttons > app-menu > p-menu>div>ul>li
    FOR                       ${item}                                                                          IN                                                     @{items}
    ${txt} =                  Get Text                                                                         ${item}
    # Log To Console            ${txt}
    END
    ${cantidad de filas}=     get element count                                                                css:#action-buttons > app-menu > p-menu > div>ul>li
    ${status}=                Evaluate                                                                         ${cantidad de filas} == 1
    Should Be True            ${status}
    Element text should be    ${items}[0]                                                                      Información                                            


Logout
    Execute javascript       document.querySelector('#page-content-wrapper > nav > button.navbar-toggler').click()
    Click Visible Element    css:#navbarDropdown
    Click Visible Element    css:#navbarSupportedContent > ul > li > div > a

Accionar
    [Arguments]       ${accion}
    Run Keyword If    '${accion}' == 'Aceptar OT'    Click Visible Element    css:#action-buttons > app-menu > p-menu > div > ul>li:nth-child(3)>a

Confirmar
    Click Visible Element    css:div.p-confirm-popup-footer>button:nth-child(2)

Seleccionar coordinador
    [Arguments]        ${valor}
    ${selector}=       set variable    css:app-assign-coordinator-form > form > app-select > select
    Set select item    ${valor}        ${selector}

Seleccionar trabajador
    [Arguments]        ${valor}
    ${selector}=       set variable    css:app-assign-trabajador-form > form > app-select > select
    Set select item    ${valor}        ${selector}


SSLEEP
    sleep    10



Input Motivo
    [Arguments]       ${nombre}
    ${selector}=      set variable    css:#observaciones
    Set input text    ${nombre}       ${selector}           


Acciones PEND ANULACION
    Click Visible Element     css:#action-buttons > app-menu > button > span.p-button-icon.pi.pi-ellipsis-v
    ${items}=                 Get WebElements                                                                  css:#action-buttons > app-menu > p-menu > div > ul>li
    FOR                       ${item}                                                                          IN                                                       @{items}
    ${txt} =                  Get Text                                                                         ${item}
    Log To Console            ${txt}
    END
    ${cantidad de filas}=     Get length                                                                       ${items}
    ${status}=                Evaluate                                                                         ${cantidad de filas} == 3
    Should Be True            ${status}
    Element text should be    ${items}[0]                                                                      Información                                              
    Element text should be    ${items}[1]                                                                      Agregar al libro de obras                                
    Element text should be    ${items}[2]                                                                      Anular 
