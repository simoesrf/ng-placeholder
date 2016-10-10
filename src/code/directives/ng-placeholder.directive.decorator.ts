export class PlaceholderDirectiveDecorator {

    constructor ($delegate: any, placeholderConfig: Placeholder.IPlaceholderConfigService) {
        const config = placeholderConfig.isEnabled();

        if (!config) {
                $delegate = {};
            }

        return $delegate;
    }

}

PlaceholderDirectiveDecorator.$inject = ['$delegate', 'NgPlaceholderConfig'];
