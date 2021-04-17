import Entity from "app/core/entities/Entity";

class Range extends Entity {
    /**
     * @public
     * @method getMin
     * @returns {number}
     */
    getMin() {
        return Number(this.entity.min) || 0;
    }

    /**
     * @public
     * @method getMax
     * @returns {number}
     */
    getMax() {
        return Number(this.entity.max) || 0;
    }
}

export default Range;
