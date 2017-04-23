(function () {
    'use strict';

    describe('Controller: MainCtrl', function () {

        // load the controller's module
        beforeEach(module('mudanoApp'));

        var MainCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
                $scope: scope
                // place here mocked dependencies
            });
        }));

        it('should attach a list of awesomeThings to the scope', shouldAttachListToScope);

        function shouldAttachListToScope() {
            expect(MainCtrl.awesomeThings.length).toBe(3);
        }
    });
})();