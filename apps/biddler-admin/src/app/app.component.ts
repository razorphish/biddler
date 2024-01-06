import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    standalone: true,
    imports: [NxWelcomeComponent, RouterModule, FormsModule, ReactiveFormsModule],
    selector: 'biddler-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'biddler-admin';
}
