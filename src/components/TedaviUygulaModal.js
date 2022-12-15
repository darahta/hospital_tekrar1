import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Modal } from "@mui/material";
import axios from "axios";

const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
};

const TedaviUygulaModal = (props) => {
   const { open, handleClose, islem, didUpdate, setDidUpdate } = props;

   const [uygulananTedavi, setUygulananTedavi] = useState("");
   const [ilaclar, setIlaclar] = useState("");

   const handleSubmit = (event) => {
      event.preventDefault();
      if (uygulananTedavi === "" || ilaclar === "") {
         return "Tedavi alanı boş bırakılamaz";
      }

      const seperatedIlaclar = ilaclar.split(",");

      const updateIslem = {
         ...islem,
         uygulananTedavi: uygulananTedavi,
         yazilanIlaclar: seperatedIlaclar,
      };
      axios
         .put(`http://localhost:3004/islemler/${islem.id}`, updateIslem)
         .then((response) => {
            setUygulananTedavi("");
            setIlaclar("");
            handleClose();
            setDidUpdate(!didUpdate);
         })
         .catch((err) => console.log(err));
   };

   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <h1 style={{ textAlign: "center" }}>Tedavi Ekle</h1>
               <form onSubmit={handleSubmit}>
                  <div
                     style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "30px 0",
                     }}
                  >
                     <TextField
                        style={{ width: "100%" }}
                        id="outlined-basic"
                        label="Uygulanan Tedavi"
                        variant="outlined"
                        value={uygulananTedavi}
                        onChange={(event) =>
                           setUygulananTedavi(event.target.value)
                        }
                     />
                  </div>
                  <div
                     style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        margin: "30px 0",
                     }}
                  >
                     <TextField
                        style={{ width: "100%" }}
                        id="outlined-basic"
                        label="Yazılan İlaç"
                        variant="outlined"
                        value={ilaclar}
                        onChange={(event) => setIlaclar(event.target.value)}
                     />
                  </div>

                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "30px",
                        gap: "30px",
                     }}
                  >
                     <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="secondary"
                     >
                        Vazgeç
                     </Button>
                     <Button type="submit" variant="contained">
                        Kaydet
                     </Button>
                  </div>
               </form>
            </Box>
         </Modal>
      </div>
   );
};

export default TedaviUygulaModal;
