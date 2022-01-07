import React from "react";
import Faucet from "./Faucet";
import TokenSend from "./TokenSend";

function Main() {
	return (
		<>
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
		</>
	);
}

export default Main;
