import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PageNotFoundComponent } from './page-not-found.component'
import { MaterialModule } from '../../modules/material/material.module'

const routes: Routes = [{ path: '', component: PageNotFoundComponent }]

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [RouterModule.forChild(routes), MaterialModule],
    exports: [RouterModule],
})
export class PageNotFoundModule {}
