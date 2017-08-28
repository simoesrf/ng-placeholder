var ngPlaceholder = (function (exports) {
'use strict';

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
        return new PlaceholderConfigService(this.configs, this.defaultConfig, this.active);
    };
    return PlaceholderProvider;
}());

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
            template_compiled: template
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
        var template;
        var config;
        for (var index = 0; index < this.configs.length; index++) {
            config = this.configs[index];
            if (config.template_id === template_id) {
                return this.isRepeatTemplate(config, template_repeats) ?
                    this.repeatTemplate(config.template_html, template_repeats) : config.template_compiled;
            }
        }
        return angular.copy(template || self.defaultConfig.template_compiled);
    };
    return PlaceholderService;
}());
PlaceholderService.$inject = ['$templateCache', 'ngPlaceholderConfig'];

function PlaceholderDirective($compile, $animate, placeholderService) {
    return {
        restrict: 'AE',
        transclude: 'element',
        link: function (scope, element, attributes, controller, transclude) {
            var childScope;
            var previousElement;
            var id = attributes.ngPlaceholder;
            var repeats = parseInt(attributes.placeholderRepeats, 10) || 1;
            var template = $compile(placeholderService.getTemplate(id, repeats))(scope);
            $animate.enter(template, element.parent(), element);
            attributes.$observe('placeholderShowUntil', function (value) {
                if (value === 'true') {
                    transclude(function (clone, newScope) {
                        childScope = newScope;
                        previousElement = clone;
                        $animate.leave(template);
                        $animate.enter(clone, element.parent(), element);
                    });
                }
                if (value === 'false' && childScope) {
                    childScope.$destroy();
                    childScope = null;
                    $animate.leave(previousElement);
                    previousElement = null;
                    $animate.enter(template, element.parent(), element);
                }
            });
        }
    };
}
PlaceholderDirective.$inject = ['$compile', '$animate', 'ngPlaceholderService'];

var PlaceholderDirectiveDecorator = (function () {
    function PlaceholderDirectiveDecorator($delegate, placeholderConfig) {
        return placeholderConfig.isEnabled() ? $delegate : {};
    }
    return PlaceholderDirectiveDecorator;
}());
PlaceholderDirectiveDecorator.$inject = ['$delegate', 'ngPlaceholderConfig'];

(function (Placeholder) {
    angular.module('ngPlaceholder', []);
    angular.module('ngPlaceholder').provider('ngPlaceholderConfig', PlaceholderProvider);
    angular.module('ngPlaceholder').service('ngPlaceholderService', PlaceholderService);
    angular.module('ngPlaceholder').directive('ngPlaceholder', PlaceholderDirective);
    angular.module('ngPlaceholder').decorator('ngPlaceholderDirective', PlaceholderDirectiveDecorator);
})(exports.Placeholder || (exports.Placeholder = {}));

return exports;

}({}));
