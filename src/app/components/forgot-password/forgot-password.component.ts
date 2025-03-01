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
  errorMessage: string = ""
  steps: any = 1
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

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
  firstSubmission = () => {
    this.isBtnSubmit = true
    if (this.forgotPassword.valid) {
      let email = this.forgotPassword.get('email')?.value
      this.resetPassword.get('email')?.setValue(email)
      this._AuthService.forgotPasswords(this.forgotPassword.value).subscribe({
        next: (res) => {
          this.steps = 2
          localStorage.setItem('currentStep', this.steps.toString())
          localStorage.setItem('currentEmail', email)
          this.isBtnSubmit = false
        }, error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message
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
          this._AuthService.saveUserData()
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
    this.steps=localStorage.getItem('currentStep') || 1
    this.resetPassword.get('email')?.setValue(localStorage.getItem('currentEmail'))
  }
}