import { PlaceholderProvider } from './providers/ng-placeholder.provider';
import { PlaceholderService } from './services/ng-placeholder.service';
import { PlaceholderDirective } from './directives/ng-placeholder.directive';
import { PlaceholderDirectiveDecorator } from './directives/ng-placeholder.directive.decorator';

export module Placeholder {
    angular.module('ngPlaceholder', []);

    angular.module('ngPlaceholder').provider('ngPlaceholderConfig', PlaceholderProvider);

    angular.module('ngPlaceholder').service('ngPlaceholderService', PlaceholderService);

    angular.module('ngPlaceholder').directive('ngPlaceholder', PlaceholderDirective);

    angular.module('ngPlaceholder').decorator('ngPlaceholderDirective', PlaceholderDirectiveDecorator);
}