(function () {
    'use strict';

    var SUNDAY = 0,
        SATURDAY = 6,
        ONE_YEAR,
        THREE_MONTHS = 3,
        LOCAL_STORAGE_BOOKING = 'booking-absence';

    angular
        .module('mudanoApp')
        .controller('AbsenceCtrl', AbsenceCtrl);

    /** @ngInject */
    function AbsenceCtrl(FileService, DateService, AbsenceService) {
        var vm = this;

        vm.selectedPeriod = null;
        vm.selectedInformation = null;

        vm.bookAbsence = bookAbsence;
        vm.toggle = toggle;
        vm.exists = exists;

        onInit();

        function onInit() {
            readCsvFile();
            getWorkstream();
            initializeDatesToBook();
            configWeekdaysToBook();
        }

        function bookAbsence() {
            var bookFromStorage = localStorage.getItem(LOCAL_STORAGE_BOOKING);
            bookFromStorage = bookFromStorage ? JSON.parse(bookFromStorage) : [];

            vm.selected.forEach(function (date) {
                _.remove(bookFromStorage, function (book) {
                    return book.date === date && book.name === 'Átilla Barros';
                });

                if (vm.selectedPeriod === 'F') {
                    bookFromStorage.push({
                        userid: 0,
                        name: 'Átilla Barros',
                        date: moment(date).format('DD/MM/YYYY'),
                        unit: 'AM',
                        value: vm.selectedInformation
                    });

                    bookFromStorage.push({
                        userid: 0,
                        name: 'Átilla Barros',
                        date: moment(date).format('DD/MM/YYYY'),
                        unit: 'PM',
                        value: vm.selectedInformation
                    });
                } else {
                    bookFromStorage.push({
                        userid: 0,
                        name: 'Átilla Barros',
                        date: moment(date).format('DD/MM/YYYY'),
                        unit: vm.selectedPeriod,
                        value: vm.selectedInformation
                    });
                }
            });

            localStorage.clear();
            localStorage.setItem(LOCAL_STORAGE_BOOKING, JSON.stringify(bookFromStorage));
            vm.selected = [];
            vm.rangeOfDates = null;
            initializeMyBook();
            setTimeout(configWeekdaysToBook, 1);
        }

        function initializeMyBook() {
            var bookFromStorage = localStorage.getItem(LOCAL_STORAGE_BOOKING);
            bookFromStorage = bookFromStorage ? JSON.parse(bookFromStorage) : [];

            vm.myBook = _.groupBy(bookFromStorage, function (item) {
                return item.name;
            });
        }

        function toggle(item) {
            var idx = vm.selected.indexOf(item);
            if (idx > -1) {
                vm.selected.splice(idx, 1);
            } else {
                vm.selected.push(item);
            }
        }

        function exists(item) {
            return vm.selected.indexOf(item) > -1;
        }

        function initializeDatesToBook() {
            vm.selectedDate = new Date();
            vm.selected = [];
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
            initializeMyBook();

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
