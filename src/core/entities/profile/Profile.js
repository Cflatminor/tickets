import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";
import Bonus from "app/core/entities/bonus/Bonus";
import Strings from "app/core/utilities/strings";

class Profile extends Entity {
    constructor(props) {
        super(props);

        this.strings = Strings.getInstance();
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
     * @method getLastName
     * @returns {string}
     */
    getLastName() {
        return this.entity.lastName || "";
    }

    /**
     * @public
     * @method getMiddleName
     * @returns {string}
     */
    getMiddleName() {
        return this.entity.middleName || "";
    }

    /**
     * @public
     * @method getFullName
     * @returns {string}
     */
    getFullName() {
        return `${this.getLastName()} ${this.getName()} ${this.getMiddleName()}`.trim();
    }

    /**
     * @public
     * @method getShortName
     * @returns {string}
     */
    getShortName() {
        return `${this.getName()} ${this.getLastName()}`.trim();
    }

    /**
     * @public
     * @method getAvatar
     * @returns {Image}
     */
    getAvatar() {
        return new Image(this.entity.avatar);
    }

    /**
     * @public
     * @method getSocialAccounts
     * @returns {Array}
     */
    getSocialAccounts() {
        return (this.entity.socialAccounts || []).map(function (item) {
            return {
                getName() {
                    return item.name || "";
                },
                getUrl() {
                    return item.url || "";
                }
            };
        });
    }

    /**
     * @public
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @public
     * @method getEmail
     * @returns {string}
     */
    getEmail() {
        return this.entity.email || "";
    }

    /**
     * @method getPhone
     * @return {string}
     */
    getPhone() {
        return this.entity.phone || "";
    }

    /**
     * @public
     * @method getBonus
     * @return {Bonus}
     */
    getBonus() {
        return new Bonus(this.entity.bonus);
    }

    /**
     * @public
     * @method getGender
     * @returns {string}
     */
    getGender() {
        return this.entity.gender || "";
    }

    /**
     * @public
     * @method getBirthDayAsText
     * @returns {string}
     */
    getBirthDayAsText() {
        return this.strings.formatShortDate(new Date(this.entity.birthday));
    }

    /**
    * @public
    * @method getLanguage
    * @returns {string}
    */
    getLanguage() {
        return this.entity.language || "";
    }

    /**
    * @public
    * @method getAbout
    * @returns {string}
    */
    getAbout() {
        return this.entity.about || "";
    }
}

export default Profile;
