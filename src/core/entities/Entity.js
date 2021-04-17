import _ from "lodash";

class Entity {
    constructor(entity) {
        this.entity = _.cloneDeep(entity || {});

        this.TargetConstructor = new.target;
    }

    /**
     * @method
     * @returns {string|number}
     */
    getId() {
        return this.entity.id || "";
    }

    /**
     * @method copy
     * @returns {Object}
     */
    copy() {
        return new this.TargetConstructor(this.entity);
    }

    /**
     * @method getEntity
     * @param [toJson] {boolean}
     * @returns {string|Object}
     */
    getEntity(toJson) {
        return toJson ? JSON.stringify(this.entity) : _.cloneDeep(this.entity);
    }
}

export default Entity;
