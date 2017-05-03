(function () {
    'use strict';

    angular
        .module('mudanoApp')
        .controller('AbsenceCtrl', AbsenceCtrl);

    /** @ngInject */
    function AbsenceCtrl(FileService, DateService, AbsenceService) {
        var vm = this;

        vm.selectedPeriod = null;
        vm.selectedInformation = null;
        vm.selectedRange = '2014-02-01/2014-02-28';
        vm.selectedDate = new Date();
        vm.selected = [];

        vm.bookAbsence = bookAbsence;
        vm.toggle = toggle;
        vm.exists = exists;
        vm.selectRangeOfDate = selectRangeOfDate;

        onInit();

        /**
         * Executes initial functions of the controller
         */
        function onInit() {
            readCsvFile();
            getWorkstream();
            initializeDatesToBook();
            configWeekdaysToBook();
        }

        function selectRangeOfDate() {
            initializeDatesToBook();
            afterBooking();
        }

        /**
         * Books the absence in a given dates, period and information
         */
        function bookAbsence() {
            AbsenceService
                .bookAbsence(vm.selected, vm.selectedPeriod, vm.selectedInformation)
                .then(afterBooking);
        }

        function afterBooking() {
            vm.selected = [];
            vm.rangeOfDates = null;
            initializeMyBook();
            setTimeout(configWeekdaysToBook, 0);
        }

        /**
         * Search for logged user's book
         */
        function initializeMyBook() {
            AbsenceService
                .getMyBook()
                .then(function (data) {
                    vm.myBook = data;
                });
        }

        /**
         * Initialize a range of dates (weekdays) so the user can book an absence
         */
        function configWeekdaysToBook() {
            DateService
                .rangeOfWeekdays(vm.minDateStr, vm.maxDateStr)
                .then(function (data) {
                    vm.rangeOfDates = data;
                });
        }

        /**
         * Search for the workstream and exibits it on the scheen
         */
        function getWorkstream() {
            AbsenceService
                .getWorkstream()
                .then(function (data) {
                    vm.workstream = data;
                });
        }

        /**
         * Reads the simpledata and instantiate the group of controller's variables
         */
        function readCsvFile() {
            FileService
                .readCsvFile()
                .then(groupByEmployee);
        }

        function groupByEmployee(data) {
            initializeMyBook();

            AbsenceService
                .getBookFrom(data)
                .then(function (books) {
                    vm.employeesBook = books;

                    getEmployeesFromBook();
                });
        }

        /**
         * Creates a list of employees
         */
        function getEmployeesFromBook() {
            AbsenceService
                .getEmployeesFromBook(vm.employeesBook)
                .then(function (employees) {
                    vm.employees = employees;

                    zipEmployeeObjWithNameAndInitials();
                });
        }

        /**
         * Creates an array of employees with name and initials
         */
        function zipEmployeeObjWithNameAndInitials() {
            AbsenceService
                .zipEmployeeObjWithNameAndInitials(vm.employees)
                .then(function (employeesArray) {
                    vm.employeesObj = employeesArray;
                });
        }

        /**
         * Add or remove a given item in the array of dates to book
         * @param item
         */
        function toggle(item) {
            var idx = vm.selected.indexOf(item);
            if (idx > -1) {
                vm.selected.splice(idx, 1);
            } else {
                vm.selected.push(item);
            }
        }

        /**
         * Check if a given item exists in the selected dates list
         * @param item
         * @returns {boolean}
         */
        function exists(item) {
            return vm.selected.indexOf(item) > -1;
        }

        /**
         * Initialize the controller's variables so the user can iteract over the page
         */
        function initializeDatesToBook() {
            var range = vm.selectedRange.split('/');

            vm.maxDateStr = range.pop();
            vm.minDateStr = range.pop();

            vm.minDate = moment(vm.minDateStr).toDate();
            vm.maxDate = moment(vm.maxDateStr).toDate();
        }
    }
})();
