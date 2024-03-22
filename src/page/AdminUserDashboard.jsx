import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jigawa_logo from "../../src/assets/jigawa_logo.png";
import axios from "axios";
import { path } from "../../utils/path";
import FormInput from "../components/FormInput";

const AdminUserDashboard = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [showInput, setShowInput] = useState(false);
  const [approve, setApprove] = useState(null);
  const [plateNumber, setPlateNumber] = useState('')

  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios(`https://vehicle-backend-1.onrender.com/admin-user/${id}`);
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!approve || !plateNumber) {
      alert("please fill all the fields");
      return;
    }
    try {
      const date = new Date();
      const expireDate  =new Date(date.setFullYear(date.getFullYear() +1))
      const res = await axios.post(`https://vehicle-backend-1.onrender.com/update-approve/${id}`, {
      approve,
      expireDate,
      plateNumber
      });
      console.log(res.data);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
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
              {user.ownerName} Dashboard
            </h1>
          </div>
          <div className="px-32 py-5">
            <div className="flex gap-16 ">
              <div>
                <p className="mb-4">
                  <span className="font-bold">Owner name: </span>
                  {user.ownerName}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Net Weight: </span>
                  {user.netWeight}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Address: </span>
                  {user.address}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Chasis Number: </span>
                  {user.chasisNumber}
                </p>
              </div>
              <div>
                <p className="mb-4">
                  <span className="font-bold">Licence Fee: </span>
                  {user.licenceFee}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Vehicle Make: </span>
                  {user.vehicleMake}
                </p>
                <p className="mb-4">
                  <span className="font-bold">Status: </span>
                  {user.status}
                </p>

                {user.approved !== "approve" ? (
                  <p className="mb-4 flex">
                    <button
                      onClick={() => setShowInput(!showInput)}
                      className="mr-10 capitalize bg-green-700 text-white px-2 py-1"
                    >
                     {showInput? 'click to close': 'click to approve'}
                    </button>
                    {showInput && (
                      <>
                        <form onSubmit={handleSubmit} className="flex gap-1">
                          <select
                            name="approve"
                            onChange={(e) => setApprove(e.target.value)}
                            id="approve"
                            className="py-2 capitalize"
                          >
                            <option selected disabled>
                              {" "}
                              Choose to approve
                            </option>
                            <option value="approve">approve</option>
                            <option value="decline">decline</option>
                          </select>
                            <FormInput 
                            type={'text'}
                            label={'plate Number'}
                            htmlFor={'plateNumber'}
                            onchange={e => setPlateNumber(e.target.value)}
                            />
                          <button className="mx-10 capitalize bg-green-700 text-white px-2 py-1">
                            sign
                          </button>
                        </form>
                      </>
                    )}
                  </p>
                ) : (
                  <p>approved</p>
                )}
              </div>
            </div>
            <div className="flex gap-5"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserDashboard;
