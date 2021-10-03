import type SKOSModal from './settings';
export interface SKOSSettings {
	elementCounter: string;
	broaderKey: string;
	narrowerKey: string;
	relatedKey: string;
	lcshSearchType: string;
	headingKey: string;
	urlKey: string;
	broaderMax: string;
	narrowerMax: string;
	relatedMax: string;
}

/**
 * Represents the data which the Suggest2 Library of Congress API returns
 * {@link https://id.loc.gov/techcenter/searching.html}
 */

export interface suggest2 {
	q: string;
	count: number;
	pagesize: number;
	start: number;
	sortmethod: string;
	searchtype: string;
	directory: string;
	hits: {
		suggestLabel: string;
		uri: string;
		aLabel: string;
		token: string;
		vLabel: string;
		code: string;
		rank: string;
	}[];
}

export interface headings {
	broader: string[];
	narrower: string[];
	related: string[];
}

/**
 * Represents the data which is passed to {@link SKOSModal.renderSuggestion } after having called the {@link suggest2 | Suggest2 API}
 * from within {@link SKOSModal.async updateSuggestions}
 */
export interface SuggesterItem {
	display: string; // the heading that is displayed to the user
	url: string; // the URL for getting the necessary data
	aLabel: string;
	vLabel: string;
}

// Generated by https://quicktype.io
// prettier-ignore
export interface returnObjectLcsh {
    "@id":                                                           string;
    "@type":                                                         string[];
    "http://www.loc.gov/mads/rdf/v1#variantLabel"?:                  HTTPWWW[];
    "http://www.loc.gov/mads/rdf/v1#elementList"?:                   HTTPWWWLOCGovMadsRDFV1ElementList[];
    "http://www.loc.gov/mads/rdf/v1#authoritativeLabel"?:            HTTPWWW[];
    "http://www.w3.org/2004/02/skos/core#prefLabel"?:                HTTPWWW[];
    "http://www.w3.org/2008/05/skos-xl#literalForm"?:                HTTPWWW[];
    "http://purl.org/vocab/changeset/schema#subjectOfChange"?:       HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://purl.org/vocab/changeset/schema#creatorName"?:           HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://purl.org/vocab/changeset/schema#createdDate"?:           HTTPIDLOCGovOntologiesRecordInfoRecordChangeDateElement[];
    "http://purl.org/vocab/changeset/schema#changeReason"?:          HTTPIDLOCGovOntologiesRecordInfoRecordChangeDateElement[];
    "http://id.loc.gov/ontologies/RecordInfo#recordChangeDate"?:     HTTPIDLOCGovOntologiesRecordInfoRecordChangeDateElement[];
    "http://id.loc.gov/ontologies/RecordInfo#recordStatus"?:         HTTPIDLOCGovOntologiesRecordInfoRecordChangeDateElement[];
    "http://id.loc.gov/ontologies/RecordInfo#recordContentSource"?:  HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://id.loc.gov/ontologies/RecordInfo#languageOfCataloging"?: HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.loc.gov/mads/rdf/v1#elementValue"?:                  HTTPWWW[];
    "http://www.loc.gov/mads/rdf/v1#hasVariant"?:                    HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.loc.gov/mads/rdf/v1#hasNarrowerAuthority"?:          HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.loc.gov/mads/rdf/v1#hasCloseExternalAuthority"?:     HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.loc.gov/mads/rdf/v1#isMemberOfMADSCollection"?:      HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.loc.gov/mads/rdf/v1#isMemberOfMADSScheme"?:          HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.loc.gov/mads/rdf/v1#note"?:                          HTTPIDLOCGovVocabularyIdentifiersLccnElement[];
    "http://www.loc.gov/mads/rdf/v1#exampleNote"?:                   HTTPIDLOCGovVocabularyIdentifiersLccnElement[];
    "http://id.loc.gov/vocabulary/identifiers/lccn"?:                HTTPIDLOCGovVocabularyIdentifiersLccnElement[];
    "http://www.w3.org/2002/07/owl#sameAs"?:                         HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.loc.gov/mads/rdf/v1#adminMetadata"?:                 HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.w3.org/2008/05/skos-xl#altLabel"?:                   HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.w3.org/2004/02/skos/core#broader"?:                  HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.w3.org/2004/02/skos/core#narrower"?:                 HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.w3.org/2004/02/skos/core#related"?:                  HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.w3.org/2004/02/skos/core#closeMatch"?:               HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.w3.org/2004/02/skos/core#note"?:                     HTTPIDLOCGovVocabularyIdentifiersLccnElement[];
    "http://www.w3.org/2004/02/skos/core#example"?:                  HTTPIDLOCGovVocabularyIdentifiersLccnElement[];
    "http://www.w3.org/2004/02/skos/core#inScheme"?:                 HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
    "http://www.w3.org/2004/02/skos/core#altLabel"?:                 HTTPWWW[];
    "http://www.w3.org/2004/02/skos/core#changeNote"?:               HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
}

// prettier-ignore
export interface HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging {
    "@id": string;
}

// prettier-ignore
export interface HTTPIDLOCGovOntologiesRecordInfoRecordChangeDateElement {
    "@type":  string;
    "@value": string;
}

// prettier-ignore
export interface HTTPIDLOCGovVocabularyIdentifiersLccnElement {
    "@value": string;
}

// prettier-ignore
export interface HTTPWWW {
    "@language": Language;
    "@value":    string;
}

// prettier-ignore
export enum Language {
    En = "en",
    Fr = "fr",
}

// prettier-ignore
export interface HTTPWWWLOCGovMadsRDFV1ElementList {
    "@list": HTTPIDLOCGovOntologiesRecordInfoLanguageOfCataloging[];
}

// Generated by https://quicktype.io

// prettier-ignore
export interface suggest2Return {
    q:          string;
    count:      number;
    pagesize:   number;
    start:      number;
    sortmethod: string;
    searchtype: string;
    directory:  string;
    hits:       Hit[];
}

// prettier-ignore
export interface Hit {
    suggestLabel: string;
    uri:          string;
    aLabel:       string;
    token:        string;
    vLabel:       string;
    code:         string;
    rank:         string;
}

declare module 'obsidian' {
	interface App {
		commands: {
			addCommand: any;
			removeCommand: any;
		};
	}
}

export interface passInformation {
	suggestItem: SuggesterItem;
	heading: string;
	url: string;
}
