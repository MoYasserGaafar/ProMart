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
    //Method that logs the current form values for demonstration purposes.
    this._OrderService.checkoutSession(this.cartId, this.address.value).subscribe({
    //Calls the <checkoutSession> method of the injected <OrderService> and passes the <cartId> and the current value of the <address> form group as arguments.
    //Subscribes to the Observable returned by <checkoutSession> which defines callback functions to handle the response from the server.
      next: (res) => {
        console.log(res);
        window.location.href = res.session.url
        //Redirects the user to the URL specified in the <res.session.url> property to handle successful API responses that require navigation to a new page or resource.
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
  //<ngOnInit>: Lifecycle hook called after the component is initialized.
    this._ActivatedRoute.paramMap.subscribe({
    //Subscribes to the <paramMap> observable of the <ActivatedRoute> service.
      next: (params) => {
        this.cartId = params.get('id')!
        //Retrieves the <id> parameter from the route parameters, then the value is assigned to the <cartId> property of the component.
        //<!>: Non-null assertion, indicating confidence that the parameter exists.
      }
    })
  }
}