import React from 'react'
import axios from "axios";
import { Col, Row, Button } from "react-bootstrap";
import { numberWithCommas } from "../util/util";
import { API_URL } from "../util/constants";
import { useNavigate } from "react-router";


export default function TotalBayar(props) {
const { keranjangs } = props;
const navigate = useNavigate();
const submitTotalBayar = (totalBayar) => {
    const pesanan = {
        total_bayar: totalBayar,
        menus: keranjangs
    }

    axios
        .post(API_URL+"pesanans", pesanan)
        .then((res) => {
            navigate('/sukses');
        }).catch((error) =>{
            console.log("Failed Post Pesanan !");
        });
    }

const totalBayar = keranjangs.reduce(function (result, item) {
    return result + item.total_harga;
}, 0);
  return (
    <div className="fixed-bottom">
        <Row>
            <Col md={{span:3, offset:9}} className="px-4">
                <h4>Rp. {numberWithCommas(totalBayar)}</h4>
                <Button
                    variant="primary"
                    block
                    className="mb-2 mt-4 mr-2"
                    size="lg"
                    onClick={() => submitTotalBayar(totalBayar)}
                    >BAYAR
                </Button>
            </Col>
        </Row>
    </div>
  )
}
