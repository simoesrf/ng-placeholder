import {PlaceholderProvider} from './providers/ng-placeholder.provider';
import {PlaceholderService} from './services/ng-placeholder.service';
import {PlaceholderDirective} from './directives/ng-placeholder.directive';
import {ApplicationRun} from './module-run';

export module Placeholder {
    angular.module('ng-placeholder', []);
    angular.module('ng-placeholder').provider('NgPlaceholderConfig', PlaceholderProvider);
    angular.module('ng-placeholder').service('NgPlaceholderService', PlaceholderService.getInstant);
    angular.module('ng-placeholder').directive('ngPlaceholder', PlaceholderDirective);
    angular.module('ng-placeholder').run(ApplicationRun);
}
