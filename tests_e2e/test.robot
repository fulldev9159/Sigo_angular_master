*** Settings ***
Documentation     A test suite with a single test for test.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Valid Page
    Open Browser To Page    https://stackoverflow.com/
    ${"search_button"}    set variable    class:s-btn__filled

    element should be visible    ${"search_button"}


