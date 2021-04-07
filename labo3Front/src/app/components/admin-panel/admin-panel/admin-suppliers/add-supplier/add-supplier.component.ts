import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';
import { JuridicalStatus, Sector } from 'src/app/utils/enumeration';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {

  // bidule = Object.values(enum)
  formSupplier: FormGroup;
  sector = Object.values(Sector).filter(elt => typeof elt === 'string');
  juridicalStatus = Object.values(JuridicalStatus).filter(elt => typeof elt === 'string');


  constructor(private _formBuilder: FormBuilder,
    private _supplierService: SupplierService,
    private _nbDiagRef: NbDialogRef<AddSupplierComponent>) { }

  ngOnInit(): void {
    this.initFormSupplier();
  }

  initFormSupplier() {
    this.formSupplier = this._formBuilder.group({
      companyName: ['', Validators.required],
      juridicalStatus: ['', Validators.required],
      sector: ['', Validators.required]
    });
  }

  onSubmit() {
    let newSupplier = new Supplier();
    newSupplier.companyName = this.formSupplier.get('companyName').value;
    newSupplier.sector = this.formSupplier.get('sector').value;
    newSupplier.juridicalStatus = this.formSupplier.get('juridicalStatus').value;

    this._supplierService.insert(newSupplier).subscribe(
      next => {
        next ? alert("Supplier create") : alert("Problem, try again");
        this._nbDiagRef.close();
      }
    );
  }

}
