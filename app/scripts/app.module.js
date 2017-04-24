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
            'ngTouch'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/agenda/agenda.html',
                    controller: 'AgendaCtrl',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();