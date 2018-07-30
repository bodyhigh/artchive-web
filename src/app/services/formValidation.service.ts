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
            minlength: (params: any) => {
                return `This field must be at least ${params.requiredLength} characters long`
            },
            maxlength: (params: any) => {
                return `This field cannot exceed ${params.requiredLength} characters`
            }
        }

        return messages;
    }

    // Validate form instance
    // check_dirty true will only emit errors if the field is touched
    // check_dirty false will check all fields independent of
    // being touched or not. Use this as the last check before submitting
    public validateForm(formToValidate: FormGroup, formErrors: any, checkDirty?: boolean) {
        const form = formToValidate;

        for(const field in formErrors) {
            if (field) {
                formErrors[field] = '';

                const control = form.get(field);
                const messages = this.validationMessages();

                // console.log(control);
                // console.log(`field: ${field}`);
                // console.log(`control: ${control} -- ${!control.valid}`);
                if (control && !control.valid) {
                    // console.log(`control: ${!checkDirty} -- ${control.dirty} -- ${control.touched}`);
                    if (!checkDirty || (control.dirty || control.touched)) {
                        // console.log(`control errors:`);
                        // console.log(control.errors);
                        for(const key in control.errors) {
                            // console.log(`key: ${key}`);
                            if (key && (
                                key === 'minlength' || key === 'maxlength')) {
                                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
                            } else {
                                // console.log(`formErrors-field: ${formErrors[field]}`);
                                // console.log(`messages-key: ${messages[key]}`)
                                // console.log(`messages-key: ${control.errors[key]}`)
                                formErrors[field] = formErrors[field] || messages[key] || control.errors[key];
                            }
                        }
                    }
                }
            }
        }

        return formErrors;
    }
}