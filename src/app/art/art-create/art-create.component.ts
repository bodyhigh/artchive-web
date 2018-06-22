import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidationService } from '../../services';

@Component({
  selector: 'app-art-create',
  templateUrl: './art-create.component.html',
  styleUrls: ['./art-create.component.css']
})
export class ArtCreateComponent implements OnInit {
    public createForm: FormGroup;
    public formErrors = {
        title: '',
        description: ''
    };
  
    constructor(
        private fb: FormBuilder, private formValidation: FormValidationService) { }

    ngOnInit() {
        this.formConfig();
    }

    formConfig() {
        this.createForm = this.fb.group({
            title: new FormControl('', [Validators.required, Validators.maxLength(150)]),
            description: new FormControl('', [Validators.required, Validators.minLength(3)])
        });

        this.createForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formValidation.validateForm(this.createForm, this.formErrors, true);
        });
    }

    submitForm() {        
        this.formValidation.markFormGroupTouched(this.createForm);

        if (this.createForm.valid) {
            console.log('submit the form');
            this.createForm.reset();
        } else {
            this.formValidation.validateForm(this.createForm, this.formErrors, false);
        }

        console.log(this.createForm);
        // console.log(this.formErrors);
        // const desc = this.createForm.get('description');
        // console.log(desc.value.length);
        
    }
}
