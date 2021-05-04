import Entity from "app/core/entities/Entity";

class Price extends Entity {
    /**
     * @public
     * @method hasLastUpdateDate
     * @returns {boolean}
     */
    hasLastUpdateDate() {
        return Boolean(this.entity.date);
    }

    /**
     * @public
     * @method getCurrency
     * @returns {string}
     */
    getCurrency() {
        return this.entity.currency?.description || "";
    }

    /**
     * @public
     * @method getCurrencyCode
     * @returns {string}
     */
    getCurrencyCode() {
        return this.entity.currency?.code || "";
    }

    /**
     * @public
     * @method getCurrent
     * @returns {number}
     */
    getCurrent() {
        return Number(this.entity.current || 0);
    }

    /**
     * @public
     * @method getOld
     * @returns {number}
     */
    getOld() {
        return Number(this.entity.old || 0);
    }

    /**
     * @public
     * @method getTotalPrice
     * @returns {number}
     */
    getTotalPrice() {
        return Number(this.entity.total || 0);
    }

    /**
     * @public
     * @method getBlackFriday
     * @returns {number}
     */
    getBlackFriday() {
        return Number(this.entity.blackFriday || 0);
    }

    /**
     * @public
     * @method getLastUpdateDate
     * @returns {Date}
     */
    getLastUpdateDate() {
        return new Date(this.entity.date || "");
    }
}

export default Price;
