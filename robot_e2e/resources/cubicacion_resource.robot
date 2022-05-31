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

_CubFormBase
    [Arguments]             ${nombre}                                   ${tipo}         ${contrato}    ${agencia}    ${proveedor}    ${descripcion}    
    _Set input text         css:#nomnbreCub > app-input > input         ${nombre}
    _Select visible item    css:#tipoCub > app-select > select          ${tipo}
    _Select visible item    css:#contratosUser > app-select > select    ${contrato}
    _Select visible item    css:#agencias > app-select > select         ${agencia}
    _Select visible item    css:#proveedores > app-select > select      ${proveedor}

    _Set input text    css:#direcciondesde > app-input > input       las casas norte
    _Set input text    css:#alturadesde > app-input > input          1714
    _Set input text    css:#direccionhasta > app-input > input       las casas sur
    _Set input text    css:#alturahasta > app-input > input          1817
    _Set input text    css:#descripcion > app-textarea > textarea    ${descripcion}

_CubFiltros
    [Arguments]             ${actividad}                               ${tipo_servicio} 
    _Select visible item    css:#actividad > app-select > select       ${actividad.upper()}
    _Select visible item    css:#tiposervicio > app-select > select    ${tipo_servicio.upper()} 

_CubAddServicioUO
    [Arguments]               ${servicio}                                           ${uob} 
    _Select visible item      css:#servicios > app-select > select                  ${servicio}
    _Select visible item      css:#unidad-obra > app-select > select                ${uob}
    _Click visible element    css:div.filtroservicios> div:nth-child(5) > button

_CubAddUO
    [Arguments]               ${uob} 
    _Select visible item      css:#unidad-obra > app-select > select                ${uob}
    _Click visible element    css:div.filtroservicios> div:nth-child(5) > button

_CubValidateList
     [Arguments]                       ${nombre}    ${tipo}                ${tipo_contrato}    ${codigo_acuerdo}    ${contrato}    ${agencia}    ${nombre_proveedor}    ${creado_por}
     _Element should exist in table    ${nombre}
     _Validate column data             1            ${nombre}
     _Validate column data             2            ${tipo}
     _Validate column data             3            ${tipo_contrato}
     _Validate column data             4            ${codigo_acuerdo}
     _Validate column data             5            ${contrato}
     _Validate column data             6            ${agencia}
     _Validate column data             7            ${nombre_proveedor}
     _Validate column data             8            ${creado_por}
#    _Validate column data             10           CLP $27.240

_CubCheckDetallesBase
    _Element text should be    css:table:nth-child(1) > tr:nth-child(1) > td:nth-child(2)                                   las casas norte
    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(1) > td:nth-child(4)    1714
    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(2) > td:nth-child(2)    las casas sur
    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(2) > td:nth-child(4)    1817
    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(3) > tr:nth-child(2) > td                 Cub descripcion

_CubCheckTableCarritoServicioUOB
     [Arguments]                ${fila}                                                                                              ${servicio_cod}          ${servicio}    ${tipo_servicio}    ${precio_servicio}    ${cantidad_servicio}    ${uob_cod}    ${uob}    ${precio_uob}    ${cantidad_uob}    ${actividad}
     _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(1)     ${servicio_cod}
     _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(2)     ${servicio}
     _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(3)     ${tipo_servicio}
     _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(4)     ${cantidad_servicio} 
     _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(5)     ${precio_servicio} 
    #  _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(6)     $12.240
     _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(8)     ${uob_cod}
     _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(9)     ${uob}
     _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(10)    ${actividad}
     _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(11)    ${cantidad_uob}
     _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(12)    CLP
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(13)    ${precio_uob}
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(14)    $0

_CubCheckTableCarritoUOB
    [Arguments]                ${fila}                                                                                             ${uob_cod}         ${uob}    ${precio_uob}    ${cantidad_uob}    ${actividad}
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(1)    ${uob_cod}
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(2)    ${uob}
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(3)    ${actividad}
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(4)    ${cantidad_uob}
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(5)    CLP
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(6)    ${precio_uob}
    # _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(${fila}) > td:nth-child(7)    $0