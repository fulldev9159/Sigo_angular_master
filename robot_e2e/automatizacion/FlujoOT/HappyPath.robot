*** Settings ***
Documentation    Test de funcionanildad del modulo de Usuarios.
...
...         This test has a workflow that is created using keywords in
...         the imported resource file.
Resource    ../../resource.robot

*** Test Cases ***
Flujo happy path
    Open Browser To Page        ${url}
    Login                       ${user}         password
    ${OT name}=                 set variable    OT ${prefijo} HAPPY PATH ROBOT
   #VALIDACIONES
      # REGLAS
         # - Soy el usuario (mgestor1)  que creó la OT
         # - ETAPA: Pendiente de Autorización por Adm. Contrato
      # CRITERIOS DE ACEPTACION
         # - Debe ver la OT en la pestaña abiertas solamente
         # - Por ahora solo puede tener la acción de ver detalles de la OT
   #  sleep                          1
   #  No debe existir en la tabla    ${OT name}      Ejecucion
    Debe existir en la tabla    ${OT name}      Abiertas
    Acciones solo Info 
   #  No debe existir en la tabla    ${OT name}      Cerradas
   #  sleep                          1
    Logout                      

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

    Login                                 cadmincontrato1    password
    Debe existir en la tabla              ${OT name}         Ejecucion
    Acciones PEND AUTH ADMIN Contrato 
   #  No Debe existir en la tabla           ${OT name}         Abiertas
   #  No debe existir en la tabla           ${OT name}         Cerradas
    Accionar                              Aceptar OT