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
            vm.minDateStr = '2014-12-01';
            vm.maxDateStr = '2014-12-31';
            vm.minDate = moment(vm.minDateStr).toDate();
            vm.maxDate = moment(vm.maxDateStr).toDate();
        }

        function configWeekdaysToBook() {
            DateService
                .rangeOfWeekdays(vm.minDateStr, vm.maxDateStr)
                .then(function (data) {
                    vm.rangeOfDates = data;
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

            vm.employees = _.keys(vm.employeesBook);

            vm.employeesObj = [{
                name: 'Your Availability',
                shortName: 'Your Availability'
            }];

            vm.employees.forEach(function (name) {
                vm.employeesObj.push({
                    name: name,
                    shortName: getShortName(name)
                });
            });

            vm.employees.unshift('Your Availability');

            function getShortName(name) {
                var shortName = '';
                _.split(name, ' ').forEach(function (item) {
                    shortName = shortName + _.first(item);
                });
                return shortName;
            }
        }
    }
})();
