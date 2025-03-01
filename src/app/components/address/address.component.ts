import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})

export class AddressComponent {
  cartId: string = ""
  //Declares a public property named <cartId> and initializes it with an empty string. It is used to store the ID of the current cart.
  
  private readonly _FormBuilder = inject(FormBuilder)
  //Injects the <FormBuilder> service into the current class and stores it in a private and readonly property named <_FormBuilder>.
  private readonly _OrderService = inject(OrderService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  //Injects the <ActivatedRoute> service, used to access information from the route parameters.

  address: FormGroup = this. _FormBuilder.group({
  //Creates an <address> <FormGroup> using the injected <FormBuilder>.
  //Calls the group method of the <FormBuilder> to create a new <FormGroup>.
  //Creates form controls with an initial value of null.
    details: [null], 
    phone: [null],
    city: [null]
  })

  payment = () => {
    console.log(this.address.value);
    this._OrderService.checkoutSession(this.cartId, this.address.value).subscribe({
      next: (res) => {
        console.log(res);
        window.location.href = res.session.url
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id')!
      }
    })
  }
}