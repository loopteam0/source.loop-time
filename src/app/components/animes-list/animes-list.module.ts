import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgPipesModule } from 'ngx-pipes'
import { MaterialModule } from '../../modules/material/material.module'
import { AnimesListComponent } from './animes-list.component'
import { SpinnerModule } from '../spinner/spinner.module'

const routes: Routes = [{ path: '', component: AnimesListComponent }]

@NgModule({
    declarations: [AnimesListComponent],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        CommonModule,
        NgPipesModule,
        SpinnerModule,
    ],
    exports: [RouterModule],
})
export class AnimesPageModule {}
