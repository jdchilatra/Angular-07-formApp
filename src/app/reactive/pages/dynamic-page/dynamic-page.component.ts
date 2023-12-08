import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlState, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
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

  isValidfieldInArray(formArray: FormArray,index: number){
    return formArray.controls[index].errors
            && formArray.controls[index].touched
  }

  public myForm: FormGroup = this.formBuilder.group({
    name: ['',[
      Validators.required,
      Validators.minLength(3),
    ]],
    favoriteGames:this.formBuilder.array([
      ['Metal Gear',Validators.required],
      ['Death Stranding',Validators.required],
    ])
  })

  public newFavorite: FormControl = new FormControl('',[
    Validators.required
  ])

  constructor(
    private formBuilder: FormBuilder
  ){}

  onSubmit(): void{

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();
  }

  onDeleteFavorite(index:number):void{
    this.favoriteGames.removeAt(index);
  }

  onAddToFavorites():void{
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value
    //si no trabajara con el form builder
    //this.favoriteGames.push(new FormControl(newGame,Validators.required))

    this.favoriteGames.push(
      this.formBuilder.control(newGame,Validators.required)
    );

    this.newFavorite.reset();

  }
}
