import { Component, inject } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/interfaces/order';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent {
  orders: Order[] = []
  private readonly _OrderService = inject(OrderService)
  
  ngOnInit(): void {
    this._OrderService.getAllOrders().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}