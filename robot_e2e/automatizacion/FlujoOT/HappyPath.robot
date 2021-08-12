*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ../../resource.robot

*** Test Cases ***
Flujo happy path
    Open Browser To Page    ${url}
   #  Execute javascript      document.body.style.zoom="80%"
    ${OT name}=             set variable    OT ${prefijo} HAPPY PATH ROBOT
#VALIDACIONES
      # REGLAS
         # - Soy el usuario (mgestor1)  que creó la OT
         # - ETAPA: Pendiente de Autorización por Adm. Contrato
      # CRITERIOS DE ACEPTACION
         # - Debe ver la OT en la pestaña abiertas solamente
         # - Por ahora solo puede tener la acción de ver detalles de la OT
   #  Login                          ${user}       password
   #  No debe existir en la tabla    ${OT name}    Ejecucion
   #  No debe existir en la tabla    ${OT name}    Cerradas
   #  Debe existir en la tabla       ${OT name}    Abiertas
   #  Acciones solo Info
   #  Logout

#VALIDACIONES
      # REGLAS
         # - Soy un usuario gestor (mgestor2) de la misma area y con posibilidad de ver las OTs de otras áreas
         # - ETAPA: Pendiente de Autorización por Adm. Contrato
      # CRITERIOS DE ACEPTACION
         # - Debe ver la OT en la pestaña abiertas solamente y usando el fitro de otras OTs o Todas
         # - No puede realizar acciones sobre dicha OT


#VALIDACIONES
      # REGLAS
         # - Soy un usuario gestor (mgestor3) de la misma area y con posibilidad de ver las OTs de otras áreas
         # - ETAPA: Pendiente de Autorización por Adm. Contrato
      # CRITERIOS DE ACEPTACION
         # - No debe porder ver las OTs del usuario mgestor1 ya que es de otra área


#VALIDACIONES
      # REGLAS
         # - Soy el admin contrato de la OT (cadmincontrato1)
         # - ETAPA: Pendiente de Autorización por Adm. Contrato
      # CRITERIOS DE ACEPTACION
         # - La OT debe aparecer en la pestaña de ejecución
         # - No debe aparecer en ninguna de las demás pestañas
         # - Le deben aparecer 3 acciones posibles (info, aceptar y rechazar)

    Login                                cadmincontrato1                                                                                       password
   #  No Debe existir en la tabla          ${OT name}                                                                                            Abiertas
   #  No debe existir en la tabla          ${OT name}                                                                                            Cerradas
    Debe existir en la tabla             ${OT name}                                                                                            Ejecucion
    Acciones PEND AUTH ADMIN Contrato
    Execute javascript                   document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(2)>a").click()
    Confirmar
    SSLEEP

#VALIDACIONES
      # REGLAS
         # - Soy el admin contrato de la OT (cadmincontrato1)
         # - ETAPA: Pendiente de Asignar Coordinador
      # CRITERIOS DE ACEPTACION
         # - La OT debe aparecer en la pestaña de ejecución
         # - No debe aparecer en ninguna de las demás pestañas
         # - Le deben aparecer 2 acciones posibles (info, Asignar coordinador)
         # - Seleccionar a  ccoordinador1
         # - Luego de la selección de coordinador la OT debe ir a la pestaña de abiertas

    Acciones PEND ASING COORDINADOR
    Execute javascript                 document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(2)>a").click()
    Seleccionar coordinador            Erick COASIN Urrutia Correa
    Click Visible Element              css:p-footer > button.btn.btn-primary
   #  No debe existir en la tabla        ${OT name}                                                                                            Ejecucion
   #  No debe existir en la tabla        ${OT name}                                                                                            Cerradas
   #  Debe existir en la tabla           ${OT name}                                                                                            Abiertas
    Logout

#VALIDACIONES
      # REGLAS
         # - Soy el coodrinador asignado (ccoordinador1)
         # - ETAPA: Pendiente de Asignar Trabajador
      # CRITERIOS DE ACEPTACION
         # - La OT debe aparecer en la pestaña de ejecución
         # - No debe aparecer en ninguna de las demás pestañas
         # - Le deben aparecer 2 acciones posibles (info, Asignar trabajador)
         # - Seleccionar a  ctrabajador1
    SSLEEP
    Login                             ccoordinador1                                                                                         password
    Debe existir en la tabla          ${OT name}                                                                                            Ejecucion
    Acciones PEND ASING TRABAJADOR
    Execute javascript                document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(2)>a").click()
    sleep                             4
    Seleccionar trabajador            Jaime COASIN Contreras Cortes
    Click Visible Element             css:p-footer > button.btn.btn-primary
   #  No debe existir en la tabla       ${OT name}                                                                                            Ejecucion
   #  No debe existir en la tabla       ${OT name}                                                                                            Cerradas
   #  Debe existir en la tabla          ${OT name}                                                                                            Abiertas
    Logout


#VALIDACIONES
      # REGLAS
         # - Soy el trabajador asignado (ctrabajador1)
         # - ETAPA: Pendiente para Finalizar Trabajos
      # CRITERIOS DE ACEPTACION
         # - La OT debe aparecer en la pestaña de ejecución
         # - No debe aparecer en ninguna de las demás pestañas
         # - Le deben aparecer 2 acciones posibles (info, Finalizar trabajos)
         # - Poder apretar botón finalizar trabajos
    SSLEEP
    Login                         ctrabajador1                                                                                          password
    Debe existir en la tabla      ${OT name}                                                                                            Ejecucion
    Acciones PEND FIN TRABAJOS
    Execute javascript            document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(2)>a").click()
    Confirmar
   #  No debe existir en la tabla    ${OT name}                                                                                            Ejecucion
   #  No debe existir en la tabla    ${OT name}                                                                                            Cerradas
   #  Debe existir en la tabla       ${OT name}                                                                                            Abiertas
    Logout

#VALIDACIONES
      # REGLAS
         # - Soy el administrador asignado (cadmincontrato1)
         # - ETAPA: Pendiente de Validación Acta por Adm. Contrato
      # CRITERIOS DE ACEPTACION
         # - La OT debe aparecer en la pestaña de ejecución
         # - No debe aparecer en ninguna de las demás pestañas
         # - Le deben aparecer 3 acciones posibles (info, Aceptar, Rechazar)
         # - Poder apretar botón
    SSLEEP
    Login                           cadmincontrato1                                                                                       password
    Debe existir en la tabla        ${OT name}                                                                                            Ejecucion
    Acciones PEND VALID GEN ACTA
    Execute javascript              document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(2)>a").click()
    Confirmar
   #  No debe existir en la tabla     ${OT name}                                                                                            Ejecucion
   #  No debe existir en la tabla     ${OT name}                                                                                            Cerradas
   #  Debe existir en la tabla        ${OT name}                                                                                            Abiertas
    Logout

#VALIDACIONES
      # REGLAS
         # - Soy gestor que creo la OT(mgestor1)
         # - ETAPA: Pendiente de Validación Acta por Adm. Contrato
      # CRITERIOS DE ACEPTACION
         # - La OT debe aparecer en la pestaña de ejecución
         # - No debe aparecer en ninguna de las demás pestañas
         # - Le deben aparecer 3 acciones posibles (info, Aceptar, Rechazar)
         # - Poder apretar botón Aceptar
    SSLEEP
    Login                                  mgestor1                                                                                              password
    Debe existir en la tabla               ${OT name}                                                                                            Ejecucion
    Acciones PEND VALID GEN ACTA GESTOR
    Execute javascript                     document.querySelector("#action-buttons > app-menu > p-menu > div > ul>li:nth-child(2)>a").click()
    Confirmar
   #  No debe existir en la tabla            ${OT name}                                                                                            Ejecucion
   #  No debe existir en la tabla            ${OT name}                                                                                            Cerradas
   #  Debe existir en la tabla               ${OT name}                                                                                            Abiertas
    Logout

    close Browser