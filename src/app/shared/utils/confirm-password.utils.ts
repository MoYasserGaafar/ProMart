import { AbstractControl } from "@angular/forms";

export function confirmPassword(g: AbstractControl) {
    //<confirmPassword(g: AbstractControl)>: Custom validator for a form control.
    //<AbstractControl>: Provides some of the shared behavior that all controls and groups of controls have.
    return g.get('password')?.value == g.get('rePassword')?.value ? null : { mismatch: true }
    //Compares the values of the <password> and <rePassword> form controls within it. 
    //If the values match, it returns null, otherwise it returns an <error> object with the <mismatch> property set to true.
    //<g.get('')?.value>: Accesses the value of the form control within the given <AbstractControl> object.
    //<?.>: Optional chaining operator which prevents errors if the control is null or undefined.
}