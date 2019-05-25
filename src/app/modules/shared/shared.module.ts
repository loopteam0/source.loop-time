import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ConvertPipe } from '../../pipes/convert.pipe'
import { DurationPipe } from '../../pipes/duration.pipe'
import { JoinPipe } from '../../pipes/join.pipe'
import { OpenExternalPipe } from '../../pipes/open-external.pipe'
import { SanitizerPipe } from '../../pipes/sanitizer.pipe'
import { ScanPipe } from '../../pipes/scan.pipe'
import { UndefinedPipe } from '../../pipes/undefined.pipe'
import { BackgroundDirective } from '../../directives/background.directive'

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
