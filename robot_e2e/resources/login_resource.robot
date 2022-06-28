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
    [Arguments]                      ${username}                             ${password}    ${perfil}
    Open Browser To Page             ${url}
    input text                       name:username                           ${username}
    input password                   name:password                           ${password}
    _Click visible element           id:login
    _Wait visibility and contain     css:.perfil_select>app-select>select    ${perfil}
    Select From List By Label        css:.perfil_select>app-select>select    ${perfil}
    _Click visible element           id:login
    Wait Until Element Is Visible    id:user-name                            timeout=20

_Logout

    _Click visible element    css:#navbarDropdown
    sleep                     1
    Execute javascript        document.querySelector('#logout').click()

