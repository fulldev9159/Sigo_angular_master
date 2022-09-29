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
                                            'data-target="#components-links-module-CoreModule-6fb1e8218146f4363aacdbb918f89bdfa69e75599fb0351d2b80ec14304dfc087648bc03fb78f58636798c32eb4c878cd99002eb6d4d27f73083a6c55e23cd3e"' : 'data-target="#xs-components-links-module-CoreModule-6fb1e8218146f4363aacdbb918f89bdfa69e75599fb0351d2b80ec14304dfc087648bc03fb78f58636798c32eb4c878cd99002eb6d4d27f73083a6c55e23cd3e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-6fb1e8218146f4363aacdbb918f89bdfa69e75599fb0351d2b80ec14304dfc087648bc03fb78f58636798c32eb4c878cd99002eb6d4d27f73083a6c55e23cd3e"' :
                                            'id="xs-components-links-module-CoreModule-6fb1e8218146f4363aacdbb918f89bdfa69e75599fb0351d2b80ec14304dfc087648bc03fb78f58636798c32eb4c878cd99002eb6d4d27f73083a6c55e23cd3e"' }>
                                            <li class="link">
                                                <a href="components/MainLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuDetalleOtComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuDetalleOtComponent</a>
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
                                            'data-target="#components-links-module-CubicacionModule-7a429998fa3b187f9b207b7bdfe3bb3874a7f386897122200979e12932c83c024a98e959c6d99c22de45f49f85fecf6064e49c3c9039aca50b28700b5bd9b59f"' : 'data-target="#xs-components-links-module-CubicacionModule-7a429998fa3b187f9b207b7bdfe3bb3874a7f386897122200979e12932c83c024a98e959c6d99c22de45f49f85fecf6064e49c3c9039aca50b28700b5bd9b59f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CubicacionModule-7a429998fa3b187f9b207b7bdfe3bb3874a7f386897122200979e12932c83c024a98e959c6d99c22de45f49f85fecf6064e49c3c9039aca50b28700b5bd9b59f"' :
                                            'id="xs-components-links-module-CubicacionModule-7a429998fa3b187f9b207b7bdfe3bb3874a7f386897122200979e12932c83c024a98e959c6d99c22de45f49f85fecf6064e49c3c9039aca50b28700b5bd9b59f"' }>
                                            <li class="link">
                                                <a href="components/ClonadorCubicacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClonadorCubicacionComponent</a>
                                            </li>
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
                                <a href="modules/OtDetalleModule.html" data-type="entity-link" >OtDetalleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OtDetalleModule-affb8e6775203cf7598ad5af96863f06fc5cc0a4f213f26aae927b516d1cf49683e2b38d0c72c9c0653be4503eab168275570f3004c78114ec55ab524f0ffea3"' : 'data-target="#xs-components-links-module-OtDetalleModule-affb8e6775203cf7598ad5af96863f06fc5cc0a4f213f26aae927b516d1cf49683e2b38d0c72c9c0653be4503eab168275570f3004c78114ec55ab524f0ffea3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OtDetalleModule-affb8e6775203cf7598ad5af96863f06fc5cc0a4f213f26aae927b516d1cf49683e2b38d0c72c9c0653be4503eab168275570f3004c78114ec55ab524f0ffea3"' :
                                            'id="xs-components-links-module-OtDetalleModule-affb8e6775203cf7598ad5af96863f06fc5cc0a4f213f26aae927b516d1cf49683e2b38d0c72c9c0653be4503eab168275570f3004c78114ec55ab524f0ffea3"' }>
                                            <li class="link">
                                                <a href="components/InformeAvanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InformeAvanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OtDetalleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OtDetalleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OtDetalleRoutingModule.html" data-type="entity-link" >OtDetalleRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OtModule.html" data-type="entity-link" >OtModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OtModule-9433faa5e37416ed361c247867bb00b63ba002c637417c17b9484b79aedbe86a0794f8b715f892d66cb9bcc89d77ac70a464fa394a276dca9ba6b9b21e4a2edd"' : 'data-target="#xs-components-links-module-OtModule-9433faa5e37416ed361c247867bb00b63ba002c637417c17b9484b79aedbe86a0794f8b715f892d66cb9bcc89d77ac70a464fa394a276dca9ba6b9b21e4a2edd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OtModule-9433faa5e37416ed361c247867bb00b63ba002c637417c17b9484b79aedbe86a0794f8b715f892d66cb9bcc89d77ac70a464fa394a276dca9ba6b9b21e4a2edd"' :
                                            'id="xs-components-links-module-OtModule-9433faa5e37416ed361c247867bb00b63ba002c637417c17b9484b79aedbe86a0794f8b715f892d66cb9bcc89d77ac70a464fa394a276dca9ba6b9b21e4a2edd"' }>
                                            <li class="link">
                                                <a href="components/FormOtContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormOtContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormularioOtBaseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormularioOtBaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormularioOtBucleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormularioOtBucleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormularioOtExtrasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormularioOtExtrasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormularioOtFijoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormularioOtFijoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormularioOtMovilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormularioOtMovilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormularioOtOrdinarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormularioOtOrdinarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormularioOtSustentoFinancieroComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormularioOtSustentoFinancieroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListOtContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListOtContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListOtFiltrosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListOtFiltrosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListOtTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListOtTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListOtTableOperacionesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListOtTableOperacionesComponent</a>
                                            </li>
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
                                            'data-target="#components-links-module-SharedModule-9e7b9115adbb2140d6cdb91382d204aeb9a43763749b746d33d5e55e3f9087cd2909527825e11757c79912b2c7653ed367533c35f065650df41a852d120a9052"' : 'data-target="#xs-components-links-module-SharedModule-9e7b9115adbb2140d6cdb91382d204aeb9a43763749b746d33d5e55e3f9087cd2909527825e11757c79912b2c7653ed367533c35f065650df41a852d120a9052"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-9e7b9115adbb2140d6cdb91382d204aeb9a43763749b746d33d5e55e3f9087cd2909527825e11757c79912b2c7653ed367533c35f065650df41a852d120a9052"' :
                                            'id="xs-components-links-module-SharedModule-9e7b9115adbb2140d6cdb91382d204aeb9a43763749b746d33d5e55e3f9087cd2909527825e11757c79912b2c7653ed367533c35f065650df41a852d120a9052"' }>
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
                                            <li class="link">
                                                <a href="components/TableAgregarServiciosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableAgregarServiciosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewConfirmacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewConfirmacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewRechazoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewRechazoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewServiceTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewServiceTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewTableServicesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewTableServicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewUOTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewUOTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-9e7b9115adbb2140d6cdb91382d204aeb9a43763749b746d33d5e55e3f9087cd2909527825e11757c79912b2c7653ed367533c35f065650df41a852d120a9052"' : 'data-target="#xs-directives-links-module-SharedModule-9e7b9115adbb2140d6cdb91382d204aeb9a43763749b746d33d5e55e3f9087cd2909527825e11757c79912b2c7653ed367533c35f065650df41a852d120a9052"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-9e7b9115adbb2140d6cdb91382d204aeb9a43763749b746d33d5e55e3f9087cd2909527825e11757c79912b2c7653ed367533c35f065650df41a852d120a9052"' :
                                        'id="xs-directives-links-module-SharedModule-9e7b9115adbb2140d6cdb91382d204aeb9a43763749b746d33d5e55e3f9087cd2909527825e11757c79912b2c7653ed367533c35f065650df41a852d120a9052"' }>
                                        <li class="link">
                                            <a href="directives/ColorPrecargadoDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColorPrecargadoDirective</a>
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
                                    <a href="injectables/FlujoOTEffects.html" data-type="entity-link" >FlujoOTEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FlujoOTFacade.html" data-type="entity-link" >FlujoOTFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FlujoOtHttpService.html" data-type="entity-link" >FlujoOtHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormularioService.html" data-type="entity-link" >FormularioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InformeAvanceEffects.html" data-type="entity-link" >InformeAvanceEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InformeAvanceFacade.html" data-type="entity-link" >InformeAvanceFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InformeAvanceHttpService.html" data-type="entity-link" >InformeAvanceHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingsFacade.html" data-type="entity-link" >LoadingsFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NumeroInternoEffects.html" data-type="entity-link" >NumeroInternoEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NumeroInternoFacade.html" data-type="entity-link" >NumeroInternoFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NumeroInternoHttpService.html" data-type="entity-link" >NumeroInternoHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OTDetalleEffects.html" data-type="entity-link" >OTDetalleEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OTDetalleFacade.html" data-type="entity-link" >OTDetalleFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OtDetalleHttpService.html" data-type="entity-link" >OtDetalleHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OTEffects.html" data-type="entity-link" >OTEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OTFacade.html" data-type="entity-link" >OTFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OtHttpService.html" data-type="entity-link" >OtHttpService</a>
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
                                    <a href="injectables/ProyectosEffects.html" data-type="entity-link" >ProyectosEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProyectosFacade.html" data-type="entity-link" >ProyectosFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProyectosHttpService.html" data-type="entity-link" >ProyectosHttpService</a>
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
                                    <a href="injectables/SustentoFinancieroEffects.html" data-type="entity-link" >SustentoFinancieroEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SustentoFinancieroFacade.html" data-type="entity-link" >SustentoFinancieroFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SustentoFinancieroHttpService.html" data-type="entity-link" >SustentoFinancieroHttpService</a>
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
                                <a href="guards/DetalleCubicacionResolver.html" data-type="entity-link" >DetalleCubicacionResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/DetalleInformeAvanceResolver.html" data-type="entity-link" >DetalleInformeAvanceResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/DetalleOTResolver.html" data-type="entity-link" >DetalleOTResolver</a>
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
                                <a href="interfaces/Actividad.html" data-type="entity-link" >Actividad</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActividadContratoProveedor.html" data-type="entity-link" >ActividadContratoProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdminContratoFromCub.html" data-type="entity-link" >AdminContratoFromCub</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AgenciaContrato.html" data-type="entity-link" >AgenciaContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AreaDeNegocio.html" data-type="entity-link" >AreaDeNegocio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarritoService.html" data-type="entity-link" >CarritoService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarritoUO.html" data-type="entity-link" >CarritoUO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CECO.html" data-type="entity-link" >CECO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Comuna.html" data-type="entity-link" >Comuna</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContratoMarconWithTipoContratoModel.html" data-type="entity-link" >ContratoMarconWithTipoContratoModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContratosUser.html" data-type="entity-link" >ContratosUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateOTBase.html" data-type="entity-link" >CreateOTBase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateOTBucle.html" data-type="entity-link" >CreateOTBucle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateOTMovil.html" data-type="entity-link" >CreateOTMovil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateOTOrdinario.html" data-type="entity-link" >CreateOTOrdinario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cubicacion.html" data-type="entity-link" >Cubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CubicacionContrato.html" data-type="entity-link" >CubicacionContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleComuna.html" data-type="entity-link" >DetalleComuna</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleCubicacion.html" data-type="entity-link" >DetalleCubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleCubicacionWithContratoModel.html" data-type="entity-link" >DetalleCubicacionWithContratoModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleInformeAvance.html" data-type="entity-link" >DetalleInformeAvance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleMaterialCubicacion.html" data-type="entity-link" >DetalleMaterialCubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleOT.html" data-type="entity-link" >DetalleOT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleServicioCubicacion.html" data-type="entity-link" >DetalleServicioCubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetallesServicioTipoAgenciaContratoProveedor.html" data-type="entity-link" >DetallesServicioTipoAgenciaContratoProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetallesUnidadObraServicio.html" data-type="entity-link" >DetallesUnidadObraServicio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleTipoDeTrabajo.html" data-type="entity-link" >DetalleTipoDeTrabajo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleUOCubicacion.html" data-type="entity-link" >DetalleUOCubicacion</a>
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
                                <a href="interfaces/Dropdown-3.html" data-type="entity-link" >Dropdown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Dropdown-4.html" data-type="entity-link" >Dropdown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LP.html" data-type="entity-link" >LP</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialesManoObra.html" data-type="entity-link" >MaterialesManoObra</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialFromInformeAvance.html" data-type="entity-link" >MaterialFromInformeAvance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelAgencia.html" data-type="entity-link" >ModelAgencia</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelContratoMarco.html" data-type="entity-link" >ModelContratoMarco</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelMaterial.html" data-type="entity-link" >ModelMaterial</a>
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
                                <a href="interfaces/NumeroInterno.html" data-type="entity-link" >NumeroInterno</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OficinaCentral.html" data-type="entity-link" >OficinaCentral</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OficinaCentralWithAgenciaModel.html" data-type="entity-link" >OficinaCentralWithAgenciaModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OPEX.html" data-type="entity-link" >OPEX</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OT.html" data-type="entity-link" >OT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OTFromNumeroInterno.html" data-type="entity-link" >OTFromNumeroInterno</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PEP2.html" data-type="entity-link" >PEP2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PerfilesUsuario.html" data-type="entity-link" >PerfilesUsuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlanProyecto.html" data-type="entity-link" >PlanProyecto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PMO.html" data-type="entity-link" >PMO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PosibleSupervisorTrabajo.html" data-type="entity-link" >PosibleSupervisorTrabajo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProveedorAgenciaContrato.html" data-type="entity-link" >ProveedorAgenciaContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Proyectos.html" data-type="entity-link" >Proyectos</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAceptarRechazarOT.html" data-type="entity-link" >RequestAceptarRechazarOT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestBandejaOT.html" data-type="entity-link" >RequestBandejaOT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestCreateCubicacion.html" data-type="entity-link" >RequestCreateCubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestCreateOTBucle.html" data-type="entity-link" >RequestCreateOTBucle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestCreateOTFijo.html" data-type="entity-link" >RequestCreateOTFijo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestCreateOTMovil.html" data-type="entity-link" >RequestCreateOTMovil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestCreateOTOrdinario.html" data-type="entity-link" >RequestCreateOTOrdinario</a>
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
                                <a href="interfaces/SAP.html" data-type="entity-link" >SAP</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceTableCarrito.html" data-type="entity-link" >ServiceTableCarrito</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServicioAgenciaContratoProveedor.html" data-type="entity-link" >ServicioAgenciaContratoProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServicioFromInfomeAvance.html" data-type="entity-link" >ServicioFromInfomeAvance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServicioUOActualizar.html" data-type="entity-link" >ServicioUOActualizar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SessionData.html" data-type="entity-link" >SessionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Sitio.html" data-type="entity-link" >Sitio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SolicitadoPor.html" data-type="entity-link" >SolicitadoPor</a>
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
                                <a href="interfaces/StateFlujoOT.html" data-type="entity-link" >StateFlujoOT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateInformeAvance.html" data-type="entity-link" >StateInformeAvance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateLoadings.html" data-type="entity-link" >StateLoadings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateNumeroInterno.html" data-type="entity-link" >StateNumeroInterno</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateOT.html" data-type="entity-link" >StateOT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateOTDetalle.html" data-type="entity-link" >StateOTDetalle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StatePerfil.html" data-type="entity-link" >StatePerfil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateProveedor.html" data-type="entity-link" >StateProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateProyectos.html" data-type="entity-link" >StateProyectos</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateServicios.html" data-type="entity-link" >StateServicios</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateSustentoFinanciero.html" data-type="entity-link" >StateSustentoFinanciero</a>
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
                                <a href="interfaces/TipoDeRed.html" data-type="entity-link" >TipoDeRed</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TipoDeTrabajo.html" data-type="entity-link" >TipoDeTrabajo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TipoMoneda.html" data-type="entity-link" >TipoMoneda</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TipoNumeroInterno.html" data-type="entity-link" >TipoNumeroInterno</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TipoServicioContrato.html" data-type="entity-link" >TipoServicioContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Unidad.html" data-type="entity-link" >Unidad</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnidadObraFromInformeAvance.html" data-type="entity-link" >UnidadObraFromInformeAvance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnidadObraServicio.html" data-type="entity-link" >UnidadObraServicio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UOAgregar.html" data-type="entity-link" >UOAgregar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuarioInvolucrado.html" data-type="entity-link" >UsuarioInvolucrado</a>
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