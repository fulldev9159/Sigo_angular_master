*** Settings ***
Documentation    Test de funcionanildad del modulo de Crear OT.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    resource.robot

*** Test Cases ***
Crear OT
    Open Browser To Page        ${url}
    Login                       jcastill    password 
    Navegar al menu             Crear OT 
    Set Nombre OT               OT Robot Test
    Set Tipo OT                 OT
    Set Cubicacion de la OT     
    Set Plan Proyecto OT        3G -
    Set Sitio OT                NEWUMTS0061F7 - SAN PEDRO - CORONEL 1 RUTA COSITE
    Click Opex OT
    Set ID OPEX OT              04-38254
    Set Cuenta SAP OT           6051591
    Set CECO OT                 CECO provisorio
    Set CECO Provisorio         Robot CECO provisorio
    Set Fecha Inicio            
    Set Fecha Termino
    Set Proyecto OT             proyecto test(1)
    Set Observaciones OT        Robot Observaciones
    Guardar OT