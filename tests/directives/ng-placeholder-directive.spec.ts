describe('When use decorator to disable ngPlaceholderDirective', () => {

    interface INPScope extends ng.IRootScopeService {
        templateId?: string;
        templateRepeats?: string;
        showUntil?: string;
    }

    let $scope: INPScope;
    let $compile: ng.ICompileService;
    let placeholderConfigProvider: Placeholder.IPlaceholderConfigProvider;
    let placeholderConfigService: Placeholder.IPlaceholderConfigService;
    let placeholderService: Placeholder.IPlaceholderService;

    beforeEach(angular.mock.module('ng-placeholder'));

    beforeEach(() => {
        inject([
            '$rootScope',
            '$compile',
            'NgPlaceholderConfig',
            'NgPlaceholderService',
            (
                _$rootScope_: ng.IRootScopeService,
                _$compile_: ng.ICompileService,
                _NgPlaceholderConfigService_: Placeholder.IPlaceholderConfigService,
                _NgPlaceholderService_: Placeholder.IPlaceholderService
            ) => {
                $scope = _$rootScope_.$new();
                $compile = _$compile_;
                placeholderConfigService = _NgPlaceholderConfigService_;
                placeholderService = _NgPlaceholderService_;
            }
        ]);
    });

    it('Should create directive with default template', () => {
        var element = $compile('<div><ng-placeholder><label></lable></ng-placeholder></div>')($scope);
        $scope.$apply();

        expect(element.length).toBe(1);
        expect(element.find('p').length).toBe(1);
        expect(element.find('p').text()).toBe('Loading...');
        expect(element.find('label').length).toBe(1);
        expect(element.find('label').hasClass('ng-cloak')).toBeTruthy();
    });

    it('Should create directive with default template', () => {
        var element = $compile('<div><ng-placeholder show-until="{{showUntil}}"><label></lable></ng-placeholder></div>')($scope);
        $scope.$apply();

        expect(element.length).toBe(1);
        expect(element.find('p').length).toBe(1);
        expect(element.find('p').text()).toBe('Loading...');

        $scope.showUntil = 'true';
        $scope.$apply();

        expect(element.length).toBe(1);
        expect(element.find('p').length).toBe(0);
        expect(element.find('label').length).toBe(1);
        expect(element.find('label').hasClass('ng-cloak')).toBeFalsy();
    });

});