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

                spyConfigServiceIsEnable = spyOn(placeholderConfigService, 'isEnabled');
                spyOn(placeholderService, 'getTemplate');
                spyOn(placeholderService, 'getClassName');
            }
        ]);
    });

    it('Should call placeholderService methods', () => {
        spyConfigServiceIsEnable.and.returnValues(true);
        var element = $compile('<div><ng-placeholder></ng-placeholder></div>')($scope);
        $scope.$apply();

        expect(placeholderConfigService.isEnabled).toHaveBeenCalled();
        expect(placeholderService.getTemplate).toHaveBeenCalled();
        expect(placeholderService.getClassName).toHaveBeenCalled();
    });

    it('Should not call placeholderService methods', () => {
        spyConfigServiceIsEnable.and.returnValues(false);
        var element = $compile('<div ng-placeholder></div>')($scope);
        $scope.$apply();


        expect(placeholderConfigService.isEnabled).toHaveBeenCalled();
        expect(placeholderService.getTemplate).not.toHaveBeenCalled();
        expect(placeholderService.getClassName).not.toHaveBeenCalled();
    });

});