(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('flatpickr')) :
    typeof define === 'function' && define.amd ? define('ng2-flatpickr', ['exports', '@angular/core', '@angular/forms', '@angular/common', 'flatpickr'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ng2-flatpickr"] = {}, global.ng.core, global.ng.forms, global.ng.common));
})(this, (function (exports, i0, i1, i1$1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$1);

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
            enumerable: false,
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
        return Ng2FlatpickrComponent;
    }());
    Ng2FlatpickrComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: Ng2FlatpickrComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    Ng2FlatpickrComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: Ng2FlatpickrComponent, selector: "ng2-flatpickr", inputs: { config: "config", placeholder: "placeholder", addClass: "addClass", setDate: "setDate", tabindex: "tabindex", hideButton: "hideButton" }, providers: [
            {
                provide: i1.NG_VALUE_ACCESSOR,
                useExisting: i0.forwardRef(function () { return Ng2FlatpickrComponent; }),
                multi: true
            }
        ], viewQueries: [{ propertyName: "flatpickrElement", first: true, predicate: ["flatpickr"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0__namespace, template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input *ngIf=\"!hideButton\" class=\"ng2-flatpickr-input {{ addClass }}\" [placeholder]=\"placeholder\" [tabindex]=\"tabindex\" type=\"text\" (focus)=\"onFocus($event)\" data-input>\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t", isInline: true, directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: Ng2FlatpickrComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ng2-flatpickr',
                        template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input *ngIf=\"!hideButton\" class=\"ng2-flatpickr-input {{ addClass }}\" [placeholder]=\"placeholder\" [tabindex]=\"tabindex\" type=\"text\" (focus)=\"onFocus($event)\" data-input>\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t",
                        providers: [
                            {
                                provide: i1.NG_VALUE_ACCESSOR,
                                useExisting: i0.forwardRef(function () { return Ng2FlatpickrComponent; }),
                                multi: true
                            }
                        ]
                    }]
            }], propDecorators: { flatpickrElement: [{
                    type: i0.ViewChild,
                    args: ['flatpickr', {
                            static: true
                        }]
                }], config: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], addClass: [{
                    type: i0.Input
                }], setDate: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], hideButton: [{
                    type: i0.Input
                }] } });

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
            this.flatpickrOnChange = new i0.EventEmitter();
            /**
             * onClose gets triggered when the calendar is closed.
             *
             * Default:  null
             */
            this.flatpickrOnClose = new i0.EventEmitter();
            /**
             * onOpen gets triggered when the calendar is opened.
             *
             * Default:  null
             */
            this.flatpickrOnOpen = new i0.EventEmitter();
            /**
             * onReady gets triggered once the calendar is in a ready state.
             *
             * Default:  null
             */
            this.flatpickrOnReady = new i0.EventEmitter();
        }
        /** Allow double-clicking on the control to open/close it. */
        Ng2FlatpickrDirective.prototype.onClick = function () {
            this.flatpickr.toggle();
        };
        Object.defineProperty(Ng2FlatpickrDirective.prototype, "control", {
            get: function () {
                return this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
            },
            enumerable: false,
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
        return Ng2FlatpickrDirective;
    }());
    Ng2FlatpickrDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: Ng2FlatpickrDirective, deps: [{ token: i1__namespace$1.ControlContainer }, { token: i1__namespace$1.NgControl }, { token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    Ng2FlatpickrDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.17", type: Ng2FlatpickrDirective, selector: "[flatpickr]", inputs: { flatpickrOptions: ["flatpickr", "flatpickrOptions"], placeholder: "placeholder", flatpickrAltFormat: ["altFormat", "flatpickrAltFormat"], flatpickrAltInput: ["altInput", "flatpickrAltInput"], flatpickrAltInputClass: ["altInputClass", "flatpickrAltInputClass"], flatpickrAllowInput: ["allowInput", "flatpickrAllowInput"], flatpickrAppendTo: ["appendTo", "flatpickrAppendTo"], flatpickrClickOpens: ["clickOpens", "flatpickrClickOpens"], flatpickrDateFormat: ["dateFormat", "flatpickrDateFormat"], flatpickrDefaultDate: ["defaultDate", "flatpickrDefaultDate"], flatpickrDisable: ["disable", "flatpickrDisable"], flatpickrDisableMobile: ["disableMobile", "flatpickrDisableMobile"], flatpickrEnable: ["enable", "flatpickrEnable"], flatpickrEnableTime: ["enableTime", "flatpickrEnableTime"], flatpickrEnableSeconds: ["enableSeconds", "flatpickrEnableSeconds"], flatpickrHourIncrement: ["hourIncrement", "flatpickrHourIncrement"], flatpickrInline: ["inline", "flatpickrInline"], flatpickrLocale: ["locale", "flatpickrLocale"], flatpickrMaxDate: ["maxDate", "flatpickrMaxDate"], flatpickrMinDate: ["minDate", "flatpickrMinDate"], flatpickrMinuteIncrement: ["minuteIncrement", "flatpickrMinuteIncrement"], flatpickrMode: ["mode", "flatpickrMode"], flatpickrNextArrow: ["nextArrow", "flatpickrNextArrow"], flatpickrNoCalendar: ["noCalendar", "flatpickrNoCalendar"], flatpickrParseDate: ["parseDate", "flatpickrParseDate"], flatpickrPrevArrow: ["prevArrow", "flatpickrPrevArrow"], flatpickrShorthandCurrentMonth: ["shorthandCurrentMonth", "flatpickrShorthandCurrentMonth"], flatpickrStatic: ["static", "flatpickrStatic"], flatpickrTime_24hr: ["time_24hr", "flatpickrTime_24hr"], flatpickrUtc: ["utc", "flatpickrUtc"], flatpickrWeekNumbers: ["weekNumbers", "flatpickrWeekNumbers"], flatpickrWrap: ["wrap", "flatpickrWrap"] }, outputs: { flatpickrOnChange: "onChange", flatpickrOnClose: "onClose", flatpickrOnOpen: "onOpen", flatpickrOnReady: "onReady" }, host: { listeners: { "dblclick": "onClick()" } }, exportAs: ["ng2-flatpickr"], usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: Ng2FlatpickrDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.ControlContainer }, { type: i1__namespace$1.NgControl }, { type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }]; }, propDecorators: { flatpickrOptions: [{
                    type: i0.Input,
                    args: ['flatpickr']
                }], placeholder: [{
                    type: i0.Input,
                    args: ['placeholder']
                }], flatpickrAltFormat: [{
                    type: i0.Input,
                    args: ['altFormat']
                }], flatpickrAltInput: [{
                    type: i0.Input,
                    args: ['altInput']
                }], flatpickrAltInputClass: [{
                    type: i0.Input,
                    args: ['altInputClass']
                }], flatpickrAllowInput: [{
                    type: i0.Input,
                    args: ['allowInput']
                }], flatpickrAppendTo: [{
                    type: i0.Input,
                    args: ['appendTo']
                }], flatpickrClickOpens: [{
                    type: i0.Input,
                    args: ['clickOpens']
                }], flatpickrDateFormat: [{
                    type: i0.Input,
                    args: ['dateFormat']
                }], flatpickrDefaultDate: [{
                    type: i0.Input,
                    args: ['defaultDate']
                }], flatpickrDisable: [{
                    type: i0.Input,
                    args: ['disable']
                }], flatpickrDisableMobile: [{
                    type: i0.Input,
                    args: ['disableMobile']
                }], flatpickrEnable: [{
                    type: i0.Input,
                    args: ['enable']
                }], flatpickrEnableTime: [{
                    type: i0.Input,
                    args: ['enableTime']
                }], flatpickrEnableSeconds: [{
                    type: i0.Input,
                    args: ['enableSeconds']
                }], flatpickrHourIncrement: [{
                    type: i0.Input,
                    args: ['hourIncrement']
                }], flatpickrInline: [{
                    type: i0.Input,
                    args: ['inline']
                }], flatpickrLocale: [{
                    type: i0.Input,
                    args: ['locale']
                }], flatpickrMaxDate: [{
                    type: i0.Input,
                    args: ['maxDate']
                }], flatpickrMinDate: [{
                    type: i0.Input,
                    args: ['minDate']
                }], flatpickrMinuteIncrement: [{
                    type: i0.Input,
                    args: ['minuteIncrement']
                }], flatpickrMode: [{
                    type: i0.Input,
                    args: ['mode']
                }], flatpickrNextArrow: [{
                    type: i0.Input,
                    args: ['nextArrow']
                }], flatpickrNoCalendar: [{
                    type: i0.Input,
                    args: ['noCalendar']
                }], flatpickrParseDate: [{
                    type: i0.Input,
                    args: ['parseDate']
                }], flatpickrPrevArrow: [{
                    type: i0.Input,
                    args: ['prevArrow']
                }], flatpickrShorthandCurrentMonth: [{
                    type: i0.Input,
                    args: ['shorthandCurrentMonth']
                }], flatpickrStatic: [{
                    type: i0.Input,
                    args: ['static']
                }], flatpickrTime_24hr: [{
                    type: i0.Input,
                    args: ['time_24hr']
                }], flatpickrUtc: [{
                    type: i0.Input,
                    args: ['utc']
                }], flatpickrWeekNumbers: [{
                    type: i0.Input,
                    args: ['weekNumbers']
                }], flatpickrWrap: [{
                    type: i0.Input,
                    args: ['wrap']
                }], flatpickrOnChange: [{
                    type: i0.Output,
                    args: ['onChange']
                }], flatpickrOnClose: [{
                    type: i0.Output,
                    args: ['onClose']
                }], flatpickrOnOpen: [{
                    type: i0.Output,
                    args: ['onOpen']
                }], flatpickrOnReady: [{
                    type: i0.Output,
                    args: ['onReady']
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['dblclick']
                }] } });

    var Ng2FlatpickrModule = /** @class */ (function () {
        function Ng2FlatpickrModule() {
        }
        return Ng2FlatpickrModule;
    }());
    Ng2FlatpickrModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: Ng2FlatpickrModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    Ng2FlatpickrModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: Ng2FlatpickrModule, declarations: [Ng2FlatpickrComponent,
            Ng2FlatpickrDirective], imports: [i1$1.CommonModule], exports: [Ng2FlatpickrComponent,
            Ng2FlatpickrDirective] });
    Ng2FlatpickrModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: Ng2FlatpickrModule, imports: [[i1$1.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: Ng2FlatpickrModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1$1.CommonModule],
                        declarations: [
                            Ng2FlatpickrComponent,
                            Ng2FlatpickrDirective
                        ],
                        exports: [
                            Ng2FlatpickrComponent,
                            Ng2FlatpickrDirective
                        ]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Ng2FlatpickrComponent = Ng2FlatpickrComponent;
    exports.Ng2FlatpickrDirective = Ng2FlatpickrDirective;
    exports.Ng2FlatpickrModule = Ng2FlatpickrModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng2-flatpickr.umd.js.map
