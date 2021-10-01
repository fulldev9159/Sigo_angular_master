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
    Log To Console           ${cantidad de filas}                                                                                    
    [return]                 ${status}

_Press action
    [Arguments]               ${action}
    sleep                     0.5
    ${menu actions}=          set variable       css:#action-buttons > app-menu > button > span.p-button-icon.pi.pi-ellipsis-v
    _Click visible element    ${menu actions}
    ${items}=                 Get WebElements    css:#action-buttons > app-menu > p-menu > div > ul>li

    ${index}=           Set Variable               1
    FOR                 ${item}                    IN                    @{items}
    ${txt} =            Get Text                   ${item}
    Log To Console      ${txt}
    Log To Console      ${index}
    Run Keyword If      '${txt}' == '${action}'    Set Suite Variable    ${index}
    Exit For Loop If    '${txt}' == '${action}'
    ${index}=           Evaluate                   ${index} + 1
    END

    Log To Console        ${index}
    Execute javascript    document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(${index})>a").click()


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
