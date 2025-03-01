import { Validators } from "@angular/forms"

export const signupValidators={
    name: [Validators.required, Validators.minLength(10), Validators.maxLength(40)],
    email: [Validators.required, Validators.email],
    password: [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)], //Regex for Password
    rePassword: [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]
}