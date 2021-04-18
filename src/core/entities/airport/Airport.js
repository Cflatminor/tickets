import Entity from "app/core/entities/Entity";

class Airport extends Entity {
    /**
     * @public
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @public
     * @method getCode
     * @returns {string}
     */
    getCode() {
        return this.entity.code || "";
    }
}

export default Airport;
