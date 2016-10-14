export class PlaceholderDirectiveDecorator implements Placeholder.IPlaceholderDirectiveDecorator {

    constructor($delegate: any, placeholderConfig: Placeholder.IPlaceholderConfigService) {
        return placeholderConfig.isEnabled() ? $delegate : {};
    }

}

PlaceholderDirectiveDecorator.$inject = ['$delegate', 'NgPlaceholderConfig'];
