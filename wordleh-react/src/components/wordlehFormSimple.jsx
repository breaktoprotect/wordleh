import React, { cloneElement, Component } from "react";
import axios from "axios";
import LetterBoxes from "./LetterBoxes";
import Banner from "../banner.png";

class WordlehFormSimple extends Component {
    state = {
        wordLength: 5, //default 5, that's how Wordle rolls now
        poolSize: 0,
        excluded: "",
        contained: "",
        positional: "",
        suggested: "",
    };

    async componentDidMount() {
        //* Randomly fetch a non-repeated letter word at the start
        const response = await axios.get(
            "http://127.0.0.1:5000/fetch_start_word?length=" +
                this.state.wordLength
        );

        const { suggested, poolSize } = response.data;

        this.setState({ suggested, poolSize });

        //* Sets the positional text based on word length
        this.setState({ positional: "-".repeat(this.state.wordLength) });
    }

    handleChange = async (e) => {
        //TODO various data type validation, must be numeric or comma separated, etc.

        //debug
        console.warn("e.currentTarget.name:" + [e.currentTarget.name]);

        // Confirmed Handle change on any fields
        // Note: The 2nd  arguement of setState is used to put a callback to confirm updated values before perofrming the axios.get()
        this.setState(
            {
                [e.currentTarget.name]: e.currentTarget.value,
            },
            async () => {
                if (this.state.wordLength > 0 && this.state.excluded != "") {
                    const { wordLength, excluded, contained, positional } =
                        this.state;
                    const response = await axios.get(
                        "http://127.0.0.1:5000/fetch_suitable_word?length=" +
                            wordLength +
                            "&excluded=" +
                            excluded +
                            "&contained=" +
                            contained +
                            "&positional_string=" +
                            positional
                    );

                    const { suggested, poolSize } = response.data;

                    this.setState({ suggested, poolSize });
                }
            }
        );

        //debug
        console.log("currentState:" + this.state.contained);
        //* Perform GET request to fetch suggested word based on restrictions
    };

    // Special routine to handle word length change (a "reset will happen")
    handleWordLengthChange = async (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
            positional: "-".repeat([e.currentTarget.value]),
        });

        // Re-fetch a suggested word
        if ([e.currentTarget.value] < 1 || [e.currentTarget.value] > 13) {
            return;
        }
        const response = await axios.get(
            "http://127.0.0.1:5000/fetch_start_word?length=" +
                [e.currentTarget.value]
        );
        const { suggested, poolSize } = response.data;

        this.setState({ suggested, poolSize });

        this.setState({
            suggested: suggested,
            excluded: "",
            contained: "",
            poolSize: poolSize,
        });
    };

    // Set the positional string based on the value in each letterBox
    setPositional = (index, value) => {
        //debug
        console.log("positional index & value", index, value);

        //String conversion
        let pos_str = "";
        for (let i = 0; i < this.state.wordLength; i++) {
            if (i === index) {
                pos_str += value;
            } else {
                pos_str += this.state.positional.charAt(i);
            }
        }

        this.setState({ positional: pos_str });

        //debug
        console.warn("new positional: ", pos_str);
    };

    handleSubmit = (e) => {
        // Main submission routine
        const { wordLength, excluded, contained, positional } = this.state;
        const { data: suggested } = axios.get(
            "http://127.0.0.1:5000/fetch_suitable_word?length=" +
                wordLength +
                "&excluded=" +
                excluded +
                "&contained=" +
                contained +
                "&positional_string=" +
                positional
        );
        this.setState({ suggested });
    };

    render() {
        return (
            <div className="row">
                <div className="col"></div>
                <div className="col text-light pt-4">
                    <img className="img-fluid rounded" src={Banner} />
                    <br />
                    <br />
                    <p className="text-muted">
                        Hints - known letter(s) in known position(s):
                    </p>
                    <LetterBoxes
                        wordLength={this.state.wordLength}
                        setPositional={this.setPositional}
                    />
                    <br />
                    <div className="container">
                        <center>
                            <h4>Suggested:</h4>
                            <h1 className="h1">{this.state.suggested}</h1>
                        </center>
                    </div>
                    <div className="container-sm text-success">
                        <center>
                            <p>
                                (Current Pool size:{" "}
                                {this.state.poolSize > 0
                                    ? this.state.poolSize
                                    : " ? "}
                                )
                            </p>
                        </center>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="">Word Length:</label>
                        <input
                            autoFocus
                            name="wordLength"
                            value={this.state.wordLength}
                            onChange={this.handleWordLengthChange}
                            id="wordLength"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Excluded Letters</label>
                        <input
                            id=""
                            type="text"
                            name="excluded"
                            className="form-control"
                            value={this.state.excluded}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Contained Letters</label>
                        <input
                            id=""
                            type="text"
                            name="contained"
                            className="form-control"
                            value={this.state.contained}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button
                        className="btn btn-light mt-2"
                        onChange={this.handleSubmit}
                    >
                        Smash it again!
                    </button>
                    <br />
                    <br />
                    <br />
                </div>
                <div className="col"></div>
            </div>
        );
    }
}

export default WordlehFormSimple;
