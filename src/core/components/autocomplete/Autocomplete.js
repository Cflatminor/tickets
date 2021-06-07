// /* eslint-disable */

// todo "autocomplete/type/sections"
import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";

class Autocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.item = null;

        /**
         * @property placeholder
         * @type {string}
         */
        this.placeholder = props.placeholder;

        this.state = {
            query: props.query,
            items: []
        };

        this.selectItem = this.selectItem.bind(this);
        this.getItemsByQuery = this.getItemsByQuery.bind(this);
        this.setItems = this.setItems.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.renderSectionTitle = this.renderSectionTitle.bind(this);
    }

    /**
     * @method getItemsByQuery
     * @param opts {Object}
     * @returns {Autocomplete}
     */
    getItemsByQuery(opts) {
        // let itemName = this.getItemName(this.item);
        //
        // if (!itemName.length || (itemName !== opts.value)) {
        //     this.props.getItemsByQuery(opts.value, this.setItems);
        // }
        this.props.getItemsByQuery(opts.value, this.setItems);

        return this;
    }

    getSuggestionValue(suggestion) {
        return suggestion.getName();
    }

    getSectionSuggestions(section) {
        return section.getAirports();
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

    onChange(event, opts) {
        this.setState({
            query: opts.newValue
        });

        return this;
    }

    onSuggestionsClearRequested() {
        this.setState({
            items: []
        });
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

    renderSuggestion(suggestion) {
        return this.props.renderSuggestion(suggestion);
    }

    renderSectionTitle(section) {
        return this.props.renderSectionTitle(section);
    }

    render() {
        const inputProps = {
            placeholder: this.placeholder,
            value: this.state.query,
            onChange: this.onChange,
            // autoFocus: true,
            onFocus: this.props.onFocus,
            onBlur: this.props.onBlur,
            className: "form-control"
        };

        return (
            <Autosuggest
                multiSection
                suggestions={this.state.items}
                onSuggestionsFetchRequested={this.getItemsByQuery}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                renderSectionTitle={this.renderSectionTitle}
                getSectionSuggestions={this.getSectionSuggestions}
                onSuggestionSelected={this.selectItem}
                inputProps={inputProps}
            />
        );
    }
}

Autocomplete.propTypes = {
    placeholder: PropTypes.string,
    query: PropTypes.string,
    selectItem: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    getItemsByQuery: PropTypes.func.isRequired,
    renderSuggestion: PropTypes.func.isRequired,
    renderSectionTitle: PropTypes.func.isRequired
};

Autocomplete.defaultProps = {
    placeholder: "выбрать",
    query: "",
    selectItem: () => {},
    onFocus: () => {},
    onBlur: () => {}
};

export default Autocomplete;
