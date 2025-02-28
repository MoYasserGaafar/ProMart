import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})

export class ForgotPasswordComponent {
  isBtnSubmit: boolean = false
  //Control the state of a button, which is <false>.
  errorMessage: string = ""
  steps: any = 1
  //Used to represent a step or stage within a process through a variable called <steps> and assigns it an initial value of <1>.
  private readonly _AuthService = inject(AuthService);
  //Injects the <AuthService> service into the current class and stores it in a private and readonly property named <_AuthService>.
  //Allows the class to use the methods and properties of the <AuthService> service for authentication-related tasks.
  //<private>: Makes this property accessible only within the class. 
  //<readonly>: Prevents the property from being modified after initialization.
  private readonly _FormBuilder = inject(FormBuilder);
  //Allows the access of the <FormBuilder>'s methods and properties to create and manage forms.
  private readonly _Router = inject(Router);

  //Form builder which defines multiple form controls for user information, each with an initial value and a corresponding validator.
  forgotPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  })

  verifyResetCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required]]
  })

  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required]]
  })

  // =====> First Sunmission >> Forgot Password <===== //
  //Method handles the submission of a form associated with a password reset process. 
  //It verifies the form's validity, sends a request to the <_AuthService> to initiate the password reset process, and handles the response.
  firstSubmission = () => {
    this.isBtnSubmit = true
    //Used to visually indicate that the form is being submitted.
    if (this.forgotPassword.valid) {
      //Checks if the <forgotPassword> <FormGroup> is valid.
      let email = this.forgotPassword.get('email')?.value
      //Retrieves the value of the <email> form control from the <forgotPassword> <FormGroup> and stores it in the <email> variable.
      //Optional chaining <?.> operator: Used to safely access the value even if the email control is null or undefined.
      this.resetPassword.get('email')?.setValue(email)
      //Sets the value of the <email> form control in the <resetPassword> <FormGroup> to the value obtained from the <forgotPassword> form.
      this._AuthService.forgotPasswords(this.forgotPassword.value).subscribe({
        //Calls the <forgotPasswords> method on the injected <_AuthService> service, passing the form data as an argument.
        //Subscribes to the observable returned by the <forgotPasswords> method, which will emit a response or an error.
        next: (res) => {
          //Callback function that handle the successful response from the <forgotPasswords> method.
          this.steps = 2
          //Indicates that the user has successfully submitted the initial form and is now proceeding to the next step in the password reset process.
          localStorage.setItem('currentStep', this.steps.toString())
          //Stores the current step value <this.steps> in local storage under the key <currentStep>.
          //Allows the application to persist the user's progress through the password reset process, even if the user refreshes the page or navigates away.
          localStorage.setItem('currentEmail', email)
          //Stores the current email value <email> in local storage under the key <currentEmail>.
          //Allows the application to persist the user's email address for subsequent steps in the password reset process.
          this.isBtnSubmit = false
          //Resets the <isBtnSubmit> property to <false>, which can be used to re-enable the submit button or hide the loading indicator.
          /*
          if (res.message == "success") {
            localStorage.setItem('token', res.token)
            //Stores the <res.token> value in the browser's local storage under the key <'token'>.
            //Allows the application to persist the authentication token across page reloads or browser sessions, enabling the user to remain logged in without having to re-authenticate.
            this._AuthService.saveUserData()
            //Calls the <saveUserData> method on the injected <_AuthService> service.
            //Navigate to <home>.
            this._Router.navigate(['/home'])
          }
          */
        }, error: (err: HttpErrorResponse) => {
          //Callback function that handle an error response from the <forgotPasswords> method.
          console.log(err.error.message);
          //Logs the error message to the console.
          this.errorMessage = err.error.message
          //Sets the <errorMessage> property to display the error message to the user.
          this.isBtnSubmit = false
        }
      })
    }
  }

  // =====> Second Sunmission >> Verify Reset Code <===== //
  secondSubmission = () => {
    this.isBtnSubmit = true
    if (this.verifyResetCode.valid) {
      this._AuthService.verifyResetCode(this.verifyResetCode.value).subscribe({
        next: (res) => {
          this.steps = 3
          localStorage.setItem('currentStep', this.steps.toString())
          this.isBtnSubmit = false
        }, error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message
          this.isBtnSubmit = false
        }
      })
    }
  }

  // =====> Third Sunmission >> Reset Password <===== //
  thirdSubmission = () => {
    this.isBtnSubmit = true
    if (this.resetPassword.valid) {
      this._AuthService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.steps = 3
          this.isBtnSubmit = false
          localStorage.setItem('token', res.token)
          //Stores the <res.token> value in the browser's local storage under the key <'token'>.
          //Allows the application to persist the authentication token across page reloads or browser sessions, enabling the user to remain logged in without having to re-authenticate.
          this._AuthService.saveUserData()
          //Calls the <saveUserData> method on the injected <_AuthService> service.
          //Navigate to <home>.
          this._Router.navigate(['/home'])
        }, error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message
          this.isBtnSubmit = false
        }
      })
    }
  }

  ngOnInit(): void {
  //Defines the <ngOnInit> method that implements the <OnInit> interface.
    this.steps=localStorage.getItem('currentStep') || 1
    //Retrieves the value stored in local storage under the key <currentStep>.
    //If a value is found, it assigns it to the <this.steps> property. But if no value is found, it assigns the default value of <1> to <this.steps>.
    this.resetPassword.get('email')?.setValue(localStorage.getItem('currentEmail'))
    //Retrieves the value stored in local storage under the key <currentEmail>.
    //If a value is found, it sets the value of the email form control in the <resetPassword> <FormGroup> to that value. 
    //This pre-fills the email field in the subsequent password reset form with the email address that was used in the initial password reset request.
  }
}