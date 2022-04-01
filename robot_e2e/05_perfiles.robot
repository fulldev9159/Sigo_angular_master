*** Settings ***
Documentation    Test de funcionanildad del módulo Usuarios.
...
...          This test has a workflow that is created using keywords in
...          the imported resource file.
Resource     ./resources/general_resource.robot
Resource     ./resources/login_resource.robot
Resource     ./resources/perfil_resource.robot
# Library    DependencyLibrary

*** Variables ***
@{permisos OT}=    Listar
...                Crear
...                Editar
...                Anular


@{permisos CUBICACION}=    Listar
...                        Crear

*** Test Cases ***

Crear un perfil Gestor
   # Scenario: El administrador va a crear un nuevo perfil gestor
   # Given: El administrador llega a la página para crear perfiles
   # When: Registre todos los datos del nuevo perfil
   # And presione el botón crear perfil
   # Then: El usuario nuevo debe aparecer en el listar perfiles

    _Login                        admin                                                                                                               pass                      Admin
    _Navegate to                  Perfil
    _Table should display data
  # Given: El administrador llega a la página para crear perfiles
    _Click visible element        css:#add-profile-button
   # When: Registre todos los datos del nuevo perfil
    _Set input text               css:#nombre-perfil-input > app-input > input                                                                        TestGestor
    _Select visible item          css:#rol-perfil-select > app-select > select                                                                        Gestor/JP (Telefónica)
    _Set input text               css:#descripcion-perfil-input > app-textarea > textarea                                                             Descripción test
    sleep                         1
    _Set Permisos modulo          OT                                                                                                                  @{permisos OT}
    _Set Permisos modulo          CUBICACION                                                                                                          @{permisos CUBICACION}
    # And presione el botón crear perfil
    _Click visible element        css:app-form-pro > div > app-card > div > div.card-body > div > div.col-md-3 > div:nth-child(7) > div > p-button

    _Element should exist in table    TestGestor
    _Validate column data             2             Gestor/JP (Telefónica)
    _Validate column data             3             Descripción test