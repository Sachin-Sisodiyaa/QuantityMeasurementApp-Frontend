import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import * as i0 from "@angular/core";
function OauthSuccessPageComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2)(1, "button", 3);
    i0.ɵɵtext(2, " Back to Login ");
    i0.ɵɵelementEnd()();
} }
export class OauthSuccessPageComponent {
    route = inject(ActivatedRoute);
    authService = inject(AuthService);
    router = inject(Router);
    message = 'Completing Google sign-in...';
    hasError = false;
    constructor() {
        this.route.queryParamMap
            .pipe(switchMap((params) => {
            const token = params.get('token');
            const email = params.get('email');
            if (!token || !email) {
                throw new Error('Missing OAuth token or email in redirect URL.');
            }
            return this.authService.completeOAuth(token, email);
        }))
            .subscribe({
            next: () => {
                this.message = 'Connected. Redirecting to dashboard...';
                setTimeout(() => {
                    void this.router.navigateByUrl('/dashboard');
                }, 500);
            },
            error: (error) => {
                this.hasError = true;
                if (error instanceof HttpErrorResponse) {
                    const apiError = error.error;
                    this.message = apiError?.message ?? 'OAuth callback failed.';
                }
                else {
                    this.message = error.message;
                }
            }
        });
    }
    static ɵfac = function OauthSuccessPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OauthSuccessPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OauthSuccessPageComponent, selectors: [["app-oauth-success-page"]], decls: 7, vars: 4, consts: [[1, "oauth-page"], [1, "callback-card"], [1, "actions"], ["type", "button", "routerLink", "/login", 1, "btn-primary"]], template: function OauthSuccessPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "section", 1)(2, "h1");
            i0.ɵɵtext(3, "OAuth Callback");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p");
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, OauthSuccessPageComponent_Conditional_6_Template, 3, 0, "div", 2);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("error-text", ctx.hasError);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.message);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.hasError ? 6 : -1);
        } }, dependencies: [CommonModule, RouterLink], styles: [".oauth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n}\n\n.callback-card[_ngcontent-%COMP%] {\n  width: min(560px, 100%);\n  background: var(--white);\n  border-radius: 16px;\n  box-shadow: var(--shadow);\n  padding: 24px;\n}\n\nh1[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  margin: 0 0 10px;\n}\n\np[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text-muted);\n}\n\n.error-text[_ngcontent-%COMP%] {\n  color: var(--red);\n}\n\n.actions[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  height: 44px;\n  border-radius: 10px;\n  border: none;\n  font-family: var(--font-display);\n  font-size: 14px;\n  font-weight: 800;\n  color: white;\n  background: var(--red);\n  padding: 0 16px;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OauthSuccessPageComponent, [{
        type: Component,
        args: [{ selector: 'app-oauth-success-page', standalone: true, imports: [CommonModule, RouterLink], template: "<main class=\"oauth-page\">\n  <section class=\"callback-card\">\n    <h1>OAuth Callback</h1>\n    <p [class.error-text]=\"hasError\">{{ message }}</p>\n    @if (hasError) {\n      <div class=\"actions\">\n        <button class=\"btn-primary\" type=\"button\" routerLink=\"/login\">\n          Back to Login\n        </button>\n      </div>\n    }\n  </section>\n</main>\n", styles: [".oauth-page {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n}\n\n.callback-card {\n  width: min(560px, 100%);\n  background: var(--white);\n  border-radius: 16px;\n  box-shadow: var(--shadow);\n  padding: 24px;\n}\n\nh1 {\n  font-family: var(--font-display);\n  margin: 0 0 10px;\n}\n\np {\n  margin: 0;\n  color: var(--text-muted);\n}\n\n.error-text {\n  color: var(--red);\n}\n\n.actions {\n  margin-top: 16px;\n}\n\n.btn-primary {\n  height: 44px;\n  border-radius: 10px;\n  border: none;\n  font-family: var(--font-display);\n  font-size: 14px;\n  font-weight: 800;\n  color: white;\n  background: var(--red);\n  padding: 0 16px;\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OauthSuccessPageComponent, { className: "OauthSuccessPageComponent", filePath: "src/app/pages/oauth-success/oauth-success-page.component.ts", lineNumber: 17 }); })();
