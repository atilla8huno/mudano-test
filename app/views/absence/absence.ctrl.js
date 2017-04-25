(function () {
    'use strict';

    angular
        .module('mudanoApp')
        .controller('AbsenceCtrl', AbsenceCtrl);

    /** @ngInject */
    function AbsenceCtrl(FileService) {
        var vm = this;

        vm.readCsvFile = readCsvFile;

        function readCsvFile() {
            FileService.readCsvFile().then(function (data) {
                console.log(data);
            });
        }
    }
})();
