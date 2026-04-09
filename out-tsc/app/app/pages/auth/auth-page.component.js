import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function AuthPageComponent_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 26);
    i0.ɵɵelement(1, "path", 45)(2, "circle", 46);
    i0.ɵɵelementEnd();
} }
function AuthPageComponent_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 26);
    i0.ɵɵelement(1, "path", 47)(2, "path", 48)(3, "line", 49);
    i0.ɵɵelementEnd();
} }
function AuthPageComponent_Conditional_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 26);
    i0.ɵɵelement(1, "path", 45)(2, "circle", 46);
    i0.ɵɵelementEnd();
} }
function AuthPageComponent_Conditional_88_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 26);
    i0.ɵɵelement(1, "path", 47)(2, "path", 48)(3, "line", 49);
    i0.ɵɵelementEnd();
} }
function AuthPageComponent_Conditional_97_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 26);
    i0.ɵɵelement(1, "path", 45)(2, "circle", 46);
    i0.ɵɵelementEnd();
} }
function AuthPageComponent_Conditional_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 26);
    i0.ɵɵelement(1, "path", 47)(2, "path", 48)(3, "line", 49);
    i0.ɵɵelementEnd();
} }
export class AuthPageComponent {
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    toastService = inject(ToastService);
    router = inject(Router);
    activeTab = 'login';
    isLoginSubmitting = false;
    isSignupSubmitting = false;
    isGoogleSubmitting = false;
    loginForm = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });
    signupForm = this.fb.nonNullable.group({
        fullName: ['', [Validators.required, Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: [
            '',
            [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
    });
    passwordVisibility = {
        loginPassword: false,
        signupPassword: false,
        signupConfirm: false
    };
    constructor() {
        if (this.authService.isAuthenticated()) {
            void this.router.navigateByUrl('/dashboard');
        }
    }
    setTab(tab) {
        this.activeTab = tab;
        this.clearFormErrors();
    }
    handleLogin() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        this.isLoginSubmitting = true;
        this.authService
            .login(this.loginForm.getRawValue())
            .pipe(finalize(() => (this.isLoginSubmitting = false)))
            .subscribe({
            next: () => {
                this.toastService.show('Welcome back!');
                void this.router.navigateByUrl('/dashboard');
            },
            error: (error) => {
                this.toastService.show(this.extractErrorMessage(error), true);
            }
        });
    }
    handleSignup() {
        if (this.signupForm.invalid) {
            this.signupForm.markAllAsTouched();
            return;
        }
        const { password, confirmPassword } = this.signupForm.getRawValue();
        if (password !== confirmPassword) {
            this.signupForm.controls.confirmPassword.setErrors({ mismatch: true });
            this.signupForm.controls.confirmPassword.markAsTouched();
            return;
        }
        this.isSignupSubmitting = true;
        this.authService
            .register({
            fullName: this.signupForm.controls.fullName.value,
            email: this.signupForm.controls.email.value,
            mobileNumber: this.signupForm.controls.mobileNumber.value,
            password: this.signupForm.controls.password.value
        })
            .pipe(finalize(() => (this.isSignupSubmitting = false)))
            .subscribe({
            next: () => {
                this.toastService.show('Account created successfully!');
                void this.router.navigateByUrl('/dashboard');
            },
            error: (error) => {
                this.toastService.show(this.extractErrorMessage(error), true);
            }
        });
    }
    togglePassword(field) {
        this.passwordVisibility[field] = !this.passwordVisibility[field];
    }
    handleGoogleLogin() {
        if (this.isGoogleSubmitting) {
            return;
        }
        this.isGoogleSubmitting = true;
        this.authService.loginWithGoogle();
    }
    shouldShowLoginError(controlName) {
        const control = this.loginForm.controls[controlName];
        return control.invalid && (control.dirty || control.touched);
    }
    shouldShowSignupError(controlName) {
        const control = this.signupForm.controls[controlName];
        return control.invalid && (control.dirty || control.touched);
    }
    getFieldError(controlName, mode) {
        if (mode === 'login' && !this.shouldShowLoginError(controlName)) {
            return '';
        }
        if (mode === 'signup' && !this.shouldShowSignupError(controlName)) {
            return '';
        }
        if (mode === 'login') {
            const control = this.loginForm.controls[controlName];
            if (control.errors?.['required']) {
                return controlName === 'email' ? 'Email is required' : 'Password is required';
            }
            if (control.errors?.['email']) {
                return 'Enter a valid email address';
            }
            return 'Invalid value';
        }
        const control = this.signupForm.controls[controlName];
        if (control.errors?.['required']) {
            if (controlName === 'fullName')
                return 'Please enter your full name';
            if (controlName === 'mobileNumber')
                return 'Mobile number is required';
            if (controlName === 'email')
                return 'Email is required';
            if (controlName === 'password')
                return 'Password is required';
            return 'Confirm password is required';
        }
        if (control.errors?.['email']) {
            return 'Enter a valid email address';
        }
        if (control.errors?.['minlength']) {
            return 'Password must be at least 8 characters';
        }
        if (control.errors?.['pattern']) {
            return 'Mobile number must contain 10 to 15 digits';
        }
        if (control.errors?.['mismatch']) {
            return 'Passwords do not match';
        }
        return 'Invalid value';
    }
    clearFormErrors() {
        for (const control of Object.values(this.loginForm.controls)) {
            control.setErrors(null);
        }
        for (const control of Object.values(this.signupForm.controls)) {
            control.setErrors(null);
        }
    }
    extractErrorMessage(error) {
        const apiError = error.error;
        if (apiError?.message) {
            return apiError.message;
        }
        return 'Unable to process request. Check backend logs and try again.';
    }
    static ɵfac = function AuthPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuthPageComponent, selectors: [["app-auth-page"]], decls: 114, vars: 45, consts: [["id", "auth-page"], [1, "auth-card"], [1, "auth-left"], [1, "auth-icon-wrap"], ["width", "46", "height", "46", "viewBox", "0 0 46 46", "fill", "none"], ["x", "6", "y", "20", "width", "34", "height", "6", "rx", "3", "fill", "white", "opacity", "0.9"], ["x", "6", "y", "20", "width", "4", "height", "14", "rx", "2", "fill", "white", "opacity", "0.7"], ["x", "36", "y", "12", "width", "4", "height", "22", "rx", "2", "fill", "white", "opacity", "0.7"], ["cx", "23", "cy", "14", "r", "5", "fill", "#fbbf24"], [1, "brand-sub"], [1, "brand-main"], [1, "brand-tagline"], [1, "auth-features"], [1, "auth-right"], [1, "auth-tabs"], ["data-tab", "login", 1, "auth-tab", 3, "click"], ["data-tab", "signup", 1, "auth-tab", 3, "click"], ["id", "login-form", 1, "auth-form", 3, "ngSubmit", "formGroup"], [1, "field-group"], ["for", "login-email", 1, "field-label"], [1, "input-wrap"], ["id", "login-email", "type", "email", "placeholder", "Enter your email", "autocomplete", "email", "formControlName", "email"], [1, "field-error"], ["for", "login-password", 1, "field-label"], ["id", "login-password", "placeholder", "Enter your password", "autocomplete", "current-password", "formControlName", "password", 3, "type"], ["type", "button", "tabindex", "-1", "aria-label", "Toggle password visibility", 1, "toggle-pw", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["type", "submit", 1, "btn-primary", 3, "disabled"], [1, "oauth-divider"], ["type", "button", 1, "btn-google", 3, "click", "disabled"], ["viewBox", "0 0 24 24", "aria-hidden", "true"], ["fill", "#EA4335", "d", "M12 10.2v3.9h5.5c-.3 1.3-1.8 3.9-5.5 3.9-3.3 0-6.1-2.8-6.1-6.2s2.8-6.2 6.1-6.2c1.9 0 3.1.8 3.9 1.5l2.7-2.6C17 2.9 14.8 2 12 2 6.9 2 2.8 6.2 2.8 11.4s4.1 9.4 9.2 9.4c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1.1-.2-1.6H12z"], [1, "auth-switch"], [3, "click"], ["id", "signup-form", 1, "auth-form", 3, "ngSubmit", "formGroup"], ["for", "signup-name", 1, "field-label"], ["id", "signup-name", "type", "text", "placeholder", "Enter your full name", "autocomplete", "name", "formControlName", "fullName"], ["for", "signup-email", 1, "field-label"], ["id", "signup-email", "type", "email", "placeholder", "Enter your email", "autocomplete", "email", "formControlName", "email"], ["for", "signup-mobile", 1, "field-label"], ["id", "signup-mobile", "type", "text", "placeholder", "Enter your mobile number", "autocomplete", "tel", "formControlName", "mobileNumber"], ["for", "signup-password", 1, "field-label"], ["id", "signup-password", "placeholder", "Min 8 characters", "autocomplete", "new-password", "formControlName", "password", 3, "type"], ["for", "signup-confirm", 1, "field-label"], ["id", "signup-confirm", "placeholder", "Repeat your password", "autocomplete", "new-password", "formControlName", "confirmPassword", 3, "type"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"], ["d", "M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"], ["x1", "1", "y1", "1", "x2", "23", "y2", "23"]], template: function AuthPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(4, "svg", 4);
            i0.ɵɵelement(5, "rect", 5)(6, "rect", 6)(7, "rect", 7)(8, "circle", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(9, "div", 9);
            i0.ɵɵtext(10, "Quantity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 10);
            i0.ɵɵtext(12, "MEASUREMENT");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 11);
            i0.ɵɵtext(14, "Measure, Convert & Compare");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "ul", 12)(16, "li");
            i0.ɵɵtext(17, "Length & Weight");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "li");
            i0.ɵɵtext(19, "Temperature");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "li");
            i0.ɵɵtext(21, "Volume");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "div", 13)(23, "div", 14)(24, "div", 15);
            i0.ɵɵlistener("click", function AuthPageComponent_Template_div_click_24_listener() { return ctx.setTab("login"); });
            i0.ɵɵtext(25, " Login ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 16);
            i0.ɵɵlistener("click", function AuthPageComponent_Template_div_click_26_listener() { return ctx.setTab("signup"); });
            i0.ɵɵtext(27, " Signup ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "form", 17);
            i0.ɵɵlistener("ngSubmit", function AuthPageComponent_Template_form_ngSubmit_28_listener() { return ctx.handleLogin(); });
            i0.ɵɵelementStart(29, "div", 18)(30, "label", 19);
            i0.ɵɵtext(31, "Email Id");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 20);
            i0.ɵɵelement(33, "input", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "span", 22);
            i0.ɵɵtext(35);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 18)(37, "label", 23);
            i0.ɵɵtext(38, "Password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 20);
            i0.ɵɵelement(40, "input", 24);
            i0.ɵɵelementStart(41, "button", 25);
            i0.ɵɵlistener("click", function AuthPageComponent_Template_button_click_41_listener() { return ctx.togglePassword("loginPassword"); });
            i0.ɵɵtemplate(42, AuthPageComponent_Conditional_42_Template, 3, 0, ":svg:svg", 26)(43, AuthPageComponent_Conditional_43_Template, 4, 0, ":svg:svg", 26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "span", 22);
            i0.ɵɵtext(45);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "button", 27);
            i0.ɵɵtext(47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 28)(49, "span");
            i0.ɵɵtext(50, "or");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "button", 29);
            i0.ɵɵlistener("click", function AuthPageComponent_Template_button_click_51_listener() { return ctx.handleGoogleLogin(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(52, "svg", 30);
            i0.ɵɵelement(53, "path", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(54);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(55, "p", 32);
            i0.ɵɵtext(56, " Don't have an account? ");
            i0.ɵɵelementStart(57, "a", 33);
            i0.ɵɵlistener("click", function AuthPageComponent_Template_a_click_57_listener() { return ctx.setTab("signup"); });
            i0.ɵɵtext(58, "Sign Up");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(59, "form", 34);
            i0.ɵɵlistener("ngSubmit", function AuthPageComponent_Template_form_ngSubmit_59_listener() { return ctx.handleSignup(); });
            i0.ɵɵelementStart(60, "div", 18)(61, "label", 35);
            i0.ɵɵtext(62, "Full Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 20);
            i0.ɵɵelement(64, "input", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "span", 22);
            i0.ɵɵtext(66);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "div", 18)(68, "label", 37);
            i0.ɵɵtext(69, "Email Id");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "div", 20);
            i0.ɵɵelement(71, "input", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "span", 22);
            i0.ɵɵtext(73);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(74, "div", 18)(75, "label", 39);
            i0.ɵɵtext(76, "Mobile Number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "div", 20);
            i0.ɵɵelement(78, "input", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "span", 22);
            i0.ɵɵtext(80);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(81, "div", 18)(82, "label", 41);
            i0.ɵɵtext(83, "Password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "div", 20);
            i0.ɵɵelement(85, "input", 42);
            i0.ɵɵelementStart(86, "button", 25);
            i0.ɵɵlistener("click", function AuthPageComponent_Template_button_click_86_listener() { return ctx.togglePassword("signupPassword"); });
            i0.ɵɵtemplate(87, AuthPageComponent_Conditional_87_Template, 3, 0, ":svg:svg", 26)(88, AuthPageComponent_Conditional_88_Template, 4, 0, ":svg:svg", 26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(89, "span", 22);
            i0.ɵɵtext(90);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(91, "div", 18)(92, "label", 43);
            i0.ɵɵtext(93, "Confirm Password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "div", 20);
            i0.ɵɵelement(95, "input", 44);
            i0.ɵɵelementStart(96, "button", 25);
            i0.ɵɵlistener("click", function AuthPageComponent_Template_button_click_96_listener() { return ctx.togglePassword("signupConfirm"); });
            i0.ɵɵtemplate(97, AuthPageComponent_Conditional_97_Template, 3, 0, ":svg:svg", 26)(98, AuthPageComponent_Conditional_98_Template, 4, 0, ":svg:svg", 26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(99, "span", 22);
            i0.ɵɵtext(100);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(101, "button", 27);
            i0.ɵɵtext(102);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(103, "div", 28)(104, "span");
            i0.ɵɵtext(105, "or");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(106, "button", 29);
            i0.ɵɵlistener("click", function AuthPageComponent_Template_button_click_106_listener() { return ctx.handleGoogleLogin(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(107, "svg", 30);
            i0.ɵɵelement(108, "path", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(109);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(110, "p", 32);
            i0.ɵɵtext(111, " Already have an account? ");
            i0.ɵɵelementStart(112, "a", 33);
            i0.ɵɵlistener("click", function AuthPageComponent_Template_a_click_112_listener() { return ctx.setTab("login"); });
            i0.ɵɵtext(113, "Login");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(24);
            i0.ɵɵclassProp("active", ctx.activeTab === "login");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.activeTab === "signup");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("hidden", ctx.activeTab !== "login");
            i0.ɵɵproperty("formGroup", ctx.loginForm);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("error", ctx.shouldShowLoginError("email"));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.getFieldError("email", "login"));
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("error", ctx.shouldShowLoginError("password"));
            i0.ɵɵproperty("type", ctx.passwordVisibility.loginPassword ? "text" : "password");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.passwordVisibility.loginPassword ? 42 : 43);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.getFieldError("password", "login"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isLoginSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.isLoginSubmitting ? "Logging in..." : "Login", " ");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.isGoogleSubmitting);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.isGoogleSubmitting ? "Redirecting..." : "Continue with Google", " ");
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("hidden", ctx.activeTab !== "signup");
            i0.ɵɵproperty("formGroup", ctx.signupForm);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("error", ctx.shouldShowSignupError("fullName"));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.getFieldError("fullName", "signup"));
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("error", ctx.shouldShowSignupError("email"));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.getFieldError("email", "signup"));
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("error", ctx.shouldShowSignupError("mobileNumber"));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.getFieldError("mobileNumber", "signup"));
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("error", ctx.shouldShowSignupError("password"));
            i0.ɵɵproperty("type", ctx.passwordVisibility.signupPassword ? "text" : "password");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.passwordVisibility.signupPassword ? 87 : 88);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.getFieldError("password", "signup"));
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("error", ctx.shouldShowSignupError("confirmPassword"));
            i0.ɵɵproperty("type", ctx.passwordVisibility.signupConfirm ? "text" : "password");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.passwordVisibility.signupConfirm ? 97 : 98);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.getFieldError("confirmPassword", "signup"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isSignupSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.isSignupSubmitting ? "Creating Account..." : "Create Account", " ");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.isGoogleSubmitting);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.isGoogleSubmitting ? "Redirecting..." : "Continue with Google", " ");
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName], styles: ["#auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  background: linear-gradient(135deg, #c8d0f7 0%, #eef0fb 50%, #fcd9d9 100%);\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  max-width: 860px;\n  background: var(--white);\n  border-radius: 24px;\n  overflow: hidden;\n  box-shadow: 0 20px 60px rgba(61, 76, 206, 0.18);\n  min-height: 480px;\n}\n\n.auth-left[_ngcontent-%COMP%] {\n  background: var(--blue);\n  color: white;\n  width: 260px;\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 28px;\n  gap: 10px;\n}\n\n.auth-icon-wrap[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  background: rgba(255, 255, 255, 0.18);\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n\n.auth-left[_ngcontent-%COMP%]   .brand-sub[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 11px;\n  letter-spacing: 3px;\n  opacity: 0.75;\n  text-transform: uppercase;\n}\n\n.auth-left[_ngcontent-%COMP%]   .brand-main[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 26px;\n  font-weight: 900;\n  line-height: 1.1;\n  text-align: center;\n}\n\n.auth-left[_ngcontent-%COMP%]   .brand-tagline[_ngcontent-%COMP%] {\n  font-size: 13px;\n  opacity: 0.7;\n  text-align: center;\n  margin-top: 4px;\n}\n\n.auth-features[_ngcontent-%COMP%] {\n  list-style: none;\n  margin-top: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.auth-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: 13px;\n  opacity: 0.85;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.auth-features[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: '';\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.7);\n  flex-shrink: 0;\n}\n\n.auth-right[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 40px 44px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.auth-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 28px;\n  border-bottom: 1.5px solid var(--border);\n}\n\n.auth-tab[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 13px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  padding: 10px 20px 12px;\n  cursor: pointer;\n  border-bottom: 2.5px solid transparent;\n  margin-bottom: -1.5px;\n  color: var(--text-muted);\n  transition: color 0.2s, border-color 0.2s;\n  user-select: none;\n}\n\n.auth-tab.active[_ngcontent-%COMP%] {\n  color: var(--red);\n  border-bottom-color: var(--red);\n}\n\n.auth-tab[_ngcontent-%COMP%]:hover:not(.active) {\n  color: var(--text);\n}\n\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n\n.field-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n}\n\n.input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 46px;\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n  padding: 0 44px 0 14px;\n  font-size: 14px;\n  color: var(--text);\n  background: #fafafa;\n  outline: none;\n  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;\n}\n\n.input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: var(--blue);\n  box-shadow: 0 0 0 3px rgba(61, 76, 206, 0.1);\n  background: var(--white);\n}\n\n.input-wrap[_ngcontent-%COMP%]   input.error[_ngcontent-%COMP%] {\n  border-color: var(--red);\n  box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.08);\n}\n\n.toggle-pw[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  display: flex;\n  align-items: center;\n  color: var(--text-muted);\n  padding: 2px;\n  transition: color 0.2s;\n}\n\n.toggle-pw[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n\n.field-error[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: var(--red);\n  min-height: 15px;\n  font-weight: 500;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  height: 48px;\n  border-radius: 12px;\n  border: none;\n  font-family: var(--font-display);\n  font-size: 15px;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  color: white;\n  background: var(--red);\n  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;\n  box-shadow: 0 4px 14px rgba(229, 57, 53, 0.3);\n  margin-top: 4px;\n}\n\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #c62828;\n  box-shadow: 0 6px 18px rgba(229, 57, 53, 0.38);\n}\n\n.btn-primary[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.75;\n}\n\n.oauth-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: var(--text-muted);\n  font-size: 12px;\n  margin-top: 2px;\n}\n\n.oauth-divider[_ngcontent-%COMP%]::before, \n.oauth-divider[_ngcontent-%COMP%]::after {\n  content: '';\n  flex: 1;\n  height: 1px;\n  background: var(--border);\n}\n\n.btn-google[_ngcontent-%COMP%] {\n  height: 46px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border);\n  background: var(--white);\n  color: var(--text);\n  font-family: var(--font-display);\n  font-size: 14px;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  transition: border-color 0.2s, box-shadow 0.2s, transform 0.1s;\n}\n\n.btn-google[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n\n.btn-google[_ngcontent-%COMP%]:hover {\n  border-color: #c4c9e8;\n  box-shadow: 0 4px 14px rgba(61, 76, 206, 0.12);\n}\n\n.btn-google[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n\n.btn-google[_ngcontent-%COMP%]:disabled {\n  opacity: 0.8;\n}\n\n.auth-switch[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n\n.auth-switch[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--red);\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.auth-switch[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n@media (max-width: 700px) {\n  .auth-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .auth-right[_ngcontent-%COMP%] {\n    padding: 32px 24px;\n  }\n\n  .auth-card[_ngcontent-%COMP%] {\n    max-width: 420px;\n  }\n}\n\n@media (max-width: 420px) {\n  .auth-right[_ngcontent-%COMP%] {\n    padding: 28px 18px;\n  }\n\n  .auth-tab[_ngcontent-%COMP%] {\n    font-size: 12px;\n    padding: 8px 14px 10px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthPageComponent, [{
        type: Component,
        args: [{ selector: 'app-auth-page', standalone: true, imports: [CommonModule, ReactiveFormsModule], template: "<div id=\"auth-page\">\n  <div class=\"auth-card\">\n    <div class=\"auth-left\">\n      <div class=\"auth-icon-wrap\">\n        <svg width=\"46\" height=\"46\" viewBox=\"0 0 46 46\" fill=\"none\">\n          <rect x=\"6\" y=\"20\" width=\"34\" height=\"6\" rx=\"3\" fill=\"white\" opacity=\"0.9\" />\n          <rect x=\"6\" y=\"20\" width=\"4\" height=\"14\" rx=\"2\" fill=\"white\" opacity=\"0.7\" />\n          <rect x=\"36\" y=\"12\" width=\"4\" height=\"22\" rx=\"2\" fill=\"white\" opacity=\"0.7\" />\n          <circle cx=\"23\" cy=\"14\" r=\"5\" fill=\"#fbbf24\" />\n        </svg>\n      </div>\n      <div class=\"brand-sub\">Quantity</div>\n      <div class=\"brand-main\">MEASUREMENT</div>\n      <div class=\"brand-tagline\">Measure, Convert &amp; Compare</div>\n      <ul class=\"auth-features\">\n        <li>Length &amp; Weight</li>\n        <li>Temperature</li>\n        <li>Volume</li>\n      </ul>\n    </div>\n\n    <div class=\"auth-right\">\n      <div class=\"auth-tabs\">\n        <div\n          class=\"auth-tab\"\n          [class.active]=\"activeTab === 'login'\"\n          data-tab=\"login\"\n          (click)=\"setTab('login')\"\n        >\n          Login\n        </div>\n        <div\n          class=\"auth-tab\"\n          [class.active]=\"activeTab === 'signup'\"\n          data-tab=\"signup\"\n          (click)=\"setTab('signup')\"\n        >\n          Signup\n        </div>\n      </div>\n\n      <form\n        id=\"login-form\"\n        class=\"auth-form\"\n        [class.hidden]=\"activeTab !== 'login'\"\n        [formGroup]=\"loginForm\"\n        (ngSubmit)=\"handleLogin()\"\n      >\n        <div class=\"field-group\">\n          <label class=\"field-label\" for=\"login-email\">Email Id</label>\n          <div class=\"input-wrap\">\n            <input\n              id=\"login-email\"\n              type=\"email\"\n              placeholder=\"Enter your email\"\n              autocomplete=\"email\"\n              formControlName=\"email\"\n              [class.error]=\"shouldShowLoginError('email')\"\n            />\n          </div>\n          <span class=\"field-error\">{{ getFieldError('email', 'login') }}</span>\n        </div>\n\n        <div class=\"field-group\">\n          <label class=\"field-label\" for=\"login-password\">Password</label>\n          <div class=\"input-wrap\">\n            <input\n              id=\"login-password\"\n              [type]=\"passwordVisibility.loginPassword ? 'text' : 'password'\"\n              placeholder=\"Enter your password\"\n              autocomplete=\"current-password\"\n              formControlName=\"password\"\n              [class.error]=\"shouldShowLoginError('password')\"\n            />\n            <button\n              class=\"toggle-pw\"\n              type=\"button\"\n              tabindex=\"-1\"\n              aria-label=\"Toggle password visibility\"\n              (click)=\"togglePassword('loginPassword')\"\n            >\n              @if (!passwordVisibility.loginPassword) {\n                <svg\n                  width=\"18\"\n                  height=\"18\"\n                  viewBox=\"0 0 24 24\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  stroke-width=\"2\"\n                >\n                  <path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\" />\n                  <circle cx=\"12\" cy=\"12\" r=\"3\" />\n                </svg>\n              } @else {\n                <svg\n                  width=\"18\"\n                  height=\"18\"\n                  viewBox=\"0 0 24 24\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  stroke-width=\"2\"\n                >\n                  <path d=\"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94\" />\n                  <path d=\"M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19\" />\n                  <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\" />\n                </svg>\n              }\n            </button>\n          </div>\n          <span class=\"field-error\">{{ getFieldError('password', 'login') }}</span>\n        </div>\n\n        <button class=\"btn-primary\" type=\"submit\" [disabled]=\"isLoginSubmitting\">\n          {{ isLoginSubmitting ? 'Logging in...' : 'Login' }}\n        </button>\n        <div class=\"oauth-divider\">\n          <span>or</span>\n        </div>\n        <button\n          class=\"btn-google\"\n          type=\"button\"\n          [disabled]=\"isGoogleSubmitting\"\n          (click)=\"handleGoogleLogin()\"\n        >\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\">\n            <path\n              fill=\"#EA4335\"\n              d=\"M12 10.2v3.9h5.5c-.3 1.3-1.8 3.9-5.5 3.9-3.3 0-6.1-2.8-6.1-6.2s2.8-6.2 6.1-6.2c1.9 0 3.1.8 3.9 1.5l2.7-2.6C17 2.9 14.8 2 12 2 6.9 2 2.8 6.2 2.8 11.4s4.1 9.4 9.2 9.4c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1.1-.2-1.6H12z\"\n            />\n          </svg>\n          {{ isGoogleSubmitting ? 'Redirecting...' : 'Continue with Google' }}\n        </button>\n        <p class=\"auth-switch\">\n          Don't have an account? <a (click)=\"setTab('signup')\">Sign Up</a>\n        </p>\n      </form>\n\n      <form\n        id=\"signup-form\"\n        class=\"auth-form\"\n        [class.hidden]=\"activeTab !== 'signup'\"\n        [formGroup]=\"signupForm\"\n        (ngSubmit)=\"handleSignup()\"\n      >\n        <div class=\"field-group\">\n          <label class=\"field-label\" for=\"signup-name\">Full Name</label>\n          <div class=\"input-wrap\">\n            <input\n              id=\"signup-name\"\n              type=\"text\"\n              placeholder=\"Enter your full name\"\n              autocomplete=\"name\"\n              formControlName=\"fullName\"\n              [class.error]=\"shouldShowSignupError('fullName')\"\n            />\n          </div>\n          <span class=\"field-error\">{{ getFieldError('fullName', 'signup') }}</span>\n        </div>\n\n        <div class=\"field-group\">\n          <label class=\"field-label\" for=\"signup-email\">Email Id</label>\n          <div class=\"input-wrap\">\n            <input\n              id=\"signup-email\"\n              type=\"email\"\n              placeholder=\"Enter your email\"\n              autocomplete=\"email\"\n              formControlName=\"email\"\n              [class.error]=\"shouldShowSignupError('email')\"\n            />\n          </div>\n          <span class=\"field-error\">{{ getFieldError('email', 'signup') }}</span>\n        </div>\n\n        <div class=\"field-group\">\n          <label class=\"field-label\" for=\"signup-mobile\">Mobile Number</label>\n          <div class=\"input-wrap\">\n            <input\n              id=\"signup-mobile\"\n              type=\"text\"\n              placeholder=\"Enter your mobile number\"\n              autocomplete=\"tel\"\n              formControlName=\"mobileNumber\"\n              [class.error]=\"shouldShowSignupError('mobileNumber')\"\n            />\n          </div>\n          <span class=\"field-error\">{{ getFieldError('mobileNumber', 'signup') }}</span>\n        </div>\n\n        <div class=\"field-group\">\n          <label class=\"field-label\" for=\"signup-password\">Password</label>\n          <div class=\"input-wrap\">\n            <input\n              id=\"signup-password\"\n              [type]=\"passwordVisibility.signupPassword ? 'text' : 'password'\"\n              placeholder=\"Min 8 characters\"\n              autocomplete=\"new-password\"\n              formControlName=\"password\"\n              [class.error]=\"shouldShowSignupError('password')\"\n            />\n            <button\n              class=\"toggle-pw\"\n              type=\"button\"\n              tabindex=\"-1\"\n              aria-label=\"Toggle password visibility\"\n              (click)=\"togglePassword('signupPassword')\"\n            >\n              @if (!passwordVisibility.signupPassword) {\n                <svg\n                  width=\"18\"\n                  height=\"18\"\n                  viewBox=\"0 0 24 24\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  stroke-width=\"2\"\n                >\n                  <path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\" />\n                  <circle cx=\"12\" cy=\"12\" r=\"3\" />\n                </svg>\n              } @else {\n                <svg\n                  width=\"18\"\n                  height=\"18\"\n                  viewBox=\"0 0 24 24\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  stroke-width=\"2\"\n                >\n                  <path d=\"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94\" />\n                  <path d=\"M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19\" />\n                  <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\" />\n                </svg>\n              }\n            </button>\n          </div>\n          <span class=\"field-error\">{{ getFieldError('password', 'signup') }}</span>\n        </div>\n\n        <div class=\"field-group\">\n          <label class=\"field-label\" for=\"signup-confirm\">Confirm Password</label>\n          <div class=\"input-wrap\">\n            <input\n              id=\"signup-confirm\"\n              [type]=\"passwordVisibility.signupConfirm ? 'text' : 'password'\"\n              placeholder=\"Repeat your password\"\n              autocomplete=\"new-password\"\n              formControlName=\"confirmPassword\"\n              [class.error]=\"shouldShowSignupError('confirmPassword')\"\n            />\n            <button\n              class=\"toggle-pw\"\n              type=\"button\"\n              tabindex=\"-1\"\n              aria-label=\"Toggle password visibility\"\n              (click)=\"togglePassword('signupConfirm')\"\n            >\n              @if (!passwordVisibility.signupConfirm) {\n                <svg\n                  width=\"18\"\n                  height=\"18\"\n                  viewBox=\"0 0 24 24\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  stroke-width=\"2\"\n                >\n                  <path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\" />\n                  <circle cx=\"12\" cy=\"12\" r=\"3\" />\n                </svg>\n              } @else {\n                <svg\n                  width=\"18\"\n                  height=\"18\"\n                  viewBox=\"0 0 24 24\"\n                  fill=\"none\"\n                  stroke=\"currentColor\"\n                  stroke-width=\"2\"\n                >\n                  <path d=\"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94\" />\n                  <path d=\"M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19\" />\n                  <line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\" />\n                </svg>\n              }\n            </button>\n          </div>\n          <span class=\"field-error\">{{ getFieldError('confirmPassword', 'signup') }}</span>\n        </div>\n\n        <button class=\"btn-primary\" type=\"submit\" [disabled]=\"isSignupSubmitting\">\n          {{ isSignupSubmitting ? 'Creating Account...' : 'Create Account' }}\n        </button>\n        <div class=\"oauth-divider\">\n          <span>or</span>\n        </div>\n        <button\n          class=\"btn-google\"\n          type=\"button\"\n          [disabled]=\"isGoogleSubmitting\"\n          (click)=\"handleGoogleLogin()\"\n        >\n          <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\">\n            <path\n              fill=\"#EA4335\"\n              d=\"M12 10.2v3.9h5.5c-.3 1.3-1.8 3.9-5.5 3.9-3.3 0-6.1-2.8-6.1-6.2s2.8-6.2 6.1-6.2c1.9 0 3.1.8 3.9 1.5l2.7-2.6C17 2.9 14.8 2 12 2 6.9 2 2.8 6.2 2.8 11.4s4.1 9.4 9.2 9.4c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1.1-.2-1.6H12z\"\n            />\n          </svg>\n          {{ isGoogleSubmitting ? 'Redirecting...' : 'Continue with Google' }}\n        </button>\n        <p class=\"auth-switch\">\n          Already have an account? <a (click)=\"setTab('login')\">Login</a>\n        </p>\n      </form>\n    </div>\n  </div>\n</div>\n", styles: ["#auth-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  background: linear-gradient(135deg, #c8d0f7 0%, #eef0fb 50%, #fcd9d9 100%);\n}\n\n.auth-card {\n  display: flex;\n  width: 100%;\n  max-width: 860px;\n  background: var(--white);\n  border-radius: 24px;\n  overflow: hidden;\n  box-shadow: 0 20px 60px rgba(61, 76, 206, 0.18);\n  min-height: 480px;\n}\n\n.auth-left {\n  background: var(--blue);\n  color: white;\n  width: 260px;\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 28px;\n  gap: 10px;\n}\n\n.auth-icon-wrap {\n  width: 80px;\n  height: 80px;\n  background: rgba(255, 255, 255, 0.18);\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n\n.auth-left .brand-sub {\n  font-family: var(--font-display);\n  font-size: 11px;\n  letter-spacing: 3px;\n  opacity: 0.75;\n  text-transform: uppercase;\n}\n\n.auth-left .brand-main {\n  font-family: var(--font-display);\n  font-size: 26px;\n  font-weight: 900;\n  line-height: 1.1;\n  text-align: center;\n}\n\n.auth-left .brand-tagline {\n  font-size: 13px;\n  opacity: 0.7;\n  text-align: center;\n  margin-top: 4px;\n}\n\n.auth-features {\n  list-style: none;\n  margin-top: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.auth-features li {\n  font-size: 13px;\n  opacity: 0.85;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.auth-features li::before {\n  content: '';\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.7);\n  flex-shrink: 0;\n}\n\n.auth-right {\n  flex: 1;\n  padding: 40px 44px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.auth-tabs {\n  display: flex;\n  margin-bottom: 28px;\n  border-bottom: 1.5px solid var(--border);\n}\n\n.auth-tab {\n  font-family: var(--font-display);\n  font-size: 13px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  padding: 10px 20px 12px;\n  cursor: pointer;\n  border-bottom: 2.5px solid transparent;\n  margin-bottom: -1.5px;\n  color: var(--text-muted);\n  transition: color 0.2s, border-color 0.2s;\n  user-select: none;\n}\n\n.auth-tab.active {\n  color: var(--red);\n  border-bottom-color: var(--red);\n}\n\n.auth-tab:hover:not(.active) {\n  color: var(--text);\n}\n\n.auth-form {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n\n.field-group {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n\n.field-label {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n}\n\n.input-wrap {\n  position: relative;\n}\n\n.input-wrap input {\n  width: 100%;\n  height: 46px;\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n  padding: 0 44px 0 14px;\n  font-size: 14px;\n  color: var(--text);\n  background: #fafafa;\n  outline: none;\n  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;\n}\n\n.input-wrap input:focus {\n  border-color: var(--blue);\n  box-shadow: 0 0 0 3px rgba(61, 76, 206, 0.1);\n  background: var(--white);\n}\n\n.input-wrap input.error {\n  border-color: var(--red);\n  box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.08);\n}\n\n.toggle-pw {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  display: flex;\n  align-items: center;\n  color: var(--text-muted);\n  padding: 2px;\n  transition: color 0.2s;\n}\n\n.toggle-pw:hover {\n  color: var(--text);\n}\n\n.field-error {\n  font-size: 11.5px;\n  color: var(--red);\n  min-height: 15px;\n  font-weight: 500;\n}\n\n.btn-primary {\n  height: 48px;\n  border-radius: 12px;\n  border: none;\n  font-family: var(--font-display);\n  font-size: 15px;\n  font-weight: 800;\n  letter-spacing: 0.5px;\n  color: white;\n  background: var(--red);\n  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;\n  box-shadow: 0 4px 14px rgba(229, 57, 53, 0.3);\n  margin-top: 4px;\n}\n\n.btn-primary:hover {\n  background: #c62828;\n  box-shadow: 0 6px 18px rgba(229, 57, 53, 0.38);\n}\n\n.btn-primary:active {\n  transform: scale(0.98);\n}\n\n.btn-primary:disabled {\n  opacity: 0.75;\n}\n\n.oauth-divider {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: var(--text-muted);\n  font-size: 12px;\n  margin-top: 2px;\n}\n\n.oauth-divider::before,\n.oauth-divider::after {\n  content: '';\n  flex: 1;\n  height: 1px;\n  background: var(--border);\n}\n\n.btn-google {\n  height: 46px;\n  border-radius: 12px;\n  border: 1.5px solid var(--border);\n  background: var(--white);\n  color: var(--text);\n  font-family: var(--font-display);\n  font-size: 14px;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  transition: border-color 0.2s, box-shadow 0.2s, transform 0.1s;\n}\n\n.btn-google svg {\n  width: 18px;\n  height: 18px;\n}\n\n.btn-google:hover {\n  border-color: #c4c9e8;\n  box-shadow: 0 4px 14px rgba(61, 76, 206, 0.12);\n}\n\n.btn-google:active {\n  transform: scale(0.98);\n}\n\n.btn-google:disabled {\n  opacity: 0.8;\n}\n\n.auth-switch {\n  text-align: center;\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-top: 4px;\n}\n\n.auth-switch a {\n  color: var(--red);\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.auth-switch a:hover {\n  text-decoration: underline;\n}\n\n@media (max-width: 700px) {\n  .auth-left {\n    display: none;\n  }\n\n  .auth-right {\n    padding: 32px 24px;\n  }\n\n  .auth-card {\n    max-width: 420px;\n  }\n}\n\n@media (max-width: 420px) {\n  .auth-right {\n    padding: 28px 18px;\n  }\n\n  .auth-tab {\n    font-size: 12px;\n    padding: 8px 14px 10px;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AuthPageComponent, { className: "AuthPageComponent", filePath: "src/app/pages/auth/auth-page.component.ts", lineNumber: 25 }); })();
