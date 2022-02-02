import logo from "./logo.svg";
import "./App.css";
import WordlehFormSimple from "./components/wordlehFormSimple";
import SiteMaintenance from "./components/siteMaintenance";
import Version from "./components/version";

function App() {
    return (
        <div className="App bg-dark">
            <div className="col">
                {" "}
                <WordlehFormSimple />
                {/*<SiteMaintenance />*/}
                <Version />
            </div>
            <div className="col"></div>
        </div>
    );
}

export default App;
