(function () {
    'use strict';

    angular
        .module('mudanoApp')
        .service('AbsenceService', AbsenceService);

    /** @ngInject */
    function AbsenceService($q) {
        return {
            getWorkstream: getWorkstream
        };

        /**
         * Gets workstream list
         */
        function getWorkstream() {
            return $q(function (resolve, reject) {
                var workstream = [
                    {name: 'Proposition Dev.', shortName: 'DEV'},
                    {name: 'Engineering', shortName: 'ENG'},
                    {name: 'Sales & Marketing', shortName: 'SAL'},
                    {name: 'Project Management', shortName: 'MGT'}
                ];

                resolve(workstream);
            });
        }
    }
})();