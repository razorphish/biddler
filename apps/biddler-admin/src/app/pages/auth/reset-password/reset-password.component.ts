import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
    selector: 'biddler-reset-password',
    templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    constructor(private router: Router, public appSettings: AppSettings) {}

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
