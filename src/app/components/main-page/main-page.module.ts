import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { MainPageComponent } from './main-page.component'
import { MaterialModule } from '../../modules/material/material.module'
import { NgPipesModule } from 'ngx-pipes'
import { CommonModule } from '@angular/common'
import { SpinnerModule } from '../spinner/spinner.module'

const routes: Routes = [{ path: '', component: MainPageComponent }]

@NgModule({
    declarations: [MainPageComponent],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        CommonModule,
        NgPipesModule,
        SpinnerModule,
    ],
    exports: [RouterModule],
})
export class MainPageModule {}
