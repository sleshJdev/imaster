/**
 * @author slesh
 */
(function () {
    'use strict';

    angular.module('imaster').service('documentCommonService', documentCommonService);

    /** @ngInject */
    function documentCommonService(documentService, $state) {
        return {
            initContext: initContext
        };

        function cancel() {
            $state.go('documents.list');
        }

        function submit(document) {
            if (document.id) {
                return documentService.addDocument(document);
            } else {
                return documentService.updateDocument(document);
            }
        }

        function initContext(context) {
            context.uploader = documentService.uploader;
            context.submit = submit;
            context.cancel = cancel;
            return documentService.getSubjects().then(function (response) {
                context.subjects = response.data;
            });
        }
    }
})();