export class PlaceholderService implements Placeholder.IPlaceholderService {

    private configs: Array<Placeholder.ICompiledConfigModel>;
    private defaultConfig: Placeholder.ICompiledConfigModel;

    constructor($templateCache: ng.ITemplateCacheService, placeholderConfigs: Placeholder.IPlaceholderConfigService) {
        const defaultConfig = placeholderConfigs.getDefaultTemplate();
        const compiledDefaultConfigs = this.buildConfig(defaultConfig.template_id, defaultConfig.template_html, defaultConfig.template_repeats);

        this.configs = this.compileConfigs(placeholderConfigs.getTemplates(), $templateCache);
        this.defaultConfig = compiledDefaultConfigs;
    }

    private getTemplateHtml(template_path: string, templateCache: ng.ITemplateCacheService): string {
        return templateCache.get<string>(template_path);
    }

    private repeatTemplate(template_html: string, template_repeat: number): string {
        let template = '';

        for (let index = 0; index < template_repeat; index++) {
            template = template + template_html;
        }
        return template;
    }

    private buildConfig(template_id: string, template_html: string, template_repeat: number): Placeholder.ICompiledConfigModel {

        const template = this.repeatTemplate(template_html, template_repeat);

        return {
            template_id: template_id,
            template_html: template_html,
            template_repeat: template_repeat,
            template_compiled: angular.element(template)
        };
    }

    private compileConfigs(configs: Array<Placeholder.IConfigModel>, $templateCache: ng.ITemplateCacheService): Array<Placeholder.ICompiledConfigModel> {
        let self = this;
        let compiledConfigs: Array<Placeholder.ICompiledConfigModel> = new Array();
        let compiledConfig: Placeholder.ICompiledConfigModel;
        let template_id: string;
        let template_path: string;
        let template_html: string;
        let template_repeat: number;


        configs.forEach(function iterator(config: Placeholder.IConfigModel) {

            template_id = config.template_id;
            template_html = self.getTemplateHtml(config.template_path, $templateCache) || config.template_html;
            template_repeat = config.template_repeats || 1;
            compiledConfig = self.buildConfig(template_id, template_html, template_repeat);

            compiledConfigs.push(compiledConfig);
        });

        return compiledConfigs;
    }

    private isRepeatTemplate(config: Placeholder.ICompiledConfigModel, template_repeats: number): boolean {
        return !(config.template_repeat === template_repeats || angular.isUndefined(template_repeats));
    }

    public getTemplate(template_id: string, template_repeats: number): JQuery {
        let self = this;
        let template: JQuery = self.defaultConfig.template_compiled;

        self.configs.forEach(function configIterator(config: Placeholder.ICompiledConfigModel) {
            if (config.template_id === template_id) {
                template = angular.element(self.repeatTemplate(config.template_html, template_repeats));
                return;
            }
        });

        return angular.copy(template);
    }
}

PlaceholderService.$inject = ['$templateCache', 'ngPlaceholderConfig'];
