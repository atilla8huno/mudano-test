(function () {
    'use strict';

    describe('Controller: AgendaCtrl', function () {

        // load the controller's module
        beforeEach(module('mudanoApp'));

        var MainCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('AgendaCtrl', {
                $scope: scope
                // place here mocked dependencies
            });
        }));

        it('should be true', shouldBeTrue);

        function shouldBeTrue() {
            expect(1 == 1).toBe(true);
        }
    });
})();