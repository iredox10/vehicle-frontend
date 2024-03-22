import { NavLink, useNavigate } from "react-router-dom";
import { HmacSHA256 } from "crypto-js";
import { v4 as uuid4 } from "uuid";
import { useEffect, useState } from "react";
import axios from "axios";
import FormInput from "../components/FormInput";

const VerifyPayment = () => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [TransactionRef, setTransactionRef] = useState(null);
  const navigate = useNavigate();
  const id = localStorage.getItem("plateNumber_user_id");
  const userPage = () => {
    navigate(`/user-dashboard/${id}`);
  };
//! IMPLEMENT VERIFICATION OF USER PAYMENT USING THE DATA YOU SAVE WHEN INITIATING TRANSACITON.
  const handleGenerateHmac = (data, key) => {
    const hmac = HmacSHA256(data, key);
    return hmac;
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await axios(
          `https://vehicle-backend-1.onrender.com/user/${id}` ||
            `http://localhost:3003/user/${id}`
        );
        console.log(user.data);
        setLoading(false);
        setUser(user.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [id]);

  const ApiKey = "Pk_TeStHV9FnLZE1vSidgkH36b4s473lpKYkI58gYgc6M";
  const SecretKey = "Sk_teSTN-HY[n1]wIO32A-AU0XP5kRZ[tzHpOxQ6bf9]]";
  const Amount = user?.licenceFee;
  const transactionRef = user?.transactionRef;
  const payerRefNo = user?.payerRefNo;
  console.log(Amount, transactionRef, payerRefNo);
  // const hashString = "9baabd1a-ebc6" + "4000.00" + "753685974638" + ApiKey;

  useEffect(() => {
    setLoading(true);
    if (transactionRef && Amount && payerRefNo) {
      const hashString = payerRefNo + Amount + transactionRef + ApiKey;
      const hashKey = handleGenerateHmac(hashString, SecretKey);

      const formData = new FormData();
      formData.append(
        "ApiKey",
        "Pk_TeStHV9FnLZE1vSidgkH36b4s473lpKYkI58gYgc6M"
      );
      formData.append("Hash", hashKey);
      formData.append("TransactionRef", transactionRef.toString());

      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            "https://demo.nabroll.com.ng/api/v1/transactions/verify",
            {
              method: "POST",
              body: formData,
            }
          );
          // setLoading(true);
          const data = await res.json();
          console.log(data);
          // if(data.msg == 'Pending')
          if (data) {
            setMsg(data.msg);
            // setLoading(false);
          } else {
            setMsg("error in processing payment");
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [user]);

  return (
    <div className="absolute top-2/4 text-center    left-[40%] ">
      <form>
        <FormInput
          label={"input transaction reference"}
          htmlFor={"transaction reference"}
          type={"text"}
          onchange={(e)=> setTransactionRef( e.target.value)}
        />
      </form>
      <button className="bg-green-400 px-4 py-2 capitalize font-bold hover:bg-green-700">verify</button>
    </div>
  );
};

export default VerifyPayment;
