*** Settings ***
Documentation    A resource file with reusable keywords and variables for login.
...
...         The system specific keywords created here form our own
...         domain specific language. They utilize keywords provided
...         by the imported SeleniumLibrary.
Library     SeleniumLibrary
Resource    general_resource.robot

*** Variables ***

*** Keywords ***
_Login
    [Arguments]                      ${username}          ${password}
    Open Browser To Page             ${url}
    Location Should Be               ${url}/auth/login
    input text                       name:username        ${username}
    input password                   name:password        ${password}
    element should be enabled        id:login
    _Click visible element           id:login
    Wait Until Element Is Visible    id:user-name         timeout=15

_Logout
    sleep                    1
    Execute javascript       document.querySelector('#page-content-wrapper > nav > button.navbar-toggler').click()
    Click Visible Element    css:#navbarDropdown
    Click Visible Element    css:#navbarSupportedContent > ul > li > div > a

