export class ApplicationRun {

    constructor (placeholderConfig: Placeholder.IPlaceholderConfigService) {
        const config = placeholderConfig.isEnabled();
        console.log(config);
    }

}

ApplicationRun.$inject = ['NgPlaceholderConfig'];
