*** Settings ***
Documentation     A test suite with a single test for test.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Redirect to page Login not login person
    # Open Browser To Page    http://mcl_test_sigo_web/
    Open Browser To Page    ${url}
    Location Should Be    ${url}/auth/login
    close Browser

Redirect to dashboard to a login person
    Open Browser To Page    ${url}
    Location Should Be    ${url}/auth/login

   # Validar elementos
    element should be visible    name:username
    element should be enabled    name:username

    element should be visible    name:password
    element should be enabled    name:password

    element should be visible    id:login
    element should be disabled    id:login

   # Ingresar datos de login
    input text    name:username    jcastill
    input password    name:password    cualquierpassword
    element should be enabled    id:login
    Click Button    id:login
    
    Wait Until Element Is Visible    id:user-name    timeout=3
    Location Should Be    ${url}/app/ot/list-ot
    element should be visible    id:user-name

    ${txtLogin}=    Get Text    id:user-name
    Should Be Equal    ${txtLogin}    Jessica Castillo

    # close Browser
















    # ${"user_name"}    set variable    class:user-name

    # element should be visible    ${"user_name"}
    # ${txt-user-name}=    Get Text    ${"user_name"}
    # Should Be Equal    ${txt-user-name}    Pedro Gallegos


