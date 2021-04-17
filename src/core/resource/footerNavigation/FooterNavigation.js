class FooterNavigation {
    constructor(props) {
        this.strings = props.strings;
        this.html = props.html;
        this.links = props.links;
    }

    /**
     * @public
     * @method getNavigation
     * @returns {Object}
     */
    getNavigation() {
        return {
            buyer: [
                {
                    url: "",
                    name: ""
                }
            ],
            company: [
                {
                    url: "",
                    name: ""
                }
            ],
            partners: [
                {
                    url: "",
                    name: ""
                }
            ]
        };
    }
}

export default FooterNavigation;
