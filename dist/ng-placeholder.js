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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ng_placeholder_provider_1, ng_placeholder_service_1, ng_placeholder_directive_1, ng_placeholder_directive_decorator_1) {
	    "use strict";
	    var Placeholder;
	    (function (Placeholder) {
	        angular.module('ngPlaceholder', []);
	        angular.module('ngPlaceholder').provider('ngPlaceholderConfig', ng_placeholder_provider_1.PlaceholderProvider);
	        angular.module('ngPlaceholder').service('ngPlaceholderService', ng_placeholder_service_1.PlaceholderService);
	        angular.module('ngPlaceholder').directive('ngPlaceholder', ng_placeholder_directive_1.PlaceholderDirective);
	        angular.module('ngPlaceholder').decorator('ngPlaceholderDirective', ng_placeholder_directive_decorator_1.PlaceholderDirectiveDecorator);
	    })(Placeholder = exports.Placeholder || (exports.Placeholder = {}));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ng_placeholder_config_service_provider_1) {
	    "use strict";
	    var PlaceholderProvider = (function () {
	        function PlaceholderProvider() {
	            this.active = true;
	            this.configs = new Array();
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
	            this.configs = this.configs.concat(configs);
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
	            return new ng_placeholder_config_service_provider_1.PlaceholderConfigService(this.configs, this.defaultConfig, this.active);
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
	    var PlaceholderConfigService = (function () {
	        function PlaceholderConfigService(configs, defaultConfig, enable) {
	            if (configs === void 0) { configs = []; }
	            if (enable === void 0) { enable = true; }
	            this.configs = configs;
	            this.default = defaultConfig;
	            this.enable = enable;
	        }
	        PlaceholderConfigService.prototype.getTemplates = function () {
	            return this.configs;
	        };
	        PlaceholderConfigService.prototype.getDefaultTemplate = function () {
	            return this.default;
	        };
	        PlaceholderConfigService.prototype.isEnabled = function () {
	            return this.enable;
	        };
	        return PlaceholderConfigService;
	    }());
	    exports.PlaceholderConfigService = PlaceholderConfigService;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var PlaceholderService = (function () {
	        function PlaceholderService($templateCache, placeholderConfigs) {
	            var defaultConfig = placeholderConfigs.getDefaultTemplate();
	            var compiledDefaultConfigs = this.buildConfig(defaultConfig.template_id, defaultConfig.template_html, defaultConfig.template_repeats);
	            this.configs = this.compileConfigs(placeholderConfigs.getTemplates(), $templateCache);
	            this.defaultConfig = compiledDefaultConfigs;
	        }
	        PlaceholderService.prototype.getTemplateHtml = function (template_path, templateCache) {
	            return templateCache.get(template_path);
	        };
	        PlaceholderService.prototype.repeatTemplate = function (template_html, template_repeat) {
	            var template = '';
	            for (var index = 0; index < template_repeat; index++) {
	                template = template + template_html;
	            }
	            return template;
	        };
	        PlaceholderService.prototype.buildConfig = function (template_id, template_html, template_repeat) {
	            var template = this.repeatTemplate(template_html, template_repeat);
	            return {
	                template_id: template_id,
	                template_html: template_html,
	                template_repeat: template_repeat,
	                template_compiled: angular.element(template)
	            };
	        };
	        PlaceholderService.prototype.compileConfigs = function (configs, $templateCache) {
	            var self = this;
	            var compiledConfigs = new Array();
	            var compiledConfig;
	            var template_id;
	            var template_path;
	            var template_html;
	            var template_repeat;
	            configs.forEach(function iterator(config) {
	                template_id = config.template_id;
	                template_html = self.getTemplateHtml(config.template_path, $templateCache) || config.template_html;
	                template_repeat = config.template_repeats || 1;
	                compiledConfig = self.buildConfig(template_id, template_html, template_repeat);
	                compiledConfigs.push(compiledConfig);
	            });
	            return compiledConfigs;
	        };
	        PlaceholderService.prototype.isRepeatTemplate = function (config, template_repeats) {
	            return !(config.template_repeat === template_repeats || angular.isUndefined(template_repeats));
	        };
	        PlaceholderService.prototype.getTemplate = function (template_id, template_repeats) {
	            var self = this;
	            var template = self.defaultConfig.template_compiled;
	            self.configs.forEach(function configIterator(config) {
	                if (config.template_id === template_id) {
	                    template = angular.element(self.repeatTemplate(config.template_html, template_repeats));
	                    return;
	                }
	            });
	            return angular.copy(template);
	        };
	        return PlaceholderService;
	    }());
	    exports.PlaceholderService = PlaceholderService;
	    PlaceholderService.$inject = ['$templateCache', 'ngPlaceholderConfig'];
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    function PlaceholderDirective($animate, placeholderService) {
	        return {
	            restrict: 'AE',
	            transclude: 'element',
	            link: function (scope, element, attributes, controller, transclude) {
	                var id = attributes.placeholderId;
	                var repeats = parseInt(attributes.placeholderRepeats, 10) || 1;
	                var template = placeholderService.getTemplate(id, repeats);
	                $animate.enter(template, null, element);
	                attributes.$observe('placeholderShowUntil', function (value) {
	                    if (value === 'true') {
	                        transclude(function (clone) {
	                            $animate.leave(template);
	                            $animate.enter(clone, null, element);
	                        });
	                    }
	                });
	            }
	        };
	    }
	    exports.PlaceholderDirective = PlaceholderDirective;
	    PlaceholderDirective.$inject = ['$animate', 'ngPlaceholderService'];
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var PlaceholderDirectiveDecorator = (function () {
	        function PlaceholderDirectiveDecorator($delegate, placeholderConfig) {
	            return placeholderConfig.isEnabled() ? $delegate : {};
	        }
	        return PlaceholderDirectiveDecorator;
	    }());
	    exports.PlaceholderDirectiveDecorator = PlaceholderDirectiveDecorator;
	    PlaceholderDirectiveDecorator.$inject = ['$delegate', 'ngPlaceholderConfig'];
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);
//# sourceMappingURL=ng-placeholder.js.map