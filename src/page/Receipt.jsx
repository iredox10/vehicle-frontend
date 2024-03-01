import { useLocation, useParams } from "react-router-dom"
import jigawa_logo from "../../src/assets/jigawa_logo.png";
import QRCodeComponent from "../components/Qrcode"
import {v4 as uuid4} from 'uuid'
const Receipt = (props) => {
    const l = useLocation()
    // console.log(l.state)
    const {state} = l
    console.log(state)
  return (
    <div className="w-[60%] my-5 mx-auto  bg-green-700/20  ">
      <div className=" bg-green-500 p-5 ">
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
          <div className=" mb-5">
            <p className="text-sm">
              <span className="font-bold">Application ID: </span>
              {state.applicationId.slice(0, 16)}
            </p>
            <p className="text-sm ">
              <span className="font-bold">Transaction ID: </span>
              {uuid4().toString().slice(0, 17)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between my-5 text-white">
          <p>
            License Type
            <span className="font-bold block capitalize text-2xl">
              {state.licenseType}
            </span>
          </p>
          <h2 className="text-6xl font-black ">Receipt</h2>
        </div>
      </div>
      <div className="capitalize flex justify-between px-16 py-5">
        <div>
          <p className="mb-2">
            Owner
            <span className="font-bold block text-xl ">{state.ownerName}</span>
          </p>
          <p className="mb-2">
            vehicle Make
            <span className="font-bold block text-xl">
              {state.vehicleMake}{" "}
            </span>
          </p>
          <p className="mb-2">
            Vehicle Type
            <span className="font-bold block text-xl">
              {state.vehicleType}{" "}
            </span>
          </p>
        </div>
        <div>
          <p className="mb-2">
            Registration Fee
            <span className="font-bold block text-xl">
              ₦ {''}
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(state.licenceFee)}
            </span>
          </p>
          <p className="mb-2">
            Transaction Date
            <span className="font-bold block text-xl">
              {new Intl.DateTimeFormat("en-GB").format(new Date())}
            </span>
          </p>
        </div>
      </div>
      <div className=" flex justify-end pr-16 py-2">
        <QRCodeComponent value={state.onwerName} />
      </div>
    </div>
  );
}

export default Receipt