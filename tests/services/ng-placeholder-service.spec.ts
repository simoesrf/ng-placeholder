import * as angular from 'angular';
import { PlaceholderService } from '../../src/services/PlaceholderService';

describe('When use PlaceholderService', () => {
    let placeholderConfigProvider: Placeholder.IPlaceholderConfigProvider;
    let placeholderConfigService: Placeholder.IPlaceholderConfigService;
    let placeholderService: Placeholder.IPlaceholderService;
    let $templateCache: ng.ITemplateCacheService;

    beforeEach(() => {
        angular.mock.module('ngPlaceholder');

        angular.mock.module([
            'ngPlaceholderConfigProvider',
            (_PlaceholderConfigProvider_: Placeholder.IPlaceholderConfigProvider) => {
                placeholderConfigProvider = _PlaceholderConfigProvider_;
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
        let template = angular.element(placeholderService.getTemplate('test', 1));

        expect(template.length).toBe(1);
        expect(template[0].innerHTML).toBe('This is a unit test');

        template = angular.element(placeholderService.getTemplate('teste', 1));
        expect(template.length).toBe(1);
        expect(template[0].innerHTML).toBe('Loading...');
    });

    it('Should return the template with repeated n times', () => {
        const template_2 = angular.element(placeholderService.getTemplate('test', 2));
        const template_3 = angular.element(placeholderService.getTemplate('test', 3));

        expect(template_2.length).toBe(2);
        expect(template_2[0].innerHTML).toBe('This is a unit test');
        expect(template_2[1].innerHTML).toBe('This is a unit test');

        expect(template_3.length).toBe(3);
        expect(template_3[0].innerHTML).toBe('This is a unit test');
        expect(template_3[1].innerHTML).toBe('This is a unit test');
        expect(template_3[2].innerHTML).toBe('This is a unit test');
    });
});