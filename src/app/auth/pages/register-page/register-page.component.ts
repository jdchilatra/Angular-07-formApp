import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
//import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    name: ['',[
      Validators.required,
      Validators.pattern(this.validatorService.firstNameAndLastnamePattern)
    ]],
    email: ['',[
      Validators.required,
      Validators.pattern(this.validatorService.emailPattern)],
      [
        new EmailValidatorService()
      ]
    ],
    userName: ['',[
      Validators.required,
      this.validatorService.cantBeStrider
    ]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    password2: ['',[Validators.required,Validators.minLength(6)]]
  },{
    validators:[
      this.validatorService.isFielOneEqualFieldTwo('password','password2')
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService,
  ){}

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

  isValidField(field:string) {
    return this.validatorService.isValidField(this.myForm, field);
  }

}
