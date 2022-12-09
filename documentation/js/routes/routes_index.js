var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"home","pathMatch":"full"},{"path":"login","loadChildren":"./features/auth/auth.module#AuthModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/auth/auth-routing.module.ts","module":"AuthRoutingModule","children":[{"path":"","component":"AuthComponent","children":[{"path":"","redirectTo":"auth","pathMatch":"full"},{"path":"auth","component":"LoginFormComponent","canActivate":["AuthTokenGuard"]},{"path":"two-factor-authentication","component":"TwoFactorAuthenticationComponent","canActivate":["IsNot2FAGuard"]},{"path":"perfil-select","component":"PerfilSelectComponent","canActivate":["ProfiledGuard"],"resolve":{"perfilesUsuario":"PerfilesUsuarioResolver"}}]}],"kind":"module"}],"module":"AuthModule"}]},{"path":"home","loadChildren":"./features/home/home.module#HomeModule","canActivate":["SigoGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/home/home-routing.module.ts","module":"HomeRoutingModule","children":[{"path":"","component":"HomeComponent"}],"kind":"module"}],"module":"HomeModule"}]},{"path":"cubicacion","loadChildren":"./features/cubicacion/cubicacion.module#CubicacionModule","canActivate":["SigoGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/cubicacion/cubicacion-routing.module.ts","module":"CubicacionRoutingModule","children":[{"path":"","component":"CubicacionComponent","children":[{"path":"","redirectTo":"list-cub","pathMatch":"full"},{"path":"list-cub","component":"ListCubComponent","resolve":{"cubicaciones":"CubicacionesResolver"}},{"path":"form-cub","component":"FormCubContainerComponent","resolve":{"contratosUsuario":"ContratosUsuarioResolver","tipoCubicacion":"TipoCubicacionResolver"}},{"path":"form-cub/:id","component":"FormCubContainerComponent","resolve":{"contratosUsuario":"ContratosUsuarioResolver","tipoCubicacion":"TipoCubicacionResolver","detalleCubicacion":"DetalleCubicacionResolver"}}]}],"kind":"module"}],"module":"CubicacionModule"}]},{"path":"ot","loadChildren":"./features/ot/ot.module#OtModule","canActivate":["SigoGuard"]},{"path":"ot-detalle","loadChildren":"./features/ot-detalle/ot-detalle.module#OtDetalleModule","canActivate":["SigoGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/ot-detalle/ot-detalle-routing.module.ts","module":"OtDetalleRoutingModule","children":[{"path":"","component":"OtDetalleComponent","children":[{"path":"","redirectTo":"informacion","pathMatch":"full"},{"path":"informacion/:id","component":"InformacionComponent","resolve":{"detalleOT":"DetalleOTResolver","accionesOT":"AccionesOTResolver"}},{"path":"costeos/:id","component":"CosteoComponent","resolve":{"detalleOT":"DetalleOTResolver","cubicacion":"DetalleCubicacionFromOTResolver"}},{"path":"libro-obras/:id","component":"LibroObrasComponent","resolve":{"registroLibroObras":"RegistroLibroLobrasResolver","detalleOT":"DetalleOTResolver"}},{"path":"anexos/:id","component":"AnexosComponent","resolve":{"registroLibroObras":"RegistroLibroLobrasResolver","detalleOT":"DetalleOTResolver"}}]}],"kind":"module"}],"module":"OtDetalleModule"}]},{"path":"informe-avance","loadChildren":"./features/informe-avance/informe-avance.module#InformeAvanceModule","canActivate":["SigoGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/informe-avance/informe-avance-routing.module.ts","module":"InformeAvanceRoutingModule","children":[{"path":"","redirectTo":"informe-avance","pathMatch":"full"},{"path":"informe-avance/:id","component":"InformeAvanceComponent","resolve":{"detalleOT":"DetalleOTResolver","detalleInformeAvance":"DetalleInformeAvanceResolver","accionesOT":"AccionesOTResolver"}}],"kind":"module"}],"module":"InformeAvanceModule"}]},{"path":"ingenieria","loadChildren":"./features/ingenieria/ingenieria.module#IngenieriaModule","canActivate":["SigoGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/ingenieria/ingenieria-routing.module.ts","module":"IngenieriaRoutingModule","children":[{"path":"","redirectTo":"resultado-ingenieria","pathMatch":"full"},{"path":"resultado-ingenieria/:id","component":"ResultadoIngenieriaContainerComponent","resolve":{"detalleOT":"DetalleOTResolver","cubicacionIngenieria":"DetalleCubicacionIngFromOTResolver","accionesOT":"AccionesOTResolver"}},{"path":"validar-ingenieria/:id","component":"ValidarIngenieriaContainerComponent","resolve":{"detalleOT":"DetalleOTResolver","cubicacionIngenieria":"DetalleCubicacionIngFromOTResolver","accionesOT":"AccionesOTResolver"}},{"path":"ver-ingenieria/:id","component":"VerIngenieriaContainerComponent","resolve":{"detalleOT":"DetalleOTResolver","cubicacionIngenieria":"DetalleCubicacionIngFromOTResolver","accionesOT":"AccionesOTResolver"}}],"kind":"module"}],"module":"IngenieriaModule"}]},{"path":"acta","loadChildren":"./features/acta/acta.module#ActaModule","canActivate":["SigoGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/acta/acta-routing.module.ts","module":"ActaRoutingModule","children":[{"path":"","component":"ActaComponent","children":[{"path":"","redirectTo":"list-actas","pathMatch":"full"},{"path":"listar-actas/:id","component":"ListActasContainerComponent","resolve":{"detalleOT":"DetalleOTResolver","listActas":"ListActasResolver"}},{"path":"generar-acta/:id","component":"GenerarActaContainerComponent","resolve":{"servicios4acta":"Servicios4ActaResolver","uos4acta":"UOs4ActaResolver","accionesOT":"AccionesOTResolver","totalActas":"TotalActasResolver","observacionesTrabajo":"ObservacionesTrabajosResolver","detalleOT":"DetalleOTResolver"}},{"path":"validar-acta/:id","component":"ValidarActaContainerComponent","resolve":{"servicios4acta":"Servicios4ActaResolver","uos4acta":"UOs4ActaResolver","accionesOT":"AccionesOTResolver","actaTiposPagos":"ActaTiposPagosResolver","observacionesTrabajo":"ObservacionesTrabajosResolver","detalleInformeAvance":"DetalleInformeAvanceResolver","lastActa":"LastActaResolver","totalActas":"TotalActasResolver","detalleOT":"DetalleOTResolver"}},{"path":"validar-pago-acta/:id","component":"ValidarPagoActaContainerComponent","resolve":{"accionesOT":"AccionesOTResolver","lastActa":"LastActaResolver","detalleInformeAvance":"DetalleInformeAvanceResolver","detalleOT":"DetalleOTResolver"}},{"path":"validar-trabajos-operaciones/:id","component":"ValidarActaOperacionesContainerComponent","resolve":{"accionesOT":"AccionesOTResolver","detalleInformeAvance":"DetalleInformeAvanceResolver","detalleOT":"DetalleOTResolver"}}]}],"kind":"module"}],"module":"ActaModule"}]},{"path":"administracion","loadChildren":"./features/administracion/administracion.module#AdministracionModule","canActivate":["SigoGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/administracion/administracion-routing.module.ts","module":"AdministracionRoutingModule","children":[{"path":"usuarios","loadChildren":"./usuario/usuario.module#UsuarioModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/administracion/usuario/usuario-routing.module.ts","module":"UsuarioRoutingModule","children":[{"path":"","component":"UsuarioComponent","children":[{"path":"","redirectTo":"list-usuarios","pathMatch":"full"},{"path":"list-usuarios","component":"ListUsuarioContainerComponent"},{"path":"form-usuario","component":"FormUsuarioContainerComponent"},{"path":"form-usuario/:id","component":"FormUsuarioContainerComponent"},{"path":"list-perfiles-usuario/:id","component":"ListPerfilesUsuarioContainerComponent"}]}],"kind":"module"}],"module":"UsuarioModule"}]},{"path":"perfiles","loadChildren":"./perfiles/perfiles.module#PerfilesModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/administracion/perfiles/perfiles-routing.module.ts","module":"PerfilesRoutingModule","children":[{"path":"","component":"PerfilesComponent","children":[{"path":"","redirectTo":"list-perfiles","pathMatch":"full"},{"path":"list-perfiles","component":"ListPerfilesContainerComponent"},{"path":"form-perfiles","component":"FormPerfilesContainerComponent"},{"path":"form-perfiles/:id","component":"FormPerfilesContainerComponent"}]}],"kind":"module"}],"module":"PerfilesModule"}]},{"path":"areas","loadChildren":"./areas/areas.module#AreasModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/administracion/areas/areas-routing.module.ts","module":"AreasRoutingModule","children":[{"path":"","component":"AreasComponent","children":[{"path":"","redirectTo":"list-areas","pathMatch":"full"},{"path":"list-areas","component":"ListAreasContainerComponent"},{"path":"form-areas/:id","component":"FormAreasContainerComponent"}]}],"kind":"module"}],"module":"AreasModule"}]},{"path":"contratos","loadChildren":"./contratos/contratos.module#ContratosModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/administracion/contratos/contratos-routing.module.ts","module":"ContratosRoutingModule","children":[{"path":"","component":"ContratosComponent","children":[{"path":"","redirectTo":"list-contratos","pathMatch":"full"},{"path":"list-contratos","component":"ListContratosContainerComponent"},{"path":"form-contratos/:id","component":"FormContratosContainerComponent"}]}],"kind":"module"}],"module":"ContratosModule"}]}],"kind":"module"}],"module":"AdministracionModule"}]},{"path":"reportes","loadChildren":"./features/reportes/reportes.module#ReportesModule","data":{"permissions":{"only":"REPORTE_BASE"}},"canActivate":["SigoGuard","NgxPermissionsGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/features/reportes/reportes-routing.module.ts","module":"ReportesRoutingModule","children":[{"path":"","component":"ReportesComponent","children":[{"path":"","redirectTo":"ot","pathMatch":"full"},{"path":"ot","component":"OtsAsignadasComponent"}]}],"kind":"module"}],"module":"ReportesModule"}]}],"kind":"module"}]}
