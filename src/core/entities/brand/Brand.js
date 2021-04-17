import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Brand extends Entity {
    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @method getLogo
     * @returns {Image}
     */
    getLogo() {
        return new Image(this.entity.logo);
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }
}

export default Brand;
