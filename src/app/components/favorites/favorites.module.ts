import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgPipesModule } from 'ngx-pipes'
import { MaterialModule } from '../../modules/material/material.module'
import { FavoritesComponent } from './favorites.component'
import { FavoritesService } from '../../services/favorites.service'
import { SpinnerModule } from '../spinner/spinner.module'

const routes: Routes = [{ path: '', component: FavoritesComponent }]

@NgModule({
    declarations: [FavoritesComponent],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        CommonModule,
        NgPipesModule,
        SpinnerModule,
    ],
    providers: [FavoritesService],
    exports: [RouterModule],
})
export class FavoritesModule {}
