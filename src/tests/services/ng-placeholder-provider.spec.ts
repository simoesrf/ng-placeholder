fdescribe('When use PlaceholderConfigProvider', () => {
    let placeholderConfigProvider: Placeholder.IPlaceholderConfigProvider;
    let placeholderConfigService: Placeholder.IPlaceholderConfigService;

    beforeAll(angular.mock.module('ng-placeholder'));

    beforeEach(() => {
        angular.mock.module([
            'NgPlaceholderConfigProvider',
            function (
                _PlaceholderConfigProvider_: Placeholder.IPlaceholderConfigProvider
            ) {
                placeholderConfigProvider = _PlaceholderConfigProvider_; // to use the provider in other parts
                placeholderConfigProvider.addConfig({
                    template_id: 'test',
                    template_html: '<p></p>'
                });
            }
        ]);
        inject([
            'NgPlaceholderConfig',
            function (
                _NgPlaceholderConfigService_: Placeholder.IPlaceholderConfigService
            ) {
                placeholderConfigService = _NgPlaceholderConfigService_;
            }
        ]);
    });

    it('Should return default template configuration', () => {
        const defaultTemplate = placeholderConfigService.getDefaultTemplate();
        expect(defaultTemplate).toBe({
            template_id: 'default',
            template_html: '<p>Loading...</p>',
            template_repeats: 1
        });
    });
});