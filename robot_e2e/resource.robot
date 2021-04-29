*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
# ${SERVER}         otec.zweicom.services
# ${SERVER}         localhost:4200
# ${HTTP}    https
# ${HTTP}    http
# ${BROWSER}        Chrome
# ${DELAY}          0
# ${VALID USER}     demo
# ${VALID PASSWORD}    mode
# ${LOGIN URL}      ${HTTP}://${SERVER}/login
# ${WELCOME URL}    ${HTTP}://${SERVER}/dashboard
# ${CUBICACION_URL}    ${HTTP}://${SERVER}/dashboard/cubicacion
# ${CREARCUBICACION_URL}    ${HTTP}://${SERVER}/dashboard/cubicacion/crear-cubicacion
# ${ERROR URL}      ${HTTP}://${SERVER}/error.html

*** Keywords ***
Open Browser To Page
    [Arguments]    ${page}
    ${options}=  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys, selenium.webdriver
    Run Keyword If    '${ambiente}' == 'testing'    Call Method    ${options}    add_argument      disable-web-security
    Run Keyword If    '${ambiente}' == 'testing'    Call Method    ${options}    add_argument      allow-running-insecure-content
    Run Keyword If    '${ambiente}' == 'testing'    Call Method         ${options}   add_argument    headless
    Run Keyword If    '${ambiente}' == 'testing'    Call Method         ${options}   add_argument    disable-gpu
    Run Keyword If    '${ambiente}' == 'testing'    Call Method         ${options}   add_argument    no-sandbox
    # Set Window Size     1500    1500
    Create WebDriver  Chrome    chrome_options=${options}
    Go To    ${page}  
Login
    [Arguments]   ${username}    ${password}
    input text    name:username    ${username}
    input password    name:password    ${password}
    element should be enabled    id:login
    Click Button    id:login

Element text should be
   [Arguments]    ${element}    ${texto}
   ${txt}=    Get Text    ${element}
   Should Be Equal    ${txt}    ${texto}
