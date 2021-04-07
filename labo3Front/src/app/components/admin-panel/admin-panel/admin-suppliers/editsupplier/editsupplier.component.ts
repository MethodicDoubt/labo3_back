import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';
import { Sector, JuridicalStatus } from 'src/app/utils/enumeration';

@Component({
  selector: 'app-editsupplier',
  templateUrl: './editsupplier.component.html',
  styleUrls: ['./editsupplier.component.scss']
})
export class EditsupplierComponent implements OnInit {

  formSupplier: FormGroup;
  supplier: Supplier = new Supplier();
  sector = Object.values(Sector).filter(elt => typeof elt === 'string');
  juridicalStatus = Object.values(JuridicalStatus).filter(elt => typeof elt === 'string');

  constructor(private _formBuilder: FormBuilder,
    private _supplierService: SupplierService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.initFormSupplierEmpty();
    this.initSupplier()
  }

  initFormSupplierEmpty() {
    this.formSupplier = this._formBuilder.group({
      companyName: ['', Validators.required],
      juridicalStatus: ['', Validators.required],
      sector: ['', Validators.required]
    });
  }

  initSupplier() {
    this._activatedRoute.params.subscribe(
      params => {
        this._supplierService.getById(params['id']).subscribe(
          supplierByid => {
            this.supplier = supplierByid;
            this.initFormSupplierWithValue();
          }
        );
      }
    );
  }

  initFormSupplierWithValue() {
    this.formSupplier = this._formBuilder.group({
      companyName: [this.supplier.companyName, Validators.required],
      juridicalStatus: [this.supplier.juridicalStatus, Validators.required],
      sector: [this.supplier.sector, Validators.required]
    });
  }

  onSubmit() {
    let supplierToUpdate = new Supplier();
    supplierToUpdate.companyName = this.formSupplier.value['companyName'];
    supplierToUpdate.juridicalStatus = this.formSupplier.value['juridicalStatus'];
    supplierToUpdate.sector = this.formSupplier.value['sector'];
    this._supplierService.update(supplierToUpdate, this.supplier.supplierId).subscribe(
      next => {
        this._router.navigate(['admin', 'suppliers'])
      }
    );
  }

}
