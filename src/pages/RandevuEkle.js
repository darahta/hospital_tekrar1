import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const RandevuEkle = (props) => {
   const navigate = useNavigate();
   const [date, setDate] = useState("");
   const [phone, setPhone] = useState("");
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [sikayet, setSikayet] = useState("");
   const [hastalar, setHastalar] = useState(null);
   const [hasHasta, setHasHasta] = useState(false);

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
      console.log(date);
      if (
         date === "" ||
         name === "" ||
         surname === "" ||
         phone === "" ||
         sikayet === ""
      ) {
         alert("Bütün alanları doldurmak zorunludur");
         return;
      }
      if (phone.length !== 11) {
         alert("Telefon numarası 11 haneli olmak zorundadır");
         return;
      }
      if (hasHasta) {
         const newRandevu = {
            id: String(new Date().getTime()),
            date: date,
            hastaId: hasHasta.id,
         };
         const newIslem = {
            id: String(new Date().getTime() + 1),
            sikayet: sikayet,
            uygulananTedavi: "",
            yazilanIlaclar: [],
         };
         const updatedHasta = {
            ...hasHasta,
            islemIds: [...hasHasta.islemIds, newIslem.id],
         };
         axios
            .post("http://localhost:3004/randevular", newRandevu)
            .then((res) => {
               console.log("radevu kayıt", res);
            })
            .catch((err) => console.log("err", err));
         axios
            .post("http://localhost:3004/islemler", newIslem)
            .then((res) => console.log("işlem kayıt", res))
            .catch((err) => console.log("err", err));

         axios
            .put(`http://localhost:3004/hastalar/${hasHasta.id}`, updatedHasta)
            .then((res) => console.log("update res", res))
            .catch((err) => console.log("err", err));
         navigate("/");
         console.log("newRandevu", newRandevu);
      } else {
         const newIslem = {
            id: String(new Date().getTime()),
            sikayet: sikayet,
            uygulananTedavi: "",
            yazilanIlaclar: [],
         };

         const newHasta = {
            id: String(new Date().getTime() + 1),
            name: name,
            surname: surname,
            phone: phone,
            islemIds: [newIslem.id],
         };
         const newRandevu = {
            id: String(new Date().getTime() + 2),
            date: date,
            hastaId: newHasta.id,
         };
         axios
            .post("http://localhost:3004/randevular", newRandevu)
            .then((res) => {
               console.log("radevu kayıt", res);
            })
            .catch((err) => console.log("err", err));
         axios
            .post("http://localhost:3004/islemler", newIslem)
            .then((res) => console.log("işlem kayıt", res))
            .catch((err) => console.log("err", err));
         axios
            .post("http://localhost:3004/hastalar", newHasta)
            .then((res) => console.log("işlem kayıt", res))
            .catch((err) => console.log("err", err));
      }
      navigate("/");
   };

   const handlePhoneChange = (event) => {
      setPhone(event.target.value);
      const arananHasta = hastalar.find(
         (item) => item.phone === String(event.target.value)
      );
      //   console.log("aranan hasta", arananHasta);
      if (arananHasta !== undefined) {
         setName(arananHasta.name);
         setSurname(arananHasta.surname);
         setHasHasta(arananHasta);
      } else {
         setName("");
         setSurname("");
         setHasHasta(false);
      }
   };

   if (hastalar === null) {
      return <h1>Loading...</h1>;
   }
   return (
      <div>
         <Header />

         <form onSubmit={handleSubmit}>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "30px 0",
               }}
            >
               <input
                  defaultValue={date}
                  onChange={(event) => setDate(event.target.value)}
                  type={"datetime-local"}
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
                  type={"number"}
                  style={{ width: "25%" }}
                  id="outlined-basic"
                  label="Telefon Numarası"
                  variant="outlined"
                  value={phone}
                  onChange={handlePhoneChange}
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
                  label="Adı"
                  variant="outlined"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={hasHasta}
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
                  disabled={hasHasta}
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
                  label="Şikayet"
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

export default RandevuEkle;
