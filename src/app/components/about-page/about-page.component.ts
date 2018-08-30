import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ElectronService } from '../../services/electron.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  form: FormGroup;

  panelOpenState = false;
  updateMsg;
  constructor(private formbuilder: FormBuilder, private electron: ElectronService) {
    /* this.createForm(); */
  }



  ngOnInit() {
  }

  openlink(url) {
    if (this.electron.isElectron()) {
      this.electron.shell.openExternal(`${url}`);
    } else {
      window.open(`${url}`);
    }
  }

  showMsg() {
    this.updateMsg = 'You will be notified when updates are available';
  }
}
