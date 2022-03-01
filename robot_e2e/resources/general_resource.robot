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
    [Arguments]                ${page}
    ${options}=                Evaluate                      sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Run Keyword If             '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    disable-web-security
    Run Keyword If             '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    allow-running-insecure-content
    Run Keyword If             '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    headless
    Run Keyword If             '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    disable-gpu
    Run Keyword If             '${ambiente}' == 'testing'    Call Method                                          ${options}                 add_argument    no-sandbox
    Create WebDriver           Chrome                        chrome_options=${options}
    Maximize Browser Window
    Go To                      ${page}

_Navegate to
    [Arguments]       ${menu}
    Run Keyword If    '${menu}' == 'Usuario'             Click Element            css:#menu-usuario>a>span
    Run Keyword If    '${menu}' == 'Area'                Click Element            css:#menu-area>a>span
    Run Keyword If    '${menu}' == 'Crear Cubicacion'    Click Visible Element    css:#menu-cubicacion > a > span
    Run Keyword If    '${menu}' == 'Crear Cubicacion'    Click Visible Element    id:listarCubSubMenu
    Run Keyword If    '${menu}' == 'Perfil'              Click Visible Element    css:#menu-perfil>a>span
    Run Keyword If    '${menu}' == 'Crear OT'            Click Visible Element    id:otSub
    Run Keyword If    '${menu}' == 'Crear OT'            Execute javascript       document.querySelector("#otSub>li:nth-child(2)>a").click()

_Click visible element
    [Arguments]                      ${element}
    Wait Until Element Is Visible    ${element}    timeout=10
    Scroll Element Into View         ${element}
    Click Element                    ${element}

_Wait visibility
    [Arguments]                      ${selector}
    Wait Until Element Is Visible    ${selector}    timeout=15
    Wait Until Element Is enabled    ${selector}    timeout=15
    Scroll Element Into View         ${selector}

_Wait visibility and contain
    [Arguments]                    ${selector}    ${valor}
    _Wait visibility               ${selector}
    Wait Until Element Contains    ${selector}    ${valor}

_Element exist in table
    [Arguments]              ${nombre}                                           
    _Wait visibility         css:app-table>div>p-table>div>div>div>span>input
    input text               css:app-table>div>p-table>div>div>div>span>input    ${nombre} 
    sleep                    0.5
    ${cantidad de filas}=    get element count                                   css:.p-datatable-wrapper>table>tbody>tr
    ${status}=               Evaluate                                            ${cantidad de filas} > 0
    [return]                 ${status}

_Go to Editar element
    [Arguments]               ${nombre}                                           
    _Wait visibility          css:app-table>div>p-table>div>div>div>span>input
    input text                css:app-table>div>p-table>div>div>div>span>input    ${nombre} 
    sleep                     0.5
    # ${cantidad de filas}=    get element count                                   css:.p-datatable-wrapper>table>tbody>tr
    # ${status}=               Evaluate                                            ${cantidad de filas} > 0
    # [return]                 ${status}
    _Click visible element    css:#action-buttons > div > div > button

_Table should display data
    _Wait visibility         css:.p-datatable-wrapper>table>tbody>tr
    ${cantidad de filas}=    get element count                          css:.p-datatable-wrapper>table>tbody>tr
    ${status}=               Evaluate                                   ${cantidad de filas} > 0
    Should Be True           ${status}