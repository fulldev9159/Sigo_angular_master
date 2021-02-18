# Changelog

## [0.6.0] - 2021-02-20

### features

- Se agrega mensajes al realizar una inserción de cubicación para exito o falla
- Se crea shared service para funciones genericas que se utilizan en todos los componentes

### Changes

- Se migra la funcion de Snackbar a shared services para que todos puedan usarlo
- Se migra la función navegateTo a shared services para que todos puedan usarlo

## [0.5.0] - 2021-02-15

### features

- Se agrega un popup para que el cliente pueda confirmar cuando desee cambiar el contrato al crear una cubicación
- Se crea lógica para el almancenado de una cubicación
- Se inserta la cubicación via API

### Changes

- Cambio en el comportamiento de los disabled en la creación de cubicación

## [0.4.0] - 2021-02-11

### features

- Se crea sección de carrito de compras
- Se genera un WA para manejar los problemas con los acentos. Consiste en ejecutar un replace sobre los nombres y cambiarlos por acentos correctos.

### Changes

- Se agrega container al template de crear-cubicación para agregar overflow scroll
- Se realiza cambio de aspecto de la página de creación de cubicación
- Cambio a PrimeNg

## [0.3.0] - 2021-02-07

### features

- Se crea el módulo de cubicación
- Se crea el component para crear cubicación

### Changes

- Se crea un component para el manejo del navbar

## [0.2.0] - 2021-01-25

### features

- Se obtiene, procesa y almacena en localStorage la información del login retornada por el API.
- Se obtiene la información de login y se despliega en el menú.
- Se agrega sistema de mensajes de error node-snackbar
- Se agrega logout con api

### Changes

## [0.0.1] - 2021-01-25

### features

- Base arquitectura Angular
- Primera versión base de Login
