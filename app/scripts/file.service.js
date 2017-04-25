(function () {
    'use strict';

    angular
        .module('mudanoApp')
        .service('FileService', FileService);

    /** @ngInject */
    function FileService($q) {
        return {
            readCsvFile: readCsvFile
        };

        /**
         * Reads data from sampledata
         */
        function readCsvFile() {
            return $q(function (resolve, reject) {
                var request = new XMLHttpRequest();

                request.onload = onload;
                request.open('GET', '/data/sampledata.txt', true);
                request.send();

                function onload() {
                    var data = _.split(this.responseText, '\r\n');

                    var objects = _.map(data, function (item) {
                        return _.split(item, ',');
                    });

                    var header = _.first(objects);

                    _.pull(objects, header); // remove the header line

                    var populatedObject = [];
                    objects.forEach(function (item) {
                        var obj = _.zipObject(header, item);
                        populatedObject.push(obj);
                    });

                    resolve(populatedObject);
                }
            });
        }
    }
})();