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

            var books = _.filter(scope.agenda[scope.employee], function (book) {
                return book.name === scope.employee && scope.date === moment(book.date, 'DD/MM/YYYY')
                        .format('YYYY-MM-DD');
            });

            books.forEach(function (book) {
                if (book.unit === 'AM') {
                    scope.boxClassAM = getBoxClass(book.value);
                    scope.titleAM = 'The booking of ' + book.name + ' at ' + scope.date + ' AM is about '
                        + getAbsenceDescription(book.value);
                } else {
                    scope.boxClassPM = getBoxClass(book.value);
                    scope.titlePM = 'The booking of ' + book.name + ' at ' + scope.date + ' PM is about '
                        + getAbsenceDescription(book.value);
                }
            });

            function getBoxClass(mark) {
                return {
                    'V': mark === 'V',
                    'T': mark === 'T',
                    'H': mark === 'H'
                };
            }

            function getAbsenceDescription(value) {
                return value === 'V' ? 'Vocation' :
                    value === 'T' ? 'Training' :
                    value === 'H' ? 'Public Holiday' : 'Present';
            }
        }
    }
})();