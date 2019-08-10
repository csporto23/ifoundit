import React from "react";
import Hero from "../Hero";
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";
import Homebody from "../Homebody"

function Homepage() {
  return (
    <div>
      <Hero backgroundImage="https://png.pngtree.com/thumb_back/fh260/back_pic/03/88/78/7857d6c926b6dd6.jpg">
        <h1>Chess</h1>
        <h2>Challenge Someone or even yourself!</h2>
      </Hero>
      <Container style={{ marginTop: 30 }}>
        <Row>
          <Col size="md-12">
    <Homebody></Homebody>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
