*** Settings ***
Documentation    Test de funcionanildad del módulo Cubicacion.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/perfil_resource.robot
Resource    ./resources/cubicacion_resource.robot
Resource    ./resources/ot_resource.robot

*** Test Cases ***
Crear OT BUCLE
    _Login          mgestor1    asda    Gestor/JP
    _Navegate to    Crear OT

   # BASE
    _OTFormBase    OT BUCLE    BUCLE    Cub Bucle

   # BUCLE
    _OTFormBucle    0189 - S.FCO LAS CONDES
    ...             MARKETING
    ...             Direccion cualquiera       150    1    2131    Cerro Navia    
    ...             ATP                        
    ...             TIEMPO - @TIEMPO           
    ...             NORMAL                     
    ...             Juan

   # SUSTENTO FINANCIERO
    _OTFormSustento    31    10952    P-0077-21-0102-40050-601

   # Extras
    _OTFormExtra    Jose NOKIA Campos Jaraquemada    Descripcion de algo bucle

    _Click visible element    css:#create-button


    _Have No to exist in table/tab    Cerradas     OT BUCLE
    _Have No to exist in table/tab    Ejecucion    OT BUCLE

    _Navegate to                   Listar OT
    _Have to exist in table/tab    Abiertas                                                                    OT BUCLE
    _OTCheckList                   OT BUCLE                                                                    Autorizar inicialmente la OT    BUCLE    NOKIA SOLUTIONS AND NETWORKS CHILE LTDA    JESSICA MOVISTAR CASTILLO 1
    _Click visible element         css:#action-buttons > app-menu > button
    _Click visible element         css:#action-buttons > app-menu > p-menu > div > ul > li:nth-child(1) > a

    sleep                1
    _OTCheckInfoBase     Bucle                   BUCLE    Cub Bucle    Autorizar inicialmente la OT    Abierta        JESSICA MOVISTAR CASTILLO 1    JESSICA MOVISTAR CASTILLO 1    Descripcion de algo bucle
    _OTCheckInfoBucle    0189                    
    ...                  MARKETING               
    ...                  Direccion cualquiera    150      1            2131                            Cerro Navia    
    ...                  ATP                     
    ...                  @TIEMPO 
    ...                  Si                      Si       
    ...                  NORMAL 
    ...                  Juan

    _OTCheckInfoSustento    CAPEX    31    10952    P-0077-21-0102-40050-601


    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card:nth-child(2) > div > div.card-body > table > tr.ng-star-inserted > td:nth-child(1)    ADM_CONTRATO
    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card:nth-child(2) > div > div.card-body > table > tr.ng-star-inserted > td:nth-child(2)    Jose NOKIA Campos Jaraquemada

    # close browser

# Crear OT MOVIL
#    _Login    mgestor1    asda    Gestor/JP

#    _Navegate to    Crear OT

#    # BASE
#    _Set input text         css:#control_nombre > app-input > input             OT MOVIL
#    _Select visible item    css:#contratosUser > app-select > select            SBE
#    _Select visible item    css:#control_cubicacion_id > app-select > select    Cub Movil

#    # MOVIL
#    _Select visible item    css:#plan-proyecto > select    3G
#    _Select visible item    css:#sitio > select            NEWUMTS0064F8 - ANGOL - ALEMANIA 

#    # SUSTENTO FINANCIERO
#    _Select visible item     css:#control_pmo_codigo > app-select > select       31 
#    _Select visible item     css:#control_lp_codigo > app-select > select        10952
#    _Select visible item     css:#control_pep2_capex_id > app-select > select    P-0077-21-0102-40050-601

#    # Extras
#    _Click visible element    css:#fecha-inicio-ot > span > input
#    _Click visible element    css:#fecha-inicio-ot > span > div > div > div > div > table > tbody > tr:nth-child(1) > td> span
#    _Click visible element    css:#fecha-termino-ot > span > input
#    _Click visible element    css:#fecha-termino-ot > span > div > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(7) > span
#    _Select visible item      css:#control_admin_contrato > app-select > select                                                                  Carlos COASIN Campos Jaraquemada
#    _Set input text           css:#observaciones                                                                                                 Descripcion de algo Movil

#    _Click visible element            css:#create-button
#    # _Navegate to                    Listar OT
#    _Have to exist in table/tab       Abiertas              OT MOVIL
#    _Validate column data             3                     OT MOVIL
#    _Validate column data             4                     Autorizar inicialmente la OT
#    _Validate column data             8                     SBE
#    _Validate column data             9                     COASIN
#    _Validate column data             10                    JESSICA MOVISTAR CASTILLO 1
#    _Have No to exist in table/tab    Cerradas              OT MOVIL
#    _Have No to exist in table/tab    Ejecucion             OT MOVIL

#    #_Navegate to                  Listar OT
#    _Have to exist in table/tab    Abiertas                                                                    OT MOVIL
#    _Click visible element         css:#action-buttons > app-menu > button
#    _Click visible element         css:#action-buttons > app-menu > p-menu > div > ul > li:nth-child(1) > a

#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    Móvil
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    SBE
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(4) > td:nth-child(2)    Cub Movil
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(8) > td:nth-child(2)    Autorizar inicialmente la OT
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(9) > td:nth-child(2)    Abierta

#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    JESSICA MOVISTAR CASTILLO 1
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    JESSICA MOVISTAR CASTILLO 1
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(3) > td:nth-child(2)    Descripcion de algo Movil

#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    3G
#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    ANGOL - ALEMANIA

#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    CAPEX
#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    31
#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(3) > td:nth-child(2)    10952
#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(4) > td:nth-child(2)    P-0077-21-0102-40050-601

#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card:nth-child(2) > div > div.card-body > table > tr.ng-star-inserted > td:nth-child(1)    ADM_CONTRATO
#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card:nth-child(2) > div > div.card-body > table > tr.ng-star-inserted > td:nth-child(2)    Carlos COASIN Campos Jaraquemada

#    close browser

# Crear OT ORDINARIO
#    _Login    mgestor1    asda    Gestor/JP

#    _Navegate to    Crear OT

#    # BASE
#    _Set input text         css:#control_nombre > app-input > input             OT ORDINARIO
#    _Select visible item    css:#contratosUser > app-select > select            Contrato Ordinario
#    _Select visible item    css:#control_cubicacion_id > app-select > select    Cub Ordinario

#    # ORDINARIO
#    _Set input text           css:#control_carta_adjudicacion > app-input > input                                                                                           12312312d
#    _Click visible element    css:#fecha-adjudicacion > span > input
#    _Click visible element    css:#fecha-adjudicacion > span > div > div > div > div.p-datepicker-calendar-container > table > tbody > tr:nth-child(2) > td:nth-child(4)
#    _Set input text           css:#control_numero_pedido > app-input > input                                                                                                222222
#    _Set input text           css:#control_materia > app-input > input                                                                                                      33333

#    # SUSTENTO FINANCIERO
#    _Select visible item     css:#control_pmo_codigo > app-select > select       31 
#    _Select visible item     css:#control_lp_codigo > app-select > select        10952
#    _Select visible item     css:#control_pep2_capex_id > app-select > select    P-0077-21-0102-40050-601

#    # Extras
#    _Click visible element    css:#fecha-inicio-ot > span > input
#    _Click visible element    css:#fecha-inicio-ot > span > div > div > div > div > table > tbody > tr:nth-child(1) > td> span
#    _Click visible element    css:#fecha-termino-ot > span > input
#    _Click visible element    css:#fecha-termino-ot > span > div > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(7) > span
#    _Select visible item      css:#control_admin_contrato > app-select > select                                                                  Jose NOKIA Campos Jaraquemada
#    _Set input text           css:#observaciones                                                                                                 Descripcion de algo Ordinario

#    _Click visible element    css:#create-button
#    #                         _Navegate to          Listar OT

#    _Have to exist in table/tab       Abiertas     OT ORDINARIO
#    _Validate column data             3            OT ORDINARIO
#    _Validate column data             4            Autorizar OT por Proveedor
#    _Validate column data             8            Contrato Ordinario
#    _Validate column data             9            NOKIA SOLUTIONS AND NETWORKS CHILE LTDA
#    _Validate column data             10           JESSICA MOVISTAR CASTILLO 1
#    _Have No to exist in table/tab    Cerradas     OT ORDINARIO
#    _Have No to exist in table/tab    Ejecucion    OT ORDINARIO

#    #_Navegate to                  Listar OT
#    _Have to exist in table/tab    Abiertas                                                                    OT ORDINARIO
#    _Click visible element         css:#action-buttons > app-menu > button
#    _Click visible element         css:#action-buttons > app-menu > p-menu > div > ul > li:nth-child(1) > a

#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    Ordinario
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    Contrato Ordinario
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(4) > td:nth-child(2)    Cub Ordinario
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(8) > td:nth-child(2)    Autorizar OT por Proveedor
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(9) > td:nth-child(2)    Abierta

#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    JESSICA MOVISTAR CASTILLO 1
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    JESSICA MOVISTAR CASTILLO 1
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(3) > td:nth-child(2)    Descripcion de algo Ordinario

#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    12312312d
#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(3) > td:nth-child(2)    222222
#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(4) > td:nth-child(2)    33333

#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    CAPEX
#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    31
#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(3) > td:nth-child(2)    10952
#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(4) > td:nth-child(2)    P-0077-21-0102-40050-601

#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card:nth-child(2) > div > div.card-body > table > tr.ng-star-inserted > td:nth-child(1)    ADM_CONTRATO
#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card:nth-child(2) > div > div.card-body > table > tr.ng-star-inserted > td:nth-child(2)    Jose NOKIA Campos Jaraquemada

#    close browser

# Crear OT FIJO
#    _Login    mgestor1    asda    Gestor/JP

#    _Navegate to    Crear OT

#    # BASE
#    _Set input text         css:#control_nombre > app-input > input             OT FIJO
#    _Select visible item    css:#contratosUser > app-select > select            UNIFICADO-2019-FIJA
#    _Select visible item    css:#control_cubicacion_id > app-select > select    Cub Fijo

#    # FIJO
#    _Select visible item      css:#control_tipo_numero_interno_id > app-select > select    @TIEMPOS
#    _Set input text           css:#control_numero_interno > app-input > input              3123123
#    _Click visible element    css:#button-agregar > button

#    # SUSTENTO FINANCIERO
#    _Select visible item     css:#control_pmo_codigo > app-select > select       31 
#    _Select visible item     css:#control_lp_codigo > app-select > select        10952
#    _Select visible item     css:#control_pep2_capex_id > app-select > select    P-0077-21-0102-40050-601

#    # Extras
#    _Click visible element    css:#fecha-inicio-ot > span > input
#    _Click visible element    css:#fecha-inicio-ot > span > div > div > div > div > table > tbody > tr:nth-child(1) > td> span
#    _Click visible element    css:#fecha-termino-ot > span > input
#    _Click visible element    css:#fecha-termino-ot > span > div > div > div > div > table > tbody > tr:nth-child(2) > td:nth-child(7) > span
#    _Select visible item      css:#control_admin_contrato > app-select > select                                                                  Carlos COASIN Campos Jaraquemada
#    _Set input text           css:#observaciones                                                                                                 Descripcion de algo FIJO

#    _Click visible element    css:#create-button

#    # _Navegate to    Listar OT

#    _Have to exist in table/tab       Abiertas     OT FIJO
#    _Validate column data             3            OT FIJO
#    _Validate column data             4            Autorizar OT por Proveedor
#    _Validate column data             8            UNIFICADO-2019-FIJA
#    _Validate column data             9            COASIN
#    _Validate column data             10           JESSICA MOVISTAR CASTILLO 1
#    _Have No to exist in table/tab    Cerradas     OT FIJO
#    _Have No to exist in table/tab    Ejecucion    OT FIJO

#    # _Navegate to                 Listar OT
#    _Have to exist in table/tab    Abiertas                                                                    OT FIJO
#    _Click visible element         css:#action-buttons > app-menu > button
#    _Click visible element         css:#action-buttons > app-menu > p-menu > div > ul > li:nth-child(1) > a

#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    Fijo
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    UNIFICADO-2019-FIJA
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(4) > td:nth-child(2)    Cub Fijo
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(8) > td:nth-child(2)    Autorizar OT por Proveedor
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(1) > div > div.card-body > table > tr:nth-child(9) > td:nth-child(2)    Abierta

#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    JESSICA MOVISTAR CASTILLO 1
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    JESSICA MOVISTAR CASTILLO 1
#    _Element text should be    css:app-info-ot > div > div:nth-child(1) > app-card:nth-child(3) > div > div.card-body > table > tr:nth-child(3) > td:nth-child(2)    Descripcion de algo FIJO

#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    @TIEMPOS
#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card > div > div.card-body > table:nth-child(3) > tr:nth-child(2) > td    3123123

#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(1) > td:nth-child(2)    CAPEX
#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(2) > td:nth-child(2)    31
#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(3) > td:nth-child(2)    10952
#    _Element text should be    css:app-info-ot > div > div.col-xs-12.col-md-12 > div > app-card > div > div.card-body > table > tr:nth-child(4) > td:nth-child(2)    P-0077-21-0102-40050-601

#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card:nth-child(2) > div > div.card-body > table > tr.ng-star-inserted > td:nth-child(1)    ADM_CONTRATO
#    _Element text should be    css:app-info-ot > div > div:nth-child(2) > app-card:nth-child(2) > div > div.card-body > table > tr.ng-star-inserted > td:nth-child(2)    Carlos COASIN Campos Jaraquemada

#    close browser