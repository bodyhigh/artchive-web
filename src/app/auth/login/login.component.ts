import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFailed: boolean = false;
    returnUrl: string;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private logService: LogService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/art-collection';
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    submitForm() {
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;

        this.authService.login(username, password)
            .subscribe(
                result => {
                    if (result.loggedIn) {
                        this.router.navigate([this.returnUrl]);
                    }

                    this.loginFailed = !result.loggedIn;
                    
                },
                err => {
                    this.logService.log(err);
                    
                }              
            );
    }

    onCancel() {
        this.router.navigate(['/']);
    }
}
