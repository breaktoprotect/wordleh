import React, { Component } from "react";
import Banner from "../banner.png";

class SiteMaintenance extends Component {
    state = {};
    render() {
        return (
            <div className="row text-white">
                <div className="col"></div>
                <div className="col pt-4 ms-5">
                    <img
                        className="img-fluid rounded"
                        style={{ opacity: 0.3 }}
                        src={Banner}
                    />
                    <center>
                        <h1 className="pt-4">Coming back soon!</h1>
                    </center>

                    <p
                        className="pt-1 text-muted"
                        style={{ textAlign: "justify" }}
                    >
                        The site is currently down for further awesome
                        augmentations and insanely cool implementations. It's
                        totally not because of financial reasons...those are
                        fake news.
                    </p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                <div className="col"></div>
            </div>
        );
    }
}

export default SiteMaintenance;
