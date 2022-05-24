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
    _Login          mjefearea1    asda    Jefe de Área Telefónica
    _Navegate to    Listar OT

    _Have to exist in table/tab       Abiertas    OT BUCLE
    _Have to exist in table/tab       Abiertas    OT ORDINARIO
    _Have to exist in table/tab       Abiertas    OT FIJO
    _Have No to exist in table/tab    Abiertas    OT MOVIL

    _Have to exist in table/tab    Ejecucion    OT MOVIL
    _Validate column data          3            OT MOVIL
    _Validate column data          4            Autorizar inicialmente la OT
    _Validate column data          8            SBE
    _Validate column data          9            COASIN
    _Validate column data          10           JESSICA MOVISTAR CASTILLO 1

