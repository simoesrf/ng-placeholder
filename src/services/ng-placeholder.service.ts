export class PlaceholderService implements Placeholder.IPlaceholderService {

    private configs: Array<Placeholder.ICompiledConfigModel>;
    private defaultConfig: Placeholder.ICompiledConfigModel;
    private className: string;

    constructor($templateCache: ng.ITemplateCacheService, placeholderConfigs: Placeholder.IPlaceholderConfigService) {
        const defaultConfig = placeholderConfigs.getDefaultTemplate();
        const compiledConfigs = this.compileConfigs(placeholderConfigs.getTemplates(), $templateCache);
        const compiledDefaultConfigs = this.buildConfig(defaultConfig.template_id, defaultConfig.template_html, defaultConfig.template_repeats);

        this.configs = compiledConfigs;
        this.defaultConfig = compiledDefaultConfigs;
        this.className = placeholderConfigs.getClassName();
    }

    private getTemplateHtml(template_path: string, templateCache: ng.ITemplateCacheService): string {
        return templateCache.get<string>(template_path);
    }

    private repeatDefaultTemplate(template_html: string, template_repeat: number): string {
        let html: string = angular.copy(template_html);
        template_repeat = template_repeat - 1;

        for (let index = 0; index < template_repeat; index++) {
            html = html + template_html;
        }

        return html;
    }

    private buildConfig(template_id: string, template_html: string, template_repeat: number): Placeholder.ICompiledConfigModel {

        const template = this.repeatDefaultTemplate(template_html, template_repeat);

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

    private repeatTemplate(config: Placeholder.ICompiledConfigModel, template_repeats: number): JQuery {
        if (config.template_repeat === template_repeats || angular.isUndefined(template_repeats)) {
            return config.template_compiled;
        }

        const template = this.repeatDefaultTemplate(config.template_html, template_repeats);

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

PlaceholderService.$inject = ['$templateCache', 'ngPlaceholderConfig'];
