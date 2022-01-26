import React, { Component } from "react";
import LetterBox from "./LetterBox";

class LetterBoxes extends Component {
    state = {
        letterBoxes: [],
    };

    componentDidMount() {
        const letterBoxes = [];

        for (let i = 0; i < this.props.wordLength; i++) {
            letterBoxes.push({
                id: i,
                value: "-",
            });
        }
        this.setState({ letterBoxes });
    }

    handleChange = (letterBox, value) => {
        //debug
        console.log(letterBox.id, value, value.length);

        // Validate - cannot be more than 1 length
        if (value.length > 1) {
            value = value[1];

            //debug
            console.warn("new value:", value);
        }

        const letterBoxes = [...this.state.letterBoxes]; //Cloning from previous array
        const index = letterBoxes.indexOf(letterBox);
        letterBoxes[index] = { ...letterBox };
        letterBoxes[index].value = value;
        this.setState(
            { letterBoxes },
            console.log("letterBoxes: ", letterBoxes)
        );
        this.props.setPositional(index, value);
    };

    render() {
        return (
            <div className="row">
                {this.state.letterBoxes.map((letterBox) => (
                    <LetterBox
                        key={letterBox.id}
                        value={letterBox.value}
                        onValueChange={this.handleChange}
                        letterBox={letterBox}
                    />
                ))}
            </div>
        );
    }
}

export default LetterBoxes;
