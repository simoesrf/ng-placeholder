import {PlaceholderProvider} from './providers/ng-placeholder.provider';
import {PlaceholderService} from './services/ng-placeholder.service';
import {PlaceholderDirective} from './directives/ng-placeholder.directive';
import {PlaceholderDirectiveDecorator} from './directives/ng-placeholder.directive.decorator';

export module Placeholder {
    angular.module('ng-placeholder', []);

    angular.module('ng-placeholder').provider('ngPlaceholderConfig', PlaceholderProvider);

    angular.module('ng-placeholder').service('ngPlaceholderService', PlaceholderService);

    angular.module('ng-placeholder').directive('ngPlaceholder', PlaceholderDirective);

    angular.module('ng-placeholder').decorator('ngPlaceholderDirective', PlaceholderDirectiveDecorator);
}