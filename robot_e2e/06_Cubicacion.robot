*** Settings ***
Documentation    Test de funcionanildad del módulo Cubicacion.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ./resources/general_resource.robot
Resource    ./resources/login_resource.robot
Resource    ./resources/perfil_resource.robot

*** Test Cases ***
# SQL
# agregar un servicio
# insert into proveedor_has_servicio(agencia_id,servicio_id,precio,tipo_moneda_id,numero_producto,cmarco_has_proveedor_id,estado) values (25,21,15000,2,"ZWC - Inventado",1,1);
# agregar UO
#mysql> insert into servicio_has_uob(actividad_id,servicio_cod,unidad_obra_cod,clave) values (6,"D010","T383","DIBUJ");
#mysql> insert into servicio_has_uob(actividad_id,servicio_cod,unidad_obra_cod,clave) values (6,"D010","T382","DIBUJ");
#mysql> insert into servicio_has_uob(actividad_id,servicio_cod,unidad_obra_cod,clave) values (6,"D010","T376","DIBUJ");

# precio_agencia * precio_proveedor = Precio
# precio_agencia * precio_proveedor * factor = Total
Crear cubicación
   # Scenario: El usuario mgestor 1 con perfil Gestor/JP va a crear una nueva cubicación
   # Given: El usuario mgestor 1 con perfil Gestor/JP entra en la página para crear cubicación
   # When: Registre todos los datos necesarios
   # And presione el botón crear cubicación
   # Then: La cubicación debe aparecer en el listado con los datos correctos

    # Given: El usuario mgestor 1 con perfil Gestor/JP entra en la página para crear cubicación
    _Login          mgestor1            asda    Gestor/JP
    _Navegate to    Crear Cubicacion

      # When: Registre todos los datos necesarios
    _Set input text         css:#nomnbreCub > app-input > input         CubTest
    _Select visible item    css:#tipoCub > app-select > select          Full
    _Select visible item    css:#contratosUser > app-select > select    SBE
    _Select visible item    css:#agencias > app-select > select         RANCAGUA
    _Select visible item    css:#proveedores > app-select > select      12121212 - COASIN

    _Set input text    css:#direcciondesde > app-input > input       las casas norte
    _Set input text    css:#alturadesde > app-input > input          1714
    _Set input text    css:#direccionhasta > app-input > input       las casas sur
    _Set input text    css:#alturahasta > app-input > input          1817
    _Set input text    css:#descripcion > app-textarea > textarea    Cub descripción

    _Select visible item      css:#actividad > app-select > select                  DISEÑO
    _Select visible item      css:#tiposervicio > app-select > select               CANALIZACION
    _Select visible item      css:#servicios > app-select > select                  D020 - DISEÑO DE RED INTERIOR RED DE COBRE (DITICU)
    _Select visible item      css:#unidad-obra > app-select > select                0 - SIN UO
    _Click visible element    css:div.filtroservicios> div:nth-child(5) > button

    sleep                     1
    _Select visible item      css:#servicios > app-select > select                   D010 - DISEÑO P2P EN RED DE COBRE PARA TELEALIMENTACION (AEREO O SUBTERRANEO)
    _Select visible item      css:#unidad-obra > app-select > select                 T382 - CAJA TERMINAL OPT.C/SPLITTER Y CONEC.TEL IP68
    _Click visible element    css:div.filtroservicios > div:nth-child(5) > button
    sleep                     1
    _Select visible item      css:#servicios > app-select > select                   D010 - DISEÑO P2P EN RED DE COBRE PARA TELEALIMENTACION (AEREO O SUBTERRANEO)
    _Select visible item      css:#unidad-obra > app-select > select                 T383 - TERMINAL OPTICO MULTIOPERADOR EDIFICIO
    _Click visible element    css:div.filtroservicios > div:nth-child(5) > button
    sleep                     1
    _Click visible element    css:#create-button
    close browser


