describe('When use PlaceholderConfigProvider', () => {
    let placeholderConfigProvider: Placeholder.IPlaceholderConfigProvider;
    let placeholderConfigService: Placeholder.IPlaceholderConfigService;

    beforeEach(angular.mock.module('ng-placeholder'));

    beforeEach(() => {
        angular.mock.module([
            'ngPlaceholderConfigProvider',
            (_PlaceholderConfigProvider_: Placeholder.IPlaceholderConfigProvider) => {
                placeholderConfigProvider = _PlaceholderConfigProvider_;
                placeholderConfigProvider.enable();
            }
        ]);
    });

    describe('', () => {
        beforeEach(() => {
            inject([
                'ngPlaceholderConfig',
                (_ngPlaceholderConfigService_: Placeholder.IPlaceholderConfigService) => {
                    placeholderConfigService = _ngPlaceholderConfigService_;
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

        it('Should return default template configuration', () => {
            expect(placeholderConfigService.getDefaultTemplate()).toEqual({
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

        it('Should return an empty array with no custom configurations', () => {
            expect(placeholderConfigService.isEnabled()).toBeTruthy();
        });
    });

});

describe('When use PlaceholderConfigProvider with configuraitons', () => {
    let placeholderConfigProvider: Placeholder.IPlaceholderConfigProvider;
    let placeholderConfigService: Placeholder.IPlaceholderConfigService;

    beforeEach(angular.mock.module('ng-placeholder'));

    beforeEach(() => {
        angular.mock.module([
            'ngPlaceholderConfigProvider',
            (_PlaceholderConfigProvider_: Placeholder.IPlaceholderConfigProvider) => {
                placeholderConfigProvider = _PlaceholderConfigProvider_;
                placeholderConfigProvider.addConfig({
                    template_id: 'first-config',
                    template_html: '<p>Template first test</p>'
                });
                placeholderConfigProvider.setConfigs([
                    {
                        template_id: 'test',
                        template_html: '<p>Template test</p>'
                    }
                ]);
                placeholderConfigProvider.addConfig({
                    template_id: 'annother-config',
                    template_html: '<p>Template another test</p>',
                    template_repeats: 5
                });

                placeholderConfigProvider.setCustomClass('custom-class');
                placeholderConfigProvider.setDefaultConfig({
                    template_id: 'custom-default',
                    template_html: '<p>Custom default</p>'
                });
                placeholderConfigProvider.disable();
            }
        ]);
    });

    beforeEach(() => {
        inject([
            'ngPlaceholderConfig',
            (_ngPlaceholderConfigService_: Placeholder.IPlaceholderConfigService) => {
                placeholderConfigService = _ngPlaceholderConfigService_;
            }
        ]);
    });

    it('Should return custom default template configuration', () => {
            expect(placeholderConfigService.getDefaultTemplate()).toEqual({
                template_id: 'custom-default',
                template_html: '<p>Custom default</p>'
            });
        });

    it('Should return an array with template configurations', () => {
        expect(placeholderConfigService.getTemplates()).toEqual([
            {
                template_id: 'first-config',
                template_html: '<p>Template first test</p>'
            },
            {
                template_id: 'test',
                template_html: '<p>Template test</p>'
            },
            {
                template_id: 'annother-config',
                template_html: '<p>Template another test</p>',
                template_repeats: 5
            }
        ]);
    });

    it('Should return custom class to hide elements', () => {
        expect(placeholderConfigService.getClassName()).toEqual('custom-class');
    });

    it('Should be disable', () => {
        expect(placeholderConfigService.isEnabled()).toBeFalsy();
    });
});