import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
	Card,
	Button,
	CardBody,
	CardHeader,
	Container,
	Row,
	Col,
} from "reactstrap";
import TokenAbi from "../Config/abi/erc20.json";
import FaucetAbi from "../Config/abi/faucet.json";
import { FaucetAddress, TokenAddress } from "../Config/Constants";
import { showAlert } from "./Alert";

const Faucet = (props) => {
	const [balance, setBalance] = useState();
	const ethereum = window.ethereum;

	useEffect(() => {
		getBalance();
	}, []);

	async function getBalance() {
		if (typeof ethereum !== "undefined") {
			const [account] = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			const provider = new ethers.providers.Web3Provider(ethereum);
			const contract = new ethers.Contract(TokenAddress, TokenAbi, provider);
			const balance = await contract.balanceOf(account);
			setBalance((balance / 10 ** 18).toString());
		} else {
			showAlert("Unable to connect to a Wallet", "error");
		}
	}

	async function faucet() {
		if (typeof ethereum !== "undefined") {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(FaucetAddress, FaucetAbi, signer);
			contract
				.extractToken()
				.then((res) => {
					showAlert("Transaction Successfull", "success");
					getBalance();
				})
				.catch((err) => {
					showAlert(err?.data?.message, "error");
				});
		} else {
			showAlert("Unable to connect to a Wallet", "error");
		}
	}
	async function showToken() {
		if (typeof ethereum !== "undefined") {
			const provider = new ethers.providers.Web3Provider(ethereum);
			provider.provider.sendAsync(
				{
					method: "metamask_watchAsset",
					params: {
						type: "ERC20",
						options: {
							address: TokenAddress,
							symbol: "INR",
							decimals: 18,
						},
					},
					id: Math.round(Math.random() * 100000),
				},
				(err, added) => {
					console.log("provider returned", err, added);
				}
			);
		} else {
			showAlert("Unable to connect to a Wallet", "error");
		}
	}

	async function addNetwork() {
		if (typeof ethereum !== "undefined") {
			try {
				const provider = new ethers.providers.Web3Provider(ethereum);
				provider.provider.sendAsync({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x13881",
							chainName: "MATIC mumbai",
							rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
						},
					],
				});
			} catch (addError) {
				console.log(addError);
			}
		} else {
			showAlert("Unable to connect to a Wallet", "error");
		}
	}
	return (
		<Container className="shadow p-4 rounded">
			<Row>
				<h2>Recieve INR to your wallet</h2>
				<hr />
				<h5>You currently have {balance} INR</h5>
			</Row>

			<Row>
				<Col className="d-flex justify-content-around mt-4">
					<Button onClick={faucet} color="primary" className="rounded-pill">
						Request Token!
					</Button>
					<Button onClick={showToken} color="primary" className="rounded-pill">
						View Token in MetaMask
					</Button>
					<Button onClick={addNetwork} color="primary" className="rounded-pill">
						Switch Network
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Faucet;
