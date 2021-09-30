*** Settings ***
Documentation    Test de funcionanildad del modulo crear cubicacion para el flujo Happy Path
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/cubicacion_resource.robot


*** Test Cases ***
Crear Cubicacion
    _Login    mgestor1    pass

    # Obtener un nombre de cubicacion disponible
    ${numero movil disponible}=    _Get avaliable cubicacion name
    Log To Console                 ${numero movil disponible}
    ${nombre cubicacion movil}=    set variable                      CUBICACION ${numero movil disponible} HAPPY PATH ROBOT
    Set Global Variable            ${numero movil disponible}
    Set Global Variable            ${nombre cubicacion movil}

    # Crear Cubicacion
    _Navegate to    Crear Cubicacion

    #  Validaciones
    ${selector nombre cubicacion}=    set variable    css:ng-autocomplete > div > div.input-container > input
    ${selector contrato}=             set variable    css:#contratoField > app-select > select
    ${selector proveedor}=            set variable    css:#proveedorField > app-select > select
    ${selector region}=               set variable    css:#regionField > app-select > select
    ${selector tipo servicio}=        set variable    css:#tipoServicioField > app-select > select
    ${selector guardar}=              set variable    css:#submitButtonBox > button.btn.btn-primary

    element should be enabled     ${selector nombre cubicacion}
    element should be enabled     ${selector contrato}
    element should be disabled    ${selector proveedor}
    element should be disabled    ${selector region}
    element should be disabled    ${selector tipo servicio}
    element should be disabled    ${selector guardar}

    # Insertando la data para crear la cubicación
    _Wait visibility                ${selector nombre cubicacion}
    input text                      ${selector nombre cubicacion}                                      ${nombre cubicacion movil}
    _Wait visibility and contain    ${selector contrato}                                               SBE
    Select From List By Label       ${selector contrato}                                               SBE
    _Wait visibility and contain    ${selector proveedor}                                              COASIN
    Select From List By Label       ${selector proveedor}                                              COASIN
    _Wait visibility and contain    ${selector region}                                                 Región Metropolitana de Santiago
    Select From List By Label       ${selector region}                                                 Región Metropolitana de Santiago
    _Wait visibility and contain    ${selector tipo servicio}                                          PROYECTO (FIJA)
    Select From List By Label       ${selector tipo servicio}                                          PROYECTO (FIJA)                     
    _Click visible element          css:.p-listbox-list-wrapper > ul > li:nth-child(1) >.p-checkbox
    _Click visible element          css:.p-listbox-list-wrapper > ul > li:nth-child(2) >.p-checkbox

    # Validar tabla carrito

    # Guardar
    _Click visible element    ${selector guardar}

    # Validar que se haya creado existosamente
    ${exist}=         _Element exist in table    ${nombre cubicacion movil} 
    Should Be True    ${exist}

    close Browser

