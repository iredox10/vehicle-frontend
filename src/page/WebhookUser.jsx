import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom' 
import jigawa_logo from "../../src/assets/jigawa_logo.png";
import { path } from '../../utils/path';

const WebhookUser = () => {
    const location = useLocation()
    const {state} = location
    // console.log(state)
    const [user, setUser] = useState(null)
   const {id} = useParams() 
   console.log(id)
    useEffect(()=>{
        const fetch =async () =>{
            try {
                const user = await axios(
                  // `https://vehicle-backend-1.onrender.com/webhook-user/${id}` ||
                  `http://localhost:3003/webhook-user/${id}`
                );
                console.log(user.data)
                setUser(user.data)
            } catch (err) {
                console.log(err)
            }   
        } 
        fetch()
    },[state])
    const navigate = useNavigate()
    const completeReg = () =>{
        navigate('/webhook-reg', {state})
    }
    const viewReceipt = () => {
      navigate("/receipt", { state });
    };
  return (
    <div>
      {user && (
        <div>
          <div className="bg-green-500 flex">
            <div className="flex gap-5 p-5">
              <div className="w-[10%]">
                <img className="w-full" src={jigawa_logo} alt="jigawa_logo" />
              </div>
              <h1 className="text font-bold capitalize ">
                jigawa State <span className="block"> Internal </span>Revenue
                Service (JIRS)
              </h1>
            </div>
            <h1 className="text-white font-bold text-xl self-end capitalize ">
              {user?.ownerName} Dashboard
            </h1>
          </div>
          <div className="px-32 py-5">
            <div className="flex gap-16 ">
              <div>
                <p className="mb-4">
                  <span className="font-bold">Owner name: </span>
                  {user?.ownerName}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Net Weight: </span>
                  {user?.netWeight}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Address: </span>
                  {user?.address}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Chasis Number: </span>
                  {user?.chasisNumber}
                </p>
              </div>
              <div>
                <p className="mb-4">
                  <span className="font-bold">Licence Fee: </span>
                  {user?.licenceFee}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Vehicle Make: </span>
                  {user?.vehicleMake}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Status: </span>
                  {user?.status}
                </p>
                <p className="mb-4 capitalize">
                  <span className="font-bold">approved: </span>
                  {user?.approved}
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              {!user?.ownerName == "" ? (
                ""
              ) : (
                <NavLink
                to={`/complete-reg/${user._id}`}
                  // onClick={completeReg}
                  className="bg-green-500 px-4 py-2 my-5 font-black hover:text-white"
                >
                  complete registration
                </NavLink>
              )}
              {!user?.ownerName == "" ? (
                <NavLink
                to={`/webhook-receipt/${user._id}`}
                  // onClick={viewReceipt}
                  className="bg-green-700 px-4 py-2 my-5 font-black hover:text-white"
                >
                  view Receipt
                </NavLink>
              ) : (
                ""
              )}
              {user?.approved == 'approve' ? (
              <NavLink
                  to={`/user-license/${user._id}`}
                  className="bg-green-700 px-4 py-2 my-5 font-black hover:text-white"
                >
                  view licence
                </NavLink>
              ):
              ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebhookUser