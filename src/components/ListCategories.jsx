import React, { useState, useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../util/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUtensils,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default function ListCategories(props) {
  const [categories, setCategories] = useState([]);

  //call the API
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

  const { changeCategory, categoriYangDipilih } = props;
  //console.log(props);
  return (
    <Col md={2} mt="2">
      <h6>Daftar Kategory</h6>
      <hr />
      <ListGroup>
        {categories &&
          categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              value={category.id}
              onClick={() => changeCategory(category.nama)}
              className={
                categoriYangDipilih === category.nama
                  ? "btn btn-success mb-3 category-aktif"
                  : "btn btn-success mb-3"
              }
            >
              <h6>
                <Icon nama={category.nama} /> {category.nama}
              </h6>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
}
