import { PlaceholderConfigService } from './placeholder-config-service.provider';

export class PlaceholderProvider implements Placeholder.IPlaceholderConfigProvider {

    private configs: Array<Placeholder.IConfigModel>;
    private defaultConfig: Placeholder.IConfigModel;
    private active: boolean;
    private customClass: string;

    constructor() {
        this.configs = new Array();
        this.customClass = 'ng-cloak';
        this.defaultConfig = {
            template_id: 'default',
            template_html: '<p>Loading...</p>',
            template_repeats: 1
        };
    }

    addConfig(config: Placeholder.IConfigModel): void {
        this.configs.push(config);
    }

    setConfigs(configs: Array<Placeholder.IConfigModel>): void {
        this.configs = configs;
    }

    setCustomClass(className: string): void {
        this.customClass = className;
    }

    setDefaultConfig(defaultConfig: Placeholder.IConfigModel): void {
        this.defaultConfig = defaultConfig;
    }

    enable(): void {
        this.active = true;
    }

    disable(): void {
        this.active = false;
    }

    $get(): Placeholder.IPlaceholderConfigService {
        return new PlaceholderConfigService(this.configs, this.defaultConfig, this.active, this.customClass);
    }
}