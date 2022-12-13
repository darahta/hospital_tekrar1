import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import EditHastaModal from "../components/EditHastaModal";

const Hastalar = () => {
   const navigate = useNavigate();
   const [hastalar, setHastalar] = useState(null);
   const [updateComponent, setUpdateComponent] = useState(false);
   const [randevular, setRandevular] = useState(null);
   const [openEditModal, setOpenEditModal] = useState(false);
   const [selectedHasta, setSelectedHasta] = useState(null);

   const handleClose = () => {
      setOpenEditModal(false);
   };

   useEffect(() => {
      axios
         .get("http://localhost:3004/hastalar")
         .then((res) => {
            setHastalar(res.data);
         })
         .catch((err) => console.log("hastalar error", err));
      axios
         .get("http://localhost:3004/randevular")
         .then((res) => {
            setRandevular(res.data);
         })
         .catch((err) => console.log("err", err));
   }, [updateComponent]);

   const handleDeleteHasta = (hasta) => {
      console.log("hastaId", hasta);
      const filteredRandevular = randevular.filter(
         (item) => item.hastaId === hasta.id
      );
      console.log("filteredrandevular", filteredRandevular);

      axios
         .delete(`http://localhost:3004/hastalar/${hasta.id}`)
         .then((resHastaDelete) => {
            hasta.islemIds.map((islemId) => {
               axios
                  .delete(`http://localhost:3004/islemler/${islemId}`)
                  .then((resIslemDelete) => {})
                  .catch((err) => console.log("err", err));
            });
            setUpdateComponent(!updateComponent);
            filteredRandevular.map((item) => {
               axios
                  .delete(`http://localhost:3004/randevular/${item.id}`)
                  .then((res) => {})
                  .catch((err) => console.log("err", err));
            });
         })
         .catch((err) => console.log("err", err));
   };

   if (hastalar === null || randevular === null) {
      return <h1>Loading...</h1>;
   }

   return (
      <div>
         <Header />
         <TableContainer style={{ marginTop: "50px" }} component={Paper}>
            <div
               style={{
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "flex-end",
               }}
            >
               <Button
                  onClick={() => navigate("/hasta-ekle")}
                  variant="contained"
               >
                  Hasta Ekle
               </Button>
            </div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead sx={{ backgroundColor: "#aaa" }}>
                  <TableRow>
                     <TableCell align="right">Adı</TableCell>
                     <TableCell align="right">Soayadı</TableCell>
                     <TableCell align="right">Telefon Numarası</TableCell>
                     <TableCell align="center">İşlem</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {hastalar.length === 0 && (
                     <TableRow>
                        <TableCell align="center" colSpan={4}>
                           Kayıtlı hasta bulunmamaak
                        </TableCell>
                     </TableRow>
                  )}
                  {hastalar.map((hasta) => {
                     return (
                        <TableRow
                           key={hasta.id}
                           sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                           }}
                        >
                           <TableCell align="right"> {hasta.name}</TableCell>
                           <TableCell align="right">{hasta.surname}</TableCell>
                           <TableCell align="right">{hasta.phone}</TableCell>
                           <TableCell align="right">
                              <Stack
                                 spacing={2}
                                 direction="row"
                                 align="right"
                                 style={{
                                    display: "flex",
                                    justifyContent: "center",
                                 }}
                              >
                                 <Button
                                    onClick={() => {
                                       setOpenEditModal(true);
                                       setSelectedHasta(hasta);
                                    }}
                                    variant="outlined"
                                    color="secondary"
                                 >
                                    Düzenle
                                 </Button>
                                 <Button
                                    onClick={() => handleDeleteHasta(hasta)}
                                    variant="outlined"
                                    color="success"
                                 >
                                    Sil
                                 </Button>
                                 <Button variant="outlined" color="error">
                                    Detaylar
                                 </Button>
                              </Stack>
                           </TableCell>
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
         <EditHastaModal
            hasta={selectedHasta}
            open={openEditModal}
            handleClose={handleClose}
         />
      </div>
   );
};

export default Hastalar;
