import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HastaEkle = (props) => {
   const navigate = useNavigate();
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [phone, setPhone] = useState("");
   const [sikayet, setSikayet] = useState("");
   const [hastalar, setHastalar] = useState(null);

   useEffect(() => {
      axios
         .get("http://localhost:3004/hastalar")
         .then((res) => {
            setHastalar(res.data);
         })
         .catch((err) => console.log("err", err));
   }, []);

   const handleSubmit = (event) => {
      event.preventDefault();
      if (name === "" || surname === "" || phone === "" || sikayet === "") {
         alert("Bütün alanları doldurmak zorunludur");
         return;
      }
      if (phone.length !== 11) {
         alert("11 haneli olmak zorunludur");
         return;
      }
      const hasNumber = hastalar.find((hasta) => hasta.phone === phone);

      if (hasNumber !== undefined) {
         alert("Kayıtlı hasta vardır");
         return;
      }

      const newIslem = {
         id: String(new Date().getTime()),
         sikayet: sikayet,
         uygulananTedavi: "",
         yazilanIlaclar: [],
      };
      console.log("newIslem", newIslem);

      axios
         .post("http://localhost:3004/islemler", newIslem)
         .then((res) => {
            const newHasta = {
               id: String(new Date().getTime()),
               name: name,
               surname: surname,
               phone: phone,
               islemIds: [newIslem.id],
            };
            axios
               .post("http://localhost:3004/hastalar", newHasta)
               .then((res) => {
                  navigate("/Hastalar");
               })
               .catch((err) => console.log("err", err));
         })
         .catch((err) => console.log("err", err));
   };

   if (hastalar === null) {
      return <h1>Loading..</h1>;
   }

   return (
      <div>
         <Header />

         <form style={{ marginTop: "80px" }} onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "center" }}>
               <TextField
                  style={{ width: "25%" }}
                  id="outlined-basic"
                  label="Adı"
                  variant="outlined"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
               />
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "25px 0",
               }}
            >
               <TextField
                  style={{ width: "25%" }}
                  id="outlined-basic"
                  label="Soyadı"
                  variant="outlined"
                  value={surname}
                  onChange={(event) => setSurname(event.target.value)}
               />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
               <TextField
                  type={"number"}
                  style={{ width: "25%" }}
                  id="outlined-basic"
                  label="Telefon Numarası"
                  variant="outlined"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
               />
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "25px 0",
               }}
            >
               <TextField
                  style={{ width: "25%" }}
                  id="outlined-basic"
                  label="Hastanın Şikayeti"
                  variant="outlined"
                  value={sikayet}
                  onChange={(event) => setSikayet(event.target.value)}
               />
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "30px",
               }}
            >
               <Button type="submit" variant="contained">
                  Kaydet
               </Button>
            </div>
         </form>
      </div>
   );
};

export default HastaEkle;
