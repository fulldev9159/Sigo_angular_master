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
    # ETAPA: Autorizar inicialmente la OT
    ##### REGLAS DE VISUALIZACION  #########
    # MOVISTAR
    _OTActionUser    mgestor1           Gestor/JP                  VER             OT BUCLE
    _OTActionUser    mgestor2           Gestor/JP                  NO PUEDE VER    OT BUCLE    # --- Debido a que no tiene asociado el contrato BUCLE
    _OTActionUser    mgestor3           Gestor/JP                  NO PUEDE VER    OT BUCLE    # --- No pertenece a la misma área
    _OTActionUser    msupervisor1       Supervisor (Telefónica)    EJECUTAR        OT BUCLE
    _OTActionUser    mjefearea1         Jefe de Área Telefónica    VER             OT BUCLE
    _OTActionUser    mjefearea2         Jefe de Área Telefónica    NO PUEDE VER    OT BUCLE
    _OTActionUser    msubgerente1       SubGerente Telefónica      NO PUEDE VER    OT BUCLE
    _OTActionUser    msubgerente2       SubGerente Telefónica      NO PUEDE VER    OT BUCLE
    _OTActionUser    mgerente1          Gerente Telefónica         NO PUEDE VER    OT BUCLE
    _OTActionUser    mgerente2          Gerente Telefónica         NO PUEDE VER    OT BUCLE
    # CONTRATISTAS
    _OTActionUser    cadmincontrato1    Administrador EECC         NO PUEDE VER    OT BUCLE
    _OTActionUser    ctrabajador1       Trabajador EECC            NO PUEDE VER    OT BUCLE
    _OTActionUser    cadmincontrato2    Administrador EECC         NO PUEDE VER    OT BUCLE
    _OTActionUser    ctrabajador2       Trabajador EECC            NO PUEDE VER    OT BUCLE
    _OTActionUser    nadmincontrato1    Administrador EECC         NO PUEDE VER    OT BUCLE    # --- Aún no puede ver hasta que termine la aceptación jerárquica por MOVISTAR
    _OTActionUser    ntrabajador1       Trabajador EECC            NO PUEDE VER    OT BUCLE
    _OTActionUser    nadmincontrato2    Administrador EECC         NO PUEDE VER    OT BUCLE
    _OTActionUser    ntrabajador2       Trabajador EECC            NO PUEDE VER    OT BUCLE
    ##### REGLAS DE VISUALIZACION  #########

    # Autorización del supervisor
    _Login                    msupervisor1                                                                          asda    Supervisor (Telefónica)
    _Navegate to              Listar OT
    _Press action             Aceptar OT
    _Click visible element    css:p-dialog > div > div > div.p-dialog-footer > p-footer > button.btn.btn-primary
    # _Have to exist in table/tab    Abiertas                                                                              OT BUCLE
    # _Validate column data          4                                                                                     Autorizar inicialmente la OT
    close browser

    ##### REGLAS DE VISUALIZACION  #########
    # MOVISTAR
    _OTActionUser    mgestor1           Gestor/JP                  VER             OT BUCLE
    _OTActionUser    mgestor2           Gestor/JP                  NO PUEDE VER    OT BUCLE    # --- Debido a que no tiene asociado el contrato BUCLE
    _OTActionUser    mgestor3           Gestor/JP                  NO PUEDE VER    OT BUCLE    # --- No pertenece a la misma área
    # _OTActionUser    msupervisor1       Supervisor (Telefónica)    VER             OT BUCLE
    _OTActionUser    mjefearea1         Jefe de Área Telefónica    EJECUTAR        OT BUCLE
    _OTActionUser    mjefearea2         Jefe de Área Telefónica    NO PUEDE VER    OT BUCLE
    _OTActionUser    msubgerente1       SubGerente Telefónica      NO PUEDE VER    OT BUCLE
    _OTActionUser    msubgerente2       SubGerente Telefónica      NO PUEDE VER    OT BUCLE
    _OTActionUser    mgerente1          Gerente Telefónica         NO PUEDE VER    OT BUCLE
    _OTActionUser    mgerente2          Gerente Telefónica         NO PUEDE VER    OT BUCLE
    # CONTRATISTAS
    _OTActionUser    cadmincontrato1    Administrador EECC         NO PUEDE VER    OT BUCLE
    _OTActionUser    ctrabajador1       Trabajador EECC            NO PUEDE VER    OT BUCLE
    _OTActionUser    cadmincontrato2    Administrador EECC         NO PUEDE VER    OT BUCLE
    _OTActionUser    ctrabajador2       Trabajador EECC            NO PUEDE VER    OT BUCLE
    _OTActionUser    nadmincontrato1    Administrador EECC         NO PUEDE VER    OT BUCLE    # --- Aún no puede ver hasta que termine la aceptación jerárquica por MOVISTAR
    _OTActionUser    ntrabajador1       Trabajador EECC            NO PUEDE VER    OT BUCLE
    _OTActionUser    nadmincontrato2    Administrador EECC         NO PUEDE VER    OT BUCLE
    _OTActionUser    ntrabajador2       Trabajador EECC            NO PUEDE VER    OT BUCLE
    ##### REGLAS DE VISUALIZACION  #########

     # Autorización del jefe area
    _Login                    mjefearea1                                                                            asda    Jefe de Área Telefónica
    _Navegate to              Listar OT
    _Press action             Aceptar OT
    _Click visible element    css:p-dialog > div > div > div.p-dialog-footer > p-footer > button.btn.btn-primary
    # _Have to exist in table/tab    Abiertas                                                                              OT BUCLE
    # _Validate column data          4                                                                                     Autorizar OT por Proveedor
    close browser


    ##### REGLAS DE VISUALIZACION  #########
    # MOVISTAR
    _OTActionUser    mgestor1           Gestor/JP                  VER             OT BUCLE
    _OTActionUser    mgestor2           Gestor/JP                  NO PUEDE VER    OT BUCLE    # --- Debido a que no tiene asociado el contrato BUCLE
    _OTActionUser    mgestor3           Gestor/JP                  NO PUEDE VER    OT BUCLE    # --- No pertenece a la misma área
    # _OTActionUser    msupervisor1       Supervisor (Telefónica)    VER             OT BUCLE
    # _OTActionUser    mjefearea1         Jefe de Área Telefónica    VER             OT BUCLE
    _OTActionUser    mjefearea2         Jefe de Área Telefónica    NO PUEDE VER    OT BUCLE
    _OTActionUser    msubgerente1       SubGerente Telefónica      NO PUEDE VER    OT BUCLE
    _OTActionUser    msubgerente2       SubGerente Telefónica      NO PUEDE VER    OT BUCLE
    _OTActionUser    mgerente1          Gerente Telefónica         NO PUEDE VER    OT BUCLE
    _OTActionUser    mgerente2          Gerente Telefónica         NO PUEDE VER    OT BUCLE
    # CONTRATISTAS
    _OTActionUser    cadmincontrato1    Administrador EECC         NO PUEDE VER    OT BUCLE
    _OTActionUser    ctrabajador1       Trabajador EECC            NO PUEDE VER    OT BUCLE
    _OTActionUser    cadmincontrato2    Administrador EECC         NO PUEDE VER    OT BUCLE
    _OTActionUser    ctrabajador2       Trabajador EECC            NO PUEDE VER    OT BUCLE
    _OTActionUser    nadmincontrato1    Administrador EECC         EJECUTAR        OT BUCLE    # --- En este punto si debe poder VER y EJECUTAR
    _OTActionUser    ntrabajador1       Trabajador EECC            NO PUEDE VER    OT BUCLE
    _OTActionUser    nadmincontrato2    Administrador EECC         NO PUEDE VER    OT BUCLE
    _OTActionUser    ntrabajador2       Trabajador EECC            NO PUEDE VER    OT BUCLE
    ##### REGLAS DE VISUALIZACION  #########


