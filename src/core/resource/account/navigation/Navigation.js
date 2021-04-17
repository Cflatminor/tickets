class Navigation {
    constructor(props) {
        this.navigation = {};

        this.links = props.links;
        this.strings = props.strings;
        this.env = props.env;
        this.router = props.router;

        this.NavigationItemEntity = props.NavigationItemEntity;

        this.accountSectionEnum = props.accountSectionEnum;
        this.routeNameEnum = props.routeNameEnum;

        this._buildNavigation();
    }

    /**
     * @method _getNavigationUrl
     * @param accountSection {string}
     * @returns {string}
     * @private
     */
    _getNavigationUrl(accountSection) {
        let route = this.router.getRouteByName(this.routeNameEnum.getAccountAsValue());

        return `${route.toPath({section: accountSection})}/`;
    }

    /**
     * @method _buildNavigation
     * @returns {Navigation}
     * @private
     */
    _buildNavigation() {
        this.navigation = {
            [this.accountSectionEnum.getPersonalDataAsValue()]: new this.NavigationItemEntity({
                id: this.accountSectionEnum.getPersonalDataAsValue(),
                active: false,
                title: this.strings.privateData,
                url: this._getNavigationUrl(this.accountSectionEnum.getPersonalDataAsValue()),
                icon: {
                    url: this.links.icons.user,
                    className: ""
                },
                items: []
            }),
            [this.accountSectionEnum.getWishListAsValue()]: new this.NavigationItemEntity({
                id: this.accountSectionEnum.getWishListAsValue(),
                active: false,
                title: this.strings.wishList.title,
                url: this._getNavigationUrl(this.accountSectionEnum.getWishListAsValue()),
                icon: {
                    url: this.links.icons.heart,
                    className: ""
                },
                items: []
            }),
            [this.accountSectionEnum.getReviewAsValue()]: new this.NavigationItemEntity({
                id: this.accountSectionEnum.getReviewAsValue(),
                active: false,
                title: this.strings.myReviews,
                url: this._getNavigationUrl(this.accountSectionEnum.getReviewAsValue()),
                icon: {
                    url: this.links.icons.review,
                    className: ""
                },
                items: []
            }),
            // [this.accountSectionEnum.getOrderAsValue()]: new this.NavigationItemEntity({
            //     id: this.accountSectionEnum.getOrderAsValue(),
            //     active: false,
            //     title: this.strings.myOrders,
            //     url: this._getNavigationUrl(this.accountSectionEnum.getOrderAsValue()),
            //     icon: {
            //         url: `${this.env.getMainImageRepository()}/user-profile/review.svg`,
            //         className: ""
            //     },
            //     items: []
            // }),
            [this.accountSectionEnum.getBonusAsValue()]: new this.NavigationItemEntity({
                id: this.accountSectionEnum.getBonusAsValue(),
                active: false,
                title: this.strings.myBonuses,
                url: this._getNavigationUrl(this.accountSectionEnum.getBonusAsValue()),
                icon: {
                    url: `${this.links.icons.carrot}`,
                    className: ""
                },
                items: []
            })
        };

        return this;
    }

    /**
     * @public
     * @method getByKey
     * @param key {string}
     * @returns {Item}
     */
    getByKey(key) {
        return this.navigation[key] || new this.NavigationItemEntity({});
    }

    /**
     * @method
     * @returns {*[]}
     */
    getItems() {
        return Object.keys(this.navigation).map((key) => this.navigation[key]);
    }
}

export default Navigation;
