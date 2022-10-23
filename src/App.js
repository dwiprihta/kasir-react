import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListCategories, Hasil, NavbarComponent, Menus } from "./components";
import { Row, Col, Container } from "react-bootstrap";
import Swal from "sweetalert2";

import { API_URL } from "./util/constants";

const App = () => {
  const [menus, setMenus] = useState([]);
  const [chooseCategory, setchooseCategory] = useState("Makanan");
  const [keranjang, setKeranjang] = useState([]);

  useEffect(() => {
    const myFetch = async () => {
      try {
        let url = API_URL + "products?category.nama=" + chooseCategory;
        let response = await axios.get(url);
        setMenus(response.data);
      } catch (error) {
        alert(error);
      }
    };
    myFetch();

    axios
      .get(API_URL + "keranjangs")
      .then((response) => {
        console.log(response);
        setKeranjang(response.data);
      })
      .catch((error) => {
        console.log("GAGAL MENAMPILKAN !");
      });
  }, [keranjang]);

  const gantiKat = (value) => {
    setchooseCategory(value);
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  const masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((response) => {
        if (response.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((response) => {
              console.log(response);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: keranjang.product.nama + " Disimpan",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } else {
          const keranjang = {
            jumlah: response.data[0].jumlah + 1,
            total_harga: response.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + response.data[0].id, keranjang)
            .then((response) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: keranjang.product.nama + " Disimpan",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-4">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={gantiKat}
              categoriYangDipilih={chooseCategory}
            />
            <Col>
              <h6>Daftar Product</h6>
              <hr />
              <Row>
                {menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={masukKeranjang}
                  />
                ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjang} />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default App;
