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
        isEnabled(): boolean;
    }

    export interface IPlaceholderConfigProvider extends ng.IServiceProvider {
        addConfig(config: IConfigModel): void;
        setConfigs(configs: Array<IConfigModel>): void;
        setDefaultConfig(defaultConfig: IConfigModel): void;
        enable(): void;
        disable(): void;
    }

    export interface ICompiledConfigModel {
        template_id: string;
        template_html: string;
        template_repeat: number;
        template_compiled: string
    }

    export interface IPlaceholderService {
        getTemplate(template_id: string, template_repeats: number): string;
    }

    export interface INPScope extends ng.IAttributes {
        ngPlaceholder: string;
        placeholderRepeats: string;
        placeholderShowUntil: string;
    }

    export interface IModuleRunService {
        disableDirective(): void;
    }

    export interface IPlaceholderDirectiveDecorator { }
}
