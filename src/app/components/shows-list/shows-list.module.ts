import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgPipesModule } from 'ngx-pipes'
import { MaterialModule } from '../../modules/material/material.module'
import { ShowsListComponent } from './shows-list.component'
import { SpinnerModule } from '../spinner/spinner.module'

const routes: Routes = [{ path: '', component: ShowsListComponent }]

@NgModule({
    declarations: [ShowsListComponent],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        CommonModule,
        NgPipesModule,
        SpinnerModule,
    ],
    exports: [RouterModule],
})
export class ShowsListModule {}
