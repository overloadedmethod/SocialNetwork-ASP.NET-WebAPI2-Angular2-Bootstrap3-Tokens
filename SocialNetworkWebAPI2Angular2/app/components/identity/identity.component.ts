import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService$, ILoginRegisterUser, LoginService$ } from '../../services/register.service';




@Component(
    {
        selector: 'identity',
        templateUrl: 'app/components/identity/identity.component.html',
        styleUrls: ['app/components/identity/identity.component.css']
    }
)

export class IdentityComponent implements OnInit {

    register: FormGroup;
    login: FormGroup;

    constructor(private registerService: RegisterService$, private loginService: LoginService$, private router: Router) {
        this.loginService.filter(token => token != null).subscribe(_ => this.router.navigate(["/privatechat"]));
        this.loginService.filter(token => token == null).subscribe(_ => this.router.navigate(["/identity"]));
    }

    ngOnInit() {
        this.login = new FormGroup(
            {
                username: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
                password: new FormControl('', [Validators.minLength(6), Validators.maxLength(100)])
            }
        );

        this.register = new FormGroup(
            {
                username: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
                password: new FormControl('', [Validators.minLength(6), Validators.maxLength(100)]),
                passwordConfirm: new FormControl('', [Validators.minLength(6), Validators.maxLength(100)])
            }, this.passwordMatchValidator
        );

    }

    onLogin() {
        this.loginService.next(this.login.value);
    }

    onRegister() {
        this.registerService.next(this.register.value);
        this.registerService.filter(r => r.valueOf()).subscribe(_ => this.loginService.next(this.register.value));
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('passwordConfirm').value
            ? null : { 'mismatch': true };
    }
}

