import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppSettings } from '../../../lib/services/app/app-settings.service';

@Component({
    selector: 'biddler-login',
    standalone: true,
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        public appSettings: AppSettings,
    ) {}

    ngOnInit() {
        this.appSettings.appEmpty = true;
    }

    ngOnDestroy() {
        this.appSettings.appEmpty = false;
    }

    formSubmit(f: NgForm) {
        this.router.navigate(['']);
    }
}
