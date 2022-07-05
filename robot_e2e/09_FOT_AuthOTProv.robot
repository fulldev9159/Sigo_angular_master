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
Flujo Bucle Aceptación Proveedor
    # ETAPA: Autorizar OT por Proveedor
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

    _Login                    nadmincontrato1                                                asda                            Administrador EECC
    _Navegate to              Listar OT
    _Press action             Asignar Supervisor de trabajos
    _Select visible item      css:app-assign-trabajador-form > form > app-select > select    Jaime NOKIA Contreras Cortes
    _Click visible element    css:p-footer > button.btn.btn-primary
    close browser