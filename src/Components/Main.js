import { Container, Row, Col } from "reactstrap";
import Faucet from "./Faucet";
import Info from "./Info";

function Main() {
	return (
		<Container>
			<Row>
				<Col className="text-center">
					<h1 className="display-4">LFG Faucet</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<Faucet />
					<Info />
				</Col>
			</Row>
		</Container>
	);
}

export default Main;
