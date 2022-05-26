*** Settings ***
Documentation    Test de funcionanildad del Flujo OT.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/perfil_resource.robot
Resource    ./resources/cubicacion_resource.robot
Resource    ./resources/ot_resource.robot

*** Test Cases ***
Flujo Movil Aprob Jerarquica
    # Los usuarios mgestor1, mgestor2,jefearea1 son de la misma área (1) y deben poder visualizar las OT creadas sin poder realizar ninguna acción sobre ellas
    _Login          mgestor2     asda    Gestor/JP
    _Navegate to    Listar OT

    # _Reglas de visualizacion para no accionarios    OT BUCLE   al parecer falla esto porque no tienen los mismos contratos
    # _Reglas de visualizacion para no accionarios    OT ORDINARIO
    # _Reglas de visualizacion para no accionarios    OT FIJO
    _Reglas de visualizacion para no accionarios    OT MOVIL

    close browser
    _Login           mjefearea1    asda    Jefe de Área Telefónica
    _Navegate to     Listar OT

    _Reglas de visualizacion para no accionarios    OT BUCLE
    _Reglas de visualizacion para no accionarios    OT ORDINARIO
    _Reglas de visualizacion para no accionarios    OT FIJO
    _Reglas de visualizacion para no accionarios    OT MOVIL
    close browser

    # Los usuarios msubgerente1,mgerente1 son de la misma área (1) del gestor pero no deben poder ver la OT en este momento
    _Login                                msubgerente1    asda    SubGerente Telefónica
    _Navegate to                          Listar OT
    _Reglas de visualizacion gerencial    OT BUCLE
    _Reglas de visualizacion gerencial    OT ORDINARIO
    _Reglas de visualizacion gerencial    OT FIJO
    _Reglas de visualizacion gerencial    OT MOVIL
    close browser

    _Login                                mgerente1       asda    Gerente Telefónica
    _Navegate to                          Listar OT
    _Reglas de visualizacion gerencial    OT BUCLE
    _Reglas de visualizacion gerencial    OT ORDINARIO
    _Reglas de visualizacion gerencial    OT FIJO
    _Reglas de visualizacion gerencial    OT MOVIL
    close browser

    # Los usuarios mgestor3,jefearea2,msubgerente2,mgerente2 son del área (3) y no deben poder ver las OTs creadas

    _Login          mgestor3     asda    Gestor/JP
    _Navegate to    Listar OT

    _Reglas de visualizacion otra area    OT BUCLE
    _Reglas de visualizacion otra area    OT ORDINARIO
    _Reglas de visualizacion otra area    OT FIJO
    _Reglas de visualizacion otra area    OT MOVIL

    close browser
    _Login           mjefearea2    asda    Jefe de Área Telefónica
    _Navegate to     Listar OT

    _Reglas de visualizacion otra area    OT BUCLE
    _Reglas de visualizacion otra area    OT ORDINARIO
    _Reglas de visualizacion otra area    OT FIJO
    _Reglas de visualizacion otra area    OT MOVIL
    close browser

    _Login                                msubgerente2    asda    SubGerente Telefónica
    _Navegate to                          Listar OT
    _Reglas de visualizacion otra area    OT BUCLE
    _Reglas de visualizacion otra area    OT ORDINARIO
    _Reglas de visualizacion otra area    OT FIJO
    _Reglas de visualizacion otra area    OT MOVIL
    close browser

    _Login                                mgerente2       asda    Gerente Telefónica
    _Navegate to                          Listar OT
    _Reglas de visualizacion otra area    OT BUCLE
    _Reglas de visualizacion otra area    OT ORDINARIO
    _Reglas de visualizacion otra area    OT FIJO
    _Reglas de visualizacion otra area    OT MOVIL
    close browser

    # El usuario msupervisor1 debe tener la OT en ejecución y poder aceptar la OT

    _Login          msupervisor1    asda    Supervisor (Telefónica) 
    _Navegate to    Listar OT

    _Reglas de visualizacion para accionario    OT MOVIL
    _Validate column data                       3           OT MOVIL
    _Validate column data                       4           Autorizar inicialmente la OT
    _Validate column data                       8           SBE
    _Validate column data                       9           COASIN
    _Validate column data                       10          JESSICA MOVISTAR CASTILLO 1

    _Press action             Aceptar OT
    _Click visible element    css:p-dialog > div > div > div.p-dialog-footer > p-footer > button.btn.btn-primary


    _Reglas de visualizacion para no accionarios    OT MOVIL
    _Validate column data                           4           Autorizar inicialmente la OT

    close browser

    _Login          mjefearea1    asda    Jefe de Área Telefónica
    _Navegate to    Listar OT

    _Reglas de visualizacion para accionario    OT MOVIL
    _Press action                               Aceptar OT
    _Click visible element                      css:p-dialog > div > div > div.p-dialog-footer > p-footer > button.btn.btn-primary

    _Reglas de visualizacion para no accionarios    OT MOVIL
    _Validate column data                           4           Autorizar OT por Proveedor

    close browser

    _Login                                          mgestor1     asda    Gestor/JP
    _Navegate to                                    Listar OT
    _Reglas de visualizacion para no accionarios    OT MOVIL

    close browser

     #REVISAR PORQUE NO APARECE EN PROVEEDOR