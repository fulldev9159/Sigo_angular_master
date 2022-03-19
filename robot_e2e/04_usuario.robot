*** Settings ***
Documentation    Test de funcionanildad del módulo Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot

*** Test Cases ***

Editar Usuario
    _Login          admin      pass    Admin
    _Navegate to    Usuario
    # _Table should display data