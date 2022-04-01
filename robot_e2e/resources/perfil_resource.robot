*** Settings ***
Documentation    A resource file with reusable keywords and variables for perfil.
...
...        The system specific keywords created here form our own
...        domain specific language. They utilize keywords provided
...        by the imported SeleniumLibrary.
Library    SeleniumLibrary

*** Variables ***
${TIMEOUT}    30 
*** Keywords ***


_Set Permisos modulo
    [Arguments]                ${modulo}                                    @{permisos a seleccionar}
    ${selectorID}=             Run Keyword If                               '${modulo}' == 'OT'
    ...                        Set variable                                 css:#modulos-pefil-OT>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    ...                        ELSE
    ...                        Run Keyword If                               '${modulo}' == 'CUBICACION'
    ...                        Set variable                                 css:#modulos-pefil-CUBICACION>p-listbox>div>div.p-listbox-list-wrapper>ul>li
    ${permisos del modulo}=    Get WebElements                              ${selectorID}
    Set Suite Variable         ${permisos del modulo}
    FOR                        ${permiso escogido}                          IN                                                                              @{permisos a seleccionar}
    ${selector}=               _Obtener el selector del permiso escogido    ${permiso escogido}                                                             @{permisos del modulo}       
    Click Visible Element      ${selector}
    sleep                      1
    END

_Obtener el selector del permiso escogido
    [Arguments]           ${permisoescoger}                @{permisosmodulo}             
    FOR                   ${perm}                          IN                            @{permisosmodulo}
    ${txt}=               Get Text                         ${perm}
    ${areYouMyLine} =     Run Keyword and Return Status    Should Be Equal As Strings    ${txt}               ${permisoescoger}
    ${selector}           set variable                     ${perm}
    Set Suite Variable    ${selector}
    Run Keyword If        ${areYouMyLine}                  Exit For Loop                 
    END
    [return]              ${selector}