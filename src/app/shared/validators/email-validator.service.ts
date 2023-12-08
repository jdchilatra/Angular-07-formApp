import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {

  /*
  //NOTA: Primero se pasan todos los validaores sincronos y despues de habilita el validaor asincrono
  //El estadus es pending hasta qye se resuelve el validaor asincrono
  validate(control: AbstractControl<any, any>):Observable<ValidationErrors | null> {

    const email = control.value;
    console.log(email);

    return of({
      emailTaken: true
    }).pipe(
      delay(2000)
    )
  }*/

  validate(control: AbstractControl<any, any>):Observable<ValidationErrors | null> {

    const email = control.value;
    console.log(email);

    const httpCallObservable = new Observable<ValidationErrors | null>((suscriber) =>{
      console.log(email)
      if(email === 'd@d.com'){
        suscriber.next({emailTaken: true})
        //se limpia el suscriptor ya que el valor solo se emite una vez
        suscriber.complete();
        //con el complete no se siguen emitiendo valores, no es necesario return
      }
      suscriber.next(null);
      suscriber.complete();

    }).pipe(
      delay(3000)
    )

    return httpCallObservable;

  }

  /*
  //sirve para determinar cuando el validaotr cambia
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  */



}
