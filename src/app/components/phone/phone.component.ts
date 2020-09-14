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
  windowref: any;
  phoneNumber
  constructor(private route: Router, public auth: LoginserviseService) { }

  ngOnInit(): void {

    this.windowref = this.auth.getWindowRef();
  }
  otp() {
    this.windowref.RecaptchaVerifier = new auth.RecaptchaVerifier('recaptcha'),{
      'size':'normal',
      callback:(Response)=>{

      }
    }

    var appVerifier =this. windowref.recaptchaVerifier;
    auth().signInWithPhoneNumber(this.phoneNumber, appVerifier)
      .then(()=> {


      }).catch(err=> {

      });
  }

  cancel(){
this.route.navigate(['']);
  }

}
