import { PlaceholderService } from '../../code/ng-placeholder-service';

describe('When', () => {
    let placeholderService: PlaceholderService;

    beforeEach(() => {
        angular.mock.module('ng-placeholder');
    });

    beforeEach(() => {
        inject([
            'NgPlaceholderService',
            function (_NgPlaceholderService_: PlaceholderService) {
                 placeholderService = _NgPlaceholderService_;
            }
        ]);
    });

    xit('should behave...', () => {
        let test = placeholderService.getTemplate('', 1);
        expect(test.html()).toBe('Loading...');
    });

    it('should behave...', () => {
        let test = placeholderService.getTemplate('', 1);
        expect(test.html()).toBe('Loading...');
    });
});