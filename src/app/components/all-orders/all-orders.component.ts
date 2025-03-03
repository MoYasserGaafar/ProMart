import { Component, inject } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/interfaces/order';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})

export class AllOrdersComponent {
  orders: Order[] = []
  page: number = 1;
  pageSize: number = 10;

  private readonly _OrderService = inject(OrderService)

  
  ngOnInit(): void {
    this._OrderService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}