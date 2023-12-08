import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const rtx5090 = {
  name: 'rtx5090',
  price: 2500,
  inStorage: 10
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {
/*
  public myform: FormGroup = new FormGroup({
    //valor defecto, validaciones sincronas, validaciones asincronas
    name: new FormControl('',[],[]),
    price: new FormControl(0),
    inStorage: new FormControl(0)
  })
  */

  public myForm: FormGroup = this.formbuilder.group({
    name: ['',[
      Validators.required,
      Validators.minLength(3)
    ],[]],
    price: [0,[
      Validators.required,
      Validators.min(0)
    ]],
    inStorage: [0,[
      Validators.required,
      Validators.min(0)
    ]],
  })
 public constructor(
  private formbuilder: FormBuilder,
 ){}

  ngOnInit(): void {
    //this.myForm.reset(rtx5090)
  }

  onSave():void{
    if(this.myForm.invalid) {
      //Para que se activen validaciones que se muestran solo cuando se muestra el formulario
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value)

    this.myForm.reset({price:10, inStorage: 0});
  }

  isValidField(field:string): boolean | null{
    return this.myForm.controls[field].errors
            && this.myForm.controls[field].touched
  }

  getFieldError(field:string):string | null{
    if(!this.myForm.controls[field] &&
       !this.myForm.controls[field].errors
      ) return null;

    //En este punto los errores siempre existen
    const errors = this.myForm.controls[field].errors!

    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`
      }
    }

    return null;
  }
}
