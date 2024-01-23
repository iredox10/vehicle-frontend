import coatOfArm from "../../src/assets/coat_of_arm.png";
import jigawa_logo from "../../src/assets/jigawa_logo.png";
import  { useState } from "react";
import FormInput from "../components/FormInput";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'
import { v4 as uuid4 } from "uuid";
import { path } from "../../utils/path";


const Home = () => {
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
  const [weightAuthorized, setWeightAuthorized] = useState('')
  const [personAuthorized, setPersonAuthorized] = useState('')
  const changeFee = (value) => {
    // console.log(value)
    switch (value) {
      case "private motor vehicle":
        setLicenceFee("6000");
        setColor("blue");
        break;
      case "tippper / lorry and agriculture":
        setLicenceFee("3000");
        setColor("red");
        break;
      case "motorcycle/tricycle":
        setLicenceFee("4000");
        setColor("purple");
        break;
      case "commercial taxi/ bus & pick-up":
        setLicenceFee("5000");
        setColor("orange");
        break;
      default:
        setLicenceFee(0);
        break;
    }
  };

  const navigate =useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !ownerName ||
      !address ||
      !vehicleMake ||
      !vehicleType ||
      !chasisNumber
    ) {
      setErr("please fill all the field");
      console.log("form error");
      return;
    }

    // navigate('invoice', {state:{ownerName,address,vehicleMake,vehicleType,licenseType,licenceFee}})
    try {
      const res = await axios.post(
        `https://vehicle-backend.onrender.com/register`,
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
          applicationId: uuid4().toString(),
          refNumber: uuid4().toString(),
        }
      );
      const user = res.data
      navigate("/user-dashboard", { state: user });
    } catch (err) {
      console.log(err)
    }


    // try {
    //   const res = await axios.post(
    //     "https://demo.nabroll.com.ng/api/v1/transactions/initiate",
    //     {
    //       publicKey: " Pk_TeStHV9FnLZE1vSidgkH36b4s473lpKYkI58gYgc6M",
    //       secretKey: "Sk_teSTN-HY[n1]wIO32A-AU0XP5kRZ[tzHpOxQ6bf9]]",
    //       payerRefNo: "0000001",
    //       payerName: ownerName,
    //       amount: licenceFee,
    //       description: licenseType,
    //     }
    //   );
    //   console.log(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
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
            Vehicle License Registration Form
          </h1>
          <form onSubmit={handleSubmit} className="p-2 capitalize">
            <div className="flex flex-col my-5">
              <label htmlFor="ownerName" className=" font-bold">
                Registration type
              </label>
              <select
                name="type"
                id="type"
                className="border-2 border-black p-2 capitalize"
                onChange={(e) => {
                  changeFee(e.target.value);
                  setLicenseType(e.target.value);
                }}
              >
                <option className="capitalize" selected disabled>
                  Select Type Of Registration
                </option>
                <option className="capitalize" value="private motor vehicle">
                  Private Motor Vehicle
                </option>
                <option
                  className="capitalize"
                  value="tippper / lorry and agriculture"
                >
                  Tippper / Lorry And Articulated
                </option>
                <option value="motorcycle/tricycle">
                  Motorcycle / Tricycle
                </option>
                <option value="commercial taxi/ bus & pick-up">
                  Commercial Taxi / Bus & Pickup
                </option>
              </select>
            </div>
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
              value={`N ${!licenceFee ? "0" : licenceFee}`}
            />
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
                register
              </button>
            </div>
          </form>
          <p className="px-2">
            Already have account?{" "}
            <NavLink to={"/login"} className="underline text-blue-500">
              Login
            </NavLink>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
