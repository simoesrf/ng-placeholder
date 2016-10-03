import {PlaceholderProvider} from './ng-placeholder-provider';
import {PlaceholderService} from './ng-placeholder-service';
import {PlaceholderDirective} from './ng-placeholder-directive';

export module NgPlaceholder {
    angular.module('ng-placeholder', []);

    angular.module('ng-placeholder').provider('NgPlaceholderConfig', PlaceholderProvider);

    angular.module('ng-placeholder').service('NgPlaceholderService', PlaceholderService.getInstant);

    angular.module('ng-placeholder').directive('ngPlaceholder', PlaceholderDirective);
}