import React from "react";
import { Card, Badge, Col } from "react-bootstrap";
import { numberWithCommas } from "../util/util";
import "./compo.scss";

export default function Menus(props) {
  const { menu, masukKeranjang } = props;
  return (
    <Col md={4}>
      <Card
        style={{ width: "100%" }}
        className="mb-4 shadow b-none"
        onClick={() => masukKeranjang(menu)}
      >
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <h6>{menu.nama}</h6>
          <Badge pill bg="primary">
            Rp {numberWithCommas(menu.harga)}
          </Badge>
        </Card.Body>
      </Card>
    </Col>
  );
}
