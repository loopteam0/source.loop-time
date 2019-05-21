import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { BookPageComponent } from './book-page.component'
import { CommonModule } from '@angular/common'
import { NgPipesModule } from 'ngx-pipes'
import { MaterialModule } from 'src/app/modules/material/material.module'
import { SpinnerModule } from '../spinner/spinner.module'

const routes: Routes = [{ path: '', component: BookPageComponent }]

@NgModule({
    declarations: [BookPageComponent],
    imports: [
        RouterModule.forChild(routes),
        MaterialModule,
        CommonModule,
        NgPipesModule,
        SpinnerModule,
    ],
    exports: [RouterModule],
})
export class BookPageModule {}
