*** Settings ***
Documentation    A resource file with reusable keywords and variables for OT.
...
...         The system specific keywords created here form our own
...         domain specific language. They utilize keywords provided
...         by the imported SeleniumLibrary.
Library     SeleniumLibrary
Resource    general_resource.robot

*** Variables ***

*** Keywords ***

_Set Fecha Inicio
    [Arguments]                      ${nombre-ceco}
    _Click Visible Element           css:p-calendar
    ${selector fecha}=               set variable         css: p-calendar > span > div > div > div > div.p-datepicker-calendar-container> table > tbody > tr:nth-child(4) > td:nth-child(3) > span
    Wait Until Element Is Visible    ${selector fecha}
    Scroll Element Into View         ${selector fecha}
    _Click Visible Element           ${selector fecha}

_Set Fecha Termino
    Wait Until Element Is Visible    id:fecha-termino-ot
    Scroll Element Into View         id:fecha-termino-ot
    _Click Visible Element           id:fecha-termino-ot
    Wait Until Element Is Visible    css:#fecha-termino-ot > span > div > div > div > div.p-datepicker-calendar-container> table > tbody > tr:nth-child(4) > td:nth-child(4) > span
    Scroll Element Into View         css:#fecha-termino-ot > span > div > div > div > div.p-datepicker-calendar-container> table > tbody > tr:nth-child(4) > td:nth-child(4) > span
    _Click Visible Element           css:#fecha-termino-ot > span > div > div > div > div.p-datepicker-calendar-container> table > tbody > tr:nth-child(4) > td:nth-child(4) > span

_Have to exist in table/tab
    [Arguments]    ${pestaña}    ${nombre}    

    _Click tab        ${pestaña}
    ${status}=        _Exist in table OT    ${nombre}    ${pestaña}
    Should Be True    ${status}

_Have No to exist in table/tab
    [Arguments]    ${pestaña}    ${nombre}    

    _Click tab            ${pestaña}
    ${status}=            _Exist in table OT    ${nombre}    ${pestaña}
    Should Not Be True    ${status}

_OTFormBase
    [Arguments]             ${nombre}                                           ${contrato}      ${cubicacion}    
    _Set input text         css:#control_nombre > app-input > input             ${nombre}
    _Select visible item    css:#contratosUser > app-select > select            ${contrato}      
    _Select visible item    css:#control_cubicacion_id > app-select > select    ${cubicacion}    

_OTFormBucle
    [Arguments]               ${oficina}
    ...                       ${solicitado_por}
    ...                       ${direccion}
    ...                       ${altura}
    ...                       ${piso}
    ...                       ${departamento}
    ...                       ${comuna}
    ...                       ${tipo_red}
    ...                       ${tipo_trabajo}
    # ...            ${tiene_boleta}
    # ...            ${tiene_permiso}
    ...                       ${area_negocio}
    ...                       ${proyectista}
    _Select visible item      css:#control-oficina-central > app-select > select    ${oficina}
    _Select visible item      css:#control-solicitado-por > app-select > select     ${solicitado_por}
    _Set input text           css:#control-direccion > app-input > input            ${direccion}
    _Set input text           css:#control-altura > app-input > input               ${altura}
    _Set input text           css:#control-piso > app-input > input                 ${piso}
    _Set input text           css:#control-departamento > app-input > input         ${departamento}
    _Select visible item      css:#control-comuna > app-select > select             ${comuna}
    _Select visible item      css:#control-tipo-red > app-select > select           ${tipo_red}          
    _Select visible item      css:#control-tipo-trabajo > app-select > select       ${tipo_trabajo}
    _Click visible element    css:#control-tiene-boleta                             
    _Click visible element    css:#control-tiene-permiso
    _Select visible item      css:#control-area-negocio > app-select > select       ${area_negocio} 
    _Set input text           css:#control-proyectista > app-input > input          ${proyectista}

_OTFormMovil
    [Arguments]             ${plan_proyecto}               ${sitio}
    _Select visible item    css:#plan-proyecto > select    ${plan_proyecto}
    _Select visible item    css:#sitio > select            ${sitio}

_OTFormFijo
    [Arguments]               ${tipo}                                                      ${numero}
    _Select visible item      css:#control_tipo_numero_interno_id > app-select > select    ${tipo}
    _Set input text           css:#control_numero_interno > app-input > input              ${numero}
    _Click visible element    css:#button-agregar > button

_OTFormSustento
    [Arguments]             ${primero}                                          ${segundo}     ${tercero}
    _Select visible item    css:#control_pmo_codigo > app-select > select       ${primero} 
    _Select visible item    css:#control_lp_codigo > app-select > select        ${segundo}
    _Select visible item    css:#control_pep2_capex_id > app-select > select    ${tercero}

_OTFormExtra
    [Arguments]               ${admin_ec}                                                                                                        ${observaciones}    
    _Click visible element    css:#fecha-inicio-ot > span > input
    _Click visible element    css:#fecha-inicio-ot > span > div > div > div > div > table > tbody > tr:nth-child(3) > td> span
    _Click visible element    css:#fecha-termino-ot > span > input
    _Click visible element    css:#fecha-termino-ot > span > div > div > div > div > table > tbody > tr:nth-child(3) > td:nth-child(7) > span
    _Select visible item      css:#control_admin_contrato > app-select > select                                                                  ${admin_ec} 
    _Set input text           css:#observaciones                                                                                                 ${observaciones}    

_OTCheckList
    [Arguments]              ${nombre}    ${etapa}        ${contrato}    ${proveedor}    ${autor}    
    _Validate column data    3            ${nombre}
    _Validate column data    4            ${etapa}
    _Validate column data    8            ${contrato} 
    _Validate column data    9            ${proveedor}
    _Validate column data    10           ${autor}

_OTCheckInfoBase
    [Arguments]    ${tipo_contrato}    ${contrato}    ${cubicacion}    ${etapa}    ${estado}    ${propietario}    ${responsable}    ${observaciones} 

    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    ${tipo_contrato}
    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    ${contrato}
    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(4) > td:nth-child(2)    ${cubicacion} 
    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(8) > td:nth-child(2)    ${etapa}
    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(9) > td:nth-child(2)    ${estado}

    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    ${propietario}
    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    ${responsable} 
    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(3) > td:nth-child(2)    ${observaciones}

_OTCheckInfoBucle
    [Arguments]    ${oficina}
    ...            ${solicitado_por}
    ...            ${direccion}
    ...            ${altura}
    ...            ${piso}
    ...            ${departamento}
    ...            ${comuna}
    ...            ${tipo_red}
    ...            ${tipo_trabajo}
    ...            ${tiene_boleta}
    ...            ${tiene_permiso}
    ...            ${area_negocio}
    ...            ${proyectista}

    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)     ${oficina}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)     ${solicitado_por}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(3) > td:nth-child(2)     ${direccion}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(3) > td:nth-child(4)     ${altura}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(4) > td:nth-child(2)     ${piso}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(4) > td:nth-child(4)     ${departamento}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(5) > td:nth-child(2)     ${comuna}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(6) > td:nth-child(2)     ${tipo_red}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(7) > td:nth-child(2)     ${tipo_trabajo}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(8) > td:nth-child(2)     ${tiene_boleta}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(9) > td:nth-child(2)     ${tiene_permiso}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(10) > td:nth-child(2)    ${area_negocio}
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(11) > td:nth-child(2)    ${proyectista}


_OTCheckInfoSustento
    [Arguments]                ${tipo}                                                                                                                               ${primero}    ${segundo}    ${tercero}
    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    ${tipo}
    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    ${primero}
    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(3) > td:nth-child(2)    ${segundo}
    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(4) > td:nth-child(2)    ${tercero}


_OTActionUser
    [Arguments]     ${usuario}    ${perfil}    ${accion}    ${OT}
    _Login          ${usuario}    asda         ${perfil}
    _Navegate to    Listar OT

    Run Keyword If    '${accion}' == 'VER'             _CheckPestaniaAbiertos      ${OT}
    Run Keyword If    '${accion}' == 'NO PUEDE VER'    _CheckPestaniaNoPuedeVer    ${OT}
    Run Keyword If    '${accion}' == 'EJECUTAR'        _CheckPestaniaEjecucion     ${OT}

    close browser

_Click tab
    [Arguments]                      ${tab}
    ${number}=                       Run Keyword If                                                                        '${tab}' == 'Ejecucion'
    ...                              Set variable                                                                          1
    ...                              ELSE
    ...                              Run Keyword If                                                                        '${tab}' == 'Abiertas'
    ...                              Set variable                                                                          2
    ...                              ELSE
    ...                              Run Keyword If                                                                        '${tab}' == 'Cerradas'
    ...                              Set variable                                                                          3
    Wait Until Element Is Visible    css:p-tabview > div > ul > li:nth-child(${number})>a                                  timeout=15
    Execute javascript               document.querySelector('p-tabview > div > ul > li:nth-child(${number})>a').click()

_Exist in table OT
    [Arguments]              ${nombre}                                                                                               ${pestaña}                                                                                               
    ${number}=               Run Keyword If                                                                                          '${pestaña}' == 'Ejecucion'
    ...                      Set variable                                                                                            1
    ...                      ELSE
    ...                      Run Keyword If                                                                                          '${pestaña}' == 'Abiertas'
    ...                      Set variable                                                                                            2
    ...                      ELSE
    ...                      Run Keyword If                                                                                          '${pestaña}' == 'Cerradas'
    ...                      Set variable                                                                                            3
    input text               css:p-tabpanel:nth-child(${number})>div>app-table>div>p-table>div>.p-datatable-header>div>span>input    ${nombre}
    sleep                    0.5
    ${cantidad de filas}=    get element count                                                                                       css:p-tabpanel:nth-child(${number})>div>app-table>div>p-table>div>.p-datatable-wrapper>table>tbody>tr    
    ${status}=               Evaluate                                                                                                ${cantidad de filas} > 0
    # Log To Console           ${cantidad de filas}
    [return]                 ${status}

_Press action
    [Arguments]               ${action}
    _Click visible element    css:#action-buttons > app-menu > button
    ${items}=                 Get WebElements                            css:#action-buttons > app-menu > p-menu > div > ul>li

    ${index}=           Set Variable               1
    FOR                 ${item}                    IN                    @{items}
    ${txt} =            Get Text                   ${item}
    Log To Console      ${txt}
    Log To Console      ${index}
    Run Keyword If      '${txt}' == '${action}'    Set Suite Variable    ${index}
    Exit For Loop If    '${txt}' == '${action}'
    ${index}=           Evaluate                   ${index} + 1
    END

    Log To Console            ${index}
    _Click visible element    css:#action-buttons > app-menu > p-menu > div > ul>li:nth-child(${index})>a
    # Execute javascript    document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(${index})>a").click()


    # Acciones PEND AUTH ADMIN Contrato
    # Click Visible Element     css:#action-buttons > app-menu > button > span.p-button-icon.pi.pi-ellipsis-v
    # ${items}=                 Get WebElements                                                                  css:#action-buttons > app-menu > p-menu > div > ul>li
    # FOR                       ${item}                                                                          IN                                                       @{items}
    # ${txt} =                  Get Text                                                                         ${item}
    # # Log To Console            ${txt}
    # END
    # ${cantidad de filas}=     Get length                                                                       ${items}
    # ${status}=                Evaluate                                                                         ${cantidad de filas} == 4
    # Should Be True            ${status}
    # Element text should be    ${items}[0]                                                                      Información
    # Element text should be    ${items}[1]                                                                      Agregar al libro de obras
    # Element text should be    ${items}[2]                                                                      Aceptar
    # Element text should be    ${items}[3]                                                                      Rechazar

_CheckPestaniaAbiertos
    [Arguments]                       ${OT}        
    _Have No to exist in table/tab    Cerradas     ${OT} 
    _Have No to exist in table/tab    Ejecucion    ${OT} 
    _Have to exist in table/tab       Abiertas     ${OT} 

_CheckPestaniaNoPuedeVer
    [Arguments]                       ${OT}        
    _Have No to exist in table/tab    Abiertas     ${OT} 
    _Have No to exist in table/tab    Cerradas     ${OT} 
    _Have No to exist in table/tab    Ejecucion    ${OT}


_CheckPestaniaEjecucion
    [Arguments]                       ${OT}        
    _Have No to exist in table/tab    Cerradas     ${OT} 
    _Have No to exist in table/tab    Abiertas     ${OT} 
    _Have to exist in table/tab       Ejecucion    ${OT} 
