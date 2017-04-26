(function () {
    'use strict';

    var SUNDAY = 0,
        SATURDAY = 6,
        ONE_DAY = 1;

    angular
        .module('mudanoApp')
        .service('DateService', DateService);

    /** @ngInject */
    function DateService($q) {
        return {
            rangeOfWeekdays: rangeOfWeekdays
        };

        /**
         * Returns a range of weekdays
         */
        function rangeOfWeekdays(start, end) {
            return $q(function (resolve, reject) {
                var startDate = moment(start, 'YYYY-MM-DD'),
                    endDate = moment(end, 'YYYY-MM-DD');

                console.log('>' + startDate);

                var currentDate = moment(startDate);
                console.log('>>' + currentDate);

                var range = [];

                while(currentDate <= endDate) {
                    if (currentDate.day() > SUNDAY && currentDate.day() < SATURDAY) {
                        range.push(currentDate.format('YYYY-MM-DD'));
                    }
                    currentDate = currentDate.add(ONE_DAY, 'days');
                }
                console.log('>>>' + range);

                resolve(range);
            });
        }
    }
})();
