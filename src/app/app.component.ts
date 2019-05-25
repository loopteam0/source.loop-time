import { Component, OnInit, OnDestroy } from '@angular/core'
import { UiServiceService } from './services/ui-service.service'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { ElectronService } from './services/electron.service'
import { DomSanitizer } from '@angular/platform-browser'
import { MatIconRegistry } from '@angular/material'
import { ThemeService } from './services/theme.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    torrentSearch: any
    IsWindowOnline = navigator.onLine
    subscription: Subscription
    theme

    constructor(
        private UI: UiServiceService,
        private router: Router,
        private iconRegister: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private themeService: ThemeService
    ) {
        // this.iconRegister.addSvgIcon('menu', this.sanitizer.bypassSecurityTrustUrl(''))
    }

    ngOnInit() {
        // set theme

        this.theme = this.themeService.getTheme()

        window.addEventListener('online', () =>
            this.UI.openSnackBar(` ✅ You are back online `, 5000)
        )

        window.addEventListener('offline', () => {
            this.UI.openSnackBar(
                `❌ It seems you are offline; check your internet connection and Retry`,
                null
            )
        })

        this.subscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(_ => window.scrollTo())
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
