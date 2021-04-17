import _ from "lodash";

import Entity from "app/core/entities/Entity";
import Sizes from "app/core/entities/image/Sizes";

class Image extends Entity {
    /**
     * @method _getSrc
     * @return {Object}
     * @private
     */
    _getSrc() {
        return this.entity.src || {};
    }

    /**
     * @public
     * @method getSmall
     * @returns {string}
     */
    getSmall() {
        return this._getSrc().small || this.getOriginal();//60 * 60
    }

    /**
     * @public
     * @method getMedium
     * @returns {string}
     */
    getMedium() {
        return this._getSrc().medium || this.getOriginal();//250 * 250
    }

    /**
     * @public
     * @method getLarge
     * @returns {string}
     */
    getLarge() {
        return this._getSrc().large || this.getOriginal();//600 * 600
    }

    /**
     * @public
     * @method getOriginal
     * @returns {string}
     */
    getOriginal() {
        return this._getSrc().original || ""; //N * N
    }

    /**
     * @public
     * @method getPrimitive
     * @returns {string}
     */
    getPrimitive() {
        return this._getSrc().primitive || ""; //N * N
    }

    /**
     * @public
     * @method getSrc
     * @returns {string}
     */
    getSrc() {
        return this.getMedium();
    }

    /**
     * @method getSizes
     * @returns {Sizes}
     */
    getSizes() {
        return new Sizes(this.entity.size);
    }

    /**
     * @public
     * @method getAlt
     * @returns {string}
     */
    getAlt() {
        return this.entity.alt || "";
    }

    /**
     * @public
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.entity.title || "";
    }
}

export default Image;
