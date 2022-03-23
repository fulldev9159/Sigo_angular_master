*** Settings ***
Documentation    Test de funcionanildad del módulo Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot

*** Test Cases ***

# Crear Usuario
#    # Scenario: El administrador va a crear un nuevo usuario
#    # Given: El administrador llega a la página para crear usuarios
#    # When: Registre todos los datos del nuevo usuario
#    # And presione el botón crear usuario
#    # Then: El usuario nuevo debe aparecer en el listar usuario

#    _Login                        admin                   pass    Admin
#    _Navegate to                  Usuario
#    _Table should display data
#    _Click visible element        css:#add-user-button
#    close browser

Agregar un perfil a un usuario
    # Scenario: El administrador necesita agregar el perfil "Jefe de área" al usuario "gestor2"
    # Given: El administrador ha ingresado a la administración de perfiles del usaurio "gestor2"
    # When: Presione el botón agregar perfil
    # And Seleccione perfil "Jefe de Área Telefónica"
    # And Seleccione superior "SUBGEN MOVISTAR CASTILLO 1 (SubGerente Telefónica)"
    # And Presione el botón agregar
    # Then: El perfil "Jefe de área" debe aparecer en el listado

    _Login                            admin                                          pass                                                  Admin
    _Navegate to                      Usuario
    _Table should display data
    # Given
    _SubMenu                          Administrar Perfiles                           gestor2
    # When
    _Click visible element            css:#add-perfil-user-button
    _Select visible item              css:#perfil-usuario-form>app-select>select     Jefe de Área Telefónica
    _Select visible item              css:#superior-perfil-form>app-select>select    SUBGEN MOVISTAR CASTILLO 1 (SubGerente Telefónica)
    _Click visible element            css:#add-user-perfil-button
    # Then
    _Element should exist in table    Jefe de Área Telefónica
    _Validate column data             2                                              Subgen Movistar Castillo 1
    _Validate column data             3                                              Propio
    close browser

Editar superior a un perfil
    # Scenario: El administrador necesita cambiar el superior al usuario "gestor2" perfil "Jefe de Área Telefónica"
    # Given: El administrador ha ingresado a la administración de perfiles del usaurio "gestor2"
    # When: Ingresa a la edición del perfil "Jefe de Área Telefónica"
    # And Seleccione superior "GEN MOVISTAR CASTILLO 1 (Gerente Telefónica)"
    # And Presione el botón editar
    # Then: En la tabla listar perfiles, para el perfil "Jefe de Área Telefónica" su superior debe ser "GEN MOVISTAR CASTILLO 1 (Gerente Telefónica)"

    _Login                            admin                                          pass                                            Admin
    _Navegate to                      Usuario
    _Table should display data
    # Given
    _SubMenu                          Administrar Perfiles                           gestor2
    # When
    _SubMenu                          Editar superior                                Jefe de Área Telefónica
    sleep                             1
    _Select visible item              css:#superior-perfil-form>app-select>select    GEN MOVISTAR CASTILLO 1 (Gerente Telefónica)
    _Click visible element            css:#add-user-perfil-button
    # Then
    _Element should exist in table    Jefe de Área Telefónica
    _Validate column data             2                                              Gen Movistar Castillo 1
    close browser

Eliminar perfil usuario
    # Scenario: El administrador necesita eliminar el perfil "Jefe de área" al usuario "gestor2"
    # Given: El administrador ha ingresado a la administración de perfiles del usaurio "gestor2"
    # When: Presione el botón de eliminar al perfil "Jefe de área"
    # And presiona confirmar
    # Then: El perfil "Jefe de área" no debe aparecer en el listado

    _Login                                admin                             pass                       Admin
    _Navegate to                          Usuario
    _Table should display data
    # Given
    _SubMenu                              Administrar Perfiles              gestor2
    # When
    _SubMenu                              Eliminar                          Jefe de Área Telefónica
    _Click visible element                css:#delete-perfil-user-button
    sleep                                 1
    # Then
    _Element should not exist in table    Jefe de Área Telefónica
    close browser