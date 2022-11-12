
import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../util/constants";
import { Link } from "react-router-dom";

export default function Sukses() {
  //call the API
  useEffect(() => {
      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function(item) {
          return axios
              .delete(API_URL+"keranjangs/"+item.id)
              .then((res) => console.log(res))
              .catch((error) => console.log(error))
        })
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }, []);

  return (
    <div className="mt-4 text-center">
        <Image src="assets/images/sukses.png" width="500" />
        <h1>Sukses Pesan</h1>
        <p>Terimakasih Sudah Memesan!</p>
        <Button variant="success" as={Link} to="/">
          Kembali
        </Button>
      </div>
  )
}
