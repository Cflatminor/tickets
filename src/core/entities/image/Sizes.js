import Entity from "app/core/entities/Entity";

class Size extends Entity {
    /**
     * @method
     * @returns {Number}
     */
    getWidth() {
        return Number(this.entity.width) || 0;
    }

    /**
     * @method
     * @returns {Number}
     */
    getHeight() {
        return Number(this.entity.height) || 0;
    }
}

class Sizes extends Entity {
    /**
     * @method getSmall
     * @returns {Size}
     */
    getSmall() {
        return new Size(this.entity.small);
    }

    /**
     * @method getMedium
     * @returns {Object}
     */
    getMedium() {
        return new Size(this.entity.medium);
    }

    /**
     * @method getLarge
     * @returns {Object}
     */
    getLarge() {
        return new Size(this.entity.large);
    }

    /**
     * @method getOriginal
     * @returns {Object}
     */
    getOriginal() {
        return new Size(this.entity.original);
    }
}

export default Sizes;
