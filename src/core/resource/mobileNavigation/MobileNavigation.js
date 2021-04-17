class MobileNavigation {
    constructor(props) {
        this.strings = props.strings;
        this.env = props.env;
        this.links = props.links;
    }

    /**
     * @public
     * @method getNavigation
     * @returns {Array}
     */
    getNavigation() {
        return [
            [
                {
                    url: ``,
                    title: "",
                    iconUrl: ``
                },
                {
                    url: ``,
                    title: "",
                    icon: "icon-search"
                }
            ],
            [
                {
                    url: "${this.env.getBitrixHost()}/pharmacy/",
                    title: "this.strings.drugstores",
                    icon: "icon-shop"
                }
            ]
        ];
    }
}

export default MobileNavigation;
