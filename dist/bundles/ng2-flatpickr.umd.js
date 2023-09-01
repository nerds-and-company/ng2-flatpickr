(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('flatpickr'), require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng2-flatpickr', ['exports', 'flatpickr', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (global = global || self, factory(global['ng2-flatpickr'] = {}, global.flatpickr, global.ng.core, global.ng.forms, global.ng.common));
}(this, (function (exports, flatpickr, core, forms, common) { 'use strict';

    flatpickr = flatpickr && Object.prototype.hasOwnProperty.call(flatpickr, 'default') ? flatpickr['default'] : flatpickr;

    var _c0 = ["flatpickr"];
    function Ng2FlatpickrComponent_input_2_Template(rf, ctx) { if (rf & 1) {
        var _r3 = core.ɵɵgetCurrentView();
        core.ɵɵelementStart(0, "input", 3);
        core.ɵɵlistener("focus", function Ng2FlatpickrComponent_input_2_Template_input_focus_0_listener($event) { core.ɵɵrestoreView(_r3); var ctx_r2 = core.ɵɵnextContext(); return ctx_r2.onFocus($event); });
        core.ɵɵelementEnd();
    } if (rf & 2) {
        var ctx_r1 = core.ɵɵnextContext();
        core.ɵɵclassMapInterpolate1("ng2-flatpickr-input ", ctx_r1.addClass, "");
        core.ɵɵproperty("placeholder", ctx_r1.placeholder)("tabindex", ctx_r1.tabindex);
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
        Ng2FlatpickrComponent.ɵcmp = core.ɵɵdefineComponent({ type: Ng2FlatpickrComponent, selectors: [["ng2-flatpickr"]], viewQuery: function Ng2FlatpickrComponent_Query(rf, ctx) { if (rf & 1) {
                core.ɵɵstaticViewQuery(_c0, true);
            } if (rf & 2) {
                var _t;
                core.ɵɵqueryRefresh(_t = core.ɵɵloadQuery()) && (ctx.flatpickrElement = _t.first);
            } }, inputs: { config: "config", placeholder: "placeholder", addClass: "addClass", setDate: "setDate", tabindex: "tabindex", hideButton: "hideButton" }, features: [core.ɵɵProvidersFeature([
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return Ng2FlatpickrComponent; }),
                        multi: true
                    }
                ]), core.ɵɵNgOnChangesFeature], ngContentSelectors: _c1, decls: 4, vars: 1, consts: [[1, "ng2-flatpickr-input-container"], ["flatpickr", ""], ["type", "text", "data-input", "", 3, "class", "placeholder", "tabindex", "focus", 4, "ngIf"], ["type", "text", "data-input", "", 3, "placeholder", "tabindex", "focus"]], template: function Ng2FlatpickrComponent_Template(rf, ctx) { if (rf & 1) {
                core.ɵɵprojectionDef();
                core.ɵɵelementStart(0, "div", 0, 1);
                core.ɵɵtemplate(2, Ng2FlatpickrComponent_input_2_Template, 1, 5, "input", 2);
                core.ɵɵprojection(3);
                core.ɵɵelementEnd();
            } if (rf & 2) {
                core.ɵɵadvance(2);
                core.ɵɵproperty("ngIf", !ctx.hideButton);
            } }, directives: [common.NgIf], encapsulation: 2 });
        return Ng2FlatpickrComponent;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(Ng2FlatpickrComponent, [{
            type: core.Component,
            args: [{
                    selector: 'ng2-flatpickr',
                    template: "\n\t\t<div class=\"ng2-flatpickr-input-container\" #flatpickr>\n\t\t\t<input *ngIf=\"!hideButton\" class=\"ng2-flatpickr-input {{ addClass }}\" [placeholder]=\"placeholder\" [tabindex]=\"tabindex\" type=\"text\" (focus)=\"onFocus($event)\" data-input>\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t",
                    providers: [
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: core.forwardRef(function () { return Ng2FlatpickrComponent; }),
                            multi: true
                        }
                    ]
                }]
        }], null, { flatpickrElement: [{
                type: core.ViewChild,
                args: ['flatpickr', {
                        static: true
                    }]
            }], config: [{
                type: core.Input
            }], placeholder: [{
                type: core.Input
            }], addClass: [{
                type: core.Input
            }], setDate: [{
                type: core.Input
            }], tabindex: [{
                type: core.Input
            }], hideButton: [{
                type: core.Input
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
            this.flatpickrOnChange = new core.EventEmitter();
            /**
             * onClose gets triggered when the calendar is closed.
             *
             * Default:  null
             */
            this.flatpickrOnClose = new core.EventEmitter();
            /**
             * onOpen gets triggered when the calendar is opened.
             *
             * Default:  null
             */
            this.flatpickrOnOpen = new core.EventEmitter();
            /**
             * onReady gets triggered once the calendar is in a ready state.
             *
             * Default:  null
             */
            this.flatpickrOnReady = new core.EventEmitter();
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
        Ng2FlatpickrDirective.ɵfac = function Ng2FlatpickrDirective_Factory(t) { return new (t || Ng2FlatpickrDirective)(core.ɵɵdirectiveInject(forms.ControlContainer), core.ɵɵdirectiveInject(forms.NgControl), core.ɵɵdirectiveInject(core.ElementRef), core.ɵɵdirectiveInject(core.Renderer2)); };
        Ng2FlatpickrDirective.ɵdir = core.ɵɵdefineDirective({ type: Ng2FlatpickrDirective, selectors: [["", "flatpickr", ""]], hostBindings: function Ng2FlatpickrDirective_HostBindings(rf, ctx) { if (rf & 1) {
                core.ɵɵlistener("dblclick", function Ng2FlatpickrDirective_dblclick_HostBindingHandler() { return ctx.onClick(); });
            } }, inputs: { flatpickrOptions: ["flatpickr", "flatpickrOptions"], placeholder: "placeholder", flatpickrAltFormat: ["altFormat", "flatpickrAltFormat"], flatpickrAltInput: ["altInput", "flatpickrAltInput"], flatpickrAltInputClass: ["altInputClass", "flatpickrAltInputClass"], flatpickrAllowInput: ["allowInput", "flatpickrAllowInput"], flatpickrAppendTo: ["appendTo", "flatpickrAppendTo"], flatpickrClickOpens: ["clickOpens", "flatpickrClickOpens"], flatpickrDateFormat: ["dateFormat", "flatpickrDateFormat"], flatpickrDefaultDate: ["defaultDate", "flatpickrDefaultDate"], flatpickrDisable: ["disable", "flatpickrDisable"], flatpickrDisableMobile: ["disableMobile", "flatpickrDisableMobile"], flatpickrEnable: ["enable", "flatpickrEnable"], flatpickrEnableTime: ["enableTime", "flatpickrEnableTime"], flatpickrEnableSeconds: ["enableSeconds", "flatpickrEnableSeconds"], flatpickrHourIncrement: ["hourIncrement", "flatpickrHourIncrement"], flatpickrInline: ["inline", "flatpickrInline"], flatpickrLocale: ["locale", "flatpickrLocale"], flatpickrMaxDate: ["maxDate", "flatpickrMaxDate"], flatpickrMinDate: ["minDate", "flatpickrMinDate"], flatpickrMinuteIncrement: ["minuteIncrement", "flatpickrMinuteIncrement"], flatpickrMode: ["mode", "flatpickrMode"], flatpickrNextArrow: ["nextArrow", "flatpickrNextArrow"], flatpickrNoCalendar: ["noCalendar", "flatpickrNoCalendar"], flatpickrParseDate: ["parseDate", "flatpickrParseDate"], flatpickrPrevArrow: ["prevArrow", "flatpickrPrevArrow"], flatpickrShorthandCurrentMonth: ["shorthandCurrentMonth", "flatpickrShorthandCurrentMonth"], flatpickrStatic: ["static", "flatpickrStatic"], flatpickrTime_24hr: ["time_24hr", "flatpickrTime_24hr"], flatpickrUtc: ["utc", "flatpickrUtc"], flatpickrWeekNumbers: ["weekNumbers", "flatpickrWeekNumbers"], flatpickrWrap: ["wrap", "flatpickrWrap"] }, outputs: { flatpickrOnChange: "onChange", flatpickrOnClose: "onClose", flatpickrOnOpen: "onOpen", flatpickrOnReady: "onReady" }, exportAs: ["ng2-flatpickr"], features: [core.ɵɵNgOnChangesFeature] });
        return Ng2FlatpickrDirective;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(Ng2FlatpickrDirective, [{
            type: core.Directive,
            args: [{ selector: '[flatpickr]', exportAs: 'ng2-flatpickr' }]
        }], function () { return [{ type: forms.ControlContainer }, { type: forms.NgControl }, { type: core.ElementRef }, { type: core.Renderer2 }]; }, { flatpickrOptions: [{
                type: core.Input,
                args: ['flatpickr']
            }], placeholder: [{
                type: core.Input,
                args: ['placeholder']
            }], flatpickrAltFormat: [{
                type: core.Input,
                args: ['altFormat']
            }], flatpickrAltInput: [{
                type: core.Input,
                args: ['altInput']
            }], flatpickrAltInputClass: [{
                type: core.Input,
                args: ['altInputClass']
            }], flatpickrAllowInput: [{
                type: core.Input,
                args: ['allowInput']
            }], flatpickrAppendTo: [{
                type: core.Input,
                args: ['appendTo']
            }], flatpickrClickOpens: [{
                type: core.Input,
                args: ['clickOpens']
            }], flatpickrDateFormat: [{
                type: core.Input,
                args: ['dateFormat']
            }], flatpickrDefaultDate: [{
                type: core.Input,
                args: ['defaultDate']
            }], flatpickrDisable: [{
                type: core.Input,
                args: ['disable']
            }], flatpickrDisableMobile: [{
                type: core.Input,
                args: ['disableMobile']
            }], flatpickrEnable: [{
                type: core.Input,
                args: ['enable']
            }], flatpickrEnableTime: [{
                type: core.Input,
                args: ['enableTime']
            }], flatpickrEnableSeconds: [{
                type: core.Input,
                args: ['enableSeconds']
            }], flatpickrHourIncrement: [{
                type: core.Input,
                args: ['hourIncrement']
            }], flatpickrInline: [{
                type: core.Input,
                args: ['inline']
            }], flatpickrLocale: [{
                type: core.Input,
                args: ['locale']
            }], flatpickrMaxDate: [{
                type: core.Input,
                args: ['maxDate']
            }], flatpickrMinDate: [{
                type: core.Input,
                args: ['minDate']
            }], flatpickrMinuteIncrement: [{
                type: core.Input,
                args: ['minuteIncrement']
            }], flatpickrMode: [{
                type: core.Input,
                args: ['mode']
            }], flatpickrNextArrow: [{
                type: core.Input,
                args: ['nextArrow']
            }], flatpickrNoCalendar: [{
                type: core.Input,
                args: ['noCalendar']
            }], flatpickrParseDate: [{
                type: core.Input,
                args: ['parseDate']
            }], flatpickrPrevArrow: [{
                type: core.Input,
                args: ['prevArrow']
            }], flatpickrShorthandCurrentMonth: [{
                type: core.Input,
                args: ['shorthandCurrentMonth']
            }], flatpickrStatic: [{
                type: core.Input,
                args: ['static']
            }], flatpickrTime_24hr: [{
                type: core.Input,
                args: ['time_24hr']
            }], flatpickrUtc: [{
                type: core.Input,
                args: ['utc']
            }], flatpickrWeekNumbers: [{
                type: core.Input,
                args: ['weekNumbers']
            }], flatpickrWrap: [{
                type: core.Input,
                args: ['wrap']
            }], flatpickrOnChange: [{
                type: core.Output,
                args: ['onChange']
            }], flatpickrOnClose: [{
                type: core.Output,
                args: ['onClose']
            }], flatpickrOnOpen: [{
                type: core.Output,
                args: ['onOpen']
            }], flatpickrOnReady: [{
                type: core.Output,
                args: ['onReady']
            }], onClick: [{
                type: core.HostListener,
                args: ['dblclick']
            }] }); })();

    var Ng2FlatpickrModule = /** @class */ (function () {
        function Ng2FlatpickrModule() {
        }
        Ng2FlatpickrModule.ɵmod = core.ɵɵdefineNgModule({ type: Ng2FlatpickrModule });
        Ng2FlatpickrModule.ɵinj = core.ɵɵdefineInjector({ factory: function Ng2FlatpickrModule_Factory(t) { return new (t || Ng2FlatpickrModule)(); }, imports: [[common.CommonModule]] });
        return Ng2FlatpickrModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(Ng2FlatpickrModule, { declarations: [Ng2FlatpickrComponent,
            Ng2FlatpickrDirective], imports: [common.CommonModule], exports: [Ng2FlatpickrComponent,
            Ng2FlatpickrDirective] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(Ng2FlatpickrModule, [{
            type: core.NgModule,
            args: [{
                    imports: [common.CommonModule],
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

    exports.Ng2FlatpickrComponent = Ng2FlatpickrComponent;
    exports.Ng2FlatpickrDirective = Ng2FlatpickrDirective;
    exports.Ng2FlatpickrModule = Ng2FlatpickrModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng2-flatpickr.umd.js.map
