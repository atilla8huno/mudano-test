(function () {
    'use strict';

    angular
        .module('mudanoDirectives')
        .directive('availabilityOfTheDay', AvailabilityOfTheDayDirective);

    function AvailabilityOfTheDayDirective() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/availability-of-the-day/availability-of-the-day.html',
            scope: {
                employee: '@',
                date: '@',
                agenda: '='
            },
            link: link
        };

        function link(scope) {
            scope.agenda = scope.agenda || [];
            scope.bookAbsence = bookAbsence;

            scope.agenda[scope.employee].forEach(function (book) {
                scope.period = book.unit;

                if (book.name === scope.employee && scope.date === moment(book.date, 'DD/MM/YYYY').format('YYYY-MM-DD')) {
                    if (book.unit === 'AM') {
                        scope.boxClassAM = getBoxClass(book.value);
                    } else {
                        scope.boxClassPM = getBoxClass(book.value);
                    }

                    if (scope.boxClassAM && scope.boxClassPM) {
                        return false;
                    }
                }
            });

            function bookAbsence() {
                alert('Booking absence to ' + scope.employee + ' at ' + moment(scope.date, 'YYYY-MM-DD')
                        .format('YYYY-MM-DD') + ' ' + scope.period);
            }

            function getBoxClass(mark) {
                return {
                    'V': mark === 'V',
                    'T': mark === 'T',
                    'H': mark === 'H'
                };
            }
        }
    }
})();