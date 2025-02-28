import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alert-error',
  standalone: true,
  imports: [],
  templateUrl: './alert-error.component.html',
  styleUrl: './alert-error.component.scss'
})

export class AlertErrorComponent {
  @Input() formName!:FormGroup
  //Allows the component to receive a <FormGroup> instance as an input from its parent component.
  @Input() controlName!:string
  //Allows the component to receive a string value as an input from its parent component.
}