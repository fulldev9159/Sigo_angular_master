*** Settings ***
Documentation    Test de funcionanildad del Flujo OT.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/perfil_resource.robot
Resource    ./resources/cubicacion_resource.robot
Resource    ./resources/ot_resource.robot

*** Test Cases ***
Agregar registro
    # ETAPA: En Ejecución de Trabajos
    _Login                         ntrabajador1                                                                     asda                                                    Trabajador EECC
    _Navegate to                   Listar OT
    _Have to exist in table/tab    Ejecucion                                                                        OT BUCLE
    _Press action                  Agregar al libro de obras
    _Set input text                css:app-registrar-libro-obra > form > div > app-textarea > textarea              Testing regsitro en libro de obras OT Contrato Bucle
    Choose File                    css:p-fileupload > div > div.p-fileupload-buttonbar > span > input[type=file]    ${CURDIR}/images/Ambiente.PNG
    _Select visible item           css:app-registrar-libro-obra > form > div > app-select > select                  Plano as Built 
    _Click visible element         css:p-footer > button.btn.btn-primary
    close browser

Ver registros libro de obras
   # ETAPA: En Ejecución de Trabajos
    _Login                         ntrabajador1                                                                    asda        Trabajador EECC
    _Navegate to                   Listar OT
    _Have to exist in table/tab    Ejecucion                                                                       OT BUCLE
    _Press action                  Información
    _Click visible element         css:#page-content-wrapper > div > app-informacion > ul > li:nth-child(4) > a

    # _Element text should be    css:app-libro-obras > div > div:nth-child(1) > app-card > div > div.bg-info.card-header.card-header-tab > div.card-header-title > span.nombre-usuario-registro    Jaime Nokia Contretas
    # _Element text should be    css:app-libro-obras > div > div:nth-child(1) > app-card > div > div.card-body > div > div.col-md-7.obervacion-registro                                            Testing regsitro en libro de obras OT Contrato Bucle


    # _Element text should be    css:#page-content-wrapper > div > app-informacion > app-libro-obras > div > div:nth-child(4) > div > span.nivel-registro      SUCCESS
    # _Element text should be    css:#page-content-wrapper > div > app-informacion > app-libro-obras > div > div:nth-child(4) > div > span.evento-registro     CAMBIO_ESTADO
    # _Element text should be    css:#page-content-wrapper > div > app-informacion > app-libro-obras > div > div:nth-child(4) > div > span.mensaje-registro    desde Autorizar OT por Proveedor a En Ejecución de Trabajos
    close browser



