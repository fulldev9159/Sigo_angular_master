*** Settings ***
Documentation    Test de funcionanildad del modulo de Flujo OT Movil.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/ot_resource.robot

*** Test Cases ***
Flujo OT Completo Movil
    # ${nombre OT Movil}=    set variable    Test Robot Manual

# ETAPA: ASIGNAR COORDINADOR
    _Login                            cadmincontrato1                  pass
    _Have No to exist in table/tab    Abiertas                         ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas                         ${nombre OT Movil}
    _Have to exist in table/tab       Ejecucion                        ${nombre OT Movil}
    _Press action                     Asignar coordinador
    ${selector asign coordinador}=    set variable                     css:app-assign-coordinator-form > form > app-select > select
    ${boton aceptar coordinador}=     set variable                     css:p-footer > button.btn.btn-primary
    element should be disabled        ${boton aceptar coordinador}
    _Wait visibility and contain      ${selector asign coordinador}    Erick COASIN Urrutia Correa
    Select From List By Label         ${selector asign coordinador}    Erick COASIN Urrutia Correa
    element should be enabled         ${boton aceptar coordinador}
    _Click visible element            ${boton aceptar coordinador}
    sleep                             0.5
    _Have No to exist in table/tab    Ejecucion                        ${nombre OT Movil}
    _Have to exist in table/tab       Abiertas                         ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas                         ${nombre OT Movil}
    _Logout

# ETAPA: ASIGNAR TRABAJADOR
    _Login                            ccoordinador1                   pass
    _Have No to exist in table/tab    Abiertas                        ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas                        ${nombre OT Movil}
    _Have to exist in table/tab       Ejecucion                       ${nombre OT Movil}
    _Press action                     Asignar trabajador
    ${selector asign trabajador}=     set variable                    css:app-assign-trabajador-form > form > app-select > select
    ${boton aceptar trabajador}=      set variable                    css:p-footer > button.btn.btn-primary
    element should be disabled        ${boton aceptar trabajador}
    _Wait visibility and contain      ${selector asign trabajador}    Jaime COASIN Contreras Cortes
    Select From List By Label         ${selector asign trabajador}    Jaime COASIN Contreras Cortes
    element should be enabled         ${boton aceptar trabajador}
    _Click visible element            ${boton aceptar trabajador}
    sleep                             0.5
    _Have No to exist in table/tab    Ejecucion                       ${nombre OT Movil}
    _Have to exist in table/tab       Abiertas                        ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas                        ${nombre OT Movil}
    _Logout

# ETAPA: FINALIZAR TRABAJOS
    _Login                            ctrabajador1          pass
    _Have No to exist in table/tab    Abiertas              ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas              ${nombre OT Movil}
    _Have to exist in table/tab       Ejecucion             ${nombre OT Movil}
    _Press action                     Finalizar trabajos
    ${boton confirmar}=               set variable          css:div.p-confirm-popup-footer>button:nth-child(2)
    _Click visible element            ${boton confirmar}
    sleep                             0.5
    _Have No to exist in table/tab    Ejecucion             ${nombre OT Movil}
    _Have to exist in table/tab       Abiertas              ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas              ${nombre OT Movil}
    _Logout

# ETAPA: VALIDAR GENERACIOND DE ACTA ADMIN CONTRATO
    _Login                            cadmincontrato1                   pass
    _Have No to exist in table/tab    Abiertas                          ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas                          ${nombre OT Movil}
    _Have to exist in table/tab       Ejecucion                         ${nombre OT Movil}
    _Press action                     Aceptar la generación del acta
    ${boton confirmar}=               set variable                      css:div.p-confirm-popup-footer>button:nth-child(2)
    _Click visible element            ${boton confirmar}
    sleep                             0.5
    _Have No to exist in table/tab    Ejecucion                         ${nombre OT Movil}
    _Have to exist in table/tab       Abiertas                          ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas                          ${nombre OT Movil}
    _Logout

# ETAPA: VALIDAR GENERACIOND DE ACTA GESTOR
    _Login                            mgestor1                          pass
    _Have No to exist in table/tab    Abiertas                          ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas                          ${nombre OT Movil}
    _Have to exist in table/tab       Ejecucion                         ${nombre OT Movil}
    _Press action                     Aceptar la generación del acta
    ${boton confirmar}=               set variable                      css:div.p-confirm-popup-footer>button:nth-child(2)
    _Click visible element            ${boton confirmar}
    sleep                             0.5
    _Have No to exist in table/tab    Ejecucion                         ${nombre OT Movil}
    _Have to exist in table/tab       Abiertas                          ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas                          ${nombre OT Movil}
    _Logout

# ETAPA: AUTORIZAR PAGO JEFE AREA
    _Login                            mjefearea1            pass
    _Have No to exist in table/tab    Abiertas              ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas              ${nombre OT Movil}
    _Have to exist in table/tab       Ejecucion             ${nombre OT Movil}
    _Press action                     Autorizar Pago
    ${boton confirmar}=               set variable          css:div.p-confirm-popup-footer>button:nth-child(2)
    _Click visible element            ${boton confirmar}
    sleep                             0.5
    _Have No to exist in table/tab    Ejecucion             ${nombre OT Movil}
    _Have to exist in table/tab       Abiertas              ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas              ${nombre OT Movil}
    _Logout

# ETAPA: AUTORIZAR PAGO SUB GERENTE
    _Login                            msubgerente1          pass
    _Have No to exist in table/tab    Abiertas              ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas              ${nombre OT Movil}
    _Have to exist in table/tab       Ejecucion             ${nombre OT Movil}
    _Press action                     Autorizar Pago
    ${boton confirmar}=               set variable          css:div.p-confirm-popup-footer>button:nth-child(2)
    _Click visible element            ${boton confirmar}
    sleep                             0.5
    _Have No to exist in table/tab    Ejecucion             ${nombre OT Movil}
    _Have to exist in table/tab       Abiertas              ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas              ${nombre OT Movil}
    _Logout

# # ETAPA: AUTORIZAR PAGO GERENTE
    _Login                            mgerente1             pass
    _Have No to exist in table/tab    Abiertas              ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas              ${nombre OT Movil}
    _Have to exist in table/tab       Ejecucion             ${nombre OT Movil}
    _Press action                     Autorizar Pago
    ${boton confirmar}=               set variable          css:div.p-confirm-popup-footer>button:nth-child(2)
    _Click visible element            ${boton confirmar}
    sleep                             0.5
    _Have No to exist in table/tab    Ejecucion             ${nombre OT Movil}
    _Have No to exist in table/tab    Abiertas              ${nombre OT Movil}
    _Have No to exist in table/tab    Cerradas              ${nombre OT Movil}
    _Logout

    close Browser