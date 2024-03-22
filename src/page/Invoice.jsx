import jigawa_logo from "../../src/assets/jigawa_logo.png";
import { v4 as uuid4 } from "uuid";
import { usePDF } from "react-to-pdf";
import { FaArrowDown, FaArrowRight, FaTimes } from "react-icons/fa";
import {
  Link,
  NavLink,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Pdf from "./Pdf";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { path } from "../../utils/path";
import { HmacSHA256 } from "crypto-js";

const Invoice = () => {
  const location = useLocation();
  // const {state} = location
  const [state, setUser] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState("");
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await axios(
          `https://vehicle-backend-1.onrender.com/user/${id}` 
          // `http://localhost:3003/user/${id}`
        );
        console.log(user.data);
        setUser(user.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const navigate = useNavigate();

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const [model, setModel] = useState(false);
  const [status, setStatus] = useState("paid");

  const handleGenerateHmac = (data, key) => {
    const hmac = HmacSHA256(data, key);
    return hmac;
  };

  const ApiKey = "Pk_TeStHV9FnLZE1vSidgkH36b4s473lpKYkI58gYgc6M";
  const SecretKey = "Sk_teSTN-HY[n1]wIO32A-AU0XP5kRZ[tzHpOxQ6bf9]]";
  const PayerRefNo = uuid4().slice(0, 13);
  const Amount = state?.licenceFee;

  const hashString = PayerRefNo + Amount + ApiKey;

  const hashKey = handleGenerateHmac(hashString, SecretKey);
  console.log("hash key", hashKey);

  const initiatePayment = async () => {
    setLoadingMsg("generating invoice please wait...");
    const formData = new FormData();
    formData.append("ApiKey", "Pk_TeStHV9FnLZE1vSidgkH36b4s473lpKYkI58gYgc6M");
    formData.append("Hash", hashKey);
    formData.append("PayerRefNo", PayerRefNo);
    formData.append("PayerName", state?.ownerName);
    formData.append("Amount", Amount);
    formData.append("Description", state?.licenseType);
    formData.append("Mobile", state?.phoneNumber);
    formData.append("Email", state?.email);
    // formData.append(
    //   "ResponseUrl",
    //   "https://vehicle-frontend.netlify.app/payment-successfull"
    // );
    try {
      const res = await fetch(
        "https://demo.nabroll.com.ng/api/v1/transactions/initiate",
        {
          method: "POST",
          body: formData,
        }
      );
      let result = await res.json();
      if (result && result.code === "00") {
        const res = await axios.post(
          `https://vehicle-backend-1.onrender.com/updateRef/${id}`,
          // `http://localhost:3003/updateRef/${id}`,
          {
            chasisNumber: state.chasisNumber,
            paymentUrl: result.PaymentUrl,
            transactionRef: result.TransactionRef,
            paymentCode: result.PaymentCode,
            payerRefNo: PayerRefNo,
          }
        );
        localStorage.setItem("plateNumber_user_id", state._id);
        console.log(res);
        setLoadingMsg("");
        // window.location.replace(result.PaymentUrl);
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const hashString = PayerRefNo + state?.paymentCode + state?.Amount;
    const hashKey = handleGenerateHmac(hashString, SecretKey);
    console.log("hash key", hashKey);
    try {
      const res = await axios(
        `${state?.paymentUrl}?token=${hashKey}?TransactionRef=${state?.transactionRef}`
      );
      const checkoutUrl = `${state?.paymentUrl}?token=${hashKey}?TransactionRef=${state?.transactionRef}`;
      console.log(res.request.responseUrl);
      const responseUrl = res.request.responseUrl;
      window.location.replace(checkoutUrl);
    } catch (err) {
      console.log(err);
    }
  };

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
      {!state?.paymentUrl ? (
        <button
          onClick={initiatePayment}
          className="absolute left-2/4 top-2/4 capitalize bg-green-500 px-4 py-2 text-white hover:text-black"
        >
          {loadingMsg ? loadingMsg : "generate invoice"}
        </button>
      ) : (
        <div className="p-2 ">
          <div className="flex justify-between">
            <p>
              {" "}
              <span className="font-bold">Application ID: </span>
              {state && state.applicationId.slice(0, 17)}
            </p>
            <p>
              {" "}
              <span className="font-bold">Ref Number: </span>
              {/* {state && state.refNumber.slice(0, 17)} */}
            </p>
          </div>
          <div className="flex justify-around px-64 py-10 capitalize">
            <div>
              <p className="text-center mb-5">
                <span className="text-black/50 font-bold  text-xl">
                  Registration Type
                </span>
                <span className="block text-black/90 font-bold text-4xl">
                  {state?.licenseType}
                </span>
              </p>
              <p className="text-center mb-5">
                <span className="text-black/50 font-bold  text-xl">
                  Owner Name
                </span>
                <span className="block text-black/90 font-bold text-4xl">
                  {state?.ownerName}
                </span>
              </p>
              <p className="text-center mb-5">
                <span className="text-black/50 font-bold  text-xl">
                  Address
                </span>
                <span className="block text-black/90 font-bold text-4xl">
                  {state?.address}
                </span>
              </p>
            </div>
            <div>
              <p className="text-center mb-5">
                <span className="text-black/50 font-bold  text-xl">
                  Vehicle Make
                </span>
                <span className="block text-black/90 font-bold text-4xl">
                  {state?.vehicleMake}
                </span>
              </p>
              <p className="text-center mb-5">
                <span className="text-black/50 font-bold  text-xl">
                  Vehicle Type
                </span>
                <span className="block text-black/90 font-bold text-4xl">
                  {state?.vehicleType}
                </span>
              </p>
              <p className="text-center mb-5">
                <span className="text-black/50 font-bold  text-xl">
                  chasis Number
                </span>
                <span className="block text-black/90 font-bold text-4xl">
                  {state?.chasisNumber}
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
                }).format(state?.licenceFee)}
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
                  proceed to payment <FaArrowRight />
                </button>
                <button
                  onClick={() => toPDF()}
                  className="flex items-center gap-2 py-2 px-4 text-sm font-bold capitalize text-white hover:text-black bg-green-500 mx-5"
                >
                  Download <FaArrowDown />
                </button>
                <button
                  className="flex items-center gap-2 py-2 px-4 text-sm font-bold capitalize text-white hover:text-black bg-green-500 mx-5"
                >
                  <NavLink to={`/verify-payment/${state._id}`}>
                    check status
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {model && (
        <div className="absolute top-0 w-full h-full bg-black/20">
          <div className="relative bg-white w-2/4 h-2/4 top-1/4 left-1/4 shadow-lg">
            <button onClick={() => setModel(!model)} className="absolute right-5 top-2"><FaTimes className="text-2xl bg-red-600 text-white hover:text-black" /></button>
            <div>
              <h1 className="text-center text-4xl font-bold capitalize">
                Payment
              </h1>
            </div>

            <form onSubmit={handleCheckout}>
              <div className="text-center my-16">
                <button className="px-4 py-2 bg-green-500 hover:text-white">
                  Make payment
                </button>
                <p className="capitalize my-4">
                  make payment of{" "}
                  <span className="font-bold">
                    ₦{" "}
                    {new Intl.NumberFormat("en-IN", {
                      maximumSignificantDigits: 3,
                    }).format(state.licenceFee)}
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
