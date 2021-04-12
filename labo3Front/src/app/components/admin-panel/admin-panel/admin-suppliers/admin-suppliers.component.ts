import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';

@Component({
  selector: 'app-admin-suppliers',
  templateUrl: './admin-suppliers.component.html',
  styleUrls: ['./admin-suppliers.component.scss']
})
export class AdminSuppliersComponent implements OnInit {

  suppliers: Supplier[] = [];

  constructor(private _supplierService: SupplierService,
    private _dialogBox: NbDialogService,
    private _router: Router) { }

  ngOnInit(): void {
    this.initSuppliers();
  }

  initSuppliers() {
    this._supplierService.getAll().subscribe(
      allSuppliers => {
        this.suppliers = allSuppliers
      }
    );
  }

  clickAdd() {
    let ref = this._dialogBox.open(
      AddSupplierComponent
    );
    ref.onClose.subscribe(() => this.initSuppliers());
  }

  clickEdit(supplierId: number) {
    this._router.navigate(['admin', 'suppliers', supplierId])
  }

}
