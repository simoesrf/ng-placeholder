export function PlaceholderDirective(
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
            const id = attributes.placeholderId;
            const repeats = parseInt(attributes.placeholderRepeats, 10) || 1;
            const template: JQuery = placeholderService.getTemplate(id, repeats);

            $animate.enter(template, null, element);

            attributes.$observe('placeholderShowUntil', (value: string) => {
                if (value === 'true') {
                    transclude((clone) => {
                        $animate.leave(template);
                        $animate.enter(clone, null, element);
                    });
                }
            });


        }
    }
}

PlaceholderDirective.$inject = ['$animate', 'ngPlaceholderService'];