export interface IConfigModel {
    template_id: string;
    template_path?: string;
    template_html?: string;
    template_repeats?: number;
}

export interface IPlaceholderConfigs {
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

export class ConfigService implements IPlaceholderConfigs {
    private configs: Array<IConfigModel>;
    private default: IConfigModel;
    private enable: boolean;
    private className: string;

    constructor(configs: Array<IConfigModel> = [], defaultConfig: IConfigModel, enable: boolean = true, className: string = 'ng-cloak') {
        this.configs = configs;
        this.default = defaultConfig;
        this.enable = enable;
        this.className = className;
    }

    getTemplates(): Array<IConfigModel> {
        return this.configs;
    }

    getDefaultTemplate(): IConfigModel {
        return this.default;
    }

    getClassName(): string {
        return this.className;
    }

    isEnabled(): boolean {
        return this.enable;
    }

}

export class PlaceholderProvider implements IPlaceholderConfigProvider {

    private configs: Array<IConfigModel>;
    private defaultConfig: IConfigModel;
    private active: boolean;
    private customClass: string;

    constructor() {
        this.configs = new Array();
        this.customClass = 'ng-placeholder-hide';
        this.defaultConfig = {
            template_id: 'default',
            template_html: '<p>Loading...</p>',
            template_repeats: 1
        };
    }

    addConfig(config: IConfigModel): void {
        this.configs.push(config);
    }

    setConfigs(configs: Array<IConfigModel>): void {
        this.configs = configs;
    }

    setCustomClass(className: string): void {
        this.customClass = className;
    }

    setDefaultConfig(defaultConfig: IConfigModel): void {
        this.defaultConfig = defaultConfig;
    }

    enable(): void {
        this.active = true;
    }

    disable(): void {
        this.active = false;
    }

    $get(): IPlaceholderConfigs {
        return new ConfigService(this.configs, this.defaultConfig, this.active, this.customClass);
    }
}

