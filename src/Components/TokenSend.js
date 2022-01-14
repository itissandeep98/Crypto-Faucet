import { useState } from "react";
import { ethers } from "ethers";
import { Card, Button, CardBody, CardHeader } from "reactstrap";
import TokenAbi from "../Config/abi/erc20.json";
import { TokenAddress } from "../Config/Constants";

const TokenSend = (props) => {
	const [userAccount, setUserAccount] = useState();
	const [amount, setAmount] = useState();

	// request access to the user's MetaMask account
	async function requestAccount() {
		await window.ethereum.request({ method: "eth_requestAccounts" });
	}

	async function sendCoins() {
		if (typeof window.ethereum !== "undefined") {
			await requestAccount();
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(TokenAddress, TokenAbi, signer);
			const transation = await contract.transfer(userAccount, amount);
			await transation.wait();
			console.log(`${amount} Coins successfully sent to ${userAccount}`);
		}
	}
	return (
		<Card>
			<CardBody>
				<CardHeader> send faucet to an address</CardHeader>
				<br></br>
				<div className="d-grid gap-2">
					<input
						onChange={(e) => setUserAccount(e.target.value)}
						placeholder="Payee 0x address"
					/>
					<input
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Amount"
					/>
					<Button onClick={sendCoins} variant="success">
						send{" "}
					</Button>
				</div>
			</CardBody>
		</Card>
	);
};

export default TokenSend;
