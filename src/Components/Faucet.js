import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button, Container, Row, Col } from "reactstrap";
import TokenAbi from "../Config/abi/erc20.json";
import FaucetAbi from "../Config/abi/faucet.json";
import { FaucetAddress, TokenAddress } from "../Config/Constants";
import { showAlert } from "./Alert";

const Faucet = (props) => {
	const [balance, setBalance] = useState();
	const [chainID, setChainID] = useState(null);
	const ethereum = window.ethereum;
	const provider = new ethers.providers.Web3Provider(ethereum);

	useEffect(() => {
		getBalance();
		ethereum.on("chainChanged", () => {
			window.location.reload();
		});
		ethereum.on("accountsChanged", () => {
			window.location.reload();
		});
	}, []);

	async function getBalance() {
		if (typeof ethereum !== "undefined") {
			const { chainId } = await provider.getNetwork();
			setChainID(chainId);
			const [account] = await window.ethereum.request({
				method: "eth_requestAccounts",
			});

			const contract = new ethers.Contract(TokenAddress, TokenAbi, provider);
			contract
				.balanceOf(account)
				.then((balance) => setBalance((balance / 10 ** 18).toString()))
				.catch((err) =>
					showAlert(
						"Unable to fetch balance, try switching the network",
						"error"
					)
				);
		} else {
			showAlert("Unable to connect to a Wallet", "error");
		}
	}

	async function faucet() {
		if (typeof ethereum !== "undefined") {
			const signer = provider.getSigner();
			const contract = new ethers.Contract(FaucetAddress, FaucetAbi, signer);
			contract
				.extractToken()
				.then((res) => {
					console.log(res);
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
			provider.provider.sendAsync(
				{
					method: "metamask_watchAsset",
					params: {
						type: "ERC20",
						options: {
							address: TokenAddress,
							symbol: "SANDY",
							decimals: 18,
							image: "https://avatars.githubusercontent.com/u/44255731?v=4",
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
				provider.provider.sendAsync({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x13881",
							chainName: "Polygon Testnet",
							rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
							nativeCurrency: {
								name: "MATIC",
								symbol: "MATIC",
								decimals: 18,
							},
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
				<h2>Recieve SANDY to your wallet</h2>
				<hr />
				<h5>You currently have {balance ?? 0} SANDY</h5>
			</Row>

			<Row>
				<Col className="d-flex justify-content-around mt-4">
					<Button
						onClick={faucet}
						color="primary"
						className="rounded-pill"
						disabled={balance > 15}
					>
						Request Token!
					</Button>
					<Button onClick={showToken} color="primary" className="rounded-pill">
						View Token in MetaMask
					</Button>
					<Button
						onClick={addNetwork}
						color="primary"
						className="rounded-pill"
						disabled={chainID === 80001}
					>
						Add/Switch Network
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Faucet;
