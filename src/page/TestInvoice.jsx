import jigawa_logo from "../../src/assets/jigawa_logo.png";
import { v4 as uuid4 } from "uuid";
import { usePDF } from "react-to-pdf";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { Link, redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import Pdf from "./Pdf";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { path } from "../../utils/path";
import { HmacSHA256 } from "crypto-js";

const TestInvoice = () => {
  const location = useLocation();
  // const {state} = location
  const [state, setUser] = useState(null)
  const {id} = useParams()
  console.log((id))
    //   useEffect(()=>{
    //     const fetch =async () =>{
    //         try {
    //             const user = await axios(
    //               `https://vehicle-backend-1.onrender.com/user/${id}` ||
    //               `http://localhost:3003/user/${id}`
    //             );
    //             console.log(user.data)
    //             setUser(user.data)
    //         } catch (err) {
    //             console.log(err)
    //         }   
    //     } 
    //     fetch()
    // },[])
 
  const navigate = useNavigate()

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const [model, setModel] = useState(false)
  const [status, setStatus] = useState('paid')


  const handleGenerateHmac = (data, key) => {
    const hmac = HmacSHA256(data, key);
    return hmac;
  };

  const ApiKey = "Pk_TeStHV9FnLZE1vSidgkH36b4s473lpKYkI58gYgc6M";
  const SecretKey = "Sk_teSTN-HY[n1]wIO32A-AU0XP5kRZ[tzHpOxQ6bf9]]";
  const PayerRefNo = uuid4().slice(0, 12);
  const Amount = '4000.00' 

  const hashString = PayerRefNo + Amount + ApiKey; 
  
  const hashKey = handleGenerateHmac(hashString, SecretKey);
  console.log('hash key', hashKey)
  const email = `sani${Math.floor(Math.random()*100)}@gmail.com`
  const phoneNumber = `9045${Math.floor(Math.random()*100)}${Math.floor(Math.random()*100)}${Math.floor(Math.random()*100)}456${Math.floor(Math.random()*100)}` 
  const handlePayment = async (e) =>{
    e.preventDefault()

    const formData = new FormData()

     formData.append("ApiKey", "Pk_TeStHV9FnLZE1vSidgkH36b4s473lpKYkI58gYgc6M");
     formData.append("Hash", hashKey);
     formData.append("PayerRefNo", PayerRefNo);
     formData.append("PayerName", "idris"); 
     formData.append("Amount", Amount);
     formData.append("Description", 'plate licence');
     formData.append("Mobile", phoneNumber);
     formData.append("Email", email);
    //! add frontend url to the response url
    //  formData.append("ResponseUrl", "http://localhost:5173/payment-successfull/")
    //  formData.append("ResponseUrl", 'https://vehicle-frontendd.onrender.com/payment-successfull/')
    //  formData.append("ResponseUrl",'https://vehicle-frontend.netlify.app/payment-successfull')
try{
  const res =
       await fetch("https://demo.nabroll.com.ng/api/v1/transactions/initiate",{
        method: 'POST',
        body: formData
      })
      let result = await res.json()
      if (result && result.code === "00"){
        // const res = await axios.post(`http://localhost:3003/updateRef/${id}` ||`https://vehicle-backend-1.onrender.com/updateRef/${id}` , {
        const res = await axios.post(`https://vehicle-backend-1.onrender.com/register` , {
          email: email,
          phoneNumbermobile: phoneNumber,
          chasisNumber: uuid4().slice(0, 12),
          paymentUrl: result.PaymentUrl,
          transactionRef: result.TransactionRef,
          paymentCode: result.PaymentCode,
          payerRefNo: PayerRefNo
        });
        localStorage.setItem('plateNumber_user_id', id)
        console.log(res.data)
        window.location.replace(result.PaymentUrl);
      }
       console.log(result);

    // try {
    //   const res = await axios.post(
    //     `https://vehicle-backend.onrender.com/payment` ||
    //     `http://localhost:3003/payment`, 

    //     {
    //       chasisNumber: state.chasisNumber,
    //       status,
    //     }
    //   )
      
    //   console.log(res.data) 
    //   navigate(-1)
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
        </div>
      </div>
      
 <div className="capitalize py-48 ">
            <div className="flex justify-center my-2">
              <button
                className="flex items-center gap-2 py-2 px-4 text-sm font-bold capitalize text-white hover:text-black bg-green-700"
                onClick={() => setModel(!model)}
              >
                proceed to payment <FaArrowRight></FaArrowRight>
              </button>
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
                <button  className="px-4 py-2 bg-green-500 hover:text-white">
                  Make payment
                </button>
                </div>
            </form>
          </div>
        </div>
                  
      )}

    </div>
  );
};

export default TestInvoice;
