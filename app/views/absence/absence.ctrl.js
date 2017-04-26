(function () {
    'use strict';

    var SUNDAY = 0,
        SATURDAY = 6,
        ONE_YEAR,
        THREE_MONTHS = 3;

    angular
        .module('mudanoApp')
        .controller('AbsenceCtrl', AbsenceCtrl);

    /** @ngInject */
    function AbsenceCtrl(FileService, DateService, AbsenceService) {
        var vm = this;

        vm.showDatePicker = false;

        vm.onlyWeekdaysPredicate = onlyWeekdaysPredicate;
        vm.selectADate = selectADate;

        onInit();

        function onInit() {
            readCsvFile();
            getWorkstream();
            initializeDatesToBook();
            configWeekdaysToBook();
        }

        function selectADate() {
            vm.showDatePicker = !vm.showDatePicker;
        }

        function initializeDatesToBook() {
            vm.selectedDate = new Date();

            vm.minDate = new Date(
                vm.selectedDate.getFullYear() - ONE_YEAR,
                vm.selectedDate.getMonth(),
                vm.selectedDate.getDate()
            );

            vm.maxDate = new Date(
                vm.selectedDate.getFullYear(),
                vm.selectedDate.getMonth() + THREE_MONTHS,
                vm.selectedDate.getDate()
            );
        }

        function configWeekdaysToBook() {
            DateService
                .rangeOfWeekdays('2017-04-26', '2017-05-26')
                .then(function (rangeOfDays) {
                    vm.rangeOfDays = rangeOfDays;
                });
        }

        function onlyWeekdaysPredicate(date) {
            var day = date.getDay();
            return day > SUNDAY && day < SATURDAY;
        }

        function getWorkstream() {
            AbsenceService
                .getWorkstream()
                .then(function (data) {
                    vm.workstream = data;
                });
        }

        function readCsvFile() {
            FileService
                .readCsvFile()
                .then(groupByEmployee);
        }

        function groupByEmployee(data) {
            vm.employeesBook = _.groupBy(data, function (item) {
                return item.name;
            });

            vm.initials = [];

            vm.books = _.keys(vm.employeesBook);

            vm.books.forEach(function (name) {
                vm.initials.push(_.reduce(_.split(name, ' '), function (a, b) {
                    return _.first(a).concat(_.first(b));
                }));
            });

            vm.initials = _.uniqWith(vm.initials, _.isEqual);
        }
    }
})();
