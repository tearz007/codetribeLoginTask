import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { user } from '../model/user'


@Injectable({
  providedIn: 'root'
})
export class LoginserviseService {

  user$: Observable<user>

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<user>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  /*-----------Google login----------------*/
  google2() {
    const provider = new auth.GoogleAuthProvider();
    return  this.auth.signInWithPopup(provider);
  }
  /*-----------Google End----------------*/



  /*-----------Facebook login----------------*/
  facebookLogin() {
    var provider = new auth.FacebookAuthProvider();
    return this.auth.signInWithPopup(provider);
  }
  /*-----------Facebook End----------------*/


/*-----------phone Number login----------------*/

  phoneLogin() {
    var provider = new auth.PhoneAuthProvider()
    return this.auth.signInWithPopup(provider);
  }

/*-----------phone Number End----------------*/

   signOut() {
    return this.auth.signOut();
  }

   updateUser(details) {
    const referance: AngularFirestoreDocument<user> = this.afs.doc(`users/${details.uid}`);
    const data = {
      id: details.uid,
      email: details.email
    };
    return referance.set(data, { merge: true })
  }


  /*-----------Email and password login----------------*/
  authUser(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  createUser(user, password) {
    return this.auth.createUserWithEmailAndPassword(user, password)
  }
  /*-----------Email and password End----------------*/



}
