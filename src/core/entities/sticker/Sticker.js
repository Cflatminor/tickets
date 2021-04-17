import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Sticker extends Entity {
    /**
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.entity.title || "";
    }

    /**
     * @method getDescription
     * @returns {string}
     */
    getDescription() {
        return this.entity.description || "";
    }

    /**
     * @method getImage
     * @returns {Image}
     */
    getImage() {
        return new Image(this.entity.sticker);
    }
}

export default Sticker;
