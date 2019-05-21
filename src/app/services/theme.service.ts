import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { OverlayContainer } from '@angular/cdk/overlay'

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    $themeClass: BehaviorSubject<string> = new BehaviorSubject('lightTheme')

    constructor(private overlayContainer: OverlayContainer) {
        overlayContainer.getContainerElement().classList.add('light')
    }

    getTheme() {
        return this.$themeClass
    }

    async setTheme() {
        await this.overlayContainer
            .getContainerElement()
            .classList.forEach(classList =>
                this.overlayContainer
                    .getContainerElement()
                    .classList.remove(classList)
            )

        await this.overlayContainer
            .getContainerElement()
            .classList.add('lightTheme')
        await this.$themeClass.next('lightTheme')
    }
}
