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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, AlertErrorComponent, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
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
  register: FormGroup = this._FormBuilder.group({
    name: [null, signupValidators.name],
    email: [null, signupValidators.email],
    password: [null, signupValidators.password],
    rePassword: [null, signupValidators.rePassword]
  }, { validators: [confirmPassword] })
  //Applies a custom <confirmPassword> validator to the entire <FormGroup> to ensure password and confirm password fields match.

  /*
  register = new FormGroup({
    //Creates a new instance of <FormGroup> and assigns it to the <register> property to represent a group of form controls.
    / *
    name: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(40)]), //Character's Length
    //Array of validator functions used to validate the user's input for the field and ensures that the field is not empty.
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]), //Regex for Password
    //Validates the password using a regular expression that enforces at least one upper case, one lower case, one digit, one special character and minimum lenth of 8 characters.
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
    * /
    name: new FormControl(null, signupValidators.name),
    email: new FormControl(null, signupValidators.email),
    password: new FormControl(null, signupValidators.password),
    rePassword: new FormControl(null, signupValidators.rePassword)
  }, confirmPassword)
  */

  /*
  confirmPassword(g: AbstractControl) {
  //<confirmPassword(g: AbstractControl)>: Custom validator for a form control.
  //<AbstractControl>: Provides some of the shared behavior that all controls and groups of controls have.
    return g.get('password')?.value == g.get('rePassword')?.value ? null : { mismatch: true }
    //Compares the values of the <password> and <rePassword> form controls within it. 
    //If the values match, it returns null, otherwise it returns an <error> object with the <mismatch> property set to true.
    //<g.get('')?.value>: Accesses the value of the form control within the given <AbstractControl> object.
    //<?.>: Optional chaining operator which prevents errors if the control is null or undefined.
  }
  */

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

  /*
  sendData = () => {
    if (this.register.valid) {
    //Checks if the <register> <FormGroup> is valid.
      this._AuthService.signup(this.register.value).subscribe({
      //Calls the <signup> method on the injected <_AuthService> service.
      //Passes the value of the <register> <FormGroup> as an argument to the <signup> method.
      //Subscribes to the observable returned by the <signup> method.

        next: (res) => {
        //Callback function that handles the successful response from the <signup> method returned from the server.
          console.log(res);
        }
      })
    }
  }
  */

  /*
  sendData() {
  //Method called when the form is submitted to handle form submission and process user registration data.
    if(this.register.valid){
    //If statement that checks if the <register> <FormGroup> is valid and the <FormControl> pass their validation rules.
      console.log(this.register);
      //Form can be accessed using <this.register.value> to perform actions like sending the data to a server API for registration.
    }
  }
  */

  /*
  //Applied in case that the <register> buuton in the <register> form is not disabled.
  sendData() {
    if(this.register.valid){
      console.log(this.register);
      //Logs the <register> <FormGroup> to the console which can be helpful for debugging and inspecting the form data.
    } else {
      this.register.get('rePassword')?.setValue("");
      //Accesses the <rePassword> form control within the <register> <FormGroup> and sets its value to an empty string.
      //<?.>: The optioanl chaining operator is used to prevent errors if the <rePassword> control is null or undefined.
      this.register.markAllAsTouched();
      //Marks all form controls within the <register> <FormGroup> as touched for displaying validation errors.
      //Angular's validation rules are often triggered when a form control is touched.
    }
  }
  */
}