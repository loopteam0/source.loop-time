import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgPipesModule } from 'ngx-pipes'
import { MaterialModule } from '../../modules/material/material.module'
import { GamesPageComponent } from './games-page.component'
import { SpinnerModule } from '../spinner/spinner.module'

const routes: Routes = [{ path: '', component: GamesPageComponent }]

@NgModule({
    declarations: [GamesPageComponent],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        CommonModule,
        NgPipesModule,
        SpinnerModule,
    ],
    exports: [RouterModule],
})
export class GamesPageModule {}
