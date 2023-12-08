import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    wantNotification: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  public person = {
    gender: 'F',
    wantNotification: false
  }

  public Defaultperson = {
    gender: 'F',
    wantNotification: false,
    termsAndConditions: false
  }

  constructor(
    private formBuilder: FormBuilder
  ){}
  ngOnInit(): void {
    this.myForm.reset(this.person);
    //this.myForm.controls['wantNotification'].markAsTouched();
  }

  onSave(){
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset(this.Defaultperson);

  }

  isValidField(field:string): boolean | null{
    return this.myForm.controls[field].errors
            && this.myForm.controls[field].touched
  }
}
