/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />

declare namespace Placeholder {
    export interface IConfigModel {
        template_id: string;
        template_path?: string;
        template_html?: string;
        template_repeats?: number;
    }

    export interface IPlaceholderConfigService {
        getTemplates(): Array<IConfigModel>;
        getDefaultTemplate(): IConfigModel;
        getClassName(): string
        isEnabled(): boolean;
    }

    export interface IPlaceholderConfigProvider extends ng.IServiceProvider {
        addConfig(config: IConfigModel): void;
        setConfigs(configs: Array<IConfigModel>): void;
        setCustomClass(className: string): void;
        setDefaultConfig(defaultConfig: IConfigModel): void;
        enable(): void;
        disable(): void;
    }

    export interface ICompiledConfigModel {
        template_id: string;
        template_html: string;
        template_repeat: number;
        template_compiled: JQuery
    }

    export interface IPlaceholderService {
        getTemplate(template_id: string, template_repeats: number): JQuery;
        getClassName(): string;
    }

    export interface INPScope extends ng.IAttributes {
        templateId: string;
        templateRepeats: string;
        showUntil: string;
    }

    export interface IModuleRunService {
        disableDirective(): void;
    }
}
