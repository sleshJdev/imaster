/**
 * @author slesh
 */
(function () {
    'use strict';

    angular.module('imaster').controller('DocumentEditController', DocumentEditController);

    /** @ngInject */
    function DocumentEditController(documentService, documentCommonService, id){
        var vm = this;
        vm.isAdd = false;
        vm.documentText = 'Новый документ';
        vm.submitText = 'Обновить документ';

        (function () {
            documentCommonService.initContext(vm);
            documentService.getDocumentById(id).then(function (response) {
                vm.document = response.data;
            });
        })();
    }
})();