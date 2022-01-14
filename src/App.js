import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/Main";

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<div className="App bg-dark text-white">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route
						path="*"
						element={
							<main style={{ padding: "1rem" }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
