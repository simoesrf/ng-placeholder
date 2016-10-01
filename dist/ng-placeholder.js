/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ng_placeholder_provider_1, ng_placeholder_service_1, ng_placeholder_directive_1) {
	    "use strict";
	    var app = angular.module('ng-placeholder', ['ngAnimate']);
	    app.provider('NgPlaceholderConfig', [ng_placeholder_provider_1.PlaceholderProvider]);
	    app.service('NgPlaceholderService', ['$templateCache', 'NgPlaceholderConfig', ng_placeholder_service_1.PlaceholderService.getInstant]);
	    app.directive('ngPlaceholder', ['$animate', 'NgPlaceholderService', ng_placeholder_directive_1.PlaceholderDirective]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var ConfigService = (function () {
	        function ConfigService(configs, defaultConfig, enable, className) {
	            if (configs === void 0) { configs = []; }
	            if (enable === void 0) { enable = true; }
	            if (className === void 0) { className = 'ng-cloak'; }
	            this.configs = configs;
	            this.default = defaultConfig;
	            this.enable = enable;
	            this.className = className;
	        }
	        ConfigService.prototype.getTemplates = function () {
	            return this.configs;
	        };
	        ConfigService.prototype.getDefaultTemplate = function () {
	            return this.default;
	        };
	        ConfigService.prototype.getClassName = function () {
	            return this.className;
	        };
	        ConfigService.prototype.isEnabled = function () {
	            return this.enable;
	        };
	        return ConfigService;
	    }());
	    exports.ConfigService = ConfigService;
	    var PlaceholderProvider = (function () {
	        function PlaceholderProvider() {
	            this.configs = new Array();
	            this.customClass = 'ng-placeholder-hide';
	            this.defaultConfig = {
	                template_id: 'default',
	                template_html: '<p>Loading...</p>',
	                template_repeats: 1
	            };
	        }
	        PlaceholderProvider.prototype.addConfig = function (config) {
	            this.configs.push(config);
	        };
	        PlaceholderProvider.prototype.setConfigs = function (configs) {
	            this.configs = configs;
	        };
	        PlaceholderProvider.prototype.setCustomClass = function (className) {
	            this.customClass = className;
	        };
	        PlaceholderProvider.prototype.setDefaultConfig = function (defaultConfig) {
	            this.defaultConfig = defaultConfig;
	        };
	        PlaceholderProvider.prototype.enable = function () {
	            this.active = true;
	        };
	        PlaceholderProvider.prototype.disable = function () {
	            this.active = false;
	        };
	        PlaceholderProvider.prototype.$get = function () {
	            return new ConfigService(this.configs, this.defaultConfig, this.active, this.customClass);
	        };
	        return PlaceholderProvider;
	    }());
	    exports.PlaceholderProvider = PlaceholderProvider;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var PlaceholderService = (function () {
	        function PlaceholderService(compiledConfigs, defaultCompiledConfig, className) {
	            this.configs = compiledConfigs;
	            this.defaultConfig = defaultCompiledConfig;
	            this.className = className;
	        }
	        PlaceholderService.getInstant = function ($templateCache, placeholderConfigs) {
	            if (angular.isUndefined(PlaceholderService.instant)) {
	                var defaultConfig = placeholderConfigs.getDefaultTemplate();
	                var compiledConfigs = PlaceholderService.compileConfigs(placeholderConfigs.getTemplates(), $templateCache);
	                var compiledDefaultConfigs = PlaceholderService.buildConfig(defaultConfig.template_id, defaultConfig.template_html, defaultConfig.template_repeats);
	                PlaceholderService.instant = new PlaceholderService(compiledConfigs, compiledDefaultConfigs, placeholderConfigs.getClassName());
	            }
	            return PlaceholderService.instant;
	        };
	        PlaceholderService.getTemplateHtml = function (template_path, templateCache) {
	            return templateCache.get(template_path);
	        };
	        PlaceholderService.repeatTemplate = function (template_html, template_repeat) {
	            var html = angular.copy(template_html);
	            template_repeat = template_repeat - 1;
	            for (var index = 0; index < template_repeat; index++) {
	                html = html + template_html;
	            }
	            return html;
	        };
	        PlaceholderService.buildConfig = function (template_id, template_html, template_repeat) {
	            var template = PlaceholderService.repeatTemplate(template_html, template_repeat);
	            return {
	                template_id: template_id,
	                template_html: template_html,
	                template_repeat: template_repeat,
	                template_compiled: angular.element(template)
	            };
	        };
	        PlaceholderService.compileConfigs = function (configs, $templateCache) {
	            var compiledConfigs = new Array();
	            var compiledConfig;
	            var template_id;
	            var template_path;
	            var template_html;
	            var template_repeat;
	            configs.forEach(function iterator(config) {
	                template_id = config.template_id;
	                template_html = PlaceholderService.getTemplateHtml(config.template_path, $templateCache) || config.template_html;
	                template_repeat = config.template_repeats || 1;
	                compiledConfig = PlaceholderService.buildConfig(template_id, template_html, template_repeat);
	                compiledConfigs.push(compiledConfig);
	            });
	            return compiledConfigs;
	        };
	        PlaceholderService.prototype.repeatTemplate = function (config, template_repeats) {
	            if (config.template_repeat === template_repeats || angular.isUndefined(template_repeats)) {
	                return config.template_compiled;
	            }
	            var template = PlaceholderService.repeatTemplate(config.template_html, template_repeats);
	            return angular.element(template);
	        };
	        PlaceholderService.prototype.getTemplate = function (template_id, template_repeats) {
	            var self = this;
	            var template = self.defaultConfig.template_compiled;
	            self.configs.forEach(function configIterator(config) {
	                if (config.template_id === template_id) {
	                    template = self.repeatTemplate(config, template_repeats);
	                    return;
	                }
	            });
	            return template;
	        };
	        PlaceholderService.prototype.getClassName = function () {
	            return this.className;
	        };
	        return PlaceholderService;
	    }());
	    exports.PlaceholderService = PlaceholderService;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    function PlaceholderDirective($animate, placeholderService) {
	        return {
	            transclude: 'element',
	            link: function linkFunction(scope, element, attrs, controller, transcludeFn) {
	                var template_id = attrs.templateId;
	                var template_repeats = parseInt(attrs.templateRepeats, 10);
	                var template = placeholderService.getTemplate(template_id, template_repeats);
	                var className = placeholderService.getClassName();
	                var childrens;
	                transcludeFn(scope, function transcludeFunction(clone, scope) {
	                    childrens = clone.children();
	                    for (var index = 0; index < childrens.length; index++) {
	                        childrens[index] = angular.element(childrens[index]);
	                        childrens[index].addClass(className);
	                    }
	                    clone.append(template);
	                    element.replaceWith(clone);
	                });
	                attrs.$observe('showUntil', function (value) {
	                    if (value === 'true') {
	                        for (var index = 0; index < childrens.length; index++) {
	                            childrens[index].removeClass(className);
	                        }
	                        template.remove();
	                    }
	                });
	            }
	        };
	    }
	    exports.PlaceholderDirective = PlaceholderDirective;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjIxZjgzNWFlMmUyOWEwNTcxZmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL25nLXBsYWNlaG9sZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9uZy1wbGFjZWhvbGRlci1wcm92aWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmctcGxhY2Vob2xkZXItc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbmctcGxhY2Vob2xkZXItZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7S0NsQ0EsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FFNUQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLDZDQUFtQixDQUFDLENBQUMsQ0FBQztLQUMzRCxHQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUMsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQUUsMkNBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUM5RyxHQUFHLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDLFVBQVUsRUFBRSxzQkFBc0IsRUFBRSwrQ0FBb0IsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7S0NlM0Y7U0FNSSx1QkFBWSxPQUFpQyxFQUFFLGFBQTJCLEVBQUUsTUFBc0IsRUFBRSxTQUE4QjthQUF0SCx1QkFBaUMsR0FBakMsWUFBaUM7YUFBK0Isc0JBQXNCLEdBQXRCLGFBQXNCO2FBQUUseUJBQThCLEdBQTlC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QkFBNEIsS0FBYSxFQUFFLEtBQWdCO3FCQUMzRSxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUU3QixHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQzt5QkFDcEQsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7eUJBQ3JELFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ3pDLENBQUM7cUJBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDdkIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDL0IsQ0FBQyxDQUFDLENBQUM7aUJBRUgsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBQyxLQUFLO3FCQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7NkJBQ3BELFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQzVDLENBQUM7eUJBQ0QsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUN0QixDQUFDO2lCQUNKLENBQUMsQ0FBQyxDQUFDO2FBQ1IsQ0FBQztVQUNKO0tBQ0wsQ0FBQztLQXZDZSw0QkFBb0IsdUJBdUNuQyIsImZpbGUiOiIuL2Rpc3QvbmctcGxhY2Vob2xkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGIyMWY4MzVhZTJlMjlhMDU3MWZlXG4gKiovIiwiaW1wb3J0IHtQbGFjZWhvbGRlclByb3ZpZGVyfSBmcm9tICcuL25nLXBsYWNlaG9sZGVyLXByb3ZpZGVyJztcbmltcG9ydCB7UGxhY2Vob2xkZXJTZXJ2aWNlfSBmcm9tICcuL25nLXBsYWNlaG9sZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtQbGFjZWhvbGRlckRpcmVjdGl2ZX0gZnJvbSAnLi9uZy1wbGFjZWhvbGRlci1kaXJlY3RpdmUnO1xuXG5jb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnbmctcGxhY2Vob2xkZXInLCBbJ25nQW5pbWF0ZSddKTtcblxuYXBwLnByb3ZpZGVyKCdOZ1BsYWNlaG9sZGVyQ29uZmlnJywgW1BsYWNlaG9sZGVyUHJvdmlkZXJdKTtcbmFwcC5zZXJ2aWNlKCdOZ1BsYWNlaG9sZGVyU2VydmljZScsIFsnJHRlbXBsYXRlQ2FjaGUnLCAnTmdQbGFjZWhvbGRlckNvbmZpZycsIFBsYWNlaG9sZGVyU2VydmljZS5nZXRJbnN0YW50XSk7XG5hcHAuZGlyZWN0aXZlKCduZ1BsYWNlaG9sZGVyJywgWyckYW5pbWF0ZScsICdOZ1BsYWNlaG9sZGVyU2VydmljZScsIFBsYWNlaG9sZGVyRGlyZWN0aXZlXSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmctcGxhY2Vob2xkZXIudHNcbiAqKi8iLCJleHBvcnQgaW50ZXJmYWNlIElDb25maWdNb2RlbCB7XG4gICAgdGVtcGxhdGVfaWQ6IHN0cmluZztcbiAgICB0ZW1wbGF0ZV9wYXRoPzogc3RyaW5nO1xuICAgIHRlbXBsYXRlX2h0bWw/OiBzdHJpbmc7XG4gICAgdGVtcGxhdGVfcmVwZWF0cz86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGxhY2Vob2xkZXJDb25maWdzIHtcbiAgICBnZXRUZW1wbGF0ZXMoKTogQXJyYXk8SUNvbmZpZ01vZGVsPjtcbiAgICBnZXREZWZhdWx0VGVtcGxhdGUoKTogSUNvbmZpZ01vZGVsO1xuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmdcbiAgICBpc0VuYWJsZWQoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGxhY2Vob2xkZXJDb25maWdQcm92aWRlciBleHRlbmRzIG5nLklTZXJ2aWNlUHJvdmlkZXIge1xuICAgIGFkZENvbmZpZyhjb25maWc6IElDb25maWdNb2RlbCk6IHZvaWQ7XG4gICAgc2V0Q29uZmlncyhjb25maWdzOiBBcnJheTxJQ29uZmlnTW9kZWw+KTogdm9pZDtcbiAgICBzZXRDdXN0b21DbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQ7XG4gICAgc2V0RGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlnOiBJQ29uZmlnTW9kZWwpOiB2b2lkO1xuICAgIGVuYWJsZSgpOiB2b2lkO1xuICAgIGRpc2FibGUoKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIENvbmZpZ1NlcnZpY2UgaW1wbGVtZW50cyBJUGxhY2Vob2xkZXJDb25maWdzIHtcbiAgICBwcml2YXRlIGNvbmZpZ3M6IEFycmF5PElDb25maWdNb2RlbD47XG4gICAgcHJpdmF0ZSBkZWZhdWx0OiBJQ29uZmlnTW9kZWw7XG4gICAgcHJpdmF0ZSBlbmFibGU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBjbGFzc05hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ3M6IEFycmF5PElDb25maWdNb2RlbD4gPSBbXSwgZGVmYXVsdENvbmZpZzogSUNvbmZpZ01vZGVsLCBlbmFibGU6IGJvb2xlYW4gPSB0cnVlLCBjbGFzc05hbWU6IHN0cmluZyA9ICduZy1jbG9haycpIHtcbiAgICAgICAgdGhpcy5jb25maWdzID0gY29uZmlncztcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGVmYXVsdENvbmZpZztcbiAgICAgICAgdGhpcy5lbmFibGUgPSBlbmFibGU7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGdldFRlbXBsYXRlcygpOiBBcnJheTxJQ29uZmlnTW9kZWw+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlncztcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0VGVtcGxhdGUoKTogSUNvbmZpZ01vZGVsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdDtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgUGxhY2Vob2xkZXJQcm92aWRlciBpbXBsZW1lbnRzIElQbGFjZWhvbGRlckNvbmZpZ1Byb3ZpZGVyIHtcblxuICAgIHByaXZhdGUgY29uZmlnczogQXJyYXk8SUNvbmZpZ01vZGVsPjtcbiAgICBwcml2YXRlIGRlZmF1bHRDb25maWc6IElDb25maWdNb2RlbDtcbiAgICBwcml2YXRlIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIGN1c3RvbUNsYXNzOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb25maWdzID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMuY3VzdG9tQ2xhc3MgPSAnbmctcGxhY2Vob2xkZXItaGlkZSc7XG4gICAgICAgIHRoaXMuZGVmYXVsdENvbmZpZyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlX2lkOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZV9odG1sOiAnPHA+TG9hZGluZy4uLjwvcD4nLFxuICAgICAgICAgICAgdGVtcGxhdGVfcmVwZWF0czogMVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFkZENvbmZpZyhjb25maWc6IElDb25maWdNb2RlbCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbmZpZ3MucHVzaChjb25maWcpO1xuICAgIH1cblxuICAgIHNldENvbmZpZ3MoY29uZmlnczogQXJyYXk8SUNvbmZpZ01vZGVsPik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbmZpZ3MgPSBjb25maWdzO1xuICAgIH1cblxuICAgIHNldEN1c3RvbUNsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VzdG9tQ2xhc3MgPSBjbGFzc05hbWU7XG4gICAgfVxuXG4gICAgc2V0RGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlnOiBJQ29uZmlnTW9kZWwpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0Q29uZmlnID0gZGVmYXVsdENvbmZpZztcbiAgICB9XG5cbiAgICBlbmFibGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgICRnZXQoKTogSVBsYWNlaG9sZGVyQ29uZmlncyB7XG4gICAgICAgIHJldHVybiBuZXcgQ29uZmlnU2VydmljZSh0aGlzLmNvbmZpZ3MsIHRoaXMuZGVmYXVsdENvbmZpZywgdGhpcy5hY3RpdmUsIHRoaXMuY3VzdG9tQ2xhc3MpO1xuICAgIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmctcGxhY2Vob2xkZXItcHJvdmlkZXIudHNcbiAqKi8iLCJpbXBvcnQgeyBJUGxhY2Vob2xkZXJDb25maWdzLCBJQ29uZmlnTW9kZWwgfSBmcm9tICcuL25nLXBsYWNlaG9sZGVyLXByb3ZpZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ29tcGlsZWRDb25maWdNb2RlbCB7XG4gICAgdGVtcGxhdGVfaWQ6IHN0cmluZztcbiAgICB0ZW1wbGF0ZV9odG1sOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVfcmVwZWF0OiBudW1iZXI7XG4gICAgdGVtcGxhdGVfY29tcGlsZWQ6IEpRdWVyeVxufVxuXG5leHBvcnQgY2xhc3MgUGxhY2Vob2xkZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgc3RhdGljIGluc3RhbnQ6IFBsYWNlaG9sZGVyU2VydmljZTtcbiAgICBwcml2YXRlIGNvbmZpZ3M6IEFycmF5PElDb21waWxlZENvbmZpZ01vZGVsPjtcbiAgICBwcml2YXRlIGRlZmF1bHRDb25maWc6IElDb21waWxlZENvbmZpZ01vZGVsO1xuICAgIHByaXZhdGUgY2xhc3NOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb21waWxlZENvbmZpZ3M6IEFycmF5PElDb21waWxlZENvbmZpZ01vZGVsPiwgZGVmYXVsdENvbXBpbGVkQ29uZmlnOiBJQ29tcGlsZWRDb25maWdNb2RlbCwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jb25maWdzID0gY29tcGlsZWRDb25maWdzO1xuICAgICAgICB0aGlzLmRlZmF1bHRDb25maWcgPSBkZWZhdWx0Q29tcGlsZWRDb25maWc7XG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFudCgkdGVtcGxhdGVDYWNoZTogbmcuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlLCBwbGFjZWhvbGRlckNvbmZpZ3M6IElQbGFjZWhvbGRlckNvbmZpZ3MpIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoUGxhY2Vob2xkZXJTZXJ2aWNlLmluc3RhbnQpKSB7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gcGxhY2Vob2xkZXJDb25maWdzLmdldERlZmF1bHRUZW1wbGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgY29tcGlsZWRDb25maWdzID0gUGxhY2Vob2xkZXJTZXJ2aWNlLmNvbXBpbGVDb25maWdzKHBsYWNlaG9sZGVyQ29uZmlncy5nZXRUZW1wbGF0ZXMoKSwgJHRlbXBsYXRlQ2FjaGUpO1xuICAgICAgICAgICAgY29uc3QgY29tcGlsZWREZWZhdWx0Q29uZmlncyA9IFBsYWNlaG9sZGVyU2VydmljZS5idWlsZENvbmZpZyhkZWZhdWx0Q29uZmlnLnRlbXBsYXRlX2lkLCBkZWZhdWx0Q29uZmlnLnRlbXBsYXRlX2h0bWwsIGRlZmF1bHRDb25maWcudGVtcGxhdGVfcmVwZWF0cyk7XG5cbiAgICAgICAgICAgIFBsYWNlaG9sZGVyU2VydmljZS5pbnN0YW50ID0gbmV3IFBsYWNlaG9sZGVyU2VydmljZShjb21waWxlZENvbmZpZ3MsIGNvbXBpbGVkRGVmYXVsdENvbmZpZ3MsIHBsYWNlaG9sZGVyQ29uZmlncy5nZXRDbGFzc05hbWUoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUGxhY2Vob2xkZXJTZXJ2aWNlLmluc3RhbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0VGVtcGxhdGVIdG1sKHRlbXBsYXRlX3BhdGg6IHN0cmluZywgdGVtcGxhdGVDYWNoZTogbmcuSVRlbXBsYXRlQ2FjaGVTZXJ2aWNlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlQ2FjaGUuZ2V0PHN0cmluZz4odGVtcGxhdGVfcGF0aCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVwZWF0VGVtcGxhdGUodGVtcGxhdGVfaHRtbDogc3RyaW5nLCB0ZW1wbGF0ZV9yZXBlYXQ6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGxldCBodG1sOiBzdHJpbmcgPSBhbmd1bGFyLmNvcHkodGVtcGxhdGVfaHRtbCk7XG4gICAgICAgIHRlbXBsYXRlX3JlcGVhdCA9IHRlbXBsYXRlX3JlcGVhdCAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRlbXBsYXRlX3JlcGVhdDsgaW5kZXgrKykge1xuICAgICAgICAgICAgaHRtbCA9IGh0bWwgKyB0ZW1wbGF0ZV9odG1sO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYnVpbGRDb25maWcodGVtcGxhdGVfaWQ6IHN0cmluZywgdGVtcGxhdGVfaHRtbDogc3RyaW5nLCB0ZW1wbGF0ZV9yZXBlYXQ6IG51bWJlcik6IElDb21waWxlZENvbmZpZ01vZGVsIHtcblxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IFBsYWNlaG9sZGVyU2VydmljZS5yZXBlYXRUZW1wbGF0ZSh0ZW1wbGF0ZV9odG1sLCB0ZW1wbGF0ZV9yZXBlYXQpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZV9pZDogdGVtcGxhdGVfaWQsXG4gICAgICAgICAgICB0ZW1wbGF0ZV9odG1sOiB0ZW1wbGF0ZV9odG1sLFxuICAgICAgICAgICAgdGVtcGxhdGVfcmVwZWF0OiB0ZW1wbGF0ZV9yZXBlYXQsXG4gICAgICAgICAgICB0ZW1wbGF0ZV9jb21waWxlZDogYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGNvbXBpbGVDb25maWdzKGNvbmZpZ3M6IEFycmF5PElDb25maWdNb2RlbD4sICR0ZW1wbGF0ZUNhY2hlOiBuZy5JVGVtcGxhdGVDYWNoZVNlcnZpY2UpOiBBcnJheTxJQ29tcGlsZWRDb25maWdNb2RlbD4ge1xuICAgICAgICBsZXQgY29tcGlsZWRDb25maWdzOiBBcnJheTxJQ29tcGlsZWRDb25maWdNb2RlbD4gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgbGV0IGNvbXBpbGVkQ29uZmlnOiBJQ29tcGlsZWRDb25maWdNb2RlbDtcbiAgICAgICAgbGV0IHRlbXBsYXRlX2lkOiBzdHJpbmc7XG4gICAgICAgIGxldCB0ZW1wbGF0ZV9wYXRoOiBzdHJpbmc7XG4gICAgICAgIGxldCB0ZW1wbGF0ZV9odG1sOiBzdHJpbmc7XG4gICAgICAgIGxldCB0ZW1wbGF0ZV9yZXBlYXQ6IG51bWJlcjtcblxuXG4gICAgICAgIGNvbmZpZ3MuZm9yRWFjaChmdW5jdGlvbiBpdGVyYXRvcihjb25maWc6IElDb25maWdNb2RlbCkge1xuXG4gICAgICAgICAgICB0ZW1wbGF0ZV9pZCA9IGNvbmZpZy50ZW1wbGF0ZV9pZDtcbiAgICAgICAgICAgIHRlbXBsYXRlX2h0bWwgPSBQbGFjZWhvbGRlclNlcnZpY2UuZ2V0VGVtcGxhdGVIdG1sKGNvbmZpZy50ZW1wbGF0ZV9wYXRoLCAkdGVtcGxhdGVDYWNoZSkgfHwgY29uZmlnLnRlbXBsYXRlX2h0bWw7XG4gICAgICAgICAgICB0ZW1wbGF0ZV9yZXBlYXQgPSBjb25maWcudGVtcGxhdGVfcmVwZWF0cyB8fCAxO1xuICAgICAgICAgICAgY29tcGlsZWRDb25maWcgPSBQbGFjZWhvbGRlclNlcnZpY2UuYnVpbGRDb25maWcodGVtcGxhdGVfaWQsIHRlbXBsYXRlX2h0bWwsIHRlbXBsYXRlX3JlcGVhdCk7XG5cbiAgICAgICAgICAgIGNvbXBpbGVkQ29uZmlncy5wdXNoKGNvbXBpbGVkQ29uZmlnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkQ29uZmlncztcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcGVhdFRlbXBsYXRlKGNvbmZpZzogSUNvbXBpbGVkQ29uZmlnTW9kZWwsIHRlbXBsYXRlX3JlcGVhdHM6IG51bWJlcik6IEpRdWVyeSB7XG4gICAgICAgIGlmIChjb25maWcudGVtcGxhdGVfcmVwZWF0ID09PSB0ZW1wbGF0ZV9yZXBlYXRzIHx8IGFuZ3VsYXIuaXNVbmRlZmluZWQodGVtcGxhdGVfcmVwZWF0cykpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcudGVtcGxhdGVfY29tcGlsZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IFBsYWNlaG9sZGVyU2VydmljZS5yZXBlYXRUZW1wbGF0ZShjb25maWcudGVtcGxhdGVfaHRtbCwgdGVtcGxhdGVfcmVwZWF0cyk7XG5cbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuZWxlbWVudCh0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRlbXBsYXRlKHRlbXBsYXRlX2lkOiBzdHJpbmcsIHRlbXBsYXRlX3JlcGVhdHM6IG51bWJlcik6IEpRdWVyeSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHRlbXBsYXRlOiBKUXVlcnkgPSBzZWxmLmRlZmF1bHRDb25maWcudGVtcGxhdGVfY29tcGlsZWQ7XG5cbiAgICAgICAgc2VsZi5jb25maWdzLmZvckVhY2goZnVuY3Rpb24gY29uZmlnSXRlcmF0b3IoY29uZmlnOiBJQ29tcGlsZWRDb25maWdNb2RlbCkge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy50ZW1wbGF0ZV9pZCA9PT0gdGVtcGxhdGVfaWQpIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHNlbGYucmVwZWF0VGVtcGxhdGUoY29uZmlnLCB0ZW1wbGF0ZV9yZXBlYXRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NOYW1lO1xuICAgIH1cblxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25nLXBsYWNlaG9sZGVyLXNlcnZpY2UudHNcbiAqKi8iLCJpbXBvcnQgeyBQbGFjZWhvbGRlclNlcnZpY2UsIElDb21waWxlZENvbmZpZ01vZGVsIH0gZnJvbSAnLi9uZy1wbGFjZWhvbGRlci1zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJTlBTY29wZSBleHRlbmRzIG5nLklBdHRyaWJ1dGVzIHtcbiAgICB0ZW1wbGF0ZUlkOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVSZXBlYXRzOiBzdHJpbmc7XG4gICAgc2hvd1VudGlsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQbGFjZWhvbGRlckRpcmVjdGl2ZSgkYW5pbWF0ZTogYW5ndWxhci5hbmltYXRlLklBbmltYXRlU2VydmljZSwgcGxhY2Vob2xkZXJTZXJ2aWNlOiBQbGFjZWhvbGRlclNlcnZpY2UpIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zY2x1ZGU6ICdlbGVtZW50JyxcbiAgICAgICAgbGluazogZnVuY3Rpb24gbGlua0Z1bmN0aW9uKFxuICAgICAgICAgICAgc2NvcGU6IG5nLklTY29wZSxcbiAgICAgICAgICAgIGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UsXG4gICAgICAgICAgICBhdHRyczogSU5QU2NvcGUsXG4gICAgICAgICAgICBjb250cm9sbGVyOiBuZy5JQ29udHJvbGxlclByb3ZpZGVyLFxuICAgICAgICAgICAgdHJhbnNjbHVkZUZuOiBuZy5JVHJhbnNjbHVkZUZ1bmN0aW9uXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGVfaWQ6IHN0cmluZyAgICAgICA9IGF0dHJzLnRlbXBsYXRlSWQ7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZV9yZXBlYXRzOiBudW1iZXIgID0gcGFyc2VJbnQoYXR0cnMudGVtcGxhdGVSZXBlYXRzLCAxMCk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZTogSlF1ZXJ5ID0gcGxhY2Vob2xkZXJTZXJ2aWNlLmdldFRlbXBsYXRlKHRlbXBsYXRlX2lkLCB0ZW1wbGF0ZV9yZXBlYXRzKTtcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZTogc3RyaW5nID0gcGxhY2Vob2xkZXJTZXJ2aWNlLmdldENsYXNzTmFtZSgpO1xuICAgICAgICAgICAgbGV0IGNoaWxkcmVuczogYW55O1xuXG4gICAgICAgICAgICB0cmFuc2NsdWRlRm4oc2NvcGUsIGZ1bmN0aW9uIHRyYW5zY2x1ZGVGdW5jdGlvbihjbG9uZTogSlF1ZXJ5LCBzY29wZTogbmcuSVNjb3BlKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5zID0gY2xvbmUuY2hpbGRyZW4oKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjaGlsZHJlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuc1tpbmRleF0gPSBhbmd1bGFyLmVsZW1lbnQoY2hpbGRyZW5zW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuc1tpbmRleF0uYWRkQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjbG9uZS5hcHBlbmQodGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVwbGFjZVdpdGgoY2xvbmUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGF0dHJzLiRvYnNlcnZlKCdzaG93VW50aWwnLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY2hpbGRyZW5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5zW2luZGV4XS5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9uZy1wbGFjZWhvbGRlci1kaXJlY3RpdmUudHNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9