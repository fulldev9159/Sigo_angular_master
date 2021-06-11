*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ../resource.robot

*** Variables ***
@{permisos admin contrato}=    Listar OT
...                            Ver detalles
...                            Autorizar OT
...                            Asignar coordinador OT
...                            Autorizar actas OT
...                            Registrar en libro de obras OT
...                            Autorizar lpu adicionales OT

@{permisos coordinador}=    Listar OT
...                         Asignar trabajador

@{permisos trabajador}=    Listar OT
... 

*** Test Cases ***
Index
    [Tags]                  automatizacion
    Open Browser To Page    ${url}
    Login                   jcastill          password
    Navegar al menu       Perfil

    Click boton Editar    AdminContrato
    Set Permisos OT    AdminContrato    @{permisos admin contrato}
    Click boton Editar    CoordinadorEC
    Set Permisos OT    CoordinadorEC    @{permisos coordinador}

    
    Editar Jefatura