import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { AdsPageComponent } from './ads-page.component'
import { SpinnerModule } from '../spinner/spinner.module'

const routes: Routes = [{ path: '', component: AdsPageComponent }]

@NgModule({
    declarations: [AdsPageComponent],
    imports: [RouterModule.forChild(routes), SpinnerModule],
    exports: [RouterModule],
})
export class AdsPageModule {}
