import {
    App,
    normalizePath,
    Notice,
    Platform,
    SuggestModal,
    TFile,
} from 'obsidian';
import type SKOSPlugin from '../../main';
import type { headings, SuggesterItem } from '../../interfaces';
import { SubSKOSModal } from './suggester-sub';
import { WriteMethods } from 'src/methods/methods-write';
import * as fuzzysort from 'fuzzysort';
import { LCSHMethods } from 'src/methods/methods-loc';

export class SKOSModal extends SuggestModal<SuggesterItem> {
    plugin: SKOSPlugin;
    tfile: TFile;
    suggestions: any;
    lcshSuggester!: SuggesterItem[];

    constructor(app: App, plugin: SKOSPlugin, tfile: TFile) {
        super(app);
        this.plugin = plugin;
        this.tfile = tfile;
        this.setPlaceholder('Please start typing...');
        //https://discord.com/channels/686053708261228577/840286264964022302/871783556576325662
        this.scope.register(['Shift'], 'Enter', (evt: KeyboardEvent) => {
            // @ts-ignore
            this.chooser.useSelectedItem(evt);
            return false;
        });
        this.scope.register(['Alt'], 'Enter', (evt: KeyboardEvent) => {
            // @ts-ignore
            this.chooser.useSelectedItem(evt);
            return false;
        });

        //const dir = this.plugin.manifest.dir;
        // when loading onload is implemented, the condition needs to be checked
        if (this.plugin.settings.loadLcsh) {
            this.lcshSuggester = this.plugin.loadedLcshSuggester;
        } else {
            const { adapter } = this.app.vault;
            const dir = this.plugin.settings.inputFolder;
            (async () => {
                const path = normalizePath(`${dir}/lcshSuggester.json`);
                if (await adapter.exists(path)) {
                    const lcshSuggester = await adapter.read(path);
                    this.lcshSuggester = JSON.parse(lcshSuggester);
                } else {
                    const text = 'The JSON file could not be read.';
                    new Notice(text);
                    throw Error(text);
                }
            })();
        }
        this.setInstructions([
            {
                command: 'shift ↵',
                purpose: 'to insert as inline YAML at selection',
            },
            {
                command: '↵',
                purpose: 'to insert as YAML',
            },
            {
                command: 'alt ↵',
                purpose: 'to add a subdivision',
            },
        ]);
    }

    /**
     * Add what function the Shift key has and refocus the cursor in it.
     * For mobile it requires a timeout, because the modal needs time to appear until the cursor can be placed in it,
     */
    onOpen() {
        if (Platform.isDesktopApp) {
            this.focusInput();
        } else if (Platform.isMobileApp) {
            setTimeout(this.focusInput, 400);
        }
    }

    focusInput() {
        //@ts-ignore
        document.getElementsByClassName('prompt-input')[0].focus();
    }

    getSuggestions(): SuggesterItem[] {
        let input = this.inputEl.value.trim();
        let results = [];
        const { settings } = this.plugin;
        if (this.lcshSuggester !== undefined) {
            const fuzzyResult = fuzzysort.go(input, this.lcshSuggester, {
                key: 'pL',
                limit: parseInt(settings.elementLimit),
                threshold: parseInt(settings.lcSensitivity),
            });
            for (let el of fuzzyResult) {
                results.push(el.obj);
            }
        }
        //@ts-ignore
        return results;
    }
    renderSuggestion(item: SuggesterItem, el: HTMLElement): void {
        const { aL, pL, note, lcc } = item;
        const el0 = el.createDiv();
        const el1 = el0.createEl('b', {cls: 'linked-vocabs-lcsh-prefLabel'});
        el1.appendText(pL);
        //el.createEl('br')
        if (aL && note && aL !== pL) {
            if (lcc) {
                el0.createEl('div', {text:' — ', cls: 'linked-vocabs-lcsh-lcc-pre'});
                el0.createEl('div', {text:'LCC: ', cls: 'linked-vocabs-lcsh-lcc'});
                el0.createEl('div', {text: lcc, cls: 'linked-vocabs-lcsh-lcc-classification'});
                const subDiv = el.createDiv()
                subDiv.createEl('div', {text: aL, cls: 'linked-vocabs-lcsh-altLabel'});
                subDiv.createEl('div', {text: ' — ', cls: 'linked-vocabs-lcsh-note-pre'})
                subDiv.createEl('div', {text: note, cls: 'linked-vocabs-lcsh-note'})
            } else {
                el.createEl('div', {text: aL, cls: 'linked-vocabs-lcsh-altLabel'});
                el.createEl('div', {text: ' — ', cls: 'linked-vocabs-lcsh-note-pre'})
                el.createEl('div', {text: note, cls: 'linked-vocabs-lcsh-note'})
            }
        } else if (aL && !note && aL !== pL) {
            if (lcc) {
                el0.createEl('div', {text:' — ', cls: 'linked-vocabs-lcsh-lcc-pre'});
                el0.createEl('div', {text:'LCC: ', cls: 'linked-vocabs-lcsh-lcc'});
                el0.createEl('div', {text: lcc, cls: 'linked-vocabs-lcsh-lcc-classification'});
                const subDiv = el.createDiv()
                subDiv.createEl('div', {text: aL, cls: 'linked-vocabs-lcsh-altLabel'});
            } else {
                el.createEl('div', {text: aL, cls: 'linked-vocabs-lcsh-altLabel'});
            }
        } else if (!aL && note) {
            if (lcc) {
                el0.createEl('div', {text:' — ', cls: 'linked-vocabs-lcsh-lcc-pre'});
                el0.createEl('div', {text:'LCC: ', cls: 'linked-vocabs-lcsh-lcc'});
                el0.createEl('div', {text: lcc, cls: 'linked-vocabs-lcsh-lcc-classification'});
                const subDiv = el.createDiv()
                subDiv.createEl('div', {text: note, cls: 'linked-vocabs-lcsh-note'})
            } else {
                el.createEl('div', {text: note, cls: 'linked-vocabs-lcsh-note'})
            }
        } else if (lcc) {
                el0.createEl('div', {text:' — ', cls: 'linked-vocabs-lcsh-lcc-pre'});
                el0.createEl('div', {text:'LCC: ', cls: 'linked-vocabs-lcsh-lcc'});
                el0.createEl('div', {text: lcc, cls: 'linked-vocabs-lcsh-lcc-classification'});
        }
    }

    async onChooseSuggestion(
        item: SuggesterItem,
        evt: MouseEvent | KeyboardEvent
    ): Promise<void> {
        let heading = item.pL;
        if (evt.altKey) {
            new SubSKOSModal(this.app, this.plugin, this.tfile, item).open();
        } else {
            let headings: headings;
            const methods_loc = new LCSHMethods(this.app, this.plugin);
            // parse them here, otherwise if Alt key is pressed, the second modal is delayed
            /**
             * only parse relations for LCSH
             * since writeYaml still checks for the length of every element, we need to pass
             * an empty object
             */
            headings = await methods_loc.resolveUris(item);
            const lcc = item.lcc;
            const writeMethods = new WriteMethods(this.app, this.plugin);
            if (lcc !== undefined) {
                await writeMethods.writeYaml(
                    headings,
                    this.tfile,
                    heading,
                    'https://id.loc.gov/authorities/subjects/' + item.uri,
                    evt,
                    lcc
                );
            } else {
                await writeMethods.writeYaml(
                    headings,
                    this.tfile,
                    heading,
                    'https://id.loc.gov/authorities/subjects/' + item.uri,
                    evt
                );
            }
        }
    }
}
