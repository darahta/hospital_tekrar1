import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Modal } from "@mui/material";

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

const EditHastaModal = (props) => {
   const { open, handleClose, hasta } = props;

   const [name, setName] = useState(hasta?.name);
   const [surname, setSurname] = useState(hasta?.surname);
   const [phone, setPhone] = useState(hasta?.phone);

   useEffect(() => {
      setName(hasta?.name);
      setSurname(hasta?.surname);
      setPhone(hasta?.phone);
   }, [hasta]);

   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <h1 style={{ textAlign: "center" }}>Hasta Düzenle</h1>
               <form>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "30px 0",
                     }}
                  >
                     <TextField
                        style={{ width: "100%" }}
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
                        margin: "30px 0",
                     }}
                  >
                     <TextField
                        style={{ width: "100%" }}
                        id="outlined-basic"
                        label="Soyadı"
                        variant="outlined"
                        value={surname}
                        onChange={(event) => setSurname(event.target.value)}
                     />
                  </div>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "30px 0",
                     }}
                  >
                     <TextField
                        style={{ width: "100%" }}
                        id="outlined-basic"
                        label="Telefon Numarası"
                        variant="outlined"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                     />
                  </div>
               </form>
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
            </Box>
         </Modal>
      </div>
   );
};

export default EditHastaModal;
