"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DatePickerDirective = (function () {
    function DatePickerDirective(el) {
        this.el = el;
    }
    DatePickerDirective.prototype.ngOnInit = function () {
        try {
            this.datePicker = this.el.nativeElement.getElementsByTagName("app-date-picker")[0];
        }
        catch (err) {
            console.log("Date Picker Component Not Found");
        }
        try {
            this.inputField = this.el.nativeElement.getElementsByTagName("input")[0];
        }
        catch (err) {
            console.log("Input Field Not Found");
        }
        this.datePicker.style.display = "none";
        var self = this;
        this.inputField.onfocus = function () {
            self.datePicker.style.display = "block";
        };
        this.inputField.addEventListener("focusout", function (e) {
            if ([].indexOf.call(self.datePicker.getElementsByClassName("dp"), e.relatedTarget) === -1)
                self.datePicker.style.display = "none";
            else
                self.inputField.focus();
        });
        this.inputField.addEventListener("keyup", function (e) {
            if (self.inputField.value.length > 10)
                self.inputField.value = self.inputField.value.substring(0, 10);
        });
    };
    return DatePickerDirective;
}());
DatePickerDirective = __decorate([
    core_1.Directive({
        selector: '[appDatePicker]'
    })
], DatePickerDirective);
exports.DatePickerDirective = DatePickerDirective;
