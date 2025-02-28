import { Component, inject } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Order } from '../../core/interfaces/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})

export class OrdersComponent {
  orders: Order[] = []
  //Declares a public property named <orders> and initializes it as an empty array of Order objects. The array stores the user's orders fetched from the server.
  private readonly _OrderService = inject(OrderService)
  //Injects the <rderService> service into the current class and stores it in a private and readonly property named <_OrderService>.
  
  ngOnInit(): void {
    this._OrderService.getUserOrders().subscribe({
    //Calls the <getUserOrders()> method of the <_OrderService> instance which sends a request to the server to fetch the user's orders.
      next: (res) => {
        console.log(res);
        //this.orders = res
        this.orders = res.slice(-10)
        //Assigns the last 10 orders from the received response to the component's <orders> property. 
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}