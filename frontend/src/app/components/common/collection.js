/**
 * @author slesh
 */
(function () {
    'use strict';

    angular.module('imaster').service('collection', collection);

    function collection() {
        return {
            getId: getId,
            getChecked: getChecked
        };

        function getId(item) {
            return item.id;
        }

        function getChecked(item) {
            return item.checked;
        }
    }
})();