import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Note extends Entity {
    /**
     * @public
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.entity.title || "";
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
     * @method getIcon
     * @returns {Image}
     */
    getIcon() {
        return new Image(this.entity.icon);
    }
}

export default Note;
