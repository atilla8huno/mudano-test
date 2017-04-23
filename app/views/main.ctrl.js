'use strict';

/**
 * @ngdoc function
 * @name mudanoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mudanoApp
 */
angular.module('mudanoApp')
    .controller('MainCtrl', function () {
        var vm = this;

        vm.exibirMensagem = function exibirMensagem() {

        };

        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
