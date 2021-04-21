import isMobileJs from "ismobilejs";

class DeviceDetector {
    constructor() {
        /**
         * @property
         * @type {string}
         */
        this.userAgent = "";

        /**
         * @property
         * @type {Object}
         */
        this.detector = null;

        /**
         * @property
         * @type {string}
         */
        this.googlePagespeedUserAgentIdentifier = "Chrome-Lighthouse";
    }

    /**
     * @method init
     * @param userAgent
     * @returns {DeviceDetector}
     */
    init(userAgent) {
        this.userAgent = userAgent;

        this.detector = isMobileJs(userAgent);

        return this;
    }

    /**
     * @method isPhone
     * @returns {boolean}
     */
    isPhone() {
        return this.detector.phone;
    }

    /**
     * @method isTablet
     * @returns {boolean}
     */
    isTablet() {
        return this.detector.tablet;
    }

    /**
     * @method isMobile
     * @returns {boolean}
     */
    isMobile() {
        return this.isPhone() || this.isTablet();
    }

    /**
     * @method isDesktop
     * @returns {boolean}
     */
    isDesktop() {
        return !this.isMobile();
    }

    /**
     * @method isGooglePagespeed
     * @returns {boolean}
     */
    isGooglePagespeed() {
        return this.userAgent.includes(this.googlePagespeedUserAgentIdentifier);
    }
}

export default DeviceDetector;
