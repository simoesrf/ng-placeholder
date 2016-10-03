import { PlaceholderService, ICompiledConfigModel } from './ng-placeholder-service';

export interface INPScope extends ng.IAttributes {
    templateId: string;
    templateRepeats: string;
    showUntil: string;
}

export function PlaceholderDirective($animate: angular.animate.IAnimateService, placeholderService: PlaceholderService) {

    return {
        transclude: 'element',
        link: function linkFunction(
            scope: ng.IScope,
            element: ng.IRootElementService,
            attrs: INPScope,
            controller: ng.IControllerProvider,
            transcludeFn: ng.ITranscludeFunction
        ) {
            const template_id: string       = attrs.templateId;
            const template_repeats: number  = parseInt(attrs.templateRepeats, 10);
            const template: JQuery = placeholderService.getTemplate(template_id, template_repeats);
            const className: string = placeholderService.getClassName();
            let childrens: any;

            transcludeFn(scope, function transcludeFunction(clone: JQuery, scope: ng.IScope): void {
                childrens = clone.children();

                for (let index = 0; index < childrens.length; index++) {
                    childrens[index] = angular.element(childrens[index]);
                    childrens[index].addClass(className);
                }

                clone.append(template);
                element.replaceWith(clone);
            });

            attrs.$observe('showUntil', (value) => {
                if (value === 'true') {
                    for (let index = 0; index < childrens.length; index++) {
                        childrens[index].removeClass(className);
                    }
                    template.remove();
                }
             });
        }
    }
}

PlaceholderDirective.$inject = ['$animate', 'NgPlaceholderService'];