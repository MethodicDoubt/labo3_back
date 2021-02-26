import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adv-search',
  templateUrl: './adv-search.component.html',
  styleUrls: ['./adv-search.component.scss']
})
export class AdvSearchComponent implements OnInit {

  fg : FormGroup;

  minimumPrice : number = 0;
  maximumPrice : number = 0;

  constructor(private _builder : FormBuilder) { }

  ngOnInit(): void {

    this.initForm();

  }

  private initForm() {
    this.fg = this._builder.group({
      name : [''],
      categoriesDto : [''],
      minimumPrice : [''],
      maximumPrice : [''],
      quantity : ['', Validators.required],
      supplierDto : ['']
    })
  }

  onSubmit() {



  }

  sliderMinChange(event: Event) {

    this.minimumPrice = event.target["value"];

  }

  sliderMaxChange(event: Event) {

    this.maximumPrice = event.target["value"];

  }

}
