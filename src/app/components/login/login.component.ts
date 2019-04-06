import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { MatDialogRef } from '@angular/material'
import { UiServiceService } from 'src/app/services/ui-service.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    user

    constructor(
        private Auth: AuthService,
        public dialogRef: MatDialogRef<LoginComponent>,
        private UI: UiServiceService
    ) {}

    ngOnInit() {}

    logInWithGoogle() {
        this.Auth.googleSignIn()
            .then(res => (this.user = res))
            .catch(err => this.UI.openSnackBar(err.message))
    }

    signUpWtihEmail(email: string, password: string) {
        this.Auth.SignUpWithEmailAndPassword(email, password)
            .then(res => (this.user = res))
            .catch(err => this.UI.openSnackBar(err.message))
    }

    logIn(email: string, password: string) {
        this.Auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                this.user = res
            })
            .catch(err => this.UI.openSnackBar(err.message))
    }
}
