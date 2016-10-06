define(["require", "exports"], function (require, exports) {
    "use strict";
    var ApplicationRun = (function () {
        function ApplicationRun(placeholderConfig) {
            var config = placeholderConfig.isEnabled();
            console.log(config);
        }
        return ApplicationRun;
    }());
    exports.ApplicationRun = ApplicationRun;
    ApplicationRun.$inject = ['NgPlaceholderConfig'];
});
//# sourceMappingURL=module-run.js.map