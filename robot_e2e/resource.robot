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
    [Arguments]                  ${username}      ${password}
    input text                   name:username    ${username}
    input password               name:password    ${password}
    element should be enabled    id:login
    Click Button                 id:login

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
    [Arguments]    ${selector}     ${value}
    ${select element}    Get WebElement    ${selector}
    Scroll Element Into View               ${select element}
    Click Visible Element                  ${select element}
    Select From List By Label              ${select element}    ${value}

Select item value
    [Arguments]    ${selector}     ${value}
    ${select element}    Get WebElement    ${selector}
    Click Visible Element                  ${select element}
    Select From List By Value              ${select element}    ${value}

Usuario
    [Arguments]                  ${username}     ${documento}     ${nombres}     ${apellidos}     ${email}
    input text                        name:username                                 ${username}
    input text                        name:documento-input                          ${documento}
    input text                        name:nombre-input                             ${nombres}
    input text                        name:apellidos-input                          ${apellidos}
    input text                        name:email-input                              ${email}
    Select item                       css:#proveedor_id > select                    Telefonica Chile Servicios Corporativos Ltda.
    Select item                       css:#area_id > select                         CONECTIVIDAD Y BACKHAUL
    Click Visible Element             id:contratos_marco_multi
    Wait Until Element Is Visible     id:contratos_marco_multi
    Click Visible Element             css:.p-multiselect-items-wrapper>ul>cdk-virtual-scroll-viewport>div>p-multiselectitem:nth-child(1)>li>div>div
    Click Visible Element             id: caja_formulario
    sleep  2
    Scroll Element Into View          css:#perfil_id > select
    Select item                       css:#perfil_id > select                       Admin
    element should be enabled         id:submit-user
    Click Visible Element             id:submit-user

Crear Cubicacion
   [Arguments]    ${nombre cubicacion}    ${contrato}    ${proveedor}    ${region}    ${tipo servicio}
   input text                          name:input-nombreCubicacion                  ${nombre cubicacion}                     
   Select item                         name:select-contratoMarco                    ${contrato} 
   Select item                         name:select-proveedor                        ${proveedor}
   Select item                         name:select-region                           ${region} 
   Select item                         name:select-tipoServicio                     ${tipo servicio}
   Click Visible Element               css:#page-content-wrapper > div > app-cubicacion > div > app-form-cub-container > div > app-card > div > div.card-body > app-form > div > div.col-xs-12.col-md-8 > div > p-listbox > div > div.p-listbox-list-wrapper > ul > li:nth-child(1)

UsuarioEdit
    [Arguments]                   ${documento}     ${nombres}     ${apellidos}     ${email}
    input text                        name:documento-input                          ${documento}
    input text                        name:nombre-input                             ${nombres}
    input text                        name:apellidos-input                          ${apellidos}
    input text                        name:email-input                              ${email}
    Select item                       css:#proveedor_id > select                    Telefonica Chile Servicios Corporativos Ltda.
    Select item                       css:#area_id > select                         CONECTIVIDAD Y BACKHAUL
    Click Visible Element             id:contratos_marco_multi
    Wait Until Element Is Visible     id:contratos_marco_multi
    Click Visible Element             css:.p-multiselect-items-wrapper>ul>cdk-virtual-scroll-viewport>div>p-multiselectitem:nth-child(1)>li>div>div
    Click Visible Element             id: caja_formulario
    element should be enabled         id:submit-user
    Click Visible Element             id:submit-user


