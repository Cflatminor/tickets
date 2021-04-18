import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class AirlineCompany extends Entity {
    /**
     * @public
     * @method getLogo
     * @returns {Image}
     */
    getLogo() {
        return new Image(this.entity.logo);
    }

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
     * @returns {string}
     */
    getDescription() {
        return this.entity.description || "";
    }

    /**
     * @public
     * @method getRating
     * @returns {number}
     */
    getRating() {
        return Number(this.entity.rating) || 0;
    }

    /**
     * @public
     * @method getUrl
     * @return {string}
     */
    getUrl() {
        return this.entity.url || "";
    }
}

export default AirlineCompany;
