import { useState } from "react";
import { ethers } from "ethers";
import { Card, Button, CardBody, CardHeader } from "reactstrap";
import TokenAbi from "../Config/abi/erc20.json";

const tokenAddress = "0x51F6c7Ad98B1a644452ECf05eDDCa70FD5ec0A30";

const Faucet = (props) => {
	const [balance, setBalance] = useState();
	const [showBalance, setShowBalance] = useState(false);

	async function getBalance() {
		if (typeof window.ethereum !== "undefined") {
			const [account] = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const contract = new ethers.Contract(tokenAddress, TokenAbi, provider);
			const balance = await contract.balanceOf(account);
			console.log("Balance: ", balance.toString());
			setBalance(balance.toString());
			setShowBalance(true);
		}
	}

	async function faucet() {
		if (typeof window.ethereum !== "undefined") {
			const account = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(tokenAddress, TokenAbi, signer);
			contract.faucet(account[0], 100);
		}
	}
	return (
		<div>
			<Card>
				<CardBody>
					<CardHeader>recieve faucet ERC20 to your wallet</CardHeader>
					<br></br>
					<div className="d-grid gap-2">
						<Button onClick={faucet}>get faucet token!</Button>
						<Button onClick={getBalance} variant="warning">
							check my balance
						</Button>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default Faucet;
