*** Settings ***
Documentation    A resource file with reusable keywords and variables for cubicación.
...
...         The system specific keywords created here form our own
...         domain specific language. They utilize keywords provided
...         by the imported SeleniumLibrary.
Library     SeleniumLibrary
Resource    general_resource.robot

*** Variables ***

*** Keywords ***
_Get avaliable cubicacion name
    Go To                 ${url}/app/cubicacion/list-cub
    FOR                   ${i}                              IN RANGE                            195    299
    ${cub existe}=        _Element exist in table           CUBICACION ${i} HAPPY PATH ROBOT
    ${numero}             set variable                      ${i - 1}
    Set Suite Variable    ${numero}
    Exit For Loop If      '${cub existe}' == 'False' 
    END

    [return]    ${numero}
