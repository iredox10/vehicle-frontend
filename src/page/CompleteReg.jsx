import coatOfArm from "../../src/assets/coat_of_arm.png";
import jigawa_logo from "../../src/assets/jigawa_logo.png";
import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { Link, NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid4 } from "uuid";

const CompleteReg = () => {
  const [licenceFee, setLicenceFee] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [chasisNumber, setChasisNumber] = useState("");
  const [netWeight, setNetweight] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [color, setColor] = useState("green");
  const [err, setErr] = useState("");
  const [weightAuthorized, setWeightAuthorized] = useState("");
  const [personAuthorized, setPersonAuthorized] = useState("");
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [user, setUser] = useState()
  const {id} = useParams()
  const navigate = useNavigate();
  useEffect(()=>{
    const fetch = async ()=>{
        try {
            const res = await axios(`http://localhost:3003/webhook-user/${id}`)
            setUser(res.data)
            console.log(user);
        } catch (err) {
         console.log(err)   
        }
    }
    fetch()
  },[id])

  useEffect(() =>{ 
     const changeFee = () => {
    // console.log(value)
    switch (user?.licenceFee) {
      case "4000.00" :
        setColor("blue");
        break;
      case "6000.00":
        setColor("red");
        break;
      case "3000.00":
        setLicenceFee("4000.00");
        setColor("purple");
        break;
     case "5000.00": 
        setColor("orange");
        break;
      default:
        setLicenceFee(0);
        break;
    }
  };
  changeFee()
},[id])




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !ownerName ||
      !address ||
      !vehicleMake ||
      !vehicleType ||
      !chasisNumber ||
      !email ||
      !phoneNumber ||
      !weightAuthorized ||
      !netWeight ||
      !personAuthorized 
    ) {
      setErr("please fill all the field");
      console.log("form error");
      return;
    }
    

    // navigate('invoice', {state:{ownerName,address,vehicleMake,vehicleType,licenseType,licenceFee}})
    try {
      const res = await axios.post(
        // `https://vehicle-backend-1.onrender.com/register` ||
        `http://localhost:3003/complete-reg/${id}`,
        {
          ownerName,
          address,
          vehicleMake,
          vehicleType,
          licenseType,
          licenceFee,
          netWeight,
          chasisNumber,
          color,
          personAuthorized,
          weightAuthorized,
          email,
          phoneNumber,
          applicationId: uuid4().toString(),
        }
      );
      const user = res.data
      navigate(`/webhook-user-dashboard/${user._id}`, {state: user})
      console.log(user)
    } catch (err) {
      setErr(err.err)
      console.log(err)
    }
  };

  return (
    <div className="grid grid-cols-6 w-full min-h-screen ">
      <section
        style={{ background: color }}
        className="bg-green-700 col-start-1 col-end-3 p-2"
      >
        <div>
          <div
            style={{ background: color }}
            className="flex items-center justify-between"
          >
            <div className="w-[20%]">
              <img src={coatOfArm} alt="Nigeria coat of arm" />
            </div>
            <div className="w-[20%]">
              <img src={jigawa_logo} alt="Jigawa State Logo" />
            </div>
          </div>

          <div className="text-center text-white capitalize">
            <h1 className="text-5xl font-black my-5 ">
              jigawa State Internal Revenue Service (JIRS)
            </h1>
            <h2 className="text-2xl font-black">Vehicle License</h2>
            <p>valid for 12 (Months) from Date of Issue </p>
          </div>
        </div>
      </section>

      <main className="col-start-3 col-end-7 p-16  w-full">
        <div
          style={{ borderColor: color }}
          className="border border-green-700 w-[70%] mx-auto"
        >
          <h1
            style={{ background: color }}
            className="bg-green-700 text-xl   p-2 font-bold text-white"
          >
            Complete Registration
          </h1>
          <form onSubmit={handleSubmit} className="p-2 capitalize">

            {/* <FormInput
              type={"text"}
              htmlFor={"license type"}
              label={"license type"}
              name={"license type"}
              value={user?.licenseType}
            /> */}
           <FormInput
              type={"text"}
              htmlFor={"ownerName"}
              label={"ownerName"}
              name={"ownerName"}
              onchange={(e) => setOwnerName(e.target.value)}
            />
            <FormInput
              type={"text"}
              htmlFor={"address"}
              label={"address"}
              name={"address"}
              onchange={(e) => setAddress(e.target.value)}
            />
            <FormInput
              type={"text"}
              htmlFor={"licenceFee"}
              label={"licence Fee"}
              name={"licenceFee"}
              value={`N ${!user?.licenceFee ? "0" : user.licenceFee}`}
            />
            <div className="flex items-center gap-10">
              <FormInput
                type={"text"}
                htmlFor={"email"}
                label={"email"}
                name={"email"}
                onchange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                type={"text"}
                htmlFor={"phoneNumber"}
                label={"phone Number"}
                name={"phoneNumber"}
                onchange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-10">
              <FormInput
                type={"text"}
                htmlFor={"vehicleMake"}
                label={"vehicle Make"}
                name={"vehicleMake"}
                onchange={(e) => setVehicleMake(e.target.value)}
              />
              <FormInput
                type={"text"}
                htmlFor={"vehicleType"}
                label={"vehicle Type"}
                name={"vehicleType"}
                onchange={(e) => setVehicleType(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-10">
              <FormInput
                type={"text"}
                htmlFor={"chasis"}
                label={"chasis number"}
                name={"chasis"}
                onchange={(e) => setChasisNumber(e.target.value)}
              />
              <FormInput
                type={"text"}
                htmlFor={"netWeight"}
                label={"net Weight"}
                name={"netWeight"}
                onchange={(e) => setNetweight(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-10">
              <FormInput
                type={"text"}
                htmlFor={"weightAuthorizedToCarry"}
                label={"weight Authorized to carry"}
                name={"weightAuthorizedToCarry"}
                onchange={(e) => setWeightAuthorized(e.target.value)}
              />
              <FormInput
                type={"text"}
                htmlFor={"personsAuthorizedToCarry"}
                label={"Person Authorized To Carry"}
                name={"personsAuthorizedToCarry"}
                onchange={(e) => setPersonAuthorized(e.target.value)}
              />
            </div>

            <div>
              <button
                style={{ background: color }}
                className="capitalize text-xl font-bold bg-green-700 w-full p-2 text-white"
              >
               complete registeration
              </button>
            </div>
          </form>
          
        </div>
      </main>
    </div>
  );
};

export default CompleteReg;
