import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
var _c0 = ["flatpickr"];
function Ng2FlatpickrComponent_input_2_Template(rf, ctx) { if (rf & 1) {
    var _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 3);
    i0.ɵɵlistener("focus", function Ng2FlatpickrComponent_input_2_Template_input_focus_0_listener($event) { i0.ɵɵrestoreView(_r3); var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.onFocus($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate1("ng2-flatpickr-input ", ctx_r1.addClass, "");
    i0.ɵɵproperty("placeholder", ctx_r1.placeholder)("tabindex", ctx_r1.tabindex);
} }
var _c1 = ["*"];
if (typeof window !== 'undefined') {
    require('flatpickr');
}
var Ng2FlatpickrComponent = /** @class */ (function () {
    function Ng2FlatpickrComponent() {
        var _this = this;
        this._tabindex = 0;
        this.onTouchedFn = function () { };
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: function (selectedDates) { _this.writeValue(selectedDates); }
        };
        this.placeholder = "";
        this.addClass = "";
        this.hideButton = false;
        this.propagateChange = function (_) { };
    }
    Object.defineProperty(Ng2FlatpickrComponent.prototype, "tabindex", {
        get: function () { return this._tabindex; },
        set: function (ti) { this._tabindex = Number(ti); },
        enumerable: true,
        configurable: true
    });
    ///////////////////////////////////
    Ng2FlatpickrComponent.prototype.writeValue = function (value) {
        this.propagateChange(value);
    };
    Ng2FlatpickrComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    Ng2FlatpickrComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedFn = fn;
    };
    ///////////////////////////////////
    Ng2FlatpickrComponent.prototype.setDateFromInput = function (date) {
        this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
    };
    Ng2FlatpickrComponent.prototype.setAltInputPlaceholder = function (placeholder) {
        this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
    };
    Ng2FlatpickrComponent.prototype.ngAfterViewInit = function () {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        if (this.flatpickrElement.nativeElement.flatpickr) {
            this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        }
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    };
    Ng2FlatpickrComponent.prototype.ngOnChanges = function (changes) {
        if (this.flatpickrElement.nativeElement
            && this.flatpickrElement.nativeElement._flatpickr) {
            if (changes.hasOwnProperty('setDate')
                && changes['setDate'].currentValue) {
                this.setDateFromInput(changes['setDate'].currentValue);
            }
            if (this.config.altInput
                && changes.hasOwnProperty('placeholder')
                && changes['placeholder'].currentValue) {
                this.setAltInputPlaceholder(changes['placeholder'].currentValue);
            }
        }
    };
    Ng2FlatpickrComponent.prototype.onFocus = function (event) {
        this.onTouchedFn();
    };
    Ng2FlatpickrComponent.ɵfac = function Ng2FlatpickrComponent_Factory(t) { return new (t || Ng2FlatpickrComponent)(); };
    Ng2FlatpickrComponent.ɵcmp = i0.ɵɵdefineComponent({ type: Ng2FlatpickrComponent, selectors: [["ng2-flatpickr"]], viewQuery: function Ng2FlatpickrComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵstaticViewQuery(_c0, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.flatpickrElement = _t.first);
        } }, inputs: { config: "config", placeholder: "placeholder", addClass: "addClass", setDate: "setDate", tabindex: "tabindex", hideButton: "hideButton" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return Ng2FlatpickrComponent; }),
                    multi: true
                }
            ]), i0.ɵɵNgOnChangesFeature], ngContentSelectors: _c1, decls: 4, vars: 1, consts: [[1, "ng2-flatpickr-input-container"], ["flatpickr", ""], ["type", "text", "data-input", "", 3, "class", "placeholder", "tabindex", "focus", 4, "ngIf"], ["type", "text", "data-input", "", 3, "placeholder", "tabindex", "focus"]], template: function Ng2FlatpickrComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 0, 1);
            i0.ɵɵtemplate(2, Ng2FlatpickrComponent_input_2_Template, 1, 5, "input", 2);
            i0.ɵɵprojection(3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.hideButton);
        } }, directives: [i1.NgIf], encapsulation: 2 });
    return Ng2FlatpickrComponent;
}());
export { Ng2FlatpickrComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Ng2FlatpickrComponent, [{
        type: Component,
        args: [{
                selector: 'ng2-flatpickr',
                template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input *ngIf=\"!hideButton\" class=\"ng2-flatpickr-input {{ addClass }}\" [placeholder]=\"placeholder\" [tabindex]=\"tabindex\" type=\"text\" (focus)=\"onFocus($event)\" data-input>\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return Ng2FlatpickrComponent; }),
                        multi: true
                    }
                ]
            }]
    }], null, { flatpickrElement: [{
            type: ViewChild,
            args: ['flatpickr', {
                    static: true
                }]
        }], config: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], addClass: [{
            type: Input
        }], setDate: [{
            type: Input
        }], tabindex: [{
            type: Input
        }], hideButton: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFpQixVQUFVLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztJQWF0RSxnQ0FDQTtJQURvSSxpTUFBeUI7SUFBN0osaUJBQ0E7OztJQUQyQixzRUFBMEM7SUFBQyxnREFBMkIsNkJBQUE7OztBQVJwRyxJQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBQztJQUM3QixPQUFPLENBQUUsV0FBVyxDQUFFLENBQUM7Q0FDMUI7QUFFRDtJQUFBO1FBQUEsaUJBOEdDO1FBM0ZVLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDeEIsZ0JBQVcsR0FBYSxjQUFRLENBQUMsQ0FBQztRQUUxQiw0QkFBdUIsR0FBcUI7WUFDbkQsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsSUFBSTtZQUNoQixRQUFRLEVBQUUsVUFBRSxhQUFrQixJQUFRLEtBQUksQ0FBQyxVQUFVLENBQUUsYUFBYSxDQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pFLENBQUM7UUFXRixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUd6QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBVXRCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFnQm5CLG9CQUFlLEdBQUcsVUFBRSxDQUFNLElBQU8sQ0FBQyxDQUFDO0tBNENuQztJQWpFQSxzQkFDSSwyQ0FBUTthQURaLGNBQ2lCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDekMsVUFBYyxFQUFVLElBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUUsRUFBRSxDQUFF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QUtSO2dCQUNGLFNBQVMsRUFBRTtvQkFDVjt3QkFDQyxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFFLGNBQU0sT0FBQSxxQkFBcUIsRUFBckIsQ0FBcUIsQ0FBRTt3QkFDdEQsS0FBSyxFQUFFLElBQUk7cUJBQ1g7aUJBQ0Q7YUFDRDs7a0JBYUMsU0FBUzttQkFBQyxXQUFXLEVBQUU7b0JBQ3ZCLE1BQU0sRUFBRSxJQUFJO2lCQUNaOztrQkFHQSxLQUFLOztrQkFHTCxLQUFLOztrQkFHSixLQUFLOztrQkFHTixLQUFLOztrQkFHTCxLQUFLOztrQkFJTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZsYXRwaWNrck9wdGlvbnMgfSBmcm9tICcuL2ZsYXRwaWNrci1vcHRpb25zLmludGVyZmFjZSc7XG5cbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcblxuaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgIHJlcXVpcmUoICdmbGF0cGlja3InICk7XG59XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25nMi1mbGF0cGlja3InLFxuXHR0ZW1wbGF0ZTogYFxuXHRcdDxkaXYgY2xhc3M9XCJuZzItZmxhdHBpY2tyLWlucHV0LWNvbnRhaW5lclwiICNmbGF0cGlja3I+XG5cdFx0XHQ8aW5wdXQgKm5nSWY9XCIhaGlkZUJ1dHRvblwiIGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dCB7eyBhZGRDbGFzcyB9fVwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiIHR5cGU9XCJ0ZXh0XCIgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiIGRhdGEtaW5wdXQ+XG5cdFx0XHQ8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cdFx0PC9kaXY+XG5cdFx0YCxcblx0cHJvdmlkZXJzOiBbXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG5cdFx0XHR1c2VFeGlzdGluZzogZm9yd2FyZFJlZiggKCkgPT4gTmcyRmxhdHBpY2tyQ29tcG9uZW50ICksXG5cdFx0XHRtdWx0aTogdHJ1ZVxuXHRcdH1cblx0XVxufSlcbmV4cG9ydCBjbGFzcyBOZzJGbGF0cGlja3JDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcblxuICBcdHB1YmxpYyBmbGF0cGlja3I6IE9iamVjdDtcbiAgXHRwcml2YXRlIF90YWJpbmRleCA9IDA7XG5cdG9uVG91Y2hlZEZuOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuXHRwcml2YXRlIGRlZmF1bHRGbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zID0ge1xuXHRcdHdyYXA6IHRydWUsXG5cdFx0Y2xpY2tPcGVuczogdHJ1ZSxcblx0XHRvbkNoYW5nZTogKCBzZWxlY3RlZERhdGVzOiBhbnkgKSA9PiB7IHRoaXMud3JpdGVWYWx1ZSggc2VsZWN0ZWREYXRlcyApOyB9XG5cdH07XG5cblx0QFZpZXdDaGlsZCgnZmxhdHBpY2tyJywge1xuXHRcdHN0YXRpYzogdHJ1ZVxuXHR9KVxuXHRmbGF0cGlja3JFbGVtZW50OiBhbnk7XG5cblx0QElucHV0KClcblx0Y29uZmlnOiBGbGF0cGlja3JPcHRpb25zO1xuXG5cdEBJbnB1dCgpXG5cdHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xuXG4gXHRASW5wdXQoKVxuXHRhZGRDbGFzczogc3RyaW5nID0gXCJcIjtcblxuXHRASW5wdXQoKVxuXHRzZXREYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdEBJbnB1dCgpXG5cdGdldCB0YWJpbmRleCgpIHsgcmV0dXJuIHRoaXMuX3RhYmluZGV4OyB9XG5cdHNldCB0YWJpbmRleCggdGk6IG51bWJlciApIHsgdGhpcy5fdGFiaW5kZXggPSBOdW1iZXIoIHRpICk7IH1cblxuXHRASW5wdXQoKVxuXHRoaWRlQnV0dG9uID0gZmFsc2U7XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHR3cml0ZVZhbHVlKCB2YWx1ZTphbnkgKSB7XG5cdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UoIHZhbHVlICk7XG5cdH1cblxuXHRyZWdpc3Rlck9uQ2hhbmdlKCBmbjogYW55ICkge1xuXHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG5cdH1cblxuXHRyZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG5cdFx0dGhpcy5vblRvdWNoZWRGbiA9IGZuO1xuXHR9XG5cblx0cHJvcGFnYXRlQ2hhbmdlID0gKCBfOiBhbnkgKSA9PiB7fTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdHNldERhdGVGcm9tSW5wdXQoIGRhdGU6IGFueSApIHtcblx0XHR0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLnNldERhdGUoIGRhdGUsIHRydWUgKTtcblx0fVxuXG5cdHNldEFsdElucHV0UGxhY2Vob2xkZXIoIHBsYWNlaG9sZGVyOiBzdHJpbmcgKSB7XG5cdFx0dGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuX2ZsYXRwaWNrci5hbHRJbnB1dC5zZXRBdHRyaWJ1dGUoICdwbGFjZWhvbGRlcicsIHBsYWNlaG9sZGVyICk7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0aWYoIHRoaXMuY29uZmlnICkge1xuXHRcdFx0T2JqZWN0LmFzc2lnbiggdGhpcy5kZWZhdWx0RmxhdHBpY2tyT3B0aW9ucywgdGhpcy5jb25maWcgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50LmZsYXRwaWNrciApIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyID0gdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKCB0aGlzLmRlZmF1bHRGbGF0cGlja3JPcHRpb25zICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLnNldERhdGUgKSB7XG5cdFx0XHR0aGlzLnNldERhdGVGcm9tSW5wdXQoIHRoaXMuc2V0RGF0ZSApO1xuXHRcdH1cblx0fVxuXG5cdG5nT25DaGFuZ2VzKCBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICkge1xuXHRcdGlmKCB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudCBcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3IgKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiggY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3NldERhdGUnICkgXG5cdFx0XHRcdFx0JiYgY2hhbmdlc1sgJ3NldERhdGUnIF0uY3VycmVudFZhbHVlICkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZXREYXRlRnJvbUlucHV0KCBjaGFuZ2VzWyAnc2V0RGF0ZScgXS5jdXJyZW50VmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoIHRoaXMuY29uZmlnLmFsdElucHV0XG5cdFx0XHRcdFx0JiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3BsYWNlaG9sZGVyJyApIFxuXHRcdFx0XHRcdCYmIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldEFsdElucHV0UGxhY2Vob2xkZXIoIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHR9XG5cdH1cblx0XG5cdG9uRm9jdXMoZXZlbnQ6IGFueSkge1xuXHRcdHRoaXMub25Ub3VjaGVkRm4oKTtcblx0fVxufVxuIl19