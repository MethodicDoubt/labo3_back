import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-admin-suppliers',
  templateUrl: './admin-suppliers.component.html',
  styleUrls: ['./admin-suppliers.component.scss']
})
export class AdminSuppliersComponent implements OnInit {

  suppliers: Supplier[] = [];

  constructor(private _supplierService: SupplierService) { }

  ngOnInit(): void {
    this.initSuppliers();
  }
  
  initSuppliers() {
    this._supplierService.getAll().subscribe(
      allSuppliers => {
        this.suppliers = allSuppliers
      }
    )
  }

  clickEdit() {

  }

}
