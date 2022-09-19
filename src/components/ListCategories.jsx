import React, { useState, useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../util/constants";

export default function ListCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const myFetch = async () => {
      try {
        let url = API_URL + "categories";
        let response = await axios.get(url);
        setCategories(response.data);
      } catch (error) {
        alert(error);
      }
    };
    myFetch();
  }, []);

  return (
    <Col md={2} mt="2">
      <h6>Daftar Kategory</h6>
      <hr />
      <ListGroup>
        {categories &&
          categories.map((categories) => (
            <ListGroup.Item key={categories.id}>
              {categories.nama}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
}
