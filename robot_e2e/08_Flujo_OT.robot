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
    # Reglas de visualización para la OT BUCLE creada en el test anterior
    # mgestor1 (Creador - Area: Conectividad Y Backhaul): VER
    # mgestor2 (Area: Conectividad Y Backhaul): VER
    # mgestor3 (Area: Ingenieria Acceso Movil): NO PUEDE VER
    # msupervisor1(Area:Conectividad Y Backhaul): JECUTAR
    # mjefearea1 (Area:Conectividad Y Backhaul): VER
    # mjefearea2 (Area:Ingenieria Acceso Movil): NO PUEDE VER
    # msubgerente1 (Area:Conectividad Y Backhaul): NO PUEDE VER
    # msubgerente2 (Area:Ingenieria Acceso Movil): NO PUEDE VER
    # mgerente1 (Area:Conectividad Y Backhaul): NO PUEDE VER
    # mgerente2 (Area:Ingenieria Acceso Movil): NO PUEDE VER

    # VER = ABIERTA
    # EJECUTAR = EJECUCION
    # VER_CERRADO = CERRADAS

    # _OTActionUser    mgestor2    Gestor/JP    VER    OT BUCLE
    _OTActionUser    mgestor3        Gestor/JP                  NO PUEDE VER    OT BUCLE
    _OTActionUser    msupervisor1    Supervisor (Telefónica)    EJECUTAR        OT BUCLE
    _OTActionUser    mjefearea1      Jefe de Área Telefónica    VER             OT BUCLE
    _OTActionUser    mjefearea2      Jefe de Área Telefónica    NO PUEDE VER    OT BUCLE
    _OTActionUser    msubgerente1    SubGerente Telefónica      NO PUEDE VER    OT BUCLE
    _OTActionUser    msubgerente2    SubGerente Telefónica      NO PUEDE VER    OT BUCLE
    _OTActionUser    mgerente1       Gerente Telefónica         NO PUEDE VER    OT BUCLE
    _OTActionUser    mgerente2       Gerente Telefónica         NO PUEDE VER    OT BUCLE


    # _Login          msupervisor1    asda    Supervisor (Telefónica)
    # _Navegate to    Listar OT

    # _Reglas de visualizacion para accionario    OT MOVIL
    # _Validate column data                       3           OT MOVIL
    # _Validate column data                       4           Autorizar inicialmente la OT
    # _Validate column data                       8           SBE
    # _Validate column data                       9           COASIN
    # _Validate column data                       10          JESSICA MOVISTAR CASTILLO 1

    # _Press action             Aceptar OT
    # _Click visible element    css:p-dialog > div > div > div.p-dialog-footer > p-footer > button.btn.btn-primary


    # _Reglas de visualizacion para no accionarios    OT MOVIL
    # _Validate column data                           4           Autorizar inicialmente la OT

    # close browser

    # _Login          mjefearea1    asda    Jefe de Área Telefónica
    # _Navegate to    Listar OT

    # _Reglas de visualizacion para accionario    OT MOVIL
    # _Press action                               Aceptar OT
    # _Click visible element                      css:p-dialog > div > div > div.p-dialog-footer > p-footer > button.btn.btn-primary

    # _Reglas de visualizacion para no accionarios    OT MOVIL
    # _Validate column data                           4           Autorizar OT por Proveedor

    # close browser

    # _Login                                          mgestor1     asda    Gestor/JP
    # _Navegate to                                    Listar OT
    # _Reglas de visualizacion para no accionarios    OT MOVIL

    # close browser

    #  #REVISAR PORQUE NO APARECE EN PROVEEDOR