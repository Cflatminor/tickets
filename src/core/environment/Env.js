import getConfig from 'next/config';

function Env(props) {
    let self = this,
        LanguageEnum = props.dependencies.LanguageEnum,
        language = LanguageEnum.getRuAsValue(),
        {publicRuntimeConfig} = getConfig();

    /**
     * @private
     * @method createMethods
     * @returns {void}
     */
    function createMethods() {
        Object.keys(publicRuntimeConfig).forEach(function (envName) {
            self[envName] = function () {
                return publicRuntimeConfig[envName];
            };
        });
    }

    /**
     * @public
     * @method getMainImageRepository
     * @returns {string}
     */
    this.getMainImageRepository = function () {
        let result = `${this.getCDNHost()}`;

        if (this.getBucketName()) {
            result += `/${this.getBucketName()}`;
        }

        return result;
    };

    /**
     * @public
     * @method setLanguage
     * @param lang {string}
     * @returns {Env}
     */
    this.setLanguage = function (lang) {
        if (LanguageEnum.hasValue(lang)) {
            language = lang;
        }

        return this;
    };

    /**
     * @public
     * @method getLanguage
     * @returns {string}
     */
    this.getLanguage = function () {
        return language || "";
    };

    /**
     * @private
     * @method init
     * @returns {void}
     */
    (function init() {
        createMethods();
    }());
}

export default Env;
