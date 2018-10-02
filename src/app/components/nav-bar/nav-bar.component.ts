import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElectronService } from '../../services/electron.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
darkTheme = false;
mdScreen;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private electron: ElectronService,
) {
  // breakpointObserver.observe([
  //   Breakpoints.HandsetLandscape,
  //   Breakpoints.HandsetPortrait
  // ]).subscribe(result => {
  //   if (result.matches) {
  //     this.mdScreen = true;
  //   }
  // });
}

  showLink() {
    if (this.electron.isElectron()) {
      this.electron.shell.openExternal('https://loopteam0.github.io');
    } else {
      window.open('https://loopteam0.github.io');
    }
  }
    change() {
        console.log('changed');
        this.darkTheme = !this.darkTheme;
    }

  }
