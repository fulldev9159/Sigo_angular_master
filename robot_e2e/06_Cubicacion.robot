*** Settings ***
Documentation    Test de funcionanildad del módulo Cubicacion.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/perfil_resource.robot
Resource    ./resources/cubicacion_resource.robot

*** Variables ***
${tipo_contrato_test}=     Bucle
${codigo_acurdo_test}=     330000659
${creado_por}=             JESSICA MOVISTAR CASTILLO 1
${nombre_test}=            CubTest
${contrato_test} =         BUCLE
${agencia_test} =          APOQUINDO
${proveedor_test} =        330000659 - NOKIA SOLUTIONS AND NETWORKS CHILE LTDA
${nombre_proveedor} =      NOKIA SOLUTIONS AND NETWORKS CHILE LTDA
${actividad_test} =        Fibra Optica
${tipo_servicio_test} =    Fibra Optica                                           

${serv_1_test} =                J757 - DESMONTAR CABLE DE FIBRA OPTICA EN AEREO
${serv_1_precio_test} =         266,67
${serv_1_uo_1_test} =           D351 - KIT RETENCION FIBRA 14 MM
${serv_1_uo_1_precio_test} =    57000

${serv_2_test} =                J756 - INSTALAR CABLE DE FIBRA OPTICA AEREO
${serv_2_precio_test} =         711,12
${serv_2_uo_1_test} =           H093 - CABLE AEREO 64 FO/PKP (CON LASHING RECUBIERTO)
${serv_2_uo_1_precio_test} =    0
${serv_2_uo_2_test} =           H095 - CABLE AEREO 96 FO/PKP (CON LASHING RECUBIERTO) 
${serv_2_uo_2_precio_test} =    0
${serv_2_uo_3_test} =           H088 - CABLE AEREO 24 FO/PKP (CON LASHING RECUBIERTO)


*** Test Cases ***
# Crear cubicación
#    [Documentation]                                                                                Scenario: El usuario mgestor 1 con perfil Gestor/JP va a crear una nueva cubicación.
#    # ...                                                                                          Given: El usuario mgestor 1 con perfil Gestor/JP entra en la página para crear cubicación
#    # Scenario: El usuario mgestor 1 con perfil Gestor/JP va a crear una nueva cubicación
#    # Given: El usuario mgestor 1 con perfil Gestor/JP entra en la página para crear cubicación
#    # When: Registre todos los datos necesarios
#    # And presione el botón crear cubicación
#    # Then: La cubicación debe aparecer en el listado con los datos correctos

# #    Given: El usuario mgestor 1 con perfil Gestor/JP entra en la página para crear cubicación
#      _Login                                                                                       mgestor1            asda    Gestor/JP
#      _Navegate to                                                                                 Crear Cubicacion

#    # When: Registre todos los datos necesarios
#    _CubFormBase                                   ${nombre_test}       Full                     ${contrato_test}    ${agencia_test}    ${proveedor_test}    Cub descripcion
#    _CubFiltros                                    ${actividad_test}    ${tipo_servicio_test}
#    sleep                                          1
#    _CubAddServicioUO                              ${serv_1_test}       ${serv_1_uo_1_test}
#    _CubAddServicioUO                              ${serv_2_test}       ${serv_2_uo_1_test}
#    _CubAddServicioUO                              ${serv_2_test}       ${serv_2_uo_2_test}

#    sleep                     1
#    _Click visible element    css:#create-button
#    close browser

Listar Cubicaciones
    _Login              mgestor1             asda    Gestor/JP
    _Navegate to        Listar Cubicacion
    _CubValidateList    ${nombre_test}       Full    ${tipo_contrato_test}    ${codigo_acurdo_test}    ${contrato_test}    ${agencia_test}    ${nombre_proveedor}    ${creado_por}
    close browser

Detalle
    [Documentation]                     Revisar si se visualizan los detalles de la cubicació correctamente
    _Login                              mgestor1                                                               asda                                         Gestor/JP
    _Navegate to                        Listar Cubicacion
    _Element should exist in table      CubTest
    _Click visible element              css:#action-buttons > div > button:nth-child(1)
    _CubCheckDetallesBase
    _CubCheckTableCarritoServicioUOB    1                                                                      
    ...                                 ${serv_1_test.split("-")[0].strip()}                                   ${serv_1_test.split("-")[1].strip()}         ${tipo_servicio_test}    1    MT    $266,67    CLP
    ...                                 ${serv_1_uo_1_test.split("-")[0].strip()}                              ${serv_1_uo_1_test.split("-")[1].strip()}    ${actividad_test}        1    CU    $57.000    CLP
    _CubCheckTableCarritoServicioUOB    2                                                                      
    ...                                 ${serv_2_test.split("-")[0].strip()}                                   ${serv_2_test.split("-")[1].strip()}         ${tipo_servicio_test}    1    MT    $711,12    CLP
    ...                                 ${serv_2_uo_1_test.split("-")[0].strip()}                              ${serv_2_uo_1_test.split("-")[1].strip()}    ${actividad_test}        1    MT    $0         CLP
    _CubCheckTableCarritoUOB            3                                                                      
    ...                                 ${serv_2_uo_2_test.split("-")[0].strip()}                              ${serv_2_uo_2_test.split("-")[1].strip()}    ${actividad_test}        1    MT    $0         CLP
    close browser


Clonar
    [Documentation]                   Revisar si el clonado funciona correctamente
    _Login                            mgestor1                                                             asda       Gestor/JP
    _Navegate to                      Listar Cubicacion
    _Element should exist in table    CubTest
    _Click visible element            css:#action-buttons > div > button:nth-child(2)
    _Set input text                   css:app-clone-cubage-form > form > app-input > input                 Clonado
    _Click visible element            css:p-dialog > div > div > div> p-footer > button.btn.btn-primary

    sleep    1


    _CubValidateList    Clonado    Full    ${tipo_contrato_test}    ${codigo_acurdo_test}    ${contrato_test}    ${agencia_test}    ${nombre_proveedor}    ${creado_por}


    _Click visible element    css:#action-buttons > div > button:nth-child(1)

    _CubCheckDetallesBase

    _CubCheckTableCarritoServicioUOB    1                                            
    ...                                 ${serv_1_test.split("-")[0].strip()}         ${serv_1_test.split("-")[1].strip()}         ${tipo_servicio_test}    1    MT    $266,67    CLP
    ...                                 ${serv_1_uo_1_test.split("-")[0].strip()}    ${serv_1_uo_1_test.split("-")[1].strip()}    ${actividad_test}        1    CU    $57.000    CLP
    _CubCheckTableCarritoServicioUOB    2                                            
    ...                                 ${serv_2_test.split("-")[0].strip()}         ${serv_2_test.split("-")[1].strip()}         ${tipo_servicio_test}    1    MT    $711,12    CLP
    ...                                 ${serv_2_uo_1_test.split("-")[0].strip()}    ${serv_2_uo_1_test.split("-")[1].strip()}    ${actividad_test}        1    MT    $0         CLP
    _CubCheckTableCarritoUOB            3                                            
    ...                                 ${serv_2_uo_2_test.split("-")[0].strip()}    ${serv_2_uo_2_test.split("-")[1].strip()}    ${actividad_test}        1    MT    $0         CLP

    close browser

Eliminar
    [Documentation]                       Revisar si el eliminar cubicación funciona
    _Login                                mgestor1                                                       asda    Gestor/JP
    _Navegate to                          Listar Cubicacion
    _Element should exist in table        Clonado
    _Click visible element                css:#action-buttons > div > button.ui.button.eliminar-color
    _Click visible element                css:#delete-user-button
    _Element should not exist in table    Clonado
    close browser

# Editar
#    [Documentation]                   Revisar si el editar cubicación funciona
#    _Login                            mgestor1                                           asda    Gestor/JP
#    _Navegate to                      Listar Cubicacion
#    _Element should exist in table    CubTest
#    _Click visible element            css:#action-buttons > div > button:nth-child(3)

#    # REVISAR QUE LOS DATOS HAYAN SIDO CORRECTAMENTE CARGADO
#    sleep                                                       3
#    _Element input text should be                               css:#nomnbreCub > app-input > input         CubTest
#    _Element input text should be                               css:#tipoCub > app-select > select          3          # Full
#    _Element input text should be                               css:#contratosUser > app-select > select    9          
#    _Element input text should be                               css:#agencias > app-select > select         20         
#    _Element input text should be                               css:#proveedores > app-select > select      7          

#    _Element input text should be    css:#direcciondesde > app-input > input       las casas norte
#    _Element input text should be    css:#alturadesde > app-input > input          1714
#    _Element input text should be    css:#direccionhasta > app-input > input       las casas sur
#    _Element input text should be    css:#alturahasta > app-input > input          1817
#    _Element input text should be    css:#descripcion > app-textarea > textarea    Cub descripcion

#    _CubCheckTableCarritoServicioUOBCREATE    1                                            
#    ...                                       ${serv_1_test.split("-")[0].strip()}         ${serv_1_test.split("-")[1].strip()}         ${tipo_servicio_test}    1    MT    $266,67    CLP
#    ...                                       ${serv_1_uo_1_test.split("-")[0].strip()}    ${serv_1_uo_1_test.split("-")[1].strip()}    ${actividad_test}        1    CU    $57.000    CLP
#    _CubCheckTableCarritoServicioUOBCREATE    2                                            
#    ...                                       ${serv_2_test.split("-")[0].strip()}         ${serv_2_test.split("-")[1].strip()}         ${tipo_servicio_test}    1    MT    $711,12    CLP
#    ...                                       ${serv_2_uo_1_test.split("-")[0].strip()}    ${serv_2_uo_1_test.split("-")[1].strip()}    ${actividad_test}        1    MT    $0         CLP
#    _CubCheckTableCarritoUOBCREATE            3                                            
#    ...                                       ${serv_2_uo_2_test.split("-")[0].strip()}    ${serv_2_uo_2_test.split("-")[1].strip()}    ${actividad_test}        1    MT    $0         CLP


# #    # PENDIENTE: Para cuando existan datos reales en db se debe revisar los cambios de los demás parámetros
#      _Set input text                                                                                            css:#nomnbreCub > app-input > input           CubTestEditado
#      _Select visible item                                                                                       css:#tipoCub > app-select > select            Construcción
#      _Set input text                                                                                            css:#direcciondesde > app-input > input       Edit las casas norte
#      _Set input text                                                                                            css:#alturadesde > app-input > input          Edit 1714
#      _Set input text                                                                                            css:#direccionhasta > app-input > input       Edit las casas sur
#      _Set input text                                                                                            css:#alturahasta > app-input > input          Edit 1817
#      _Set input text                                                                                            css:#descripcion > app-textarea > textarea    Edit Cub descripción

#    _Click visible element    css:.table-carrito > table > tbody > tr:nth-child(1) > td:nth-child(7) > div > button
#    _Click visible element    css:#delete-user-button


# #    # Table totales
# #    _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(1) > td:nth-child(2)    $15.000
# #    _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(2) > td:nth-child(2)    $0
# #    _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(3) > td:nth-child(2)    $15.000

# #    _Set input text    css:.table-carrito > table > tbody > tr:nth-child(1) > td:nth-child(4) > app-input > input    4

# #    _Element input text should be    css:table > tbody > tr:nth-child(1) > td:nth-child(4)> app-input > input    4

# #    _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(1) > td:nth-child(2)    $60.000
# #    _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(2) > td:nth-child(2)    $0
# #    _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(3) > td:nth-child(2)    $60.000

#    _CubFiltros          ${actividad_test}    ${tipo_servicio_test}
#    _CubAddServicioUO    ${serv_2_test}       ${serv_2_uo_3_test}

#    _Click visible element    css:#create-button

#      _Element should exist in table    CubTestEditado
# #    # REVISAR LISTA
# #    _Validate column data             2                 Construcción
# #    _Validate column data             3                 Móvil
# #    _Validate column data             4                 12121212
# #    _Validate column data             5                 SBE
# #    _Validate column data             6                 RANCAGUA
# #    _Validate column data             7                 COASIN
# #    _Validate column data             8                 JESSICA MOVISTAR CASTILLO 1
# #    _Validate column data             10                CLP $72.240

#      _CubValidateList     CubTestEditado    Construcción    ${tipo_contrato_test}    ${codigo_acurdo_test}    ${contrato_test}    ${agencia_test}    ${nombre_proveedor}    ${creado_por}
# #    # REVISAR DETALLE

#      _Click visible element     css:#action-buttons > div > button:nth-child(1)
# #    _CubCheckDetallesBase
#      _Element text should be    css:table:nth-child(1) > tr:nth-child(1) > td:nth-child(2)                                   Edit las casas norte
#      _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(1) > td:nth-child(4)    Edit 1714
#      _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(2) > td:nth-child(2)    Edit las casas sur
#      _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(2) > td:nth-child(4)    Edit 1817
#      _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(3) > tr:nth-child(2) > td                 Edit Cub descripción

#    _CubCheckTableCarritoServicioUOB    1                                            
#    ...                                 ${serv_2_test.split("-")[0].strip()}         ${serv_2_test.split("-")[1].strip()}         ${tipo_servicio_test}    1    MT    $711,12    CLP
#    ...                                 ${serv_2_uo_1_test.split("-")[0].strip()}    ${serv_2_uo_1_test.split("-")[1].strip()}    ${actividad_test}        1    MT    $0         CLP
#    _CubCheckTableCarritoUOB            2                                            
#    ...                                 ${serv_2_uo_2_test.split("-")[0].strip()}    ${serv_2_uo_2_test.split("-")[1].strip()}    ${actividad_test}        1    MT    $0         CLP
#    _CubCheckTableCarritoUOB            3                                            
#    ...                                 ${serv_2_uo_3_test.split("-")[0].strip()}    ${serv_2_uo_3_test.split("-")[1].strip()}    ${actividad_test}        1    MT    $0         CLP
#    close browser







