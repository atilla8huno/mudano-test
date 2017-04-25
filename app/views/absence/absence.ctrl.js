(function () {
    'use strict';

    angular
        .module('mudanoApp')
        .controller('AbsenceCtrl', AbsenceCtrl);

    /** @ngInject */
    function AbsenceCtrl(FileService) {
        var vm = this;

        vm.workstream = [
            {name: 'Proposition Dev.', shortName: 'DEV'},
            {name: 'Engineering', shortName: 'ENG'},
            {name: 'Sales & Marketing', shortName: 'SAL'},
            {name: 'Project Management', shortName: 'MGT'}
        ];

        vm.initials = [];

        vm.readCsvFile = readCsvFile;

        function readCsvFile() {
            FileService
                .readCsvFile()
                .then(groupByEmployee);
        }

        function groupByEmployee(data) {
            var itens = _.groupBy(data, function (item) {
                return item.name;
            });

            _.keys(itens).forEach(function (name) {
                vm.initials.push(_.reduce(_.split(name, ' '), function (a, b) {
                    return _.first(a).concat(_.first(b));
                }));
            });
        }
    }
})();
