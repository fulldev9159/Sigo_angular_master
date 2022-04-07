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
    _Login                  mgestor1                               asda       Gestor/JP
    _Navegate to            Crear Cubicacion
    _Set input text         css:#nomnbreCub > app-input > input    CubTest
    _Select visible item    css:#tipoCub > app-select > select     Full