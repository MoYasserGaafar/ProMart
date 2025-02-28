import { Validators } from "@angular/forms"

export const signupValidators={
    name: [Validators.required, Validators.minLength(10), Validators.maxLength(40)],
    email: [Validators.required, Validators.email],
    password: [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)], //Regex for Password
    //Validates the password using a regular expression that enforces at least one upper case, one lower case, one digit, one special character and minimum lenth of 8 characters.
    rePassword: [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]
}