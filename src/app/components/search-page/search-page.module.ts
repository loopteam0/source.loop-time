import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { MaterialModule } from 'src/app/modules/material/material.module'
import { NgPipesModule } from 'ngx-pipes'
import { CommonModule } from '@angular/common'
import { SpinnerModule } from '../spinner/spinner.module'
import { SearchPageComponent } from './search-page.component'

const routes: Routes = [{ path: '', component: SearchPageComponent }]

@NgModule({
    declarations: [SearchPageComponent],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        CommonModule,
        NgPipesModule,
        SpinnerModule,
    ],
    exports: [RouterModule],
})
export class SearchPageModule {}
