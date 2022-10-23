import React from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../util/util";

export default function Hasil(props) {
  const { keranjangs } = props;
  return (
    <Col md={3} mt="2">
      <h6>
        <strong>Hasil</strong>
      </h6>
      <hr />
      <ListGroup>
        {keranjangs &&
          keranjangs.map((keranjang) => (
            <ListGroup.Item>
              <Row>
                <Col lg="2">
                  <Badge pill variant="secondary">
                    {keranjang.jumlah}
                  </Badge>
                </Col>
                <Col lg="6">{keranjang.product.nama}</Col>
                <Col lg="4">Rp. {numberWithCommas(keranjang.total_harga)}</Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
}
