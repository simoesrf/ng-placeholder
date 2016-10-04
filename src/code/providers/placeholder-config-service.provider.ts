export class PlaceholderConfigService implements Placeholder.IPlaceholderConfigService {
    private configs: Array<Placeholder.IConfigModel>;
    private default: Placeholder.IConfigModel;
    private enable: boolean;
    private className: string;

    constructor(configs: Array<Placeholder.IConfigModel> = [], defaultConfig: Placeholder.IConfigModel, enable: boolean = true, className: string = 'ng-cloak') {
        this.configs = configs;
        this.default = defaultConfig;
        this.enable = enable;
        this.className = className;
    }

    getTemplates(): Array<Placeholder.IConfigModel> {
        return this.configs;
    }

    getDefaultTemplate(): Placeholder.IConfigModel {
        return this.default;
    }

    getClassName(): string {
        return this.className;
    }

    isEnabled(): boolean {
        return this.enable;
    }

}