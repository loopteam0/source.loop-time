import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { MaterialModule } from 'src/app/modules/material/material.module'
import { NgPipesModule } from 'ngx-pipes'
import { CommonModule } from '@angular/common'
import { SpinnerModule } from '../spinner/spinner.module'
import { SoftwarePageComponent } from './software-page.component'

const routes: Routes = [{ path: '', component: SoftwarePageComponent }]

@NgModule({
    declarations: [SoftwarePageComponent],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        CommonModule,
        NgPipesModule,
        SpinnerModule,
    ],
    exports: [RouterModule],
})
export class SoftwarePageModule {}
