import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Banner extends Entity {
    /**
     * @method getPreview
     * @returns {Image}
     */
    getPreview() {
        let preview = this.entity.preview;

        return {
            /**
             * @method getDesktop
             * @returns {Image}
             */
            getDesktop() {
                return new Image(preview.desktop);
            },

            /**
             * @method getMobile
             * @returns {Image}
             */
            getMobile() {
                return new Image(preview.mobile);
            }
        };
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.entity.title || "";
    }

    /**
     * @method getBackground
     * @returns {string}
     */
    getBackground() {
        return this.entity.background || "";
    }

    /**
     * @method getDesktopImage
     * @returns {Image}
     */
    getDesktopImage() {
        return new Image(this.entity.image);
    }

    /**
     * @method getDesktopImage
     * @returns {Image}
     */
    getMobileImage() {
        return new Image(this.entity.imageMobile);
    }
}

export default Banner;
