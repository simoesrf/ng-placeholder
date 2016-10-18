export function PlaceholderDirective(
    $animate: ng.animate.IAnimateService,
    placeholderService: Placeholder.IPlaceholderService
): ng.IDirective {

    return {
        restrict: 'AE',
        priority: 2001,
        link: function (
            scope: ng.IScope,
            element: ng.IRootElementService,
            attributes: Placeholder.INPScope,
            controller: ng.IController,
            transclude: ng.ITranscludeFunction
        ) {
            const className: string = placeholderService.getClassName();
            const template_id: string = attributes.templateId;
            const template_repeats: number = parseInt(attributes.templateRepeats, 10);
            let template: JQuery = placeholderService.getTemplate(template_id, template_repeats);

            $animate.addClass(element, className);
            $animate.enter(template, null, element);

            attributes.$observe('showUntil', (value: string) => {
                if (value === 'true') {
                    $animate.leave(template);
                    $animate.removeClass(element, className);
                }
            });

        }
    }
}

PlaceholderDirective.$inject = ['$animate', 'ngPlaceholderService'];