import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppSettings } from '../../../service/app-settings.service';

@Component({
    selector: 'biddler-verify-email',
    templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
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
