import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { MatDialogRef } from '@angular/material'
import { UiServiceService } from '../../services/ui-service.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    //***** TODO login and creating of accounts */
    //****  return data to the main window  */
    // ***** check to see if user is loged  */
    // ***** and disable the the login button */

    user: firebase.auth.UserCredential

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
            .then(res => {
                this.logIn(email, password)
            })
            .catch(err => this.UI.openSnackBar(err.message))
    }

    logIn(email: string, password: string) {
        this.Auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                this.user = res
                console.log(this.user)
                this.UI.openSnackBar(
                    `You are welcome ${this.user.user.displayName}`
                )
            })
            .catch(err => this.UI.openSnackBar(err.message))
    }
}
