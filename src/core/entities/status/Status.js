import Entity from "app/core/entities/Entity";

class Status extends Entity {
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
     * @method getDescription
     * @return {string}
     */
    getDescription() {
        return this.entity.description || "";
    }
}

export default Status;
