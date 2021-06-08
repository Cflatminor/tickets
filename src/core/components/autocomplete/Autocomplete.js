/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";

class Autocomplete extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property placeholder
         * @type {string}
         */
        this.placeholder = props.placeholder;

        /**
         * @property item
         * @type {Object}
         */
        this.item = null;

        this.state = {
            queryString: props.queryString,
            items: []
        };

        this.changeQuery = this.changeQuery.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.getItemsByQuery = this.getItemsByQuery.bind(this);
        this.getItemName = this.getItemName.bind(this);
        this.setItems = this.setItems.bind(this);
    }

    /**
     * @protected
     * @method componentDidUpdate
     * @param prevProps {Object}
     * @returns {void}
     */
    componentDidUpdate(prevProps) {
        if (prevProps.queryString !== this.props.queryString) {
            this.setState(() => {
                return {
                    queryString: this.props.queryString,
                    items: []
                };
            });
        }
    }

    /**
     * @method getItemName
     * @param item {Object}
     * @returns {string}
     */
    getItemName(item) {
        return (item && item.getName()) || "";
    }

    /**
     * @method getItemsByQuery
     * @param opts {Object}
     * @returns {Autocomplete}
     */
    getItemsByQuery(opts) {
        let itemName = this.getItemName(this.item);

        if (!itemName.length || (itemName !== opts.value)) {
            this.props.getItemsByQuery(opts.value, this.setItems);
        }

        return this;
    }

    /**
     * @method setItems
     * @param items {Array}
     * @return {Autocomplete}
     */
    setItems(items) {
        this.setState(function () {
            return {items};
        });

        return this;
    }

    /**
     * @method changeQuery
     * @param event {Object}
     * @param opts {Object}
     * @returns {Autocomplete}
     */
    changeQuery(event, opts) {
        this.props.onChange(event, opts);

        this.setState(function () {
            return {
                queryString: opts.newValue
            };
        });

        return this;
    }

    /**
     * @method onSuggestionsClearRequested
     * @returns {Autocomplete}
     */
    onSuggestionsClearRequested() {
        this.setState({
            items: []
        });

        return this;
    }

    /**
     * @method selectItem
     * @param event {Object}
     * @param opts {Object}
     * @returns {boolean}
     */
    selectItem(event, opts) {
        this.item = opts.suggestion;

        this.props.selectItem(this.item);

        this.setItems([]);

        event.preventDefault();

        return false;
    }

    /**
     * @method renderItem
     * @param item {Object}
     * @param index {Number}
     * @returns {string}
     */
    renderItem(item, index) { // todo это не тут должно находиться
        let string = item.getName().split("").reverse(),
            queriedString = this.state.queryString.charAt(0).toUpperCase() + this.state.queryString.slice(1).toLowerCase(),
            lastChars = string.splice(0, (string.length - this.state.queryString.length)).reverse().join("");

        if (!item.isAirport()) {
            return (
                <div
                    className="autocomplete-item d-flex align-items-center justify-content-between"
                >
                    <p>
                        <span className="item__query">{ queriedString }</span>{ lastChars }
                    </p>

                    <span className="item__code">{item.getCode()}</span>
                </div>
            );
        } else {
            return (
                <div
                    className="autocomplete-item autocomplete-item--airport d-flex align-items-center justify-content-between"
                    key={index}
                >
                    <span className="d-flex align-items-center">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.79714 4.70105C8.52664 4.47685 8.18645 4.35404 7.83511 4.35376H6.89172C6.83973 4.3539 6.79771 4.39611 6.79785 4.4481C6.7979 4.46885 6.80482 4.48903 6.81752 4.50546L9.19092 7.55178L12.2681 7.55673L8.79714 4.70105Z" fill="#808080" />
                            <path d="M18.6128 8.3061H18.6122L3.46359 8.28869C2.96945 8.29071 2.51149 8.03004 2.26094 7.60413L0.932287 5.99778C0.832396 5.87671 0.683524 5.80665 0.526558 5.80689C0.235777 5.80684 4.7052e-05 6.04257 0 6.33335C0 6.40957 0.0165152 6.4849 0.0484635 6.55407L1.48656 9.6699C1.48929 9.67583 1.49188 9.68181 1.49428 9.68783C1.57798 9.91095 1.77612 10.0712 2.01185 10.1063L9.18219 10.8789C9.38889 10.9012 9.53837 11.0868 9.51607 11.2934C9.50746 11.3731 9.47368 11.448 9.41957 11.5072L5.7721 15.4931C5.73949 15.5336 5.74594 15.5928 5.7864 15.6254C5.80306 15.6388 5.82381 15.6462 5.84522 15.6462H7.22996C7.59122 15.6462 7.94044 15.5163 8.21395 15.2803C8.21692 15.2777 8.21988 15.2756 8.22294 15.2729L13.0364 11.3714C13.1053 11.3158 13.1916 11.286 13.2802 11.2875L18.6159 11.3841C19.3794 11.3822 20 10.6888 20 9.84508C20 8.98591 19.3907 8.3061 18.6128 8.3061Z" fill="#808080" />
                        </svg>
                        {item.getName()}
                    </span>

                    <span className="item__code">{item.getCode()}</span>
                </div>
            );
        }
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        let inputProps = {
            autoFocus: true,
            placeholder: this.placeholder,
            value: this.state.queryString,
            onFocus: this.props.onFocus,
            onBlur: this.props.onBlur,
            onChange: this.changeQuery,
            className: "form-control"
        }

        return (
            <div className="autocomplete">
                <div className="autocomplete__body">
                    <Autosuggest
                        id={this.props.id}
                        suggestions={this.state.items}
                        onSuggestionsFetchRequested={this.getItemsByQuery}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.selectItem}
                        getSuggestionValue={this.getItemName}
                        renderSuggestion={this.renderItem}
                        alwaysRenderSuggestions={false}
                        inputProps={inputProps}
                    />
                </div>
            </div>
        );
    }
}

Autocomplete.propTypes = {
    placeholder: PropTypes.string,
    queryString: PropTypes.string,
    id: PropTypes.string,
    selectItem: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    getItemsByQuery: PropTypes.func.isRequired
};

Autocomplete.defaultProps = {
    placeholder: "выбрать",
    queryString: "",
    id: "",
    selectItem: () => {},
    onFocus: () => {},
    onChange: () => {},
    onBlur: () => {}
};

export default Autocomplete;
