import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgPipesModule } from 'ngx-pipes'
import { MaterialModule } from 'src/app/modules/material/material.module'
import { SpinnerComponent } from './spinner.component'

@NgModule({
    declarations: [SpinnerComponent],
    imports: [MaterialModule, CommonModule, NgPipesModule],
    exports: [SpinnerComponent],
})
export class SpinnerModule {}
