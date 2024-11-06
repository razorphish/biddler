import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login',
        loadComponent: async () => (await import('./login/login.component')).LoginComponent,
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: async () => (await import('./register/register.component')).RegisterComponent,
    },
    {
        path: 'forgot-password',
        title: 'Forgot Password',
        loadComponent: async () =>
            (await import('./forgot-password/forgot-password.component')).ForgotPasswordComponent,
    },
    {
        path: 'reset-password',
        title: 'Reset Password',
        loadComponent: async () => (await import('./reset-password/reset-password.component')).ResetPasswordComponent,
    },
    {
        path: 'verify-email',
        title: 'Verify Email',
        loadComponent: async () => (await import('./verify-email/verify-email.component')).VerifyEmailComponent,
    },
];
