import logo from "./logo.svg";
import "./App.css";
import WordlehFormSimple from "./components/wordlehFormSimple";
import SiteMaintenance from "./components/siteMaintenance";

function App() {
    return (
        <div className="App bg-dark">
            {/*<WordlehFormSimple />*/}
            <SiteMaintenance />
        </div>
    );
}

export default App;
