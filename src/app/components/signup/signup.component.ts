import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../shared/ui/button/button.component";
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { confirmPassword } from '../../shared/utils/confirm-password.utils';
import { signupValidators } from '../../shared/validators/register.validators';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, AlertErrorComponent, NgClass, TranslateModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
  isBtnSubmit: boolean = false
  errorMessage: string = ""
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  register: FormGroup = this._FormBuilder.group({
    name: [null, signupValidators.name],
    email: [null, signupValidators.email],
    password: [null, signupValidators.password],
    rePassword: [null, signupValidators.rePassword]
  }, { validators: [confirmPassword] })

  sendData = () => {
    this.isBtnSubmit = true
    //Used to visually indicate that the form is being submitted.
    if (this.register.valid) {
      //Checks if the <register> <FormGroup> is valid.
      this._AuthService.signup(this.register.value).subscribe({
        //Calls the <signup> method on the injected <_AuthService> service, passing the form data as an argument.
        //Subscribes to the observable returned by the signup method.
        next: (res) => {
          //Callback function that handle the successful response from the <signup> method.
          //console.log(res);
          //this.isBtnSubmit = false

          if (res.message == "success") {
            //Navigate to <Signin>.
            this._Router.navigate(['/signin'])
          }
        }, error: (err: HttpErrorResponse) => {
          //Callback function that handle an error response from the <signup> method.
          console.log(err.error.message);
          this.errorMessage = err.error.message
          this.isBtnSubmit = false
        }
      })
    }
  }
}