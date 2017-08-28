import * as angular from 'angular';
import { PlaceholderProvider } from './providers/PlaceholderProvider';
import { PlaceholderService } from './services/PlaceholderService';
import { PlaceholderDirective } from './directives/PlaceholderDirective';
import { PlaceholderDirectiveDecorator } from './directives/PlaceholderDirectiveDecorator';

export module Placeholder {
    angular.module('ngPlaceholder', []);

    angular.module('ngPlaceholder').provider('ngPlaceholderConfig', PlaceholderProvider);

    angular.module('ngPlaceholder').service('ngPlaceholderService', PlaceholderService);

    angular.module('ngPlaceholder').directive('ngPlaceholder', PlaceholderDirective);

    angular.module('ngPlaceholder').decorator('ngPlaceholderDirective', PlaceholderDirectiveDecorator);
}