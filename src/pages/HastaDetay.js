import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import TedaviUygulaModal from "../components/TedaviUygulaModal";

const HastaDetay = () => {
   const { hastaId } = useParams();
   console.log("params", hastaId);

   const [hasta, setHasta] = useState(null);
   const [hastaIslemleri, setHastaIslemleri] = useState([]);
   const [openTedaviModal, setOpenTedaviModal] = useState(false);
   const [secilenIslem, setSecilenIslem] = useState(null);
   const [didUpdate, setDidUpdate] = useState(false);

   useEffect(() => {
      axios
         .get(`http://localhost:3004/hastalar/${hastaId}`)
         .then((resHasta) => {
            console.log("resHasta", resHasta.data);
            setHasta(resHasta.data);
            axios
               .get("http://localhost:3004/islemler")
               .then((resIslem) => {
                  console.log("resIslem.data", resIslem.data);

                  const tempHastaIslemleri = [];
                  for (let i = 0; i < resHasta.data.islemIds.length; i++) {
                     const islem = resIslem.data.find(
                        (item) => item.id === resHasta.data.islemIds[i]
                     );
                     tempHastaIslemleri.push(islem);
                  }
                  console.log("temphastaislemleri", tempHastaIslemleri);
                  setHastaIslemleri(tempHastaIslemleri);
               })
               .catch((err) => console.log("err", err));
         })
         .catch((err) => console.log("err", err));
   }, [didUpdate]);

   if (hasta === null) {
      return <h1>Loading...</h1>;
   }

   return (
      <div>
         <Header />
         <h1>Hasta Adı: {hasta.name}</h1>
         <h2>Hasta Soyadı: {hasta.surname}</h2>
         <h3>Telefon Numarası: {hasta.phone}</h3>

         {hastaIslemleri.length === 0 ? (
            <p>Hastaya ait işlem bulunmamamaktadır</p>
         ) : (
            <div>
               {hastaIslemleri.map((islem) => (
                  <div>
                     <p>Hastanın Şikayeti: {islem.sikayet}</p>
                     <p>
                        {islem.uygulananTedavi === "" ? (
                           <>
                              <span>Hastaya bir tedavi uygulanmamış</span>
                              <button
                                 onClick={() => {
                                    setOpenTedaviModal(true);
                                    setSecilenIslem(islem);
                                 }}
                              >
                                 Tedavi uygula
                              </button>
                           </>
                        ) : (
                           <span>Uygulana Tedavi: {islem.uygulananTedavi}</span>
                        )}
                     </p>
                     <p>
                        {islem.yazilanIlaclar.length === 0 ? (
                           <span>Hastaya ilaç yazılmamış</span>
                        ) : (
                           <p>
                              Yazılan ilaclar: &nbsp;
                              {islem.yazilanIlaclar.map((ilac) => (
                                 <span>{ilac},</span>
                              ))}
                           </p>
                        )}
                     </p>
                     <hr />
                  </div>
               ))}
            </div>
         )}
         <TedaviUygulaModal
            open={openTedaviModal}
            handleClose={() => setOpenTedaviModal(false)}
            islem={secilenIslem}
            didUpdate={didUpdate}
            setDidUpdate={setDidUpdate}
         />
      </div>
   );
};

export default HastaDetay;
