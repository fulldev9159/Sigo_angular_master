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

# _Get avaliable cubicacion name
#    Go To                 ${url}/app/cubicacion/list-cub
#    FOR                   ${i}                              IN RANGE                            201    299
#    ${cub existe}=        _Element exist in table           CUBICACION ${i} HAPPY PATH ROBOT
#    ${numero}             set variable                      ${i - 1}
#    Set Suite Variable    ${numero}
#    Exit For Loop If      '${cub existe}' == 'False' 
#    END

#    [return]    ${numero}

_Crear Cubicacion
    _Set input text         css:#nomnbreCub > app-input > input         Cub Bucle
    _Select visible item    css:#tipoCub > app-select > select          Full
    _Select visible item    css:#contratosUser > app-select > select    BUCLE
    _Select visible item    css:#agencias > app-select > select         SAN BERNARDO 
    _Select visible item    css:#proveedores > app-select > select      94949494 - NOKIA SOLUTIONS AND NETWORKS CHILE LTDA

    _Set input text    css:#direcciondesde > app-input > input       las casas norte
    _Set input text    css:#alturadesde > app-input > input          1714
    _Set input text    css:#direccionhasta > app-input > input       las casas sur
    _Set input text    css:#alturahasta > app-input > input          1817
    _Set input text    css:#descripcion > app-textarea > textarea    Cub descripción

    _Select visible item      css:#actividad > app-select > select                  DISEÑO
    _Select visible item      css:#tiposervicio > app-select > select               CANALIZACION
    _Select visible item      css:#servicios > app-select > select                  D013 - DISEÑO P2P EN RED DE F.O. PARA SERVICIOS PRIVADOS (EMPRESAS, NEGOCIOS Y MAYORISTAS) 
    _Select visible item      css:#unidad-obra > app-select > select                0 - SIN UO
    _Click visible element    css:div.filtroservicios> div:nth-child(5) > button
    sleep                     1
    _Click visible element    css:#create-button