import React, { cloneElement, Component } from "react";
import axios from "axios";

class WordlehFormSimple extends Component {
    state = {
        wordLength: 5, //default 5, that's how Wordle rolls now
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
        const { data: suggested } = response;

        this.setState({ suggested });

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
                    const { data: suggested } = await axios.get(
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
        const { data: suggested } = await axios.get(
            "http://127.0.0.1:5000/fetch_start_word?length=" +
                [e.currentTarget.value]
        );
        this.setState({
            suggested: suggested,
            excluded: "",
            contained: "",
        });
    };

    handleSubmit = (e) => {
        e.preventDefault(); //prevent full page reload during submission
        e.stopImmediatePropagation();

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
            <div class="row">
                <div className="col"></div>
                <div className="col text-light pt-4">
                    <h3>Wordleh!? v0.1</h3>
                    <form onSubmit={this.handleChange} action="">
                        <div className="form-group">
                            <label htmlFor="">
                                PLACEHOLDER WORD OF THE DAY
                            </label>
                            <input
                                id=""
                                type="text"
                                className="form-control"
                                name="positional"
                                value={this.state.positional}
                                onChange={this.handleChange}
                            />
                        </div>
                        <br />
                        <div className="container">
                            <center>
                                <h4>Suggested:</h4>
                                <h1 className="h1">{this.state.suggested}</h1>
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
                    </form>
                </div>
                <div className="col"></div>
            </div>
        );
    }
}

export default WordlehFormSimple;
