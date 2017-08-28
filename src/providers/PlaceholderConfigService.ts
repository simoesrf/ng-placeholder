export class PlaceholderConfigService implements Placeholder.IPlaceholderConfigService {
    private configs: Array<Placeholder.IConfigModel>;
    private default: Placeholder.IConfigModel;
    private enable: boolean;
    private className: string;

    constructor(configs: Array<Placeholder.IConfigModel> = [], defaultConfig: Placeholder.IConfigModel, enable: boolean = true) {
        this.configs = configs;
        this.default = defaultConfig;
        this.enable = enable;
    }

    getTemplates(): Array<Placeholder.IConfigModel> {
        return this.configs;
    }

    getDefaultTemplate(): Placeholder.IConfigModel {
        return this.default;
    }

    isEnabled(): boolean {
        return this.enable;
    }

}