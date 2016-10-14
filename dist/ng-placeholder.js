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
	        angular.module('ng-placeholder', []);
	        angular.module('ng-placeholder').provider('NgPlaceholderConfig', ng_placeholder_provider_1.PlaceholderProvider);
	        angular.module('ng-placeholder').service('NgPlaceholderService', ng_placeholder_service_1.PlaceholderService);
	        angular.module('ng-placeholder').directive('ngPlaceholder', ng_placeholder_directive_1.PlaceholderDirective);
	        angular.module('ng-placeholder').decorator('ngPlaceholderDirective', ng_placeholder_directive_decorator_1.PlaceholderDirectiveDecorator);
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
	            this.customClass = 'ng-cloak';
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
	            return new ng_placeholder_config_service_provider_1.PlaceholderConfigService(this.configs, this.defaultConfig, this.active, this.customClass);
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
	        function PlaceholderConfigService(configs, defaultConfig, enable, className) {
	            if (configs === void 0) { configs = []; }
	            if (enable === void 0) { enable = true; }
	            if (className === void 0) { className = 'ng-cloak'; }
	            this.configs = configs;
	            this.default = defaultConfig;
	            this.enable = enable;
	            this.className = className;
	        }
	        PlaceholderConfigService.prototype.getTemplates = function () {
	            return this.configs;
	        };
	        PlaceholderConfigService.prototype.getDefaultTemplate = function () {
	            return this.default;
	        };
	        PlaceholderConfigService.prototype.getClassName = function () {
	            return this.className;
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
	            var compiledConfigs = this.compileConfigs(placeholderConfigs.getTemplates(), $templateCache);
	            var compiledDefaultConfigs = this.buildConfig(defaultConfig.template_id, defaultConfig.template_html, defaultConfig.template_repeats);
	            this.configs = compiledConfigs;
	            this.defaultConfig = compiledDefaultConfigs;
	            this.className = placeholderConfigs.getClassName();
	        }
	        PlaceholderService.prototype.getTemplateHtml = function (template_path, templateCache) {
	            return templateCache.get(template_path);
	        };
	        PlaceholderService.prototype.repeatDefaultTemplate = function (template_html, template_repeat) {
	            var html = angular.copy(template_html);
	            template_repeat = template_repeat - 1;
	            for (var index = 0; index < template_repeat; index++) {
	                html = html + template_html;
	            }
	            return html;
	        };
	        PlaceholderService.prototype.buildConfig = function (template_id, template_html, template_repeat) {
	            var template = this.repeatDefaultTemplate(template_html, template_repeat);
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
	        PlaceholderService.prototype.repeatTemplate = function (config, template_repeats) {
	            if (config.template_repeat === template_repeats || angular.isUndefined(template_repeats)) {
	                return config.template_compiled;
	            }
	            var template = this.repeatDefaultTemplate(config.template_html, template_repeats);
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
	    PlaceholderService.$inject = ['$templateCache', 'NgPlaceholderConfig'];
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    function PlaceholderDirective(placeholderService) {
	        return {
	            restrict: 'AECM',
	            transclude: 'element',
	            link: function linkFunction(scope, element, attrs, controller, transcludeFn) {
	                var template_id = attrs.templateId;
	                var template_repeats = parseInt(attrs.templateRepeats, 10);
	                var template = placeholderService.getTemplate(template_id, template_repeats);
	                var className = placeholderService.getClassName();
	                var childrens;
	                transcludeFn(scope, function transcludeFunction(clone, childScope) {
	                    childrens = clone.children() || [];
	                    for (var index = 0; childrens.length && index < childrens.length; index++) {
	                        childrens[index] = angular.element(childrens[index]);
	                        childrens[index].addClass(className);
	                    }
	                    element.after(template);
	                    element.after(clone);
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
	    PlaceholderDirective.$inject = ['NgPlaceholderService'];
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
	    PlaceholderDirectiveDecorator.$inject = ['$delegate', 'NgPlaceholderConfig'];
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);
//# sourceMappingURL=ng-placeholder.js.map