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

@{permisos ADMIN EECC}=    Listar
...                        Asignar coordinador

*** Test Cases ***

Crear un perfil Gestor
   # Scenario: El administrador va a crear un nuevo perfil gestor
   # Given: El administrador llega a la página para crear perfiles
   # When: Registre todos los datos del nuevo perfil
   # And presione el botón crear perfil
   # Then: El usuario nuevo debe aparecer en el listar perfiles

    _Login                        admin                                                                                                               M0v15tar.                 Admin
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

    # Then: El usuario nuevo debe aparecer en el listar perfiles
    _Element should exist in table    TestGestor
    _Validate column data             2             Gestor/JP (Telefónica)
    _Validate column data             3             Descripción test
    close browser

Ver permisos del perfil creado
   # Scenario: El administrador necesita observar los permisos del perfil TestGestor
   # Given: El administrador llega a la página de listar perfiles
   # When: Presione Ver Permisos
   # Then: Al administrador debe poder visuarlizar los permisos del perfil

    _Login                        admin                                              M0v15tar.    Admin
    _Navegate to                  Perfil
    _Table should display data
    # When: Presione Ver Permisos
    _Search table                 TestGestor
    _Click visible element        css:#action-buttons > div > button:nth-child(1)
    sleep                         1

    # Then: Al administrador debe poder visuarlizar los permisos del perfil
    ${cantidad de filas}=    get element count    css:p-dialog>div>div>div:nth-child(2)>div>div:nth-child(1)> p-listbox > div > div > ul > li
    ${status}=               Evaluate             ${cantidad de filas} == 4
    Should Be True           ${status}

    ${cantidad de filas}=    get element count    css:p-dialog>div>div>div:nth-child(2)>div>div:nth-child(2)> p-listbox > div > div > ul > li
    ${status}=               Evaluate             ${cantidad de filas} == 2
    Should Be True           ${status}
    close browser

Editar un perfil Gestor
   # Scenario: El administrador va a editar el perfil recién creado
   # Given: El administrador llega a la página para editar perfil TestGestor
   # When: Registre todos los cambios del perfil
   # And presione el botón guardar perfil
   # Then: El usuario nuevo debe aparecer en el listar perfiles con los cambios realizados

    Login                         admin                                              pass    Admin
    _Navegate to                  Perfil
    _Table should display data
    # Given: El administrador llega a la página para editar perfil TestGestor
    _Search table                 TestGestor
    _Click visible element        css:#action-buttons > div > button:nth-child(2)
    sleep                         1

     # When: Registre todos los cambios del perfil
    _Set input text           css:#nombre-perfil-input > app-input > input                                                                        EditTest
    _Set input text           css:#descripcion-perfil-input > app-textarea > textarea                                                             UpdateDescription
    _Select visible item      css:#rol-perfil-select > app-select > select                                                                        Administrador (EECC)
    sleep                     1
    _Set Permisos modulo      OT                                                                                                                  @{permisos ADMIN EECC}
    # And presione el botón guardar perfil
    _Click visible element    css:app-form-pro > div > app-card > div > div.card-body > div > div.col-md-3 > div:nth-child(7) > div > p-button

    # Then: El usuario nuevo debe aparecer en el listar perfiles con los cambios realizados
    _Element should exist in table    EditTest
    _Validate column data             2           Administrador (EECC)
    _Validate column data             3           UpdateDescription
    close browser

Elimiar Perfil
    # Scenario: El administrador necesita eliminar el perfil EditTest
   #  Given: El administrador llega a la página de listar perfiles
   # When: Presione el botón de eliminar del perfil EditTest
   # And presiona confirmar
   # Then: El perfil "EditTest" no debe aparecer en el listado

    _Login                                admin                                                M0v15tar.    Admin
    _Navegate to                          Perfil
    _Table should display data
    # When: Presione el botón de eliminar del perfil EditTest
    _Search table                         EditTest
    _Click visible element                css:#action-buttons > div >.button.eliminar-color
    _Click visible element                css:#delete-perfil-user-button
    sleep                                 1
   # Then
    _Element should not exist in table    EditTest
    close browser