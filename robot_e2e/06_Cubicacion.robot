*** Settings ***
Documentation    Test de funcionanildad del módulo Cubicacion.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/perfil_resource.robot

*** Test Cases ***

Crear cubicación
   # Scenario: El usuario mgestor 1 con perfil Gestor/JP va a crear una nueva cubicación
   # Given: El usuario mgestor 1 con perfil Gestor/JP entra en la página para crear cubicación
   # When: Registre todos los datos necesarios
   # And presione el botón crear cubicación
   # Then: La cubicación debe aparecer en el listado con los datos correctos

    # Given: El usuario mgestor 1 con perfil Gestor/JP entra en la página para crear cubicación
    _Login                  mgestor1                                      asda                 Gestor/JP
    _Navegate to            Crear Cubicacion
      # When: Registre todos los datos necesarios
    _Set input text         css:#nomnbreCub > app-input > input           CubTest
    _Select visible item    css:#tipoCub > app-select > select            Full
    _Select visible item    css:#contratosUser > app-select > select      SBE
    _Select visible item    css:#agencias > app-select > select           ARICA
    _Select visible item    css:#proveedores > app-select > select        12121212 - COASIN
    _Set input text         css:#direcciondesde > app-input > input       las casas norte
    _Set input text         css:#alturadesde > app-input > input          1714
    _Set input text         css:#direccionhasta > app-input > input       las casas sur
    _Set input text         css:#alturahasta > app-input > input          1817
    _Set input text         css:#descripcion > app-textarea > textarea    Cub descripción
    _Select visible item    css:#actividad > app-select > select          CANALIZACION
    _Select visible item    css:#tiposervicio > app-select > select       DTH