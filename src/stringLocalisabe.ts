/**
 * Class for localisable string
 * if necessary, add language here
 */
export class stringLocalisabe {
    en_GB: string;

    ar_EG: (string | null) = null;
    ca_ES: (string | null) = null;
    cs_CZ: (string | null) = null;
    da_DK: (string | null) = null;
    de_DE: (string | null) = null;
    en_US: (string | null) = null;
    eo_ZZ: (string | null) = null;
    es_ES: (string | null) = null;
    fi_FI: (string | null) = null;
    fr_CA: (string | null) = null;
    fr_FR: (string | null) = null;
    gl_ES: (string | null) = null;
    hu_HU: (string | null) = null;
    it_IT: (string | null) = null;
    ja_JP: (string | null) = null;
    ko_KR: (string | null) = null;
    nb_NO: (string | null) = null;
    nl_NL: (string | null) = null;
    pl_PL: (string | null) = null;
    pt_BR: (string | null) = null;
    ru_RU: (string | null) = null;
    sv_SE: (string | null) = null;
    tr_TR: (string | null) = null;
    uk_UA: (string | null) = null;
    vi_VN: (string | null) = null;
    zh_CN: (string | null) = null;
    zh_TW: (string | null) = null;


    constructor(en_GB: string) {
        this.en_GB = en_GB;
    };


    /**
     * Fetches translated version of string, going thru logical fallback tree
     * @param lang language in format used by OpenRCT2, e.g. en-GB, nl-NL, pt-BR
     * @returns string in langugage given by param if possible, otherwise fallback as defined inside function
     * 
     * I have improvised a little bit when defining fallback variants :)
     */
    get(lang: string) {
        switch (lang) {
            case "en-GB": {
                return this.en_GB;
            }
            case "ca-ES": {
                return this.ca_ES ?? this.es_ES ?? this.en_GB;
            }
            case "cs-CZ": {
                return this.cs_CZ ?? this.en_GB;
            }
            case "da-DK": {
                return this.da_DK ?? this.en_GB;
            }
            case "de-DE": {
                return this.de_DE ?? this.en_GB;
            }
            case "en-US": {
                return this.en_US ?? this.en_GB;
            }
            case "eo-ZZ": {
                return this.eo_ZZ ?? this.en_GB;
            }
            case "es-ES": {
                return this.es_ES ?? this.en_GB;
            }
            case "fr-CA": {
                return this.fr_CA ?? this.fr_FR ?? this.en_GB;
            }
            case "fr-FR": {
                return this.fr_FR ?? this.en_GB;
            }
            case "gl-ES": {
                return this.gl_ES ?? this.es_ES ?? this.en_GB;
            }
            case "hu-HU": {
                return this.hu_HU ?? this.en_GB;
            }
            case "it-IT": {
                return this.it_IT ?? this.en_GB;
            }
            case "ko-KR": {
                return this.ko_KR ?? this.en_GB;
            }
            case "nl-NL": {
                return this.nl_NL ?? this.en_GB;
            }
            case "pl-PL": {
                return this.pl_PL ?? this.en_GB;
            }
            case "pt-BR": {
                return this.pt_BR ?? this.es_ES ?? this.en_GB;
            }
            case "ru-RU": {
                return this.ru_RU ?? this.en_GB;
            }
            case "zh-CN": {
                return this.zh_CN ?? this.zh_TW ?? this.en_GB;
            }
            case "zh-TW": {
                return this.zh_TW ?? this.en_GB;
            }
            default:
                return this.en_GB;
        }

    }
}


