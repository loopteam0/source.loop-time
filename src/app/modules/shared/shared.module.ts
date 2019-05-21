import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConvertPipe } from 'src/app/pipes/convert.pipe'
import { DurationPipe } from 'src/app/pipes/duration.pipe'
import { JoinPipe } from 'src/app/pipes/join.pipe'
import { OpenExternalPipe } from 'src/app/pipes/open-external.pipe'
import { SanitizerPipe } from 'src/app/pipes/sanitizer.pipe'
import { ScanPipe } from 'src/app/pipes/scan.pipe'
import { UndefinedPipe } from 'src/app/pipes/undefined.pipe'
import { BackgroundDirective } from 'src/app/directives/background.directive'

@NgModule({
    imports: [CommonModule],
    declarations: [
        ConvertPipe,
        DurationPipe,
        JoinPipe,
        OpenExternalPipe,
        SanitizerPipe,
        ScanPipe,
        UndefinedPipe,
        BackgroundDirective,
    ],
    exports: [
        ConvertPipe,
        DurationPipe,
        JoinPipe,
        OpenExternalPipe,
        SanitizerPipe,
        ScanPipe,
        UndefinedPipe,
        BackgroundDirective,
    ],
    providers: [
        // SearchService, MovieDbService , ElectronService ,
    ],
})
export class SharedModule {}
