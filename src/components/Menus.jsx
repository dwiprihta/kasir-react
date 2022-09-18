import React from "react";
import { Card, Badge, Col } from "react-bootstrap";
import { numberWithCommas } from "../util/util";
import "./compo.scss";

export default function Menus(props) {
  return (
    <Col md={4}>
      <Card style={{ width: "100%" }} className="mb-4 shadow b-none">
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            props.menu.category.nama.toLowerCase() +
            "/" +
            props.menu.gambar
          }
        />
        <Card.Body>
          <h6>{props.menu.nama}</h6>
          <Badge pill bg="primary">
            Rp {numberWithCommas(props.menu.harga)}
          </Badge>
        </Card.Body>
      </Card>
    </Col>
  );
}
