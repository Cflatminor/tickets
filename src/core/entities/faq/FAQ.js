import Entity from "app/core/entities/Entity";

class FAQ extends Entity {
    /**
     * @public
     * @method getId
     * @returns {string}
     */
    getId() {
        return this.entity.id || "";
    }

    /**
     * @public
     * @method getQuestion
     * @returns {string}
     */
    getQuestion() {
        return this.entity.question || "";
    }

    /**
     * @public
     * @method getAnswer
     * @returns {string}
     */
    getAnswer() {
        return this.entity.answer || "";
    }

    /**
     * @public
     * @method getShortAnswer
     * @returns {string}
     */
    getShortAnswer() {
        return this.entity.shortAnswer || "";
    }
}

export default FAQ;
