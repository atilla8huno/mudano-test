(function () {
    'use strict';

    angular
        .module('mudanoDirectives')
        .directive('bookAbsence', BookAbsenceDirective);

    function BookAbsenceDirective() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/book-absence/book-absence.html',
            scope: {
                employeeId: '@',
                date: '@',
                period: '@?',
                mark: '@?',
                bookAbsence: '&?'
            },
            compile: compile
        };

        function compile() {
            return {
                pre: preFunction
            };

            function preFunction(scope) {
                scope.bookNewAbsence = true;

                scope.selectADate = selectADate(scope);
                scope.formattedDate = getFormattedDate(scope);

                scope.boxClass = {
                    'V': scope.mark === 'V',
                    'T': scope.mark === 'T',
                    'H': scope.mark === 'H'
                };

                scope.bookAbsence = scope.bookAbsence && typeof scope.bookAbsence() === 'function' ?
                    scope.bookAbsence() : bookAbsence(scope);
            }

            function getFormattedDate(scope) {
                return moment(scope.date, 'YYYY-MM-DD').format('DD-MMM');
            }

            function selectADate(scope) {
                return function () {
                    scope.bookNewAbsence = !scope.bookNewAbsence;
                }
            }

            function bookAbsence(scope) {
                return function () {
                    alert('Booking absence at ' + moment(scope.date).format('YYYY-MM-DD') + ' ' + scope.period);
                    scope.selectADate();
                };
            }
        }
    }
})();
