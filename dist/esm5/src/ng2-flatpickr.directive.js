import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
var Ng2FlatpickrDirective = /** @class */ (function () {
    function Ng2FlatpickrDirective(parent, ngControl, element, renderer) {
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
    Ng2FlatpickrDirective.prototype.onClick = function () {
        this.flatpickr.toggle();
    };
    Object.defineProperty(Ng2FlatpickrDirective.prototype, "control", {
        get: function () {
            return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
        },
        enumerable: true,
        configurable: true
    });
    Ng2FlatpickrDirective.prototype.ngAfterViewInit = function () {
        /** We cannot initialize the flatpickr instance in ngOnInit(); it will
            randomize the date when the form control initializes. */
        var nativeElement = this.element.nativeElement;
        if (typeof nativeElement === 'undefined' || nativeElement === null) {
            throw 'Error: invalid input element specified';
        }
        if (this.flatpickrOptions.wrap) {
            this.renderer.setAttribute(this.element.nativeElement, 'data-input', '');
            nativeElement = nativeElement.parentNode;
        }
        this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
    };
    Ng2FlatpickrDirective.prototype.ngOnChanges = function (changes) {
        if (this.flatpickr
            && this.flatpickrAltInput
            && changes.hasOwnProperty('placeholder')
            && changes['placeholder'].currentValue) {
            this.flatpickr.altInput.setAttribute('placeholder', changes['placeholder'].currentValue);
        }
    };
    Ng2FlatpickrDirective.prototype.ngOnDestroy = function () {
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
    };
    Ng2FlatpickrDirective.prototype.ngOnInit = function () {
        var _this = this;
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
        Object.keys(this.flatpickrOptions).forEach(function (key) {
            (_this.flatpickrOptions[key] === undefined) &&
                delete _this.flatpickrOptions[key];
        });
        if (this.control) {
            this.formControlListener = this.control.valueChanges
                .subscribe(function (value) {
                if (!(value instanceof Date)) {
                    // Quietly update the value of the form control to be a
                    // Date object. This avoids any external subscribers
                    // from being notified a second time (once for the user
                    // initiated event, and once for our conversion to
                    // Date()).
                    _this.control.setValue(new Date('' + value), {
                        onlySelf: true,
                        emitEvent: false,
                        emitModelToViewChange: false,
                        emitViewToModelChange: false
                    });
                }
            });
        }
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onChange callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnChange = function (selectedDates, dateStr, instance) {
        var event = {
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
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onClose callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnClose = function (selectedDates, dateStr, instance) {
        var event = {
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
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onOpen callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnOpen = function (selectedDates, dateStr, instance) {
        var event = {
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
    };
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onReady callback, if defined.
     */
    Ng2FlatpickrDirective.prototype.eventOnReady = function (selectedDates, dateStr, instance) {
        var event = {
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
    };
    /**
     * Return the configuration value for option {option}, or {defaultValue} if it
     * doesn't exist.
     */
    Ng2FlatpickrDirective.prototype.getOption = function (option, defaultValue) {
        var localName = 'flatpickr' + option.substring(0, 1).toUpperCase()
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
    };
    Ng2FlatpickrDirective.ɵfac = function Ng2FlatpickrDirective_Factory(t) { return new (t || Ng2FlatpickrDirective)(i0.ɵɵdirectiveInject(i1.ControlContainer), i0.ɵɵdirectiveInject(i1.NgControl), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
    Ng2FlatpickrDirective.ɵdir = i0.ɵɵdefineDirective({ type: Ng2FlatpickrDirective, selectors: [["", "flatpickr", ""]], hostBindings: function Ng2FlatpickrDirective_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("dblclick", function Ng2FlatpickrDirective_dblclick_HostBindingHandler() { return ctx.onClick(); });
        } }, inputs: { flatpickrOptions: ["flatpickr", "flatpickrOptions"], placeholder: "placeholder", flatpickrAltFormat: ["altFormat", "flatpickrAltFormat"], flatpickrAltInput: ["altInput", "flatpickrAltInput"], flatpickrAltInputClass: ["altInputClass", "flatpickrAltInputClass"], flatpickrAllowInput: ["allowInput", "flatpickrAllowInput"], flatpickrAppendTo: ["appendTo", "flatpickrAppendTo"], flatpickrClickOpens: ["clickOpens", "flatpickrClickOpens"], flatpickrDateFormat: ["dateFormat", "flatpickrDateFormat"], flatpickrDefaultDate: ["defaultDate", "flatpickrDefaultDate"], flatpickrDisable: ["disable", "flatpickrDisable"], flatpickrDisableMobile: ["disableMobile", "flatpickrDisableMobile"], flatpickrEnable: ["enable", "flatpickrEnable"], flatpickrEnableTime: ["enableTime", "flatpickrEnableTime"], flatpickrEnableSeconds: ["enableSeconds", "flatpickrEnableSeconds"], flatpickrHourIncrement: ["hourIncrement", "flatpickrHourIncrement"], flatpickrInline: ["inline", "flatpickrInline"], flatpickrLocale: ["locale", "flatpickrLocale"], flatpickrMaxDate: ["maxDate", "flatpickrMaxDate"], flatpickrMinDate: ["minDate", "flatpickrMinDate"], flatpickrMinuteIncrement: ["minuteIncrement", "flatpickrMinuteIncrement"], flatpickrMode: ["mode", "flatpickrMode"], flatpickrNextArrow: ["nextArrow", "flatpickrNextArrow"], flatpickrNoCalendar: ["noCalendar", "flatpickrNoCalendar"], flatpickrParseDate: ["parseDate", "flatpickrParseDate"], flatpickrPrevArrow: ["prevArrow", "flatpickrPrevArrow"], flatpickrShorthandCurrentMonth: ["shorthandCurrentMonth", "flatpickrShorthandCurrentMonth"], flatpickrStatic: ["static", "flatpickrStatic"], flatpickrTime_24hr: ["time_24hr", "flatpickrTime_24hr"], flatpickrUtc: ["utc", "flatpickrUtc"], flatpickrWeekNumbers: ["weekNumbers", "flatpickrWeekNumbers"], flatpickrWrap: ["wrap", "flatpickrWrap"] }, outputs: { flatpickrOnChange: "onChange", flatpickrOnClose: "onClose", flatpickrOnOpen: "onOpen", flatpickrOnReady: "onReady" }, exportAs: ["ng2-flatpickr"], features: [i0.ɵɵNgOnChangesFeature] });
    return Ng2FlatpickrDirective;
}());
export { Ng2FlatpickrDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItZmxhdHBpY2tyLyIsInNvdXJjZXMiOlsic3JjL25nMi1mbGF0cGlja3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDUyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUNwRCxNQUFNLEVBQUUsU0FBUyxFQUNwQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQWUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU0xRTtJQTRSQywrQkFDVyxNQUF3QixFQUN4QixTQUFvQixFQUNwQixPQUFtQixFQUNuQixRQUFtQjtRQUhuQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWpEOUI7Ozs7V0FJRztRQUMwQixzQkFBaUIsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsRzs7OztXQUlHO1FBQ3lCLHFCQUFnQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhHOzs7O1dBSUc7UUFDd0Isb0JBQWUsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5Rjs7OztXQUlHO1FBQ3lCLHFCQUFnQixHQUFpQyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBd0I3RixDQUFDO0lBdEJKLDZEQUE2RDtJQUV0RCx1Q0FBTyxHQURkO1FBRUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBb0JELHNCQUFJLDBDQUFPO2FBQVg7WUFDQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxD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QUFLO21CQUFFLFdBQVc7O2tCQUVsQixLQUFLO21CQUFFLEtBQUs7O2tCQU9aLEtBQUs7bUJBQUUsYUFBYTs7a0JBT3BCLEtBQUs7bUJBQUUsTUFBTTs7a0JBT2IsTUFBTTttQkFBRSxVQUFVOztrQkFPbEIsTUFBTTttQkFBRSxTQUFTOztrQkFPakIsTUFBTTttQkFBRSxRQUFROztrQkFPaEIsTUFBTTttQkFBRSxTQUFTOztrQkFHakIsWUFBWTttQkFBRSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsXG5cdE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbENvbnRhaW5lciwgRm9ybUNvbnRyb2wsIE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmxhdHBpY2tyRXZlbnQgfSBmcm9tICcuL2ZsYXRwaWNrci1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRmxhdHBpY2tySW5zdGFuY2UgfSBmcm9tICcuL2ZsYXRwaWNrci1pbnN0YW5jZSc7XG5pbXBvcnQgeyBGbGF0cGlja3JPcHRpb25zIH0gZnJvbSAnLi9mbGF0cGlja3Itb3B0aW9ucy5pbnRlcmZhY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbZmxhdHBpY2tyXScsIGV4cG9ydEFzOiAnbmcyLWZsYXRwaWNrcicgfSlcbmV4cG9ydCBjbGFzcyBOZzJGbGF0cGlja3JEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT25DaGFuZ2VzIHtcblx0LyoqXG5cdCAqIFRoZSBmbGF0cGlja3IgY29uZmlndXJhdGlvbiBhcyBhIHNpbmdsZSBvYmplY3Qgb2YgdmFsdWVzLlxuXHQgKlxuXHQgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL29wdGlvbnMvIGZvciBmdWxsIGxpc3QuXG5cdCAqL1xuXHRASW5wdXQoICdmbGF0cGlja3InICkgcHVibGljIGZsYXRwaWNrck9wdGlvbnM6IEZsYXRwaWNrck9wdGlvbnM7XG5cblx0LyoqXG5cdCAqIFBsYWNlaG9sZGVyIGZvciBpbnB1dCBmaWVsZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ3BsYWNlaG9sZGVyJyApIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBFeGFjdGx5IHRoZSBzYW1lIGFzIGRhdGUgZm9ybWF0LCBidXQgZm9yIHRoZSBhbHRJbnB1dCBmaWVsZC5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiRiBqLCBZXCJcblx0ICovXG5cdEBJbnB1dCggJ2FsdEZvcm1hdCcgKSBwdWJsaWMgZmxhdHBpY2tyQWx0Rm9ybWF0OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNob3cgdGhlIHVzZXIgYSByZWFkYWJsZSBkYXRlIChhcyBwZXIgYWx0Rm9ybWF0KSwgYnV0IHJldHVybiBzb21ldGhpbmdcblx0ICogdG90YWxseSBkaWZmZXJlbnQgdG8gdGhlIHNlcnZlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdhbHRJbnB1dCcgKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXQ6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoaXMgY2xhc3Mgd2lsbCBiZSBhZGRlZCB0byB0aGUgaW5wdXQgZWxlbWVudCBjcmVhdGVkIGJ5IHRoZSBhbHRJbnB1dFxuXHQgKiBvcHRpb24uXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIlwiXG5cdCAqL1xuXHRASW5wdXQoICdhbHRJbnB1dENsYXNzJyApIHB1YmxpYyBmbGF0cGlja3JBbHRJbnB1dENsYXNzOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEFsbG93cyB0aGUgdXNlciB0byBlbnRlciBhIGRhdGUgZGlyZWN0bHkgaW5wdXQgdGhlIGlucHV0IGZpZWxkLiBCeVxuXHQgKiBkZWZhdWx0LCBkaXJlY3QgZW50cnkgaXMgZGlzYWJsZWQuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnYWxsb3dJbnB1dCcgKSBwdWJsaWMgZmxhdHBpY2tyQWxsb3dJbnB1dDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogSW5zdGVhZCBvZiBib2R5LCBhcHBlbmRzIHRoZSBjYWxlbmRhciB0byB0aGUgc3BlY2lmaWVkIG5vZGUgaW5zdGVhZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ2FwcGVuZFRvJyApIHB1YmxpYyBmbGF0cGlja3JBcHBlbmRUbzogYW55OyAvLyBIVE1MRWxlbWVudFxuXG5cdC8qKlxuXHQgKiBXaGV0aGVyIGNsaWNraW5nIG9uIHRoZSBpbnB1dCBzaG91bGQgb3BlbiB0aGUgcGlja2VyLlxuXHQgKiBZb3UgY291bGQgZGlzYWJsZSB0aGlzIGlmIHlvdSB3aXNoIHRvIG9wZW4gdGhlIGNhbGVuZGFyIG1hbnVhbGx5XG5cdCAqIHdpdGgub3BlbigpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgdHJ1ZVxuXHQgKi9cblx0QElucHV0KCAnY2xpY2tPcGVucycgKSBwdWJsaWMgZmxhdHBpY2tyQ2xpY2tPcGVuczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQSBzdHJpbmcgb2YgY2hhcmFjdGVycyB3aGljaCBhcmUgdXNlZCB0byBkZWZpbmUgaG93IHRoZSBkYXRlIHdpbGwgYmVcblx0ICogZGlzcGxheWVkIGluIHRoZSBpbnB1dCBib3guXG5cdCAqIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZm9ybWF0dGluZy8gZm9yIHN1cHBvcnRlZCB0b2tlbnMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBcIlktbS1kXCJcblx0ICovXG5cdEBJbnB1dCggJ2RhdGVGb3JtYXQnICkgcHVibGljIGZsYXRwaWNrckRhdGVGb3JtYXQ6IHN0cmluZztcblxuXHQvKipcblx0ICogU2V0cyB0aGUgaW5pdGlhbCBzZWxlY3RlZCBkYXRlKHMpLlxuXHQgKlxuXHQgKiBJZiB5b3UncmUgdXNpbmcge21vZGU6IFwibXVsdGlwbGVcIn0gb3IgYSByYW5nZSBjYWxlbmRhciBzdXBwbHkgYW4gQXJyYXkgb2Zcblx0ICogRGF0ZSBvYmplY3RzIG9yIGFuIEFycmF5IG9mIGRhdGUgc3RyaW5ncyB3aGljaCBmb2xsb3cgeW91ciBkYXRlRm9ybWF0LlxuXHQgKlxuXHQgKiBPdGhlcndpc2UsIHlvdSBjYW4gc3VwcGx5IGEgc2luZ2xlIERhdGUgb2JqZWN0IG9yIGEgZGF0ZSBzdHJpbmcuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRASW5wdXQoICdkZWZhdWx0RGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyRGVmYXVsdERhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIERpc2FibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZGlzYWJsZVxuXHQgKiBkYXRlcy4gU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9leGFtcGxlcy8jZGlzYWJsaW5nLXNwZWNpZmljLWRhdGVzXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBbXVxuXHQgKi9cblx0QElucHV0KCAnZGlzYWJsZScgKSBwdWJsaWMgZmxhdHBpY2tyRGlzYWJsZTogc3RyaW5nW10gfCBEYXRlW107XG5cblx0LyoqXG5cdCAqIFNldCBkaXNhYmxlTW9iaWxlIHRvIHRydWUgdG8gYWx3YXlzIHVzZSB0aGUgbm9uLW5hdGl2ZSBwaWNrZXIuIEJ5XG5cdCAqIGRlZmF1bHQsIEZsYXRwaWNrciB1dGlsaXplcyBuYXRpdmUgZGF0ZXRpbWUgd2lkZ2V0cyB1bmxlc3MgY2VydGFpblxuXHQgKiBvcHRpb25zIChlLmcuIGRpc2FibGUpIGFyZSB1c2VkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ2Rpc2FibGVNb2JpbGUnICkgcHVibGljIGZsYXRwaWNrckRpc2FibGVNb2JpbGU6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEVuYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBlbmFibGVcblx0ICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1hbGwtZGF0ZXMtZXhjZXB0LXNlbGVjdC1mZXdcblx0ICpcblx0ICogRGVmYXVsdDogIFtdXG5cdCAqL1xuXHRASW5wdXQoICdlbmFibGUnICkgcHVibGljIGZsYXRwaWNrckVuYWJsZTogc3RyaW5nW10gfCBEYXRlW107XG5cblx0LyoqXG5cdCAqIEVuYWJsZXMgdGltZSBwaWNrZXIuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnZW5hYmxlVGltZScgKSBwdWJsaWMgZmxhdHBpY2tyRW5hYmxlVGltZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRW5hYmxlcyBzZWNvbmRzIGluIHRoZSB0aW1lIHBpY2tlci5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdlbmFibGVTZWNvbmRzJyApIHB1YmxpYyBmbGF0cGlja3JFbmFibGVTZWNvbmRzOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgaG91ciBpbnB1dCAoaW5jbC4gc2Nyb2xsaW5nKS5cblx0ICpcblx0ICogRGVmYXVsdDogIDFcblx0ICovXG5cdEBJbnB1dCggJ2hvdXJJbmNyZW1lbnQnICkgcHVibGljIGZsYXRwaWNrckhvdXJJbmNyZW1lbnQ6IG51bWJlcjtcblxuXHQvKipcblx0ICogRGlzcGxheXMgdGhlIGNhbGVuZGFyIGlubGluZS5cblx0ICpcblx0ICogRGVmYXVsdDogIGZhbHNlXG5cdCAqL1xuXHRASW5wdXQoICdpbmxpbmUnICkgcHVibGljIGZsYXRwaWNrcklubGluZTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVXNlIGEgc3BlY2lmaWMgbG9jYWxlIGZvciB0aGUgZmxhdHBpY2tyIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QElucHV0KCAnbG9jYWxlJyApIHB1YmxpYyBmbGF0cGlja3JMb2NhbGU6IE9iamVjdDtcblxuXHQvKipcblx0ICogVGhlIG1heGltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gcGljayB0byAoaW5jbHVzaXZlKS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ21heERhdGUnICkgcHVibGljIGZsYXRwaWNrck1heERhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIFRoZSBtaW5pbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHN0YXJ0IHBpY2tpbmcgZnJvbSAoaW5jbHVzaXZlKS5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBJbnB1dCggJ21pbkRhdGUnICkgcHVibGljIGZsYXRwaWNrck1pbkRhdGU6IHN0cmluZyB8IERhdGU7XG5cblx0LyoqXG5cdCAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBtaW51dGUgaW5wdXQgKGluY2wuIHNjcm9sbGluZykuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICA1XG5cdCAqL1xuXHRASW5wdXQoICdtaW51dGVJbmNyZW1lbnQnICkgcHVibGljIGZsYXRwaWNrck1pbnV0ZUluY3JlbWVudDogbnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBcInNpbmdsZVwiLCBcIm11bHRpcGxlXCIsIG9yIFwicmFuZ2VcIlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCJzaW5nbGVcIlxuXHQgKi9cblx0QElucHV0KCAnbW9kZScgKSBwdWJsaWMgZmxhdHBpY2tyTW9kZTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBIVE1MIGZvciB0aGUgYXJyb3cgaWNvbiwgdXNlZCB0byBzd2l0Y2ggbW9udGhzLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgXCI+XCJcblx0ICovXG5cdEBJbnB1dCggJ25leHRBcnJvdycgKSBwdWJsaWMgZmxhdHBpY2tyTmV4dEFycm93OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEhpZGVzIHRoZSBkYXkgc2VsZWN0aW9uIGluIGNhbGVuZGFyLiBVc2UgaXQgYWxvbmcgd2l0aCBlbmFibGVUaW1lIHRvXG5cdCAqIGNyZWF0ZSBhIHRpbWUgcGlja2VyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ25vQ2FsZW5kYXInICkgcHVibGljIGZsYXRwaWNrck5vQ2FsZW5kYXI6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIEZ1bmN0aW9uIHRoYXQgZXhwZWN0cyBhIGRhdGUgc3RyaW5nIGFuZCBtdXN0IHJldHVybiBhIERhdGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3BhcnNlRGF0ZScgKSBwdWJsaWMgZmxhdHBpY2tyUGFyc2VEYXRlOiBGdW5jdGlvbjtcblxuXHQvKipcblx0ICogSFRNTCBmb3IgdGhlIGxlZnQgYXJyb3cgaWNvbi5cblx0ICpcblx0ICogRGVmYXVsdDogIFwiPFwiXG5cdCAqL1xuXHRASW5wdXQoICdwcmV2QXJyb3cnICkgcHVibGljIGZsYXRwaWNrclByZXZBcnJvdzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBTaG93IHRoZSBtb250aCB1c2luZyB0aGUgc2hvcnRoYW5kIHZlcnNpb24gKGllLCBTZXAgaW5zdGVhZCBvZiBTZXB0ZW1iZXIpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcgKSBwdWJsaWMgZmxhdHBpY2tyU2hvcnRoYW5kQ3VycmVudE1vbnRoOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBQb3NpdGlvbiB0aGUgY2FsZW5kYXIgaW5zaWRlIHRoZSB3cmFwcGVyIGFuZCBuZXh0IHRvIHRoZSBpbnB1dCBlbGVtZW50XG5cdCAqIChMZWF2ZSBmYWxzZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmcpLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3N0YXRpYycgKSBwdWJsaWMgZmxhdHBpY2tyU3RhdGljOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBEaXNwbGF5cyB0aW1lIHBpY2tlciBpbiAyNCBob3VyIG1vZGUgd2l0aG91dCBBTS9QTSBzZWxlY3Rpb24gd2hlbiBlbmFibGVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3RpbWVfMjRocicgKSBwdWJsaWMgZmxhdHBpY2tyVGltZV8yNGhyOiBib29sZWFuO1xuXG5cdEBJbnB1dCggJ3V0YycgKSBwdWJsaWMgZmxhdHBpY2tyVXRjOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBFbmFibGVzIGRpc3BsYXkgb2Ygd2VlayBudW1iZXJzIGluIGNhbGVuZGFyLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgZmFsc2Vcblx0ICovXG5cdEBJbnB1dCggJ3dlZWtOdW1iZXJzJyApIHB1YmxpYyBmbGF0cGlja3JXZWVrTnVtYmVyczogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ3VzdG9tIGVsZW1lbnRzIGFuZCBpbnB1dCBncm91cHMuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBmYWxzZVxuXHQgKi9cblx0QElucHV0KCAnd3JhcCcgKSBwdWJsaWMgZmxhdHBpY2tyV3JhcDogYm9vbGVhbjtcblxuXHQvKipcblx0ICogb25DaGFuZ2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgdXNlciBzZWxlY3RzIGEgZGF0ZSwgb3IgY2hhbmdlcyB0aGUgdGltZSBvbiBhIHNlbGVjdGVkIGRhdGUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25DaGFuZ2UnICkgcHVibGljIGZsYXRwaWNrck9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvbkNsb3NlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIGNhbGVuZGFyIGlzIGNsb3NlZC5cblx0ICpcblx0ICogRGVmYXVsdDogIG51bGxcblx0ICovXG5cdEBPdXRwdXQoICdvbkNsb3NlJyApIHB1YmxpYyBmbGF0cGlja3JPbkNsb3NlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvbk9wZW4gZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgb3BlbmVkLlxuXHQgKlxuXHQgKiBEZWZhdWx0OiAgbnVsbFxuXHQgKi9cblx0QE91dHB1dCggJ29uT3BlbicgKSBwdWJsaWMgZmxhdHBpY2tyT25PcGVuOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdC8qKlxuXHQgKiBvblJlYWR5IGdldHMgdHJpZ2dlcmVkIG9uY2UgdGhlIGNhbGVuZGFyIGlzIGluIGEgcmVhZHkgc3RhdGUuXG5cdCAqXG5cdCAqIERlZmF1bHQ6ICBudWxsXG5cdCAqL1xuXHRAT3V0cHV0KCAnb25SZWFkeScgKSBwdWJsaWMgZmxhdHBpY2tyT25SZWFkeTogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXHQvKiogQWxsb3cgZG91YmxlLWNsaWNraW5nIG9uIHRoZSBjb250cm9sIHRvIG9wZW4vY2xvc2UgaXQuICovXG5cdEBIb3N0TGlzdGVuZXIoICdkYmxjbGljaycgKVxuXHRwdWJsaWMgb25DbGljaygpIHtcblx0XHR0aGlzLmZsYXRwaWNrci50b2dnbGUoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBnbG9iYWxPbkNoYW5nZTogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPbkNsb3NlOiBGdW5jdGlvbjtcblx0cHJvdGVjdGVkIGdsb2JhbE9uT3BlbjogRnVuY3Rpb247XG5cdHByb3RlY3RlZCBnbG9iYWxPblJlYWR5OiBGdW5jdGlvbjtcblxuXHRwcm90ZWN0ZWQgZmxhdHBpY2tyOiBGbGF0cGlja3JJbnN0YW5jZTtcblx0cHJvdGVjdGVkIGZvcm1Db250cm9sTGlzdGVuZXI6IFN1YnNjcmlwdGlvbjtcblxuXHQvKiogQWxsb3cgYWNjZXNzIHByb3BlcnRpZXMgdXNpbmcgaW5kZXggbm90YXRpb24gKi9cblx0W2tleTpzdHJpbmddOiBhbnk7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJvdGVjdGVkIHBhcmVudDogQ29udHJvbENvbnRhaW5lcixcblx0XHRwcm90ZWN0ZWQgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG5cdFx0cHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG5cdFx0cHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjJcblx0KSB7fVxuXG5cdGdldCBjb250cm9sKCk6IEZvcm1Db250cm9sIHtcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5mb3JtRGlyZWN0aXZlLmdldENvbnRyb2wodGhpcy5uZ0NvbnRyb2wpIDogbnVsbDtcblx0fVxuXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblx0XHQvKiogV2UgY2Fubm90IGluaXRpYWxpemUgdGhlIGZsYXRwaWNrciBpbnN0YW5jZSBpbiBuZ09uSW5pdCgpOyBpdCB3aWxsXG5cdFx0XHRyYW5kb21pemUgdGhlIGRhdGUgd2hlbiB0aGUgZm9ybSBjb250cm9sIGluaXRpYWxpemVzLiAqL1xuXHRcdGxldCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cblx0XHRpZiAodHlwZW9mIG5hdGl2ZUVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8IG5hdGl2ZUVsZW1lbnQgPT09IG51bGwpIHtcblx0XHRcdHRocm93ICdFcnJvcjogaW52YWxpZCBpbnB1dCBlbGVtZW50IHNwZWNpZmllZCc7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZmxhdHBpY2tyT3B0aW9ucy53cmFwKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSggdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkYXRhLWlucHV0JywgJycgKTtcblx0XHRcdG5hdGl2ZUVsZW1lbnQgPSBuYXRpdmVFbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5mbGF0cGlja3IgPSA8RmxhdHBpY2tySW5zdGFuY2U+bmF0aXZlRWxlbWVudC5mbGF0cGlja3IoIHRoaXMuZmxhdHBpY2tyT3B0aW9ucyApO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoIGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgKSB7XG5cdFx0aWYoIHRoaXMuZmxhdHBpY2tyXG5cdFx0XHQmJiB0aGlzLmZsYXRwaWNrckFsdElucHV0XG5cdFx0XHQmJiBjaGFuZ2VzLmhhc093blByb3BlcnR5KCAncGxhY2Vob2xkZXInICkgXG5cdFx0XHQmJiBjaGFuZ2VzWyAncGxhY2Vob2xkZXInIF0uY3VycmVudFZhbHVlICkge1xuXHRcdFx0XHR0aGlzLmZsYXRwaWNrci5hbHRJbnB1dC5zZXRBdHRyaWJ1dGUoICdwbGFjZWhvbGRlcicsIGNoYW5nZXNbICdwbGFjZWhvbGRlcicgXS5jdXJyZW50VmFsdWUgKTtcblx0XHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLmZsYXRwaWNrcikge1xuXHRcdFx0dGhpcy5mbGF0cGlja3IuZGVzdHJveSgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIpIHtcblx0XHRcdHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lci51bnN1YnNjcmliZSgpO1xuXHRcdFx0dGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgPSB1bmRlZmluZWQ7XG5cdFx0dGhpcy5mbGF0cGlja3JPbkNsb3NlID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25PcGVuID0gdW5kZWZpbmVkO1xuXHRcdHRoaXMuZmxhdHBpY2tyT25SZWFkeSA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZ2xvYmFsT25DaGFuZ2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DaGFuZ2U7XG5cdFx0dGhpcy5nbG9iYWxPbkNsb3NlID0gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uQ2xvc2U7XG5cdFx0dGhpcy5nbG9iYWxPbk9wZW4gPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25PcGVuO1xuXHRcdHRoaXMuZ2xvYmFsT25SZWFkeSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vblJlYWR5O1xuXG5cdFx0dGhpcy5mbGF0cGlja3JPcHRpb25zID0ge1xuXHRcdFx0YWx0Rm9ybWF0OiB0aGlzLmdldE9wdGlvbignYWx0Rm9ybWF0JyksXG5cdFx0XHRhbHRJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0JyksXG5cdFx0XHRhbHRJbnB1dENsYXNzOiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXRDbGFzcycpLFxuXHRcdFx0YWxsb3dJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsbG93SW5wdXQnKSxcblx0XHRcdGFwcGVuZFRvOiB0aGlzLmdldE9wdGlvbignYXBwZW5kVG8nKSxcblx0XHRcdGNsaWNrT3BlbnM6IHRoaXMuZ2V0T3B0aW9uKCdjbGlja09wZW5zJywgdHJ1ZSksXG5cdFx0XHRkYXRlRm9ybWF0OiB0aGlzLmdldE9wdGlvbignZGF0ZUZvcm1hdCcpLFxuXHRcdFx0ZGVmYXVsdERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdkZWZhdWx0RGF0ZScpLFxuXHRcdFx0ZGlzYWJsZTogdGhpcy5nZXRPcHRpb24oJ2Rpc2FibGUnKSxcblx0XHRcdGRpc2FibGVNb2JpbGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlTW9iaWxlJyksXG5cdFx0XHRlbmFibGU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGUnKSxcblx0XHRcdGVuYWJsZVRpbWU6IHRoaXMuZ2V0T3B0aW9uKCdlbmFibGVUaW1lJyksXG5cdFx0XHRlbmFibGVTZWNvbmRzOiB0aGlzLmdldE9wdGlvbignZW5hYmxlU2Vjb25kcycpLFxuXHRcdFx0aG91ckluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ2hvdXJJbmNyZW1lbnQnKSxcblx0XHRcdGlubGluZTogdGhpcy5nZXRPcHRpb24oJ2lubGluZScpLFxuXHRcdFx0bG9jYWxlOiB0aGlzLmdldE9wdGlvbignbG9jYWxlJyksXG5cdFx0XHRtYXhEYXRlOiB0aGlzLmdldE9wdGlvbignbWF4RGF0ZScpLFxuXHRcdFx0bWluRGF0ZTogdGhpcy5nZXRPcHRpb24oJ21pbkRhdGUnKSxcblx0XHRcdG1pbnV0ZUluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ21pbnV0ZUluY3JlbWVudCcpLFxuXHRcdFx0bW9kZTogdGhpcy5nZXRPcHRpb24oJ21vZGUnKSxcblx0XHRcdG5leHRBcnJvdzogdGhpcy5nZXRPcHRpb24oJ25leHRBcnJvdycpLFxuXHRcdFx0bm9DYWxlbmRhcjogdGhpcy5nZXRPcHRpb24oJ25vQ2FsZW5kYXInKSxcblx0XHRcdG9uQ2hhbmdlOiB0aGlzLmV2ZW50T25DaGFuZ2UuYmluZCh0aGlzKSxcblx0XHRcdG9uQ2xvc2U6IHRoaXMuZXZlbnRPbkNsb3NlLmJpbmQodGhpcyksXG5cdFx0XHRvbk9wZW46IHRoaXMuZXZlbnRPbk9wZW4uYmluZCh0aGlzKSxcblx0XHRcdG9uUmVhZHk6IHRoaXMuZXZlbnRPblJlYWR5LmJpbmQodGhpcyksXG5cdFx0XHRwYXJzZURhdGU6IHRoaXMuZ2V0T3B0aW9uKCdwYXJzZURhdGUnKSxcblx0XHRcdHByZXZBcnJvdzogdGhpcy5nZXRPcHRpb24oJ3ByZXZBcnJvdycpLFxuXHRcdFx0c2hvcnRoYW5kQ3VycmVudE1vbnRoOiB0aGlzLmdldE9wdGlvbignc2hvcnRoYW5kQ3VycmVudE1vbnRoJyksXG5cdFx0XHRzdGF0aWM6IHRoaXMuZ2V0T3B0aW9uKCdzdGF0aWMnKSxcblx0XHRcdHRpbWVfMjRocjogdGhpcy5nZXRPcHRpb24oJ3RpbWVfMjRocicpLFxuXHRcdFx0dXRjOiB0aGlzLmdldE9wdGlvbigndXRjJyksXG5cdFx0XHR3ZWVrTnVtYmVyczogdGhpcy5nZXRPcHRpb24oJ3dlZWtOdW1iZXJzJyksXG5cdFx0XHR3cmFwOiB0aGlzLmdldE9wdGlvbignd3JhcCcsIHRydWUpLFxuXHRcdH07XG5cblx0XHQvLyBSZW1vdmUgdW5zZXQgcHJvcGVydGllc1xuXHRcdE9iamVjdC5rZXlzKCB0aGlzLmZsYXRwaWNrck9wdGlvbnMgKS5mb3JFYWNoKCAoIGtleTogc3RyaW5nICkgPT4ge1xuXHRcdFx0KHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpICYmXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmZsYXRwaWNrck9wdGlvbnNba2V5XTtcblx0XHR9ICk7XG5cblx0XHRpZiAodGhpcy5jb250cm9sKSB7XG5cdFx0XHR0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIgPSB0aGlzLmNvbnRyb2wudmFsdWVDaGFuZ2VzXG5cdFx0XHRcdC5zdWJzY3JpYmUoICggdmFsdWU6IGFueSApID0+IHtcblx0XHRcdFx0XHRpZiAoICEoIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSApICkge1xuXHRcdFx0XHRcdFx0Ly8gUXVpZXRseSB1cGRhdGUgdGhlIHZhbHVlIG9mIHRoZSBmb3JtIGNvbnRyb2wgdG8gYmUgYVxuXHRcdFx0XHRcdFx0Ly8gRGF0ZSBvYmplY3QuIFRoaXMgYXZvaWRzIGFueSBleHRlcm5hbCBzdWJzY3JpYmVyc1xuXHRcdFx0XHRcdFx0Ly8gZnJvbSBiZWluZyBub3RpZmllZCBhIHNlY29uZCB0aW1lIChvbmNlIGZvciB0aGUgdXNlclxuXHRcdFx0XHRcdFx0Ly8gaW5pdGlhdGVkIGV2ZW50LCBhbmQgb25jZSBmb3Igb3VyIGNvbnZlcnNpb24gdG9cblx0XHRcdFx0XHRcdC8vIERhdGUoKSkuXG5cdFx0XHRcdFx0XHR0aGlzLmNvbnRyb2wuc2V0VmFsdWUoIG5ldyBEYXRlKCAnJyArIHZhbHVlICksIHtcblx0XHRcdFx0XHRcdFx0b25seVNlbGY6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGVtaXRFdmVudDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGVtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2Vcblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25DaGFuZ2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZXZlbnRPbkNoYW5nZSggc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QgKTogdm9pZCB7XG5cdFx0bGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcblx0XHRcdHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG5cdFx0XHRkYXRlU3RyOiBkYXRlU3RyLFxuXHRcdFx0aW5zdGFuY2U6IGluc3RhbmNlXG5cdFx0fTtcblx0XHRpZiAoIHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2hhbmdlLmVtaXQoIGV2ZW50ICk7XG5cdFx0fVxuXHRcdGlmKCB0aGlzLmdsb2JhbE9uQ2hhbmdlICkge1xuXHRcdFx0dGhpcy5nbG9iYWxPbkNoYW5nZSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25DbG9zZSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uQ2xvc2UoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uQ2xvc2UgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uQ2xvc2UuZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25DbG9zZSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25DbG9zZSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25PcGVuIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxuXHQgKi9cblx0cHJvdGVjdGVkIGV2ZW50T25PcGVuKCBzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCApOiB2b2lkIHtcblx0XHRsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuXHRcdFx0c2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcblx0XHRcdGRhdGVTdHI6IGRhdGVTdHIsXG5cdFx0XHRpbnN0YW5jZTogaW5zdGFuY2Vcblx0XHR9O1xuXHRcdGlmICggdGhpcy5mbGF0cGlja3JPbk9wZW4gKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uT3Blbi5lbWl0KCBldmVudCApO1xuXHRcdH1cblx0XHRpZiggdGhpcy5nbG9iYWxPbk9wZW4gKSB7XG5cdFx0XHR0aGlzLmdsb2JhbE9uT3BlbiggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuXHQgKiBnbG9iYWwgb25SZWFkeSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cblx0ICovXG5cdHByb3RlY3RlZCBldmVudE9uUmVhZHkoIHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0ICk6IHZvaWQge1xuXHRcdGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG5cdFx0XHRzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuXHRcdFx0ZGF0ZVN0cjogZGF0ZVN0cixcblx0XHRcdGluc3RhbmNlOiBpbnN0YW5jZVxuXHRcdH07XG5cdFx0aWYgKCB0aGlzLmZsYXRwaWNrck9uUmVhZHkgKSB7XG5cdFx0XHR0aGlzLmZsYXRwaWNrck9uUmVhZHkuZW1pdCggZXZlbnQgKTtcblx0XHR9XG5cdFx0aWYoIHRoaXMuZ2xvYmFsT25SZWFkeSApIHtcblx0XHRcdHRoaXMuZ2xvYmFsT25SZWFkeSggZXZlbnQgKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSBjb25maWd1cmF0aW9uIHZhbHVlIGZvciBvcHRpb24ge29wdGlvbn0sIG9yIHtkZWZhdWx0VmFsdWV9IGlmIGl0XG5cdCAqIGRvZXNuJ3QgZXhpc3QuXG5cdCAqL1xuXHRwcm90ZWN0ZWQgZ2V0T3B0aW9uKCBvcHRpb246IHN0cmluZywgZGVmYXVsdFZhbHVlPzogYW55ICk6IGFueSB7XG5cdFx0bGV0IGxvY2FsTmFtZSA9ICdmbGF0cGlja3InICsgb3B0aW9uLnN1YnN0cmluZyggMCwgMSApLnRvVXBwZXJDYXNlKClcblx0XHRcdCsgb3B0aW9uLnN1YnN0cmluZyggMSApO1xuXG5cdFx0aWYgKCB0eXBlb2YgdGhpc1tsb2NhbE5hbWVdICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdHJldHVybiB0aGlzW2xvY2FsTmFtZV07XG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1tvcHRpb25dICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdHJldHVybiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH1cbn1cbiJdfQ==