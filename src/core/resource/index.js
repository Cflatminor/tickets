import Env from "app/core/environment";
import LanguageEnum from "app/core/utilities/enum/language";

import stringsRU from "./strings/ru";
import stringsUA from "./strings/ua";
import htmlRU from "./html/ru";
import htmlUA from "./html/ua";
import links from "./links";

import MobileNavigation from "./mobileNavigation/MobileNavigation";
import FooterNavigation from "./footerNavigation/FooterNavigation";

import Resource from "./Resource";

let languageEnum = LanguageEnum.getInstance();

function getStringsResource(lang) {
    return languageEnum.isRu(lang) ? stringsRU : stringsUA;
}

function getHTMLResource(lang) {
    return languageEnum.isRu(lang) ? htmlRU : htmlUA;
}

function createResource(lang) {
    return new Resource({
        resources: {
            mobileNavigation: new MobileNavigation({
                strings: getStringsResource(lang),
                env: Env.getInstance(),
                links
            }),
            footerNavigation: new FooterNavigation({
                strings: getStringsResource(lang),
                html: getHTMLResource(lang),
                links
            })
        }
    });
}

export default {
    _currentLang: languageEnum.getRuAsValue(),
    get lang() {
        return this._currentLang;
    },
    set lang(lang) {
        this._currentLang = languageEnum.hasValue(lang) ? lang : this.lang
    },
    /**
     * @method _getLanguage
     * @param lang {string}
     * @returns {string}
     * @private
     */
    _getLanguage(lang) {
        return languageEnum.hasValue(lang) ? lang : this.lang;
    },
    /**
     * @public
     * @method getLinks
     * @return {Object}
     */
    getLinks() {
        return links;
    },
    /**
     * @public
     * @method getStrings
     * @param [lang] {string}
     * @returns {Object}
     */
    getStrings(lang) {
        return getStringsResource(this._getLanguage(lang));
    },
    /**
     * @public
     * @method getHTML
     * @param [lang] {string}
     * @returns {Object}
     */
    getHTML(lang) {
        return getHTMLResource(this._getLanguage(lang));
    },
    /**
     * @description
     * don't use this method
     *
     * @deprecated
     * @public
     * @method setLanguage
     * @param lang {string}
     * @returns {Object}
     */
    // eslint-disable-next-line no-unused-vars
    setLanguage(lang) {
        this.lang = lang;

        return this;
    },
    /**
     * @public
     * @method getInstance
     * @param [lang] {string}
     * @returns {Resource}
     */
    getInstance(lang) {
        return createResource(this._getLanguage(lang));
    }
};
