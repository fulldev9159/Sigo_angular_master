# Changelog

## [0.23.0] - 2021-05-15

### features

- Automatización del ingreso y configuración de perfiles
- Automatización del ingreso y configuración de usuarios
- Se incorpora la UNIDAD en las LPUS

### Changes

- Mejoras de diseño en crear nuevo perfil seleccion de permisos

### Fix

- Se envía null como valor para perfiles que son superiores máximos


## [0.22.0] - 2021-05-07

### features

- Se agrega autocompletado en nombre cubicación
- Se crea automatización de inserción de datos con robotframework

### Changes

-  Cambio en el diseño

### Fix

-  Se corrige el envío de parámetro subcontrato_ids en la creación de cubicación

## [0.21.0] - 2021-05-31

### features

- Se agrega tabla resumen de lpus seleccionadas y se programa funcionalidad para agregar cantidad de LPU.
- Se agrega el campo tipo moneda a la tabla resumen LPU
- Se agrega el total a tabla resumen LPU
- Ahora se puede parametrizar el componente tabla usa o no paginación

### Changes

- Cambios visuales en configuración de componente tabla para que el despliegue sea configurable por parámetro    
- Cambios funcionales del componente tabla para el manejo de inputs en fields.    
- Cambios funcionales del componente tabla para el manejo del despliegue de acciones
- Se ordenan los textos de los combobox    
- TitleCase en nombres ahora es parametrizado

### Fix

- Se recupera el buscador de servicios
- Reset de LPUs seleccionadas al salir del crear/editar Cubicación
- Se agregan labels faltantes
