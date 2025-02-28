import { Component, inject } from '@angular/core';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { signupValidators } from '../../shared/validators/register.validators';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AlertErrorComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})

export class SigninComponent {
  isBtnSubmit: boolean = false
  //Control the state of a button, which is <false>.
  errorMessage: string = ""
  private readonly _AuthService = inject(AuthService);
  //Injects the <AuthService> service into the current class and stores it in a private and readonly property named <_AuthService>.
  //Allows the class to use the methods and properties of the <AuthService> service for authentication-related tasks.
  //<private>: Makes this property accessible only within the class. 
  //<readonly>: Prevents the property from being modified after initialization.
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  //Form builder which defines multiple form controls for user information, each with an initial value and a corresponding validator.
  login: FormGroup = this._FormBuilder.group({
    email: [null, signupValidators.email],
    password: [null, signupValidators.password]
  })
  //Applies a custom <confirmPassword> validator to the entire <FormGroup> to ensure password and confirm password fields match.

  sendData = () => {
    this.isBtnSubmit = true
    //Used to visually indicate that the form is being submitted.
    if (this.login.valid) {
      //Checks if the <login> <FormGroup> is valid.
      this._AuthService.signin(this.login.value).subscribe({
        //Calls the <signin> method on the injected <_AuthService> service, passing the form data as an argument.
        //Subscribes to the observable returned by the signup method.
        next: (res) => {
          //Callback function that handle the successful response from the <signup> method.

          if (res.message == "success") {
            console.log('res ===>' , res)
            localStorage.setItem('token', res.token)
            //Stores the <res.token> value in the browser's local storage under the key <'token'>.
            //Allows the application to persist the authentication token across page reloads or browser sessions, enabling the user to remain logged in without having to re-authenticate.
            this._AuthService.saveUserData()
            //Calls the <saveUserData> method on the injected <_AuthService> service.
            //Navigate to <home>.
            this._Router.navigate(['/home'])
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