define(["require", "exports", './providers/ng-placeholder.provider', './services/ng-placeholder.service', './directives/ng-placeholder.directive', './module-run'], function (require, exports, ng_placeholder_provider_1, ng_placeholder_service_1, ng_placeholder_directive_1, module_run_1) {
    "use strict";
    var Placeholder;
    (function (Placeholder) {
        angular.module('ng-placeholder', []);
        angular.module('ng-placeholder').provider('NgPlaceholderConfig', ng_placeholder_provider_1.PlaceholderProvider);
        angular.module('ng-placeholder').service('NgPlaceholderService', ng_placeholder_service_1.PlaceholderService.getInstant);
        angular.module('ng-placeholder').directive('ngPlaceholder', ng_placeholder_directive_1.PlaceholderDirective);
        angular.module('ng-placeholder').run(module_run_1.ApplicationRun);
    })(Placeholder = exports.Placeholder || (exports.Placeholder = {}));
});
//# sourceMappingURL=ng-placeholder.js.map