import { Component, OnInit, ViewChild, ElementRef, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidationService, ArtService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomResponseError, CustomError } from '../../services/CustomResponseError';
import { DomSanitizer } from '../../../../node_modules/@angular/platform-browser';
import { utils } from '../../../../node_modules/protractor';

@Component({
  selector: 'app-art-create',
  templateUrl: './art-create.component.html',
  styleUrls: ['./art-create.component.css']
})
export class ArtCreateComponent implements OnInit {
    @ViewChild('hiddenFileControl') hiddenFileControl: ElementRef
    public createForm: FormGroup;
    public formErrors = {
        title: '',
        description: '',
        imageFile: ''
    };

    public uploadFileError: string = '';

    public responseError = '';

    public imageFileName: string;
  
    constructor(
        private fb: FormBuilder, 
        private formValidation: FormValidationService,
        private artService: ArtService,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.formConfig();
    }

    formConfig() {
        this.createForm = this.fb.group({
            title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
            description: new FormControl('', [Validators.required, Validators.minLength(3)]),
            imageFile: new FormControl('', [this.imageFileValidator])
            // imageFile: ['']
        });

        this.createForm.valueChanges.subscribe((data) => {
            this.formErrors = this.formValidation.validateForm(this.createForm, this.formErrors, true);
        });
    }

    submitForm() {        
        this.formValidation.markFormGroupTouched(this.createForm);

        if (this.createForm.valid) {
            const title = this.sanitizer.sanitize(SecurityContext.HTML, this.createForm.get('title').value);
            const description = this.sanitizer.sanitize(SecurityContext.HTML, this.createForm.get('description').value);
            const imageFile = this.createForm.get('imageFile').value;
            this.uploadFileError = '';

            this.artService.create(title, description, imageFile)
                .subscribe(
                    res => {
                        this.onNavigateBack();
                    },
                    error => {
                        let customResponseError: CustomResponseError = error;
                        this.responseError = customResponseError.responseMessage;

                        for(let customError of customResponseError.customErrors) {
                            if (customError.field == 'uploadFile1') {
                                // this.formErrors[customError.field] = customError.errorMessage;
                                this.uploadFileError = customError.errorMessage;
                            } else {
                                this.responseError += `<div>[${customError.field}] - ${customError.errorMessage}</div>`;
                            }
                        }
                    }
                );
        } else {
            this.formValidation.validateForm(this.createForm, this.formErrors, false);
        }
    }

    onNavigateBack() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    onSelectImageFile() {
        this.hiddenFileControl.nativeElement.click();
    }

    onImageFileChange(files) {
        const imageFile: File = files[0];
        this.uploadFileError = '';

        let imageFileControl: FormControl = <FormControl>this.createForm.get('imageFile');

        // if (imageFileControl === null) {
        //     imageFileControl = new FormControl(imageFile, this.imageFileValidator);
        // } else {
            imageFileControl.setValue(imageFile);
            imageFileControl.markAsDirty();
        // }

        this.imageFileName = imageFile.name;        
    }

    imageFileValidator(control: FormControl) {
        const errors = {};
        const fileTypeWhiteList = ['image/jpg', 'image/jpeg'];
        const maxFileSize: number = 700000;
        const imageFile: File = control.value;

        if (imageFile.size > maxFileSize) {
            errors['exceededMaxFileSize'] = `File size ${imageFile.size} exceeds the max file size ${maxFileSize}`;
        }

        if (fileTypeWhiteList.indexOf(imageFile.type) === -1) {
            errors['invalidFileType'] = `Invalid file type of '${imageFile.type}'`;
        }

        return (Object.keys(errors).length === 0) ? null : errors;
    }
}
