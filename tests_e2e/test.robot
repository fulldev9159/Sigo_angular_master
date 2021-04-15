*** Settings ***
Documentation     A test suite with a single test for test.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Valid Page
    Open Browser To Page    http://35.192.99.178:4400/
    ${"user_name"}    set variable    class:user-name

    element should be visible    ${"user_name"}
    ${txt-user-name}=    Get Text    ${"user_name"}
    Should Be Equal    ${txt-user-name}    Pedro Gallegos


