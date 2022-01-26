import { Container, Row, Col } from "reactstrap";
import Faucet from "./Faucet";
import Info from "./Info";

function Main() {
	return (
		<Container>
			<Row>
				<Col className="text-center">
					<img src="/icons/logo-full.png" />
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
