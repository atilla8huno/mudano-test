(function () {
    'use strict';

    var LOCAL_STORAGE_BOOKING = 'booking-absence',
        DEFAULT_USERNAME = 'Átilla Barros';

    angular
        .module('mudanoApp')
        .service('AbsenceService', AbsenceService);

    /** @ngInject */
    function AbsenceService($q) {
        return {
            getWorkstream: getWorkstream,
            getMyBook: getMyBook,
            bookAbsence: bookAbsence,
            getLoggedUsername: getLoggedUsername,
            getBookFrom: getBookFrom,
            getEmployeesFromBook: getEmployeesFromBook,
            zipEmployeeObjWithNameAndInitials: zipEmployeeObjWithNameAndInitials
        };

        /**
         * Receives a list of names and creates an array of objects with name and initials of the name
         * @param employees
         * @returns {*}
         */
        function zipEmployeeObjWithNameAndInitials(employees) {
            return $q(function (resolve, reject) {
                var employeesObj = [{
                    name: 'Your Availability',
                    shortName: 'Your Availability'
                }];

                employees.forEach(function (name) {
                    employeesObj.push({
                        name: name,
                        shortName: getShortName(name)
                    });
                });

                employees.unshift('Your Availability');

                resolve(employeesObj);
            });
        }

        /**
         * Receives a book list and returns the names of employees inside the book
         * @param employeesBook
         * @returns {*}
         */
        function getEmployeesFromBook(employeesBook) {
            return $q(function (resolve, reject) {
                resolve(_.keys(employeesBook));
            });
        }

        /**
         * Gets the book from a given data (CSV - simpledata)
         * @param data
         * @returns {*}
         */
        function getBookFrom(data) {
            return $q(function (resolve, reject) {
                var book = _.groupBy(data, function (item) {
                    return item.name;
                });

                resolve(book);
            });
        }

        /**
         * Returns the username of the logged user
         * @returns {*}
         */
        function getLoggedUsername() {
            return $q(function (resolve, reject) {
                resolve(DEFAULT_USERNAME);
            });
        }

        /**
         * Books the absence or presence to the logged user in a given date, period and information
         * @param datesToBook
         * @param period
         * @param information
         * @returns {*}
         */
        function bookAbsence(datesToBook, period, information) {
            return $q(function (resolve, reject) {
                var bookFromStorage = localStorage.getItem(LOCAL_STORAGE_BOOKING);
                bookFromStorage = bookFromStorage ? JSON.parse(bookFromStorage) : [];

                datesToBook.forEach(function (date) {
                    _.remove(bookFromStorage, function (book) {
                        return book.date === date && book.name === DEFAULT_USERNAME;
                    });

                    if (period === 'F') {
                        pushAbsenceInTheBook(bookFromStorage, date, 'AM', information);
                        pushAbsenceInTheBook(bookFromStorage, date, 'PM', information);
                    } else {
                        pushAbsenceInTheBook(bookFromStorage, date, period, information);
                    }
                });

                localStorage.clear();
                localStorage.setItem(LOCAL_STORAGE_BOOKING, JSON.stringify(bookFromStorage));

                resolve();
            });
        }

        /**
         * Adds a new absence in the book to the logged user
         * @param bookFromStorage
         * @param date
         * @param period
         * @param information
         */
        function pushAbsenceInTheBook(bookFromStorage, date, period, information) {
            bookFromStorage.push({
                userid: 0,
                name: DEFAULT_USERNAME,
                date: moment(date).format('DD/MM/YYYY'),
                unit: period,
                value: information
            });
        }

        /**
         * Search the logged user's book in localStorage
         * @returns {*}
         */
        function getMyBook() {
            return $q(function (resolve, reject) {
                var bookFromStorage = localStorage.getItem(LOCAL_STORAGE_BOOKING);
                bookFromStorage = bookFromStorage ? JSON.parse(bookFromStorage) : [];

                var groupedBook = _.groupBy(bookFromStorage, function (item) {
                    return item.name;
                });

                resolve(groupedBook);
            });
        }

        /**
         * Gets workstream list
         */
        function getWorkstream() {
            return $q(function (resolve, reject) {
                var workstream = [
                    {name: 'Proposition Dev.', shortName: 'DEV'},
                    {name: 'Engineering', shortName: 'ENG'},
                    {name: 'Sales & Marketing', shortName: 'SAL'},
                    {name: 'Project Management', shortName: 'MGT'}
                ];

                resolve(workstream);
            });
        }

        /**
         * Returns a short name of a given name
         * @param name
         * @returns {string}
         */
        function getShortName(name) {
            var shortName = '';
            _.split(name, ' ').forEach(function (item) {
                shortName = shortName + _.first(item);
            });
            return shortName;
        }
    }
})();