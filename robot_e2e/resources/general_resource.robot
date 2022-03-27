*** Settings ***
Documentation    A resource file with reusable keywords and variables for general.
...
...        The system specific keywords created here form our own
...        domain specific language. They utilize keywords provided
...        by the imported SeleniumLibrary.
Library    SeleniumLibrary

*** Variables ***

*** Keywords ***
_Open Browser To Page
    [Arguments]         ${page}
    ${options}=         Evaluate                      sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Run Keyword If      '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    disable-web-security
    Run Keyword If      '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    allow-running-insecure-content
    Run Keyword If      '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    headless
    Run Keyword If      '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    disable-gpu
    Run Keyword If      '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    no-sandbox
    Create WebDriver    Chrome                        chrome_options=${options} 
    Set Window Size     1920                          1080
    # Maximize Browser Window
    Go To               ${page}

_Navegate to
    [Arguments]       ${menu}
    Run Keyword If    '${menu}' == 'Usuario'             Click Element            css:#menu-usuario>a>span
    Run Keyword If    '${menu}' == 'Area'                Click Element            css:#menu-area>a>span
    Run Keyword If    '${menu}' == 'Contratos'           Click Element            css:#menu-contratos>a>span
    Run Keyword If    '${menu}' == 'Crear Cubicacion'    Click Visible Element    css:#menu-cubicacion > a > span
    Run Keyword If    '${menu}' == 'Crear Cubicacion'    Click Visible Element    id:listarCubSubMenu
    Run Keyword If    '${menu}' == 'Perfil'              Click Visible Element    css:#menu-perfil>a>span
    Run Keyword If    '${menu}' == 'Crear OT'            Click Visible Element    id:otSub
    Run Keyword If    '${menu}' == 'Crear OT'            Execute javascript       document.querySelector("#otSub>li:nth-child(2)>a").click()


_Wait visibility
    [Arguments]                      ${selector}
    Wait Until Element Is Visible    ${selector}    timeout=15
    Wait Until Element Is enabled    ${selector}    timeout=15
    Scroll Element Into View         ${selector}

_Wait visibility and contain
    [Arguments]                    ${selector}    ${valor}
    _Wait visibility               ${selector}
    Wait Until Element Contains    ${selector}    ${valor}    timeout=15

_Click visible element
    [Arguments]         ${selector}
    _Wait visibility    ${selector}
    Click Element       ${selector}
    sleep               1

_Element should exist in table
    [Arguments]              ${nombre}            
    _Search table            ${nombre}
    ${cantidad de filas}=    get element count    css:.p-datatable-wrapper>table>tbody>tr
    ${status}=               Evaluate             ${cantidad de filas} > 0
    [return]                 ${status}

_Element should not exist in table
    [Arguments]              ${nombre}            
    _Search table            ${nombre}
    ${cantidad de filas}=    get element count    css:.p-datatable-wrapper>table>tbody>tr
    ${status}=               Evaluate             ${cantidad de filas} == 0
    [return]                 ${status}

_Go to Editar element
    [Arguments]               ${nombre}                                   
    sleep                     1
    _Search table             ${nombre}
    _Click visible element    css:#action-buttons > div > div > button

_Table should display data
    _Wait visibility         css:.p-datatable-wrapper>table>tbody>tr
    ${cantidad de filas}=    get element count                          css:.p-datatable-wrapper>table>tbody>tr
    ${status}=               Evaluate                                   ${cantidad de filas} > 0
    Should Be True           ${status}

_Set input text
    [Arguments]         ${selector}     ${value}
    _Wait visibility    ${selector} 
    input text          ${selector}     ${value}


_Select visible item
    [Arguments]                     ${selector}    ${value}    
    _Wait visibility and contain    ${selector}    ${value}    
    Select From List by label       ${selector}    ${value}

_Validate column data
    [Arguments]                   ${columna}     ${value}
    ${txt fila}=                  Get Text       css:.p-datatable-wrapper>table>tbody>tr:nth-child(1)>td:nth-child(${columna})
    Should Be Equal As Strings    ${txt fila}    ${value}

_Search table
    [Arguments]         ${value}                                            
    _Wait visibility    css:app-table>div>p-table>div>div>div>span>input
    input text          css:app-table>div>p-table>div>div>div>span>input    ${value} 
    sleep               0.5

_SubMenu
    [Arguments]               ${accion}                                  ${nombre}
    _Search table             ${nombre}
    Execute javaScript        window.scrollBy(900, 900);
    _Click visible element    css:#action-buttons > app-menu > button
    ${items}=                 Get WebElements                            css:#action-buttons > app-menu > p-menu > div > ul>li
    FOR                       ${item}                                    IN                                                       @{items}
    ${txt} =                  Get Text                                   ${item}
    # Log To Console            ${txt}
    ${areYouMyLine} =         Run Keyword and Return Status              Should Be Equal As Strings                               ${txt}      ${accion}
    ${selector}               set variable                               ${item}
    Set Suite Variable        ${selector}
    Run Keyword If            ${areYouMyLine}                            Exit For Loop                                            
    END

    _Click visible element    ${selector}

_Element text should be
    [Arguments]        ${element}    ${texto}
    ${txt}=            Get Text      ${element}
    Should Be Equal    ${txt}        ${texto}


#    ${height}    Execute Javascript    return window.screen.height

#    ${width}    Execute Javascript    return window.screen.width

#    Log To Console    ${height}
#    Log To Console    ${width}