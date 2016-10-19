describe('When use decorator to disable ngPlaceholderDirective', () => {
    let $scope: ng.IRootScopeService;
    let $compile: ng.ICompileService;
    let placeholderConfigProvider: Placeholder.IPlaceholderConfigProvider;
    let placeholderConfigService: Placeholder.IPlaceholderConfigService;
    let placeholderService: Placeholder.IPlaceholderService;
    let spyConfigServiceIsEnable: jasmine.Spy;
    beforeEach(angular.mock.module('ng-placeholder'));

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

                spyConfigServiceIsEnable = spyOn(placeholderConfigService, 'isEnabled');
                spyOn(placeholderService, 'getTemplate');
            }
        ]);
    });

    it('Should call placeholderService methods', () => {
        spyConfigServiceIsEnable.and.returnValues(true);
        var element = $compile('<div><ng-placeholder></ng-placeholder></div>')($scope);
        $scope.$apply();

        expect(placeholderConfigService.isEnabled).toHaveBeenCalled();
        expect(placeholderService.getTemplate).toHaveBeenCalled();
    });

    it('Should not call placeholderService methods', () => {
        spyConfigServiceIsEnable.and.returnValues(false);
        var element = $compile('<div ng-placeholder></div>')($scope);
        $scope.$apply();


        expect(placeholderConfigService.isEnabled).toHaveBeenCalled();
        expect(placeholderService.getTemplate).not.toHaveBeenCalled();
    });

});