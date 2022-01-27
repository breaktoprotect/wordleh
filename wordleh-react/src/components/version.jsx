import React, { Component } from "react";

class Version extends Component {
    state = {
        current_vevsion: "0.1.2 (alpha)",
        last_updated: "27 Jan 2022",
    };
    render() {
        return (
            <div class="row">
                <p className="text-muted">{`Wordleh ${this.state.current_version} - Last updated: ${this.state.last_updated}`}</p>
            </div>
        );
    }
}

export default Version;