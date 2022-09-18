import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListCategories, Hasil, NavbarComponent, Menus } from "./components";
import { Row, Col, Container } from "react-bootstrap";
import { API_URL } from "./util/constants";

const App = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const myFetch = async () => {
      try {
        let url = API_URL + "products";
        let response = await axios.get(url);
        setMenus(response.data);
      } catch (error) {
        alert(error);
      }
    };
    myFetch();
  }, []);

  console.log(menus);

  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-4">
        <Container fluid>
          <Row>
            <ListCategories />
            <Col>
              <h6>Daftar Product</h6>
              <hr />
              <Row>
                {menus.map((menu) => (
                  <Menus key={menu.id} menu={menu} />
                ))}
              </Row>
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default App;
