import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../util/util";

export default function ModalKeranjang({ showModal, handleClose, keranjang, tambah, jumlah, kurang, handleSubmit,changeHandler,  totalHarga, keterangan, hapusPesanan}) {
  if (keranjang) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{keranjang.product.nama}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Tottal Harga</Form.Label>
                        <p><strong>{numberWithCommas(totalHarga)}</strong></p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Jumlah</Form.Label><br/>
                    <Button variant="primary" size="sm" className="mr-2" onClick={() => kurang()}>-</Button>
                    <strong className="ml-2 mr-2">{jumlah}</strong>
                    <Button variant="primary" size="sm" className="ml-2" onClick={() => tambah()}>+</Button>
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>Keterangan</Form.Label>
                <Form.Control as="textarea" rows={3} name="keterangan" placeholder="Cth. Sangat Pedas" value={keterangan} onChange={(event) => changeHandler(event)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Simpan
                </Button>  
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>hapusPesanan(keranjang.id)}>
            Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Keranjang!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
