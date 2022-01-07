import React from "react";
import Faucet from "./Faucet";
import TokenSend from "./TokenSend";

function Main() {
	return (
		<>
			<div className="jumbotron jumbotron-fluid">
				<div className="container">
					<h1 className="display-4">LFG faucet</h1>
					<p className="lead">Get free tokens</p>
				</div>
			</div>
			<Faucet />
			<TokenSend />
		</>
	);
}

export default Main;
