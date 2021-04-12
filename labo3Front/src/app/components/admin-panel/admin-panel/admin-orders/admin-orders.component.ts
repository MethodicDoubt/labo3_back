import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(private _orderService: OrderService) { }

  ngOnInit(): void {
    this.initOrders();
  }
  initOrders() {
    this._orderService.getAllOrders().subscribe(
      allOrders => {
        this.orders = allOrders
      }
    )
  }



}
