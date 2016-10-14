import {PlaceholderService} from '../../src/services/ng-placeholder.service';

describe('When use PlaceholderService', () => {
    let placeholderConfigProvider: Placeholder.IPlaceholderConfigProvider;
    let placeholderConfigService: Placeholder.IPlaceholderConfigService;
    let placeholderService: Placeholder.IPlaceholderService;
    let $templateCache: ng.ITemplateCacheService;

    beforeEach(() => {
        angular.mock.module('ng-placeholder');

        angular.mock.module([
            'ngPlaceholderConfigProvider',
            (_PlaceholderConfigProvider_: Placeholder.IPlaceholderConfigProvider) => {
                placeholderConfigProvider = _PlaceholderConfigProvider_;
                placeholderConfigProvider.setCustomClass('custom-class');
                placeholderConfigProvider.addConfig({
                    template_id: 'test',
                    template_html: '<p>This is a unit test</p>'
                });
            }
        ]);

        inject([
            '$templateCache',
            'ngPlaceholderConfig',
            'ngPlaceholderService',
            function (
                _$templateCache_: ng.ITemplateCacheService,
                _PlaceholderConfigService_: Placeholder.IPlaceholderConfigService,
                _PlaceholderService_: Placeholder.IPlaceholderService
            ) {
                $templateCache              = _$templateCache_;
                placeholderConfigService    = _PlaceholderConfigService_;
                placeholderService          = _PlaceholderService_;
            }
        ]);
    });

    it('Should return the template with repeated 1 time', () => {
        let template = placeholderService.getTemplate('test');
        expect(template.length).toBe(1);
        expect(template[0].innerHTML).toBe('This is a unit test');

        template = placeholderService.getTemplate('teste');
        expect(template.length).toBe(1);
        expect(template[0].innerHTML).toBe('Loading...');
    });

    it('Should return the template with repeated n times', () => {
        const template_2 = placeholderService.getTemplate('test', 2);
        const template_3 = placeholderService.getTemplate('test', 3);

        expect(template_2.length).toBe(2);
        expect(template_2[0].innerHTML).toBe('This is a unit test');
        expect(template_2[1].innerHTML).toBe('This is a unit test');

        expect(template_3.length).toBe(3);
        expect(template_3[0].innerHTML).toBe('This is a unit test');
        expect(template_3[1].innerHTML).toBe('This is a unit test');
        expect(template_3[2].innerHTML).toBe('This is a unit test');
    });

    it('Should return class name', () => {
        expect(placeholderService.getClassName()).toBe('custom-class');
    });
});