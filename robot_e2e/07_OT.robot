*** Settings ***
Documentation    Test de funcionanildad del módulo Cubicacion.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/perfil_resource.robot
Resource    ./resources/cubicacion_resource.robot


#
#ORDINARIO 2
#Antofagasta 4
#Nokia 4
#Diseno 6
#Proyectos 6
#Inmobiliario
#Sin UO

*** Test Cases ***
Crear OT BUCLE
    _Login    mgestor1    asda    Gestor/JP
   # _Navegate to         Crear Cubicacion
   # _Crear Cubicacion

    _Navegate to    Crear OT

   # BASE
    _Set input text         css:#control_nombre > app-input > input             OT BUCLE
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

    _Click visible element    css:#create-button

    close browser

Crear OT MOVIL
    _Login    mgestor1    asda    Gestor/JP

    _Navegate to    Crear OT

   # BASE
    _Set input text         css:#control_nombre > app-input > input             OT MOVIL
    _Select visible item    css:#contratosUser > app-select > select            SBE
    _Select visible item    css:#control_cubicacion_id > app-select > select    Cub Movil

   # MOVIL
    _Select visible item    css:#plan-proyecto > select    3G
    _Select visible item    css:#sitio > select            NEWUMTS0064F8 - ANGOL - ALEMANIA 

   # SUSTENTO FINANCIERO
    _Select visible item    css:#control_pmo_codigo > app-select > select       31 
    _Select visible item    css:#control_lp_codigo > app-select > select        10952
    _Select visible item    css:#control_pep2_capex_id > app-select > select    P-0077-21-0102-40050-601

   # Extras
    _Click visible element    css:#fecha-inicio-ot > span > input
    _Click visible element    css:#fecha-inicio-ot > span > div > div > div > div > table > tbody > tr:nth-child(1) > td> span
    _Click visible element    css:#fecha-termino-ot > span > input
    _Click visible element    css:#fecha-termino-ot > span > div > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(7) > span
    _Select visible item      css:#control_admin_contrato > app-select > select                                                                  Carlos COASIN Campos Jaraquemada
    _Set input text           css:#observaciones                                                                                                 Descripcion de algo Movil

    _Click visible element    css:#create-button
    close browser

Crear OT ORDINARIO
    _Login    mgestor1    asda    Gestor/JP

    _Navegate to    Crear OT

   # BASE
    _Set input text         css:#control_nombre > app-input > input             OT ORDINARIO
    _Select visible item    css:#contratosUser > app-select > select            Contrato Ordinario
    _Select visible item    css:#control_cubicacion_id > app-select > select    Cub Ordinario

   # ORDINARIO
    _Set input text           css:#control_carta_adjudicacion > app-input > input                                                                                           12312312d
    _Click visible element    css:#fecha-adjudicacion > span > input
    _Click visible element    css:#fecha-adjudicacion > span > div > div > div > div.p-datepicker-calendar-container > table > tbody > tr:nth-child(2) > td:nth-child(4)
    _Set input text           css:#control_numero_pedido > app-input > input                                                                                                222222
    _Set input text           css:#control_materia > app-input > input                                                                                                      33333

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
    _Set input text           css:#observaciones                                                                                                 Descripcion de algo Ordinario

    _Click visible element    css:#create-button
    close browser

Crear OT FIJO
    _Login    mgestor1    asda    Gestor/JP

    _Navegate to    Crear OT

    # BASE
    _Set input text         css:#control_nombre > app-input > input             OT FIJO
    _Select visible item    css:#contratosUser > app-select > select            UNIFICADO-2019-FIJA
    _Select visible item    css:#control_cubicacion_id > app-select > select    Cub Fijo

    # FIJO
    _Select visible item      css:#control_tipo_numero_interno_id > app-select > select    @TIEMPOS
    _Set input text           css:#control_numero_interno > app-input > input              3123123
    _Click visible element    css:#button-agregar > button

   # SUSTENTO FINANCIERO
    _Select visible item    css:#control_pmo_codigo > app-select > select       31 
    _Select visible item    css:#control_lp_codigo > app-select > select        10952
    _Select visible item    css:#control_pep2_capex_id > app-select > select    P-0077-21-0102-40050-601

   # Extras
    _Click visible element    css:#fecha-inicio-ot > span > input
    _Click visible element    css:#fecha-inicio-ot > span > div > div > div > div > table > tbody > tr:nth-child(1) > td> span
    _Click visible element    css:#fecha-termino-ot > span > input
    _Click visible element    css:#fecha-termino-ot > span > div > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(7) > span
    _Select visible item      css:#control_admin_contrato > app-select > select                                                                  Carlos COASIN Campos Jaraquemada
    _Set input text           css:#observaciones                                                                                                 Descripcion de algo FIJO

    _Click visible element    css:#create-button
    close browser