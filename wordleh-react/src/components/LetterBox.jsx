import React, { Component } from "react";

class LetterBox extends Component {
    render() {
        return (
            <div className="col">
                <input
                    type="text-center fs-1"
                    className="form-control text-center"
                    name={`letter${this.props.id}`}
                    value={this.props.value}
                    onChange={(e) =>
                        this.props.onValueChange(
                            this.props.letterBox,
                            e.target.value
                        )
                    }
                />
            </div>
        );
    }
}

export default LetterBox;
