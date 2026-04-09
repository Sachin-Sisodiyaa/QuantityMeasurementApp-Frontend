import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function ToastContainerComponent_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵlistener("click", function ToastContainerComponent_For_2_Template_div_click_0_listener() { const toast_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.remove(toast_r2.id)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    i0.ɵɵclassProp("error", toast_r2.isError);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", toast_r2.message, " ");
} }
export class ToastContainerComponent {
    toastService = inject(ToastService);
    toasts = computed(() => this.toastService.toasts());
    remove(id) {
        this.toastService.remove(id);
    }
    static ɵfac = function ToastContainerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastContainerComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastContainerComponent, selectors: [["app-toast-container"]], decls: 3, vars: 0, consts: [[1, "toast-container"], [1, "toast", 3, "error"], [1, "toast", 3, "click"]], template: function ToastContainerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵrepeaterCreate(1, ToastContainerComponent_For_2_Template, 2, 3, "div", 1, _forTrack0);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.toasts());
        } }, dependencies: [CommonModule], styles: [".toast-container[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 70px;\n  right: 20px;\n  z-index: 9999;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.toast[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-left: 4px solid var(--success);\n  border-radius: 10px;\n  padding: 12px 18px;\n  font-size: 13px;\n  font-weight: 600;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);\n  max-width: 320px;\n  color: var(--text);\n  animation: _ngcontent-%COMP%_toast-slide-in 0.25s ease;\n  cursor: pointer;\n}\n\n.toast.error[_ngcontent-%COMP%] {\n  border-color: var(--red);\n}\n\n@keyframes _ngcontent-%COMP%_toast-slide-in {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastContainerComponent, [{
        type: Component,
        args: [{ selector: 'app-toast-container', standalone: true, imports: [CommonModule], template: "<div class=\"toast-container\">\n  @for (toast of toasts(); track toast.id) {\n    <div class=\"toast\" [class.error]=\"toast.isError\" (click)=\"remove(toast.id)\">\n      {{ toast.message }}\n    </div>\n  }\n</div>\n", styles: [".toast-container {\n  position: fixed;\n  top: 70px;\n  right: 20px;\n  z-index: 9999;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.toast {\n  background: var(--white);\n  border-left: 4px solid var(--success);\n  border-radius: 10px;\n  padding: 12px 18px;\n  font-size: 13px;\n  font-weight: 600;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);\n  max-width: 320px;\n  color: var(--text);\n  animation: toast-slide-in 0.25s ease;\n  cursor: pointer;\n}\n\n.toast.error {\n  border-color: var(--red);\n}\n\n@keyframes toast-slide-in {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToastContainerComponent, { className: "ToastContainerComponent", filePath: "src/app/shared/toast-container/toast-container.component.ts", lineNumber: 13 }); })();
