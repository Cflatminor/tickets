import React from "react";
// import Autosuggest from "react-autosuggest";

class DeparturePoint extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        // value: "",
        // isDisabled: false
        // suggestions: [],
        // selectedSuggestion: null
        // };

        // this._onChange = this._onChange.bind(this);
        this._getSuggestions = this._getSuggestions.bind(this);
        this._getSuggestionValue = this._getSuggestionValue.bind(this);
        this._renderSuggestion = this._renderSuggestion.bind(this);
    }

    _getSuggestions() {
        return [{value: "a"}, {value: "ab"}, {value: "abc"}, {value: "abcd"}];
    }

    _getSuggestionValue(suggestion) {
        return suggestion.value;
    }

    _renderSuggestion(suggestion) {
        return (
            <a href="#">{suggestion.value}</a>
        );
    }

    // _onChange(event, { newValue }) {
    //     this.setState({
    //         value: newValue
    //     });
    // }

    render() {
        // const inputProps = {
        //     placeholder: 'Поиск препарата',
        //     value: this.state.value,
        //     disabled: this.state.isDisabled,
        //     onChange: this._onChange
        //     // onFocus: this.props.focus,
        //     // onKeyPress: this.onSearchKeyPress
        // };

        return (
            <div className="outlined-text-form">
                <input type="text" className="form-control" required />
                {/*<Autosuggest*/}
                {/*    suggestions={this._getSuggestions}*/}
                {/*    getSuggestionValue={this._getSuggestionValue}*/}
                {/*    onSuggestionsFetchRequested={() => {}}*/}
                {/*    renderSuggestion={this._renderSuggestion}*/}
                {/*    inputProps={inputProps}*/}
                {/*/>*/}

                <label>
                    Откуда <span className="icon icon-cart-check" />
                </label>
            </div>
        );
    }
}

export default DeparturePoint;
