import React, { Component } from "react";

class Version extends Component {
    state = {
        current_version: "0.1.3 (alpha)",
        last_updated: "3 Feb 2022",
        recent_changes_msg: "Wordleh now supports capital letters!",
    };
    render() {
        return (
            <div class="col pt-4 ms-5">
                <p className="text-muted">{`Wordleh ${this.state.current_version} - Last updated: ${this.state.last_updated}`}</p>
            </div>
        );
    }
}

export default Version;
