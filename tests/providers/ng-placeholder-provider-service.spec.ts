import { PlaceholderConfigService } from '../../src/providers/PlaceholderConfigService';

describe('When use PlaceholderConfigService', () => {
    it('Should init the object with empty template array.', () => {
        let obj = new PlaceholderConfigService([], { template_id: 'default', template_html: 'html' });
        expect(obj.getTemplates().length).toBe(0);
        expect(obj.getTemplates() instanceof Array).toBeTruthy();
        expect(obj.getTemplates()).toEqual([]);
    });

    it('Should init the object with templates', () => {
        let obj = new PlaceholderConfigService(
            [{ template_id: 'template', template_html: 'html' }],
            { template_id: 'default', template_html: 'html' }
        );
        expect(obj.getTemplates().length).toBe(1);
        expect(obj.getTemplates() instanceof Array).toBeTruthy();
        expect(obj.getTemplates()).toEqual([{ template_id: 'template', template_html: 'html' }]);
    });

    it('Should init the object with default template object.', () => {
        let obj = new PlaceholderConfigService([], { template_id: 'default', template_html: 'html' });
        expect(obj.getDefaultTemplate()).toEqual({ template_id: 'default', template_html: 'html' });
    });

    it('Should init the object with enabled setted true as default.', () => {
        let obj = new PlaceholderConfigService([], { template_id: 'default', template_html: 'html' });
        expect(obj.isEnabled()).toBeTruthy();
    });

    it('Should init the object with enabled setted true.', () => {
        let obj = new PlaceholderConfigService([], { template_id: 'default', template_html: 'html' }, true);
        expect(obj.isEnabled()).toBeTruthy();
    });

    it('Should init the object with enabled setted false.', () => {
        let obj = new PlaceholderConfigService([], { template_id: 'default', template_html: 'html' }, false);
        expect(obj.isEnabled()).toBeFalsy();
    });

    it('Should init the object with custom class template.', () => {
        let obj = new PlaceholderConfigService(undefined, undefined);

        expect(obj.getTemplates().length).toBe(0);
        expect(obj.getTemplates() instanceof Array).toBeTruthy();
        expect(obj.getTemplates()).toEqual([]);
    });
});