"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DatePickerComponent = (function () {
    function DatePickerComponent() {
        this.dateUpdated = new core_1.EventEmitter();
        this.months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        this.days = [];
        this.today = new Date();
        this.selectedYear = this.year = this.today.getFullYear();
        this.selectedMonth = this.month = this.today.getMonth();
        this.selectedDay = this.day = this.today.getDate();
        this.setCalendar();
        this.dateUpdated.emit(new Date(this.year, this.month, this.day + 1));
    }
    DatePickerComponent.prototype.ngOnInit = function () {
    };
    DatePickerComponent.prototype.setCalendar = function () {
        this.days = [];
        var firstDay = new Date(this.year, this.month, this.day);
        firstDay.setDate(1);
        var lastDay = new Date(this.year, this.month + 1, 0);
        for (var i = 0; i < firstDay.getDay(); i++) {
            this.days.push(null);
        }
        for (var i = 1; i <= lastDay.getDate(); i++) {
            this.days.push(i);
        }
        while (this.days.length < 42) {
            this.days.push(null);
        }
    };
    DatePickerComponent.prototype.ngOnChanges = function (changes) {
        var reg = /\d\d\d\d-\d\d-\d\d/g;
        var dt = changes['date'].currentValue;
        if (dt && reg.exec(dt)) {
            try {
                var newDate = new Date(dt);
                if (isNaN(newDate.getTime())) {
                    throw new Error();
                }
                this.year = newDate.getFullYear();
                this.month = newDate.getMonth();
                this.select(newDate.getDate());
                this.setCalendar();
            }
            catch (invalidDateError) {
                this.select(this.day);
                this.setCalendar();
            }
        }
        else if (dt && dt.length >= 10) {
            var newDate = new Date();
            this.year = newDate.getFullYear();
            this.month = newDate.getMonth();
            this.select(newDate.getDate());
            this.setCalendar();
        }
    };
    DatePickerComponent.prototype.nextMonth = function () {
        this.month += 1;
        if (this.month === 12) {
            this.month = 0;
            this.year += 1;
        }
        this.setCalendar();
    };
    DatePickerComponent.prototype.prevMonth = function () {
        this.month -= 1;
        if (this.month === -1) {
            this.month = 11;
            this.year -= 1;
        }
        this.setCalendar();
    };
    DatePickerComponent.prototype.nextYear = function () {
        this.year += 1;
        this.setCalendar();
    };
    DatePickerComponent.prototype.prevYear = function () {
        this.year -= 1;
        this.setCalendar();
    };
    DatePickerComponent.prototype.isSelected = function (d) {
        return this.year === this.selectedYear
            && this.month === this.selectedMonth
            && d === this.selectedDay;
    };
    DatePickerComponent.prototype.select = function (d) {
        this.selectedYear = this.year;
        this.selectedMonth = this.month;
        this.selectedDay = this.day = d;
        this.dateUpdated.emit(new Date(this.year, this.month, this.day + 1));
    };
    return DatePickerComponent;
}());
__decorate([
    core_1.Input()
], DatePickerComponent.prototype, "date");
__decorate([
    core_1.Output()
], DatePickerComponent.prototype, "dateUpdated");
DatePickerComponent = __decorate([
    core_1.Component({
        selector: 'app-date-picker',
        templateUrl: './date-picker.component.html',
        styleUrls: ['./date-picker.component.css']
    })
], DatePickerComponent);
exports.DatePickerComponent = DatePickerComponent;
