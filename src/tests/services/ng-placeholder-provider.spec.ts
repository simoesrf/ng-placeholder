fdescribe('When use PlaceholderConfigProvider', () => {
    let placeholderConfigProvider: Placeholder.IPlaceholderConfigProvider;
    let placeholderConfigService: Placeholder.IPlaceholderConfigService;

    beforeAll(() => {
        angular.mock.module('ng-placeholder');
        angular.mock.module([
            'NgPlaceholderConfigProvider',
            function (
                _PlaceholderConfigProvider_: Placeholder.IPlaceholderConfigProvider
            ) {
                placeholderConfigProvider = _PlaceholderConfigProvider_;
            }
        ]);
    });

    beforeEach(() => {
        inject([
            'NgPlaceholderConfig',
            function (
                _NgPlaceholderConfigService_: Placeholder.IPlaceholderConfigService
            ) {
                placeholderConfigService = _NgPlaceholderConfigService_;
            }
        ]);
    });

    it('Should have public methods to set configurations in config fase', () => {
        expect(placeholderConfigProvider.addConfig).toBeDefined();
        expect(placeholderConfigProvider.setConfigs).toBeDefined();
        expect(placeholderConfigProvider.setDefaultConfig).toBeDefined();
        expect(placeholderConfigProvider.setCustomClass).toBeDefined();
        expect(placeholderConfigProvider.enable).toBeDefined();
        expect(placeholderConfigProvider.disable).toBeDefined();
    });

    it('Should have public methods to get configurations during runtime', () => {
        expect(placeholderConfigService.getClassName).toBeDefined();
        expect(placeholderConfigService.getDefaultTemplate).toBeDefined();
        expect(placeholderConfigService.getTemplates).toBeDefined();
        expect(placeholderConfigService.isEnabled).toBeDefined();
    });

    describe('When there are no configurations setted', () => {
        it('Should return default template configuration', () => {
            const defaultTemplate = placeholderConfigService.getDefaultTemplate();
            expect(defaultTemplate).toEqual({
                template_id: 'default',
                template_html: '<p>Loading...</p>',
                template_repeats: 1
            });
        });
        it('Should return an empty array with no custom configurations', () => {
            expect(placeholderConfigService.getTemplates()).toEqual([]);
        });
        it('Should return an empty array with no custom configurations', () => {
            expect(placeholderConfigService.getClassName()).toEqual('ng-cloak');
        });
    });
});