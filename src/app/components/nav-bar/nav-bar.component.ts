import { Component } from '@angular/core'
import {
    BreakpointObserver,
    Breakpoints,
} from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ElectronService } from '../../services/electron.service'
import { UiServiceService } from '../../services/ui-service.service'
import { LoginComponent } from '../login/login.component'
import { ThemeService } from '../../services/theme.service'

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
    darkTheme = false
    mdScreen

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches))

    constructor(
        private breakpointObserver: BreakpointObserver,
        private electron: ElectronService,
        private UI: UiServiceService,
        private themeService: ThemeService
    ) {}

    showLink() {
        if (this.electron.isElectron()) {
            this.electron.shell.openExternal('https://loopteam0.github.io')
        } else {
            window.open('https://loopteam0.github.io')
        }
    }

    change() {
        console.log('changed')
        this.darkTheme = !this.darkTheme
    }

    openLogin() {
         this.UI.openDialog(null, LoginComponent, 'login-dialog')
        // this.themeService.setTheme()
    }

    ngOnInit(): void {
        this.UI.setTitlebar('#424242')
    }
}
