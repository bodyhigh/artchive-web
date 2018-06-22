import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormValidationService {
    public FormValidationService() {

    }

    // get all values of the formGroup, loop over them
    // then mark each field as touched
    public markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            // if (control.controls) {
            //     control.controls.foreach(c => this.markFormGroupTouched(c))
            // }
        });
    }

    // return list of error messages
    public validationMessages() {
        const messages = {
            required: 'This field is required',
            // minlength: 'This field must be at least # characters long'
            minlength: (params: any) => {
                return `This field must be at least ${params.requiredLength} characters long`
            }
        }

        return messages;
    }

    // Validate form instance
    // check_dirty true will only emit errors if the field is touched
    // check_dirty false will check all fields independent of
    // being touched or not. Use this as the last check before submitting
    public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
        // console.log('????????????????? validating form ?????????????????');
        
        const form = formToValidate;
        // console.log(formErrors);
        
        for(const field in formErrors) {
            if (field) {
                formErrors[field] = '';
                console.log('validating field: ' + field);

                const control = form.get(field);
                const messages = this.validationMessages();

                console.log(control);

                if (control && !control.valid) {
                    if (!checkDirty || (control.dirty || control.touched)) {
                        for(const key in control.errors) {
                            if (key && key === 'minlength') {
                                // console.log('Some Special Error');
                                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
                            } else {
                                // console.log('found error: ' + formErrors[field]);
                                // console.log('found error: ' + messages[key]);
                                // console.log('found error: ' + key);
                                formErrors[field] = formErrors[field] || messages[key];
                                                                
                            }
                        }
                    }
                }
            }
        }

        return formErrors;
    }
}