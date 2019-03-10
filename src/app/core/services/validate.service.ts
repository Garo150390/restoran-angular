import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  static alertValidate(event, formGroup) {
    if (formGroup.controls[event.name].status === 'INVALID') {
      event.classList.add('border-danger', 'shadow-none');
    } else {
      event.classList.remove('border-danger', 'shadow-none');
    }
  }

  static validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  static markAsIncorrect(obj, component): boolean {
    let validationError = false;
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && component[key]) {
        validationError = true;
        component[key].setErrors({'incorrect': obj[key][0]});
      }
    }
    return validationError;
  }
}
