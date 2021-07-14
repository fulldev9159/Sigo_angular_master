*** Settings ***
Documentation    Carga automatizada de perfiles y usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ../resource.robot

*** Variables ***
@{permisos admin contrato}=    Listar
...                            Autorizar OT
...                            Asignar coordinador
...                            Autorizar actas
...                            Registrar en libro de obras
...                            Agregar LPUs adicionales

@{permisos coordinador}=    Listar
...                         Asignar trabajador

@{permisos supervisor trabajos}=    Listar
...                                 Validar trabajos
...                                 Finalizar trabajos
...                                 Registrar en libro de obras
...                                 Agregar LPUs adicionales

@{permisos gestor}=    Listar
...                    Crear
...                    Editar
...                    Anular
...                    Autorizar actas
...                    Finalizar OT
...                    Autotizar LPUs adicionales
...                    Listar OTs del Area

@{permisos Cubicacion gestor}=    Listar
...                               Crear
...                               Editar
...                               Eliminar
...                               Copiar

@{permisos jerarquia superior}=    Listar
...                                Autorizar pagos

*** Test Cases ***
Index
    [Tags]                  automatizacion
    Open Browser To Page    ${url}
    Login                   jcastill          password

    ### CREAR PERFILES ####
    Navegar al menu                       Perfil
    Acceder a creacion de nuevo perfil
    Set nombre perfil                     Admin Contratos EC
    Set descripcion perfil                Administrador de contratos de la empresa contratista
    Set Permisos modulo                   OT                                                      @{permisos admin contrato}
    Guardar perfil

    Acceder a creacion de nuevo perfil
    Set nombre perfil                     Coordinador EC
    Set jefatura                          Admin Contratos EC
    Set descripcion perfil                Es el coordinador de la empresa contratista
    Set Permisos modulo                   OT                                             @{permisos coordinador}
    Guardar perfil

    Acceder a creacion de nuevo perfil
    Set nombre perfil                     Supervisor Trabajos EC
    Set jefatura                          Coordinador EC
    Set descripcion perfil                Es el perfil que se encarga de supervisar los trabajos
    Set Permisos modulo                   OT                                                        @{permisos supervisor trabajos}
    Guardar perfil


    Acceder a creacion de nuevo perfil
    Set nombre perfil                     Gerente Telefónica
    Set descripcion perfil                Gerente del área de telefónica
    Set Permisos modulo                   OT                                @{permisos jerarquia superior}
    Guardar perfil

    Acceder a creacion de nuevo perfil
    Set nombre perfil                     SubGerente Telefónica
    Set jefatura                          Gerente Telefónica
    Set descripcion perfil                SubGerente del área de telefónica
    Set Permisos modulo                   OT                                   @{permisos jerarquia superior}
    Guardar perfil

    Acceder a creacion de nuevo perfil
    Set nombre perfil                     Jefe de Área Telefónica
    Set jefatura                          SubGerente Telefónica
    Set descripcion perfil                Jefe de área de telefónica
    Set Permisos modulo                   OT                            @{permisos jerarquia superior}
    Guardar perfil

    Acceder a creacion de nuevo perfil
    Set nombre perfil                     Gestor Telefónica
    Set jefatura                          Jefe de Área Telefónica
    Set descripcion perfil                Gestor de proyectos de telefónica
    Set Permisos modulo                   OT                                   @{permisos gestor}
    Set Permisos modulo                   CUBICACION                           @{permisos Cubicacion gestor}
    Guardar perfil


    ### CREAR USUARIOS ####
    Navegar al menu                        Usuario
    Acceder a creacion de nuevo usuario
    Set username                           jadmincontrato
    Set nombres y apellidos                Esteban               Alarcon
    Set email                              admin@contrato.com
    Set documento de identidad             12345671123
    Set tipo empresa                       proveedor
    Set empresa                            COASIN
    Set area                               Contratista
    Set todos los contratos
    Set perfil usuario                     Admin Contratos EC
    Guardar usuario

    Acceder a creacion de nuevo usuario
    Set username                           jcoordinador
    Set nombres y apellidos                Gustavo               Rodríguez
    Set email                              admin@contrato.com
    Set documento de identidad             12345671123
    Set tipo empresa                       proveedor
    Set empresa                            COASIN
    Set area                               Contratista
    Set todos los contratos
    Set perfil usuario                     Coordinador EC
    Set superior directo                   Esteban Alarcon
    Guardar usuario

    Acceder a creacion de nuevo usuario
    Set username                           jsupervisor
    Set nombres y apellidos                Oscar                     Cancino
    Set email                              admin@contrato.com
    Set documento de identidad             12345671123
    Set tipo empresa                       proveedor
    Set empresa                            COASIN
    Set area                               Contratista
    Set todos los contratos 
    Set perfil usuario                     Supervisor Trabajos EC
    Set superior directo                   Gustavo Rodríguez         
    Guardar usuario

    Acceder a creacion de nuevo usuario
    Set username                           jgerente
    Set nombres y apellidos                Sofía                                            Cancino
    Set email                              admin@contrato.com
    Set documento de identidad             12345671123
    Set tipo empresa                       movistar
    Set empresa                            Telefonica Chile Servicios Corporativos Ltda.
    Set area                               CONECTIVIDAD Y BACKHAUL
    Set todos los contratos 
    Set perfil usuario                     Gerente Telefónica
    Guardar usuario

    Acceder a creacion de nuevo usuario
    Set username                           jsubgerente
    Set nombres y apellidos                Camilo                                           Cancino
    Set email                              admin@contrato.com
    Set documento de identidad             12345671123
    Set tipo empresa                       movistar
    Set empresa                            Telefonica Chile Servicios Corporativos Ltda.
    Set area                               CONECTIVIDAD Y BACKHAUL
    Set todos los contratos 
    Set perfil usuario                     SubGerente Telefónica
    Set superior directo                   Sofía Cancino                                    
    Guardar usuario

    Acceder a creacion de nuevo usuario
    Set username                           jjefearea
    Set nombres y apellidos                Juan                                             Cancino
    Set email                              admin@contrato.com
    Set documento de identidad             12345671123
    Set tipo empresa                       movistar
    Set empresa                            Telefonica Chile Servicios Corporativos Ltda.
    Set area                               CONECTIVIDAD Y BACKHAUL
    Set todos los contratos 
    Set perfil usuario                     Jefe de Área Telefónica
    Set superior directo                   Camilo Cancino                                   
    Guardar usuario

    Acceder a creacion de nuevo usuario
    Set username                           jgestor
    Set nombres y apellidos                Francisca                                        Cancino
    Set email                              admin@contrato.com
    Set documento de identidad             12345671123
    Set tipo empresa                       movistar
    Set empresa                            Telefonica Chile Servicios Corporativos Ltda.
    Set area                               CONECTIVIDAD Y BACKHAUL
    Set todos los contratos 
    Set perfil usuario                     Gestor Telefónica
    Set superior directo                   Juan Cancino                                     
    Guardar usuario