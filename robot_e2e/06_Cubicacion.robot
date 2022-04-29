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
# Crear cubicación
    [Documentation]    Scenario: El usuario mgestor 1 con perfil Gestor/JP va a crear una nueva cubicación.
   # ...                                                                                          Given: El usuario mgestor 1 con perfil Gestor/JP entra en la página para crear cubicación
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

# Listar Cubicaciones
#    _Login                            mgestor1             asda                           Gestor/JP
#    _Navegate to                      Listar Cubicacion
#    _Element should exist in table    CubTest
#    _Validate column data             2                    Full
#    _Validate column data             3                    Móvil
#    _Validate column data             4                    12121212
#    _Validate column data             5                    SBE
#    _Validate column data             6                    RANCAGUA
#    _Validate column data             7                    COASIN
#    _Validate column data             8                    JESSICA MOVISTAR CASTILLO 1
#    _Validate column data             10                   CLP $27.240
#    close browser

# Detalle
#    [Documentation]                   Revisar si se visualizan los detalles de la cubicació correctamente
#    _Login                            mgestor1                                                                                     asda               Gestor/JP
#    _Navegate to                      Listar Cubicacion
#    _Element should exist in table    CubTest
#    _Click visible element            css:#action-buttons > div > button:nth-child(1)
#    _Element text should be           css:table:nth-child(1) > tr:nth-child(1) > td:nth-child(2)                                   las casas norte
#    _Element text should be           css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(1) > td:nth-child(4)    1714
#    _Element text should be           css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(2) > td:nth-child(2)    las casas sur
#    _Element text should be           css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(2) > td:nth-child(4)    1817
#    _Element text should be           css:app-detalle-cubicacion-table > table:nth-child(3) > tr:nth-child(2) > td                 Cub descripción

#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(1)     D020
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(2)     DISEÑO DE RED INTERIOR RED DE COBRE (DITICU)
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(3)     Canalizacion
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(4)     1
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(5)     $12.240
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(6)     $12.240
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(8)     0
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(9)     SIN UO
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(10)    Diseño
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(11)    1
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(12)    CLP
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(13)    $0
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(14)    $0

#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(1)     D010
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(2)     DISEÑO P2P EN RED DE COBRE PARA TELEALIMENTACION (AEREO O SUBTERRANEO)
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(3)     Canalizacion
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(4)     1
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(5)     $15.000
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(6)     $15.000
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(8)     T382
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(9)     CAJA TERMINAL OPT.C/SPLITTER Y CONEC.TEL IP68
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(10)    Diseño
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(11)    1
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(12)    CLP
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(13)    $0
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(14)    $0

#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(1)    T383
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(2)    TERMINAL OPTICO MULTIOPERADOR EDIFICIO
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(3)    Diseño
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(4)    1
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(5)    CLP
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(6)    $0
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(7)    $0
#    close browser


# Clonar
#    [Documentation]                   Revisar si el clonado funciona correctamente
#    _Login                            mgestor1                                                             asda       Gestor/JP
#    _Navegate to                      Listar Cubicacion
#    _Element should exist in table    CubTest
#    _Click visible element            css:#action-buttons > div > button:nth-child(2)
#    _Set input text                   css:app-clone-cubage-form > form > app-input > input                 Clonado
#    _Click visible element            css:p-dialog > div > div > div> p-footer > button.btn.btn-primary


#    _Element should exist in table    Clonado
#    _Validate column data             2          Full
#    _Validate column data             3          Móvil
#    _Validate column data             4          12121212
#    _Validate column data             5          SBE
#    _Validate column data             6          RANCAGUA
#    _Validate column data             7          COASIN
#    _Validate column data             8          JESSICA MOVISTAR CASTILLO 1
#    _Validate column data             10         CLP $27.240

#    _Click visible element     css:#action-buttons > div > button:nth-child(1)
#    _Element text should be    css:table:nth-child(1) > tr:nth-child(1) > td:nth-child(2)                                   las casas norte
#    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(1) > td:nth-child(4)    1714
#    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(2) > td:nth-child(2)    las casas sur
#    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(2) > td:nth-child(4)    1817
#    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(3) > tr:nth-child(2) > td                 Cub descripción

#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(1)     D020
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(2)     DISEÑO DE RED INTERIOR RED DE COBRE (DITICU)
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(3)     Canalizacion
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(4)     1
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(5)     $12.240
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(6)     $12.240
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(8)     0
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(9)     SIN UO
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(10)    Diseño
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(11)    1
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(12)    CLP
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(13)    $0
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(14)    $0

#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(1)     D010
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(2)     DISEÑO P2P EN RED DE COBRE PARA TELEALIMENTACION (AEREO O SUBTERRANEO)
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(3)     Canalizacion
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(4)     1
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(5)     $15.000
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(6)     $15.000
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(8)     T382
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(9)     CAJA TERMINAL OPT.C/SPLITTER Y CONEC.TEL IP68
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(10)    Diseño
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(11)    1
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(12)    CLP
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(13)    $0
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(14)    $0

#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(1)    T383
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(2)    TERMINAL OPTICO MULTIOPERADOR EDIFICIO
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(3)    Diseño
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(4)    1
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(5)    CLP
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(6)    $0
#    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(7)    $0
#    close browser

# Eliminar
#    [Documentation]                       Revisar si el eliminar cubicación funciona
#    _Login                                mgestor1                                                       asda    Gestor/JP
#    _Navegate to                          Listar Cubicacion
#    _Element should exist in table        Clonado
#    _Click visible element                css:#action-buttons > div > button.ui.button.eliminar-color
#    _Click visible element                css:#delete-user-button
#    _Element should not exist in table    Clonado
    #     close browser

Editar
    [Documentation]    Revisar si el editar cubicación funciona
    _Login             mgestor1                                    asda    Gestor/JP
    _Navegate to       Listar Cubicacion
    # _Element should exist in table    CubTest
    # _Click visible element            css:#action-buttons > div > button:nth-child(3)

    # sleep    2
  #   _Element input text should be    css:#nomnbreCub > app-input > input         CubTest
  #   _Element input text should be    css:#tipoCub > app-select > select          3          # Full
  #   _Element input text should be    css:#contratosUser > app-select > select    1          # SBE
  #   _Element input text should be    css:#agencias > app-select > select         25         # RANCAGUA
  #   _Element input text should be    css:#proveedores > app-select > select      1          #12121212 - COASIN

  #   _Element input text should be    css:#direcciondesde > app-input > input       las casas norte
  #   _Element input text should be    css:#alturadesde > app-input > input          1714
  #   _Element input text should be    css:#direccionhasta > app-input > input       las casas sur
  #   _Element input text should be    css:#alturahasta > app-input > input          1817
  #   _Element input text should be    css:#descripcion > app-textarea > textarea    Cub descripción

  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(1)                        D020
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(2)                        DISEÑO DE RED INTERIOR RED DE COBRE (DITICU)
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(3)                        Canalizacion
  #   _Element input text should be    css:table > tbody > tr:nth-child(1) > td:nth-child(4)> app-input > input     1
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(5)                        $12.240
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(6)                        $12.240
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(8)                        0
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(9)                        SIN UO
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(10)                       Diseño
  #   _Element input text should be    css:table > tbody > tr:nth-child(1) > td:nth-child(11)> app-input > input    1
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(12)                       CLP
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(13)                       $0
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(14)                       $0

  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(1)                        D010
  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(2)                        DISEÑO P2P EN RED DE COBRE PARA TELEALIMENTACION (AEREO O SUBTERRANEO)
  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(3)                        Canalizacion
  #   _Element input text should be    css:table > tbody > tr:nth-child(2) > td:nth-child(4)> app-input > input     1
  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(5)                        $15.000
  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(6)                        $15.000
  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(8)                        T382
  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(9)                        CAJA TERMINAL OPT.C/SPLITTER Y CONEC.TEL IP68
  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(10)                       Diseño
  #   _Element input text should be    css:table > tbody > tr:nth-child(2) > td:nth-child(11)> app-input > input    1
  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(12)                       CLP
  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(13)                       $0
  #   _Element text should be          css:table > tbody > tr:nth-child(2) > td:nth-child(14)                       $0

  #   _Element text should be          css:table > tbody > tr:nth-child(3) > td:nth-child(1)                       T383
  #   _Element text should be          css:table > tbody > tr:nth-child(3) > td:nth-child(2)                       TERMINAL OPTICO MULTIOPERADOR EDIFICIO
  #   _Element text should be          css:table > tbody > tr:nth-child(3) > td:nth-child(3)                       Diseño
  #   _Element input text should be    css:table > tbody > tr:nth-child(3) > td:nth-child(4)> app-input > input    1
  #   _Element text should be          css:table > tbody > tr:nth-child(3) > td:nth-child(5)                       CLP
  #   _Element text should be          css:table > tbody > tr:nth-child(3) > td:nth-child(6)                       $0
  #   _Element text should be          css:table > tbody > tr:nth-child(3) > td:nth-child(7)                       $0

  # # PENDIENTE: Para cuando existan datos reales en db se debe revisar los cambios de los demás parámetros
  #   _Set input text         css:#nomnbreCub > app-input > input           CubTestEditado
  #   _Select visible item    css:#tipoCub > app-select > select            Construcción
  #   _Set input text         css:#direcciondesde > app-input > input       Edit las casas norte
  #   _Set input text         css:#alturadesde > app-input > input          Edit 1714
  #   _Set input text         css:#direccionhasta > app-input > input       Edit las casas sur
  #   _Set input text         css:#alturahasta > app-input > input          Edit 1817
  #   _Set input text         css:#descripcion > app-textarea > textarea    Edit Cub descripción

  #   _Click visible element    css:.table-carrito > table > tbody > tr:nth-child(1) > td:nth-child(7) > div > button
  #   _Click visible element    css:#delete-user-button

  #   sleep    1

  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(1)                        D010
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(2)                        DISEÑO P2P EN RED DE COBRE PARA TELEALIMENTACION (AEREO O SUBTERRANEO)
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(3)                        Canalizacion
  #   _Element input text should be    css:table > tbody > tr:nth-child(1) > td:nth-child(4)> app-input > input     1
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(5)                        $15.000
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(6)                        $15.000
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(8)                        T382
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(9)                        CAJA TERMINAL OPT.C/SPLITTER Y CONEC.TEL IP68
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(10)                       Diseño
  #   _Element input text should be    css:table > tbody > tr:nth-child(1) > td:nth-child(11)> app-input > input    1
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(12)                       CLP
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(13)                       $0
  #   _Element text should be          css:table > tbody > tr:nth-child(1) > td:nth-child(14)                       $0

  #   # Table totales
  #   _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(1) > td:nth-child(2)    $15.000
  #   _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(2) > td:nth-child(2)    $0
  #   _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(3) > td:nth-child(2)    $15.000

  #   _Set input text    css:.table-carrito > table > tbody > tr:nth-child(1) > td:nth-child(4) > app-input > input    4

  #   _Element input text should be    css:table > tbody > tr:nth-child(1) > td:nth-child(4)> app-input > input    4

  #   _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(1) > td:nth-child(2)    $60.000
  #   _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(2) > td:nth-child(2)    $0
  #   _Element text should be    css:#table-totales > div.col-3 > table > tr:nth-child(3) > td:nth-child(2)    $60.000

  #   _Select visible item      css:#actividad > app-select > select                  DISEÑO
  #   _Select visible item      css:#tiposervicio > app-select > select               CANALIZACION
  #   _Select visible item      css:#servicios > app-select > select                  D010 - DISEÑO P2P EN RED DE COBRE PARA TELEALIMENTACION (AEREO O SUBTERRANEO)
  #   _Select visible item      css:#unidad-obra > app-select > select                T376 - CAJA TERMINAL OPT.C/SPLITTER Y CONEC.TEL
  #   _Click visible element    css:div.filtroservicios> div:nth-child(5) > button
  #   sleep                     1

  #   _Select visible item      css:#servicios > app-select > select                  D020 - DISEÑO DE RED INTERIOR RED DE COBRE (DITICU)
  #   _Select visible item      css:#unidad-obra > app-select > select                0 - SIN UO
  #   _Click visible element    css:div.filtroservicios> div:nth-child(5) > button
  #   sleep                     1
  #   _Click visible element    css:#create-button

  #   sleep                             1
    _Element should exist in table    CubTestEditado
  #  # REVISAR LISTA
  #   _Validate column data             2                 Construcción
  #   _Validate column data             3                 Móvil
  #   _Validate column data             4                 12121212
  #   _Validate column data             5                 SBE
  #   _Validate column data             6                 RANCAGUA
  #   _Validate column data             7                 COASIN
  #   _Validate column data             8                 JESSICA MOVISTAR CASTILLO 1
  #   _Validate column data             10                CLP $72.240

   # REVISAR DETALLE

    _Click visible element     css:#action-buttons > div > button:nth-child(1)
    _Element text should be    css:table:nth-child(1) > tr:nth-child(1) > td:nth-child(2)                                   Edit las casas norte
    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(1) > td:nth-child(4)    Edit 1714
    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(2) > td:nth-child(2)    Edit las casas sur
    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(1) > tr:nth-child(2) > td:nth-child(4)    Edit 1817
    _Element text should be    css:app-detalle-cubicacion-table > table:nth-child(3) > tr:nth-child(2) > td                 Edit Cub descripción

    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(1)     D010
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(2)     DISEÑO P2P EN RED DE COBRE PARA TELEALIMENTACION (AEREO O SUBTERRANEO)
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(3)     Canalizacion
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(4)     4
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(5)     $15.000
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(6)     $60.000
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(8)     T382
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(9)     CAJA TERMINAL OPT.C/SPLITTER Y CONEC.TEL IP68
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(10)    Diseño
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(11)    1
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(12)    CLP
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(13)    $0
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(1) > td:nth-child(14)    $0

    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(1)    T383
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(2)    TERMINAL OPTICO MULTIOPERADOR EDIFICIO
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(3)    Diseño
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(4)    1
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(5)    CLP
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(6)    $0
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(2) > td:nth-child(7)    $0

    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(1)    T383
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(2)    TERMINAL OPTICO MULTIOPERADOR EDIFICIO
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(3)    Diseño
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(4)    1
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(5)    CLP
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(6)    $0
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(3) > td:nth-child(7)    $0

    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(1)     D020
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(2)     DISEÑO DE RED INTERIOR RED DE COBRE (DITICU)
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(3)     Canalizacion
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(4)     1
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(5)     $12.240
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(6)     $12.240
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(8)     0
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(9)     SIN UO
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(10)    Diseño
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(11)    1
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(12)    CLP
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(13)    $0
    _Element text should be    css:app-detalle-cubicacion-table > div > table > tbody > tr:nth-child(4) > td:nth-child(14)    $0









