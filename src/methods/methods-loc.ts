import { App, Notice } from 'obsidian';
import type SKOSPlugin from '../main';
import type { headings, SuggesterItem, uriToPrefLabel } from '../interfaces';

export class LCSHMethods {
    app: App;
    plugin: SKOSPlugin;
    lcshUriToPrefLabel!: uriToPrefLabel;

    constructor(app: App, plugin: SKOSPlugin) {
        this.app = app;
        this.plugin = plugin;
    }

    public async resolveUris(item: SuggesterItem) {
        const broader = item.bt;
        const narrower = item.nt;
        const related = item.rt;

        let broaderHeadings: string[] = [];
        let narrowerHeadings: string[] = [];
        let relatedHeadings: string[] = [];

        const adapter = this.app.vault.adapter;
        const dir = this.plugin.manifest.dir;
        if (await adapter.exists(`${dir}/lcshUriToPrefLabel.json`)) {
            const lcshUriToPrefLabel = await adapter.read(
                `${dir}/lcshUriToPrefLabel.json`
            );
            this.lcshUriToPrefLabel = await JSON.parse(lcshUriToPrefLabel);
        } else {
            const text = 'The JSON file could not be read.';
            new Notice(text);
            throw Error(text);
        }

        const { settings } = this.plugin;
        let broaderMax = 0;
        settings.broaderMax !== ''
            ? (broaderMax = parseInt(settings.broaderMax))
            : null;
        let narrowerMax = 0;
        settings.narrowerMax !== ''
            ? (narrowerMax = parseInt(settings.narrowerMax))
            : null;
        let relatedMax = 0;
        settings.relatedMax !== ''
            ? (relatedMax = parseInt(settings.relatedMax))
            : null;

        if (broader !== undefined && broaderMax > 0) {
            for (let uri of broader.slice(0, broaderMax)) {
                const heading = this.lcshUriToPrefLabel[uri];
                broaderHeadings.push(heading);
            }
        }
        if (narrower !== undefined && narrowerMax > 0) {
            for (let uri of narrower.slice(0, narrowerMax)) {
                const heading = this.lcshUriToPrefLabel[uri];
                narrowerHeadings.push(heading);
            }
        }
        if (related !== undefined && relatedMax > 0) {
            for (let uri of related.slice(0, relatedMax)) {
                const heading = this.lcshUriToPrefLabel[uri];
                relatedHeadings.push(heading);
            }
        }

        const returnItem: headings = {
            broader: broaderHeadings,
            narrower: narrowerHeadings,
            related: relatedHeadings,
        };

        return returnItem;
    }
}
