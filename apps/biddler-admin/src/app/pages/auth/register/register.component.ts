import { CommonModule } from '@angular/common';
import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AppSettings } from '../../../lib/services/app/app-settings.service';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'biddler-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnDestroy {
    constructor(
        private router: Router,
        private renderer: Renderer2,
        public appSettings: AppSettings,
    ) {}

    ngOnInit() {
        this.appSettings.appEmpty = true;
        this.renderer.addClass(document.body, 'bg-white');
    }

    ngOnDestroy() {
        this.appSettings.appEmpty = false;
        this.renderer.removeClass(document.body, 'bg-white');
    }

    formSubmit(f: NgForm) {
        this.router.navigate(['dashboard/v3']);
    }
}
