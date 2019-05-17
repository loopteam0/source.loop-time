import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { AboutPageComponent } from './about-page.component'
import { MaterialModule } from 'src/app/modules/material/material.module'

const routes: Routes = [{ path: '', component: AboutPageComponent }]

@NgModule({
    declarations: [AboutPageComponent],
    imports: [RouterModule.forChild(routes), MaterialModule],
    exports: [RouterModule],
})
export class AboutPageModule {}
