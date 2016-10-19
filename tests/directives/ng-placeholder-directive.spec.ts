describe('When use decorator to disable ngPlaceholderDirective', () => {

    interface ITestScope extends ng.IScope {
        placeholderId?: string;
        placeholderRepeats?: string;
        placeholderShowUntil?: string;
    }

    let $scope: ITestScope;
    let $compile: ng.ICompileService;
    let placeholderConfigProvider: Placeholder.IPlaceholderConfigProvider;
    let placeholderConfigService: Placeholder.IPlaceholderConfigService;
    let placeholderService: Placeholder.IPlaceholderService;

    beforeEach(angular.mock.module('ngPlaceholder'));

    beforeEach(() => {
        inject([
            '$rootScope',
            '$compile',
            'ngPlaceholderConfig',
            'ngPlaceholderService',
            (
                _$rootScope_: ng.IRootScopeService,
                _$compile_: ng.ICompileService,
                _ngPlaceholderConfigService_: Placeholder.IPlaceholderConfigService,
                _ngPlaceholderService_: Placeholder.IPlaceholderService
            ) => {
                $scope = _$rootScope_.$new();
                $compile = _$compile_;
                placeholderConfigService = _ngPlaceholderConfigService_;
                placeholderService = _ngPlaceholderService_;
            }
        ]);
    });

    it('Should create directive with default template', () => {
        var element = $compile('<div><ng-placeholder><label></lable></ng-placeholder></div>')($scope);
        $scope.$apply();

        expect(element.length).toBe(1);
        expect(element.find('p').length).toBe(1);
        expect(element.find('p').text()).toBe('Loading...');
        expect(element.find('label').length).toBe(0);
    });

    it('Should create directive with default template', () => {
        var element = $compile('<div><ng-placeholder placeholder-show-until="{{placeholderShowUntil}}"><label></lable></ng-placeholder></div>')($scope);
        $scope.$apply();

        expect(element.length).toBe(1);
        expect(element.find('p').length).toBe(1);
        expect(element.find('p').text()).toBe('Loading...');
        expect(element.find('label').length).toBe(0);

        $scope.placeholderShowUntil = 'true';
        $scope.$apply();

        expect(element.length).toBe(1);
        expect(element.find('p').length).toBe(0);
        expect(element.find('label').length).toBe(1);
    });

});