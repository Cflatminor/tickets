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
        this.setState(function () {
            return {
                queryString: opts.newValue
            };
        });

        return this;
    }

    /**
     * @method selectItem
     * @param event {Object}
     * @param opts {Object}
     * @returns {}
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
     * @returns {string}
     */
    renderItem(item) {
        return (
            <a href="#">{ item.getName() }</a>
        );
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
            onChange: this.changeQuery,
            className: "form-control"
        }

        return (
            <div className="autocomplete">
                <div className="autocomplete__body">
                    <Autosuggest
                        suggestions={this.state.items}
                        onSuggestionsFetchRequested={this.getItemsByQuery}
                        // onSuggestionsClearRequested={() => {}}
                        onSuggestionSelected={this.selectItem}
                        getSuggestionValue={this.getItemName}
                        renderSuggestion={this.renderItem}
                        alwaysRenderSuggestions={true}
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
    selectItem: PropTypes.func,
    getItemsByQuery: PropTypes.func.isRequired
};

Autocomplete.defaultProps = {
    placeholder: "выбрать",
    queryString: "",
    selectItem: () => {}
};

export default Autocomplete;
