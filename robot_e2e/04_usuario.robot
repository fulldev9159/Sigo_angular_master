*** Settings ***
Documentation    Test de funcionanildad del módulo Usuarios.
...
...          This test has a workflow that is created using keywords in
...          the imported resource file.
Resource     ./resources/general_resource.robot
Resource     ./resources/login_resource.robot
# Library    DependencyLibrary

*** Test Cases ***

Crear Usuario Contratista
   # Scenario: El administrador va a crear un nuevo usuario para la empresa COASIN
   # Given: El administrador llega a la página para crear usuarios
   # When: Registre todos los datos del nuevo usuario
   # And presione el botón crear usuario
   # Then: El usuario nuevo debe aparecer en el listar usuario

    _Login                        admin                   M0v15tar.    Admin
    _Navegate to                  Usuario
    _Table should display data
   # Given: El administrador llega a la página para crear usuarios
    _Click visible element        css:#add-user-button

   #When: Registre todos los datos del nuevo usuario
    _Set input text              css:#guia-input > app-input > div >div:nth-child(2)>input           UserTestContratista
    _Set input text              css:#rut-input > app-input > div >div:nth-child(2)>input            123456222-9
    _Set input text              css:#nombres-input > app-input > div >div:nth-child(2)>input        Test Name Contratista
    _Set input text              css:#apellidos-input > app-input > div >div:nth-child(2)>input      Test Apellido Contratista
    _Set input text              css:#email-input > app-input > div >div:nth-child(2)>input          test@test.com
   # _Set input text                                    css:#celular-input > input                                          77777777776
    _Click visible element       css:#proveedor > div > div.p-radiobutton-box
    capture page screenshot      /opt/robotframework/reports/usuarioAntesPro.png
    _Select visible item         css:#proveedor-select > app-select > select                         NOKIA SOLUTIONS AND NETWORKS CHILE LTDA 
    capture page screenshot      /opt/robotframework/reports/usuarioDespuesPro.png
    _Select visible item         css:#area-select > app-select > select                              Contratista
    _Click visible element       css:#contratos_marco_multi 
    ${select multi contratos}    set variable                                                        contratos_marco_multi >div>div:nth-child(4)>div:nth-child(2)>ul>cdk-virtual-scroll-viewport>div:nth-child(1)    
    _Click visible element       css:#${select multi contratos}>p-multiselectitem:nth-child(1)>li
   #  _Click visible element       css:#${select multi contratos}>p-multiselectitem:nth-child(2)>li
   # And presione el botón crear usuario
    _Click visible element       css:#submit-user

    sleep                             0.5
   #Then: El usuario nuevo debe aparecer en el listar usuario
    _Element should exist in table    UserTestContratista
    _Validate column data             2                      123456222-9
    _Validate column data             3                      Test Name Contratista
    _Validate column data             4                      Test Apellido Contratista
    _Validate column data             5                      Nokia Solutions And Networks Chile Ltda
    _Validate column data             6                      Contratista
   # _Validate column data                                       7                      77777777776
    _Validate column data             8                      test@test.com
    _Validate column data             11                     Sin firma
    _Validate column data             12                     Activo

    close browser


Crear Usuario Movistar
   # Scenario: El administrador va a crear un nuevo usuario para la empresa Movistar con todos los contratos
   # Given: El administrador llega a la página para crear usuarios
   # When: Registre todos los datos del nuevo usuario
   # And presione el botón crear usuario
   # Then: El usuario nuevo debe aparecer en el listar usuario

    _Login                        admin                   M0v15tar.    Admin
    _Navegate to                  Usuario
    _Table should display data
   # Given: El administrador llega a la página para crear usuarios
    _Click visible element        css:#add-user-button

   #When: Registre todos los datos del nuevo usuario
    _Set input text           css:#guia-input > app-input > div >div:nth-child(2)>input          UserTestMovistar
    _Set input text           css:#rut-input > app-input > div >div:nth-child(2)>input           123456222-9
    _Set input text           css:#nombres-input > app-input > div >div:nth-child(2)>input       Test Name Movistar
    _Set input text           css:#apellidos-input > app-input > div >div:nth-child(2)>input     Test Apellido Movistar
    _Set input text           css:#email-input > app-input > div >div:nth-child(2)>input         test@test.com
   # _Set input text                                    css:#celular-input > input                                         77777777776
    _Click visible element    css:#movistar > div > div.p-radiobutton-box
    sleep                     1
    _Select visible item      css:#proveedor-select > app-select > select                        Telefonica Chile Servicios Corporativos Ltda.
    sleep                     1
    _Select visible item      css:#area-select > app-select > select                             Ingenieria Acceso Movil
    _Click visible element    css:#contratos_marco_multi 
    _Click visible element    css:#contratos_marco_multi > div > div > div > div:nth-child(1)
   # And presione el botón crear usuario
    _Click visible element    css:#submit-user

   #Then: El usuario nuevo debe aparecer en el listar usuario
    _Element should exist in table    UserTestMovistar
    _Validate column data             2                   123456222-9
    _Validate column data             3                   Test Name Movistar
    _Validate column data             4                   Test Apellido Movistar
    _Validate column data             5                   Telefonica Chile Servicios Corporativos Ltda.
    _Validate column data             6                   Ingenieria Acceso Movil
   # _Validate column data                                       7                   77777777776
    _Validate column data             8                   test@test.com
    _Validate column data             11                  Sin firma
    _Validate column data             12                  Activo

    close browser

Ver los contratos
   #                                                                                       Depends on test    Crear Usuario Contratista
   #                                                                                       Depends on test    Crear Usuario Movistar
   # Scenario: El administrador necesita observar los contratos del usuario contratista
   # Given: El administrador llega a la página de listar usuarios
   # When: Abra el menú
   # And Presione Ver Contratos
   # Then: Al usuario debe poder visuarlizar los contratos del usuario
    _Login                        admin            M0v15tar.              Admin
    _Navegate to                  Usuario
   # Given: El administrador llega a la página de listar usuarios
    _Table should display data
   # When: Abra el menú
   # And Presione Ver Contratos
    _SubMenu                      Ver contratos    UserTestContratista
    sleep                         1

   # Then: Al usuario debe poder visuarlizar los contratos del usuario UserTestContratista
    ${items}=                  Get WebElements                                                          css:p-dialog > div > div > div > p-listbox > div > div > ul > li
    _Element text should be    ${items}[0]                                                              SBE
    _Element text should be    ${items}[1]                                                              Contrato Ordinario
    _Click visible element     css:app-modal:nth-child(4) > p-dialog > div > div > div> div > button

    _SubMenu                 Ver contratos        UserTestMovistar
    sleep                    1
   # Then: Al usuario debe poder visuarlizar los contratos del usuario UserTestMovistar
    ${cantidad de filas}=    get element count    css:p-dialog > div > div > div > p-listbox > div > div > ul > li
    ${status}=               Evaluate             ${cantidad de filas} == 23
    Should Be True           ${status}
    close browser

Agregar firma a usuarios
   # Scenario: El administrador necesita agregar la firma al usuario Movistar y al usuario Contratista
   # Given: El administrador llega a la página de listar usuarios
   # When: Abra el menú
   # And Presione agregar firma
   # And Carge una imagen de la firma
   # And Presione en cargar
   # Then: Al usuario debe aparecer como con firma el listar usuarios

    _Login                        admin      M0v15tar.    Admin
    _Navegate to                  Usuario
   # Given: El administrador llega a la página de listar usuarios
    _Table should display data

   # When: Abra el menú
    _SubMenu                  Cargar Firma                                                                                                                                                  UserTestContratista
   # And Carge una imagen de la firma
    Choose File               css:app-list-user > app-modal:nth-child(5) > p-dialog > div > div > div > form > p-fileupload > div > div.p-fileupload-buttonbar > span > input[type=file]    ${CURDIR}/images/Ambiente.PNG
   # And Presione en cargar
    _Click visible element    css:#addFirma-button
    sleep                     1

   # Then: Al usuario debe aparecer como con firma el listar usuarios
    _Element should exist in table    UserTestContratista
    _Validate column data             11                     Con firma
    close browser


Editar usuario Contratista
   # Scenario: El administrador necesita cambiar a Movistar al usuario Contratista
   # Given: El administrador llega a la página para editar el usuario contratista
   # When: Edite los campos
   # And presione el botón guardar
   # Then: El cambio se debe ver reflejado en el listar usuarios
    _Login                        admin      M0v15tar.    Admin
    _Navegate to                  Usuario
    _Table should display data

   # Given: El administrador llega a la página para editar el usuario contratista
    _SubMenu    Editar    UserTestContratista
    sleep       1

   # When: Edite los campos
    _Set input text           css:#rut-input > app-input > div >div:nth-child(2)>input           9999999-9
    _Set input text           css:#nombres-input > app-input > div >div:nth-child(2)>input       TestEdit Name Movistar
    _Set input text           css:#apellidos-input > app-input > div >div:nth-child(2)>input     TestEdit Apellido Movistar
    _Set input text           css:#email-input > app-input > div >div:nth-child(2)>input         TestEdit@test.com
   # _Set input text                  css:#celular-input > input                                         77777777776
    _Click visible element    css:#movistar > div > div.p-radiobutton-box
    sleep                     1
    _Select visible item      css:#proveedor-select > app-select > select                        Telefonica Chile Servicios Corporativos Ltda.
    sleep                     1
    _Select visible item      css:#area-select > app-select > select                             Ingenieria Acceso Movil
    _Click visible element    css:#contratos_marco_multi 
    _Click visible element    css:#contratos_marco_multi > div > div > div > div:nth-child(1)
   # And presione el botón guardar
    _Click visible element    css:#submit-user

   # Then: El cambio se debe ver reflejado en el listar usuarios
    _Element should exist in table    UserTestContratista
    _Validate column data             2                      9999999-9
    _Validate column data             3                      Testedit Name Movistar
    _Validate column data             4                      Testedit Apellido Movistar
    _Validate column data             5                      Telefonica Chile Servicios Corporativos Ltda.
    _Validate column data             6                      Ingenieria Acceso Movil
   # _Validate column data                                          7                      77777777776
    _Validate column data             8                      TestEdit@test.com
    _Validate column data             11                     Con firma
    _Validate column data             12                     Activo


    _SubMenu                 Ver contratos        UserTestContratista
    sleep                    1
    ${cantidad de filas}=    get element count    css:p-dialog > div > div > div > p-listbox > div > div > ul > li
    ${status}=               Evaluate             ${cantidad de filas} == 23
    Should Be True           ${status}
    close browser

Bloquear y activar Contratista
   # Scenario: El Administrador bloquea al usuario contratista
   # Given: El administrador llega a la página de listar usuarios
   # When: Abra el menú
   # And Presione Bloquear
   # And Confirmar
   # Then: El usuario debe aparecer como bloqueado en el sistema
    _Login                        admin      M0v15tar.    Admin
    _Navegate to                  Usuario
    _Table should display data

   #When: Abra el menú
   # And Presione Bloquear
   # And Confirmar
    _SubMenu                  Bloquear                     UserTestContratista
    sleep                     1
    _Click visible element    css:#activate-user-button

   #Then: El usuario debe aparecer como bloqueado en el sistema
    _Element should exist in table    UserTestContratista
    _Validate column data             12                     Bloqueado

    _SubMenu                          Activar                      UserTestContratista
    sleep                             1
    _Click visible element            css:#activate-user-button
    _Element should exist in table    UserTestContratista
    _Validate column data             12                           Activo
    close browser

Eliminar Contratista
   # Scenario: El Administrador necesita eliminar al usuario contratista
   # Given: El administrador llega a la página de listar usuarios
   # When: Abra el menú
   # And Presione Eliminar
   # And Confirmar
   # Then: El usuario ya no debe aparecer en el listar usuarios

    _Login                        admin      M0v15tar.    Admin
    _Navegate to                  Usuario
    _Table should display data

   # When: Abra el menú
   # And Presione Eliminar
   # And Confirmar
    _SubMenu                  Eliminar                   UserTestContratista
    sleep                     1
    _Click visible element    css:#delete-user-button

    _Element should not exist in table    UserTestContratista
    close browser

Agregar un perfil a un usuario
   # Scenario: El administrador necesita agregar el perfil "Gestor" al usuario "UserTestMovistar"
   # Given: El administrador ha ingresado a la administración de perfiles del usaurio "UserTestMovistar"
   # When: Presione el botón agregar perfil
   # And Seleccione perfil "Gestor"
   # And Seleccione superior "JEF MOVISTAR CASTILLO 2 (Jefe de Área Telefónica)"
   # And Presione el botón agregar
   # Then: El perfil "Gestor" debe aparecer en el listado

    _Login                            admin                                          M0v15tar.                                            Admin
    _Navegate to                      Usuario
    _Table should display data
   # Given
    _SubMenu                          Administrar Perfiles                           UserTestMovistar
   # When
    _Click visible element            css:#add-perfil-user-button
    _Select visible item              css:#perfil-usuario-form>app-select>select     Gestor/JP
    _Select visible item              css:#superior-perfil-form>app-select>select    JEF MOVISTAR CASTILLO 2 (Jefe de Área Telefónica)
    _Click visible element            css:#add-user-perfil-button
   # Then
    _Element should exist in table    Gestor/JP
    _Validate column data             2                                              Jef Movistar Castillo 2
    _Validate column data             3                                              Propio
    close browser

Editar superior a un perfil
   # Scenario: El administrador necesita cambiar el superior al usuario "UserTestMovistar" perfil "Gestor/JP"
   # Given: El administrador ha ingresado a la administración de perfiles del usaurio "UserTestMovistar"
   # When: Ingresa a la edición del perfil "Gestor/JP"
   # And Seleccione superior "No posee superior directo"
   # And Presione el botón editar
   # Then: En la tabla listar perfiles, para el perfil "Gestor/JP" su superior debe ser ""

    _Login                            admin                                                         M0v15tar.                    Admin
    _Navegate to                      Usuario
    _Table should display data
    capture page screenshot           /opt/robotframework/reports/usuario.png
   # Given
    _SubMenu                          Administrar Perfiles                                          UserTestMovistar
   # When
    _Search table                     Gestor/JP
    _Click visible element            css:#action-buttons > div > button.ui.button.generic-color
    sleep                             1
    _Select visible item              css:#superior-perfil-form>app-select>select                   No posee superior directo
    _Click visible element            css:#add-user-perfil-button
   # Then
    _Element should exist in table    Gestor/JP
    _Validate column data             2                                                             ${EMPTY}
    close browser

Eliminar perfil usuario
   # Scenario: El administrador necesita eliminar el perfil "Gestor/JP" al usuario "UserTestMovistar"
   # Given: El administrador ha ingresado a la administración de perfiles del usaurio "UserTestMovistar"
   # When: Presione el botón de eliminar al perfil "Gestor/JP"
   # And presiona confirmar
   # Then: El perfil "Gestor/JP" no debe aparecer en el listado

    _Login                                admin                                                          M0v15tar.           Admin
    _Navegate to                          Usuario
    _Table should display data
   # Given
    _SubMenu                              Administrar Perfiles                                           UserTestMovistar
   # When
    _Search table                         Gestor/JP
    _Click visible element                css:#action-buttons > div > button.ui.button.eliminar-color
    _Click visible element                css:#delete-perfil-user-button
    sleep                                 1
   # Then
    _Element should not exist in table    Gestor/JP
    close browser