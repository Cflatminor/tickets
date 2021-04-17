import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class Company extends Entity {
    /**
     * @method getLogo
     * @returns {Image}
     */
    getLogo() {
        return new Image(this.entity.image);
    }

    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @method getDescription
     * @returns {string}
     */
    getDescription() {
        return this.entity.description || "";
    }

    /**
     * @method getAddress
     * @returns {string}
     */
    getAddress() {
        return this.entity.address || "";
    }

    /**
     * @method getPhone
     * @returns {string}
     */
    getPhone() {
        return this.entity.phone || "";
    }

    /**
     * @method getEmail
     * @returns {string}
     */
    getEmail() {
        return this.entity.email || "";
    }

    /**
     * @method getFax
     * @returns {string}
     */
    getFax() {
        return this.entity.fax || "";
    }

    /**
     * @method getSite
     * @returns {string}
     */
    getSiteUrl() {
        return this.entity.siteUrl || "";
    }

    /**
     * @method getUrl
     * @return {string}
     */
    getUrl() {
        return this.entity.url || "";
    }
}

export default Company;
