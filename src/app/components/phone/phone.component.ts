import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginserviseService } from 'src/app/servises/loginservise.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  windowref: any
  phoneNumber
  code
  confirmation
  constructor(private route: Router, public auth: LoginserviseService) { }

  ngOnInit(): void {

    this.windowref = this.auth.getWindowRef();
  }
  otp() {
    this.windowref.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      callback: (Response) => {

      }
    });
    this.windowref.recaptchaVerifier.render();
    var appVerifier = this.windowref.recaptchaVerifier;
    auth().signInWithPhoneNumber(this.phoneNumber, appVerifier)
      .then(data => {
        alert(this.phoneNumber);

        this.windowref.confirmation = data

      }).catch(err => {
        alert(err.message);
      });
  }

  varification() {
    this.windowref.confirmation.confirm(this.code).then(data => {
      this.auth.user$ = data;
      alert("welcome user "+this.phoneNumber)
    }).catch(err => {
      alert(err.message);
    })
  }

  cancel() {
    this.route.navigate(['']);
  }

}
