## Obsidian Linked Data Vocabularies Plugin

This plugin adds YAML keys for the selected heading, url (optional), and broader, narrower and related headings.

Currently, the LCSH [Suggest2](https://id.loc.gov/techcenter/searching.html) API is implemented.

### Usage

In the editor, open the command palette and execute the `LCSH` command. Alternatively, you can set a hotkey for it.

If there is no YAML block present, a new one will be created. If there is already YAML present, the new YAML will be appended to the current YAML.

### Configuration

You can set the limit of queries to be display. 10 is the default setting.

You can set the key names for `heading`, `broader`, `narrower` and `related` in the settings.

Furthermore, you can set the search type. 

> Left anchored searches are ordered alphabetically, case and diacritic insensitive.
>
>Keyword searches are in descending relevance order, using the same search ranking as the main search page.
> 
><cite>[Source](https://id.loc.gov/techcenter/searching.html)</cite>

The default search type is `keyword`.

### Recommendation

Use this plugin with [Breadcrumbs](https://github.com/SkepticMystic/breadcrumbs). You can set the hierachies in its settings and will have a breadcrumbs view for navigating the heading hierarchy you create in your notes.