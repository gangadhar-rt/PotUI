import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, SettingsService } from '../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public settings: SettingsService, fb: FormBuilder, private _service: ApiService, private router: Router) {

    this.loginForm = fb.group({
      // 'username': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'username': ['E-204', Validators.required],
      'password': ['e-204', Validators.required],
      'clientcode': ['Raju Tech India Pvt Ltd1', Validators.nullValidator]
    });

  }

  login() {
    if (this.loginForm.valid) {
      console.log('Valid!');
      let isLoggedin: any = true;
      this._service.PostService('', '/account/authentication', this.loginForm.value)
        .subscribe(
          data => {
            const response = data;
            isLoggedin = 'true';
            if (isLoggedin) {
              localStorage.setItem('isLoggedin', isLoggedin);
              this.router.navigate(['/secure']);
            }
            const uzr = JSON.stringify(response);
            localStorage.setItem('uzrData', uzr);
            localStorage.setItem('token', response.token);
            const authdata = JSON.stringify(response.appCodeTemplate);
            localStorage.setItem('isAuth', authdata);
            console.log(localStorage.getItem('isLoggedin'));
            this._service.showSuccessMessage('Log In Successfull');
          },
          error => {
            console.log(error);
            this._service.showErrorMessage(error.message);
          },
          () => console.log('everythin')
        );

    }

  }

  ngOnInit() {

  }
  showMessage(type) {
    if (type) {
      this._service.showSuccessMessage('Log In Successfull');
    } else {
      this._service.showErrorMessage('custom error message');
    }
  }
}
