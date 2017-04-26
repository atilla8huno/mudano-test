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
                employeeName: '@',
                employeeId: '@',
                period: '@',
                date: '@',
                mark: '@?',
                bookAbsence: '&?'
            },
            compile: compile
        };

        function compile() {
            return {
                pre: preFunction
            };

            function preFunction(scope, e) {
                scope.boxClass = {
                    'box-am': scope.period === 'AM',
                    'box-pm': scope.period === 'PM',
                    'V': scope.mark === 'V',
                    'T': scope.mark === 'T',
                    'H': scope.mark === 'H'
                };

                scope.bookAbsence = scope.bookAbsence && typeof scope.bookAbsence() === 'function' ?
                    scope.bookAbsence() : bookAbsence(scope);
            }

            function bookAbsence(scope) {
                return function () {
                    alert('Booking absence to ' + scope.employeeName + ' at ' + moment(scope.date, 'DD/MM/YYYY').format('YYYY-MM-DD') + ' ' + scope.period);
                };
            }
        }
    }
})();