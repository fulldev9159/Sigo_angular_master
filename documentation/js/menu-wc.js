'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">web-sigo documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ee6b717bcbe9963093d8875082feb1e8e14167152c0fac2ca948281a168a5d7857ef18b2ad17deb5fcda3bb358392472687951fc08bd643d65ac68a5148473db"' : 'data-target="#xs-components-links-module-AppModule-ee6b717bcbe9963093d8875082feb1e8e14167152c0fac2ca948281a168a5d7857ef18b2ad17deb5fcda3bb358392472687951fc08bd643d65ac68a5148473db"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ee6b717bcbe9963093d8875082feb1e8e14167152c0fac2ca948281a168a5d7857ef18b2ad17deb5fcda3bb358392472687951fc08bd643d65ac68a5148473db"' :
                                            'id="xs-components-links-module-AppModule-ee6b717bcbe9963093d8875082feb1e8e14167152c0fac2ca948281a168a5d7857ef18b2ad17deb5fcda3bb358392472687951fc08bd643d65ac68a5148473db"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-a0291837c62ed81ad8382751d42492adeb40d7d862bf03ba23997456ee7519455a04111cfac2b4d45182e88b3cbbee6e7fca36491c3f3dcbcbfc77cc247a1f3b"' : 'data-target="#xs-components-links-module-AuthModule-a0291837c62ed81ad8382751d42492adeb40d7d862bf03ba23997456ee7519455a04111cfac2b4d45182e88b3cbbee6e7fca36491c3f3dcbcbfc77cc247a1f3b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-a0291837c62ed81ad8382751d42492adeb40d7d862bf03ba23997456ee7519455a04111cfac2b4d45182e88b3cbbee6e7fca36491c3f3dcbcbfc77cc247a1f3b"' :
                                            'id="xs-components-links-module-AuthModule-a0291837c62ed81ad8382751d42492adeb40d7d862bf03ba23997456ee7519455a04111cfac2b4d45182e88b3cbbee6e7fca36491c3f3dcbcbfc77cc247a1f3b"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilSelectComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-33d68a45439e419dcda308473da44086f99a2578225d81d650458d4ab3ca5739c5e58375241feb57ffbd2bafc2d6da6ada5d0f8e5a3532244203ba16f15e599f"' : 'data-target="#xs-components-links-module-CoreModule-33d68a45439e419dcda308473da44086f99a2578225d81d650458d4ab3ca5739c5e58375241feb57ffbd2bafc2d6da6ada5d0f8e5a3532244203ba16f15e599f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-33d68a45439e419dcda308473da44086f99a2578225d81d650458d4ab3ca5739c5e58375241feb57ffbd2bafc2d6da6ada5d0f8e5a3532244203ba16f15e599f"' :
                                            'id="xs-components-links-module-CoreModule-33d68a45439e419dcda308473da44086f99a2578225d81d650458d4ab3ca5739c5e58375241feb57ffbd2bafc2d6da6ada5d0f8e5a3532244203ba16f15e599f"' }>
                                            <li class="link">
                                                <a href="components/MainLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CubicacionModule.html" data-type="entity-link" >CubicacionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CubicacionModule-425de56a6709d34e503eb743a9a68c25f8d576223aaf46e0bd606fc2a82719aa763fa11eebaae65648914f27d0e3b61f58ac349aafba1ed9ad0006393a684e40"' : 'data-target="#xs-components-links-module-CubicacionModule-425de56a6709d34e503eb743a9a68c25f8d576223aaf46e0bd606fc2a82719aa763fa11eebaae65648914f27d0e3b61f58ac349aafba1ed9ad0006393a684e40"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CubicacionModule-425de56a6709d34e503eb743a9a68c25f8d576223aaf46e0bd606fc2a82719aa763fa11eebaae65648914f27d0e3b61f58ac349aafba1ed9ad0006393a684e40"' :
                                            'id="xs-components-links-module-CubicacionModule-425de56a6709d34e503eb743a9a68c25f8d576223aaf46e0bd606fc2a82719aa763fa11eebaae65648914f27d0e3b61f58ac349aafba1ed9ad0006393a684e40"' }>
                                            <li class="link">
                                                <a href="components/CubicacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CubicacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormCubContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormCubContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormularioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormularioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListCubComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListCubComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CubicacionRoutingModule.html" data-type="entity-link" >CubicacionRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-0fa1f3ed42c6ab283e30e37fb2cacebeed21234decc21a9dd9ac4b9c3e29d00ed9d61da45fcf1982e4e31b78fb6b81198c6ce1bab219cde866efcdfa6207b6aa"' : 'data-target="#xs-components-links-module-HomeModule-0fa1f3ed42c6ab283e30e37fb2cacebeed21234decc21a9dd9ac4b9c3e29d00ed9d61da45fcf1982e4e31b78fb6b81198c6ce1bab219cde866efcdfa6207b6aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-0fa1f3ed42c6ab283e30e37fb2cacebeed21234decc21a9dd9ac4b9c3e29d00ed9d61da45fcf1982e4e31b78fb6b81198c6ce1bab219cde866efcdfa6207b6aa"' :
                                            'id="xs-components-links-module-HomeModule-0fa1f3ed42c6ab283e30e37fb2cacebeed21234decc21a9dd9ac4b9c3e29d00ed9d61da45fcf1982e4e31b78fb6b81198c6ce1bab219cde866efcdfa6207b6aa"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OtModule.html" data-type="entity-link" >OtModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OtModule-322365ed2104bfcd2c1dc242a3381fad7d00295470d388d3b695f208b0c2f11eff3d873d8df8423abea25977afb77065896ececc85f8d910dd51acf5449cfb98"' : 'data-target="#xs-components-links-module-OtModule-322365ed2104bfcd2c1dc242a3381fad7d00295470d388d3b695f208b0c2f11eff3d873d8df8423abea25977afb77065896ececc85f8d910dd51acf5449cfb98"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OtModule-322365ed2104bfcd2c1dc242a3381fad7d00295470d388d3b695f208b0c2f11eff3d873d8df8423abea25977afb77065896ececc85f8d910dd51acf5449cfb98"' :
                                            'id="xs-components-links-module-OtModule-322365ed2104bfcd2c1dc242a3381fad7d00295470d388d3b695f208b0c2f11eff3d873d8df8423abea25977afb77065896ececc85f8d910dd51acf5449cfb98"' }>
                                            <li class="link">
                                                <a href="components/OtComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OtComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OtRoutingModule.html" data-type="entity-link" >OtRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrimeNgModule.html" data-type="entity-link" >PrimeNgModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-2f4feffce24debecfc159a79cdf0cab62c992ece1d4d0f08e37176eb5deeb72f9fd0793afd2b1fa0c9833123210d2cb24dabdbb0e499df61df1710fb18de01ad"' : 'data-target="#xs-components-links-module-SharedModule-2f4feffce24debecfc159a79cdf0cab62c992ece1d4d0f08e37176eb5deeb72f9fd0793afd2b1fa0c9833123210d2cb24dabdbb0e499df61df1710fb18de01ad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-2f4feffce24debecfc159a79cdf0cab62c992ece1d4d0f08e37176eb5deeb72f9fd0793afd2b1fa0c9833123210d2cb24dabdbb0e499df61df1710fb18de01ad"' :
                                            'id="xs-components-links-module-SharedModule-2f4feffce24debecfc159a79cdf0cab62c992ece1d4d0f08e37176eb5deeb72f9fd0793afd2b1fa0c9833123210d2cb24dabdbb0e499df61df1710fb18de01ad"' }>
                                            <li class="link">
                                                <a href="components/BaseTdComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BaseTdComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormAgregarServiciosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormAgregarServiciosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormTableServicesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormTableServicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputAlertComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputAlertComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MultiTdComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MultiTdComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PbuttonSendingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PbuttonSendingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PdropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PdropdownComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreSIGOModule.html" data-type="entity-link" >StoreSIGOModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AfterHttpService.html" data-type="entity-link" >AfterHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthEffects.html" data-type="entity-link" >AuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthFacade.html" data-type="entity-link" >AuthFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthHttpService.html" data-type="entity-link" >AuthHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContratoEffects.html" data-type="entity-link" >ContratoEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContratoFacade.html" data-type="entity-link" >ContratoFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContratoHttpService.html" data-type="entity-link" >ContratoHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CubicacionEffects.html" data-type="entity-link" >CubicacionEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CubicacionFacade.html" data-type="entity-link" >CubicacionFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CubicacionHttpService.html" data-type="entity-link" >CubicacionHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormularioService.html" data-type="entity-link" >FormularioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingsFacade.html" data-type="entity-link" >LoadingsFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PerfilEffects.html" data-type="entity-link" >PerfilEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PerfilesHttpService.html" data-type="entity-link" >PerfilesHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PerfilFacade.html" data-type="entity-link" >PerfilFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProveedorEffects.html" data-type="entity-link" >ProveedorEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProveedorFacade.html" data-type="entity-link" >ProveedorFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProveedorHttpService.html" data-type="entity-link" >ProveedorHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiciosEffects.html" data-type="entity-link" >ServiciosEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiciosFacade.html" data-type="entity-link" >ServiciosFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiciosHttpService.html" data-type="entity-link" >ServiciosHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackMessageService.html" data-type="entity-link" >SnackMessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioEffects.html" data-type="entity-link" >UsuarioEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioFacade.html" data-type="entity-link" >UsuarioFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioHttpService.html" data-type="entity-link" >UsuarioHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link" >UtilsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link" >TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthTokenGuard.html" data-type="entity-link" >AuthTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ContratosUsuarioResolver.html" data-type="entity-link" >ContratosUsuarioResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/CubicacionesResolver.html" data-type="entity-link" >CubicacionesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/PerfilesUsuarioResolver.html" data-type="entity-link" >PerfilesUsuarioResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ProfiledGuard.html" data-type="entity-link" >ProfiledGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/SigoGuard.html" data-type="entity-link" >SigoGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/TipoCubicacionResolver.html" data-type="entity-link" >TipoCubicacionResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Accion.html" data-type="entity-link" >Accion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionErr.html" data-type="entity-link" >ActionErr</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActionSuccess.html" data-type="entity-link" >ActionSuccess</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActividadContratoProveedor.html" data-type="entity-link" >ActividadContratoProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AgenciaContrato.html" data-type="entity-link" >AgenciaContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarritoService.html" data-type="entity-link" >CarritoService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarritoUO.html" data-type="entity-link" >CarritoUO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContratosUser.html" data-type="entity-link" >ContratosUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cubicacion.html" data-type="entity-link" >Cubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetallesServicioTipoAgenciaContratoProveedor.html" data-type="entity-link" >DetallesServicioTipoAgenciaContratoProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetallesUnidadObraServicio.html" data-type="entity-link" >DetallesUnidadObraServicio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Dropdown.html" data-type="entity-link" >Dropdown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Dropdown-1.html" data-type="entity-link" >Dropdown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Dropdown-2.html" data-type="entity-link" >Dropdown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialesManoObra.html" data-type="entity-link" >MaterialesManoObra</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelContratoMarco.html" data-type="entity-link" >ModelContratoMarco</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelPerfil.html" data-type="entity-link" >ModelPerfil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelPerfilUserWithRol.html" data-type="entity-link" >ModelPerfilUserWithRol</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelProxyUsuarios.html" data-type="entity-link" >ModelProxyUsuarios</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelServicio.html" data-type="entity-link" >ModelServicio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelUnidadObra.html" data-type="entity-link" >ModelUnidadObra</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelUsuario.html" data-type="entity-link" >ModelUsuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelUsuarioSuperior.html" data-type="entity-link" >ModelUsuarioSuperior</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NuevoServicio.html" data-type="entity-link" >NuevoServicio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NuevoUO.html" data-type="entity-link" >NuevoUO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PerfilesUsuario.html" data-type="entity-link" >PerfilesUsuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProveedorAgenciaContrato.html" data-type="entity-link" >ProveedorAgenciaContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestCreateCubicacion.html" data-type="entity-link" >RequestCreateCubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestEditCubicacion.html" data-type="entity-link" >RequestEditCubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestGetDetallesServicioTipoAgenciaContratoProveedor.html" data-type="entity-link" >RequestGetDetallesServicioTipoAgenciaContratoProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestGetServicioTipoAgenciaContratoProveedor.html" data-type="entity-link" >RequestGetServicioTipoAgenciaContratoProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestGetUnidadObraServicio.html" data-type="entity-link" >RequestGetUnidadObraServicio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rol.html" data-type="entity-link" >Rol</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceTableCarrito.html" data-type="entity-link" >ServiceTableCarrito</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServicioAgenciaContratoProveedor.html" data-type="entity-link" >ServicioAgenciaContratoProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServicioUOActualizar.html" data-type="entity-link" >ServicioUOActualizar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SessionData.html" data-type="entity-link" >SessionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateAuth.html" data-type="entity-link" >StateAuth</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateContrato.html" data-type="entity-link" >StateContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateCubicacion.html" data-type="entity-link" >StateCubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateLoadings.html" data-type="entity-link" >StateLoadings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StatePerfil.html" data-type="entity-link" >StatePerfil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateProveedor.html" data-type="entity-link" >StateProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateServicios.html" data-type="entity-link" >StateServicios</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateUsuario.html" data-type="entity-link" >StateUsuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StatusResponse.html" data-type="entity-link" >StatusResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TipoCubicacion.html" data-type="entity-link" >TipoCubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TipoServicioContrato.html" data-type="entity-link" >TipoServicioContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnidadObraServicio.html" data-type="entity-link" >UnidadObraServicio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UOAgregar.html" data-type="entity-link" >UOAgregar</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});