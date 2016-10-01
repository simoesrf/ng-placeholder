import {PlaceholderProvider} from './ng-placeholder-provider';
import {PlaceholderService} from './ng-placeholder-service';
import {PlaceholderDirective} from './ng-placeholder-directive';

const app = angular.module('ng-placeholder', ['ngAnimate']);

app.provider('NgPlaceholderConfig', [PlaceholderProvider]);
app.service('NgPlaceholderService', ['$templateCache', 'NgPlaceholderConfig', PlaceholderService.getInstant]);
app.directive('ngPlaceholder', ['$animate', 'NgPlaceholderService', PlaceholderDirective]);