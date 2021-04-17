// import _ from "lodash";

class Dom {
    /**
     * @public
     * @method toggleScroll
     * @param state {boolean}
     * @returns {Dom}
     */
    toggleScroll(state) {
        window.document.body.style.overflow = state ? "" : "hidden";

        return this;
    }

    /**
     * @public
     * @method scrollToElementBySelector
     * @param selector {string}
     * @param params {Object}
     * @returns {Dom}
     */
    scrollToElementBySelector(selector, params = {}) {
        let element = window.document.querySelector(selector);

        if (element) {
            element.scrollIntoView({
                behavior: params.behavior || 'smooth'
            });
        }

        return this;
    }

    /**
     * @public
     * @method getScrollY
     * @returns {number}
     */
    getScrollY() {
        return window.scrollY;
    }

    /**
     * @public
     * @method getPageYOffset
     * @returns {number}
     */
    getPageYOffset() {
        return window.pageYOffset;
    }

    /**
     * @public
     * @method getBottomPageEdge
     * @returns {number}
     */
    getBottomPageEdge() {
        return window.pageYOffset + window.innerHeight;
    }

    /**
     * @public
     * @method getBoundingClientRect
     * @param selector {string}
     * @returns {number}
     */
    getBoundingClientRect(selector) {
        let element = window.document.querySelector(selector),
            coords = (element && element.getBoundingClientRect()) || {top: 0};

        return window.pageYOffset + coords.top;
    }

    /**
     * @public
     * @method scrollToElementWithOffset
     * @param selector {string}
     * @param offsetDesktop {number}
     * @param offsetMobile {number}
     * @returns {Dom}
     */
    scrollToElementWithOffset(selector, offsetDesktop, offsetMobile) {
        let element = window.document.querySelector(selector),
            scrollToHeight;

        if (window.screen.width < 992) {
            scrollToHeight = element.offsetTop + offsetMobile;
        } else {
            scrollToHeight = element.offsetTop + offsetDesktop;
        }

        if (element) {
            window.scrollTo({
                top: scrollToHeight,
                behavior: 'smooth',
                block: 'start'
            });
        }

        return this;
    }
}

export default Dom;
