import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ImputacionComponent } from "./imputacion.component";
import { OtsPaymentComponent } from "./containers/ots-payment/ots-payment.component";

const routes: Routes = [
    {
        path: '',
        component: ImputacionComponent,
        children: [
            {path: '', redirectTo: 'otpay', pathMatch: 'full'},
            {
                path: 'otpay',
                component: OtsPaymentComponent,
            },
        ],
    },
];


@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ImputacionRoutingModule{}