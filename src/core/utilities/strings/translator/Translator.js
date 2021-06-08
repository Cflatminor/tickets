class Translator {
    constructor(props) {
        /**
         * @property Env
         * @type {Env}
         */
        this.Env = props.dependencies.Env;

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = props.dependencies.Resource;

        /**
         * @property strings
         * @type {Strings}
         */
        this.Strings = props.dependencies.Strings;
    }

    /**
     * @method _getStringsResource
     * @returns {Object}
     * @private
     */
    _getStringsResource() {
        // return this.Resource.getStrings(this.Env.getLanguage());
        return this.Resource.getStrings("ru");
    }

    /**
     * @method _getPluralWorlds
     * @returns {Object}
     * @private
     */
    _getPluralWorlds() {
        let strings = this._getStringsResource().plural;

        return {
            passengers: strings.passengers || [],
            days: strings.days || [],
            hours: strings.hours || [],
            minutes: strings.minutes || [],
            seconds: strings.seconds || []
        };
    }

    /**
     * @method _getPluralWorldsByKey
     * @param key {string}
     * @returns {Array}
     * @private
     */
    _getPluralWorldsByKey(key) {
        return this._getPluralWorlds()[key];
    }

    /**
     * @public
     * @method getStringKeys
     * @returns {Object}
     */
    getStringKeys() {
        let result = {};

        Object.keys(this._getPluralWorlds()).forEach(function (key) {
            result[key] = key;
        });

        return result;
    }

    /**
     * @public
     * @method plural
     * @param count {number}
     * @param stringKey {string}
     * @returns {string}
     */
    plural(count, stringKey) {
        return this.Strings.plural(count, this._getPluralWorldsByKey(stringKey));
    }
}

export default Translator;
