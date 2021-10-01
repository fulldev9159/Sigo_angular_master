*** Settings ***
Documentation    Test de funcionanildad del modulo crear cubicacion para el flujo movil OT
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/cubicacion_resource.robot
Resource    ./resources/ot_resource.robot


*** Test Cases ***
Crear OT contrato movil
    _Login    mgestor1    pass

    #setear nombre de la OT con el número obtenido al crear la cubicación
    ${nombre OT Movil}     set variable          OT ${numero movil disponible} HAPPY PATH ROBOT
    Set Global Variable    ${nombre OT Movil}

    _Navegate to    Crear OT


    #  Validaciones
    ${selector nombre OT}=          set variable    css:#control_nombre>app-input>input
    ${selector tipo OT}=            set variable    css:#control_tipo_ot>app-select>select
    ${selector cubicacion}=         set variable    css:#control_cubicacion_id>app-select>select
    ${selector plan}=               set variable    css:#control_plan_proyecto_id>app-select>select
    ${selector sitio}=              set variable    css:#control_sitio_id>app-select>select
    ${selector radio opex}=         set variable    id:option_opex
    ${selector radio capex}=        set variable    id:option_capex
    ${selector opex}=               set variable    css:#control_id_opex_codigo>app-select>select
    ${selector sap}=                set variable    css:#control_cuenta_sap_codigo>app-select>select
    ${selector ceco}=               set variable    css:#control_ceco_codigo>app-select>select
    ${selector ceco provisorio}=    set variable    css:#ceco-provisorio>input
    ${selector pmo}=                set variable    css:#control_pmo_codigo>app-select>select
    ${selector lp}=                 set variable    css:#control_lp_codigo>app-select>select
    ${selector pep2}=               set variable    css:#control_pep2_capex_id>app-select>select
    ${selector pep2 provisorio}=    set variable    css:#pep2-provisorio>input
    ${selector fecha inicio}=       set variable    name:fecha-inicio-ot
    ${selector fecha termino}=      set variable    name:fecha-termino-ot
    ${selector proyecto}=           set variable    css:#control_proyecto_id>app-select>select
    ${selector observaciones}=      set variable    css:#control_observaciones>textarea
    ${selector guardar}=            set variable    id:guardar-ot

    # Validacion formulario Movil
     # Elementos que no deberían estar visibles

     # Elementos que deberían estar visibles
    Wait Until Element Is Visible    ${selector nombre OT}          timeout=15
    Wait Until Element Is Visible    ${selector tipo OT}            timeout=15
    Wait Until Element Is Visible    ${selector cubicacion}         timeout=15
    Wait Until Element Is Visible    ${selector plan}               timeout=15
    Wait Until Element Is Visible    ${selector sitio}              timeout=15
    Wait Until Element Is Visible    ${selector radio opex}         timeout=15
    Wait Until Element Is Visible    ${selector radio capex}        timeout=15
    Wait Until Element Is Visible    ${selector pmo}                timeout=15
    Wait Until Element Is Visible    ${selector lp}                 timeout=15
    Wait Until Element Is Visible    ${selector pep2}               timeout=15
    element should not be visible    ${selector pep2 provisorio}
    element should not be visible    ${selector opex}
    element should not be visible    ${selector sap}
    element should not be visible    ${selector ceco}
    element should not be visible    ${selector ceco provisorio}
    Wait Until Element Is Visible    ${selector fecha inicio}
    Wait Until Element Is Visible    ${selector fecha termino}
    Wait Until Element Is Visible    ${selector proyecto}
    Wait Until Element Is Visible    ${selector observaciones}
    Wait Until Element Is Visible    ${selector guardar}


     # Elementos habilitados y los que no
    element should be enabled     ${selector nombre OT}
    element should be enabled     ${selector tipo OT}
    element should be enabled     ${selector cubicacion}
    element should be disabled    ${selector plan}
    element should be disabled    ${selector sitio}
    element should be disabled    ${selector pmo}
    element should be disabled    ${selector lp}
    element should be disabled    ${selector pep2}
    element should be enabled     ${selector fecha inicio}
    element should be enabled     ${selector fecha termino}
    element should be enabled     ${selector proyecto}
    element should be enabled     ${selector observaciones}
    # element should be disabled    ${selector guardar}



   # Llenar el formulario OT contrato MOVIL
    _Wait visibility                ${selector nombre OT}
    input text                      ${selector nombre OT}        ${nombre OT Movil} 
    _Wait visibility and contain    ${selector tipo OT}          OT
    Select From List By Label       ${selector tipo OT}          OT
    _Wait visibility and contain    ${selector cubicacion}       ${nombre cubicacion movil}
    Select From List By Label       ${selector cubicacion}       ${nombre cubicacion movil}
    _Wait visibility and contain    ${selector plan}             EMPRESAS
    Select From List By Label       ${selector plan}             EMPRESAS
    _Wait visibility and contain    ${selector sitio}            NEWIND0021F3 - BANCO RIPLEY
    Select From List By Label       ${selector sitio}            NEWIND0021F3 - BANCO RIPLEY
    _Click visible element          ${selector radio opex}
    _Wait visibility and contain    ${selector opex}             00-01820
    Select From List By Label       ${selector opex}             00-01820
    _Wait visibility and contain    ${selector sap}              6052561
    Select From List By Label       ${selector sap}              6052561
    _Wait visibility and contain    ${selector ceco}             49516
    Select From List By Label       ${selector ceco}             49516
    _Set Fecha Inicio               06/22/2021
    _Set Fecha Termino
    _Wait visibility and contain    ${selector proyecto}         proyecto test(1)
    Select From List By Label       ${selector proyecto}         proyecto test(1)
    _Wait visibility                ${selector observaciones}
    input text                      ${selector observaciones}    Robot Observaciones

    # Guardar
    _Click visible element    ${selector guardar}

    # Validar que se haya creado existosamente
    _Have to exist in table/tab    Abiertas    ${nombre OT Movil}

    close Browser


