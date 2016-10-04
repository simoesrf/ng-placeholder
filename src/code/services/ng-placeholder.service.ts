export class PlaceholderService implements Placeholder.IPlaceholderService {

    private static instant: PlaceholderService;
    private configs: Array<Placeholder.ICompiledConfigModel>;
    private defaultConfig: Placeholder.ICompiledConfigModel;
    private className: string;

    constructor(compiledConfigs: Array<Placeholder.ICompiledConfigModel>, defaultCompiledConfig: Placeholder.ICompiledConfigModel, className: string) {
        this.configs = compiledConfigs;
        this.defaultConfig = defaultCompiledConfig;
        this.className = className;
    }

    public static getInstant($templateCache: ng.ITemplateCacheService, placeholderConfigs: Placeholder.IPlaceholderConfigService) {
        if (angular.isUndefined(PlaceholderService.instant)) {
            const defaultConfig = placeholderConfigs.getDefaultTemplate();
            const compiledConfigs = PlaceholderService.compileConfigs(placeholderConfigs.getTemplates(), $templateCache);
            const compiledDefaultConfigs = PlaceholderService.buildConfig(defaultConfig.template_id, defaultConfig.template_html, defaultConfig.template_repeats);

            PlaceholderService.instant = new PlaceholderService(compiledConfigs, compiledDefaultConfigs, placeholderConfigs.getClassName());
        }

        return PlaceholderService.instant;
    }

    private static getTemplateHtml(template_path: string, templateCache: ng.ITemplateCacheService): string {
        return templateCache.get<string>(template_path);
    }

    private static repeatTemplate(template_html: string, template_repeat: number): string {
        let html: string = angular.copy(template_html);
        template_repeat = template_repeat - 1;

        for (let index = 0; index < template_repeat; index++) {
            html = html + template_html;
        }

        return html;
    }

    private static buildConfig(template_id: string, template_html: string, template_repeat: number): Placeholder.ICompiledConfigModel {

        const template = PlaceholderService.repeatTemplate(template_html, template_repeat);

        return {
            template_id: template_id,
            template_html: template_html,
            template_repeat: template_repeat,
            template_compiled: angular.element(template)
        };
    }

    private static compileConfigs(configs: Array<Placeholder.IConfigModel>, $templateCache: ng.ITemplateCacheService): Array<Placeholder.ICompiledConfigModel> {
        let compiledConfigs: Array<Placeholder.ICompiledConfigModel> = new Array();
        let compiledConfig: Placeholder.ICompiledConfigModel;
        let template_id: string;
        let template_path: string;
        let template_html: string;
        let template_repeat: number;


        configs.forEach(function iterator(config: Placeholder.IConfigModel) {

            template_id = config.template_id;
            template_html = PlaceholderService.getTemplateHtml(config.template_path, $templateCache) || config.template_html;
            template_repeat = config.template_repeats || 1;
            compiledConfig = PlaceholderService.buildConfig(template_id, template_html, template_repeat);

            compiledConfigs.push(compiledConfig);
        });

        return compiledConfigs;
    }

    private repeatTemplate(config: Placeholder.ICompiledConfigModel, template_repeats: number): JQuery {
        if (config.template_repeat === template_repeats || angular.isUndefined(template_repeats)) {
            return config.template_compiled;
        }

        const template = PlaceholderService.repeatTemplate(config.template_html, template_repeats);

        return angular.element(template);
    }

    public getTemplate(template_id: string, template_repeats: number): JQuery {
        let self = this;
        let template: JQuery = self.defaultConfig.template_compiled;

        self.configs.forEach(function configIterator(config: Placeholder.ICompiledConfigModel) {
            if (config.template_id === template_id) {
                template = self.repeatTemplate(config, template_repeats);
                return;
            }
        });

        return template;
    }

    public getClassName(): string {
        return this.className;
    }

}

PlaceholderService.getInstant.$inject = ['$templateCache', 'NgPlaceholderConfig'];