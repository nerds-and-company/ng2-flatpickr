import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
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
Ng2FlatpickrDirective.ɵfac = function Ng2FlatpickrDirective_Factory(t) { return new (t || Ng2FlatpickrDirective)(i0.ɵɵdirectiveInject(i1.ControlContainer), i0.ɵɵdirectiveInject(i1.NgControl), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
Ng2FlatpickrDirective.ɵdir = i0.ɵɵdefineDirective({ type: Ng2FlatpickrDirective, selectors: [["", "flatpickr", ""]], hostBindings: function Ng2FlatpickrDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("dblclick", function Ng2FlatpickrDirective_dblclick_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { flatpickrOptions: ["flatpickr", "flatpickrOptions"], placeholder: "placeholder", flatpickrAltFormat: ["altFormat", "flatpickrAltFormat"], flatpickrAltInput: ["altInput", "flatpickrAltInput"], flatpickrAltInputClass: ["altInputClass", "flatpickrAltInputClass"], flatpickrAllowInput: ["allowInput", "flatpickrAllowInput"], flatpickrAppendTo: ["appendTo", "flatpickrAppendTo"], flatpickrClickOpens: ["clickOpens", "flatpickrClickOpens"], flatpickrDateFormat: ["dateFormat", "flatpickrDateFormat"], flatpickrDefaultDate: ["defaultDate", "flatpickrDefaultDate"], flatpickrDisable: ["disable", "flatpickrDisable"], flatpickrDisableMobile: ["disableMobile", "flatpickrDisableMobile"], flatpickrEnable: ["enable", "flatpickrEnable"], flatpickrEnableTime: ["enableTime", "flatpickrEnableTime"], flatpickrEnableSeconds: ["enableSeconds", "flatpickrEnableSeconds"], flatpickrHourIncrement: ["hourIncrement", "flatpickrHourIncrement"], flatpickrInline: ["inline", "flatpickrInline"], flatpickrLocale: ["locale", "flatpickrLocale"], flatpickrMaxDate: ["maxDate", "flatpickrMaxDate"], flatpickrMinDate: ["minDate", "flatpickrMinDate"], flatpickrMinuteIncrement: ["minuteIncrement", "flatpickrMinuteIncrement"], flatpickrMode: ["mode", "flatpickrMode"], flatpickrNextArrow: ["nextArrow", "flatpickrNextArrow"], flatpickrNoCalendar: ["noCalendar", "flatpickrNoCalendar"], flatpickrParseDate: ["parseDate", "flatpickrParseDate"], flatpickrPrevArrow: ["prevArrow", "flatpickrPrevArrow"], flatpickrShorthandCurrentMonth: ["shorthandCurrentMonth", "flatpickrShorthandCurrentMonth"], flatpickrStatic: ["static", "flatpickrStatic"], flatpickrTime_24hr: ["time_24hr", "flatpickrTime_24hr"], flatpickrUtc: ["utc", "flatpickrUtc"], flatpickrWeekNumbers: ["weekNumbers", "flatpickrWeekNumbers"], flatpickrWrap: ["wrap", "flatpickrWrap"] }, outputs: { flatpickrOnChange: "onChange", flatpickrOnClose: "onClose", flatpickrOnOpen: "onOpen", flatpickrOnReady: "onReady" }, exportAs: ["ng2-flatpickr"], features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Ng2FlatpickrDirective, [{
        type: Directive,
        args: [{ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' }]
    }], function () { return [{ type: i1.ControlContainer }, { type: i1.NgControl }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { flatpickrOptions: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDUyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUNwRCxNQUFNLEVBQUUsU0FBUyxFQUNwQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQWUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU8xRSxNQUFNLE9BQU8scUJBQXFCO0lBMlJqQyxZQUNXLE1BQXdCLEVBQ3hCLFNBQW9CLEVBQ3BCLE9BQW1CLEVBQ25CLFFBQW1CO1FBSG5CLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBakQ5Qjs7OztXQUlHO1FBQzBCLHNCQUFpQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxHOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN3QixvQkFBZSxHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlGOzs7O1dBSUc7UUFDeUIscUJBQWdCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7SUF3QjdGLENBQUM7SUF0QkosNkRBQTZEO0lBRXRELE9BQU87UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFvQkQsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNB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bUJBQUUsVUFBVTs7a0JBT2xCLE1BQU07bUJBQUUsU0FBUzs7a0JBT2pCLE1BQU07bUJBQUUsUUFBUTs7a0JBT2hCLE1BQU07bUJBQUUsU0FBUzs7a0JBR2pCLFlBQVk7bUJBQUUsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LFxuXHRPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xDb250YWluZXIsIEZvcm1Db250cm9sLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZsYXRwaWNrckV2ZW50IH0gZnJvbSAnLi9mbGF0cGlja3ItZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZsYXRwaWNrckluc3RhbmNlIH0gZnJvbSAnLi9mbGF0cGlja3ItaW5zdGFuY2UnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2ZsYXRwaWNrcl0nLCBleHBvcnRBczogJ25nMi1mbGF0cGlja3InIH0pXG5leHBvcnQgY2xhc3MgTmcyRmxhdHBpY2tyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cdC8qKlxuXHQgKiBUaGUgZmxhdHBpY2tyIGNvbmZpZ3VyYXRpb24gYXMgYSBzaW5nbGUgb2JqZWN0IG9mIHZhbHVlcy5cblx0ICpcblx0ICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9vcHRpb25zLyBmb3IgZnVsbCBsaXN0LlxuXHQgKi9cblx0QElucHV0KCAnZmxhdHBpY2tyJyApIHB1YmxpYyBmbGF0cGlja3JPcHRpb25zOiBGbGF0cGlja3JPcHRpb25zO1xuXG5cdC8qKlxuXHQgKiBQbGFjZWhvbGRlciBmb3IgaW5wdXQgZmllbGQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdwbGFjZWhvbGRlcicgKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuXHQvKipcblx0ICogRXhhY3RseSB0aGUgc2FtZSBhcyBkYXRlIGZvcm1hdCwgYnV0IGZvciB0aGUgYWx0SW5wdXQgZmllbGQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIkYgaiwgWVwiXG5cdCAqL1xuXHRASW5wdXQoICdhbHRGb3JtYXQnICkgcHVibGljIGZsYXRwaWNrckFsdEZvcm1hdDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSB1c2VyIGEgcmVhZGFibGUgZGF0ZSAoYXMgcGVyIGFsdEZvcm1hdCksIGJ1dCByZXR1cm4gc29tZXRoaW5nXG5cdCAqIHRvdGFsbHkgZGlmZmVyZW50IHRvIHRoZSBzZXJ2ZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnYWx0SW5wdXQnICkgcHVibGljIGZsYXRwaWNrckFsdElucHV0OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGlzIGNsYXNzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGlucHV0IGVsZW1lbnQgY3JlYXRlZCBieSB0aGUgYWx0SW5wdXRcblx0ICogb3B0aW9uLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJcIlxuXHQgKi9cblx0QElucHV0KCAnYWx0SW5wdXRDbGFzcycgKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXRDbGFzczogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBbGxvd3MgdGhlIHVzZXIgdG8gZW50ZXIgYSBkYXRlIGRpcmVjdGx5IGlucHV0IHRoZSBpbnB1dCBmaWVsZC4gQnlcblx0ICogZGVmYXVsdCwgZGlyZWN0IGVudHJ5IGlzIGRpc2FibGVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2FsbG93SW5wdXQnICkgcHVibGljIGZsYXRwaWNrckFsbG93SW5wdXQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEluc3RlYWQgb2YgYm9keSwgYXBwZW5kcyB0aGUgY2FsZW5kYXIgdG8gdGhlIHNwZWNpZmllZCBub2RlIGluc3RlYWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdhcHBlbmRUbycgKSBwdWJsaWMgZmxhdHBpY2tyQXBwZW5kVG86IGFueTsgLy8gSFRNTEVsZW1lbnRcblxuXHQvKipcblx0ICogV2hldGhlciBjbGlja2luZyBvbiB0aGUgaW5wdXQgc2hvdWxkIG9wZW4gdGhlIHBpY2tlci5cblx0ICogWW91IGNvdWxkIGRpc2FibGUgdGhpcyBpZiB5b3Ugd2lzaCB0byBvcGVuIHRoZSBjYWxlbmRhciBtYW51YWxseVxuXHQgKiB3aXRoLm9wZW4oKS5cblx0ICpcblx0ICogRGVmYXVsdDogIHRydWVcblx0ICovXG5cdEBJbnB1dCggJ2NsaWNrT3BlbnMnICkgcHVibGljIGZsYXRwaWNrckNsaWNrT3BlbnM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEEgc3RyaW5nIG9mIGNoYXJhY3RlcnMgd2hpY2ggYXJlIHVzZWQgdG8gZGVmaW5lIGhvdyB0aGUgZGF0ZSB3aWxsIGJlXG5cdCAqIGRpc3BsYXllZCBpbiB0aGUgaW5wdXQgYm94LlxuXHQgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2Zvcm1hdHRpbmcvIGZvciBzdXBwb3J0ZWQgdG9rZW5zLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJZLW0tZFwiXG5cdCAqL1xuXHRASW5wdXQoICdkYXRlRm9ybWF0JyApIHB1YmxpYyBmbGF0cGlja3JEYXRlRm9ybWF0OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIGluaXRpYWwgc2VsZWN0ZWQgZGF0ZShzKS5cblx0ICpcblx0ICogSWYgeW91J3JlIHVzaW5nIHttb2RlOiBcIm11bHRpcGxlXCJ9IG9yIGEgcmFuZ2UgY2FsZW5kYXIgc3VwcGx5IGFuIEFycmF5IG9mXG5cdCAqIERhdGUgb2JqZWN0cyBvciBhbiBBcnJheSBvZiBkYXRlIHN0cmluZ3Mgd2hpY2ggZm9sbG93IHlvdXIgZGF0ZUZvcm1hdC5cblx0ICpcblx0ICogT3RoZXJ3aXNlLCB5b3UgY2FuIHN1cHBseSBhIHNpbmdsZSBEYXRlIG9iamVjdCBvciBhIGRhdGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnZGVmYXVsdERhdGUnICkgcHVibGljIGZsYXRwaWNrckRlZmF1bHREYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdC8qKlxuXHQgKiBEaXNhYmxlIGFuIGFycmF5IG9mIHNwZWNpZmljIGRhdGVzLCBkYXRlIHJhbmdlcywgb3IgZnVuY3Rpb25zIHRvIGRpc2FibGVcblx0ICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1zcGVjaWZpYy1kYXRlc1xuXHQgKlxuXHQgKiBEZWZhdWx0OiAgW11cblx0ICovXG5cdEBJbnB1dCggJ2Rpc2FibGUnICkgcHVibGljIGZsYXRwaWNrckRpc2FibGU6IHN0cmluZ1tdIHwgRGF0ZVtdO1xuXG5cdC8qKlxuXHQgKiBTZXQgZGlzYWJsZU1vYmlsZSB0byB0cnVlIHRvIGFsd2F5cyB1c2UgdGhlIG5vbi1uYXRpdmUgcGlja2VyLiBCeVxuXHQgKiBkZWZhdWx0LCBGbGF0cGlja3IgdXRpbGl6ZXMgbmF0aXZlIGRhdGV0aW1lIHdpZGdldHMgdW5sZXNzIGNlcnRhaW5cblx0ICogb3B0aW9ucyAoZS5nLiBkaXNhYmxlKSBhcmUgdXNlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdkaXNhYmxlTW9iaWxlJyApIHB1YmxpYyBmbGF0cGlja3JEaXNhYmxlTW9iaWxlOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBFbmFibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZW5hYmxlXG5cdCAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctYWxsLWRhdGVzLWV4Y2VwdC1zZWxlY3QtZmV3XG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBbXVxuXHQgKi9cblx0QElucHV0KCAnZW5hYmxlJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGU6IHN0cmluZ1tdIHwgRGF0ZVtdO1xuXG5cdC8qKlxuXHQgKiBFbmFibGVzIHRpbWUgcGlja2VyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2VuYWJsZVRpbWUnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZVRpbWU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgc2Vjb25kcyBpbiB0aGUgdGltZSBwaWNrZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnZW5hYmxlU2Vjb25kcycgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlU2Vjb25kczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQWRqdXN0cyB0aGUgc3RlcCBmb3IgdGhlIGhvdXIgaW5wdXQgKGluY2wuIHNjcm9sbGluZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICAxXG5cdCAqL1xuXHRASW5wdXQoICdob3VySW5jcmVtZW50JyApIHB1YmxpYyBmbGF0cGlja3JIb3VySW5jcmVtZW50OiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIERpc3BsYXlzIHRoZSBjYWxlbmRhciBpbmxpbmUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnaW5saW5lJyApIHB1YmxpYyBmbGF0cGlja3JJbmxpbmU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFVzZSBhIHNwZWNpZmljIGxvY2FsZSBmb3IgdGhlIGZsYXRwaWNrciBpbnN0YW5jZS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ2xvY2FsZScgKSBwdWJsaWMgZmxhdHBpY2tyTG9jYWxlOiBPYmplY3Q7XG5cblx0LyoqXG5cdCAqIFRoZSBtYXhpbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHBpY2sgdG8gKGluY2x1c2l2ZSkuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdtYXhEYXRlJyApIHB1YmxpYyBmbGF0cGlja3JNYXhEYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdC8qKlxuXHQgKiBUaGUgbWluaW11bSBkYXRlIHRoYXQgYSB1c2VyIGNhbiBzdGFydCBwaWNraW5nIGZyb20gKGluY2x1c2l2ZSkuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdtaW5EYXRlJyApIHB1YmxpYyBmbGF0cGlja3JNaW5EYXRlOiBzdHJpbmcgfCBEYXRlO1xuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgbWludXRlIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgNVxuXHQgKi9cblx0QElucHV0KCAnbWludXRlSW5jcmVtZW50JyApIHB1YmxpYyBmbGF0cGlja3JNaW51dGVJbmNyZW1lbnQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogXCJzaW5nbGVcIiwgXCJtdWx0aXBsZVwiLCBvciBcInJhbmdlXCJcblx0ICpcblx0ICogRGVmYXVsdDogIFwic2luZ2xlXCJcblx0ICovXG5cdEBJbnB1dCggJ21vZGUnICkgcHVibGljIGZsYXRwaWNrck1vZGU6IHN0cmluZztcblxuXHQvKipcblx0ICogSFRNTCBmb3IgdGhlIGFycm93IGljb24sIHVzZWQgdG8gc3dpdGNoIG1vbnRocy5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiPlwiXG5cdCAqL1xuXHRASW5wdXQoICduZXh0QXJyb3cnICkgcHVibGljIGZsYXRwaWNrck5leHRBcnJvdzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBIaWRlcyB0aGUgZGF5IHNlbGVjdGlvbiBpbiBjYWxlbmRhci4gVXNlIGl0IGFsb25nIHdpdGggZW5hYmxlVGltZSB0b1xuXHQgKiBjcmVhdGUgYSB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdub0NhbGVuZGFyJyApIHB1YmxpYyBmbGF0cGlja3JOb0NhbGVuZGFyOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBGdW5jdGlvbiB0aGF0IGV4cGVjdHMgYSBkYXRlIHN0cmluZyBhbmQgbXVzdCByZXR1cm4gYSBEYXRlIG9iamVjdC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdwYXJzZURhdGUnICkgcHVibGljIGZsYXRwaWNrclBhcnNlRGF0ZTogRnVuY3Rpb247XG5cblx0LyoqXG5cdCAqIEhUTUwgZm9yIHRoZSBsZWZ0IGFycm93IGljb24uXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIjxcIlxuXHQgKi9cblx0QElucHV0KCAncHJldkFycm93JyApIHB1YmxpYyBmbGF0cGlja3JQcmV2QXJyb3c6IHN0cmluZztcblxuXHQvKipcblx0ICogU2hvdyB0aGUgbW9udGggdXNpbmcgdGhlIHNob3J0aGFuZCB2ZXJzaW9uIChpZSwgU2VwIGluc3RlYWQgb2YgU2VwdGVtYmVyKS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdzaG9ydGhhbmRDdXJyZW50TW9udGgnICkgcHVibGljIGZsYXRwaWNrclNob3J0aGFuZEN1cnJlbnRNb250aDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogUG9zaXRpb24gdGhlIGNhbGVuZGFyIGluc2lkZSB0aGUgd3JhcHBlciBhbmQgbmV4dCB0byB0aGUgaW5wdXQgZWxlbWVudFxuXHQgKiAoTGVhdmUgZmFsc2UgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nKS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdzdGF0aWMnICkgcHVibGljIGZsYXRwaWNrclN0YXRpYzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRGlzcGxheXMgdGltZSBwaWNrZXIgaW4gMjQgaG91ciBtb2RlIHdpdGhvdXQgQU0vUE0gc2VsZWN0aW9uIHdoZW4gZW5hYmxlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICd0aW1lXzI0aHInICkgcHVibGljIGZsYXRwaWNrclRpbWVfMjRocjogYm9vbGVhbjtcblxuXHRASW5wdXQoICd1dGMnICkgcHVibGljIGZsYXRwaWNrclV0YzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlcyBkaXNwbGF5IG9mIHdlZWsgbnVtYmVycyBpbiBjYWxlbmRhci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICd3ZWVrTnVtYmVycycgKSBwdWJsaWMgZmxhdHBpY2tyV2Vla051bWJlcnM6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEN1c3RvbSBlbGVtZW50cyBhbmQgaW5wdXQgZ3JvdXBzLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3dyYXAnICkgcHVibGljIGZsYXRwaWNrcldyYXA6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIG9uQ2hhbmdlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGRhdGUsIG9yIGNoYW5nZXMgdGhlIHRpbWUgb24gYSBzZWxlY3RlZCBkYXRlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uQ2hhbmdlJyApIHB1YmxpYyBmbGF0cGlja3JPbkNoYW5nZTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25DbG9zZSBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBjbG9zZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25DbG9zZScgKSBwdWJsaWMgZmxhdHBpY2tyT25DbG9zZTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25PcGVuIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbGVuZGFyIGlzIG9wZW5lZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBPdXRwdXQoICdvbk9wZW4nICkgcHVibGljIGZsYXRwaWNrck9uT3BlbjogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKipcblx0ICogb25SZWFkeSBnZXRzIHRyaWdnZXJlZCBvbmNlIHRoZSBjYWxlbmRhciBpcyBpbiBhIHJlYWR5IHN0YXRlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uUmVhZHknICkgcHVibGljIGZsYXRwaWNrck9uUmVhZHk6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0LyoqIEFsbG93IGRvdWJsZS1jbGlja2luZyBvbiB0aGUgY29udHJvbCB0byBvcGVuL2Nsb3NlIGl0LiAqL1xuXHRASG9zdExpc3RlbmVyKCAnZGJsY2xpY2snIClcblx0cHVibGljIG9uQ2xpY2soKSB7XG5cdFx0dGhpcy5mbGF0cGlja3IudG9nZ2xlKCk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2xvYmFsT25DaGFuZ2U6IEZ1bmN0aW9uO1xuXHRwcm90ZWN0ZWQgZ2xvYmFsT25DbG9zZTogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPbk9wZW46IEZ1bmN0aW9uO1xuXHRwcm90ZWN0ZWQgZ2xvYmFsT25SZWFkeTogRnVuY3Rpb247XG5cblx0cHJvdGVjdGVkIGZsYXRwaWNrcjogRmxhdHBpY2tySW5zdGFuY2U7XG5cdHByb3RlY3RlZCBmb3JtQ29udHJvbExpc3RlbmVyOiBTdWJzY3JpcHRpb247XG5cblx0LyoqIEFsbG93IGFjY2VzcyBwcm9wZXJ0aWVzIHVzaW5nIGluZGV4IG5vdGF0aW9uICovXG5cdFtrZXk6c3RyaW5nXTogYW55O1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByb3RlY3RlZCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG5cdFx0cHJvdGVjdGVkIG5nQ29udHJvbDogTmdDb250cm9sLFxuXHRcdHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLFxuXHRcdHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyXG5cdCkge31cblxuXHRnZXQgY29udHJvbCgpOiBGb3JtQ29udHJvbCB7XG5cdFx0cmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZm9ybURpcmVjdGl2ZS5nZXRDb250cm9sKHRoaXMubmdDb250cm9sKSA6IG51bGw7XG5cdH1cblxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XG5cdFx0LyoqIFdlIGNhbm5vdCBpbml0aWFsaXplIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UgaW4gbmdPbkluaXQoKTsgaXQgd2lsbFxuXHRcdFx0cmFuZG9taXplIHRoZSBkYXRlIHdoZW4gdGhlIGZvcm0gY29udHJvbCBpbml0aWFsaXplcy4gKi9cblx0XHRsZXQgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG5cdFx0aWYgKHR5cGVvZiBuYXRpdmVFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCBuYXRpdmVFbGVtZW50ID09PSBudWxsKSB7XG5cdFx0XHR0aHJvdyAnRXJyb3I6IGludmFsaWQgaW5wdXQgZWxlbWVudCBzcGVjaWZpZWQnO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZsYXRwaWNrck9wdGlvbnMud3JhcCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZGF0YS1pbnB1dCcsICcnICk7XG5cdFx0XHRuYXRpdmVFbGVtZW50ID0gbmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdHRoaXMuZmxhdHBpY2tyID0gPEZsYXRwaWNrckluc3RhbmNlPm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKCBjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICkge1xuXHRcdGlmKCB0aGlzLmZsYXRwaWNrclxuXHRcdFx0JiYgdGhpcy5mbGF0cGlja3JBbHRJbnB1dFxuXHRcdFx0JiYgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSggJ3BsYWNlaG9sZGVyJyApIFxuXHRcdFx0JiYgY2hhbmdlc1sgJ3BsYWNlaG9sZGVyJyBdLmN1cnJlbnRWYWx1ZSApIHtcblx0XHRcdFx0dGhpcy5mbGF0cGlja3IuYWx0SW5wdXQuc2V0QXR0cmlidXRlKCAncGxhY2Vob2xkZXInLCBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICk7XG5cdFx0XHR9XG5cdH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHRpZiAodGhpcy5mbGF0cGlja3IpIHtcblx0XHRcdHRoaXMuZmxhdHBpY2tyLmRlc3Ryb3koKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5mb3JtQ29udHJvbExpc3RlbmVyKSB7XG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIudW5zdWJzY3JpYmUoKTtcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHR0aGlzLmZsYXRwaWNrck9uQ2hhbmdlID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25DbG9zZSA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmZsYXRwaWNrck9uT3BlbiA9IHVuZGVmaW5lZDtcblx0XHR0aGlzLmZsYXRwaWNrck9uUmVhZHkgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmdsb2JhbE9uQ2hhbmdlID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uQ2hhbmdlO1xuXHRcdHRoaXMuZ2xvYmFsT25DbG9zZSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbkNsb3NlO1xuXHRcdHRoaXMuZ2xvYmFsT25PcGVuID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uT3Blbjtcblx0XHR0aGlzLmdsb2JhbE9uUmVhZHkgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25SZWFkeTtcblxuXHRcdHRoaXMuZmxhdHBpY2tyT3B0aW9ucyA9IHtcblx0XHRcdGFsdEZvcm1hdDogdGhpcy5nZXRPcHRpb24oJ2FsdEZvcm1hdCcpLFxuXHRcdFx0YWx0SW5wdXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbHRJbnB1dCcpLFxuXHRcdFx0YWx0SW5wdXRDbGFzczogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0Q2xhc3MnKSxcblx0XHRcdGFsbG93SW5wdXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbGxvd0lucHV0JyksXG5cdFx0XHRhcHBlbmRUbzogdGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJyksXG5cdFx0XHRjbGlja09wZW5zOiB0aGlzLmdldE9wdGlvbignY2xpY2tPcGVucycsIHRydWUpLFxuXHRcdFx0ZGF0ZUZvcm1hdDogdGhpcy5nZXRPcHRpb24oJ2RhdGVGb3JtYXQnKSxcblx0XHRcdGRlZmF1bHREYXRlOiB0aGlzLmdldE9wdGlvbignZGVmYXVsdERhdGUnKSxcblx0XHRcdGRpc2FibGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlJyksXG5cdFx0XHRkaXNhYmxlTW9iaWxlOiB0aGlzLmdldE9wdGlvbignZGlzYWJsZU1vYmlsZScpLFxuXHRcdFx0ZW5hYmxlOiB0aGlzLmdldE9wdGlvbignZW5hYmxlJyksXG5cdFx0XHRlbmFibGVUaW1lOiB0aGlzLmdldE9wdGlvbignZW5hYmxlVGltZScpLFxuXHRcdFx0ZW5hYmxlU2Vjb25kczogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZVNlY29uZHMnKSxcblx0XHRcdGhvdXJJbmNyZW1lbnQ6IHRoaXMuZ2V0T3B0aW9uKCdob3VySW5jcmVtZW50JyksXG5cdFx0XHRpbmxpbmU6IHRoaXMuZ2V0T3B0aW9uKCdpbmxpbmUnKSxcblx0XHRcdGxvY2FsZTogdGhpcy5nZXRPcHRpb24oJ2xvY2FsZScpLFxuXHRcdFx0bWF4RGF0ZTogdGhpcy5nZXRPcHRpb24oJ21heERhdGUnKSxcblx0XHRcdG1pbkRhdGU6IHRoaXMuZ2V0T3B0aW9uKCdtaW5EYXRlJyksXG5cdFx0XHRtaW51dGVJbmNyZW1lbnQ6IHRoaXMuZ2V0T3B0aW9uKCdtaW51dGVJbmNyZW1lbnQnKSxcblx0XHRcdG1vZGU6IHRoaXMuZ2V0T3B0aW9uKCdtb2RlJyksXG5cdFx0XHRuZXh0QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCduZXh0QXJyb3cnKSxcblx0XHRcdG5vQ2FsZW5kYXI6IHRoaXMuZ2V0T3B0aW9uKCdub0NhbGVuZGFyJyksXG5cdFx0XHRvbkNoYW5nZTogdGhpcy5ldmVudE9uQ2hhbmdlLmJpbmQodGhpcyksXG5cdFx0XHRvbkNsb3NlOiB0aGlzLmV2ZW50T25DbG9zZS5iaW5kKHRoaXMpLFxuXHRcdFx0b25PcGVuOiB0aGlzLmV2ZW50T25PcGVuLmJpbmQodGhpcyksXG5cdFx0XHRvblJlYWR5OiB0aGlzLmV2ZW50T25SZWFkeS5iaW5kKHRoaXMpLFxuXHRcdFx0cGFyc2VEYXRlOiB0aGlzLmdldE9wdGlvbigncGFyc2VEYXRlJyksXG5cdFx0XHRwcmV2QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCdwcmV2QXJyb3cnKSxcblx0XHRcdHNob3J0aGFuZEN1cnJlbnRNb250aDogdGhpcy5nZXRPcHRpb24oJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcpLFxuXHRcdFx0c3RhdGljOiB0aGlzLmdldE9wdGlvbignc3RhdGljJyksXG5cdFx0XHR0aW1lXzI0aHI6IHRoaXMuZ2V0T3B0aW9uKCd0aW1lXzI0aHInKSxcblx0XHRcdHV0YzogdGhpcy5nZXRPcHRpb24oJ3V0YycpLFxuXHRcdFx0d2Vla051bWJlcnM6IHRoaXMuZ2V0T3B0aW9uKCd3ZWVrTnVtYmVycycpLFxuXHRcdFx0d3JhcDogdGhpcy5nZXRPcHRpb24oJ3dyYXAnLCB0cnVlKSxcblx0XHR9O1xuXG5cdFx0Ly8gUmVtb3ZlIHVuc2V0IHByb3BlcnRpZXNcblx0XHRPYmplY3Qua2V5cyggdGhpcy5mbGF0cGlja3JPcHRpb25zICkuZm9yRWFjaCggKCBrZXk6IHN0cmluZyApID0+IHtcblx0XHRcdCh0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkKSAmJlxuXHRcdFx0XHRkZWxldGUgdGhpcy5mbGF0cGlja3JPcHRpb25zW2tleV07XG5cdFx0fSApO1xuXG5cdFx0aWYgKHRoaXMuY29udHJvbCkge1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdGhpcy5jb250cm9sLnZhbHVlQ2hhbmdlc1xuXHRcdFx0XHQuc3Vic2NyaWJlKCAoIHZhbHVlOiBhbnkgKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCAhKCB2YWx1ZSBpbnN0YW5jZW9mIERhdGUgKSApIHtcblx0XHRcdFx0XHRcdC8vIFF1aWV0bHkgdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBjb250cm9sIHRvIGJlIGFcblx0XHRcdFx0XHRcdC8vIERhdGUgb2JqZWN0LiBUaGlzIGF2b2lkcyBhbnkgZXh0ZXJuYWwgc3Vic2NyaWJlcnNcblx0XHRcdFx0XHRcdC8vIGZyb20gYmVpbmcgbm90aWZpZWQgYSBzZWNvbmQgdGltZSAob25jZSBmb3IgdGhlIHVzZXJcblx0XHRcdFx0XHRcdC8vIGluaXRpYXRlZCBldmVudCwgYW5kIG9uY2UgZm9yIG91ciBjb252ZXJzaW9uIHRvXG5cdFx0XHRcdFx0XHQvLyBEYXRlKCkpLlxuXHRcdFx0XHRcdFx0dGhpcy5jb250cm9sLnNldFZhbHVlKCBuZXcgRGF0ZSggJycgKyB2YWx1ZSApLCB7XG5cdFx0XHRcdFx0XHRcdG9ubHlTZWxmOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRlbWl0RXZlbnQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlXG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uQ2hhbmdlIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25DaGFuZ2UoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uQ2hhbmdlICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbkNoYW5nZS5lbWl0KCBldmVudCApO1xuXHRcdH1cblx0XHRpZiggdGhpcy5nbG9iYWxPbkNoYW5nZSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UoIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uQ2xvc2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPbkNsb3NlKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbkNsb3NlICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlLmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uQ2xvc2UgKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uQ2xvc2UoIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uT3BlbiBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uT3Blbiggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25PcGVuICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPbk9wZW4uZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25PcGVuICkge1xuXHRcdFx0dGhpcy5nbG9iYWxPbk9wZW4oIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcblx0ICogZ2xvYmFsIG9uUmVhZHkgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPblJlYWR5KCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPblJlYWR5ICkge1xuXHRcdFx0dGhpcy5mbGF0cGlja3JPblJlYWR5LmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uUmVhZHkgKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uUmVhZHkoIGV2ZW50ICk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZSBmb3Igb3B0aW9uIHtvcHRpb259LCBvciB7ZGVmYXVsdFZhbHVlfSBpZiBpdFxuXHQgKiBkb2Vzbid0IGV4aXN0LlxuXHQgKi9cblx0cHJvdGVjdGVkIGdldE9wdGlvbiggb3B0aW9uOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSApOiBhbnkge1xuXHRcdGxldCBsb2NhbE5hbWUgPSAnZmxhdHBpY2tyJyArIG9wdGlvbi5zdWJzdHJpbmcoIDAsIDEgKS50b1VwcGVyQ2FzZSgpXG5cdFx0XHQrIG9wdGlvbi5zdWJzdHJpbmcoIDEgKTtcblxuXHRcdGlmICggdHlwZW9mIHRoaXNbbG9jYWxOYW1lXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tsb2NhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5mbGF0cGlja3JPcHRpb25zW29wdGlvbl07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9XG59XG4iXX0=