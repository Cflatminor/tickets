import React from "react";
import PropTypes from "prop-types";

import Nouislider from "nouislider-react";

class TimeSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            from: this.props.currentRange.min,
            to: this.props.currentRange.max
        };

        this._update = this._update.bind(this);
        this._change = this._change.bind(this);
    }

    /**
     * @private
     * @method _update
     * @param range {Array}
     * @returns {TimeSlider}
     */
    _update(range) {
        let [from, to] = range;

        this.setState({
            from: Math.floor(Number(from)),
            to: Math.floor(Number(to)),
        });

        return this;
    }

    /**
     * @private
     * @method _change
     * @returns {TimeSlider}
     */
    _change() {
        this.props.change({from: this.state.from, to: this.state.to});

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="time-slider">
                <div className="time-slider__header color-black d-flex align-items-center">
                    <span>{this.state.from}:00</span>

                    <span>&#8212;</span>

                    <span>{this.state.to}:00</span>
                </div>

                <div className="time-slider__body">
                    <Nouislider
                        range={{
                            min: this.props.range.min,
                            max: this.props.range.max
                        }}
                        start={[
                            this.props.currentRange.min,
                            this.props.currentRange.max
                        ]}
                        onSlide={this._update}
                        onEnd={this._change}
                        animate={false}
                        connect
                    />
                </div>
            </div>
        );
    }
}

TimeSlider.propTypes = {
    range: PropTypes.instanceOf(Object),
    currentRange: PropTypes.instanceOf(Object),
    change: PropTypes.func
};

TimeSlider.defaultProps = {
    range: {
        min: 0,
        max: 24
    },
    currentRange: {
        min: 0,
        max: 24
    },
    change: () => {}
};

export default TimeSlider;
