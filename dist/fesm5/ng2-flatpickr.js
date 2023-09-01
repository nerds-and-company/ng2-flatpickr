import flatpickr from 'flatpickr';
import { ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵelementEnd, ɵɵclassMapInterpolate1, ɵɵproperty, ɵɵdefineComponent, ɵɵstaticViewQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵProvidersFeature, forwardRef, ɵɵNgOnChangesFeature, ɵɵprojectionDef, ɵɵtemplate, ɵɵprojection, ɵɵadvance, ɵsetClassMetadata, Component, ViewChild, Input, EventEmitter, ɵɵdirectiveInject, ElementRef, Renderer2, ɵɵdefineDirective, Directive, Output, HostListener, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlContainer, NgControl } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';

var _c0 = ["flatpickr"];
function Ng2FlatpickrComponent_input_2_Template(rf, ctx) { if (rf & 1) {
    var _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 3);
    ɵɵlistener("focus", function Ng2FlatpickrComponent_input_2_Template_input_focus_0_listener($event) { ɵɵrestoreView(_r3); var ctx_r2 = ɵɵnextContext(); return ctx_r2.onFocus($event); });
    ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("ng2-flatpickr-input ", ctx_r1.addClass, "");
    ɵɵproperty("placeholder", ctx_r1.placeholder)("tabindex", ctx_r1.tabindex);
} }
var _c1 = ["*"];
if (typeof window !== 'undefined') {
    
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
    Ng2FlatpickrComponent.ɵcmp = ɵɵdefineComponent({ type: Ng2FlatpickrComponent, selectors: [["ng2-flatpickr"]], viewQuery: function Ng2FlatpickrComponent_Query(rf, ctx) { if (rf & 1) {
            ɵɵstaticViewQuery(_c0, true);
        } if (rf & 2) {
            var _t;
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.flatpickrElement = _t.first);
        } }, inputs: { config: "config", placeholder: "placeholder", addClass: "addClass", setDate: "setDate", tabindex: "tabindex", hideButton: "hideButton" }, features: [ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return Ng2FlatpickrComponent; }),
                    multi: true
                }
            ]), ɵɵNgOnChangesFeature], ngContentSelectors: _c1, decls: 4, vars: 1, consts: [[1, "ng2-flatpickr-input-container"], ["flatpickr", ""], ["type", "text", "data-input", "", 3, "class", "placeholder", "tabindex", "focus", 4, "ngIf"], ["type", "text", "data-input", "", 3, "placeholder", "tabindex", "focus"]], template: function Ng2FlatpickrComponent_Template(rf, ctx) { if (rf & 1) {
            ɵɵprojectionDef();
            ɵɵelementStart(0, "div", 0, 1);
            ɵɵtemplate(2, Ng2FlatpickrComponent_input_2_Template, 1, 5, "input", 2);
            ɵɵprojection(3);
            ɵɵelementEnd();
        } if (rf & 2) {
            ɵɵadvance(2);
            ɵɵproperty("ngIf", !ctx.hideButton);
        } }, directives: [NgIf], encapsulation: 2 });
    return Ng2FlatpickrComponent;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(Ng2FlatpickrComponent, [{
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
    Ng2FlatpickrDirective.ɵfac = function Ng2FlatpickrDirective_Factory(t) { return new (t || Ng2FlatpickrDirective)(ɵɵdirectiveInject(ControlContainer), ɵɵdirectiveInject(NgControl), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2)); };
    Ng2FlatpickrDirective.ɵdir = ɵɵdefineDirective({ type: Ng2FlatpickrDirective, selectors: [["", "flatpickr", ""]], hostBindings: function Ng2FlatpickrDirective_HostBindings(rf, ctx) { if (rf & 1) {
            ɵɵlistener("dblclick", function Ng2FlatpickrDirective_dblclick_HostBindingHandler() { return ctx.onClick(); });
        } }, inputs: { flatpickrOptions: ["flatpickr", "flatpickrOptions"], placeholder: "placeholder", flatpickrAltFormat: ["altFormat", "flatpickrAltFormat"], flatpickrAltInput: ["altInput", "flatpickrAltInput"], flatpickrAltInputClass: ["altInputClass", "flatpickrAltInputClass"], flatpickrAllowInput: ["allowInput", "flatpickrAllowInput"], flatpickrAppendTo: ["appendTo", "flatpickrAppendTo"], flatpickrClickOpens: ["clickOpens", "flatpickrClickOpens"], flatpickrDateFormat: ["dateFormat", "flatpickrDateFormat"], flatpickrDefaultDate: ["defaultDate", "flatpickrDefaultDate"], flatpickrDisable: ["disable", "flatpickrDisable"], flatpickrDisableMobile: ["disableMobile", "flatpickrDisableMobile"], flatpickrEnable: ["enable", "flatpickrEnable"], flatpickrEnableTime: ["enableTime", "flatpickrEnableTime"], flatpickrEnableSeconds: ["enableSeconds", "flatpickrEnableSeconds"], flatpickrHourIncrement: ["hourIncrement", "flatpickrHourIncrement"], flatpickrInline: ["inline", "flatpickrInline"], flatpickrLocale: ["locale", "flatpickrLocale"], flatpickrMaxDate: ["maxDate", "flatpickrMaxDate"], flatpickrMinDate: ["minDate", "flatpickrMinDate"], flatpickrMinuteIncrement: ["minuteIncrement", "flatpickrMinuteIncrement"], flatpickrMode: ["mode", "flatpickrMode"], flatpickrNextArrow: ["nextArrow", "flatpickrNextArrow"], flatpickrNoCalendar: ["noCalendar", "flatpickrNoCalendar"], flatpickrParseDate: ["parseDate", "flatpickrParseDate"], flatpickrPrevArrow: ["prevArrow", "flatpickrPrevArrow"], flatpickrShorthandCurrentMonth: ["shorthandCurrentMonth", "flatpickrShorthandCurrentMonth"], flatpickrStatic: ["static", "flatpickrStatic"], flatpickrTime_24hr: ["time_24hr", "flatpickrTime_24hr"], flatpickrUtc: ["utc", "flatpickrUtc"], flatpickrWeekNumbers: ["weekNumbers", "flatpickrWeekNumbers"], flatpickrWrap: ["wrap", "flatpickrWrap"] }, outputs: { flatpickrOnChange: "onChange", flatpickrOnClose: "onClose", flatpickrOnOpen: "onOpen", flatpickrOnReady: "onReady" }, exportAs: ["ng2-flatpickr"], features: [ɵɵNgOnChangesFeature] });
    return Ng2FlatpickrDirective;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(Ng2FlatpickrDirective, [{
        type: Directive,
        args: [{ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' }]
    }], function () { return [{ type: ControlContainer }, { type: NgControl }, { type: ElementRef }, { type: Renderer2 }]; }, { flatpickrOptions: [{
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

var Ng2FlatpickrModule = /** @class */ (function () {
    function Ng2FlatpickrModule() {
    }
    Ng2FlatpickrModule.ɵmod = ɵɵdefineNgModule({ type: Ng2FlatpickrModule });
    Ng2FlatpickrModule.ɵinj = ɵɵdefineInjector({ factory: function Ng2FlatpickrModule_Factory(t) { return new (t || Ng2FlatpickrModule)(); }, imports: [[CommonModule]] });
    return Ng2FlatpickrModule;
}());
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(Ng2FlatpickrModule, { declarations: [Ng2FlatpickrComponent,
        Ng2FlatpickrDirective], imports: [CommonModule], exports: [Ng2FlatpickrComponent,
        Ng2FlatpickrDirective] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(Ng2FlatpickrModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [
                    Ng2FlatpickrComponent,
                    Ng2FlatpickrDirective
                ],
                exports: [
                    Ng2FlatpickrComponent,
                    Ng2FlatpickrDirective
                ]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { Ng2FlatpickrComponent, Ng2FlatpickrDirective, Ng2FlatpickrModule };
//# sourceMappingURL=ng2-flatpickr.js.map
