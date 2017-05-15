(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name mudanoApp
     * @description
     * # mudanoApp
     *
     * Main module of the application.
     */
    angular
        .module('mudanoApp', [
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngMaterial',
            'toastr',
            'mudanoDirectives'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/absence/absence.html',
                    controller: 'AbsenceCtrl',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
