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
  private readonly _OrderService = inject(OrderService)
  
  ngOnInit(): void {
    this._OrderService.getUserOrders().subscribe({
      next: (res) => {
        console.log(res);
        this.orders = res.slice(-10)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}