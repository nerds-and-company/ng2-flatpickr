import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class Ng2FlatpickrDirective {
    constructor(parent, ngControl, element, renderer) {
        this.parent = parent;
        this.ngControl = ngControl;
        this.element = element;
        this.renderer = renderer;
        /**
         * onChange gets triggered when the user selects a date, or changes the time on a selected date.
         *
         * Default:  null
         */
        this.flatpickrOnChange = new EventEmitter();
        /**
         * onClose gets triggered when the calendar is closed.
         *
         * Default:  null
         */
        this.flatpickrOnClose = new EventEmitter();
        /**
         * onOpen gets triggered when the calendar is opened.
         *
         * Default:  null
         */
        this.flatpickrOnOpen = new EventEmitter();
        /**
         * onReady gets triggered once the calendar is in a ready state.
         *
         * Default:  null
         */
        this.flatpickrOnReady = new EventEmitter();
    }
    /** Allow double-clicking on the control to open/close it. */
    onClick() {
        this.flatpickr.toggle();
    }
    get control() {
        return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
    }
    ngAfterViewInit() {
        /** We cannot initialize the flatpickr instance in ngOnInit(); it will
            randomize the date when the form control initializes. */
        let nativeElement = this.element.nativeElement;
        if (typeof nativeElement === 'undefined' || nativeElement === null) {
            throw 'Error: invalid input element specified';
        }
        if (this.flatpickrOptions.wrap) {
            this.renderer.setAttribute(this.element.nativeElement, 'data-input', '');
            nativeElement = nativeElement.parentNode;
        }
        this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
    }
    ngOnChanges(changes) {
        if (this.flatpickr
            && this.flatpickrAltInput
            && changes.hasOwnProperty('placeholder')
            && changes['placeholder'].currentValue) {
            this.flatpickr.altInput.setAttribute('placeholder', changes['placeholder'].currentValue);
        }
    }
    ngOnDestroy() {
        if (this.flatpickr) {
            this.flatpickr.destroy();
        }
        if (this.formControlListener) {
            this.formControlListener.unsubscribe();
            this.formControlListener = undefined;
        }
        this.flatpickrOnChange = undefined;
        this.flatpickrOnClose = undefined;
        this.flatpickrOnOpen = undefined;
        this.flatpickrOnReady = undefined;
    }
    ngOnInit() {
        this.globalOnChange = this.flatpickrOptions.onChange;
        this.globalOnClose = this.flatpickrOptions.onClose;
        this.globalOnOpen = this.flatpickrOptions.onOpen;
        this.globalOnReady = this.flatpickrOptions.onReady;
        this.flatpickrOptions = {
            altFormat: this.getOption('altFormat'),
            altInput: this.getOption('altInput'),
            altInputClass: this.getOption('altInputClass'),
            allowInput: this.getOption('allowInput'),
            appendTo: this.getOption('appendTo'),
            clickOpens: this.getOption('clickOpens', true),
            dateFormat: this.getOption('dateFormat'),
            defaultDate: this.getOption('defaultDate'),
            disable: this.getOption('disable'),
            disableMobile: this.getOption('disableMobile'),
            enable: this.getOption('enable'),
            enableTime: this.getOption('enableTime'),
            enableSeconds: this.getOption('enableSeconds'),
            hourIncrement: this.getOption('hourIncrement'),
            inline: this.getOption('inline'),
            locale: this.getOption('locale'),
            maxDate: this.getOption('maxDate'),
            minDate: this.getOption('minDate'),
            minuteIncrement: this.getOption('minuteIncrement'),
            mode: this.getOption('mode'),
            nextArrow: this.getOption('nextArrow'),
            noCalendar: this.getOption('noCalendar'),
            onChange: this.eventOnChange.bind(this),
            onClose: this.eventOnClose.bind(this),
            onOpen: this.eventOnOpen.bind(this),
            onReady: this.eventOnReady.bind(this),
            parseDate: this.getOption('parseDate'),
            prevArrow: this.getOption('prevArrow'),
            shorthandCurrentMonth: this.getOption('shorthandCurrentMonth'),
            static: this.getOption('static'),
            time_24hr: this.getOption('time_24hr'),
            utc: this.getOption('utc'),
            weekNumbers: this.getOption('weekNumbers'),
            wrap: this.getOption('wrap', true),
        };
        // Remove unset properties
        Object.keys(this.flatpickrOptions).forEach((key) => {
            (this.flatpickrOptions[key] === undefined) &&
                delete this.flatpickrOptions[key];
        });
        if (this.control) {
            this.formControlListener = this.control.valueChanges
                .subscribe((value) => {
                if (!(value instanceof Date)) {
                    // Quietly update the value of the form control to be a
                    // Date object. This avoids any external subscribers
                    // from being notified a second time (once for the user
                    // initiated event, and once for our conversion to
                    // Date()).
                    this.control.setValue(new Date('' + value), {
                        onlySelf: true,
                        emitEvent: false,
                        emitModelToViewChange: false,
                        emitViewToModelChange: false
                    });
                }
            });
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onChange callback, if defined.
     */
    eventOnChange(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnChange) {
            this.flatpickrOnChange.emit(event);
        }
        if (this.globalOnChange) {
            this.globalOnChange(event);
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onClose callback, if defined.
     */
    eventOnClose(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnClose) {
            this.flatpickrOnClose.emit(event);
        }
        if (this.globalOnClose) {
            this.globalOnClose(event);
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onOpen callback, if defined.
     */
    eventOnOpen(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnOpen) {
            this.flatpickrOnOpen.emit(event);
        }
        if (this.globalOnOpen) {
            this.globalOnOpen(event);
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onReady callback, if defined.
     */
    eventOnReady(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance
        };
        if (this.flatpickrOnReady) {
            this.flatpickrOnReady.emit(event);
        }
        if (this.globalOnReady) {
            this.globalOnReady(event);
        }
    }
    /**
     * Return the configuration value for option {option}, or {defaultValue} if it
     * doesn't exist.
     */
    getOption(option, defaultValue) {
        let localName = 'flatpickr' + option.substring(0, 1).toUpperCase()
            + option.substring(1);
        if (typeof this[localName] !== 'undefined') {
            return this[localName];
        }
        else if (typeof this.flatpickrOptions[option] !== 'undefined') {
            return this.flatpickrOptions[option];
        }
        else {
            return defaultValue;
        }
    }
}
Ng2FlatpickrDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: Ng2FlatpickrDirective, deps: [{ token: i1.ControlContainer }, { token: i1.NgControl }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
Ng2FlatpickrDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.17", type: Ng2FlatpickrDirective, selector: "[flatpickr]", inputs: { flatpickrOptions: ["flatpickr", "flatpickrOptions"], placeholder: "placeholder", flatpickrAltFormat: ["altFormat", "flatpickrAltFormat"], flatpickrAltInput: ["altInput", "flatpickrAltInput"], flatpickrAltInputClass: ["altInputClass", "flatpickrAltInputClass"], flatpickrAllowInput: ["allowInput", "flatpickrAllowInput"], flatpickrAppendTo: ["appendTo", "flatpickrAppendTo"], flatpickrClickOpens: ["clickOpens", "flatpickrClickOpens"], flatpickrDateFormat: ["dateFormat", "flatpickrDateFormat"], flatpickrDefaultDate: ["defaultDate", "flatpickrDefaultDate"], flatpickrDisable: ["disable", "flatpickrDisable"], flatpickrDisableMobile: ["disableMobile", "flatpickrDisableMobile"], flatpickrEnable: ["enable", "flatpickrEnable"], flatpickrEnableTime: ["enableTime", "flatpickrEnableTime"], flatpickrEnableSeconds: ["enableSeconds", "flatpickrEnableSeconds"], flatpickrHourIncrement: ["hourIncrement", "flatpickrHourIncrement"], flatpickrInline: ["inline", "flatpickrInline"], flatpickrLocale: ["locale", "flatpickrLocale"], flatpickrMaxDate: ["maxDate", "flatpickrMaxDate"], flatpickrMinDate: ["minDate", "flatpickrMinDate"], flatpickrMinuteIncrement: ["minuteIncrement", "flatpickrMinuteIncrement"], flatpickrMode: ["mode", "flatpickrMode"], flatpickrNextArrow: ["nextArrow", "flatpickrNextArrow"], flatpickrNoCalendar: ["noCalendar", "flatpickrNoCalendar"], flatpickrParseDate: ["parseDate", "flatpickrParseDate"], flatpickrPrevArrow: ["prevArrow", "flatpickrPrevArrow"], flatpickrShorthandCurrentMonth: ["shorthandCurrentMonth", "flatpickrShorthandCurrentMonth"], flatpickrStatic: ["static", "flatpickrStatic"], flatpickrTime_24hr: ["time_24hr", "flatpickrTime_24hr"], flatpickrUtc: ["utc", "flatpickrUtc"], flatpickrWeekNumbers: ["weekNumbers", "flatpickrWeekNumbers"], flatpickrWrap: ["wrap", "flatpickrWrap"] }, outputs: { flatpickrOnChange: "onChange", flatpickrOnClose: "onClose", flatpickrOnOpen: "onOpen", flatpickrOnReady: "onReady" }, host: { listeners: { "dblclick": "onClick()" } }, exportAs: ["ng2-flatpickr"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: Ng2FlatpickrDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' }]
        }], ctorParameters: function () { return [{ type: i1.ControlContainer }, { type: i1.NgControl }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { flatpickrOptions: [{
                type: Input,
                args: ['flatpickr']
            }], placeholder: [{
                type: Input,
                args: ['placeholder']
            }], flatpickrAltFormat: [{
                type: Input,
                args: ['altFormat']
            }], flatpickrAltInput: [{
                type: Input,
                args: ['altInput']
            }], flatpickrAltInputClass: [{
                type: Input,
                args: ['altInputClass']
            }], flatpickrAllowInput: [{
                type: Input,
                args: ['allowInput']
            }], flatpickrAppendTo: [{
                type: Input,
                args: ['appendTo']
            }], flatpickrClickOpens: [{
                type: Input,
                args: ['clickOpens']
            }], flatpickrDateFormat: [{
                type: Input,
                args: ['dateFormat']
            }], flatpickrDefaultDate: [{
                type: Input,
                args: ['defaultDate']
            }], flatpickrDisable: [{
                type: Input,
                args: ['disable']
            }], flatpickrDisableMobile: [{
                type: Input,
                args: ['disableMobile']
            }], flatpickrEnable: [{
                type: Input,
                args: ['enable']
            }], flatpickrEnableTime: [{
                type: Input,
                args: ['enableTime']
            }], flatpickrEnableSeconds: [{
                type: Input,
                args: ['enableSeconds']
            }], flatpickrHourIncrement: [{
                type: Input,
                args: ['hourIncrement']
            }], flatpickrInline: [{
                type: Input,
                args: ['inline']
            }], flatpickrLocale: [{
                type: Input,
                args: ['locale']
            }], flatpickrMaxDate: [{
                type: Input,
                args: ['maxDate']
            }], flatpickrMinDate: [{
                type: Input,
                args: ['minDate']
            }], flatpickrMinuteIncrement: [{
                type: Input,
                args: ['minuteIncrement']
            }], flatpickrMode: [{
                type: Input,
                args: ['mode']
            }], flatpickrNextArrow: [{
                type: Input,
                args: ['nextArrow']
            }], flatpickrNoCalendar: [{
                type: Input,
                args: ['noCalendar']
            }], flatpickrParseDate: [{
                type: Input,
                args: ['parseDate']
            }], flatpickrPrevArrow: [{
                type: Input,
                args: ['prevArrow']
            }], flatpickrShorthandCurrentMonth: [{
                type: Input,
                args: ['shorthandCurrentMonth']
            }], flatpickrStatic: [{
                type: Input,
                args: ['static']
            }], flatpickrTime_24hr: [{
                type: Input,
                args: ['time_24hr']
            }], flatpickrUtc: [{
                type: Input,
                args: ['utc']
            }], flatpickrWeekNumbers: [{
                type: Input,
                args: ['weekNumbers']
            }], flatpickrWrap: [{
                type: Input,
                args: ['wrap']
            }], flatpickrOnChange: [{
                type: Output,
                args: ['onChange']
            }], flatpickrOnClose: [{
                type: Output,
                args: ['onClose']
            }], flatpickrOnOpen: [{
                type: Output,
                args: ['onOpen']
            }], flatpickrOnReady: [{
                type: Output,
                args: ['onReady']
            }], onClick: [{
                type: HostListener,
                args: ['dblclick']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbmcyLWZsYXRwaWNrci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNTLFNBQVMsRUFBYyxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDcEQsTUFBTSxFQUN6QixNQUFNLGVBQWUsQ0FBQzs7O0FBUXZCLE1BQU0sT0FBTyxxQkFBcUI7SUEyUmpDLFlBQ1csTUFBd0IsRUFDeEIsU0FBb0IsRUFDcEIsT0FBbUIsRUFDbkIsUUFBbUI7UUFIbkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFqRDlCOzs7O1dBSUc7UUFDMEIsc0JBQWlCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEc7Ozs7V0FJRztRQUN5QixxQkFBZ0IsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRzs7OztXQUlHO1FBQ3dCLG9CQUFlLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUY7Ozs7V0FJRztRQUN5QixxQkFBZ0IsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQXdCN0YsQ0FBQztJQXRCSiw2REFBNkQ7SUFFdEQsT0FBTztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQW9CRCxJQUFJLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNsRixDQUFDO0lBRUQsZUFBZTtRQUNkO29FQUN5RDtRQUN6RCxJQUFJLGFBQWEsR0FB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QkFBOUMsS0FBSzt1QkFBRSxXQUFXO2dCQU9VLGtCQUFrQjtzQkFBOUMsS0FBSzt1QkFBRSxXQUFXO2dCQU9zQiw4QkFBOEI7c0JBQXRFLEtBQUs7dUJBQUUsdUJBQXVCO2dCQVFMLGVBQWU7c0JBQXhDLEtBQUs7dUJBQUUsUUFBUTtnQkFPYSxrQkFBa0I7c0JBQTlDLEtBQUs7dUJBQUUsV0FBVztnQkFFSSxZQUFZO3NCQUFsQyxLQUFLO3VCQUFFLEtBQUs7Z0JBT2tCLG9CQUFvQjtzQkFBbEQsS0FBSzt1QkFBRSxhQUFhO2dCQU9HLGFBQWE7c0JBQXBDLEtBQUs7dUJBQUUsTUFBTTtnQkFPZSxpQkFBaUI7c0JBQTdDLE1BQU07dUJBQUUsVUFBVTtnQkFPUyxnQkFBZ0I7c0JBQTNDLE1BQU07dUJBQUUsU0FBUztnQkFPUyxlQUFlO3NCQUF6QyxNQUFNO3VCQUFFLFFBQVE7Z0JBT1csZ0JBQWdCO3NCQUEzQyxNQUFNO3VCQUFFLFNBQVM7Z0JBSVgsT0FBTztzQkFEYixZQUFZO3VCQUFFLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuXHRBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCxcblx0T25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQ29udHJvbCwgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGbGF0cGlja3JFdmVudCB9IGZyb20gJy4vZmxhdHBpY2tyLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBGbGF0cGlja3JJbnN0YW5jZSB9IGZyb20gJy4vZmxhdHBpY2tyLWluc3RhbmNlJztcbmltcG9ydCB7IEZsYXRwaWNrck9wdGlvbnMgfSBmcm9tICcuL2ZsYXRwaWNrci1vcHRpb25zLmludGVyZmFjZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tmbGF0cGlja3JdJywgZXhwb3J0QXM6ICduZzItZmxhdHBpY2tyJyB9KVxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0LCBPbkNoYW5nZXMge1xuXHQvKipcblx0ICogVGhlIGZsYXRwaWNrciBjb25maWd1cmF0aW9uIGFzIGEgc2luZ2xlIG9iamVjdCBvZiB2YWx1ZXMuXG5cdCAqXG5cdCAqIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3Ivb3B0aW9ucy8gZm9yIGZ1bGwgbGlzdC5cblx0ICovXG5cdEBJbnB1dCggJ2ZsYXRwaWNrcicgKSBwdWJsaWMgZmxhdHBpY2tyT3B0aW9uczogRmxhdHBpY2tyT3B0aW9ucztcblxuXHQvKipcblx0ICogUGxhY2Vob2xkZXIgZm9yIGlucHV0IGZpZWxkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAncGxhY2Vob2xkZXInICkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEV4YWN0bHkgdGhlIHNhbWUgYXMgZGF0ZSBmb3JtYXQsIGJ1dCBmb3IgdGhlIGFsdElucHV0IGZpZWxkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJGIGosIFlcIlxuXHQgKi9cblx0QElucHV0KCAnYWx0Rm9ybWF0JyApIHB1YmxpYyBmbGF0cGlja3JBbHRGb3JtYXQ6IHN0cmluZztcblxuXHQvKipcblx0ICogU2hvdyB0aGUgdXNlciBhIHJlYWRhYmxlIGRhdGUgKGFzIHBlciBhbHRGb3JtYXQpLCBidXQgcmV0dXJuIHNvbWV0aGluZ1xuXHQgKiB0b3RhbGx5IGRpZmZlcmVudCB0byB0aGUgc2VydmVyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2FsdElucHV0JyApIHB1YmxpYyBmbGF0cGlja3JBbHRJbnB1dDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhpcyBjbGFzcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50IGNyZWF0ZWQgYnkgdGhlIGFsdElucHV0XG5cdCAqIG9wdGlvbi5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiXCJcblx0ICovXG5cdEBJbnB1dCggJ2FsdElucHV0Q2xhc3MnICkgcHVibGljIGZsYXRwaWNrckFsdElucHV0Q2xhc3M6IHN0cmluZztcblxuXHQvKipcblx0ICogQWxsb3dzIHRoZSB1c2VyIHRvIGVudGVyIGEgZGF0ZSBkaXJlY3RseSBpbnB1dCB0aGUgaW5wdXQgZmllbGQuIEJ5XG5cdCAqIGRlZmF1bHQsIGRpcmVjdCBlbnRyeSBpcyBkaXNhYmxlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdhbGxvd0lucHV0JyApIHB1YmxpYyBmbGF0cGlja3JBbGxvd0lucHV0OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBJbnN0ZWFkIG9mIGJvZHksIGFwcGVuZHMgdGhlIGNhbGVuZGFyIHRvIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnN0ZWFkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnYXBwZW5kVG8nICkgcHVibGljIGZsYXRwaWNrckFwcGVuZFRvOiBhbnk7IC8vIEhUTUxFbGVtZW50XG5cblx0LyoqXG5cdCAqIFdoZXRoZXIgY2xpY2tpbmcgb24gdGhlIGlucHV0IHNob3VsZCBvcGVuIHRoZSBwaWNrZXIuXG5cdCAqIFlvdSBjb3VsZCBkaXNhYmxlIHRoaXMgaWYgeW91IHdpc2ggdG8gb3BlbiB0aGUgY2FsZW5kYXIgbWFudWFsbHlcblx0ICogd2l0aC5vcGVuKCkuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICB0cnVlXG5cdCAqL1xuXHRASW5wdXQoICdjbGlja09wZW5zJyApIHB1YmxpYyBmbGF0cGlja3JDbGlja09wZW5zOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBIHN0cmluZyBvZiBjaGFyYWN0ZXJzIHdoaWNoIGFyZSB1c2VkIHRvIGRlZmluZSBob3cgdGhlIGRhdGUgd2lsbCBiZVxuXHQgKiBkaXNwbGF5ZWQgaW4gdGhlIGlucHV0IGJveC5cblx0ICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9mb3JtYXR0aW5nLyBmb3Igc3VwcG9ydGVkIHRva2Vucy5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiWS1tLWRcIlxuXHQgKi9cblx0QElucHV0KCAnZGF0ZUZvcm1hdCcgKSBwdWJsaWMgZmxhdHBpY2tyRGF0ZUZvcm1hdDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBpbml0aWFsIHNlbGVjdGVkIGRhdGUocykuXG5cdCAqXG5cdCAqIElmIHlvdSdyZSB1c2luZyB7bW9kZTogXCJtdWx0aXBsZVwifSBvciBhIHJhbmdlIGNhbGVuZGFyIHN1cHBseSBhbiBBcnJheSBvZlxuXHQgKiBEYXRlIG9iamVjdHMgb3IgYW4gQXJyYXkgb2YgZGF0ZSBzdHJpbmdzIHdoaWNoIGZvbGxvdyB5b3VyIGRhdGVGb3JtYXQuXG5cdCAqXG5cdCAqIE90aGVyd2lzZSwgeW91IGNhbiBzdXBwbHkgYSBzaW5nbGUgRGF0ZSBvYmplY3Qgb3IgYSBkYXRlIHN0cmluZy5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ2RlZmF1bHREYXRlJyApIHB1YmxpYyBmbGF0cGlja3JEZWZhdWx0RGF0ZTogc3RyaW5nIHwgRGF0ZTtcblxuXHQvKipcblx0ICogRGlzYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBkaXNhYmxlXG5cdCAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctc3BlY2lmaWMtZGF0ZXNcblx0ICpcblx0ICogRGVmYXVsdDogIFtdXG5cdCAqL1xuXHRASW5wdXQoICdkaXNhYmxlJyApIHB1YmxpYyBmbGF0cGlja3JEaXNhYmxlOiBzdHJpbmdbXSB8IERhdGVbXTtcblxuXHQvKipcblx0ICogU2V0IGRpc2FibGVNb2JpbGUgdG8gdHJ1ZSB0byBhbHdheXMgdXNlIHRoZSBub24tbmF0aXZlIHBpY2tlci4gQnlcblx0ICogZGVmYXVsdCwgRmxhdHBpY2tyIHV0aWxpemVzIG5hdGl2ZSBkYXRldGltZSB3aWRnZXRzIHVubGVzcyBjZXJ0YWluXG5cdCAqIG9wdGlvbnMgKGUuZy4gZGlzYWJsZSkgYXJlIHVzZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnZGlzYWJsZU1vYmlsZScgKSBwdWJsaWMgZmxhdHBpY2tyRGlzYWJsZU1vYmlsZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlIGFuIGFycmF5IG9mIHNwZWNpZmljIGRhdGVzLCBkYXRlIHJhbmdlcywgb3IgZnVuY3Rpb25zIHRvIGVuYWJsZVxuXHQgKiBkYXRlcy4gU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9leGFtcGxlcy8jZGlzYWJsaW5nLWFsbC1kYXRlcy1leGNlcHQtc2VsZWN0LWZld1xuXHQgKlxuXHQgKiBEZWZhdWx0OiAgW11cblx0ICovXG5cdEBJbnB1dCggJ2VuYWJsZScgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlOiBzdHJpbmdbXSB8IERhdGVbXTtcblxuXHQvKipcblx0ICogRW5hYmxlcyB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdlbmFibGVUaW1lJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGVUaW1lOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBFbmFibGVzIHNlY29uZHMgaW4gdGhlIHRpbWUgcGlja2VyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2VuYWJsZVNlY29uZHMnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZVNlY29uZHM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBob3VyIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgMVxuXHQgKi9cblx0QElucHV0KCAnaG91ckluY3JlbWVudCcgKSBwdWJsaWMgZmxhdHBpY2tySG91ckluY3JlbWVudDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBEaXNwbGF5cyB0aGUgY2FsZW5kYXIgaW5saW5lLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2lubGluZScgKSBwdWJsaWMgZmxhdHBpY2tySW5saW5lOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBVc2UgYSBzcGVjaWZpYyBsb2NhbGUgZm9yIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdsb2NhbGUnICkgcHVibGljIGZsYXRwaWNrckxvY2FsZTogT2JqZWN0O1xuXG5cdC8qKlxuXHQgKiBUaGUgbWF4aW11bSBkYXRlIHRoYXQgYSB1c2VyIGNhbiBwaWNrIHRvIChpbmNsdXNpdmUpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnbWF4RGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyTWF4RGF0ZTogc3RyaW5nIHwgRGF0ZTtcblxuXHQvKipcblx0ICogVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gc3RhcnQgcGlja2luZyBmcm9tIChpbmNsdXNpdmUpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnbWluRGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyTWluRGF0ZTogc3RyaW5nIHwgRGF0ZTtcblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgc3RlcCBmb3IgdGhlIG1pbnV0ZSBpbnB1dCAoaW5jbC4gc2Nyb2xsaW5nKS5cblx0ICpcblx0ICogRGVmYXVsdDogIDVcblx0ICovXG5cdEBJbnB1dCggJ21pbnV0ZUluY3JlbWVudCcgKSBwdWJsaWMgZmxhdHBpY2tyTWludXRlSW5jcmVtZW50OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIFwic2luZ2xlXCIsIFwibXVsdGlwbGVcIiwgb3IgXCJyYW5nZVwiXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcInNpbmdsZVwiXG5cdCAqL1xuXHRASW5wdXQoICdtb2RlJyApIHB1YmxpYyBmbGF0cGlja3JNb2RlOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEhUTUwgZm9yIHRoZSBhcnJvdyBpY29uLCB1c2VkIHRvIHN3aXRjaCBtb250aHMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIj5cIlxuXHQgKi9cblx0QElucHV0KCAnbmV4dEFycm93JyApIHB1YmxpYyBmbGF0cGlja3JOZXh0QXJyb3c6IHN0cmluZztcblxuXHQvKipcblx0ICogSGlkZXMgdGhlIGRheSBzZWxlY3Rpb24gaW4gY2FsZW5kYXIuIFVzZSBpdCBhbG9uZyB3aXRoIGVuYWJsZVRpbWUgdG9cblx0ICogY3JlYXRlIGEgdGltZSBwaWNrZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnbm9DYWxlbmRhcicgKSBwdWJsaWMgZmxhdHBpY2tyTm9DYWxlbmRhcjogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRnVuY3Rpb24gdGhhdCBleHBlY3RzIGEgZGF0ZSBzdHJpbmcgYW5kIG11c3QgcmV0dXJuIGEgRGF0ZSBvYmplY3QuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAncGFyc2VEYXRlJyApIHB1YmxpYyBmbGF0cGlja3JQYXJzZURhdGU6IEZ1bmN0aW9uO1xuXG5cdC8qKlxuXHQgKiBIVE1MIGZvciB0aGUgbGVmdCBhcnJvdyBpY29uLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCI8XCJcblx0ICovXG5cdEBJbnB1dCggJ3ByZXZBcnJvdycgKSBwdWJsaWMgZmxhdHBpY2tyUHJldkFycm93OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNob3cgdGhlIG1vbnRoIHVzaW5nIHRoZSBzaG9ydGhhbmQgdmVyc2lvbiAoaWUsIFNlcCBpbnN0ZWFkIG9mIFNlcHRlbWJlcikuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnc2hvcnRoYW5kQ3VycmVudE1vbnRoJyApIHB1YmxpYyBmbGF0cGlja3JTaG9ydGhhbmRDdXJyZW50TW9udGg6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFBvc2l0aW9uIHRoZSBjYWxlbmRhciBpbnNpZGUgdGhlIHdyYXBwZXIgYW5kIG5leHQgdG8gdGhlIGlucHV0IGVsZW1lbnRcblx0ICogKExlYXZlIGZhbHNlIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnc3RhdGljJyApIHB1YmxpYyBmbGF0cGlja3JTdGF0aWM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIERpc3BsYXlzIHRpbWUgcGlja2VyIGluIDI0IGhvdXIgbW9kZSB3aXRob3V0IEFNL1BNIHNlbGVjdGlvbiB3aGVuIGVuYWJsZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAndGltZV8yNGhyJyApIHB1YmxpYyBmbGF0cGlja3JUaW1lXzI0aHI6IGJvb2xlYW47XG5cblx0QElucHV0KCAndXRjJyApIHB1YmxpYyBmbGF0cGlja3JVdGM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgZGlzcGxheSBvZiB3ZWVrIG51bWJlcnMgaW4gY2FsZW5kYXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnd2Vla051bWJlcnMnICkgcHVibGljIGZsYXRwaWNrcldlZWtOdW1iZXJzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBDdXN0b20gZWxlbWVudHMgYW5kIGlucHV0IGdyb3Vwcy5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICd3cmFwJyApIHB1YmxpYyBmbGF0cGlja3JXcmFwOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBvbkNoYW5nZSBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBkYXRlLCBvciBjaGFuZ2VzIHRoZSB0aW1lIG9uIGEgc2VsZWN0ZWQgZGF0ZS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBPdXRwdXQoICdvbkNoYW5nZScgKSBwdWJsaWMgZmxhdHBpY2tyT25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqXG5cdCAqIG9uQ2xvc2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgY2xvc2VkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uQ2xvc2UnICkgcHVibGljIGZsYXRwaWNrck9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqXG5cdCAqIG9uT3BlbiBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25PcGVuJyApIHB1YmxpYyBmbGF0cGlja3JPbk9wZW46IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqXG5cdCAqIG9uUmVhZHkgZ2V0cyB0cmlnZ2VyZWQgb25jZSB0aGUgY2FsZW5kYXIgaXMgaW4gYSByZWFkeSBzdGF0ZS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBPdXRwdXQoICdvblJlYWR5JyApIHB1YmxpYyBmbGF0cGlja3JPblJlYWR5OiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKiBBbGxvdyBkb3VibGUtY2xpY2tpbmcgb24gdGhlIGNvbnRyb2wgdG8gb3Blbi9jbG9zZSBpdC4gKi9cblx0QEhvc3RMaXN0ZW5lciggJ2RibGNsaWNrJyApXG5cdHB1YmxpYyBvbkNsaWNrKCkge1xuXHRcdHRoaXMuZmxhdHBpY2tyLnRvZ2dsZSgpO1xuXHR9XG5cblx0cHJvdGVjdGVkIGdsb2JhbE9uQ2hhbmdlOiBGdW5jdGlvbjtcblx0cHJvdGVjdGVkIGdsb2JhbE9uQ2xvc2U6IEZ1bmN0aW9uO1xuXHRwcm90ZWN0ZWQgZ2xvYmFsT25PcGVuOiBGdW5jdGlvbjtcblx0cHJvdGVjdGVkIGdsb2JhbE9uUmVhZHk6IEZ1bmN0aW9uO1xuXG5cdHByb3RlY3RlZCBmbGF0cGlja3I6IEZsYXRwaWNrckluc3RhbmNlO1xuXHRwcm90ZWN0ZWQgZm9ybUNvbnRyb2xMaXN0ZW5lcjogU3Vic2NyaXB0aW9uO1xuXG5cdC8qKiBBbGxvdyBhY2Nlc3MgcHJvcGVydGllcyB1c2luZyBpbmRleCBub3RhdGlvbiAqL1xuXHRba2V5OnN0cmluZ106IGFueTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcm90ZWN0ZWQgcGFyZW50OiBDb250cm9sQ29udGFpbmVyLFxuXHRcdHByb3RlY3RlZCBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcblx0XHRwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZixcblx0XHRwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMlxuXHQpIHt9XG5cblx0Z2V0IGNvbnRyb2woKTogRm9ybUNvbnRyb2wge1xuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUuZ2V0Q29udHJvbCh0aGlzLm5nQ29udHJvbCkgOiBudWxsO1xuXHR9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdC8qKiBXZSBjYW5ub3QgaW5pdGlhbGl6ZSB0aGUgZmxhdHBpY2tyIGluc3RhbmNlIGluIG5nT25Jbml0KCk7IGl0IHdpbGxcblx0XHRcdHJhbmRvbWl6ZSB0aGUgZGF0ZSB3aGVuIHRoZSBmb3JtIGNvbnRyb2wgaW5pdGlhbGl6ZXMuICovXG5cdFx0bGV0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuXHRcdGlmICh0eXBlb2YgbmF0aXZlRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgbmF0aXZlRWxlbWVudCA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgJ0Vycm9yOiBpbnZhbGlkIGlucHV0IGVsZW1lbnQgc3BlY2lmaWVkJztcblx0XHR9XG5cblx0XHRpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zLndyYXApIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKCB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2RhdGEtaW5wdXQnLCAnJyApO1xuXHRcdFx0bmF0aXZlRWxlbWVudCA9IG5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHR0aGlzLmZsYXRwaWNrciA9IDxGbGF0cGlja3JJbnN0YW5jZT5uYXRpdmVFbGVtZW50LmZsYXRwaWNrciggdGhpcy5mbGF0cGlja3JPcHRpb25zICk7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyggY2hhbmdlczogU2ltcGxlQ2hhbmdlcyApIHtcblx0XHRpZiggdGhpcy5mbGF0cGlja3Jcblx0XHRcdCYmIHRoaXMuZmxhdHBpY2tyQWx0SW5wdXRcblx0XHRcdCYmIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoICdwbGFjZWhvbGRlcicgKSBcblx0XHRcdCYmIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKSB7XG5cdFx0XHRcdHRoaXMuZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSggJ3BsYWNlaG9sZGVyJywgY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApO1xuXHRcdFx0fVxuXHR9XG5cblx0bmdPbkRlc3Ryb3koKSB7XG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrci5kZXN0cm95KCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lcikge1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyLnVuc3Vic2NyaWJlKCk7XG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5mbGF0cGlja3JPbkNoYW5nZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPbk9wZW4gPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPblJlYWR5ID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbkNoYW5nZTtcblx0XHR0aGlzLmdsb2JhbE9uQ2xvc2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DbG9zZTtcblx0XHR0aGlzLmdsb2JhbE9uT3BlbiA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbk9wZW47XG5cdFx0dGhpcy5nbG9iYWxPblJlYWR5ID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uUmVhZHk7XG5cblx0XHR0aGlzLmZsYXRwaWNrck9wdGlvbnMgPSB7XG5cdFx0XHRhbHRGb3JtYXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbHRGb3JtYXQnKSxcblx0XHRcdGFsdElucHV0OiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXQnKSxcblx0XHRcdGFsdElucHV0Q2xhc3M6IHRoaXMuZ2V0T3B0aW9uKCdhbHRJbnB1dENsYXNzJyksXG5cdFx0XHRhbGxvd0lucHV0OiB0aGlzLmdldE9wdGlvbignYWxsb3dJbnB1dCcpLFxuXHRcdFx0YXBwZW5kVG86IHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpLFxuXHRcdFx0Y2xpY2tPcGVuczogdGhpcy5nZXRPcHRpb24oJ2NsaWNrT3BlbnMnLCB0cnVlKSxcblx0XHRcdGRhdGVGb3JtYXQ6IHRoaXMuZ2V0T3B0aW9uKCdkYXRlRm9ybWF0JyksXG5cdFx0XHRkZWZhdWx0RGF0ZTogdGhpcy5nZXRPcHRpb24oJ2RlZmF1bHREYXRlJyksXG5cdFx0XHRkaXNhYmxlOiB0aGlzLmdldE9wdGlvbignZGlzYWJsZScpLFxuXHRcdFx0ZGlzYWJsZU1vYmlsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGVNb2JpbGUnKSxcblx0XHRcdGVuYWJsZTogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZScpLFxuXHRcdFx0ZW5hYmxlVGltZTogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZVRpbWUnKSxcblx0XHRcdGVuYWJsZVNlY29uZHM6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVTZWNvbmRzJyksXG5cdFx0XHRob3VySW5jcmVtZW50OiB0aGlzLmdldE9wdGlvbignaG91ckluY3JlbWVudCcpLFxuXHRcdFx0aW5saW5lOiB0aGlzLmdldE9wdGlvbignaW5saW5lJyksXG5cdFx0XHRsb2NhbGU6IHRoaXMuZ2V0T3B0aW9uKCdsb2NhbGUnKSxcblx0XHRcdG1heERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdtYXhEYXRlJyksXG5cdFx0XHRtaW5EYXRlOiB0aGlzLmdldE9wdGlvbignbWluRGF0ZScpLFxuXHRcdFx0bWludXRlSW5jcmVtZW50OiB0aGlzLmdldE9wdGlvbignbWludXRlSW5jcmVtZW50JyksXG5cdFx0XHRtb2RlOiB0aGlzLmdldE9wdGlvbignbW9kZScpLFxuXHRcdFx0bmV4dEFycm93OiB0aGlzLmdldE9wdGlvbignbmV4dEFycm93JyksXG5cdFx0XHRub0NhbGVuZGFyOiB0aGlzLmdldE9wdGlvbignbm9DYWxlbmRhcicpLFxuXHRcdFx0b25DaGFuZ2U6IHRoaXMuZXZlbnRPbkNoYW5nZS5iaW5kKHRoaXMpLFxuXHRcdFx0b25DbG9zZTogdGhpcy5ldmVudE9uQ2xvc2UuYmluZCh0aGlzKSxcblx0XHRcdG9uT3BlbjogdGhpcy5ldmVudE9uT3Blbi5iaW5kKHRoaXMpLFxuXHRcdFx0b25SZWFkeTogdGhpcy5ldmVudE9uUmVhZHkuYmluZCh0aGlzKSxcblx0XHRcdHBhcnNlRGF0ZTogdGhpcy5nZXRPcHRpb24oJ3BhcnNlRGF0ZScpLFxuXHRcdFx0cHJldkFycm93OiB0aGlzLmdldE9wdGlvbigncHJldkFycm93JyksXG5cdFx0XHRzaG9ydGhhbmRDdXJyZW50TW9udGg6IHRoaXMuZ2V0T3B0aW9uKCdzaG9ydGhhbmRDdXJyZW50TW9udGgnKSxcblx0XHRcdHN0YXRpYzogdGhpcy5nZXRPcHRpb24oJ3N0YXRpYycpLFxuXHRcdFx0dGltZV8yNGhyOiB0aGlzLmdldE9wdGlvbigndGltZV8yNGhyJyksXG5cdFx0XHR1dGM6IHRoaXMuZ2V0T3B0aW9uKCd1dGMnKSxcblx0XHRcdHdlZWtOdW1iZXJzOiB0aGlzLmdldE9wdGlvbignd2Vla051bWJlcnMnKSxcblx0XHRcdHdyYXA6IHRoaXMuZ2V0T3B0aW9uKCd3cmFwJywgdHJ1ZSksXG5cdFx0fTtcblxuXHRcdC8vIFJlbW92ZSB1bnNldCBwcm9wZXJ0aWVzXG5cdFx0T2JqZWN0LmtleXMoIHRoaXMuZmxhdHBpY2tyT3B0aW9ucyApLmZvckVhY2goICgga2V5OiBzdHJpbmcgKSA9PiB7XG5cdFx0XHQodGhpcy5mbGF0cGlja3JPcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZCkgJiZcblx0XHRcdFx0ZGVsZXRlIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldO1xuXHRcdH0gKTtcblxuXHRcdGlmICh0aGlzLmNvbnRyb2wpIHtcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lciA9IHRoaXMuY29udHJvbC52YWx1ZUNoYW5nZXNcblx0XHRcdFx0LnN1YnNjcmliZSggKCB2YWx1ZTogYW55ICkgPT4ge1xuXHRcdFx0XHRcdGlmICggISggdmFsdWUgaW5zdGFuY2VvZiBEYXRlICkgKSB7XG5cdFx0XHRcdFx0XHQvLyBRdWlldGx5IHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGZvcm0gY29udHJvbCB0byBiZSBhXG5cdFx0XHRcdFx0XHQvLyBEYXRlIG9iamVjdC4gVGhpcyBhdm9pZHMgYW55IGV4dGVybmFsIHN1YnNjcmliZXJzXG5cdFx0XHRcdFx0XHQvLyBmcm9tIGJlaW5nIG5vdGlmaWVkIGEgc2Vjb25kIHRpbWUgKG9uY2UgZm9yIHRoZSB1c2VyXG5cdFx0XHRcdFx0XHQvLyBpbml0aWF0ZWQgZXZlbnQsIGFuZCBvbmNlIGZvciBvdXIgY29udmVyc2lvbiB0b1xuXHRcdFx0XHRcdFx0Ly8gRGF0ZSgpKS5cblx0XHRcdFx0XHRcdHRoaXMuY29udHJvbC5zZXRWYWx1ZSggbmV3IERhdGUoICcnICsgdmFsdWUgKSwge1xuXHRcdFx0XHRcdFx0XHRvbmx5U2VsZjogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0ZW1pdEV2ZW50OiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0ZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0ZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZVxuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXG5cdCAqIGdsb2JhbCBvbkNoYW5nZSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uQ2hhbmdlKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbkNoYW5nZSApIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UuZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25DaGFuZ2UgKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uQ2hhbmdlKCBldmVudCApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXG5cdCAqIGdsb2JhbCBvbkNsb3NlIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25DbG9zZSggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25DbG9zZSApIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25DbG9zZS5lbWl0KCBldmVudCApO1xuXHRcdH1cblx0XHRpZiggdGhpcy5nbG9iYWxPbkNsb3NlICkge1xuXHRcdFx0dGhpcy5nbG9iYWxPbkNsb3NlKCBldmVudCApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXG5cdCAqIGdsb2JhbCBvbk9wZW4gY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPbk9wZW4oIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uT3BlbiApIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25PcGVuLmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uT3BlbiApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25PcGVuKCBldmVudCApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXG5cdCAqIGdsb2JhbCBvblJlYWR5IGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25SZWFkeSggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25SZWFkeSApIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyT25SZWFkeS5lbWl0KCBldmVudCApO1xuXHRcdH1cblx0XHRpZiggdGhpcy5nbG9iYWxPblJlYWR5ICkge1xuXHRcdFx0dGhpcy5nbG9iYWxPblJlYWR5KCBldmVudCApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWUgZm9yIG9wdGlvbiB7b3B0aW9ufSwgb3Ige2RlZmF1bHRWYWx1ZX0gaWYgaXRcblx0ICogZG9lc24ndCBleGlzdC5cblx0ICovXG5cdHByb3RlY3RlZCBnZXRPcHRpb24oIG9wdGlvbjogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBhbnkgKTogYW55IHtcblx0XHRsZXQgbG9jYWxOYW1lID0gJ2ZsYXRwaWNrcicgKyBvcHRpb24uc3Vic3RyaW5nKCAwLCAxICkudG9VcHBlckNhc2UoKVxuXHRcdFx0KyBvcHRpb24uc3Vic3RyaW5nKCAxICk7XG5cblx0XHRpZiAoIHR5cGVvZiB0aGlzW2xvY2FsTmFtZV0gIT09ICd1bmRlZmluZWQnICkge1xuXHRcdFx0cmV0dXJuIHRoaXNbbG9jYWxOYW1lXTtcblx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgdGhpcy5mbGF0cGlja3JPcHRpb25zW29wdGlvbl0gIT09ICd1bmRlZmluZWQnICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1tvcHRpb25dO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fVxufVxuIl19