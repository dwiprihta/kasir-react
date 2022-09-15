import React from "react";
import ListCategories from "./components/ListCategories";
import Hasil from "./components/Hasil";
import NavbarComponent from "./components/navbarComponent";
import { Row, Col, Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-4">
        <Container fluid>
          <Row>
            <ListCategories />
            <Col>
              <h7>Daftar Product</h7>
              <hr />
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
