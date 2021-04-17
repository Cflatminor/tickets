import _ from "lodash";

class Resource {
    constructor(props) {
        this.resources = props.resources;
    }

    /**
     * @method getMobileNavigation
     * @return {Array}
     */
    getMobileNavigation() {
        return _.merge([], this.resources.mobileNavigation.getNavigation());
    }

    /**
     * @method getFooter
     * @return {Object}
     */
    getFooter() {
        let self = this;

        return {
            getNavigation() {
                return _.merge({}, self.resources.footerNavigation.getNavigation());
            }
        };
    }
}

export default Resource;
