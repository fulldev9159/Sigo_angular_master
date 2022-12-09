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
                                <a href="modules/ActaModule.html" data-type="entity-link" >ActaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActaModule-f76aeb317cbaa72641245c678d0a16ace4baff30084d625fd211571ce65087837c7c8ac553c8ae6ab00cbe05280a2ffef32d7c4cff086745e64063addd5b92a9"' : 'data-target="#xs-components-links-module-ActaModule-f76aeb317cbaa72641245c678d0a16ace4baff30084d625fd211571ce65087837c7c8ac553c8ae6ab00cbe05280a2ffef32d7c4cff086745e64063addd5b92a9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActaModule-f76aeb317cbaa72641245c678d0a16ace4baff30084d625fd211571ce65087837c7c8ac553c8ae6ab00cbe05280a2ffef32d7c4cff086745e64063addd5b92a9"' :
                                            'id="xs-components-links-module-ActaModule-f76aeb317cbaa72641245c678d0a16ace4baff30084d625fd211571ce65087837c7c8ac553c8ae6ab00cbe05280a2ffef32d7c4cff086745e64063addd5b92a9"' }>
                                            <li class="link">
                                                <a href="components/ActaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActaPorServicioFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActaPorServicioFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GenerarActaContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerarActaContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListActasContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListActasContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ValidarActaContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidarActaContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ValidarActaOperacionesContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidarActaOperacionesContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ValidarPagoActaContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidarPagoActaContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActaRoutingModule.html" data-type="entity-link" >ActaRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdministracionModule.html" data-type="entity-link" >AdministracionModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AdministracionRoutingModule.html" data-type="entity-link" >AdministracionRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1323401efbb5983ca32c0f677932a431b9661da42569c6b6ce6deefd861d15e35f782f7d3dfb855f0ce49ab7eba194187e2d9e09f68e148141198649e797760e"' : 'data-target="#xs-components-links-module-AppModule-1323401efbb5983ca32c0f677932a431b9661da42569c6b6ce6deefd861d15e35f782f7d3dfb855f0ce49ab7eba194187e2d9e09f68e148141198649e797760e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1323401efbb5983ca32c0f677932a431b9661da42569c6b6ce6deefd861d15e35f782f7d3dfb855f0ce49ab7eba194187e2d9e09f68e148141198649e797760e"' :
                                            'id="xs-components-links-module-AppModule-1323401efbb5983ca32c0f677932a431b9661da42569c6b6ce6deefd861d15e35f782f7d3dfb855f0ce49ab7eba194187e2d9e09f68e148141198649e797760e"' }>
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
                                <a href="modules/AreasModule.html" data-type="entity-link" >AreasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AreasModule-69e143953cb4b298f9772fb6e54810ae92dd66c07f3670ef2d6363dd037156c131228b040aa40f7686a79af2e5311b8cd11d0af253931cff730bd8231a4024a8"' : 'data-target="#xs-components-links-module-AreasModule-69e143953cb4b298f9772fb6e54810ae92dd66c07f3670ef2d6363dd037156c131228b040aa40f7686a79af2e5311b8cd11d0af253931cff730bd8231a4024a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AreasModule-69e143953cb4b298f9772fb6e54810ae92dd66c07f3670ef2d6363dd037156c131228b040aa40f7686a79af2e5311b8cd11d0af253931cff730bd8231a4024a8"' :
                                            'id="xs-components-links-module-AreasModule-69e143953cb4b298f9772fb6e54810ae92dd66c07f3670ef2d6363dd037156c131228b040aa40f7686a79af2e5311b8cd11d0af253931cff730bd8231a4024a8"' }>
                                            <li class="link">
                                                <a href="components/AreasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AreasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormAreasContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormAreasContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListAreasContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListAreasContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AreasRoutingModule.html" data-type="entity-link" >AreasRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-219a0677e739966741ffffb92a4b4b77fcc970df2c24306bd7c2c9f812d1e3286e0597b26196562d0aba24a7b4b92b367991c0c73ff74b090457f2ec9667516e"' : 'data-target="#xs-components-links-module-AuthModule-219a0677e739966741ffffb92a4b4b77fcc970df2c24306bd7c2c9f812d1e3286e0597b26196562d0aba24a7b4b92b367991c0c73ff74b090457f2ec9667516e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-219a0677e739966741ffffb92a4b4b77fcc970df2c24306bd7c2c9f812d1e3286e0597b26196562d0aba24a7b4b92b367991c0c73ff74b090457f2ec9667516e"' :
                                            'id="xs-components-links-module-AuthModule-219a0677e739966741ffffb92a4b4b77fcc970df2c24306bd7c2c9f812d1e3286e0597b26196562d0aba24a7b4b92b367991c0c73ff74b090457f2ec9667516e"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilSelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TwoFactorAuthenticationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwoFactorAuthenticationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ContratosModule.html" data-type="entity-link" >ContratosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContratosModule-74c338e93a8b65655c6f0ea168e8af711b94fb136939376a917f747ceae325cbaaf3b3f6a91be08da9e0dba4568878323ab5b890ee72c4672dee0ad536f4c684"' : 'data-target="#xs-components-links-module-ContratosModule-74c338e93a8b65655c6f0ea168e8af711b94fb136939376a917f747ceae325cbaaf3b3f6a91be08da9e0dba4568878323ab5b890ee72c4672dee0ad536f4c684"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContratosModule-74c338e93a8b65655c6f0ea168e8af711b94fb136939376a917f747ceae325cbaaf3b3f6a91be08da9e0dba4568878323ab5b890ee72c4672dee0ad536f4c684"' :
                                            'id="xs-components-links-module-ContratosModule-74c338e93a8b65655c6f0ea168e8af711b94fb136939376a917f747ceae325cbaaf3b3f6a91be08da9e0dba4568878323ab5b890ee72c4672dee0ad536f4c684"' }>
                                            <li class="link">
                                                <a href="components/ContratosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContratosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormContratosContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormContratosContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListContratosContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListContratosContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContratosRoutingModule.html" data-type="entity-link" >ContratosRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-a529baa4fecf6015e2b09758d48dd63f6b4a37d12e1058889a5ed701752aea6fdcf9dd59dca8225a6e7677449e632616462b3ed9bb2d263e8991f3e3189f898b"' : 'data-target="#xs-components-links-module-CoreModule-a529baa4fecf6015e2b09758d48dd63f6b4a37d12e1058889a5ed701752aea6fdcf9dd59dca8225a6e7677449e632616462b3ed9bb2d263e8991f3e3189f898b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-a529baa4fecf6015e2b09758d48dd63f6b4a37d12e1058889a5ed701752aea6fdcf9dd59dca8225a6e7677449e632616462b3ed9bb2d263e8991f3e3189f898b"' :
                                            'id="xs-components-links-module-CoreModule-a529baa4fecf6015e2b09758d48dd63f6b4a37d12e1058889a5ed701752aea6fdcf9dd59dca8225a6e7677449e632616462b3ed9bb2d263e8991f3e3189f898b"' }>
                                            <li class="link">
                                                <a href="components/MainLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuDetalleOtComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuDetalleOtComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuReportesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuReportesComponent</a>
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
                                <a href="modules/InformeAvanceModule.html" data-type="entity-link" >InformeAvanceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InformeAvanceModule-7f482fa14f734310df4998cf7cefefa0249a532816086823c23e32ce01ed311d487202ad024db0c2f4d8f200812e27647e86794bfda7f0c5513501850848c12a"' : 'data-target="#xs-components-links-module-InformeAvanceModule-7f482fa14f734310df4998cf7cefefa0249a532816086823c23e32ce01ed311d487202ad024db0c2f4d8f200812e27647e86794bfda7f0c5513501850848c12a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InformeAvanceModule-7f482fa14f734310df4998cf7cefefa0249a532816086823c23e32ce01ed311d487202ad024db0c2f4d8f200812e27647e86794bfda7f0c5513501850848c12a"' :
                                            'id="xs-components-links-module-InformeAvanceModule-7f482fa14f734310df4998cf7cefefa0249a532816086823c23e32ce01ed311d487202ad024db0c2f4d8f200812e27647e86794bfda7f0c5513501850848c12a"' }>
                                            <li class="link">
                                                <a href="components/InformeAvanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InformeAvanceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InformeAvanceRoutingModule.html" data-type="entity-link" >InformeAvanceRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/IngenieriaModule.html" data-type="entity-link" >IngenieriaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-IngenieriaModule-48d817b6f1db502379b27f1b9a6f075837741b3de4f974d98e68c7ded24b51fd626681df4db6193e58712e7cfbcfde02c4ec8540e58421a20cd75e7639032ee1"' : 'data-target="#xs-components-links-module-IngenieriaModule-48d817b6f1db502379b27f1b9a6f075837741b3de4f974d98e68c7ded24b51fd626681df4db6193e58712e7cfbcfde02c4ec8540e58421a20cd75e7639032ee1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IngenieriaModule-48d817b6f1db502379b27f1b9a6f075837741b3de4f974d98e68c7ded24b51fd626681df4db6193e58712e7cfbcfde02c4ec8540e58421a20cd75e7639032ee1"' :
                                            'id="xs-components-links-module-IngenieriaModule-48d817b6f1db502379b27f1b9a6f075837741b3de4f974d98e68c7ded24b51fd626681df4db6193e58712e7cfbcfde02c4ec8540e58421a20cd75e7639032ee1"' }>
                                            <li class="link">
                                                <a href="components/ResultadoIngenieriaContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultadoIngenieriaContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ValidarIngenieriaContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidarIngenieriaContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerIngenieriaContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerIngenieriaContainerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IngenieriaRoutingModule.html" data-type="entity-link" >IngenieriaRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogModule.html" data-type="entity-link" >LogModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LogModule-2560ded4c3386a1e69e9b9d69427601ac5831f2b00e1f1354985afb7ccee553f9ecd20270f5ac0ff4aa5ff35966ca43c6cf3a6dab123d87c1dbc539015d00e1a"' : 'data-target="#xs-injectables-links-module-LogModule-2560ded4c3386a1e69e9b9d69427601ac5831f2b00e1f1354985afb7ccee553f9ecd20270f5ac0ff4aa5ff35966ca43c6cf3a6dab123d87c1dbc539015d00e1a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LogModule-2560ded4c3386a1e69e9b9d69427601ac5831f2b00e1f1354985afb7ccee553f9ecd20270f5ac0ff4aa5ff35966ca43c6cf3a6dab123d87c1dbc539015d00e1a"' :
                                        'id="xs-injectables-links-module-LogModule-2560ded4c3386a1e69e9b9d69427601ac5831f2b00e1f1354985afb7ccee553f9ecd20270f5ac0ff4aa5ff35966ca43c6cf3a6dab123d87c1dbc539015d00e1a"' }>
                                        <li class="link">
                                            <a href="injectables/LogPublishersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogPublishersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OtDetalleModule.html" data-type="entity-link" >OtDetalleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OtDetalleModule-d4e32d873417d47f5b2c860be24d8c08f4e007e543282cea22055a78b3450663602d6b2e0ccc6f69d52be0220b11817a3d23352f8a471ed93c645c7ac1c5457b"' : 'data-target="#xs-components-links-module-OtDetalleModule-d4e32d873417d47f5b2c860be24d8c08f4e007e543282cea22055a78b3450663602d6b2e0ccc6f69d52be0220b11817a3d23352f8a471ed93c645c7ac1c5457b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OtDetalleModule-d4e32d873417d47f5b2c860be24d8c08f4e007e543282cea22055a78b3450663602d6b2e0ccc6f69d52be0220b11817a3d23352f8a471ed93c645c7ac1c5457b"' :
                                            'id="xs-components-links-module-OtDetalleModule-d4e32d873417d47f5b2c860be24d8c08f4e007e543282cea22055a78b3450663602d6b2e0ccc6f69d52be0220b11817a3d23352f8a471ed93c645c7ac1c5457b"' }>
                                            <li class="link">
                                                <a href="components/AnexosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnexosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CosteoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CosteoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InformacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InformacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LibroObrasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LibroObrasComponent</a>
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
                                            'data-target="#components-links-module-OtModule-8648f9fd26d3ebb1ff060f2fdce3af7eca2f00a99ccafdef763b9f365ce5a3e3270a140dd50c819af3dcc3fea396ebe75540ae5c2d141ba7c5f2db2b4c840e4c"' : 'data-target="#xs-components-links-module-OtModule-8648f9fd26d3ebb1ff060f2fdce3af7eca2f00a99ccafdef763b9f365ce5a3e3270a140dd50c819af3dcc3fea396ebe75540ae5c2d141ba7c5f2db2b4c840e4c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OtModule-8648f9fd26d3ebb1ff060f2fdce3af7eca2f00a99ccafdef763b9f365ce5a3e3270a140dd50c819af3dcc3fea396ebe75540ae5c2d141ba7c5f2db2b4c840e4c"' :
                                            'id="xs-components-links-module-OtModule-8648f9fd26d3ebb1ff060f2fdce3af7eca2f00a99ccafdef763b9f365ce5a3e3270a140dd50c819af3dcc3fea396ebe75540ae5c2d141ba7c5f2db2b4c840e4c"' }>
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
                                                <a href="components/FormularioOtNumeroInternoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormularioOtNumeroInternoComponent</a>
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
                                            <li class="link">
                                                <a href="components/RegistrarLibroObrasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegistrarLibroObrasComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OtRoutingModule.html" data-type="entity-link" >OtRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PerfilesModule.html" data-type="entity-link" >PerfilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PerfilesModule-a479f022f686822eaf245bd0d60dccbda30795be37a78915e9b052da66cad10ecc79f4b5b41094b8e3bef8251035bc568926f4a46904639787dbeb9168d653f8"' : 'data-target="#xs-components-links-module-PerfilesModule-a479f022f686822eaf245bd0d60dccbda30795be37a78915e9b052da66cad10ecc79f4b5b41094b8e3bef8251035bc568926f4a46904639787dbeb9168d653f8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PerfilesModule-a479f022f686822eaf245bd0d60dccbda30795be37a78915e9b052da66cad10ecc79f4b5b41094b8e3bef8251035bc568926f4a46904639787dbeb9168d653f8"' :
                                            'id="xs-components-links-module-PerfilesModule-a479f022f686822eaf245bd0d60dccbda30795be37a78915e9b052da66cad10ecc79f4b5b41094b8e3bef8251035bc568926f4a46904639787dbeb9168d653f8"' }>
                                            <li class="link">
                                                <a href="components/FormPerfilesContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormPerfilesContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListPerfilesContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListPerfilesContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PerfilesRoutingModule.html" data-type="entity-link" >PerfilesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrimeNgModule.html" data-type="entity-link" >PrimeNgModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ReportesModule.html" data-type="entity-link" >ReportesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ReportesModule-88d5d8b4bfe9ea9d7e19741a0ce16cdb8f09463551c8ef0584bfdcecfda1972d52ad2b17c12bf35d8ae15242f8ba1d99a936c264666a63bdc8baace0036ee366"' : 'data-target="#xs-components-links-module-ReportesModule-88d5d8b4bfe9ea9d7e19741a0ce16cdb8f09463551c8ef0584bfdcecfda1972d52ad2b17c12bf35d8ae15242f8ba1d99a936c264666a63bdc8baace0036ee366"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ReportesModule-88d5d8b4bfe9ea9d7e19741a0ce16cdb8f09463551c8ef0584bfdcecfda1972d52ad2b17c12bf35d8ae15242f8ba1d99a936c264666a63bdc8baace0036ee366"' :
                                            'id="xs-components-links-module-ReportesModule-88d5d8b4bfe9ea9d7e19741a0ce16cdb8f09463551c8ef0584bfdcecfda1972d52ad2b17c12bf35d8ae15242f8ba1d99a936c264666a63bdc8baace0036ee366"' }>
                                            <li class="link">
                                                <a href="components/OtsAsignadasComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OtsAsignadasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportesRoutingModule.html" data-type="entity-link" >ReportesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-bc1f3d9f95b2034f4229435b7f494b12658a2f893e7fc4094ff6de67d6e7fd01a0f7060d3c3583872ee35328babb80e64ce0a95d8f6657d471685870d3cfcf50"' : 'data-target="#xs-components-links-module-SharedModule-bc1f3d9f95b2034f4229435b7f494b12658a2f893e7fc4094ff6de67d6e7fd01a0f7060d3c3583872ee35328babb80e64ce0a95d8f6657d471685870d3cfcf50"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-bc1f3d9f95b2034f4229435b7f494b12658a2f893e7fc4094ff6de67d6e7fd01a0f7060d3c3583872ee35328babb80e64ce0a95d8f6657d471685870d3cfcf50"' :
                                            'id="xs-components-links-module-SharedModule-bc1f3d9f95b2034f4229435b7f494b12658a2f893e7fc4094ff6de67d6e7fd01a0f7060d3c3583872ee35328babb80e64ce0a95d8f6657d471685870d3cfcf50"' }>
                                            <li class="link">
                                                <a href="components/ContentLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormAgregarServiciosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormAgregarServiciosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputAlertComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputAlertComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InputTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InputTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PbuttonSendingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PbuttonSendingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PdropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PdropdownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableServiciosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableServiciosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewConfirmacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewConfirmacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewRechazoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewRechazoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-bc1f3d9f95b2034f4229435b7f494b12658a2f893e7fc4094ff6de67d6e7fd01a0f7060d3c3583872ee35328babb80e64ce0a95d8f6657d471685870d3cfcf50"' : 'data-target="#xs-directives-links-module-SharedModule-bc1f3d9f95b2034f4229435b7f494b12658a2f893e7fc4094ff6de67d6e7fd01a0f7060d3c3583872ee35328babb80e64ce0a95d8f6657d471685870d3cfcf50"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-bc1f3d9f95b2034f4229435b7f494b12658a2f893e7fc4094ff6de67d6e7fd01a0f7060d3c3583872ee35328babb80e64ce0a95d8f6657d471685870d3cfcf50"' :
                                        'id="xs-directives-links-module-SharedModule-bc1f3d9f95b2034f4229435b7f494b12658a2f893e7fc4094ff6de67d6e7fd01a0f7060d3c3583872ee35328babb80e64ce0a95d8f6657d471685870d3cfcf50"' }>
                                        <li class="link">
                                            <a href="directives/ColorPrecargadoDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColorPrecargadoDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreSIGOModule.html" data-type="entity-link" >StoreSIGOModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsuarioModule.html" data-type="entity-link" >UsuarioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsuarioModule-587bc472389f34420a56c1db46f0288c0baca6cc8fcb9eb6e6c551dcfa37fb09a250212aa80af4a0ad50c7e4181370c757f5f51cc9bff7bd1bd06a98658891ff"' : 'data-target="#xs-components-links-module-UsuarioModule-587bc472389f34420a56c1db46f0288c0baca6cc8fcb9eb6e6c551dcfa37fb09a250212aa80af4a0ad50c7e4181370c757f5f51cc9bff7bd1bd06a98658891ff"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsuarioModule-587bc472389f34420a56c1db46f0288c0baca6cc8fcb9eb6e6c551dcfa37fb09a250212aa80af4a0ad50c7e4181370c757f5f51cc9bff7bd1bd06a98658891ff"' :
                                            'id="xs-components-links-module-UsuarioModule-587bc472389f34420a56c1db46f0288c0baca6cc8fcb9eb6e6c551dcfa37fb09a250212aa80af4a0ad50c7e4181370c757f5f51cc9bff7bd1bd06a98658891ff"' }>
                                            <li class="link">
                                                <a href="components/FormUsuarioContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormUsuarioContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListPerfilesUsuarioContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListPerfilesUsuarioContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListUsuarioContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListUsuarioContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuarioComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuarioRoutingModule.html" data-type="entity-link" >UsuarioRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/LogConsolePublisher.html" data-type="entity-link" >LogConsolePublisher</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogEntry.html" data-type="entity-link" >LogEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogPublisher.html" data-type="entity-link" >LogPublisher</a>
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
                                    <a href="injectables/ActaEffects.html" data-type="entity-link" >ActaEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActaFacade.html" data-type="entity-link" >ActaFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActaHttpService.html" data-type="entity-link" >ActaHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AfterHttpService.html" data-type="entity-link" >AfterHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AreaEffects.html" data-type="entity-link" >AreaEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AreaFacade.html" data-type="entity-link" >AreaFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AreaHttpService.html" data-type="entity-link" >AreaHttpService</a>
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
                                    <a href="injectables/FormProService.html" data-type="entity-link" >FormProService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FormularioService.html" data-type="entity-link" >FormularioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GuiaSubgrupoHttpService.html" data-type="entity-link" >GuiaSubgrupoHttpService</a>
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
                                    <a href="injectables/IngenieriaEffects.html" data-type="entity-link" >IngenieriaEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngenieriaFacade.html" data-type="entity-link" >IngenieriaFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngenieriaHttpService.html" data-type="entity-link" >IngenieriaHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LibroObrasHttpService.html" data-type="entity-link" >LibroObrasHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListPerfilesUserFormService.html" data-type="entity-link" >ListPerfilesUserFormService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListPerfilesUserTableService.html" data-type="entity-link" >ListPerfilesUserTableService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListProTableService.html" data-type="entity-link" >ListProTableService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListUserTableService.html" data-type="entity-link" >ListUserTableService</a>
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
                                    <a href="injectables/ServiciosAdicionalesHttpService.html" data-type="entity-link" >ServiciosAdicionalesHttpService</a>
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
                                <a href="guards/AccionesOTResolver.html" data-type="entity-link" >AccionesOTResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ActaTiposPagosResolver.html" data-type="entity-link" >ActaTiposPagosResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthTokenGuard.html" data-type="entity-link" >AuthTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CategoriaArchivosResolver.html" data-type="entity-link" >CategoriaArchivosResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ContratosUsuarioResolver.html" data-type="entity-link" >ContratosUsuarioResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/CubicacionesResolver.html" data-type="entity-link" >CubicacionesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/DetalleCubicacionFromOTResolver.html" data-type="entity-link" >DetalleCubicacionFromOTResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/DetalleCubicacionIngFromOTResolver.html" data-type="entity-link" >DetalleCubicacionIngFromOTResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/DetalleCubicacionResolver.html" data-type="entity-link" >DetalleCubicacionResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/DetalleInformeAvanceResolver.html" data-type="entity-link" >DetalleInformeAvanceResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/DetalleInformeAvanceResolver-1.html" data-type="entity-link" >DetalleInformeAvanceResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/DetalleOTResolver.html" data-type="entity-link" >DetalleOTResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsNot2FAGuard.html" data-type="entity-link" >IsNot2FAGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LastActaResolver.html" data-type="entity-link" >LastActaResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ListActasResolver.html" data-type="entity-link" >ListActasResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ObservacionesTrabajosResolver.html" data-type="entity-link" >ObservacionesTrabajosResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/PerfilesUsuarioResolver.html" data-type="entity-link" >PerfilesUsuarioResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ProfiledGuard.html" data-type="entity-link" >ProfiledGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RegistroLibroLobrasResolver.html" data-type="entity-link" >RegistroLibroLobrasResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/Servicios4ActaResolver.html" data-type="entity-link" >Servicios4ActaResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/SigoGuard.html" data-type="entity-link" >SigoGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/TipoCubicacionResolver.html" data-type="entity-link" >TipoCubicacionResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/TotalActasResolver.html" data-type="entity-link" >TotalActasResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/UOs4ActaResolver.html" data-type="entity-link" >UOs4ActaResolver</a>
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
                                <a href="interfaces/ActaDetalleActa.html" data-type="entity-link" >ActaDetalleActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ActaTipoPago.html" data-type="entity-link" >ActaTipoPago</a>
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
                                <a href="interfaces/ActualizarServicioAdicional.html" data-type="entity-link" >ActualizarServicioAdicional</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdicionalesSolicitados.html" data-type="entity-link" >AdicionalesSolicitados</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AdminContratoFromCub.html" data-type="entity-link" >AdminContratoFromCub</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AgenciaContrato.html" data-type="entity-link" >AgenciaContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AgregarUOAdicionalAServicio.html" data-type="entity-link" >AgregarUOAdicionalAServicio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AprobarRechazarIgenieria.html" data-type="entity-link" >AprobarRechazarIgenieria</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Archivo.html" data-type="entity-link" >Archivo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Area.html" data-type="entity-link" >Area</a>
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
                                <a href="interfaces/CategoriaArchivo.html" data-type="entity-link" >CategoriaArchivo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CECO.html" data-type="entity-link" >CECO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Comuna.html" data-type="entity-link" >Comuna</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContratoMarco.html" data-type="entity-link" >ContratoMarco</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContratoMarconWithTipoContratoModel.html" data-type="entity-link" >ContratoMarconWithTipoContratoModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContratosUser.html" data-type="entity-link" >ContratosUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ContratoWithTipo.html" data-type="entity-link" >ContratoWithTipo</a>
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
                                <a href="interfaces/DatabaseVersion.html" data-type="entity-link" >DatabaseVersion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/dataDetalleActa.html" data-type="entity-link" >dataDetalleActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataRespGetUsuarioPermisosPerfil.html" data-type="entity-link" >DataRespGetUsuarioPermisosPerfil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataRspAgregarPerfilUsuario.html" data-type="entity-link" >DataRspAgregarPerfilUsuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataRspEditArea.html" data-type="entity-link" >DataRspEditArea</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Detalle.html" data-type="entity-link" >Detalle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Detalle-1.html" data-type="entity-link" >Detalle</a>
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
                                <a href="interfaces/DetalleServicio4Acta.html" data-type="entity-link" >DetalleServicio4Acta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleServicioCubicacion.html" data-type="entity-link" >DetalleServicioCubicacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleServicioLastActa.html" data-type="entity-link" >DetalleServicioLastActa</a>
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
                                <a href="interfaces/DetalleUnidadObraLastActa.html" data-type="entity-link" >DetalleUnidadObraLastActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DetalleUO4Acta.html" data-type="entity-link" >DetalleUO4Acta</a>
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
                                <a href="interfaces/GuiaSubgrupo.html" data-type="entity-link" >GuiaSubgrupo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IdNombreType.html" data-type="entity-link" >IdNombreType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InfoOT.html" data-type="entity-link" >InfoOT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemSerivioUO.html" data-type="entity-link" >ItemSerivioUO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LastActa.html" data-type="entity-link" >LastActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LastSolicitudQuiebre.html" data-type="entity-link" >LastSolicitudQuiebre</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/listarActa.html" data-type="entity-link" >listarActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListarPerfil.html" data-type="entity-link" >ListarPerfil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListPerfilesUserType.html" data-type="entity-link" >ListPerfilesUserType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LP.html" data-type="entity-link" >LP</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialesLastActa.html" data-type="entity-link" >MaterialesLastActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialesManoObra.html" data-type="entity-link" >MaterialesManoObra</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MaterialFromInformeAvance.html" data-type="entity-link" >MaterialFromInformeAvance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelActividadId.html" data-type="entity-link" >ModelActividadId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelAgencia.html" data-type="entity-link" >ModelAgencia</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelContratoMarco.html" data-type="entity-link" >ModelContratoMarco</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelCubicacionIngId.html" data-type="entity-link" >ModelCubicacionIngId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelInformeAvanceActa.html" data-type="entity-link" >ModelInformeAvanceActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelInformeHasServicio.html" data-type="entity-link" >ModelInformeHasServicio</a>
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
                                <a href="interfaces/ModelPermiso.html" data-type="entity-link" >ModelPermiso</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelProveedor.html" data-type="entity-link" >ModelProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelProxy.html" data-type="entity-link" >ModelProxy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelProxyUsuarios.html" data-type="entity-link" >ModelProxyUsuarios</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelServicio.html" data-type="entity-link" >ModelServicio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelServicioWithTipo.html" data-type="entity-link" >ModelServicioWithTipo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelServicioWithTipoAndUnidad.html" data-type="entity-link" >ModelServicioWithTipoAndUnidad</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelSuperir.html" data-type="entity-link" >ModelSuperir</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelTipoContrato.html" data-type="entity-link" >ModelTipoContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelTipoServicioId.html" data-type="entity-link" >ModelTipoServicioId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelUnidadObra.html" data-type="entity-link" >ModelUnidadObra</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelUsuario.html" data-type="entity-link" >ModelUsuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelUsuarioLogin.html" data-type="entity-link" >ModelUsuarioLogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelUsuarioSuperior.html" data-type="entity-link" >ModelUsuarioSuperior</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModelValidacionUsuarioActa.html" data-type="entity-link" >ModelValidacionUsuarioActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MotivoRechazo.html" data-type="entity-link" >MotivoRechazo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notificacion.html" data-type="entity-link" >Notificacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NuevaUOServicioAdicional.html" data-type="entity-link" >NuevaUOServicioAdicional</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NuevoServicio.html" data-type="entity-link" >NuevoServicio</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NuevoServicioAdicional.html" data-type="entity-link" >NuevoServicioAdicional</a>
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
                                <a href="interfaces/OTActa.html" data-type="entity-link" >OTActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OTDetalleActa.html" data-type="entity-link" >OTDetalleActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OTFromNumeroInterno.html" data-type="entity-link" >OTFromNumeroInterno</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PDFInicial.html" data-type="entity-link" >PDFInicial</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PEP2.html" data-type="entity-link" >PEP2</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Perfil.html" data-type="entity-link" >Perfil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PerfilesUsuario.html" data-type="entity-link" >PerfilesUsuario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permiso.html" data-type="entity-link" >Permiso</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PermisoRol.html" data-type="entity-link" >PermisoRol</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PermisosPerfil.html" data-type="entity-link" >PermisosPerfil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PermissionModule.html" data-type="entity-link" >PermissionModule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PermissionsGroup.html" data-type="entity-link" >PermissionsGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlanProyecto.html" data-type="entity-link" >PlanProyecto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PMO.html" data-type="entity-link" >PMO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PosiblesContratosUser.html" data-type="entity-link" >PosiblesContratosUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PosiblesSuperiores.html" data-type="entity-link" >PosiblesSuperiores</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PosiblesSuperioresMenuItem.html" data-type="entity-link" >PosiblesSuperioresMenuItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PosibleSupervisorTrabajo.html" data-type="entity-link" >PosibleSupervisorTrabajo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProveedorAgenciaContrato.html" data-type="entity-link" >ProveedorAgenciaContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Proveedores4Cub.html" data-type="entity-link" >Proveedores4Cub</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Proyectos.html" data-type="entity-link" >Proyectos</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuienAutorizoActa.html" data-type="entity-link" >QuienAutorizoActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistroLibroDeObras.html" data-type="entity-link" >RegistroLibroDeObras</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReqActivarContrato.html" data-type="entity-link" >ReqActivarContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReqAprobarRechazarSolicitudQuiebre.html" data-type="entity-link" >ReqAprobarRechazarSolicitudQuiebre</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReqEditContrato.html" data-type="entity-link" >ReqEditContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReqQuiebre.html" data-type="entity-link" >ReqQuiebre</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReqSolicitarQuiebre.html" data-type="entity-link" >ReqSolicitarQuiebre</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAceptarRechazarAdicionales.html" data-type="entity-link" >RequestAceptarRechazarAdicionales</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAceptarRechazarOT.html" data-type="entity-link" >RequestAceptarRechazarOT</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestActivateUser.html" data-type="entity-link" >RequestActivateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAddFirmaUser.html" data-type="entity-link" >RequestAddFirmaUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAdicionales.html" data-type="entity-link" >RequestAdicionales</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAgregarPerfilUsusario.html" data-type="entity-link" >RequestAgregarPerfilUsusario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAprobacionRechazoSolicitudPago.html" data-type="entity-link" >RequestAprobacionRechazoSolicitudPago</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAprobarRechazarOperaciones.html" data-type="entity-link" >RequestAprobarRechazarOperaciones</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestAutorizarInformeAvance.html" data-type="entity-link" >RequestAutorizarInformeAvance</a>
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
                                <a href="interfaces/RequestCreatePerfil.html" data-type="entity-link" >RequestCreatePerfil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestCreateRegistroLibroObra.html" data-type="entity-link" >RequestCreateRegistroLibroObra</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestCreateUser.html" data-type="entity-link" >RequestCreateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestEditArea.html" data-type="entity-link" >RequestEditArea</a>
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
                                <a href="interfaces/RequestUpdateInformeAvance.html" data-type="entity-link" >RequestUpdateInformeAvance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestUpdatePerfil.html" data-type="entity-link" >RequestUpdatePerfil</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestUpdatePerfilUsusario.html" data-type="entity-link" >RequestUpdatePerfilUsusario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestUpdateUser.html" data-type="entity-link" >RequestUpdateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestUpFirmaUser.html" data-type="entity-link" >RequestUpFirmaUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestValidarActa.html" data-type="entity-link" >RequestValidarActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseAgregarAdicionales.html" data-type="entity-link" >ResponseAgregarAdicionales</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseDetalleActa.html" data-type="entity-link" >ResponseDetalleActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseUpdateInformeAvance.html" data-type="entity-link" >ResponseUpdateInformeAvance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseUpFirmaUser.html" data-type="entity-link" >ResponseUpFirmaUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RespSubirArchivo.html" data-type="entity-link" >RespSubirArchivo</a>
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
                                <a href="interfaces/ServicioAdicionalActualizar.html" data-type="entity-link" >ServicioAdicionalActualizar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServicioAgenciaContratoProveedor.html" data-type="entity-link" >ServicioAgenciaContratoProveedor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServicioFromInfomeAvance.html" data-type="entity-link" >ServicioFromInfomeAvance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Servicios4ValidarActa.html" data-type="entity-link" >Servicios4ValidarActa</a>
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
                                <a href="interfaces/StateActa.html" data-type="entity-link" >StateActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateArea.html" data-type="entity-link" >StateArea</a>
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
                                <a href="interfaces/StateIngenieria.html" data-type="entity-link" >StateIngenieria</a>
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
                                <a href="interfaces/TableListContratosMarcos.html" data-type="entity-link" >TableListContratosMarcos</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableService.html" data-type="entity-link" >TableService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableUserData.html" data-type="entity-link" >TableUserData</a>
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
                                <a href="interfaces/UOAdicionalActualizar.html" data-type="entity-link" >UOAdicionalActualizar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UOAgregar.html" data-type="entity-link" >UOAgregar</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UOs4ValidarActa.html" data-type="entity-link" >UOs4ValidarActa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsuarioInvolucrado.html" data-type="entity-link" >UsuarioInvolucrado</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValuesEditArea.html" data-type="entity-link" >ValuesEditArea</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValuesEditContrato.html" data-type="entity-link" >ValuesEditContrato</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValuesReqUpdatePerfilUsuario.html" data-type="entity-link" >ValuesReqUpdatePerfilUsuario</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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