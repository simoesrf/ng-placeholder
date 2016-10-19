
# ng-placeholder
A simple directive that place a template while a specific directive loads.

### Status
[![Build Status](https://travis-ci.org/rfskitles/ng-placeholder.svg?branch=master)](https://travis-ci.org/rfskitles/ng-placeholder) [![codecov](https://codecov.io/gh/rfskitles/ng-placeholder/branch/master/graph/badge.svg)](https://codecov.io/gh/rfskitles/ng-placeholder)


### Configuration
To configure the module, you just need to set some information in you applicaiton config.

```
angular.module('your-app', ['ng-placeholder']);

angular.module('your-app').config(['ngPlaceholderConfigProvider', function (placeholderConfigProvider) {
    /* You can set a list with all the configurations.
     *
     * Object params:
     *  - template_id       (string|required|unique) - Template id.
     *  - template_html     (string) - HTML Code.
     *  - template_path     (string) - Path for placeholder template.
     *  - template_repeat   (number|default(1)) - How many times the template repeats.
     *
     *  You must set template_html or template_path but not both
     */
    placeholderConfigProvider.setConfigs([
        {template_id: 'templateid1', template_html: '<p>My Template String</p>', template_repeats: 1},
        {template_id: 'templateid2', template_path: './path/to/template.html', template_repeats: 1}
    ]);

    /* You can simply add a single configuration.
     *
     * Object params:
     *  - template_id       (string|required|unique) - Template id.
     *  - template_html     (string) - HTML Code.
     *  - template_path     (string) - Path for placeholder template.
     *  - template_repeat   (number|default(1)) - How many times the template repeats.
     *
     *  You must set template_html or template_path but not both
     */
    placeholderConfigProvider.addConfig({
        template_id: 'templateid3',
        template_path: './path/to/template.html'
    });

    /* You can define a default template.
     * This template is used as callback when something goes wrong.
     * If you do not define this, <p>Loading...</p> will be used as default.
     *
     * Object params:
     *  - template_id       (string|required|unique) - Template id.
     *  - template_html     (string) - HTML Code.
     *  - template_path     (string) - Path for placeholder template.
     *  - template_repeat   (number|default(1)) - How many times the template repeats.
     *
     *  You must set template_html or template_path but not both
     */
    placeholderConfigProvider.setDefaultConfig({
        template_id: 'default-template',
        template_path: './path/to/template.html'
    });

    // Disable module
    placeholderConfigProvider.disable();

}]);
```

### How to use it.
To use it, you just need to set the directive in your directive template.

```
angular.module('your-app').directive('yourDirective', [
    function () {
        return {
            controller: function () {
                var self = this;
                self.isReady = false;

                requestSomeData.then(function () {
                    ...
                    self.isReady = true;
                }).catch(function () {
                    ...
                    self.isReady = true;
                })
            },
            controllerAs: 'ctrl',
            template: `
                <div ng-placeholder="templateid3" placeholder-show-until="{{ctrl.isReady}}">
                    Div content that should be present.
                </div>`
        }
    }
]);
```
