import React, { useState } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../util/util";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import Swal from "sweetalert2";
import { API_URL } from "../util/constants";
import axios from "axios";

export default function Hasil({ keranjangs, listKeranjang }) {
  const [show, setShow] = useState(false);
  const [keranjangDetail, setKeranjangDetail]=useState();
  const [jumlah, setJumlah]=useState();
  const [keterangan, setKeterangan]=useState();
  const [totalHarga, setTotalHarga]=useState();

 
  const handleShow = (keranjang) => {
    setShow(true);
    setKeranjangDetail(keranjang);
    setJumlah(keranjang.jumlah);
    setTotalHarga(keranjang.total_harga);
    setKeterangan(keranjang.keterangan);
  }

  const handleClose = () => setShow(false);

  const tambah = () =>{
    setJumlah(jumlah + 1);
    setTotalHarga(keranjangDetail.product.harga * (jumlah+1));
  }

  const kurang = () =>{
    if (jumlah != 1){
      setJumlah(jumlah - 1);
      setTotalHarga(keranjangDetail.product.harga * (jumlah-1));
    }
  }

  const changeHandler = (event) => {
    setKeterangan(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      jumlah: jumlah,
      total_harga: totalHarga,
      product: keranjangDetail.product,
      keterangan: keterangan,
    }
    axios
      .put(API_URL + "keranjangs/" + keranjangDetail.id, data)
      .then((res) => {
        handleClose()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: " Disimpan",
          showConfirmButton: false,
          timer: 1500,
        });
        listKeranjang();
      })
      .catch((error) => {
          console.log("Error yaa ", error);
      });
  }

  const hapusPesanan=(id)=>{
    handleClose()
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        handleClose()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: " Dihapus",
          showConfirmButton: false,
          timer: 1500,
        });
        listKeranjang();
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  return (
    <Col md={3} mt="2">
      <h6>
        <strong>Hasil</strong>
      </h6>
      <hr />
      <ListGroup>
        {keranjangs &&
          keranjangs.map((keranjang) => (
            <ListGroup.Item  key={keranjang.id} onClick={() => handleShow(keranjang)}>
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
      <ModalKeranjang 
        handleClose={handleClose} 
        showModal={show} 
        keranjang={keranjangDetail}
        jumlah={jumlah}
        tambah={tambah}
        kurang={kurang}
        keterangan={keterangan}
        handleSubmit={handleSubmit}
        changeHandler={changeHandler}
        totalHarga={totalHarga}
        hapusPesanan={hapusPesanan}
        />
      <TotalBayar keranjangs={keranjangs} />
    </Col>
  );
}
