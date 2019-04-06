import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { User } from 'firebase'
import { UiServiceService } from './ui-service.service'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user: User

    constructor(private afAuth: AngularFireAuth, private UI: UiServiceService) {
        // store user details
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user
                localStorage.setItem('user', JSON.stringify(this.user))
            } else {
                localStorage.setItem('user', null)
            }
        })
    }

    async googleSignIn() {
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    }

    signInWithEmailAndPassword(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    }

    async SignUpWithEmailAndPassword(email: string, password: string) {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    }

    async sendVerificationEmail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
    }

    async logout() {
        return this.afAuth.auth.signOut()
    }
}
