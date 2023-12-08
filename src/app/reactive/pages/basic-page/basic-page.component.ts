import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent {
/*
  public myform: FormGroup = new FormGroup({
    //valor defecto, validaciones sincronas, validaciones asincronas
    name: new FormControl('',[],[]),
    price: new FormControl(0),
    inStorage: new FormControl(0)
  })
  */

  public myForm: FormGroup = this.formbuilder.group({
    name: ['',[],[]],
    price: [0],
    inStorage: [0],
  })
 public constructor(
  private formbuilder: FormBuilder,
 ){}

  onSave():void{
    console.log(this.myForm.value)
  }

}
