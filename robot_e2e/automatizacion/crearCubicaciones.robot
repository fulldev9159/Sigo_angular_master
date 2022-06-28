*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ../resource.robot

*** Test Cases ***
Index
    [Tags]    automatizacion
    Open Browser To Page    ${url}
    Login                   jcastill    password

   ## CREAR CUBICACIONES TEST
    Navegar al menu          Crear Cubicacion
    Crear Cubicacion         RobotCubicacion               SBE         COASIN    Región Metropolitana de Santiago    PROYECTO (FIJA)
    Click Visible Element    id:submit-user
    FOR                      ${i}                          IN RANGE    10        
    Click Visible Element    id:listarCubSubMenu           
    Crear Cubicacion         Instalación de router ${i} 5G   SBE         COASIN    Región Metropolitana de Santiago    PROYECTO (FIJA)
    Click Visible Element    id:submit-user
    END

    FOR                      ${i}                          IN RANGE    10        
    Click Visible Element    id:listarCubSubMenu           
    Crear Cubicacion         Instalación de router ${i} 4G   SBE         COASIN    Región Metropolitana de Santiago    PROYECTO (FIJA)
    Click Visible Element    id:submit-user
    END

    FOR                      ${i}                   IN RANGE    10
    Click Visible Element    id:listarCubSubMenu
    Crear Cubicacion         Antenas ${i}           SBE         COASIN    Región Metropolitana de Santiago    PROYECTO (FIJA)
    Click Visible Element    id:submit-user
    END