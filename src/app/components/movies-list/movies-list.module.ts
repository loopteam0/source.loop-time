import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { MoviesListComponent } from './movies-list.component'
import { MaterialModule } from '../../modules/material/material.module'
import { CommonModule } from '@angular/common'
import { NgPipesModule } from 'ngx-pipes'
import { SpinnerModule } from '../spinner/spinner.module'

const routes: Routes = [{ path: '', component: MoviesListComponent }]

@NgModule({
    declarations: [MoviesListComponent],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        CommonModule,
        NgPipesModule,
        SpinnerModule,
    ],
    exports: [RouterModule],
})
export class MoviesListModule {}
