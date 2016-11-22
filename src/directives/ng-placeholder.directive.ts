export function PlaceholderDirective(
    $compile: ng.ICompileService,
    $animate: ng.animate.IAnimateService,
    placeholderService: Placeholder.IPlaceholderService
): ng.IDirective {

    return {
        restrict: 'AE',
        transclude: 'element',
        link: function (
            scope: ng.IScope,
            element: ng.IRootElementService,
            attributes: Placeholder.INPScope,
            controller: ng.IController,
            transclude: ng.ITranscludeFunction
        ) {
            let childScope: ng.IScope;
            let previousElement: ng.IRootElementService;
            const id = attributes.ngPlaceholder;
            const repeats = parseInt(attributes.placeholderRepeats, 10) || 1;
            const template = $compile(placeholderService.getTemplate(id, repeats))(scope);

            $animate.enter(template, element.parent(), element);

            attributes.$observe('placeholderShowUntil', (value: string) => {
                if (value === 'true') {
                    transclude((clone, newScope) => {
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
    }
}

PlaceholderDirective.$inject = ['$compile', '$animate', 'ngPlaceholderService'];