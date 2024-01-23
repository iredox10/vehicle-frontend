import jigawa_logo from "../../src/assets/jigawa_logo.png";
import { v4 as uuid4 } from "uuid";
import { usePDF } from "react-to-pdf";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Pdf from "./Pdf";
import { useRef, useState } from "react";
import axios from "axios";

const Invoice = () => {
  const location = useLocation();
  const {state} = location
  console.log((state))
  
  const navigate = useNavigate()

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });


  const [model, setModel] = useState(false)
  const [status, setStatus] = useState('paid')
  // const handleDownload = () => {
  //   saveAsPdf(contentRef.current, { fileName: 'downloaded_page.pdf' });
  // };

  const handlePayment = async (e) =>{
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3003/payment", {
        chasisNumber: state.chasisNumber,
        status,
      });
      // const res = await axios.post("http://localhost:3003/p", {
      //   chasisNumber: state.chasisNumber,
      //   status,
      // });
      // const res = await axios.get('http://localhost:3003/users')
      console.log(res.data) 
      navigate(-1)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div ref={targetRef}>
      <div className=" bg-green-500 p-2 px-5 ">
        <div className="flex">
          <div className="flex items-center gap-3">
            <div className="w-[15%]">
              <img src={jigawa_logo} alt="Jigawa State Logo" />
            </div>
            <h1 className="text font-bold capitalize ">
              jigawa State <span className="block"> Internal </span>Revenue
              Service (JIRS)
            </h1>
          </div>
          <h1 className="text-white font-bold text-6xl self-end ">Invoice</h1>
        </div>
      </div>
      <div className="p-2 ">
        <div className="flex justify-between">
          <p>
            {" "}
            <span className="font-bold">Application ID: </span>
            {state.applicationId.slice(0, 17)}
          </p>
          <p>
            {" "}
            <span className="font-bold">Ref Number: </span>
            {state.refNumber.slice(0, 17)}
          </p>
        </div>
        <div className="flex justify-around px-64 py-10 capitalize">
          <div>
            <p className="text-center mb-5">
              <span className="text-black/50 font-bold  text-xl">
                Registration Type
              </span>
              <span className="block text-black/90 font-bold text-4xl">
                {state.licenseType}
              </span>
            </p>
            <p className="text-center mb-5">
              <span className="text-black/50 font-bold  text-xl">
                Owner Name
              </span>
              <span className="block text-black/90 font-bold text-4xl">
                {state.ownerName}
              </span>
            </p>
            <p className="text-center mb-5">
              <span className="text-black/50 font-bold  text-xl">Address</span>
              <span className="block text-black/90 font-bold text-4xl">
                {state.address}
              </span>
            </p>
          </div>
          <div>
            <p className="text-center mb-5">
              <span className="text-black/50 font-bold  text-xl">
                Vehicle Make
              </span>
              <span className="block text-black/90 font-bold text-4xl">
                {state.vehicleMake}
              </span>
            </p>
            <p className="text-center mb-5">
              <span className="text-black/50 font-bold  text-xl">
                Vehicle Type
              </span>
              <span className="block text-black/90 font-bold text-4xl">
                {state.vehicleType}
              </span>
            </p>
            <p className="text-center mb-5">
              <span className="text-black/50 font-bold  text-xl">
                chasis Number
              </span>
              <span className="block text-black/90 font-bold text-4xl">
                {state.chasisNumber}
              </span>
            </p>
          </div>
        </div>
        <div className="text-center text-4xl  ">
          <p className="">
            Amount:
            <span className="font-bold pl-2">
              ₦ {""}
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(state.licenceFee)}
            </span>
            <button className="text-sm my-2 flex justify-center capitalize text-blue-900 hover:underline w-full">
              instructions
            </button>
          </p>
          <div className="capitalize ">
            <div className="flex justify-center my-2">
              <button
                className="flex items-center gap-2 py-2 px-4 text-sm font-bold capitalize text-white hover:text-black bg-green-700"
                onClick={() => setModel(!model)}
              >
                proceed to payment <FaArrowRight></FaArrowRight>
              </button>
              <button
                onClick={() => toPDF()}
                className="flex items-center gap-2 py-2 px-4 text-sm font-bold capitalize text-white hover:text-black bg-green-500 mx-5"
              >
                Download <FaArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>
      {model && (
        <div className="absolute top-0 w-full h-full bg-black/20">
          <div className="relative bg-white w-2/4 h-2/4 top-1/4 left-1/4 shadow-lg">
            <div>
              <h1 className="text-center text-4xl font-bold capitalize">
                Payment
              </h1>
            </div>

            <form onSubmit={handlePayment}>
              <div className="text-center my-16">
                <button
                  className="px-4 py-2 bg-green-500 hover:text-white"
                >
                  Make payment
                </button>
                <p className="capitalize my-4">clicking this button will simulate payment</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
