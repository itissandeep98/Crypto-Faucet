import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/Main";

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<Main />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
