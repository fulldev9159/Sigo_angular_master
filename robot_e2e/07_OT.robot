*** Settings ***
Documentation    Test de funcionanildad del módulo Cubicacion.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/perfil_resource.robot
Resource    ./resources/cubicacion_resource.robot

*** Test Cases ***
Crear OT BUCLE
    _Login    mgestor1    asda    Gestor/JP
    # _Navegate to         Crear Cubicacion
    # _Crear Cubicacion

    _Navegate to    Crear OT

    # BASE
    _Set input text         css:#control_nombre > app-input > input             OT Bucle
    _Select visible item    css:#contratosUser > app-select > select            BUCLE
    _Select visible item    css:#control_cubicacion_id > app-select > select    Cub Bucle

    # BUCLE
    _Select visible item      css:#control-oficina-central > app-select > select    0269 - HOSPITAL
    _Select visible item      css:#control-solicitado-por > app-select > select     Telefonica Empresa
    _Set input text           css:#control-direccion > app-input > input            Direccion cualquiera
    _Set input text           css:#control-altura > app-input > input               150
    _Set input text           css:#control-piso > app-input > input                 1
    _Set input text           css:#control-departamento > app-input > input         2131
    _Select visible item      css:#control-comuna > app-select > select             Cerro Navia
    _Select visible item      css:#control-tipo-red > app-select > select           Cobre                   
    _Select visible item      css:#control-tipo-trabajo > app-select > select       FOE - FO Empresa
    _Click visible element    css:#control-tiene-boleta                             
    _Click visible element    css:#control-tiene-permiso
    _Select visible item      css:#control-area-negocio > app-select > select       NORMAL 
    _Set input text           css:#control-proyectista > app-input > input          Juan

   # SUSTENTO FINANCIERO
    _Select visible item    css:#control_pmo_codigo > app-select > select       31 
    _Select visible item    css:#control_lp_codigo > app-select > select        10952
    _Select visible item    css:#control_pep2_capex_id > app-select > select    P-0077-21-0102-40050-601

   # Extras
    _Click visible element    css:#fecha-inicio-ot > span > input
    _Click visible element    css:#fecha-inicio-ot > span > div > div > div > div > table > tbody > tr:nth-child(1) > td> span
    _Click visible element    css:#fecha-termino-ot > span > input
    _Click visible element    css:#fecha-termino-ot > span > div > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(7) > span
    _Select visible item      css:#control_admin_contrato > app-select > select                                                                  Jose NOKIA Campos Jaraquemada 
    _Set input text           css:#observaciones                                                                                                 Descripcion de algo bucle