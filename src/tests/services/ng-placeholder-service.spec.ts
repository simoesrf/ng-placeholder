import { PlaceholderService } from '../../code/services/ng-placeholder.service';

describe('When use PlaceholderService', () => {
    let placeholderConfig: Placeholder.IPlaceholderConfigProvider;
    let placeholderService: PlaceholderService;

    beforeAll(angular.mock.module('ng-placeholder'));

    beforeEach(() => {
        inject([
            'NgPlaceholderService',
            function (
                _NgPlaceholderService_: PlaceholderService
            ) {
                placeholderService = _NgPlaceholderService_;
            }
        ]);
    });

    it('Should return default configuration', () => {
        let test = placeholderService.getTemplate('test', 1);
        expect(test.html()).toBe('This is a unit test');
    });
});