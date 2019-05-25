import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { MaterialModule } from '../../modules/material/material.module'
import { NgPipesModule } from 'ngx-pipes'
import { CommonModule } from '@angular/common'
import { SpinnerModule } from '../spinner/spinner.module'
import { MusicPageComponent } from './music-page.component'

const routes: Routes = [{ path: '', component: MusicPageComponent }]

@NgModule({
    declarations: [MusicPageComponent],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        CommonModule,
        NgPipesModule,
        SpinnerModule,
    ],
    exports: [RouterModule],
})
export class MusicPageModule {}
