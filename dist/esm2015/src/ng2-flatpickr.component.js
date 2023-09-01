import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
if (typeof window !== 'undefined') {
    require('flatpickr');
}
export class Ng2FlatpickrComponent {
    constructor() {
        this._tabindex = 0;
        this.onTouchedFn = () => { };
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: (selectedDates) => { this.writeValue(selectedDates); }
        };
        this.placeholder = "";
        this.addClass = "";
        this.hideButton = false;
        this.propagateChange = (_) => { };
    }
    get tabindex() { return this._tabindex; }
    set tabindex(ti) { this._tabindex = Number(ti); }
    ///////////////////////////////////
    writeValue(value) {
        this.propagateChange(value);
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedFn = fn;
    }
    ///////////////////////////////////
    setDateFromInput(date) {
        this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
    }
    setAltInputPlaceholder(placeholder) {
        this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
    }
    ngAfterViewInit() {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        if (this.flatpickrElement.nativeElement.flatpickr) {
            this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        }
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    }
    ngOnChanges(changes) {
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
    }
    onFocus(event) {
        this.onTouchedFn();
    }
}
Ng2FlatpickrComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: Ng2FlatpickrComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
Ng2FlatpickrComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: Ng2FlatpickrComponent, selector: "ng2-flatpickr", inputs: { config: "config", placeholder: "placeholder", addClass: "addClass", setDate: "setDate", tabindex: "tabindex", hideButton: "hideButton" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Ng2FlatpickrComponent),
            multi: true
        }
    ], viewQueries: [{ propertyName: "flatpickrElement", first: true, predicate: ["flatpickr"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `
		<div class="ng2-flatpickr-input-container" #flatpickr>
			<input *ngIf="!hideButton" class="ng2-flatpickr-input {{ addClass }}" [placeholder]="placeholder" [tabindex]="tabindex" type="text" (focus)="onFocus($event)" data-input>
			<ng-content></ng-content>
		</div>
		`, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: Ng2FlatpickrComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ng2-flatpickr',
                    template: `
		<div class="ng2-flatpickr-input-container" #flatpickr>
			<input *ngIf="!hideButton" class="ng2-flatpickr-input {{ addClass }}" [placeholder]="placeholder" [tabindex]="tabindex" type="text" (focus)="onFocus($event)" data-input>
			<ng-content></ng-content>
		</div>
		`,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => Ng2FlatpickrComponent),
                            multi: true
                        }
                    ]
                }]
        }], propDecorators: { flatpickrElement: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbmcyLWZsYXRwaWNrci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQWlCLFVBQVUsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBS3pFLElBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFDO0lBQzdCLE9BQU8sQ0FBRSxXQUFXLENBQUUsQ0FBQztDQUMxQjtBQWtCRCxNQUFNLE9BQU8scUJBQXFCO0lBaEJsQztRQW1CVyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLGdCQUFXLEdBQWEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTFCLDRCQUF1QixHQUFxQjtZQUNuRCxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFFBQVEsRUFBRSxDQUFFLGFBQWtCLEVBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUUsYUFBYSxDQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3pFLENBQUM7UUFXRixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUd6QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBVXRCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFnQm5CLG9CQUFlLEdBQUcsQ0FBRSxDQUFNLEVBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztLQTRDbkM7SUFqRUEsSUFDSSxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN6QyxJQUFJLFFBQVEsQ0FBRSxFQUFVLElBQUssSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDO0lBSzdELG1DQUFtQztJQUVuQyxVQUFVLENBQUUs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SUQsTUFBTTtzQkFETCxLQUFLO2dCQUlOLFdBQVc7c0JBRFYsS0FBSztnQkFJTixRQUFRO3NCQUROLEtBQUs7Z0JBSVAsT0FBTztzQkFETixLQUFLO2dCQUlGLFFBQVE7c0JBRFgsS0FBSztnQkFLTixVQUFVO3NCQURULEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuZGVjbGFyZSB2YXIgcmVxdWlyZTogYW55O1xuXG5pZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XG4gICAgcmVxdWlyZSggJ2ZsYXRwaWNrcicgKTtcbn1cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmcyLWZsYXRwaWNrcicsXG5cdHRlbXBsYXRlOiBgXG5cdFx0PGRpdiBjbGFzcz1cIm5nMi1mbGF0cGlja3ItaW5wdXQtY29udGFpbmVyXCIgI2ZsYXRwaWNrcj5cblx0XHRcdDxpbnB1dCAqbmdJZj1cIiFoaWRlQnV0dG9uXCIgY2xhc3M9XCJuZzItZmxhdHBpY2tyLWlucHV0IHt7IGFkZENsYXNzIH19XCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW3RhYmluZGV4XT1cInRhYmluZGV4XCIgdHlwZT1cInRleHRcIiAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCIgZGF0YS1pbnB1dD5cblx0XHRcdDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblx0XHQ8L2Rpdj5cblx0XHRgLFxuXHRwcm92aWRlcnM6IFtcblx0XHR7XG5cdFx0XHRwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcblx0XHRcdHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCAoKSA9PiBOZzJGbGF0cGlja3JDb21wb25lbnQgKSxcblx0XHRcdG11bHRpOiB0cnVlXG5cdFx0fVxuXHRdXG59KVxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xuXG4gIFx0cHVibGljIGZsYXRwaWNrcjogT2JqZWN0O1xuICBcdHByaXZhdGUgX3RhYmluZGV4ID0gMDtcblx0b25Ub3VjaGVkRm46IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xuXG5cdHByaXZhdGUgZGVmYXVsdEZsYXRwaWNrck9wdGlvbnM6IEZsYXRwaWNrck9wdGlvbnMgPSB7XG5cdFx0d3JhcDogdHJ1ZSxcblx0XHRjbGlja09wZW5zOiB0cnVlLFxuXHRcdG9uQ2hhbmdlOiAoIHNlbGVjdGVkRGF0ZXM6IGFueSApID0+IHsgdGhpcy53cml0ZVZhbHVlKCBzZWxlY3RlZERhdGVzICk7IH1cblx0fTtcblxuXHRAVmlld0NoaWxkKCdmbGF0cGlja3InLCB7XG5cdFx0c3RhdGljOiB0cnVlXG5cdH0pXG5cdGZsYXRwaWNrckVsZW1lbnQ6IGFueTtcblxuXHRASW5wdXQoKVxuXHRjb25maWc6IEZsYXRwaWNrck9wdGlvbnM7XG5cblx0QElucHV0KClcblx0cGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCI7XG5cbiBcdEBJbnB1dCgpXG5cdGFkZENsYXNzOiBzdHJpbmcgPSBcIlwiO1xuXG5cdEBJbnB1dCgpXG5cdHNldERhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0QElucHV0KClcblx0Z2V0IHRhYmluZGV4KCkgeyByZXR1cm4gdGhpcy5fdGFiaW5kZXg7IH1cblx0c2V0IHRhYmluZGV4KCB0aTogbnVtYmVyICkgeyB0aGlzLl90YWJpbmRleCA9IE51bWJlciggdGkgKTsgfVxuXG5cdEBJbnB1dCgpXG5cdGhpZGVCdXR0b24gPSBmYWxzZTtcblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdHdyaXRlVmFsdWUoIHZhbHVlOmFueSApIHtcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSggdmFsdWUgKTtcblx0fVxuXG5cdHJlZ2lzdGVyT25DaGFuZ2UoIGZuOiBhbnkgKSB7XG5cdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcblx0fVxuXG5cdHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLm9uVG91Y2hlZEZuID0gZm47XG5cdH1cblxuXHRwcm9wYWdhdGVDaGFuZ2UgPSAoIF86IGFueSApID0+IHt9O1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0c2V0RGF0ZUZyb21JbnB1dCggZGF0ZTogYW55ICkge1xuXHRcdHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3Iuc2V0RGF0ZSggZGF0ZSwgdHJ1ZSApO1xuXHR9XG5cblx0c2V0QWx0SW5wdXRQbGFjZWhvbGRlciggcGxhY2Vob2xkZXI6IHN0cmluZyApIHtcblx0XHR0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSggJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIgKTtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHRpZiggdGhpcy5jb25maWcgKSB7XG5cdFx0XHRPYmplY3QuYXNzaWduKCB0aGlzLmRlZmF1bHRGbGF0cGlja3JPcHRpb25zLCB0aGlzLmNvbmZpZyApO1xuXHRcdH1cblx0XHRpZiggdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3IgPSB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5mbGF0cGlja3IoIHRoaXMuZGVmYXVsdEZsYXRwaWNrck9wdGlvbnMgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuc2V0RGF0ZSApIHtcblx0XHRcdHRoaXMuc2V0RGF0ZUZyb21JbnB1dCggdGhpcy5zZXREYXRlICk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkNoYW5nZXMoIGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgKSB7XG5cdFx0aWYoIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50IFxuXHRcdFx0JiYgdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuX2ZsYXRwaWNrciApIHtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKCBjaGFuZ2VzLmhhc093blByb3BlcnR5KCAnc2V0RGF0ZScgKSBcblx0XHRcdFx0XHQmJiBjaGFuZ2VzWyAnc2V0RGF0ZScgXS5jdXJyZW50VmFsdWUgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldERhdGVGcm9tSW5wdXQoIGNoYW5nZXNbICdzZXREYXRlJyBdLmN1cnJlbnRWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRpZiggdGhpcy5jb25maWcuYWx0SW5wdXRcblx0XHRcdFx0XHQmJiBjaGFuZ2VzLmhhc093blByb3BlcnR5KCAncGxhY2Vob2xkZXInICkgXG5cdFx0XHRcdFx0JiYgY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApIHtcblx0XHRcdFx0XHRcdHRoaXMuc2V0QWx0SW5wdXRQbGFjZWhvbGRlciggY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdH1cblx0fVxuXHRcblx0b25Gb2N1cyhldmVudDogYW55KSB7XG5cdFx0dGhpcy5vblRvdWNoZWRGbigpO1xuXHR9XG59XG4iXX0=