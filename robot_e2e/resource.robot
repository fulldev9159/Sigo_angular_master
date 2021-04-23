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
    # Call Method    ${options}    add_argument      disable-web-security
    # Call Method    ${options}    add_argument      allow-running-insecure-content
    # Call Method         ${options}   add_argument    headless
    # Call Method         ${options}   add_argument    disable-gpu
    # Call Method         ${options}   add_argument    no-sandbox
    # Set Window Size     1500    1500
    Create WebDriver  Chrome    chrome_options=${options}
    Go To    ${page}  


