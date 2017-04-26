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
    function AbsenceCtrl(FileService, AbsenceService) {
        var vm = this;

        vm.showDatePicker = false;

        vm.onlyWeekdaysPredicate = onlyWeekdaysPredicate;
        vm.selectADate = selectADate;

        onInit();

        function onInit() {
            readCsvFile();
            getWorkstream();
            initializeDatesToBook();
        }

        function selectADate() {
            vm.showDatePicker = !vm.showDatePicker;
        }

        function initializeDatesToBook() {
            vm.myDate = new Date();

            vm.minDate = new Date(
                vm.myDate.getFullYear() - ONE_YEAR,
                vm.myDate.getMonth(),
                vm.myDate.getDate()
            );

            vm.maxDate = new Date(
                vm.myDate.getFullYear(),
                vm.myDate.getMonth() + THREE_MONTHS,
                vm.myDate.getDate()
            );
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
            var itens = _.groupBy(data, function (item) {
                return item.name;
            });

            vm.initials = [];

            _.keys(itens).forEach(function (name) {
                vm.initials.push(_.reduce(_.split(name, ' '), function (a, b) {
                    return _.first(a).concat(_.first(b));
                }));
            });

            vm.initials = _.uniqWith(vm.initials, _.isEqual);
        }
    }
})();
