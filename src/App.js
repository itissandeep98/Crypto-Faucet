import logo from "./logo.svg";
import "./App.css";
import Faucet from "./Components/Faucet";
import TokenSend from "./Components/TokenSend";

function App() {
	return (
		<div className="App">
			<div className="jumbotron jumbotron-fluid">
				<div className="container">
					<h1 className="display-4">LFG faucet</h1>
					<p className="lead">
						This is a modified jumbotron that occupies the entire horizontal
						space of its parent.
					</p>
				</div>
			</div>
			<Faucet />
			<TokenSend />
		</div>
	);
}

export default App;
