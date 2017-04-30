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

                    var header = _.head(objects);

                    _.pull(objects, header); // remove the header line

                    var populatedObject = [];
                    objects.forEach(function (item) {
                        var obj = _.zipObject(header, item);
                        obj.shortName = getShortName(obj);

                        populatedObject.push(obj);
                    });

                    resolve(populatedObject);
                }

                function getShortName(obj) {
                    var shortName = '';
                    _.split(obj.name, ' ').forEach(function (item) {
                        shortName = shortName + _.first(item);
                    });
                    return shortName;
                }
            });
        }
    }
})();